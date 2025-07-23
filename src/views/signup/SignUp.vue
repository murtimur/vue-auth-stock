<template>
  <form @submit.prevent="handleAddUser">
    <div>
      <h1 class="text-center">
        <AppIcon name="fa-user-plus" style="height: 50px; width: 50px; color: #283593" />
      </h1>
      <div class="row mx-2">
        <div class="col-sm-4">
          <AppInput
            :help="errors.username"
            v-model="signUpForm.username"
            label="Kullanıcı Adı"
            id="username"
          />
          <AppInput
            :help="errors.password"
            v-model="signUpForm.password"
            label="Şifre"
            id="password"
            type="password"
          />
          <AppInput
            :help="passwordRepeatError"
            v-model="signUpForm.passwordRepeat"
            label="Şifre Tekrarı"
            type="password"
            id="passwordRepeat"
          />
          <div style="display: flex">
            <AppInput
              v-model="signUpForm.varsayilanCariKodu"
              label="Varsayılan Cari Kodu"
              id="varsayilanCariKodu"
            />
            <CariSearchModal />
          </div>
          <div style="display: flex">
            <AppInput
              label="Varsayılan Personel Kodu"
              id="varsayilanPersonelKodu"
              v-model="signUpForm.varsayilanPersonelKodu"
            />
            <PersonelSearcModal />
          </div>
          <AppSelect
            id="yazicilar"
            label="Yazıcı"
            :data="yazicilar"
            v-model="signUpForm.yaziciAdi"
          />
          <AppInput id="nushaAdet" label="Yazdırma Nüsha Adet" v-model="signUpForm.nushaAdet" />
          <AppInput
            placeholder="Örn.: C:\fis.jrxml"
            id="belgeDizayn"
            label="Yazdırma Dizayn"
            v-model="signUpForm.belgeDizayn"
          />
        </div>
        <div class="col-sm-4">
          <AppSelect id="subeler" label="Şube" :data="subeler" v-model="signUpForm.subeId" />
          <AppSelect id="kasalar" label="Kasa" :data="kasalar" v-model="signUpForm.kasaId" />
          <AppSelect
            id="kullanici"
            label="Winka Kullanıcısı"
            :data="winkaKullanicilar"
            v-model="signUpForm.winkaKullaniciId"
          />
          <AppSelect
            label="Cari Özel Kod 3"
            id="ozelkod3Id"
            :data="ozelKodlar"
            v-model="signUpForm.ozelKod3Id"
          />
          <AppSelect
            id="pesinVadeli"
            v-model="signUpForm.pesinVadeli"
            :data="pesinVadeliData"
            label="Peşin/Vadeli"
          />
          <AppInput
            :help="errors.belgeHarfi"
            id="belgeHarfi"
            label="Belge Harfi"
            v-model="signUpForm.belgeHarfi"
          />
          <AppInput
            placeholder="1,2,3"
            id="fiyatTipleri"
            label="Fiyat Tipleri"
            v-model="signUpForm.fiyatTipleri"
          />
        </div>
        <div class="col-sm-4">
          <div class="row">
            <div class="col-6 mb-2" v-for="item in checkboxList" :key="item.id">
              <AppCheckBox :label="item.label" :id="item.id" v-model="signUpForm[item.id]" />
            </div>
            <AppInput
              label="KDV Oranı"
              v-if="signUpForm.kdvKullanilacak"
              v-model="signUpForm.kdvOrani"
            />
          </div>
        </div>
      </div>
    </div>
    <div class="mx-3 mt-1">
      <AppAlert v-if="errorMessage" variant="danger">{{ errorMessage }}</AppAlert>
      <AppAlert v-if="successMessage">{{ successMessage }}</AppAlert>
    </div>
    <div class="text-center mt-2 mb-5">
      <AppButton style="color: white" :api-progress="apiProgress" :is-disabled="isDisabled"
        ><b>Kaydet</b></AppButton
      >
    </div>
  </form>
</template>

<script setup>
import AppIcon from '@/components/AppIcon.vue'
import AppInput from '@/components/AppInput.vue'
import { computed, onMounted, reactive, ref, watch } from 'vue'
import CariSearchModal from './components/CariSearchModal.vue'
import { useSignUpCariStore } from './store/signupcari'
import PersonelSearcModal from './components/PersonelSearcModal.vue'
import { useSignUpPersonelStore } from './store/signuppersonel'
import {
  getKasalar,
  getOzelKodlar3,
  getSubeler,
  getWinkaKullanicilar,
  getYazicilar,
} from '@/shared/api'
import AppSelect from '@/components/AppSelect.vue'
import AppCheckBox from '@/components/AppCheckBox.vue'
import { signup } from './api'
import AppAlert from '@/components/AppAlert.vue'
import AppButton from '@/components/AppButton.vue'

const signupCariStore = useSignUpCariStore()
const signUpPersonelStore = useSignUpPersonelStore()

const errors = ref({})
const apiProgress = ref(false)
const successMessage = ref()
const errorMessage = ref()

const signUpForm = reactive({
  username: undefined,
  password: undefined,
  passwordRepeat: undefined,
  varsayilanCariKodu: undefined,
  varsayilanPersonelKodu: undefined,
  subeId: 1,
  kasaId: 1,
  winkaKullaniciId: 1,
  ozelKod3Id: undefined,
  pesinVadeli: 0,
  yaziciAdi: undefined,
  nushaAdet: undefined,
  belgeDizayn: undefined,
  belgeHarfi: 'T',
  fiyatTipleri: undefined,
  satisFaturasi: false,
  satisIadeFaturasi: false,
  alisFaturasi: false,
  alisIadeFaturasi: false,
  alinanSiparis: false,
  verilenSiparis: false,
  alinanFiyatTeklifi: false,
  verilenFiyatTeklifi: false,
  cariKartAcar: false,
  depoTransfer: false,
  fisListelesin: false,
  fisSiler: false,
  fiseGirebilsin: false,
  fiyatDegistirir: false,
  iskontoYapabilir: false,
  kdvKullanilacak: false,
  sabitFiyat: false,
  sayim: false,
  stokCikisBelgesi: false,
  stokGirisBelgesi: false,
  kdvOrani: 0.0,
  bakiyeGorsun: false,
  renkBeden: false,
  sayimEnvanterGorur: false,
})

const checkboxList = [
  { id: 'satisFaturasi', label: 'Satış Faturası' },
  { id: 'satisIadeFaturasi', label: 'Satış İade Faturası' },
  { id: 'alisFaturasi', label: 'Alış Faturası' },
  { id: 'alisIadeFaturasi', label: 'Alış İade Faturası' },
  { id: 'alinanSiparis', label: 'Alınan Sipariş' },
  { id: 'verilenSiparis', label: 'Verilen Sipariş' },
  { id: 'alinanFiyatTeklifi', label: 'Alınan Fiyat Teklifi' },
  { id: 'verilenFiyatTeklifi', label: 'Verilen Fiyat Teklifi' },
  { id: 'cariKartAcar', label: 'Cari Kart Açar' },
  { id: 'depoTransfer', label: 'Depo Transfer' },
  { id: 'fisListelesin', label: 'Fiş Listeleyebilir' },
  { id: 'fisSiler', label: 'Fiş Silebilir' },
  { id: 'fiseGirebilsin', label: 'Fişe Girebilir' },
  { id: 'fiyatDegistirir', label: 'Fiyat Değiştirir' },
  { id: 'iskontoYapabilir', label: 'İskonto Yapabilir' },
  { id: 'sabitFiyat', label: 'Sabit Fiyat' },
  { id: 'sayim', label: 'Sayım' },
  { id: 'stokCikisBelgesi', label: 'Stok Çıkış Belgesi' },
  { id: 'stokGirisBelgesi', label: 'Stok Giriş Belgesi' },
  { id: 'bakiyeGorsun', label: 'Bakiye Görsün' },
  { id: 'sayimEnvanterGorur', label: 'Sayım Envanter Görür' },
  { id: 'renkBeden', label: 'Renk-Beden' },
  { id: 'kdvKullanilacak', label: 'KDV Kullanılacak' },
]

const subeler = ref([])
const kasalar = ref([])
const winkaKullanicilar = ref([])
const ozelKodlar = ref([])
const yazicilar = ref([])

const handleAddUser = async () => {
  apiProgress.value = true
  errorMessage.value = undefined
  successMessage.value = undefined
  // eslint-disable-next-line no-unused-vars
  const { passwordRepeat, ...body } = signUpForm
  try {
    const response = await signup(body)
    successMessage.value = response.data.message
  } catch (apiError) {
    if (apiError.response?.status === 400) {
      errors.value = apiError.response.data.validationErrors
    } else {
      errorMessage.value = 'Bir hata oluştu lütfen web servislerini kontrol edin!'
    }
  }
  apiProgress.value = false
}

const isDisabled = computed(() => {
  return signUpForm.password || signUpForm.passwordRepeat
    ? signUpForm.password !== signUpForm.passwordRepeat
    : true
})

const getApiRequests = async () => {
  Promise.all([
    await getSubeler(),
    getKasalar(),
    getWinkaKullanicilar(),
    getOzelKodlar3(),
    getYazicilar(),
  ])
    .then(([subelerRes, kasalarRes, winkaKullaniciRes, ozelKodlar3Res, yazicilarRes]) => {
      subeler.value = subelerRes.data
      kasalar.value = kasalarRes.data
      winkaKullanicilar.value = winkaKullaniciRes.data
      ozelKodlar.value = ozelKodlar3Res.data
      yazicilar.value = yazicilarRes.data
    })
    .catch((err) => {
      console.log(err)
    })
}

const pesinVadeliData = ref([
  { id: 0, adi: 'VADELİ' },
  { id: 1, adi: 'PEŞİN' },
])

const passwordRepeatError = computed(() => {
  return signUpForm.password !== signUpForm.passwordRepeat ? 'Şifreler aynı değil' : ''
})

watch(
  () => signUpForm.username,
  () => {
    delete errors.value.username
  },
)

watch(
  () => signUpForm.password,
  () => {
    delete errors.value.password
  },
)

watch(
  () => signUpForm.belgeHarfi,
  () => {
    delete errors.value.belgeHarfi
  },
)

watch(signupCariStore.cari, () => {
  signUpForm.varsayilanCariKodu = signupCariStore.cari.kodu
})

watch(signUpPersonelStore.personel, () => {
  signUpForm.varsayilanPersonelKodu = signUpPersonelStore.personel.kodu
})

onMounted(() => {
  signupCariStore.clearCari()
  signUpPersonelStore.clearPersonel()
  getApiRequests()
})
</script>
