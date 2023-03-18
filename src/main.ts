import { IonicVue } from '@ionic/vue'
import { createApp } from 'vue'
import { InitArgs } from './init/initialization'
import ShlokasApp from './App.vue'
import router from './router'

/* Core CSS required for Ionic components to work properly */
import '@ionic/vue/css/core.css'

/* Basic CSS for apps built with Ionic */
import '@ionic/vue/css/normalize.css'
import '@ionic/vue/css/structure.css'
import '@ionic/vue/css/typography.css'

/* Optional CSS utils that can be commented out */
import '@ionic/vue/css/display.css'
import '@ionic/vue/css/flex-utils.css'
import '@ionic/vue/css/float-elements.css'
import '@ionic/vue/css/padding.css'
import '@ionic/vue/css/text-alignment.css'
import '@ionic/vue/css/text-transformation.css'

/* Theme variables */
import './theme/variables.css'
import './theme/custom.css'

/* Shlokas UI kit */
import '@akdasa-studios/shlokas-uikit/style.css'

/* Init stages */
import { appInitStages } from './init'

const services: {[name: string]: any} = { }


async function initStages(stages: any[]) {
  for (const stage of stages) {
    const result = await stage({
      get: <T>(x:string) => services[x] as T
    } as InitArgs)

    if (result) {
      for (const [key, value] of Object.entries(result)) {
        services['vue'].provide(key, value)
        services[key] = value
      }
    }
  }
}

async function initApp() {
  const vue = createApp(ShlokasApp)
    .use(IonicVue)
    .use(router)
  services['vue'] = vue

  await initStages(appInitStages)

  services['emitter'].emit('appStateChanged', { isActive: true })

  router.isReady().then(() => {
    vue.mount('#app')
  })
}

initApp()
