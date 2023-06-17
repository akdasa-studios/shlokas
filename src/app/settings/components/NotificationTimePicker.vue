<template>
  <ion-picker
    :is-open="isOpen"
    :columns="notificationTimeColumns"
    :buttons="notificationTimeButtons"
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

/* -------------------------------------------------------------------------- */
/*                                    State                                   */
/* -------------------------------------------------------------------------- */

const { isOpen } = toRefs(props)
const { notificationTime, enableNotifications, language } = storeToRefs(settingsStore)
const [ hours, minutes ] = notificationTime.value[0]

const notificationTimeColumns = [
  {
    name: 'hour',
    selectedIndex: hours,
    options: [
      { text: '00', value: 0, },
      { text: '01', value: 1, },
      { text: '02', value: 2, },
      { text: '03', value: 3, },
      { text: '04', value: 4, },
      { text: '05', value: 5, },
      { text: '06', value: 6, },
      { text: '07', value: 7, },
      { text: '08', value: 8, },
      { text: '09', value: 9, },
      { text: '10', value: 10, },
      { text: '11', value: 11, },
      { text: '12', value: 12, },
      { text: '13', value: 13, },
      { text: '14', value: 14, },
      { text: '15', value: 15, },
      { text: '16', value: 16, },
      { text: '17', value: 17, },
      { text: '18', value: 18, },
      { text: '19', value: 19, },
      { text: '20', value: 20, },
      { text: '21', value: 21, },
      { text: '22', value: 22, },
      { text: '23', value: 23, },
    ],
  },
  {
    name: 'minute',
    selectedIndex: minutes/5,
    options: [
      { text: '00', value: 0 },
      { text: '05', value: 5 },
      { text: '10', value: 10 },
      { text: '15', value: 15 },
      { text: '20', value: 20 },
      { text: '25', value: 25 },
      { text: '30', value: 30 },
      { text: '35', value: 35 },
      { text: '40', value: 40 },
      { text: '45', value: 45 },
      { text: '50', value: 50 },
      { text: '55', value: 55 },
    ]
  }
]

const notificationTimeButtons = [
  {
    text: i18n.t('common.cancel'),
    role: 'cancel',
  },
  {
    text: i18n.t('common.ok'),
    handler: (value: any) => {
      enableNotifications.value = true
      notificationTime.value = [
        [value.hour.value, value.minute.value]
      ]
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
  notificationTimeButtons[0].text = i18n.t('common.cancel')
  notificationTimeButtons[1].text = i18n.t('common.ok')
}
</script>