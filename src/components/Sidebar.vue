<script setup lang="ts">
import { Teleport } from "vue";

import { ref } from "vue";
import SidebarItem from "@/components/SidebarItem.vue";

const sidebarOpen = ref(false);

function toggleSidebar(){
  sidebarOpen.value = !sidebarOpen.value;
}
</script>

<template>
<button
    type="button"
    class="inline-flex items-center p-2 mt-2 ml-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
    @click="toggleSidebar"
  >
    <span class="sr-only">Open sidebar</span>
    <svg
      class="w-6 h-6"
      aria-hidden="true"
      fill="currentColor"
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        clip-rule="evenodd"
        fill-rule="evenodd"
        d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
      ></path>
    </svg>
  </button>
  <aside
    id="default-sidebar"
    class="fixed top-0 left-0 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0"
    :class="{ 'transform-none': sidebarOpen }"
    aria-label="Sidebar"
  >
    <div class="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
      <ul class="space-y-2 font-medium">
        <SidebarItem to="/">
          Dashboard
        </SidebarItem>
        <SidebarItem to="/campaigns">
          Campaigns
        </SidebarItem>
      </ul>
    </div>
  </aside>
  <Teleport to="body">
    <div
      v-if="open"
      class="bg-gray-900 bg-opacity-50 dark:bg-opacity-80 fixed inset-0 z-30"
      @click="toggleSidebar"
    ></div>
  </Teleport>
</template>

<style scoped>

</style>
