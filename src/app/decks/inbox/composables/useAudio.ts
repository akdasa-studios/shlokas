import { ref } from 'vue'

export function useAudio() {
  const playing = ref(false)
  const duration = ref(0)
  const progress = ref(0)
  const audioContext = new AudioContext()

  let startTime = 0
  let buffer: AudioBuffer
  let audioNode: AudioBufferSourceNode
  let timeOut: number|undefined = undefined


  async function open(url: string) {
    const resp = await fetch(url, {mode: 'cors'})
    buffer = await audioContext.decodeAudioData(await resp.arrayBuffer())
    duration.value = buffer.duration
  }

  function play(from?: number, to?: number) {
    audioNode = audioContext.createBufferSource()
    audioNode.buffer = buffer
    audioNode.connect(audioContext.destination)
    startTime = audioContext.currentTime
    if (from != undefined && to != undefined) {
      audioNode.start(0, from, to - from)
    } else {
      audioNode.start(0, 0)
    }
    audioNode.onended = stop
    timeOut = setInterval(calculateProgress, 150)
    playing.value = true
  }

  function stop() {
    if (timeOut) { clearInterval(timeOut) }
    playing.value = false
    progress.value = 0
    audioNode?.stop()
  }

  function calculateProgress() {
    progress.value = (audioContext.currentTime - startTime) / buffer.duration
  }

  return { playing, open, play, stop, duration, progress }
}