<template>
  <ion-picker
    :is-open="isOpen"
    :columns="memorizationTimeColumns"
    :buttons="memorizationTimeButtons"
    @did-dismiss="onPickerDismiss"
  />
</template>

<script lang="ts" setup>
import { IonPicker } from '@ionic/vue'
import { inject, toRefs, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { useSettingsStore } from '@/app/settings'


/* -------------------------------------------------------------------------- */
/*                                  Interface                                 */
/* -------------------------------------------------------------------------- */

const props = defineProps<{
  isOpen: boolean
}>()

const emit = defineEmits<{
  (e: 'close'): void
}>()


/* -------------------------------------------------------------------------- */
/*                                Dependencies                                */
/* -------------------------------------------------------------------------- */

const i18n = inject('i18n') as any
const settingsStore = useSettingsStore()
const { memorizationTime } = storeToRefs(settingsStore)


/* -------------------------------------------------------------------------- */
/*                                    State                                   */
/* -------------------------------------------------------------------------- */

const { isOpen } = toRefs(props)
const { language } = storeToRefs(settingsStore)

const memorizationTimeColumns = [
  {
    name: 'time',
    selectedIndex: memorizationTime.value / 5 - 1,
    suffix: i18n.t('settings.minutes'),
    columnWidth: '100px',
    suffixWidth: '100px',
    options: [
      { text: '5', value: 5, },
      { text: '10', value: 10, },
      { text: '15', value: 15, },
      { text: '20', value: 20, },
      { text: '25', value: 25, },
      { text: '30', value: 30, },
      { text: '35', value: 35, },
      { text: '40', value: 40, },
      { text: '45', value: 45, },
      { text: '50', value: 50, },
      { text: '55', value: 55, },
      { text: '60', value: 60, },
    ],
  },
]

const memorizationTimeButtons = [
{
    text: i18n.t('common.cancel'),
    role: 'cancel',
  },
  {
    text: i18n.t('common.ok'),
    handler: (value: any) => {
      settingsStore.memorizationTime = value.time.value
    },
  }
]

/* -------------------------------------------------------------------------- */
/*                                    Hooks                                   */
/* -------------------------------------------------------------------------- */

watch(language, onLanguageChanged)


/* -------------------------------------------------------------------------- */
/*                                  Handlers                                  */
/* -------------------------------------------------------------------------- */

function onPickerDismiss() {
  emit('close')
}

function onLanguageChanged() {
  memorizationTimeColumns[0].suffix = i18n.t('settings.minutes')
  memorizationTimeButtons[0].text = i18n.t('common.cancel')
  memorizationTimeButtons[1].text = i18n.t('common.ok')
}
</script>
