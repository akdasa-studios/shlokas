import { mount } from '@vue/test-utils'
import HomePage from '@/views/HomePage.vue'

describe('HomePage.vue', () => {
  it('renders', () => {
    const wrapper = mount(HomePage)
    const savebutton = wrapper.find('#addVerseButton')
    savebutton.trigger('click')
    console.log(wrapper.html())

    // const lines = wrapper.findAll('.verseLine')

    expect(wrapper.text()).toMatch('Shlokas')
    // expect(lines.length).toEqual(1)
  })
})
