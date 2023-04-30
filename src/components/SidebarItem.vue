<script setup lang="ts">
import { RouterLink } from 'vue-router'

const props = defineProps({
  to: String,
})
</script>

<template>
  <li>
    <RouterLink
      :to="props.to"
      class="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100"
      active-class="bg-gray-200"
    >
      <slot name="icon"></slot>
      <span class="ml-3">
        <slot></slot>
      </span>
    </RouterLink>
  </li>
</template>

<style scoped></style>
