<script setup>
import { ref } from 'vue';
import { App, Rect, Star, Frame, Ellipse, Group, Text, Image, Platform, DragEvent, KeyEvent, EditorEvent } from 'leafer-editor'
import '@leafer-in/editor'
import '@leafer-in/viewport' // 导入视口插件
import { Ruler } from 'leafer-x-ruler';
import { Snap } from 'leafer-x-easy-snap'
//import { Snap } from 'leafer-x-snap';
//import { EditToolbarPlugin } from 'leafer-x-edit-toolbar';    // 不好用
import { Toolkit } from 'leafer-x-toolkit'
import { DotMatrix } from 'leafer-x-dot-matrix'

import { onMounted, onUnmounted } from 'vue';
import useStore from './stores/useStore';

const store = useStore();

let app = null;
let ruler = null;
const workspace = ref(null);
const editorRef = ref(null);

onMounted(() => {
  app = new App({
    view: 'leafer-view',
    //tree: { type: 'viewport' },//给 tree 层添加视口
    fill: '#eee',
    editor: {
      //circle: {}, // 显示旋转控制点
      middlePoint: { width: 12, height: 4, cornerRadius: 2 },
    }, // 会自动创建 editor实例、tree层、sky层
  });
  store.app = app;

  // 初始化画布
  const { clientWidth, clientHeight } = editorRef.value

  // 创建一个白色背景的画布
  store.editor = new Frame({
    width: 400,
    height: 600,
    x: (clientWidth - 400) / 2,
    y: (clientHeight - 600) / 2,
    fill: '#fff',
    stroke: '#ccc',
    strokeWidth: 1,
  })

  app.tree.add(store.editor)

  // 事件
  app.on(KeyEvent.DOWN, (e) => {

    if (e.key === 'Delete') {
      //const selects = [...app.editor.leafList.list]
      //console.log(selects);
      app.editor.leafList.forEach(item => item.remove());
      app.editor.cancel()
      /*if (app.editor.selected.length) {
          app.editor.selected.forEach(item => item.remove());
          app.editor.selected = [];
      }*/
    } else if (e.key === 'a' && e.ctrlKey) {
      // 全选
      app.editor.select(store.editor.children)
      e.stopDefault()
    } else if (e.key === 'g' && e.ctrlKey) {
      // 组合
      const sel_num = app.editor.leafList.list.length
      if (sel_num > 1) {
        app.editor.group()
      } else if (sel_num === 1) {
        const leaf = app.editor.leafList.list[0]
        if (leaf instanceof Group) {
          app.editor.ungroup()
        }
      }
      e.stopDefault()
    }
  })

  // 添加标尺
  ruler = new Ruler(app);
  ruler.addTheme('custom1', {
    backgroundColor: '#6cb0ab',
    textColor: '#a45454',
    borderColor: '#6f4593',
    highlightColor: 'rgba(22,93,255,0.75)',
  });

  // 自动吸附、对齐辅助线
  (new Snap(app)).enable(true)

  // 创建点阵实例
  const dotMatrix = new DotMatrix(app)
  dotMatrix.enableDotMatrix(true)

  new Toolkit(app, {
    className: 'edit-toolbar',
    followScale: true,
    shouldShow: (node) => {
      console.log('node', node)
      return true
    },
    onRender(_node, container) {
      container.innerHTML = `
      <style>
        .toolbar {
          display: flex;
          align-items: center;
          height: 40px;
          margin: 10px 0;
          background-color: #fff;
          border-radius: 5px;
          border: 1px solid #ccc;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
        .divider {
          width: 1px;
          height: 100%;
          background: #ccc;
        }
        .item {
          display: flex;
          align-items: center;
          height: 100%;
          padding: 0 10px;
        }
        .item:hover {
          background: rgba(0, 0, 0, 0.1);
          cursor: pointer;
        }
      </style>
      <div class="toolbar">
        <div class="item"><span>ADD</span></div>
        <div class="divider"></div>
        <div class="item"><span>REMOVE</span></div>
      </div>
    `
    },
  })

})

onUnmounted(() => {
  if (app) {
    console.log('销毁 app', app);
    app.destroy()
    app = null
  }
})


defineExpose({
  app,
  workspace,
  editorRef,
})
</script>

<template>
  <div ref="editorRef" id="leafer-view"></div>
</template>

<style lang="scss" scoped></style>