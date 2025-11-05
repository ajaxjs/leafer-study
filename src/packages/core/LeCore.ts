import { App } from 'leafer-ui'
import '@leafer-in/editor'
import '@leafer-in/viewport' // 导入视口插件
import '@leafer-in/state'    // 导入交互状态插件

import type { IPluginTempl, IPluginOption, IPluginMap, IPluginClass, IPluginClass2 } from './interface'

import Hotkey from './built-in/Hotkey';

export class LeCore {
    protected _app: App | null = null;
    protected _focusTo: any = null;
    // 插件map
    protected plubinMap: IPluginMap = new Map();
    // 插件实例map
    protected plugins: Record<string, IPluginClass2> = {};
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
    use(plugin: any, options?: IPluginOption) {
        const { pluginName } = plugin
        if (this.plugins[pluginName]) {
            throw new Error(`plugin ${pluginName} already used`)
        }
        this.plubinMap.set(pluginName, [plugin, options]);
        if (this._app) {
            this.plugins[pluginName] = new (plugin as IPluginClass)(this._app, options)
        }
    }
}