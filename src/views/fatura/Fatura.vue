<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div>
    <div class="text-center"><Title /></div>
    <div class="text-center"><StokBarkodSearch /></div>
    <div class="text-center"><CreateAndAdd /></div>
  </div>
</template>

<script setup>
import { dovizKuru } from '@/shared/api'
import { useCariStore } from '../processes/store/cari'
import StokBarkodSearch from './components/StokBarkodSearch.vue'
import CreateAndAdd from './components/CreateAndAdd.vue'
import Title from './components/Title.vue'
import { useDovizStore } from './store/doviz'
import { onMounted } from 'vue'

const { cari } = useCariStore()
const { setDoviz } = useDovizStore()

const getKur = async () => {
  try {
    const response = await dovizKuru(cari.paraBirimi)
    if (response.data) {
      setDoviz(response.data)
    } else {
      setDoviz({ kur: 1, doviz: '$' })
    }
  } catch (error) {
    console.log(error)
  }
}

onMounted(() => {
  getKur()
})
</script>
