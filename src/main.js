import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'
import './assets/main.css'
import './assets/style.scss'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import { createPinia } from 'pinia'
import 'vuetify/styles'

loadFonts()

import { OhVueIcon, addIcons } from 'oh-vue-icons'
import {
  FcAcceptDatabase,
  FaFlag,
  RiZhihuFill,
  FcDocument,
  FcHome,
  FcOk,
  FaUserPlus,
  FcPlus,
  FcSearch,
  FaArrowAltCircleLeft,
  FaArrowAltCircleRight,
  FcFinePrint,
  FcDepartment,
  FcSettings,
  GiExitDoor,
  RiMoneyDollarBoxFill,
  RiShoppingBasketFill,
  RiDeleteBin5Fill,
} from 'oh-vue-icons/icons'

addIcons(
  FcAcceptDatabase,
  FaFlag,
  RiZhihuFill,
  FcDocument,
  FcHome,
  FcOk,
  FaUserPlus,
  FcPlus,
  FcSearch,
  FaArrowAltCircleLeft,
  FaArrowAltCircleRight,
  FcFinePrint,
  FcDepartment,
  FcSettings,
  GiExitDoor,
  RiMoneyDollarBoxFill,
  RiShoppingBasketFill,
  RiDeleteBin5Fill,
)

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(vuetify)

app.component('v-icon', OhVueIcon)

app.mount('#app')
