<template>
  <div style="margin-left: 20px; margin-top: 30px">
    <AppIcon
      style="height: 40px; width: 40px; cursor: pointer"
      data-bs-toggle="modal"
      data-bs-target="#cariSearch"
      name="fc-plus"
    />
  </div>
  <div
    class="modal fade"
    id="cariSearch"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="exampleModalLabel">Cari Ara</h1>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <div style="display: flex">
            <AppInput label="Cari Adı" v-model="adi" />
            <AppIcon
              @click="getCariler(0)"
              style="
                height: 40px;
                width: 40px;
                margin-top: 30px;
                margin-left: 20px;
                cursor: pointer;
              "
              :animation="apiProgress ? 'spin' : ''"
              name="fc-search"
            ></AppIcon>
          </div>
          <div class="mt-2" v-if="pageData.content.length > 0">
            <div>
              <ul class="list-group list-group-flush" data-bs-dismiss="modal">
                <li
                  @click="selectedCari(cari)"
                  v-for="cari in pageData.content"
                  :key="cari.id"
                  class="d-flex justify-content-between align-items-center py-2"
                >
                  <b>{{ cari.kodu }} - {{ cari.adi }}</b>
                </li>
              </ul>
              <div class="d-flex justify-content-between align-items-center mt-2">
                <div>
                  <AppButton
                    @click="getCariler(pageData.number - 1)"
                    v-if="!pageData.first"
                    variant="success btn-sm float-start"
                  >
                    <AppIcon name="fa-arrow-alt-circle-left" style="height: 30px; width: 30px" />
                  </AppButton>
                </div>
                <div class="text-center">
                  <AppSpinner v-if="apiProgress" />
                </div>
                <div>
                  <AppButton
                    v-if="!pageData.last"
                    @click="getCariler(pageData.number + 1)"
                    variant="success btn-sm float-end"
                  >
                    <AppIcon name="fa-arrow-alt-circle-right" style="height: 30px; width: 30px" />
                  </AppButton>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <AppButton variant="secondary" data-bs-dismiss="modal">Kapat</AppButton>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import AppIcon from '@/components/AppIcon.vue'
import { useSignUpCariStore } from '../store/signupcari'
import { getFindByCariAdi } from '@/shared/api'
import { reactive, ref } from 'vue'
import AppInput from '@/components/AppInput.vue'
import AppSpinner from '@/components/AppSpinner.vue'
import AppButton from '@/components/AppButton.vue'

const { setCari } = useSignUpCariStore()

const adi = ref()

const pageData = reactive({
  content: [],
  last: false,
  first: false,
  number: 0,
  totalPages: 0,
})

const apiProgress = ref(false)

const selectedCari = (cari) => {
  setCari(cari)
  Object.assign(pageData, {
    content: [],
    last: false,
    first: false,
    number: 0,
    totalPages: 0,
  })
}

const getCariler = async (pageIndex) => {
  apiProgress.value = true
  try {
    const response = await getFindByCariAdi(adi.value, pageIndex)
    pageData.content = response.data.content
    pageData.number = response.data.number
    pageData.totalPages = response.data.totalPages
    pageData.last = response.data.last
    pageData.first = response.data.first
  } catch (error) {
    console.log(error)
  } finally {
    apiProgress.value = false
  }
}
</script>

<style scope>
li:nth-child(odd) {
  background-color: white;
  color: black;
}
li:nth-child(even) {
  background-color: #e3f2fd;
  color: black;
}
</style>
