import { App } from 'leafer-ui'
import '@leafer-in/editor'
import '@leafer-in/viewport' // 导入视口插件
import '@leafer-in/state'    // 导入交互状态插件
import hotkeys from 'hotkeys-js';

import type { IPluginTempl, IPluginOption, IPluginClass, IPluginClass2, IHotkey } from './interface'

import Hotkey from './built-in/Hotkey';

export class LeCore {
    [key: string]: any;
    protected _app: App | null = null;
    protected _focusTo: any = null;
    // 插件map
    private plubinMap: Map<string, [IPluginTempl, IPluginOption | undefined, boolean]> = new Map();
    // 插件实例map
    // protected plugins: Record<string, IPluginClass2> = {};
    constructor() {
        console.log('Leafer App constructor')
    }
    get app() {
        return this._app
    }
    // 挂载到指定元素
    mount(view: HTMLElement | string) {
        if (typeof view === 'string') {
            view = document.querySelector(view) as HTMLElement
            if (!view) {
                throw new Error(`Leafer App mount: ${view} not found, run after mounted.`)
            }
        }
        view.style.position = 'relative';
        view.style.minWidth = '0px';
        if (!this._app) {
            this._app = new App({
                view,
                // 会自动创建 editor实例、tree层、sky层
                editor: {
                    //circle: {}, // 显示旋转控制点
                    middlePoint: { width: 12, height: 4, cornerRadius: 2 },
                },
            })
        }
        this.use(Hotkey)
    }
    // 注册插件
    use(pluginTempl: IPluginTempl, options?: IPluginOption) {
        const { name } = pluginTempl;
        if (this.plubinMap.has(name)) {
            throw new Error(`plugin ${name} already used`)
        }
        let isInstalled = false
        // 如果已挂载，实例化插件
        if (this._app) {
            isInstalled = true
            this._installPlugin(pluginTempl, options)
        }
        this.plubinMap.set(name, [pluginTempl, options, isInstalled]);
    }
    // 安装插件
    private _installPlugin(pluginTempl: IPluginTempl, options?: IPluginOption) {
        const { name, propName } = pluginTempl
        const instance = new (pluginTempl as IPluginClass)(this._app!, options)
        if (propName) {
            if (this[propName] as IPluginClass2) {
                throw new Error(`plugin ${propName} already installed`)
            } else if (this[propName] !== undefined) {
                throw new Error(`${propName} is an illegal plugin`)
            }
            // 实例化，并挂载到实例
            this[propName] = instance
        }
        // 绑定快捷按键
        instance.hotkeys.forEach((item: IHotkey) => {
            const { hotkey, handler } = item
            //hotkeys(hotkey, handler.bind(instance))
            hotkeys(hotkey, (e: KeyboardEvent) => {
                e.preventDefault();
                handler.call(instance, e)
            })
        })

        this.plubinMap.set(name, [pluginTempl, options, true]);
    }

}