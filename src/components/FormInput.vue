<script setup lang="ts">
import { computed, defineProps } from "vue";
const props = defineProps({
  v: Object,
  name: String,
  title: String,
  modelValue: String
})
defineEmits(['update:modelValue'])

const field = computed(() => props.v[props.name])
</script>

<template>
  <div class="sm:col-span-4 mt-2">
    <label for="type" class="block text-sm font-medium leading-6 text-gray-900">{{ title }}</label>
    <div
      :class="
        field.$errors.length
          ? ['ring-red-600', 'fouch-within:ring-red-600']
          : ['focus-within:ring-indigo-600']
      "
      class="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset"
    >
      <input
        type="text"
        name="type"
        id="type"
        class="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
        :value="props.modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
        @blur="field.$touch"
      />
    </div>
    <p class="text-red-500 text-xs italic" v-for="error in field.$errors">{{ error.$message }}</p>
  </div>
</template>

<style scoped></style>
