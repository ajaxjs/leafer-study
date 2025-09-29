<template>
    <div class="flex items-center h-10 gap-2 p-1">
        <Button variant="ghost" class="py-0 line-">文件</Button>
        <Button variant="ghost" class="py-0 line-">编辑</Button>
        <div class="flex-1"></div>
        <UiMode />
        <DropdownMenu>
            <DropdownMenuTrigger>
                <Button variant="ghost" class="py-0 line-">导出</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem @click="exportPNG">导出PNG</DropdownMenuItem>
                <DropdownMenuItem @click="exportJSON">导出JSON</DropdownMenuItem>
                <DropdownMenuItem>Team</DropdownMenuItem>
                <DropdownMenuItem>Subscription</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>

    </div>
</template>

<script setup>
import { Button } from '../ui/button'
import UiMode from './TopBar/UiMode.vue'

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import useStore from './stores/useStore';
const store = useStore()

function exportJSON() {
    if (!store.editor) return
    if(store.editor.children.length === 0) return
    
    console.log('exportJSON', store.editor.toJSON());
}
function exportPNG() {
    if (!store.app) return
    if(store.editor.children.length === 0) return
    store.app.editor.cancel()
    store.app.export('canvas.png')
}
</script>

<style lang="scss" scoped></style>