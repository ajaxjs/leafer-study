import { Pen } from 'leafer-ui'

export class PenDraw {
    constructor(container, app, options = {}) {
        this.container = container
        this.app = app
        this.options = {
            stroke: 'rgba(0,150,0,0.5)',
            strokeWidth: 30,
            strokeCap: 'round',
            strokeJoin: 'round',
            ...options
        }

        this.pen = new Pen()
        this.isDrawing = false
        this.paths = [] // 存储所有绘画路径  

        this.init()
    }

    init() {
        // 设置画笔样式  
        this.pen.setStyle(this.options)
        this.container.add(this.pen)
        console.log(this.container);
        
        // 如果传入了 app 实例，设置 boxSelect 为 false
        if (this.app && this.app.editor) {
            this.app.editor.config.boxSelect = false;
        }
        
        // 绑定事件  
        this.bindEvents()
    }

    bindEvents() {
        this.container.on('pointer.down', this.onPointerDown.bind(this))
        this.container.on('pointer.move', this.onPointerMove.bind(this))
        this.container.on('pointer.up', this.onPointerUp.bind(this))
    }

    onPointerDown(e) {
        if (e.target === this.container || !e.target.editable) {
            this.isDrawing = true
            const x = e.x - this.container.x
            const y = e.y - this.container.y

            // 开始新路径  
            this.currentPath = [{ x, y }]
            this.pen.moveTo(x, y)
        }
    }

    onPointerMove(e) {
        if (this.isDrawing) {
            const x = e.x - this.container.x
            const y = e.y - this.container.y

            this.currentPath.push({ x, y })
            this.pen.lineTo(x, y)
            this.pen.paint()
        }
    }

    onPointerUp() {
        if (this.isDrawing) {
            this.isDrawing = false

            // 保存当前路径  
            if (this.currentPath && this.currentPath.length > 1) {
                this.paths.push({
                    points: [...this.currentPath],
                    style: { ...this.options }
                })
            }
        }
    }

    // 切换画笔样式  
    setBrush(style) {
        this.options = { ...this.options, ...style }
        this.pen.setStyle(this.options)
    }

    // 清除所有绘画  
    clear() {
        this.pen.clearPath()
        this.paths = []
        this.pen.paint()
    }

    // 撤销最后一笔  
    undo() {
        if (this.paths.length > 0) {
            this.paths.pop()
            this.redraw()
        }
    }

    // 重绘所有路径  
    redraw() {
        this.pen.clearPath()

        this.paths.forEach(pathData => {
            if (pathData.points.length > 0) {
                // 临时设置样式  
                const currentStyle = { ...this.options }
                this.pen.setStyle(pathData.style)

                // 绘制路径  
                this.pen.moveTo(pathData.points[0].x, pathData.points[0].y)
                for (let i = 1; i < pathData.points.length; i++) {
                    this.pen.lineTo(pathData.points[i].x, pathData.points[i].y)
                }

                // 恢复当前样式  
                this.pen.setStyle(currentStyle)
            }
        })

        this.pen.paint()
    }

    // 获取绘画数据  
    getDrawingData() {
        return {
            paths: this.paths,
            bounds: this.container.getBounds()
        }
    }

    // 加载绘画数据  
    loadDrawingData(data) {
        this.paths = data.paths || []
        this.redraw()
    }

    // 销毁插件  
    destroy() {
        this.container.off('pointer.down', this.onPointerDown)
        this.container.off('pointer.move', this.onPointerMove)
        this.container.off('pointer.up', this.onPointerUp)
        this.container.remove(this.pen)
    }
}

// 预设画笔样式  
export const BrushPresets = {
    pencil: {
        stroke: '#333',
        strokeWidth: 2,
        strokeCap: 'round',
        strokeJoin: 'round'
    },
    marker: {
        stroke: 'rgba(255, 107, 107, 0.7)',
        strokeWidth: 12,
        strokeCap: 'round',
        strokeJoin: 'round'
    },
    brush: {
        stroke: 'rgba(0, 150, 0, 0.5)',
        strokeWidth: 30,
        strokeCap: 'round',
        strokeJoin: 'round'
    },
    eraser: {
        stroke: '#fff',
        strokeWidth: 20,
        strokeCap: 'round',
        strokeJoin: 'round'
    }
}