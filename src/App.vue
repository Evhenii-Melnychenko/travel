<script setup lang="ts">
  import { watch } from 'vue'
  import { RouterView } from 'vue-router'
  import { useI18n } from 'vue-i18n'
  import SiteHeader from '@/components/SiteHeader.vue'
  import SiteFooter from '@/components/SiteFooter.vue'
  import { i18n } from '@/i18n'
  import { usePreferencesStore } from '@/stores/preferences'

  const preferences = usePreferencesStore()
  const { t } = useI18n()

  watch(
    () => preferences.locale,
    (locale) => {
      i18n.global.locale.value = locale
      document.documentElement.lang = locale
    },
    { immediate: true },
  )

  watch(
    () => preferences.theme,
    (theme) => {
      document.documentElement.dataset.theme = theme
    },
    { immediate: true },
  )
</script>

<template>
  <div class="app-shell">
    <a class="skip-link" href="#main-content">{{ t('common.skipToContent') }}</a>
    <SiteHeader />
    <main id="main-content">
      <RouterView v-slot="{ Component, route }">
        <Transition name="page" mode="out-in">
          <component :is="Component" :key="route.path" />
        </Transition>
      </RouterView>
    </main>
    <SiteFooter />
  </div>
</template>
