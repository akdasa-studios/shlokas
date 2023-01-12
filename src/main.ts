import { Storage } from '@ionic/storage'
import { createApp } from 'vue'
import { IonicVue } from '@ionic/vue'
import { createPinia } from 'pinia'
import * as Sentry from '@sentry/capacitor'
import * as SentrySibling from '@sentry/vue'
import { BrowserTracing } from '@sentry/tracing'
import { createApplication } from './app/Application'
import { initI18n } from './i18n'
import App from './App.vue'
import router from './router'

/* Core CSS required for Ionic components to work properly */
import '@ionic/vue/css/core.css'

/* Basic CSS for apps built with Ionic */
import '@ionic/vue/css/normalize.css'
import '@ionic/vue/css/structure.css'
import '@ionic/vue/css/typography.css'

/* Optional CSS utils that can be commented out */
import '@ionic/vue/css/padding.css'
import '@ionic/vue/css/float-elements.css'
import '@ionic/vue/css/text-alignment.css'
import '@ionic/vue/css/text-transformation.css'
import '@ionic/vue/css/flex-utils.css'
import '@ionic/vue/css/display.css'

/* Theme variables */
import './theme/variables.css'

async function initApp() {
  const pinia = createPinia()
  const storage = new Storage()
  await storage.create()
  const lang = (await storage.get("language")) || 'en'

  const app = createApp(App)
    .use(IonicVue)
    .use(router)
    .use(pinia)
    .use(initI18n(lang))

  /* Sentry */
  if (process.env.NODE_ENV !== 'development') {
    Sentry.init(
      {
        app,
        dsn: 'https://e09ab355192945fb87bc01882eb62578@o257342.ingest.sentry.io/4504486578225152',
        // To set your release and dist versions
        release: 'shlokas@' + process.env.npm_package_version,
        dist: '1',
        // Set tracesSampleRate to 1.0 to capture 100% of transactions for performance monitoring.
        // We recommend adjusting this value in production.
        tracesSampleRate: 1.0,
        integrations: [
          new BrowserTracing({
            tracingOrigins: ['localhost', 'https://shlokas.app/'],
          }),
        ]
      },
      // Forward the init method to the sibling Framework.
      SentrySibling.init
    )
  }

  const shlokasApp = await createApplication()
  app.provide("app", shlokasApp)

  router.isReady().then(() => {
    app.mount('#app')
  })
}

initApp()
