<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import type { AppLocale } from '@/i18n'
import { usePreferencesStore } from '@/stores/preferences'

const { t } = useI18n()
const preferences = usePreferencesStore()
const route = useRoute()
const menuOpen = ref(false)
const hasScrolled = ref(false)

const navItems = [
  { name: 'home', label: 'common.home' },
  { name: 'tours', label: 'common.tours' },
  { name: 'team', label: 'common.team' },
  { name: 'contacts', label: 'common.contacts' },
] as const

function changeLocale(event: Event) {
  preferences.setLocale((event.target as HTMLSelectElement).value as AppLocale)
}

function updateScrollState() {
  hasScrolled.value = window.scrollY > 8
}

onMounted(() => {
  updateScrollState()
  window.addEventListener('scroll', updateScrollState, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('scroll', updateScrollState)
})
</script>

<template>
  <header class="site-header" :class="{ 'site-header--scrolled': hasScrolled }">
    <div class="site-header__inner">
      <RouterLink class="site-header__brand" to="/" :aria-label="`Traveling — ${t('common.home')}`" @click="menuOpen = false">
        <span class="site-header__mark" aria-hidden="true">t.</span>
        <span class="site-header__wordmark">traveling<span>.</span></span>
      </RouterLink>

      <button
        class="site-header__menu-toggle"
        type="button"
        :aria-label="menuOpen ? t('common.closeMenu') : t('common.openMenu')"
        :aria-expanded="menuOpen"
        @click="menuOpen = !menuOpen"
      >
        <span></span><span></span>
      </button>

      <nav class="site-header__nav" :class="{ 'site-header__nav--open': menuOpen }" :aria-label="t('common.navigation')">
        <RouterLink
          v-for="item in navItems"
          :key="item.name"
          class="site-header__link"
          :class="{ 'site-header__link--active': route.name === item.name }"
          :to="{ name: item.name }"
          @click="menuOpen = false"
        >
          {{ t(item.label) }}
        </RouterLink>
      </nav>

      <div class="site-header__tools">
        <label class="site-header__language">
          <span class="visually-hidden">{{ t('common.language') }}</span>
          <select :value="preferences.locale" @change="changeLocale">
            <option value="en">EN</option>
            <option value="pl">PL</option>
          </select>
        </label>
        <button
          class="site-header__theme"
          type="button"
          :aria-label="t('common.theme')"
          @click="preferences.toggleTheme()"
        >
          <svg v-if="preferences.theme === 'light'" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M20.2 15.1A8.3 8.3 0 0 1 8.9 3.8 8.4 8.4 0 1 0 20.2 15.1Z" />
          </svg>
          <svg v-else viewBox="0 0 24 24" aria-hidden="true">
            <circle cx="12" cy="12" r="4" /><path d="M12 2v2m0 16v2M4.9 4.9l1.4 1.4m11.4 11.4 1.4 1.4M2 12h2m16 0h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
          </svg>
        </button>
      </div>
    </div>
  </header>
</template>

<style src="../assets/styles/components/SiteHeader.css"></style>
