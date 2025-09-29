<script setup>
import { computed, ref } from 'vue'
import useStore from './stores/useStore'

const store = useStore()
const layers = computed(() => store.editor?.children || [])
console.log(store.editor)

</script>

<template>
    <div>
        {{ store.children.length }}
        <div v-for="(lay,i) in store.children" :key="i" class="lay-item">
            {{lay.type}}-{{lay.name}}
        </div>
    </div>
</template>


<style lang="scss" scoped></style>