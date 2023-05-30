import { CapacitorConfig } from '@capacitor/cli'

const config: CapacitorConfig = {
  appId: 'com.akdasa.shlokas',
  appName: 'shlokas',
  webDir: 'dist',
  bundledWebRuntime: true,
  plugins: {
    GoogleAuth: {
      'scopes': ['profile', 'email'],
      'serverClientId': '879891505939-bs3v8sm9mu1ti65eu81f3b8idtl8bakm.apps.googleusercontent.com',
      'iosClientId': '879891505939-uojhetilbf9meih9veisruc2lfu8im26.apps.googleusercontent.com',
      // We use WEB client ID here. Don't ask me why...
      'androidClientId': '879891505939-bs3v8sm9mu1ti65eu81f3b8idtl8bakm.apps.googleusercontent.com',
      'forceCodeForRefreshToken': true
    },
    'CapacitorSQLite': {
      'iosDatabaseLocation': 'Library/CapacitorDatabase',
      'iosIsEncryption': false,
      'iosKeychainPrefix': 'cap',
      'iosBiometric': {
        'biometricAuth': false,
        'biometricTitle' : 'Biometric login for capacitor sqlite'
      },
      'androidIsEncryption': false,
      'androidBiometric': {
        'biometricAuth' : false,
        'biometricTitle' : 'Biometric login for capacitor sqlite',
        'biometricSubTitle' : 'Log in using your biometric'
      },
    }
  }
}

export default config
