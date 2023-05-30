import * as Sentry from '@sentry/capacitor'
import { Replay } from '@sentry/replay'
import * as SentrySibling from '@sentry/vue'
import { App as VueApp } from 'vue'
import { useAppVersion, useEnv } from '@/app/shared'
import { InitArgs } from '../initialization'


/**
 * Initialize the sentry plugin to track errors
 */
export async function initSentry({ get }: InitArgs) {
  const env = useEnv()
  if (env.isDevelopment()) { return }

  const vue = get<VueApp>('vue')
  const version = await useAppVersion()
  const DSN = 'https://e09ab355192945fb87bc01882eb62578@o257342.ingest.sentry.io/4504486578225152'

  Sentry.init({
    app: vue,
    dsn: DSN,
    release: version,
    dist: '1',
    tracesSampleRate: 1.0,
    replaysSessionSampleRate: 0.1,
    replaysOnErrorSampleRate: 1.0,
    integrations: [
      new Replay({
        // maskAllText: true,
        // blockAllMedia: true,
      }),
    ]
  }, SentrySibling.init)
}
