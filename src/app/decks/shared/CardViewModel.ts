import { Verse } from '@akdasa-studios/shlokas-core'
import { computed, reactive, ref } from 'vue'
import { Vector3d } from './Vector3d'

export abstract class CardViewModel {
  constructor(
    private readonly verse: Verse
  ) {}

  index    = ref<number>(0)
  position = reactive(new Vector3d(0, 0, 0))
  angle    = reactive(new Vector3d(0, 0, 0))
  action   = ref<string>("inactive")
  opacity  = ref(1)
  // style    = computed(() => {
  //   const actions = {
  //     'moving': 'none',
  //     // 'inactive': '.6s linear',
  //     'inactive': '.6s cubic-bezier(0.68, -0.6, 0.32, 1.6);',
  //     'deleting': '.25s linear'
  //   }

  //   //@ts-ignore
  //   const transition = actions[this.action.value] as string
  //   return `transform: translateX(${this.position.x}px)` +
  //         `           translateY(${this.position.y}px)` +
  //         `           translateZ(${this.position.z}px)` +
  //         `           rotateX(${this.angle.x}deg)` +
  //         `           rotateY(${this.angle.y}deg)` +
  //         `           rotateZ(${this.angle.z}deg);` +
  //         `transition: ${transition};`+
  //         `opacity: ${this.opacity.value};`+
  //         `z-index: ${10 - this.index.value}; /* ${this.index.value} */`
  // })

  get verseNumber() { return this.verse.number.toString() }
  get text()        { return this.verse.text.lines }
  get translation() { return this.verse.translation.text }
  get synonyms()    { return this.verse.synonyms }
}
