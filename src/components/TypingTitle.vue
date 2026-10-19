<script setup lang="ts">
  import { onMounted, onUnmounted, ref, watch } from 'vue'

  const props = defineProps<{
    text: string
  }>()

  const visibleText = ref('')
  let timer: number | undefined
  let reducedMotion = false

  function typeText() {
    if (timer !== undefined) window.clearInterval(timer)
    visibleText.value = ''
  
    if (reducedMotion) {
      visibleText.value = props.text

      return
    }

    let index = 0
    timer = window.setInterval(() => {
      index += 1
      visibleText.value = props.text.slice(0, index)
      
      if (index >= props.text.length && timer !== undefined) {
        window.clearInterval(timer)
        timer = undefined
      }
    }, 48)
  }

  onMounted(() => {
    reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    typeText()
  })

  watch(() => props.text, typeText)

  onUnmounted(() => {
    if (timer !== undefined) window.clearInterval(timer)
  })
</script>

<template>
  <span class="typing-title" :aria-label="text" role="text">
    <span aria-hidden="true">{{ visibleText }}</span><span class="typing-title__cursor" aria-hidden="true"></span>
  </span>
</template>

<style src="../assets/styles/components/TypingTitle.css"></style>
