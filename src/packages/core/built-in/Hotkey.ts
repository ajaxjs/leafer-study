import type { IPluginTempl, IPluginOption } from '../interface'
import { App } from 'leafer-ui'

export default class Hotkey implements IPluginTempl {
    static propName = 'hotkey'
    hotkeys = [
        { hotkey: 'delete,backspace', label: '删除选中', handler: this.removeSelected },
    ]
    private app: App
    constructor(app: App, options?: IPluginOption) {
        this.app = app
        console.log('install Hotkey', options);
    }
    // 删除选中
    removeSelected() {
        const { app } = this;
        app.editor.leafList.forEach(item => item.remove());
        app.editor.cancel()
    }
}