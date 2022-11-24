import { mount } from '@vue/test-utils'
import HomePage from '@/views/HomePage.vue'

describe('HomePage.vue', () => {
  it('renders', () => {
    const wrapper = mount(HomePage)
    expect(wrapper.text()).toMatch('Shlokas')
  })
})
