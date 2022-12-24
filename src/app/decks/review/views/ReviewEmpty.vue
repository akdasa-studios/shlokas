<template>
  <div class="root">
    <ion-img
      src="brahma.svg"
      class="img"
    />
    <div class="text">
      <div>{{ $t('decks.review.empty') }}</div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { IonImg } from '@ionic/vue';
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
