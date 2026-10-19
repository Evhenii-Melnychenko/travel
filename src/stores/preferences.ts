import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { AppLocale } from '@/i18n'

type ColorTheme = 'light' | 'dark'

function readPreference<T extends string>(key: string, allowed: readonly T[], fallback: T): T {
  const value = window.localStorage.getItem(key)
  return value && allowed.includes(value as T) ? (value as T) : fallback
}

export const usePreferencesStore = defineStore('preferences', () => {
  const locale = ref<AppLocale>(readPreference<AppLocale>('traveling-locale', ['en', 'pl'], 'en'))
  const theme = ref<ColorTheme>(readPreference('traveling-theme', ['light', 'dark'], 'light'))

  function setLocale(value: AppLocale) {
    locale.value = value
    window.localStorage.setItem('traveling-locale', value)
  }

  function toggleTheme() {
    theme.value = theme.value === 'light' ? 'dark' : 'light'
    window.localStorage.setItem('traveling-theme', theme.value)
  }

  return { locale, theme, setLocale, toggleTheme }
})
