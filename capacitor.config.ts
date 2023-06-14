import { CapacitorConfig } from '@capacitor/cli'

const config: CapacitorConfig = {
  appId: 'com.akdasa.shlokas',
  appName: 'shlokas',
  webDir: 'dist',
  plugins: {
    GoogleAuth: {
      'scopes': ['profile', 'email'],
      'serverClientId': '879891505939-bs3v8sm9mu1ti65eu81f3b8idtl8bakm.apps.googleusercontent.com',
      'iosClientId': '879891505939-uojhetilbf9meih9veisruc2lfu8im26.apps.googleusercontent.com',
      // We use WEB client ID here. Don't ask me why...
      'androidClientId': '879891505939-bs3v8sm9mu1ti65eu81f3b8idtl8bakm.apps.googleusercontent.com',
      'forceCodeForRefreshToken': true
    },
    Badge: {
      persist: true,
      autoClear: false,
    },
  }
}

export default config
