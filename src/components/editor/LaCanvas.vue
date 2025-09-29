<script setup>
import { useColorMode } from '@vueuse/core'
import { ref, watch, computed } from 'vue';
import { App, Rect, Star, Frame, Ellipse, Group, Text, Image, Platform, DragEvent, KeyEvent, EditorEvent, PointerEvent, ChildEvent } from 'leafer-editor'
import '@leafer-in/editor'
import '@leafer-in/viewport' // 导入视口插件
import '@leafer-in/state' // 导入交互状态插件  
import { Ruler } from 'leafer-x-ruler';
//import { Snap } from '@gorvey/leafer-x-easy-snap';
import { Snap } from 'leafer-x-snap';
//import { Snap } from 'leafer-x-easy-snap'
//import { EditToolbarPlugin } from 'leafer-x-edit-toolbar';    // 不好用
//import { Toolkit } from 'leafer-x-toolkit'
//import { DotMatrix } from 'leafer-x-dot-matrix'
import { HistoryPlugin } from './plugins/HistoryPlugin.js'


//import { PenDraw } from './object/PenDarw.js'

import { onMounted, onUnmounted } from 'vue';
import useStore from './stores/useStore';

const store = useStore();

let app = null;
let ruler = null;
const workspace = ref(null);
const editorRef = ref(null);
const { system, store: mode } = useColorMode()
const modeName = computed(() => mode.value === 'auto' ? system.value : mode.value)

const canvasBg = {
  light: '#eee',
  dark: '#282828',
}

onMounted(() => {
  app = new App({
    view: 'leafer-view',
    //tree: { type: 'viewport' },//给 tree 层添加视口
    fill: canvasBg[modeName.value],
    editor: {
      //circle: {}, // 显示旋转控制点
      middlePoint: { width: 12, height: 4, cornerRadius: 2 },
    }, // 会自动创建 editor实例、tree层、sky层
  });

  store.app = app;

  // 初始化画布
  const { clientWidth, clientHeight } = editorRef.value

  // 创建一个白色背景的画布
  const editor = new Frame({
    name: 'editor',
    width: 400,
    height: 600,
    fill: '#fff',
    stroke: '#ccc',
    strokeWidth: 1,
  })
  store.editor = editor;
  
  // 刷新对象列表
  editor.on([ChildEvent.ADD, ChildEvent.REMOVE], (e) => {
    store.children = editor.children;
  })


  const history = new HistoryPlugin(app, editor, {
    maxHistory: 100
  })

  // 画布
  const cvs = new Group({
    x: (clientWidth - 400) / 2,
    y: (clientHeight - 600) / 2,
  })

  const etitle = new Text({
    text: 'Editor 1',
    x: 0,
    y: -24,
    fill: '#666',
    fontSize: 16,
    fontWeight: 'bold',
    hoverStyle: {
      fill: '#000',
    }
  })
  etitle.on(PointerEvent.TAP, (e) => {
    store.selected = [cvs]
    //app.tree.select(editor)
    e.stopDefault();
    console.log('点击了标题', cvs);
  })

  // 添加拖拽事件处理，实现拖拽etitle时移动整个cvs组
  etitle.on(PointerEvent.DOWN, (e) => {
    // 临时禁用框选，并启用组拖拽
    app.editor.config.boxSelect = false
    cvs.set({ draggable: true })
  })

  etitle.on(DragEvent.END, (e) => {
    // 启用框选，禁用组拖拽
    app.editor.config.boxSelect = true
    cvs.set({ draggable: false })
  })

  cvs.add(etitle)
  cvs.add(editor)
  //const penDraw = new PenDraw(cvs, app)

  app.tree.add(cvs)

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
  ruler.addTheme('light', {
    backgroundColor: '#f4f4f4',
    textColor: '#333',
    borderColor: '#999',
    highlightColor: 'rgba(22,93,255,0.75)',
  });
  ruler.addTheme('dark', {
    backgroundColor: '#333',
    textColor: '#eee',
    borderColor: '#999',
    highlightColor: 'rgba(22,93,255,0.75)',
  });
  ruler.changeTheme(modeName.value);


  watch(mode, (newMode) => {
    newMode = newMode === 'auto' ? system.value : newMode
    ruler.changeTheme(newMode);
    app.fill = canvasBg[newMode]
  })


  // 自动吸附、对齐辅助线
  const snap = new Snap(app);
  snap.enable(true);

  // 创建点阵实例
  // const dotMatrix = new DotMatrix(app)
  // dotMatrix.enableDotMatrix(true)



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