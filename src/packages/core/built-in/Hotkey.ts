import type { IPluginTempl, IPluginOption } from '../interface'
import type { ILeaf } from 'leafer-ui'
import { App } from 'leafer-ui'

export default class Hotkey implements IPluginTempl {
    // static propName = 'hotkey'
    hotkeys = [
        { hotkey: 'delete,backspace', label: '删除选中', handler: this.removeSelected.bind(this) },
        { hotkey: 'ctrl+g', label: '组合对象', handler: this.group.bind(this) },
        { hotkey: 'ctrl+shift+g', label: '取消组合', handler: this.ungroup.bind(this) },
        // 图层索引操作
        { hotkey: 'ctrl+a', label: '全选', handler: this.selectAll.bind(this) },
        { hotkey: 'ctrl+c', label: '复制', handler: this.copy.bind(this) },
        { hotkey: 'ctrl+v', label: '粘贴', handler: this.paste.bind(this) },
        { hotkey: 'ctrl+d', label: '副本', handler: this.duplicate.bind(this) },
    ]
    private _app: App
    private _clipboard: ILeaf[] | null = null;
    constructor(app: App, options?: IPluginOption) {
        this._app = app;
        console.log('install Hotkey', options);
    }
    // 复制选中
    duplicate() {
        this.copy()
        this.paste()
    }
    // 复制选中
    copy() {
        this._clipboard = this._app.editor.leafList.list.map((item: ILeaf): ILeaf => item.clone?.() || item);
    }
    // 粘贴
    paste() {
        if (!this._clipboard) {
            return
        }
        this._clipboard.forEach((item: any) => {
            item.x += 10;
            item.y += 10;
            const newItem = item.clone();
            this._app.tree.add(newItem)
            this._app.editor.select(newItem)
        })
    }
    // 删除选中
    removeSelected() {
        const { _app: app } = this;
        app.editor.leafList.forEach(item => item.remove());
        app.editor.cancel()
    }
    // 组合对象
    group() {
        this._app.editor.group()
    }
    // 取消组合
    ungroup() {
        this._app.editor.ungroup()
    }
    // 全选
    selectAll() {
        this._app.editor.select(this._app.tree.children)
    }
}