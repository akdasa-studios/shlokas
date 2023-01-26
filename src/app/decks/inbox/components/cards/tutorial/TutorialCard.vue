<template>
  <FlipCard
    data-testid="inbox-tutorial-card-01"
    :flipped="card.flipped.value"
    @flip="card.flip()"
  >
    <template #front>
      <CardSide class="side-color-0">
        front
      </CardSide>
    </template>

    <template #back>
      <CardSide class="side-color-0">
        back
      </CardSide>
    </template>
  </FlipCard>
</template>


<script lang="ts" setup>
import { defineProps, toRefs } from 'vue'
import { CardSide, FlipCard } from '@/app/decks/shared'
import { TutorialCardViewModel } from '@/app/decks/inbox'

/* -------------------------------------------------------------------------- */
/*                                  Interface                                 */
/* -------------------------------------------------------------------------- */

const props = defineProps<{
  card: TutorialCardViewModel
}>()
const { card } = toRefs(props)
</script>


<style src="@/app/decks/Card.scss" lang="scss" scoped />