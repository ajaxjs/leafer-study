import { defineStore } from 'pinia'
import { useColorMode } from '@vueuse/core'
import { App, Rect, Star, Frame, Ellipse, Group, Text, Image, DragEvent, KeyEvent, EditorEvent, Platform } from 'leafer-editor'

export default defineStore('om-editor-store', {
    state: () => {
        const mode = useColorMode()
        return {
            mode,
            app: null,
            editor: null,
            selected: [],
            children: [],
        }
    },
    actions: {
        getNextId() {
            console.log(this.children);
            
            return this.children.reduce((max, lay) => lay.id > max ? lay.id : max, 0) + 1;
        },
        addRact(options) {
            const { app, editor } = this
            const id = this.getNextId();
            console.log('矩形 ' + id);
            
            const ract = Rect.one({ x: 10, y: 10, editable: true, fill: '#ff6600', ...options, id, name: '矩形 ' + id })
            editor.add(ract)
            app.editor.select(ract)
        },
        addStar(options) {
            const { app, editor } = this
            const id = this.getNextId();
            console.log('星形 ' + id);
            
            const star = Star.one({ x: 10, y: 10, editable: true, fill: '#ff6600', ...options, id, name: '星形 ' + id })
            editor.add(star)
            app.editor.select(star)
        },
        addText(options) {
            const { app, editor } = this
            const id = this.getNextId();
            console.log('文本 ' + id);
            const text = Text.one({ x: 10, y: 10, editable: true, text: '文本', fontSize: 40, ...options, id, name: '文本 ' + id })
            editor.add(text)
            app.editor.select(text)
        },
        addImage(url, options) {
            const { app, editor } = this
            if (options?.format == 'svg') {
                url = Platform.toURL(url, 'svg');
            }
            const id = this.getNextId();
            console.log('图片 ' + id);
            const img = new Image({ x: 10, y: 10, editable: true, width: 150, height: 150, ...options, id, name: '图片 ' + id, url });  
            editor.add(img)
            app.editor.select(img)
        },
    }
})
