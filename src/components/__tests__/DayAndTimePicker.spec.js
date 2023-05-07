import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'

import PrimeVue from 'primevue/config'
import ConfirmationService from 'primevue/confirmationservice'
import DialogService from 'primevue/dialogservice'
import ToastService from 'primevue/toastservice'

import DayAndTimePicker from '@/components/subject/DayAndTimePicker.vue'

describe('DayAndTimePicker', () => {
  it('renders properly with default props', () => {
    const wrapper = mount(DayAndTimePicker, {
      props: {},
      global: {
        plugins: [PrimeVue, ConfirmationService, DialogService, ToastService],
      },
    })
    expect(wrapper.text()).toContain('Day')
    expect(wrapper.text()).toContain('Start Time')
    expect(wrapper.text()).toContain('End Time')
    expect(wrapper.find('#deleteDayAndTimeButton').exists()).toBe(false)
  })

  it('renders delete button', () => {
    const wrapper = mount(DayAndTimePicker, {
      props: {
        hasDeleteButton: true,
      },
      global: {
        plugins: [PrimeVue, ConfirmationService, DialogService, ToastService],
      },
    })
    expect(wrapper.find('#deleteDayAndTimeButton').exists()).toBe(true)
  })

  it('emits selectedDay event when day is selected', async () => {
    const wrapper = mount(DayAndTimePicker, {
      props: {},
      global: {
        plugins: [PrimeVue, ConfirmationService, DialogService, ToastService],
      },
    })

    // TODO: need to figure out how to select a dropdown option (PrimeVue Dropdown does not use select element)

    // wrapper.findComponent(Dropdown).get('select').setValue('Monday')
    const openDropdown = wrapper.find('.p-dropdown-label')
    await openDropdown.trigger('click')
    // console.log(openDropdown.html())

    // const dropdownOption = wrapper.get('.p-dropdown-item')
    // console.log(dropdownOption)
    // console.log(dropdownOption.html())

    // .trigger('click')

    // wrapper.findAll('.p-dropdown-item').at(1).trigger('click')

    // expect(wrapper.emitted()).toHaveProperty('selectedDay')
  })
})
