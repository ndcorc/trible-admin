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

export interface CampaignMessageStepProps {
  data: CampaignMessage;
  onDataChange: (data: CampaignMessage) => void;
  onNext: () => void;
  onBack: () => void;
  campaignType?: string;
}

export interface PhonePreviewProps {
  title: string;
  message: string;
  businessName?: string;
}

export interface CampaignTargeting {
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

export interface CampaignSchedule {
  startDate: string;
  endDate: string;
}

export interface CampaignData {
  basics: CampaignBasics;
  message: CampaignMessage;
  targeting: CampaignTargeting;
  schedule: CampaignSchedule;
  reviewed: boolean;
}

export interface CampaignModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export type CampaignStep = "basics" | "message" | "targeting" | "review";
