<script setup>
//import Editor from '@/components/editor/Editor.vue'
import { Button } from '@/components/ui/button'
import { Rect, Star } from 'leafer-ui'
import { LeCore } from '@/packages/core'
import { onMounted } from 'vue';

const leCore = new LeCore()

onMounted(() => {
    leCore.mount('#editor')
})

const addRect = (option) => {
    const rect = new Rect({
        editable: true,
        x: 100,
        y: 100,
        width: 100,
        height: 100,
        name: '矩形',
        fill: '#999',
        stroke: '#666',
        ...option,
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
        fill: '#696969',
    })
    leCore.app?.tree.add(star)
}

function exportJson() {
    const json = leCore.app?.tree.toJSON()
    console.log(json)
}
</script>

<template>
    <div class="flex flex-col gap-1 w-screen h-screen p-1">
        <div class="flex gap-2 bg-gray-200 p-1">
            <Button variant="outline" @click="exportJson">导出</Button>
        </div>
        <div class="flex gap-1 flex-1">
            <div class="w-12 bg-gray-200 flex flex-col gap-2 p-1">
                <Button @click="addRect" class="px-1">矩形</Button>
                <Button @click="addStar" class="px-1">星形</Button>
            </div>
            <div id="editor" class="flex-1 bg-gray-300"></div>
            <div class="w-10 bg-gray-200"></div>
        </div>
    </div>
</template>

<style lang="scss" scoped></style>