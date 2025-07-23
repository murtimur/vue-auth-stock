<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="container">
    <form class="login-form" @submit.prevent="submit">
      <AppInput
        :help="errors.username"
        id="username"
        label="Kullanıcı Adı"
        v-model="formState.username"
        class="form-input"
      />
      <AppInput
        :help="errors.password"
        id="password"
        label="Şifre"
        v-model="formState.password"
        type="password"
        class="form-input"
      />
      <AppAlert v-if="errorMessage" variant="danger" center="true">{{ errorMessage }}</AppAlert>
      <AppButton
        :api-progress="apiProgress"
        :is-disabled="isDisabled"
        type="submit"
        class="form-button"
        >Giriş Yap</AppButton
      >
      <div class="text-center">
        <AppIcon name="fc-settings" style="height: 50px; width: 50px" />
      </div>
    </form>
  </div>
</template>

<script setup>
import { computed, reactive, ref, watch } from 'vue'
import AppInput from '@/components/AppInput.vue'
import AppButton from '@/components/AppButton.vue'
import AppIcon from '@/components/AppIcon.vue'
import AppAlert from '@/components/AppAlert.vue'
import { useAuthStore } from '@/stores/auth'
import { login } from './api'
import { useRouter } from 'vue-router'

const { setLoggedIn } = useAuthStore()
const router = useRouter()

const formState = reactive({ username: '', password: '' })

const errors = ref({})

const errorMessage = ref()

const apiProgress = ref(false)

const submit = async () => {
  apiProgress.value = true
  errorMessage.value = undefined
  try {
    const response = await login(formState)
    setLoggedIn(response.data.user)
    await router.push('/home')
  } catch (apiError) {
    if (apiError.response?.status === 400) {
      errors.value = apiError.response.data.validationErrors
    } else if (apiError.response?.data?.message) {
      errorMessage.value = apiError.response.data.message
    } else {
      errorMessage.value = 'Bir hata oluştu Web Servislerine erişim sağlanamıyor!'
    }
  } finally {
    apiProgress.value = false
  }
}

const isDisabled = computed(() => {
  return !(formState.password && formState.username)
})

watch(
  () => formState.username,
  () => {
    delete errors.value.username
  },
)
watch(
  () => formState.password,
  () => {
    delete errors.value.password
  },
)

watch(
  () => [formState.username, formState.password],
  () => {
    errorMessage.value = undefined
  },
)
</script>

<style scoped>
.container {
  display: grid;
  place-items: center;
  min-height: 100dvh; /* Mobil tarayıcılarda daha doğru davranır */
  padding: 24px;
  box-sizing: border-box;
  overflow: auto;
}

html,
body {
  height: 100%;
  margin: 0;
  padding: 0;
  overflow-x: hidden;
}

.login-form {
  background-color: white;
  padding: 40px 24px;
  border-radius: 12px;
  box-shadow: 0 0 25px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 360px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  box-sizing: border-box;
}

.login-form h2 {
  text-align: center;
  color: #1e293b;
  margin-bottom: 8px;
}

/* AppInput içindeki input'lar için stil */
:deep(.form-input input) {
  padding: 12px;
  border: 1px solid #cbd5e1;
  border-radius: 8px;
  font-size: 16px;
  width: 100%;
  transition: border-color 0.2s;
}

:deep(.form-input input:focus) {
  outline: none;
}

/* AppButton'a özel stil */
:deep(.form-button) {
  padding: 12px;
  width: 100%;
  font-size: 16px;
  border-radius: 8px;
  color: white;
  font-weight: bold;
  cursor: pointer;
  border: none;
  transition: background-color 0.3s;
}
</style>
