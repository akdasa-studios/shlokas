import { Ref, ref } from "vue"

interface ToastArgs {
  message?: string
  data?: any
}

export function useToast() {
  const isOpen = ref(false)
  const message = ref("")
  const data: Ref<Record<string, unknown>> = ref({})

  function open(options?: ToastArgs) {
    message.value = options?.message || ""
    data.value = options?.data
    isOpen.value = true
  }

  function close() {
    isOpen.value = false
  }

  return { isOpen, open, close, message, data }
}