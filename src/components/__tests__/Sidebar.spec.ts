
import { mount, RouterLinkStub } from "@vue/test-utils";
import Sidebar from '@/components/Sidebar.vue'
import { describe, it, expect, beforeEach, afterEach } from "vitest";

describe('Sidebar', () => {

  let wrapper;

  beforeEach(() => {
    wrapper = mount(Sidebar, {
      global: {
        stubs: {'router-link': RouterLinkStub},
      }
    });
  });
  afterEach(() => {
    document.body.outerHTML = ''
  })
  it('renders a button that opens the sidebar', async () => {
    const button = wrapper.find('button')

    expect(button.exists()).toBe(true)
    expect(wrapper.find('#default-sidebar').classes()).not.toContain('transform-none')

    await button.trigger('click')

    const sidebarClasses = wrapper.find('#default-sidebar').classes();

    expect(sidebarClasses).toContain('transform-none')
    expect(wrapper.vm.sidebarOpen).toBe(true)
  })

  it('closes the sidebar when clicking on the backdrop', async () => {
    const button = wrapper.find('button')

    await button.trigger('click')

    expect(wrapper.vm.sidebarOpen).toBe(true)

    const backdrop = document.body.querySelector('#modalBackdrop')

    // @ts-ignore
    await backdrop.click()

    expect(wrapper.vm.sidebarOpen).toBe(false)
  })
})
