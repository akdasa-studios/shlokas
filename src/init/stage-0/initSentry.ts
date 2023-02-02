import * as Sentry from '@sentry/capacitor'
import { BrowserTracing } from '@sentry/tracing'
import * as SentrySibling from '@sentry/vue'
import { InitArgs } from '../initialization'


export async function initSentry({ vue }: InitArgs) {
  if (process.env.NODE_ENV === 'development') {
    return
  }

  const VERSION = process.env.npm_package_version
  const DSN = 'https://e09ab355192945fb87bc01882eb62578@o257342.ingest.sentry.io/4504486578225152'

  Sentry.init({
    app: vue,
    dsn:DSN,
    release: `shlokas@${VERSION}`,
    dist: '1',
    tracesSampleRate: 1.0,
    integrations: [
      new BrowserTracing({
        tracingOrigins: ['localhost', 'https://shlokas.app/'],
      }),
    ]
  }, SentrySibling.init)
}
