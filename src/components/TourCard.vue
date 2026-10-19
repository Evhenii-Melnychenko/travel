<script setup lang="ts">
  defineProps<{
    title: string
    location: string
    description: string
    duration: string
    price: string
    image: string
    imageAlt: string
    category: string
  }>()
</script>

<template>
  <article class="tour-card reveal">
    <div class="tour-card__image-wrap">
      <img class="tour-card__image" :src="image" :alt="imageAlt" loading="lazy">
      <span class="tour-card__category">{{ category }}</span>
      <span class="tour-card__duration">{{ duration }}</span>
    </div>
    <div class="tour-card__body">
      <p class="tour-card__location"><span aria-hidden="true">↗</span> {{ location }}</p>
      <h3 class="tour-card__title">{{ title }}</h3>
      <p class="tour-card__description">{{ description }}</p>
      <div class="tour-card__footer">
        <span>{{ price }}</span>
        <span class="tour-card__arrow" aria-hidden="true">↗</span>
      </div>
    </div>
  </article>
</template>

<style src="../assets/styles/components/TourCard.css"></style>
