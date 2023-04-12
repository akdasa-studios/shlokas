import * as Sentry from '@sentry/capacitor'
import { BrowserTracing } from '@sentry/tracing'
import * as SentrySibling from '@sentry/vue'
import { App } from '@capacitor/app'
import { App as VueApp } from 'vue'
import { useEnv } from '@/app/shared'
import { InitArgs } from '../initialization'


/**
 * Initialize the sentry plugin to track errors
 */
export async function initSentry({ get }: InitArgs) {
  const env = useEnv()
  if (env.isDevelopment()) { return }

  const vue = get<VueApp>('vue')
  let version = 'unknown'
  try {
    const info = await App.getInfo()
    version = info.version
  } catch (e) {
    console.error('Failed to get app version', e)
  }

  const DSN = 'https://e09ab355192945fb87bc01882eb62578@o257342.ingest.sentry.io/4504486578225152'

  Sentry.init({
    app: vue,
    dsn: DSN,
    release: `shlokas@${version}`,
    dist: '1',
    tracesSampleRate: 1.0,
    integrations: [
      new BrowserTracing({
        tracingOrigins: ['localhost', 'https://shlokas.app/'],
      }),
    ]
  }, SentrySibling.init)
}
