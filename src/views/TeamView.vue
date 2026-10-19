<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import TypingTitle from '@/components/TypingTitle.vue'
import jesicaImage from '@/assets/images/pages/team/jesica.avif'
import mayaImage from '@/assets/images/pages/team/maya.avif'
import oliverImage from '@/assets/images/pages/team/oliver.avif'
import theoImage from '@/assets/images/pages/team/theo.avif'

const { t } = useI18n()

const members = [
  { id: 'maya', image: mayaImage, alt: 'Portrait of Maya Bennett' },
  { id: 'oliver', image: oliverImage, alt: 'Portrait of Oliver Grant' },
  { id: 'jesica', image: jesicaImage, alt: 'Portrait of Jesica Smith' },
  { id: 'theo', image: theoImage, alt: 'Portrait of Theo Martin' },
] as const
</script>

<template>
  <div class="page-view">
    <section class="page-hero page-hero--team">
      <div class="page-hero__content">
        <p class="eyebrow">{{ t('team.eyebrow') }}</p>
        <h1 class="page-hero__title"><TypingTitle :text="t('team.title')" /></h1>
        <p class="page-hero__description">{{ t('team.description') }}</p>
      </div>
      <span class="page-hero__decoration" aria-hidden="true">✳</span>
    </section>

    <section class="team section-pad">
      <div class="team__intro reveal">
        <span class="team__intro-mark" aria-hidden="true">“</span>
        <p>{{ t('team.intro') }}</p>
      </div>
      <div class="team__grid">
        <article v-for="(member, index) in members" :key="member.id" class="team-card reveal">
          <div class="team-card__image-wrap">
            <img
              class="team-card__image"
              :src="member.image"
              :alt="member.alt"
              loading="lazy"
            >
            <span class="team-card__index">0{{ index + 1 }}</span>
          </div>
          <div class="team-card__info">
            <div>
              <h2>{{ t(`team.members.${member.id}.name`) }}</h2>
              <p class="team-card__role">{{ t(`team.members.${member.id}.role`) }}</p>
            </div>
            <p class="team-card__bio">{{ t(`team.members.${member.id}.bio`) }}</p>
          </div>
        </article>
      </div>
    </section>

    <section class="team-values">
      <div class="team-values__shape" aria-hidden="true">✳</div>
      <div class="team-values__content reveal">
        <p class="eyebrow">{{ t('team.valuesEyebrow') }}</p>
        <h2>{{ t('team.valuesTitle') }}</h2>
        <p>{{ t('team.valuesText') }}</p>
      </div>
    </section>
  </div>
</template>

<style src="../assets/styles/components/PageHero.css"></style>
<style src="../assets/styles/pages/TeamView.css"></style>
