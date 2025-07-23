<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div style="border: 1px solid #bbdefb; border-radius: 5px; margin-top: 5px; padding: 5px">
    <div style="display: flex; justify-content: space-between; text-align: center; width: 100%">
      <div style="color: #304ffe; font-weight: bold; font-size: 15px; flex: 1; text-align: left">
        Belge No
      </div>
      <div style="color: #d81b60; font-weight: bold; font-size: 15px; flex: 1">{{ cari.adi }}</div>
      <div style="color: #d81b60; font-weight: bold; font-size: 15px; flex: 2; text-align: right">
        <b style="color: #818; margin-right: 5px">Kur: {{ doviz.kur + ' ' + doviz.doviz }}</b>
        {{ moment(new Date()).format('DD-MM-YYYY') }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { useCariStore } from '@/views/processes/store/cari'
import { useDovizStore } from '../store/doviz'
import moment from 'moment'

const { cari } = useCariStore()
const { doviz } = useDovizStore()
</script>
