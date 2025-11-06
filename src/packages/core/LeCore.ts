import { App } from 'leafer-ui'
import '@leafer-in/editor'
import '@leafer-in/viewport' // 导入视口插件
import '@leafer-in/state'    // 导入交互状态插件
import hotkeys from 'hotkeys-js';

import type { IAppConfig } from 'leafer-ui'
import type { IPluginTempl, IPluginOption, IPluginClass, IPluginClass2, IHotkey } from './interface'
// 内置插件
import Hotkey from './built-in/Hotkey';


export class LeCore {
    [key: string]: any;
    protected _view: HTMLElement;
    protected _app: App;
    // 插件map
    private plubinMap: Map<string, [IPluginTempl, IPluginOption | undefined]> = new Map();
    // 插件实例map
    // protected plugins: Record<string, IPluginClass2> = {};
    constructor(options?: IAppConfig) {
        this._view = document.createElement('div');
        this._view.style = 'width: 100%;height:100%;overflow:hidden;min-width:0;min-height:0;';
        this._app = new App({
            view: this._view,
            // 会自动创建 editor实例、tree层、sky层
            editor: {
                //circle: {}, // 显示旋转控制点
                middlePoint: { width: 12, height: 4, cornerRadius: 2 },
            },
            ...options,
        })
        this.use(Hotkey);
        console.log('Leafer App constructor', this._app)
    }
    get app() {
        return this._app
    }
    // 挂载到指定元素
    mount(view: HTMLElement | string) {
        if (typeof view === 'string') {
            view = document.querySelector(view) as HTMLElement;
            if (!view) {
                throw new Error(`Leafer App mount: ${view} not found, run after mounted.`)
            }
        }
        view.style.minWidth = '0';
        view.style.minHeight = '0';
        // 挂载到指定元素
        view.appendChild(this._view)
    }
    // 注册插件
    use(pluginTempl: IPluginTempl, options?: IPluginOption) {
        const { name, propName } = pluginTempl;
        if (this.plubinMap.has(name)) {
            throw new Error(`plugin ${name} already used`)
        }
        if (propName && this[propName] as IPluginClass2) {
            throw new Error(`plugin ${propName} already installed`)
        } else if (propName && this[propName] !== undefined) {
            throw new Error(`${propName} is an illegal plugin`)
        }
        // 初始化组件实例
        const instance = new (pluginTempl as IPluginClass)(this._app, options)
        // 绑定快捷按键
        instance.hotkeys?.forEach((item: IHotkey) => {
            const { hotkey, handler } = item
            hotkeys(hotkey, (e: KeyboardEvent) => {
                e.preventDefault();
                handler.call(instance, e)
            })
        })
        // 挂载到实例
        if (propName) this[propName] = instance;
        // 插件map记录
        this.plubinMap.set(name, [pluginTempl, options]);
    }
    destroy() {
        this._app.destroy();
    }
}
