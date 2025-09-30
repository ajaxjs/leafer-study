import { DragEvent, PropertyEvent, KeyEvent } from 'leafer-ui'

export class HistoryPlugin {
  app = null
  editor = null
  config = null
  history = []
  constructor(app, editor, config) {
    this.app = app
    this.config = config
    this.editor = editor
    this.start();
  }
  start() {
    const { app } = this;
    let oldval = null
    // 开始拖拽时，记录当前对象的状态
    app.on(DragEvent.START, (e) => {
      oldval = e.target.toJSON();
    })
    // 拖拽结束时，记录当前对象的状态
    app.on(DragEvent.END, (e) => {
      this.history.push(oldval)
    })
    app.on(PropertyEvent.CHANGE, (e) => {
      console.log('属性变化', e);
    })
    //
    app.on(KeyEvent.DOWN, (e) => {
      if (e.ctrlKey && e.key === 'z') {
        this.undo()
      }
    })
  }
  undo() {
    if (this.history.length === 0) return
    const last = this.history.pop()

    const target = this.editor.children.find(vo => vo.id == last.id)

    if (target) {
      target.set(last)
    }
    console.log('撤销', last, target);
  }
}