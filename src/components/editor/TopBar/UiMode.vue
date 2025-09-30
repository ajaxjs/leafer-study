<script setup>
import { useColorMode } from '@vueuse/core'
import { Button } from '@/components/ui/button'
import {Sun, Moon, MonitorCog} from 'lucide-vue-next'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
//import useStore from '../stores/useStore'
//const store = useStore()
const { store: mode } = useColorMode()
</script>

<template>
    <DropdownMenu>
        <DropdownMenuTrigger as-child>
            <Button variant="ghost">
                <Sun
                    class="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon
                    class="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                <span class="sr-only">Toggle theme</span>
            </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
            <DropdownMenuItem @click="mode = 'light'" :class="{'text-blue-500': mode === 'light'}">
                <Sun class="mr-2 h-[1.2rem] w-[1.2rem]" />
                Light
            </DropdownMenuItem>
            <DropdownMenuItem @click="mode = 'dark'" :class="{'text-blue-500': mode === 'dark'}">
                <Moon class="mr-2 h-[1.2rem] w-[1.2rem]" />
                Dark
            </DropdownMenuItem>
            <DropdownMenuItem @click="mode = 'auto'" :class="{'text-blue-500': mode === 'auto'}">
                <MonitorCog class="mr-2 h-[1.2rem] w-[1.2rem]" />
                System
            </DropdownMenuItem>
        </DropdownMenuContent>
    </DropdownMenu>
</template>