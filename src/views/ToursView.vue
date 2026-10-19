<script setup lang="ts">
  import { computed, ref } from 'vue'
  import { useI18n } from 'vue-i18n'
  import TourCard from '@/components/TourCard.vue'
  import TypingTitle from '@/components/TypingTitle.vue'
  import creteImage from '@/assets/images/pages/journeys/crete.avif'
  import dolomitesImage from '@/assets/images/pages/journeys/dolomites.avif'
  import icelandImage from '@/assets/images/pages/journeys/iceland.avif'
  import kyotoImage from '@/assets/images/pages/journeys/kyoto.avif'
  import madeiraImage from '@/assets/images/pages/journeys/madeira.avif'
  import moroccoImage from '@/assets/images/pages/journeys/morocco.avif'

  const { t } = useI18n()
  type JourneyCategory = 'nature' | 'adventure' | 'culture'
  const activeFilter = ref<'all' | JourneyCategory>('all')

  const categoryCounts: Record<JourneyCategory, number> = {
    nature: 2,
    adventure: 2,
    culture: 2,
  }
  const filters: Array<'all' | JourneyCategory> = ['all', 'nature', 'adventure', 'culture']
  const visibleCount = computed(() =>
    activeFilter.value === 'all' ? 6 : categoryCounts[activeFilter.value],
  )

  function isVisible(category: JourneyCategory) {
    return activeFilter.value === 'all' || activeFilter.value === category
  }
</script>

<template>
  <div class="page-view">
    <section class="page-hero page-hero--tours">
      <div class="page-hero__content">
        <p class="eyebrow">{{ t('tours.eyebrow') }}</p>
        <h1 class="page-hero__title"><TypingTitle :text="t('tours.title')" /></h1>
        <p class="page-hero__description">{{ t('tours.description') }}</p>
      </div>
      <span class="page-hero__decoration" aria-hidden="true">✳</span>
    </section>

    <section class="catalog section-pad">
      <div class="catalog__top">
        <p class="catalog__count">{{ t('tours.resultCount', { count: visibleCount }) }}</p>
        <div class="filter" role="group" :aria-label="t('tours.filterLabel')">
          <button
            v-for="filter in filters"
            :key="filter"
            class="filter__button"
            :class="{ 'filter__button--active': activeFilter === filter }"
            type="button"
            :aria-pressed="activeFilter === filter"
            @click="activeFilter = filter"
          >
            {{ t(`common.${filter}`) }}
          </button>
        </div>
      </div>
      <div class="tour-grid tour-grid--catalog">
        <TourCard
          v-if="isVisible('adventure')"
          :title="t('tours.items.dolomites.title')"
          :location="t('tours.items.dolomites.location')"
          :description="t('tours.items.dolomites.description')"
          :duration="t('tours.duration.dolomites')"
          :category="t('common.adventure')"
          price="€1,490"
          :image="dolomitesImage"
          image-alt="Mountain peaks in the Dolomites"
        />
        <TourCard
          v-if="isVisible('culture')"
          :title="t('tours.items.kyoto.title')"
          :location="t('tours.items.kyoto.location')"
          :description="t('tours.items.kyoto.description')"
          :duration="t('tours.duration.kyoto')"
          :category="t('common.culture')"
          price="€2,180"
          :image="kyotoImage"
          image-alt="Historic Kyoto street"
        />
        <TourCard
          v-if="isVisible('nature')"
          :title="t('tours.items.madeira.title')"
          :location="t('tours.items.madeira.location')"
          :description="t('tours.items.madeira.description')"
          :duration="t('tours.duration.madeira')"
          :category="t('common.nature')"
          price="€1,260"
          :image="madeiraImage"
          image-alt="Madeira coastline"
        />
        <TourCard
          v-if="isVisible('culture')"
          :title="t('tours.items.morocco.title')"
          :location="t('tours.items.morocco.location')"
          :description="t('tours.items.morocco.description')"
          :duration="t('tours.duration.morocco')"
          :category="t('common.culture')"
          price="€1,740"
          :image="moroccoImage"
          image-alt="Warm-toned Moroccan architecture"
        />
        <TourCard
          v-if="isVisible('adventure')"
          :title="t('tours.items.iceland.title')"
          :location="t('tours.items.iceland.location')"
          :description="t('tours.items.iceland.description')"
          :duration="t('tours.duration.iceland')"
          :category="t('common.adventure')"
          price="€2,090"
          :image="icelandImage"
          image-alt="Waterfall in a dramatic Icelandic landscape"
        />
        <TourCard
          v-if="isVisible('nature')"
          :title="t('tours.items.crete.title')"
          :location="t('tours.items.crete.location')"
          :description="t('tours.items.crete.description')"
          :duration="t('tours.duration.crete')"
          :category="t('common.nature')"
          price="€1,380"
          :image="creteImage"
          image-alt="Aegean coastline in Greece"
        />
      </div>
      <p class="catalog__note">{{ t('tours.note') }}</p>
    </section>
  </div>
</template>

<style src="../assets/styles/components/PageHero.css"></style>
<style src="../assets/styles/pages/ToursView.css"></style>
