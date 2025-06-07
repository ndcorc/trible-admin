export interface CampaignBasics {
  name: string;
  objective: string;
  campaignType: "automated" | "custom";
  rewardType: string;
  rewardTrigger: string;
}

export interface CampaignMessage {
  title: string;
  message: string;
}

export interface CampaignTargetingData {
  audience: "all" | "inactive" | "returning" | "vip";
  deliveryMethods: {
    pushNotification: boolean;
    inAppNotification: boolean;
    email: boolean;
  };
  timing: {
    type: "immediate" | "delayed";
    delayTime?: string;
  };
  deliveryWindow: {
    enabled: boolean;
    days: string[];
  };
}

export interface CampaignTargetingStepProps {
  data: CampaignTargetingData;
  onDataChange: (data: CampaignTargetingData) => void;
  onNext: () => void;
  onBack: () => void;
}

export interface CampaignSchedule {
  startDate: string;
  endDate: string;
}

export interface CampaignData {
  basics: CampaignBasics;
  message: CampaignMessage;
  targeting: CampaignTargetingData;
  schedule: CampaignSchedule;
  reviewed: boolean;
}

export type CampaignStep = "basics" | "message" | "targeting" | "review";
