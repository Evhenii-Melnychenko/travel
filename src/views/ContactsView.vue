<script setup lang="ts">
  import { computed, reactive, ref } from 'vue'
  import { useI18n } from 'vue-i18n'
  import TypingTitle from '@/components/TypingTitle.vue'

  type ContactField = 'name' | 'email' | 'subject' | 'message'

  const { t } = useI18n()
  const form = reactive<Record<ContactField, string>>({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const submitted = ref(false)
  const attemptedSubmit = ref(false)

  const errors = computed<Record<ContactField, string>>(() => {
    const result: Record<ContactField, string> = {
      name: '',
      email: '',
      subject: '',
      message: '',
    }

    for (const field of Object.keys(form) as ContactField[]) {
      if (!form[field].trim()) result[field] = t('contacts.required')
    }

    if (form.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      result.email = t('contacts.invalidEmail')
    }
    
    return result
  })

  function submitForm() {
    attemptedSubmit.value = true
    submitted.value = false

    if (Object.values(errors.value).some(Boolean)) return
    submitted.value = true
  }
</script>

<template>
  <div class="page-view">
    <section class="page-hero page-hero--contacts">
      <div class="page-hero__content">
        <p class="eyebrow">{{ t('contacts.eyebrow') }}</p>
        <h1 class="page-hero__title"><TypingTitle :text="t('contacts.title')" /></h1>
        <p class="page-hero__description">{{ t('contacts.description') }}</p>
      </div>
      <span class="page-hero__decoration" aria-hidden="true">↗</span>
    </section>

    <section class="contact section-pad">
      <div class="contact__main">
        <div class="contact__heading reveal">
          <p class="eyebrow">{{ t('contacts.formTitle') }}</p>
          <p>{{ t('contacts.formText') }}</p>
        </div>

        <form class="contact-form reveal" novalidate @submit.prevent="submitForm">
          <div class="contact-form__row">
            <div class="field">
              <label for="contact-name">{{ t('contacts.name') }} <span>*</span></label>
              <input
                id="contact-name"
                v-model="form.name"
                autocomplete="name"
                :placeholder="t('contacts.namePlaceholder')"
                :aria-invalid="attemptedSubmit && !!errors.name"
                :aria-describedby="attemptedSubmit && errors.name ? 'name-error' : undefined"
                required
              >
              <p v-if="attemptedSubmit && errors.name" id="name-error" class="field__error" role="alert">{{ errors.name }}</p>
            </div>
            <div class="field">
              <label for="contact-email">{{ t('contacts.email') }} <span>*</span></label>
              <input
                id="contact-email"
                v-model="form.email"
                type="email"
                autocomplete="email"
                :placeholder="t('contacts.emailPlaceholder')"
                :aria-invalid="attemptedSubmit && !!errors.email"
                :aria-describedby="attemptedSubmit && errors.email ? 'email-error' : undefined"
                required
              >
              <p v-if="attemptedSubmit && errors.email" id="email-error" class="field__error" role="alert">{{ errors.email }}</p>
            </div>
          </div>
          <div class="field">
            <label for="contact-subject">{{ t('contacts.subject') }} <span>*</span></label>
            <input
              id="contact-subject"
              v-model="form.subject"
              :placeholder="t('contacts.subjectPlaceholder')"
              :aria-invalid="attemptedSubmit && !!errors.subject"
              :aria-describedby="attemptedSubmit && errors.subject ? 'subject-error' : undefined"
              required
            >
            <p v-if="attemptedSubmit && errors.subject" id="subject-error" class="field__error" role="alert">{{ errors.subject }}</p>
          </div>
          <div class="field">
            <label for="contact-message">{{ t('contacts.message') }} <span>*</span></label>
            <textarea
              id="contact-message"
              v-model="form.message"
              rows="5"
              :placeholder="t('contacts.messagePlaceholder')"
              :aria-invalid="attemptedSubmit && !!errors.message"
              :aria-describedby="attemptedSubmit && errors.message ? 'message-error' : undefined"
              required
            ></textarea>
            <p v-if="attemptedSubmit && errors.message" id="message-error" class="field__error" role="alert">{{ errors.message }}</p>
          </div>
          <button class="button button--dark contact-form__submit" type="submit">{{ t('contacts.send') }} <span aria-hidden="true">↗</span></button>
          <p v-if="submitted" class="contact-form__success" role="status">{{ t('contacts.success', { name: form.name }) }}</p>
        </form>
      </div>

      <aside class="contact__aside reveal">
        <div class="contact__details">
          <p class="eyebrow">{{ t('contacts.contactTitle') }}</p>
          <a class="contact__email" href="mailto:hello@traveling.example">hello@traveling.example <span aria-hidden="true">↗</span></a>
          <p class="contact__address">{{ t('contacts.location') }}<br>{{ t('contacts.hours') }}</p>
        </div>
        <div class="contact__map">
          <iframe
            title="Map showing Kraków, Poland"
            :aria-label="t('contacts.mapTitle')"
            src="https://www.google.com/maps?q=Krakow,Poland&output=embed"
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
          ></iframe>
          <a href="https://maps.google.com/?q=Krakow,Poland" target="_blank" rel="noreferrer">{{ t('contacts.mapLink') }} <span aria-hidden="true">↗</span></a>
        </div>
      </aside>
    </section>
  </div>
</template>

<style src="../assets/styles/components/PageHero.css"></style>
<style src="../assets/styles/pages/ContactsView.css"></style>
