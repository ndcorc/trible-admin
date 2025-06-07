import { create } from "zustand";
import { devtools } from "zustand/middleware";
import type { CampaignData, CampaignStep } from "../types/campaign.types";

interface CampaignState {
  isCreateModalOpen: boolean;
  currentStep: CampaignStep;
  campaignData: CampaignData;
  loading: boolean;
  error: string | null;
}

interface CampaignActions {
  openCreateModal: () => void;
  closeCreateModal: () => void;
  setCurrentStep: (step: CampaignStep) => void;
  updateCampaignData: (data: Partial<CampaignData>) => void;
  createCampaign: (data: CampaignData) => Promise<void>;
  resetCampaignData: () => void;
  clearError: () => void;
}

type CampaignStore = CampaignState & CampaignActions;

// Default campaign data
const defaultCampaignData: CampaignData = {
  basics: {
    name: "",
    objective: "",
    campaignType: "automated",
    rewardType: "",
    rewardTrigger: "",
  },
  message: {
    title: "",
    message: "",
  },
  targeting: {
    audience: "all",
    deliveryMethods: {
      pushNotification: true,
      inAppNotification: true,
      email: false,
    },
    timing: {
      type: "immediate",
    },
    deliveryWindow: {
      enabled: false,
      days: [],
    },
  },
  schedule: {
    startDate: "",
    endDate: "",
  },
  reviewed: false,
};

// Mock campaign service - replace with actual Firebase calls
const campaignService = {
  async createCampaign(data: CampaignData): Promise<void> {
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log("Campaign created:", data);
        resolve();
      }, 1000);
    });
  },
};

export const useCampaignStore = create<CampaignStore>()(
  devtools(
    (set, get) => ({
      // State
      isCreateModalOpen: false,
      currentStep: "basics",
      campaignData: defaultCampaignData,
      loading: false,
      error: null,

      // Actions
      openCreateModal: () =>
        set({
          isCreateModalOpen: true,
          currentStep: "basics",
          campaignData: defaultCampaignData,
          error: null,
        }),

      closeCreateModal: () =>
        set({
          isCreateModalOpen: false,
          currentStep: "basics",
          campaignData: defaultCampaignData,
          error: null,
        }),

      setCurrentStep: (step: CampaignStep) => set({ currentStep: step }),

      updateCampaignData: (data: Partial<CampaignData>) =>
        set((state) => ({
          campaignData: { ...state.campaignData, ...data },
        })),

      resetCampaignData: () => set({ campaignData: defaultCampaignData }),

      createCampaign: async (data: CampaignData) => {
        set({ loading: true, error: null });
        try {
          await campaignService.createCampaign(data);
          set({
            loading: false,
            isCreateModalOpen: false,
            currentStep: "basics",
            campaignData: defaultCampaignData,
          });
        } catch (error) {
          set({
            error:
              error instanceof Error
                ? error.message
                : "Failed to create campaign",
            loading: false,
          });
          throw error;
        }
      },

      clearError: () => set({ error: null }),
    }),
    { name: "campaign-store" }
  )
);
