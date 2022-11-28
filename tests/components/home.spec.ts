import { mount } from '@vue/test-utils'
import HomePage from '@/views/HomePage.vue'
import { VerseBuilder, VerseId, VerseNumber } from '@akdasa-studios/shlokas-core/models/verse'

describe('HomePage.vue', () => {
  it('renders', () => {
    const wrapper = mount(HomePage)
    expect(wrapper.text()).toMatch('Shlokas')
  })
})
