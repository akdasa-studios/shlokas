import { Capacitor } from '@capacitor/core'
import * as Sentry from '@sentry/vue'
import { Replay } from '@sentry/replay'
import { App as VueApp } from 'vue'
import { useAppVersion, useEnv } from '@/app/shared'
import { InitArgs } from '../initialization'


/**
 * Initialize the sentry plugin to track errors
 */
export async function initSentry({ get }: InitArgs) {
  const env = useEnv()

  // Do not initialize sentry on web or dev mode
  const isNotCompatible = Capacitor.getPlatform() === 'web' || env.getMode() === 'dev'
  if (isNotCompatible) { return }

  // Initialize sentry plugin
  Sentry.init({
    app: get<VueApp>('vue'),
    dsn: 'https://e09ab355192945fb87bc01882eb62578@o257342.ingest.sentry.io/4504486578225152',
    release: await useAppVersion(),
    dist: '1',
    tracesSampleRate: 1.0,
    replaysSessionSampleRate: 0.1,
    replaysOnErrorSampleRate: 1.0,
    tracePropagationTargets: ['localhost'],
    integrations: [
      // new Sentry.BrowserTracing({
      //   routingInstrumentation: Sentry.vueRouterInstrumentation(router),
      // }),
      new Replay({
        maskAllText: false,
        blockAllMedia: false,
      }),
    ]
  })
}
