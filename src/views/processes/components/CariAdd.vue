<template>
  <div style="display: flex; align-items: center; width: 100%">
    <div style="flex: 1; height: 50px">
      <AppInput v-model="cari.adi" style="width: 100%; height: 50px" :disabled="true" />
    </div>
    <AppIcon
      data-bs-toggle="modal"
      data-bs-target="#cari"
      name="fc-search"
      style="width: 50px; height: 50px; margin-left: 8px; cursor: pointer"
    />
  </div>

  <div
    class="modal fade"
    id="cari"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="exampleModalLabel">Firma Ara</h1>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <form @submit.prevent="submit(0)">
            <div style="display: flex; align-items: center; gap: 10px">
              <AppInput ref="searchInput" placeholder="Firma Adı" v-model="adi" />
              <AppButton
                type="submit"
                style="
                  all: unset;
                  cursor: pointer;
                  border: none;
                  outline: none;
                  padding: 0;
                  margin: 0;
                  background: none;
                "
              >
                <AppIcon
                  :animation="apiProgress ? 'spin' : ''"
                  name="fc-search"
                  style="width: 50px; height: 50px"
                />
              </AppButton>
            </div>
          </form>
          <div>
            <div
              data-bs-dismiss="modal"
              @click="onClickSelectCari(item)"
              v-for="item in pageData.content"
              :key="item.id"
              class="item-box"
            >
              {{ item.adi }} - {{ item.kodu }}
            </div>
          </div>
          <div
            style="
              display: flex;
              align-items: center;
              justify-content: space-between;
              margin-top: 20px;
              position: relative;
            "
          >
            <div style="width: 50px; display: flex; justify-content: flex-start">
              <AppButton
                v-if="!pageData.first && pageData.content.length > 0"
                @click="submit(pageData.number - 1)"
              >
                <AppIcon name="fa-arrow-alt-circle-left" style="height: 25px; width: 25px" />
              </AppButton>
            </div>
            <div style="position: absolute; left: 50%; transform: translateX(-50%)">
              <AppSpinner v-if="apiProgress" />
            </div>
            <div style="width: 50px; display: flex; justify-content: flex-end">
              <AppButton
                v-if="!pageData.last && pageData.content.length > 0"
                @click="submit(pageData.number + 1)"
              >
                <AppIcon name="fa-arrow-alt-circle-right" style="height: 25px; width: 25px" />
              </AppButton>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <AppButton @click="onClickKapat" variant="success" data-bs-dismiss="modal"
            >Kapat</AppButton
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import AppIcon from '@/components/AppIcon.vue'
import AppInput from '@/components/AppInput.vue'
import { useCariStore } from '../store/cari'
import { nextTick, onMounted, reactive, ref } from 'vue'
import { getCariler, getDefaultCari } from '../api'
import { useAuthStore } from '@/stores/auth'
import AppButton from '@/components/AppButton.vue'
import AppSpinner from '@/components/AppSpinner.vue'

const { setCari, cari, resetCari } = useCariStore()
const { auth } = useAuthStore()

const adi = ref('')

const apiProgress = ref(false)

const searchInput = ref(null)

const focusInput = () => {
  nextTick(() => {
    searchInput.value?.focus()
  })
}

const pageData = reactive({
  content: [],
  last: false,
  first: false,
  number: 0,
  totalPages: 0,
})

const defaultCariLoad = async () => {
  resetCari()
  try {
    const response = await getDefaultCari(auth.varsayilanCariKodu)
    setCari(response.data)
  } catch (error) {
    console.log(error)
  }
}

const onClickSelectCari = (cari) => {
  try {
    setCari(cari)
    adi.value = ''
    resetPageData()
  } catch (error) {
    console.log(error)
  }
}

const submit = async (pageIndex) => {
  apiProgress.value = true
  const body = { subeId: auth.subeId, ozelKod3Id: auth.ozelKod3Id, adi: adi.value }
  try {
    const response = await getCariler(body, pageIndex)
    pageData.content = response.data.content
    pageData.first = response.data.first
    pageData.last = response.data.last
    pageData.number = response.data.number
  } catch (error) {
    console.log(error)
  } finally {
    apiProgress.value = false
  }
}

const onClickKapat = () => {
  adi.value = ''
  resetPageData()
}

const resetPageData = () => {
  pageData.content = []
  pageData.first = false
  pageData.last = false
  pageData.number = 0
}

onMounted(() => {
  defaultCariLoad()

  const modal = document.getElementById('cari')
  if (modal) {
    modal.addEventListener('shown.bs.modal', focusInput)
  }
})
</script>

<style scoped>
.item-box {
  padding: 8px 12px;
  margin-bottom: 15px;
  background-color: #f8f8f8;
  border-radius: 5px;
  box-shadow: 0 1px 4px rgb(0 0 0 / 0.1);
  font-weight: 600;
  color: #333;
  font-size: 18px;
  transition: background-color 0.3s ease;
  cursor: pointer;
}

.item-box:hover {
  background-color: #f3f3f3;
}
</style>
