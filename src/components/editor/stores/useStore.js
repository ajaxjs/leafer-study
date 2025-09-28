import { defineStore } from 'pinia'
import { App, Rect, Star, Frame, Ellipse, Group, Text, Image, DragEvent, KeyEvent, EditorEvent, Platform } from 'leafer-editor'

export default defineStore('om-editor-store', {
    state: () => {
        return {
            app: null,
            editor: null,
        }
    },
    actions: {
        addRact(options) {
            const { app, editor } = this
            const ract = Rect.one({ editable: true, fill: '#ff6600', ...options })
            editor.add(ract)
            app.editor.select(ract)
        },
        addStar(options) {
            const { app, editor } = this
            const star = Star.one({ editable: true, fill: '#ff6600', ...options })
            editor.add(star)
            app.editor.select(star)
        },
        addText(options) {
            const { app, editor } = this
            const text = Text.one({ editable: true, text: '文本', fontSize: 40, ...options })
            editor.add(text)
            app.editor.select(text)
        },
        addImage(url, options) {
            const { app, editor } = this
            if (options?.format == 'svg') {
                url = Platform.toURL(url, 'svg');
            }
            const img = new Image({ editable: true, width: 150, height: 150, ...options, url });
            editor.add(img)
            app.editor.select(img)
        },
    }
})