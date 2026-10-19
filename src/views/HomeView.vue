<script setup lang="ts">
  import { computed } from 'vue'
  import { RouterLink } from 'vue-router'
  import { useI18n } from 'vue-i18n'
  import TourCard from '@/components/TourCard.vue'
  import TypingTitle from '@/components/TypingTitle.vue'
  import dolomitesImage from '@/assets/images/pages/journeys/dolomites.avif'
  import kyotoImage from '@/assets/images/pages/journeys/kyoto.avif'
  import madeiraImage from '@/assets/images/pages/journeys/madeira.avif'

  const { t } = useI18n()

  const featuredTours = computed(() => [
    {
      id: 'dolomites',
      image: dolomitesImage,
      imageAlt: 'Sunrise over dramatic alpine peaks',
      price: '€1,490',
      category: 'adventure',
    },
    {
      id: 'kyoto',
      image: kyotoImage,
      imageAlt: 'Traditional street in Kyoto at dusk',
      price: '€2,180',
      category: 'culture',
    },
    {
      id: 'madeira',
      image: madeiraImage,
      imageAlt: 'Green coastal cliffs above a blue ocean',
      price: '€1,260',
      category: 'nature',
    },
  ])

  const benefits = [
    { key: 'local', number: '01', icon: '✳' },
    { key: 'small', number: '02', icon: '↗' },
    { key: 'thoughtful', number: '03', icon: '◌' },
  ] as const
</script>

<template>
  <div class="home-page">
    <section class="hero hero--home">
      <div class="hero__image" aria-hidden="true"></div>
      <div class="hero__content">
        <p class="eyebrow hero__eyebrow">{{ t('home.eyebrow') }}</p>
        <h1 class="hero__title"><TypingTitle :text="t('home.title')" /></h1>
        <p class="hero__description">{{ t('home.description') }}</p>
        <div class="hero__actions">
          <RouterLink class="button button--light" to="/tours">{{ t('home.cta') }} <span aria-hidden="true">↗</span></RouterLink>
          <a class="hero__text-link" href="#our-way">{{ t('home.secondaryCta') }} <span aria-hidden="true">↓</span></a>
        </div>
      </div>
      <a class="hero__scroll" href="#our-way"><span></span>{{ t('home.scroll') }}</a>
      <div class="hero__index"><span>01</span><span></span><span>04</span></div>
    </section>

    <section id="our-way" class="intro section-pad">
      <div class="intro__label reveal">
        <span class="eyebrow">{{ t('home.introEyebrow') }}</span>
        <span class="intro__asterisk" aria-hidden="true">✳</span>
      </div>
      <div class="intro__content reveal">
        <h2 class="section-title">{{ t('home.introTitle') }}</h2>
        <p class="intro__text">{{ t('home.introText') }}</p>
        <RouterLink class="text-link" to="/team">{{ t('common.readMore') }} <span aria-hidden="true">↗</span></RouterLink>
      </div>
      <div class="intro__note reveal"><span>EST. WITH CURIOSITY</span><span>✳</span><span>GO A LITTLE FURTHER</span></div>
    </section>

    <section class="featured section-pad section-pad--top">
      <div class="section-heading reveal">
        <div>
          <p class="eyebrow">{{ t('home.featured') }}</p>
          <h2 class="section-title section-title--small">{{ t('home.featuredText') }}</h2>
        </div>
        <RouterLink class="text-link section-heading__link" to="/tours">{{ t('home.allJourneys') }} <span aria-hidden="true">↗</span></RouterLink>
      </div>
      <div class="tour-grid tour-grid--featured">
        <TourCard
          v-for="tour in featuredTours"
          :key="tour.id"
          :title="t(`tours.items.${tour.id}.title`)"
          :location="t(`tours.items.${tour.id}.location`)"
          :description="t(`tours.items.${tour.id}.description`)"
          :duration="t(`tours.duration.${tour.id}`)"
          :category="t(`common.${tour.category}`)"
          :price="tour.price"
          :image="tour.image"
          :image-alt="tour.imageAlt"
        />
      </div>
    </section>

    <section class="benefits section-pad">
      <div class="benefits__heading reveal">
        <p class="eyebrow">{{ t('home.whyEyebrow') }}</p>
        <h2 class="section-title">{{ t('home.whyTitle') }}</h2>
      </div>
      <div class="benefits__list">
        <article v-for="benefit in benefits" :key="benefit.key" class="benefit reveal">
          <span class="benefit__number">{{ benefit.number }}</span>
          <span class="benefit__icon" aria-hidden="true">{{ benefit.icon }}</span>
          <div class="benefit__content">
            <h3>{{ t(`home.benefits.${benefit.key}.title`) }}</h3>
            <p>{{ t(`home.benefits.${benefit.key}.text`) }}</p>
          </div>
          <span class="benefit__arrow" aria-hidden="true">↗</span>
        </article>
      </div>
    </section>

    <section class="quote-band">
      <span class="quote-band__mark" aria-hidden="true">“</span>
      <blockquote>{{ t('home.quote') }}</blockquote>
      <p>{{ t('home.quoteBy') }}</p>
    </section>
  </div>
</template>

<style src="../assets/styles/pages/HomeView.css"></style>
