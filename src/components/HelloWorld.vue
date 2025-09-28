<script setup lang="ts">
import { Leafer, Rect, Image, Text, PointerEvent } from 'leafer-ui'
import { onMounted } from 'vue';

onMounted(() => {
  const leafer = new Leafer({ view: 'leafer-view', width: 500, height: 500 });

  const rect = new Rect({
    x: 100,
    y: 100,
    width: 100,
    height: 100,
    fill: '#32cd79',
    cornerRadius: [50, 80, 0, 80],
    draggable: true,
    origin: 'center',
    event: {
      [PointerEvent.ENTER]: function (e: PointerEvent) {
        (e.current as Rect).fill = '#42dd89';
        (e.current as Rect).scale = 1.2;
      },
      [PointerEvent.LEAVE]: function (e: PointerEvent) {
        (e.current as Rect).fill = '#32cd79';
        (e.current as Rect).scale = 1;
      }
    }
  })

  const image = new Image({
    url: '/vite.svg',
    x: 200,
    y: 200,
    width: 100,
    height: 100,
    draggable: true,
    event: {
      tap: function () {
        console.log('tap')
      }
    }
  })


  const text = new Text({
    fill: '#32cd79',
    text: 'Welcome to LeaferJS',
    x: 50,
    y: 50,
    fontSize: 30,
    fontFamily: 'Arial',
    draggable: true
  })
  leafer.add(text)
  leafer.add(image)
  leafer.add(rect)
});
</script>

<template>
  <div class="flex flex-col items-center justify-center">
    <div id="leafer-view" class="shadow-sm m-auto"></div>
  </div>
</template>