<script setup>
//import Editor from '@/components/editor/Editor.vue'
import { Button } from '@/components/ui/button'
import { Rect, Star } from 'leafer-ui'
import { LeCore } from '@/packages/core'
import { onMounted } from 'vue';

const leCore = new LeCore()
onMounted(() => {
  leCore.mount('#editor')
  console.log('--leCore', leCore);
  
})

const addRect = () => {
  const rect = new Rect({
    editable: true,
    x: 100,
    y: 100,
    width: 100,
    height: 100,
    fill: '#ff6600',
  })
  leCore.app?.tree.add(rect)
}

const addStar = () => {
  const star = new Star({
    editable: true,
    x: 200,
    y: 200,
    width: 100,
    height: 100,
    fill: '#ff6600',
  })
  leCore.app?.tree.add(star)
}
</script>

<template>
  <div class="wrap flex gap-1 w-screen h-screen">
    <div class="w-12 bg-gray-200 flex flex-col gap-2 p-1">
      <Button @click="addRect" class="px-1">矩形</Button>
      <Button @click="addStar" class="px-1">星形</Button>
    </div>
    <div id="editor" class="flex-1 bg-gray-300">
    </div>
    <div class="w-10 bg-gray-200"></div>
  </div>
</template>

<style lang="scss" scoped></style>