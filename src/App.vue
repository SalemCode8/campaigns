<script setup lang="ts">
import { RouterView } from 'vue-router'
import Sidebar from "@/components/Sidebar.vue";

</script>

<template>
  <Sidebar/>
  <div class="p-4 sm:ml-64">
    <div class="p-4">
      <RouterView />
    </div>
  </div>

</template>
