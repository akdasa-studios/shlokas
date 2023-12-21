import { Capacitor } from '@capacitor/core'
import * as Sentry from '@sentry/capacitor'
import { Replay } from '@sentry/replay'
import * as SentrySibling from '@sentry/vue'
import { useAppVersion, useEnv } from '@/app/shared'


/**
 * Initialize the sentry plugin to track errors
 */
export async function initSentry() {
  const env = useEnv()

  // Do not initialize sentry on web or dev mode
  const isNotCompatible = Capacitor.getPlatform() === 'web' || env.getMode() === 'dev'
  if (isNotCompatible) { return }

  // Initialize sentry plugin
  Sentry.init({
    dsn: 'https://e09ab355192945fb87bc01882eb62578@o257342.ingest.sentry.io/4504486578225152',
    release: await useAppVersion(),
    dist: '1',
    tracesSampleRate: 1.0,
    replaysSessionSampleRate: 0.1,
    replaysOnErrorSampleRate: 1.0,
    integrations: [
      new Replay({
        maskAllText: false,
        blockAllMedia: true,
      }),
    ]
  }, SentrySibling.init)
}
