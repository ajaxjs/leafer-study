<script setup>
import { ref } from 'vue'
import { Button } from '../ui/button'
import LaCanvas from './LaCanvas.vue'
import LaSideLeft from './LaSideLeft.vue'
import LaSideRight from './LaSideRight.vue'
import LaTopBar from './LaTopBar.vue'
import { onMounted } from 'vue'

const editor = ref(null)


onMounted(() => {
    console.log('editor', editor.value.addRact);
})

</script>

<template>
    <div class="flex flex-col">
        <LaTopBar />
        <div class="flex flex-1">
            <LaSideLeft class="w-10 border-r" />
            <LaCanvas ref="editor" class="editor" />
            <LaSideRight class="w-50" />
        </div>
    </div>
</template>

<style scoped>
.editor {
    width: calc(100% - 240px);
}
</style>
