import { describe, beforeEach, vi, it, expect } from 'vitest'
import campaignsModule from "@/store/modules/campaigns";
import campaignApi from "@/api/campaign";
import { Campaign } from "../../@types/campaigns";


const { mutations, actions } = campaignsModule
const campaign: Campaign = {
  "name": "Campaign2",
  "type": "Type 2",
  "event": "event 2",
  "action": "action 2"
}
describe("Campaigns Store Module", () => {
  describe("Mutations", () => {
    let state;

    beforeEach(() => {
      state = {
        all: [],
      };
    });

    it("setCampaigns mutation should set the campaigns array", () => {
      const campaigns = [{ id: 1, name: "Campaign 1" }];
      mutations.setCampaigns(state, campaigns);
      expect(state.all).toEqual(campaigns);
    });

    it("addCampaign mutation should add a new campaign to the array", () => {
      const campaign = { id: 1, name: "Campaign 1" };
      mutations.addCampaign(state, campaign);
      expect(state.all).toContainEqual(campaign);
    });

    it("editCampaign mutation should update an existing campaign in the array", () => {
      const campaign1 = { id: 1, name: "Campaign 1" };
      const campaign2 = { id: 1, name: "Updated Campaign 1" };
      state.all = [campaign1];
      mutations.editCampaign(state, campaign2);
      expect(state.all).toContainEqual(campaign2);
      expect(state.all).not.toContainEqual(campaign1);
    });

    it("removeCampaign mutation should remove a campaign from the array", () => {
      const campaign1: Campaign = { id: 1, name: "Campaign 1", event: "Event 1", action: "Action 1", type: "Type 1" };
      const campaign2: Campaign = { id: 2, name: "Campaign 2", event: "Event 2", action: "Action 2", type: "Type 2" };
      state.all = [campaign1, campaign2];
      mutations.removeCampaign(state, campaign1);
      expect(state.all).not.toContainEqual(campaign1);
      expect(state.all).toContainEqual(campaign2);
    });
  });

  describe("Actions", () => {
    let commit;

    beforeEach(() => {
      commit = vi.fn();
    });

    it("getAllCampaigns action should call the getCampaigns API and commit setCampaigns mutation", async () => {
      const campaigns = [{ id: 1, name: "Campaign 1", type: "Type 1", event: "Event 1", action: "Action 1" }];
      const spy = vi.spyOn(campaignApi, "getCampaigns");
      // @ts-ignore
      await actions.getAllCampaigns({ commit });
      expect(spy).toHaveBeenCalled();
      expect(commit).toHaveBeenCalledWith("setCampaigns", campaigns);
    });

    it("createCampaign action should call the createCampaign API and commit addCampaign mutation", async () => {
      const spy = vi.spyOn(campaignApi, "createCampaign");
      // @ts-ignore
      await actions.createCampaign({ commit }, campaign);
      expect(spy).toHaveBeenCalledWith(campaign);
      expect(commit).toHaveBeenCalledWith("addCampaign", campaign);
    });

    it("removeCampaign action should call the deleteCampaign API and commit removeCampaign mutation", async () => {
      const spy = vi.spyOn(campaignApi, "deleteCampaign")
      // @ts-ignore
      await actions.removeCampaign({ commit }, campaign);
      expect(spy).toHaveBeenCalledWith(campaign);
      expect(commit).toHaveBeenCalledWith("removeCampaign", campaign);
    });
  });
});
