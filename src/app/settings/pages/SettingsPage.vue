<template>
  <ion-page ref="page">
    <!-- Header -->
    <ion-header
      @click="onHeaderClicked"
    >
      <ion-toolbar>
        <ion-title>{{ $t('settings.title') }}</ion-title>
      </ion-toolbar>
    </ion-header>

    <!-- Content -->
    <ion-content>
      <ion-list>
        <ion-list-header>
          <ion-label>{{ $t('settings.general') }}</ion-label>
        </ion-list-header>

        <ion-item>
          <ion-select
            v-model="settings.language"
            interface="action-sheet"
            placeholder="Language"
            data-testid="language"
            :label="$t('settings.language')"
            @ion-change="x => onLocaleChanged(x.detail.value)"
          >
            <ion-select-option
              v-for="lang in languages"
              :key="lang.code"
              :value="lang.code"
            >
              {{ lang.name }}
            </ion-select-option>
          </ion-select>
        </ion-item>

        <ion-item
          v-if="settings.showAccountControls"
          :detail="true"
          router-link="/home/settings/account"
          router-direction="forward"
          data-testid="account"
        >
          <ion-label>{{ $t('settings.account') }}</ion-label>
        </ion-item>

        <ion-item
          :detail="true"
        >
          <ion-label
            @click="onSendEmail"
          >
            {{ $t('settings.contactUs') }}
          </ion-label>
        </ion-item>

        <ion-list-header>
          <ion-label>{{ $t('settings.appearance') }}</ion-label>
        </ion-list-header>

        <ion-item>
          <ion-toggle
            v-model="settings.showGradeButtons"
          >
            {{ $t('settings.gradeButtons') }}
          </ion-toggle>
        </ion-item>

        <ion-item>
          <ion-toggle
            v-model="settings.colorfulCards"
          >
            {{ $t('settings.colorfulCards') }}
          </ion-toggle>
        </ion-item>

        <ion-item>
          <ion-toggle
            v-model="settings.reviewCardsInRandomOrder"
          >
            {{ $t('settings.reviewCardsInRandomOrder') }}
          </ion-toggle>
        </ion-item>

        <ion-item>
          <ion-toggle
            v-model="settings.hideControlsInLandscapeMode"
          >
            {{ $t('settings.hideControlsInLandscapeMode') }}
          </ion-toggle>
        </ion-item>

        <!-- Sadhana -->

        <ion-list>
          <ion-list-header>
            <ion-label>{{ $t('settings.sadhana') }}</ion-label>
          </ion-list-header>

          <ion-item>
            <ion-toggle
              v-model="settings.enableNotifications"
            >
              {{ $t('settings.enableNotifications') }}
            </ion-toggle>
          </ion-item>

          <ion-item>
            <ion-label>{{ $t('settings.notification') }}</ion-label>
            <ion-datetime-button datetime="datetime" />
          </ion-item>
        </ion-list>


        <!-- System -->

        <ion-list>
          <ion-list-header>
            <ion-label>{{ $t('settings.system') }}</ion-label>
          </ion-list-header>

          <ion-item
            router-link="/home/settings/cache"
            router-direction="forward"
            :detail="true"
          >
            <ion-label>{{ $t('settings.cache') }}</ion-label>
          </ion-item>


          <ion-item
            :disabled="!(updateInfo.available && updateInfo.nextVersion != '')"
          >
            <ion-label
              @click="onUpdate"
            >
              {{ $t('settings.update') }}
              <p>
                <span v-if="updateInfo.channel">{{ updateInfo.channel }}&nbsp;::&nbsp;</span>
                <span v-if="updateInfo.nextVersion">{{ updateInfo.nextVersion }}</span>
                <span v-else>{{ $t('settings.noUpdatesAvailable') }}</span>
              </p>
            </ion-label>
          </ion-item>
        </ion-list>



        <ion-list
          v-if="isDevModeEnabled"
        >
          <ion-list-header>
            <ion-label>{{ $t('settings.debug') }}</ion-label>
          </ion-list-header>

          <ion-item>
            <ion-toggle
              v-model="settings.showUnpublishedVerses"
            >
              {{ $t('settings.showUnpublishedVerses') }}
            </ion-toggle>
          </ion-item>

          <ion-item
            :detail="true"
            router-link="/home/settings/app"
            router-direction="forward"
          >
            <ion-label>{{ $t('settings.info') }}</ion-label>
          </ion-item>

          <ion-item
            @click="onNextDay"
          >
            <ion-label>{{ $t('settings.nextDay') }}</ion-label>
          </ion-item>
        </ion-list>


        <ion-modal :keep-contents-mounted="true">
          <ion-datetime
            id="datetime"
            presentation="time"
            :value="getNotificationDateTime()"
            @ion-change="onNotificationTimeChange"
          />
        </ion-modal>
      </ion-list>
    </ion-content>
  </ion-page>
</template>


<script lang="ts" setup>
import {
  IonContent, IonHeader, IonItem, IonLabel, IonList,
  IonPage, IonSelect, IonSelectOption, IonTitle, IonToggle, IonToolbar,
  IonListHeader, IonDatetime, IonDatetimeButton, IonModal
} from '@ionic/vue'
import { computed, inject, onMounted, reactive, ref, watch } from 'vue'
import { EmailComposer } from '@awesome-cordova-plugins/email-composer'
import { Deploy } from 'cordova-plugin-ionic'
import { LocalNotifications } from '@capacitor/local-notifications'
import { storeToRefs } from 'pinia'
import { useSettingsStore } from '@/app/settings'
import { getAvailableLanguages, useApplication } from '@/app/shared'

// function onch(v: any) {
//   console.log(new Date(v.detail.value).getHours())
// }

/* -------------------------------------------------------------------------- */
/*                                Dependencies                                */
/* -------------------------------------------------------------------------- */

const i18n = inject('i18n') as any
const settings = useSettingsStore()
const app = useApplication()


/* -------------------------------------------------------------------------- */
/*                                    State                                   */
/* -------------------------------------------------------------------------- */

const languages = getAvailableLanguages()
const isDevModeEnabled = computed(() => devModeClicks.value >= 3)
const devModeClicks = ref(0)
const daysInFuture = ref(0)
const updateInfo = reactive({
  available: false,
  nextVersion: '',
  channel: ''
})
const { enableNotifications } = storeToRefs(settings)


/* -------------------------------------------------------------------------- */
/*                                  Lifehooks                                 */
/* -------------------------------------------------------------------------- */

onMounted(checkUpdates)

watch([enableNotifications], async (value) => {
  if (!value) { return }

  const perms = await LocalNotifications.checkPermissions()
  if (perms.display != 'granted') {
    await LocalNotifications.requestPermissions()
  }
})

/* -------------------------------------------------------------------------- */
/*                                  Handlers                                  */
/* -------------------------------------------------------------------------- */

function onLocaleChanged(lang: string) {
  i18n.locale.value = lang
}

async function onSendEmail() {
  await EmailComposer.open({
    to: ['feedback@shlokas.app']
  })
}

function onHeaderClicked() {
  devModeClicks.value += 1
}

function onNextDay() {
  daysInFuture.value += 1
  app.goInFuture(daysInFuture.value)
}

async function onUpdate() {
  await Deploy.sync({
    updateMethod: 'auto',
  })
}

async function checkUpdates() {
  const updates = await Deploy.checkForUpdate()
  const config = await Deploy.getConfiguration()
  updateInfo.available = updates.available
  updateInfo.nextVersion = updates.build || updates.snapshot || ''
  updateInfo.channel = config.channel
}

function onNotificationTimeChange(v: any) {
  const tokens = v.detail.value.split(':')
  settings.notificationTime = [
    [parseInt(tokens[0]), parseInt(tokens[1])]
  ]
}

function getNotificationDateTime() {
  const setting = settings.notificationTime[0]
  if (!setting) { return '09:00' }
  return `${setting[0].toString().padStart(2, '0')}:${setting[1].toString().padStart(2, '0')}`
}
</script>
