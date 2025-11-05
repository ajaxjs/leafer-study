import type { IPluginTempl, IPluginOption } from '../interface'
import { App } from 'leafer-ui'

export default class Hotkey implements IPluginTempl {
    static name = 'Hotkey'
    static hotkeys = []
    app?: App
    constructor(app: App, options?: IPluginOption) {
        this.app = app
        console.log('install Hotkey', options, app);
    }
}