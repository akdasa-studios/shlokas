<template>
  <div class="deck">
    <slot />
  </div>
</template>


<style scoped >
.deck {
  /* background-color: red; */
  transform-style: preserve-3d;
  /* transform: translateZ(-100px); */
  width: 100%;
  height: 100%;
  position: relative;
  perspective: 1800px;
}
</style>