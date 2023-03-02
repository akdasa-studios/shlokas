<template>
  <AudioPlayer
    :uri="uri"
    :title="title"
    :artist="$t('app.name')"
    :playing="playing"
    :loop="loop"
    @status="onStatusChanged"
  />
</template>


<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import { AudioPlayer } from '@akdasa-studios/shlokas-uikit'
import { useAudioPlayerStore } from '@/app/shared'

const { playing, time, duration, uri, title, loop } = storeToRefs(useAudioPlayerStore())

function onStatusChanged(status: any) {
  playing.value = status.playing
  time.value = status.time
  duration.value = status.duration
}
</script>


