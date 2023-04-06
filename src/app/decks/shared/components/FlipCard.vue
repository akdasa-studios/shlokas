<template>
  <div class="card color">
    <div
      class="face face--front"
      :class="cardClass"
    >
      <div :class="sideClass">
        <slot name="front" />
      </div>
    </div>

    <div
      class="face face--back"
      :class="cardClass"
    >
      <div :class="sideClass">
        <slot name="back" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, defineProps, onMounted, ref, toRefs, withDefaults } from 'vue'
import { useSettingsStore } from '@/app/settings'
import { useStringHasher } from '@/app/shared'


/* -------------------------------------------------------------------------- */
/*                                Dependencies                                */
/* -------------------------------------------------------------------------- */

const hasher = useStringHasher()
const settings = useSettingsStore()

/* -------------------------------------------------------------------------- */
/*                                  Interface                                 */
/* -------------------------------------------------------------------------- */

interface Props {
  flipped: boolean,
  sideClass?: string
  cardClass?: string
  hueColorHash?: string
}

const props = withDefaults(defineProps<Props>(), {
  flipped: false,
  sideClass: undefined,
  cardClass: undefined,
  hueColorHash: ''
})

/* -------------------------------------------------------------------------- */
/*                                  Lifehooks                                 */
/* -------------------------------------------------------------------------- */

// animation issue workaround
onMounted(() => { setTimeout(() => transition.value = '.5s ease-in-out', 0) })


/* -------------------------------------------------------------------------- */
/*                                    State                                   */
/* -------------------------------------------------------------------------- */

const { flipped, sideClass } = toRefs(props)
const flipAngle = computed(() => flipped.value ? 180 : 0)
const transition = ref('0s')
const colorHueRotate = computed(() => getHueRotate())


/* -------------------------------------------------------------------------- */
/*                                   Helpers                                  */
/* -------------------------------------------------------------------------- */

function getHueRotate() {
  if (!settings.appearanceSettings.colorfulCards) { return 0 }
  return hasher.hash(props.hueColorHash) % 360
}
</script>


<style scoped>
.card {
	 width: 100%;
	 height: 100%;
	 perspective: 2700px;
	 touch-action: none;
	 user-select: none;
	 will-change: transform;
}
.card .face {
	 position: absolute;
	 top: 0;
	 left: 0;
	 width: 100%;
	 height: 100%;
	 backface-visibility: hidden;
	 transition: v-bind(transition);
	 overflow: hidden;
}
.card .face--front {
	 transform: rotateY(calc(v-bind(flipAngle) * 1deg));
}
.card .face--back {
	 transform: rotateY(calc(v-bind(flipAngle) * 1deg - 180deg));
}


.no-events {
  pointer-events: none;
}

.color {
  filter: hue-rotate(calc(v-bind(colorHueRotate) * 1deg));
}
</style>