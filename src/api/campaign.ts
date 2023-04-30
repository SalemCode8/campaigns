import axios from "axios";
import type { Campaign } from "@/@types/campaigns";

export default {
  async getCampaigns(): Promise<Campaign[]> {
    const { data } = await axios.get<Campaign[]>('/campaigns')
    return data;
  },
  async createCampaign(campaign: Campaign): Promise<Campaign>{
    const { data } = await axios.post<Campaign>('/campaigns', campaign)
    return data;
  },
  async deleteCampaign(campaign: Campaign): Promise<any> {
    await axios.delete(`/campaigns/${campaign.id}`)
  }
}
