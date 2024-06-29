import './index.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import { provideApolloClient } from '@vue/apollo-composable'
import { apolloClient } from './apollo-client'

import App from './App.vue'
import router from './router'

import SvgIcon from './components/ui/SvgIcon.vue'
import BaseDropdown from './components/ui/BaseDropdown.vue'
import BaseCard from './components/ui/BaseCard.vue'
import BaseDialog from './components/ui/BaseDialog.vue'
import UserAvt from './components/ui/UserAvt.vue'
import LoadingSpinner from './components/ui/LoadingSpinner.vue'

const app = createApp(App)

provideApolloClient(apolloClient)

app.use(router)
app.use(createPinia())

app.component('svg-icon', SvgIcon)
app.component('base-dropdown', BaseDropdown)
app.component('base-card', BaseCard)
app.component('base-dialog', BaseDialog)
app.component('user-avt', UserAvt)
app.component('loading-spinner', LoadingSpinner)

app.mount('#app')
