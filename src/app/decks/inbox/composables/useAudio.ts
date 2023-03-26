import { ref } from 'vue'

export function useAudio() {
  const playing = ref(false)
  const duration = ref(0)
  const audioContext = new AudioContext()
  let buffer: AudioBuffer
  let audioNode: AudioBufferSourceNode


  async function open(url: string) {
    const resp = await fetch(url, {mode: 'cors'})
    buffer = await audioContext.decodeAudioData(await resp.arrayBuffer())
    duration.value = buffer.duration
  }

  function play(from: number, to: number) {
    audioNode = audioContext.createBufferSource()
    audioNode.buffer = buffer
    audioNode.connect(audioContext.destination)
    audioNode.start(0, from, to - from)
    audioNode.onended = function() { playing.value = false }
    playing.value = true
  }

  function stop() {
    audioNode?.stop()
  }

  return { playing, open, play, stop, duration }
}