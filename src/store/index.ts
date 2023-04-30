import { createStore, createLogger } from "vuex";
import type { State as CampaignsState } from '@/store/modules/campaigns'
import campaigns from './modules/campaigns'
const debug = import.meta.env.DEV;

export type RootState = {
  campaigns: CampaignsState
}
export default createStore({
  modules: {
    campaigns,
  },
  strict: debug,
  plugins: debug ? [createLogger()] : [],
})
