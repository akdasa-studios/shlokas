<template>
  <CardSide>
    <!-- Number -->
    <div class="number">
      {{ props.verseNumber }}
    </div>

    <!-- Text -->
    <FitText
      :min-size="12"
      :max-size="25"
      :multi-line="false"
    >
      <span
        v-for="line, idx in props.lines"
        :key="idx"
      >
        {{ line }}<br>
      </span>
    </FitText>
  </CardSide>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'
import { CardSide } from '@/app/decks/shared'
import FitText from '@/app/FitText.vue'
const props = defineProps<{
  verseNumber: string
  lines: string[]
}>()
</script>

<style src="@/app/decks/Card.scss" lang="scss" scoped />