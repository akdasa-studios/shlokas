<template>
  <div class>
    <slot />
  </div>
</template>


<style scoped >
.t3d {
  /* background-color: red; */
  transform-style: preserve-3d;
  /* transform: translateZ(-100px); */
  width: 100%;
  height: 100%;
  position: relative;
  perspective: 1800px;
}
</style>