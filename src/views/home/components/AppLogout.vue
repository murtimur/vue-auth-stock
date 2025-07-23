<template>
  <AppButton variant="danger" style="height: 90px; width: 300px">
    <div>
      <AppIcon
        @click="userLogout"
        style="color: white; height: 50px; width: 50px"
        name="gi-exit-door"
      />
    </div>
    <b>Çıkış Yap</b>
  </AppButton>
</template>

<script setup lang="ts">
import AppButton from '@/components/AppButton.vue'
import AppIcon from '@/components/AppIcon.vue'
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'
import { exit } from '../api'
import { useDovizStore } from '@/views/fatura/store/doviz'
import { useCariStore } from '@/views/processes/store/cari'
import { useStokStore } from '@/views/fatura/store/stok'

const { logout } = useAuthStore()
const navigate = useRouter()

const { resetDoviz } = useDovizStore()
const { resetCari } = useCariStore()
const { resetStok } = useStokStore()

const userLogout = async () => {
  try {
    await exit()
    logout()
    resetDoviz()
    resetCari()
    resetStok()
    navigate.push('/')
  } catch (error) {
    console.log(error)
  }
}
</script>
