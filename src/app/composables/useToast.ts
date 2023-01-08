import { ref } from "vue"

export function useToast() {
  const isOpen = ref(false)
  const message = ref("")

  function open(msg = "") {
    message.value = msg
    isOpen.value = true
  }

  function close() {
    isOpen.value = false
  }

  return { isOpen, open, close, message }
}