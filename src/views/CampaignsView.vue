<script setup lang="ts">

import CreateCampaignModal from "@/components/CreateCampaignModal.vue";
import { computed, ref } from "vue";
import { useStore } from "vuex";

const modalOpen = ref(false);

const store = useStore()

store.dispatch('campaigns/getAllCampaigns')

const campaigns = computed(() => store.state.campaigns.all)


const deleteCampaign = (campaign) => {
    store.dispatch('campaigns/removeCampaign', campaign)
}
</script>

<template>
<CreateCampaignModal></CreateCampaignModal>
    <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-5">
        Create Campaign
    </button>
<div class="relative overflow-x-auto">
    <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" class="px-6 py-3">
                    Name
                </th>
                <th scope="col" class="px-6 py-3">
                    Type
                </th>
                <th scope="col" class="px-6 py-3">
                    Event
                </th>
                <th scope="col" class="px-6 py-3">
                    Action
                </th>
                <th scope="col"></th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="campaign in campaigns" class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {{ campaign.name }}
                </th>
                <td class="px-6 py-4">
                    {{ campaign.type }}
                </td>
                <td class="px-6 py-4">
                    {{ campaign.event }}
                </td>
                <td class="px-6 py-4">
                    $2999
                </td>
                <td class="px-6 py-4">
                    <button
                      class="inline-flex w-full justify-center rounded-md px-3 py-2 text-sm font-semibold text-white shadow-sm sm:ml-3 sm:w-auto bg-red-700 hover:bg-red-500"
                      @click="() => deleteCampaign(campaign)"
                      >Delete</button>
                </td>
            </tr>
        </tbody>
    </table>
</div>

</template>

<style scoped>

</style>
