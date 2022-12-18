<template>
  <div class="front">
    <slot />
  </div>
</template>


<script lang="ts" setup>
</script>

<style scoped>
.front {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
  font-size: 6vw;
  text-align: center;
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  border: 1px solid #ddd;
  border-bottom: 10px solid #ddd;
}

/deep/ .number {
  text-transform: uppercase;
  background-color: lightblue;
  padding: .4em;
  margin: .4em;
  border-radius: .2em;
  font-size: 6vw;
}
</style>
