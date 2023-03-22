import { defineStore } from 'pinia'
import { computed, ref } from 'vue'


export const useAudioPlayerStore = defineStore('audioPlayer', () => {
  const uri      = ref('')
  const title    = ref('')
  const artist   = ref('')
  const playing  = ref(false)
  const loop     = ref(false)
  const time     = ref(0)
  const duration = ref(0)
  const progress = computed(() => time.value / duration.value || 0)

  /**
   * Open an audio file and set the title and artist if provided
   * @param path Uri of the audio file
   * @param _title Title of the audio file
   * @param _artist Artist of the audio file
   */
  function open(path: string, _title?: string, _artist?: string) {
    uri.value = path
    title.value = _title || ''
    artist.value = _artist || ''
  }

  /**
   * Close the audio file
   */
  function close() {
    stop()
    uri.value = ''
    title.value = ''
    artist.value = ''
    time.value = 0
    duration.value = 0
  }

  /**
   * Play the audio file
   */
  function play() { playing.value = true }

  /**
   * Stop the audio file
   */
  function stop() { playing.value = false }

  /**
   * Change the loop mode
   */
  function toggleLoop() { loop.value = !loop.value }


  return {
    uri, title, artist, progress, loop,
    playing, stop, toggleLoop, play, open, duration, time, close
  }
})
