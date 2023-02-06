import { IonicVue } from '@ionic/vue'
import { createApp } from 'vue'
import { InitArgs } from './init/initialization'
import ShlokasApp from './App.vue'
import { createShlokasApplication } from './app/Application'
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

/* Init stages */
import initStages from './init'


async function initApp() {
  const vue = createApp(ShlokasApp)
    .use(IonicVue)
    .use(router)

  const aaa = await createShlokasApplication()
  const shlokas = aaa[0]
  vue.provide("app", shlokas)

  const services: {[name: string]: any} = {
    "couchDB": aaa[1]
  }

  console.group("Init...")

  for (const initStage of initStages) {
    console.log(initStage.name)

    const initResult = await initStage({
      shlokas: shlokas,
      vue: vue,
      get: <T>(x:string) => services[x] as T
    } as InitArgs)


    if (initResult?.inject) {
      for (const [key, value] of Object.entries(initResult.inject)) {
        vue.provide(key, value)
        services[key] = value
      }
    }
  }
  console.groupEnd()
  services["emitter"].emit("appOpened")

  router.isReady().then(() => {
    vue.mount('#app')
  })
}

initApp()
