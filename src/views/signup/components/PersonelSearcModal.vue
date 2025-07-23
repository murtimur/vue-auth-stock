<template>
  <div style="margin-left: 20px; margin-top: 30px">
    <AppIcon
      style="height: 40px; width: 40px; cursor: pointer"
      data-bs-toggle="modal"
      data-bs-target="#personel"
      name="fc-plus"
    />
  </div>
  <div
    class="modal fade"
    id="personel"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="exampleModalLabel">Personeller</h1>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <div style="display: flex gap 1px">
            <AppIcon
              @click="personeller(0)"
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
          <div v-if="pageData.content.length > 0">
            <div>
              <ul class="list-group list-group-flush" data-bs-dismiss="modal">
                <li
                  @click="selectedPersonel(personel)"
                  v-for="personel in pageData.content"
                  :key="personel.id"
                  class="d-flex justify-content-between align-items-center py-2"
                >
                  <b>{{ personel.kodu }} - {{ personel.adi }}</b>
                </li>
              </ul>
              <div class="d-flex justify-content-between align-items-center">
                <div>
                  <AppButton
                    @click="personeller(pageData.number - 1)"
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
                    @click="personeller(pageData.number + 1)"
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
import AppButton from '@/components/AppButton.vue'
import AppIcon from '@/components/AppIcon.vue'
import { getPersoneller } from '@/shared/api'
import { reactive, ref } from 'vue'
import AppSpinner from '@/components/AppSpinner.vue'
import { useSignUpPersonelStore } from '../store/signuppersonel'

const { setPersonel } = useSignUpPersonelStore()

const pageData = reactive({
  content: [],
  last: false,
  first: false,
  number: 0,
  totalPages: 0,
})

const apiProgress = ref(false)

const selectedPersonel = (cari) => {
  setPersonel(cari)
  Object.assign(pageData, {
    content: [],
    last: false,
    first: false,
    number: 0,
    totalPages: 0,
  })
}

const personeller = async (pageIndex) => {
  apiProgress.value = true
  try {
    const response = await getPersoneller(pageIndex)
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
