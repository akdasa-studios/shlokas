<template>
  <div class="root">
    <DarkImage
      src="brahma.svg"
      class="img"
      :class="{'dark':isDark}"
    />
    <div class="text">
      <div>{{ $t('decks.inbox.empty') }}</div>
      <div>{{ $t('decks.inbox.goToLibrary') }}</div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { usePreferredDark } from '@vueuse/core'
import { DarkImage } from '@/app/shared'

const isDark = usePreferredDark()
</script>

<style scoped>
.root {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
}

.text {
    margin: 20px;
    text-align: center;
}

.img {
    max-width: 50%;
}

.dark {
  filter: grayscale(1) brightness(.85) contrast(1.2);
}
</style>
