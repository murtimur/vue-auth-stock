<template>
  <AppIcon
    name="fc-search"
    style="margin-left: 10px; height: 44px; width: 44px; color: #c9265c; cursor: pointer"
    @click="topDialog = true"
  />
  <v-container>
    <v-row justify="space-around">
      <v-col cols="12" md="6">
        <v-dialog v-model="topDialog" transition="dialog-top-transition" width="500px">
          <v-card>
            <v-toolbar style="background-color: #bbdefb" title="Stok Ara" />
            <v-card-text>
              <form @submit.prevent="submit(0)" style="display: flex">
                <AppInput v-model="barkodu" placeholder="Stok Kodu" />
                <button type="submit" style="background-color: white">
                  <AppIcon
                    name="fc-search"
                    style="
                      margin-left: 10px;
                      height: 40px;
                      width: 40px;
                      color: #c9265c;
                      cursor: pointer;
                    "
                    :animation="apiProgress ? 'spin' : ''"
                    @click="topDialog = true"
                  />
                </button>
              </form>
            </v-card-text>
            <div>
              <div>
                <ul class="list-group list-group-flush">
                  <li
                    style="cursor: pointer"
                    v-for="item in pageData.content"
                    @click="selectStok(item)"
                    class="d-flex justify-content-between align-items-center py-2"
                  >
                    <b class="mx-2">{{ item.modelKodu ? item.modelKodu : item.stokKodu }}</b>
                    <b>{{ item.beden ? item.beden : '' }}</b>
                    <b>{{ item.renkAdi ? item.renkAdi : '' }}</b>
                    <b>{{ item.envanter }}</b>
                    <b>{{ item.birimAdi }}</b>
                    <b>{{ item.fiyat }}</b>
                  </li>
                </ul>
              </div>
            </div>

            <div
              v-if="pageData.content.length > 0"
              class="d-flex justify-content-between align-items-center mt-2 mx-3"
            >
              <div>
                <AppButton
                  @click="submit(pageData.number - 1)"
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
                  @click="submit(pageData.number + 1)"
                  variant="success btn-sm float-end"
                >
                  <AppIcon name="fa-arrow-alt-circle-right" style="height: 30px; width: 30px" />
                </AppButton>
              </div>
            </div>

            <v-card-actions class="justify-end">
              <AppButton text @click="onClickKapat">Kapat</AppButton>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import AppButton from '@/components/AppButton.vue'
import AppIcon from '@/components/AppIcon.vue'
import AppInput from '@/components/AppInput.vue'
import { reactive, ref } from 'vue'
import { useStokStore } from '../store/stok'
import { useCariStore } from '@/views/processes/store/cari'
import { useAuthStore } from '@/stores/auth'
import { stoklarSearch } from '../api'
import AppSpinner from '@/components/AppSpinner.vue'

const { setStok } = useStokStore()
const { cari } = useCariStore()
const { auth } = useAuthStore()

const barkodu = ref('')

const apiProgress = ref(false)

const topDialog = ref(false)

const pageData = reactive({
  content: [],
  last: false,
  first: false,
  number: 0,
  totalPages: 0,
})

const selectStok = (stok) => {
  try {
    setStok(stok)
    topDialog.value = false
    console.log(stok)
  } catch (error) {
    console.log(error)
  }
}

const submit = async (pageIndex) => {
  apiProgress.value = true
  const body = { fiyat: cari.satisFiyati, subeId: auth.subeId, barkodu: barkodu.value }
  try {
    const response = await stoklarSearch(body, pageIndex)
    pageData.content = response.data.content
    pageData.last = response.data.last
    pageData.first = response.data.first
    pageData.number = response.data.number
    pageData.totalPages = response.data.totalPages
  } catch (error) {
    console.log(error)
  } finally {
    apiProgress.value = false
  }
}

const onClickKapat = () => {
  topDialog.value = false
  pageData.content = []
}
</script>
