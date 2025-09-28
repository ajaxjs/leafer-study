<template>
    <div class="w-10 p-1 flex flex-col gap-1">
        <Button variant="outline" class="p-0" @click="store.addRact">
            <Square />
        </Button>
        <Button variant="outline" class="p-0" @click="store.addStar({ corners: 6, cornerRadius: 5 })">
            <Sparkle />
        </Button>
        <Button variant="outline" class="p-0" @click="store.addText()">
            <TypeOutline />
        </Button>
        <Button variant="outline" as="label" class="p-0">
            <input type="file" class="hidden" @change="addImage" />
            <ImageUp />
        </Button>
    </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { Button } from '../ui/button'
import { Square, Sparkle, TypeOutline, ImageUp } from 'lucide-vue-next'
import useStore from './stores/useStore';

const store = useStore()
const editor = computed(() => store.editor)

const addRact = () => editor.value.addRact({ x: 50, y: 50 })
const addImage = (e) => {
    const file = e.target.files[0]
    if (!file) return

    if (file.type == 'image/svg+xml') {
        const reader = new FileReader()
        reader.onload = (event) => {
            const svgContent = event.target.result
            store.addImage(svgContent, { format: 'svg' })
        }
        reader.readAsText(file)
    } else {
        const imageUrl = URL.createObjectURL(file)
        store.addImage(imageUrl)
    }

}
</script>

<style lang="scss" scoped></style>