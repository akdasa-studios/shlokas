// stores:
export * from './stores/useSettingsStore'

// pages:
export { default as AccountSettingsPage } from './pages/AccountPage.vue'
export { default as SettingsPage } from './pages/SettingsPage.vue'
export { default as AppInfoPage } from './pages/AppInfoPage.vue'

// tasks:
export * from './tasks/runSettingsPersistenceTask'
export * from './tasks/runSettingsRestoreTask'

// routes:
export * from './routes/settings'