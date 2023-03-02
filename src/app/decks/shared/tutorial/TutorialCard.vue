<template>
  <FlipCard
    :data-testid="'tutorial.' + card.id"
    :flipped="card.flipped"
    side-class="side side-color-t"
    card-class="padding"
    @click="card.flip()"
  >
    <template #front>
      <div class="text">
        {{ $t(`tutorial.${card.id}.front.text`) }}
      </div>

      <div class="action">
        {{ $t(`tutorial.${card.id}.front.action`) }}
      </div>
    </template>

    <template #back>
      <div class="text">
        {{ $t(`tutorial.${card.id}.back.text`) }}
      </div>

      <div class="action">
        {{ $t(`tutorial.${card.id}.back.action`) }}
      </div>
    </template>
  </FlipCard>
</template>


<script lang="ts" setup>
import { defineProps, toRefs } from 'vue'
import { FlipCard } from '@akdasa-studios/shlokas-uikit'
import { TutorialCardViewModel } from '@/app/decks/shared'

/* -------------------------------------------------------------------------- */
/*                                  Interface                                 */
/* -------------------------------------------------------------------------- */

const props = defineProps<{
  card: TutorialCardViewModel
}>()
const { card } = toRefs(props)
</script>


<style src="@/app/decks/Card.scss" lang="scss" />

<style scoped>
.title {
  font-size: 1.7rem;
  font-family: Arial, Helvetica, sans-serif;
  font-weight: bold;
  text-transform: uppercase;
}

.text {
  margin-top: .5rem;
  margin-bottom: .5rem;
}

.action {
  font-size: 1.2rem;
  font-family: Arial, Helvetica, sans-serif;
  font-weight: bold;
  background-color: rgba(0,0,0,.1);
  padding: 6px;
  border: 1px rgba(0,0,0,.1) solid;
  border-radius: 5px;
  text-transform: uppercase;
  margin: 15px;
}
</style>