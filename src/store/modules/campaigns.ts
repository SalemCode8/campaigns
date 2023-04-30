import type { ActionHandler, ActionTree, MutationTree } from "vuex";
import type { RootState } from '@/store'
import type { Campaign } from "@/@types/campaigns";
import campaignApi from "@/api/campaign";

export type State = {
  all: Array<Campaign>
}

const state: State = {
  all: [],
}

export interface Mutations {

}

const mutations: MutationTree<State> = {
  setCampaigns(state, campaigns: Campaign[]){
    state.all = campaigns;
  },
  addCampaign(state, campaign: Campaign) {
    state.all.push(campaign);
  },
  editCampaign(state, campaign: Campaign) {
    const index = state.all.indexOf(campaign);
    state.all.splice(index, 1, {
      ...campaign
    })
  },
  removeCampaign(state, campaign: Campaign){
    state.all.splice(state.all.indexOf(campaign), 1);
  }
}
export interface Actions {
  getAllCampaigns: ActionHandler<State, RootState>;
}

const actions: ActionTree<State, RootState> & Actions = {
  async getAllCampaigns({ commit }) {
    const campaigns = await campaignApi.getCampaigns();
    commit('setCampaigns', campaigns);
  },
  async createCampaign({commit}, payload: Campaign){
    const campaign = await campaignApi.createCampaign(payload);
    commit('addCampaign', campaign)
  },
  async removeCampaign({ commit }, payload: Campaign) {
    await campaignApi.deleteCampaign(payload);
    commit('removeCampaign', payload)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
}
