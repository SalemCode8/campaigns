import axios from "axios";
import type { Campaign } from "@/@types/campaigns";

const baseURL = 'http://localhost:3000'
export default {
  async getCampaigns(): Promise<Campaign[]> {
    const { data } = await axios.get<Campaign[]>(`${baseURL}/campaigns`)
    return data;
  },
  async createCampaign(campaign: Campaign): Promise<Campaign>{
    const { data } = await axios.post<Campaign>(`${baseURL}/campaigns`, campaign)
    return data;
  },
  async deleteCampaign(campaign: Campaign): Promise<any> {
    await axios.delete(`${baseURL}/campaigns/${campaign.id}`)
  }
}
