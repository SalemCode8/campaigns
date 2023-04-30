<script setup lang="ts">
import { defineProps, reactive } from "vue";
import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from "@headlessui/vue";
import { required } from "@vuelidate/validators";
import useVuelidate from "@vuelidate/core";
import FormInput from "@/components/FormInput.vue";
import { useStore } from "vuex";

const props = defineProps({
  open: Boolean
})
const store = useStore();

const emit = defineEmits(['hide', 'show'])

const state = reactive({
  name: "",
  event: "",
  type: "",
  action: ""
})

const rules = {
  name: { required, $lazy: true, },
  event: { required, $lazy: true, },
  type: { required, $lazy: true, },
  action: { required, $lazy: true, }
}

const v$ = useVuelidate(rules, state)

const submit = async () => {
  const result = await v$.value.$validate;
  if(!result) return;

  store.dispatch('campaigns/createCampaign', state)
  emit('hide')
}
</script>

<template>
  <TransitionRoot as="template" :show="props.open">
    <Dialog as="div" class="relative z-10" @close="emit('hide')">
      <TransitionChild
        as="template"
        enter="ease-out duration-300"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="ease-in duration-200"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
      </TransitionChild>

      <div class="fixed inset-0 z-10 overflow-y-auto">
        <div
          class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0"
        >
          <TransitionChild
            as="template"
            enter="ease-out duration-300"
            enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enter-to="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leave-from="opacity-100 translate-y-0 sm:scale-100"
            leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <DialogPanel
              class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg"
            >
              <div class="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                <div class="sm:flex sm:items-start">
                  <div class="mt-3 text-center sm:mt-0 sm:text-left">
                    <DialogTitle as="h3" class="text-base font-semibold leading-6 text-gray-900">Create Campaign</DialogTitle>
                  </div>
                </div>
              </div>
              <div class="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                <form action="">
                  <FormInput title="Name" v-model="state.name" :v="v$" name="name"/>
                  <FormInput title="Event" v-model="state.event" :v="v$" name="event"/>
                  <FormInput title="Type" v-model="state.type" :v="v$" name="type"/>
                  <FormInput title="Action" v-model="state.action" :v="v$" name="action"/>
                </form>
              </div>
              <div class="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                <button
                  type="button"
                  :class="v$.$errors.length ? ['bg-green-500', 'opacity-50'] : ['bg-green-600', 'hover:bg-green-500']"
                  class="inline-flex w-full justify-center rounded-md px-3 py-2 text-sm font-semibold text-white shadow-sm sm:ml-3 sm:w-auto"
                  @click="submit"
                  :disabled="v$.$errors.length"
                >
                  Create
                </button>
                <button
                  type="button"
                  class="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                  @click="emit('hide')"
                  ref="cancelButtonRef"
                >
                  Cancel
                </button>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<style scoped></style>
