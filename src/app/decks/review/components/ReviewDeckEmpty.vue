<template>
  <div class="root">
    <DarkImage
      src="brahma.svg"
      class="img"
    />
    <div class="text">
      <div>{{ $t('decks.review.empty') }}</div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import DarkImage from '@/app/shared/DarkImage.vue'
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
</style>
