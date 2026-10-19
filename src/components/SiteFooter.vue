<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const year = new Date().getFullYear()
</script>

<template>
  <footer class="site-footer">
    <div class="site-footer__top">
      <div>
        <RouterLink class="site-footer__brand" to="/">traveling<span>.</span></RouterLink>
        <p class="site-footer__tagline">{{ t('common.footerLine') }}</p>
      </div>
      <div class="site-footer__cta">
        <p>{{ t('common.footerCta') }}</p>
        <RouterLink class="site-footer__link" to="/contacts">{{ t('common.getInTouch') }} <span aria-hidden="true">↗</span></RouterLink>
      </div>
    </div>
    <div class="site-footer__bottom">
      <span>© {{ year }} Traveling. {{ t('common.footerLine') }}</span>
      <span class="site-footer__made">Made for the journey. All rights reserved. <span aria-hidden="true">✳</span></span>
    </div>
  </footer>
</template>

<style src="../assets/styles/components/SiteFooter.css"></style>
