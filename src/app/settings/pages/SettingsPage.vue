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

        <SocialNetworksListItem />

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

        <ion-item>
          <ion-toggle
            v-model="settings.showAppBadge"
          >
            {{ $t('settings.showAppBadge') }}
          </ion-toggle>
        </ion-item>

        <!-- Sadhana -->


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

        <ion-item
          v-for="alarm, idx of settings.notificationTime"
          :key="idx"
          @click="onNotificationTimeClicked()"
        >
          <ion-label>{{ $t('settings.notification') }}</ion-label>
          <ion-button
            slot="end"
            color="medium"
          >
            {{ alarm[0].toString().padStart(2, '0') }}:{{ alarm[1].toString().padStart(2, '0') }}
          </ion-button>
        </ion-item>

        <ion-item
          @click="onMemorizationTimeClicked"
        >
          <ion-label>{{ $t('settings.memorizationTime') }}</ion-label>
          <ion-button
            slot="end"
            color="medium"
          >
            {{ settings.memorizationTime }} {{ $t("settings.minutes") }}
          </ion-button>
        </ion-item>


        <!-- System -->

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
    </ion-content>

    <MemorizationTimePicker
      :is-open="isMemorizationTimePickerOpen"
      @close="isMemorizationTimePickerOpen = false"
    />
    <NotificationTimePicker
      :is-open="isNotificationTimePickerOpen"
      @close="isNotificationTimePickerOpen = false"
    />
  </ion-page>
</template>


<script lang="ts" setup>
import {
  IonContent, IonHeader, IonItem, IonLabel, IonList,
  IonPage, IonSelect, IonSelectOption, IonTitle, IonToggle, IonToolbar,
  IonListHeader, IonButton
} from '@ionic/vue'
import { computed, inject, onMounted, reactive, ref, watch } from 'vue'
import { EmailComposer } from '@awesome-cordova-plugins/email-composer'
import { Deploy } from 'cordova-plugin-ionic'
import { storeToRefs } from 'pinia'
import { useSettingsStore, NotificationTimePicker, MemorizationTimePicker, SocialNetworksListItem } from '@/app/settings'
import { getAvailableLanguages, useApplication, useScheduleNotifications, useUpdateAppBadge } from '@/app/shared'


/* -------------------------------------------------------------------------- */
/*                                Dependencies                                */
/* -------------------------------------------------------------------------- */

const i18n = inject('i18n') as any
const settings = useSettingsStore()
const app = useApplication()
const scheduleNotifications = useScheduleNotifications()
const updateAppBadge = useUpdateAppBadge()


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
const isNotificationTimePickerOpen = ref(false)
const isMemorizationTimePickerOpen = ref(false)
const { enableNotifications, showAppBadge } = storeToRefs(settings)


/* -------------------------------------------------------------------------- */
/*                                  Lifehooks                                 */
/* -------------------------------------------------------------------------- */

onMounted(checkUpdates)

watch([enableNotifications], async (value) => {
  if (!value) { return }
  await scheduleNotifications.requestPermissions()
})

watch([showAppBadge], async (value) => {
  if (!value) { return }
  await updateAppBadge.requestPermissions()
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
  throw new Error('This is a test')
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

function onNotificationTimeClicked() {
  isNotificationTimePickerOpen.value = true
}

function onMemorizationTimeClicked() {
  isMemorizationTimePickerOpen.value = true
}
</script>


<style scoped>
ion-modal {
  --height: auto;
  --width: 100%
}
</style>