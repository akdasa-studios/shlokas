import { Ref, ref } from "vue"

export function useDialog<T>(defaultData: any) {
  const isOpen = ref(false)
  const data: Ref<T> = ref(defaultData)

  function open(payload: any) {
    data.value = payload
    isOpen.value = true
  }

  function close() {
    isOpen.value = false
  }

  return { isOpen, open, close, data }
}