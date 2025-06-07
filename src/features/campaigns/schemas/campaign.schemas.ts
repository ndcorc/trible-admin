import { z } from "zod";

// Campaign Basics Schema
export const campaignBasicsSchema = z.object({
  name: z
    .string()
    .min(1, "Campaign name is required")
    .max(100, "Campaign name must be less than 100 characters"),
  objective: z.string().min(1, "Objective is required"),
  campaignType: z.enum(["automated", "custom"]),
  rewardType: z.string().min(1, "Reward type is required"),
  rewardTrigger: z.string().min(1, "Reward trigger is required"),
});

// Campaign Message Schema
export const campaignMessageSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .max(100, "Title must be less than 100 characters"),
  message: z
    .string()
    .min(1, "Message is required")
    .max(300, "Message must be less than 300 characters"),
});

// Campaign Targeting Schema
export const campaignTargetingSchema = z.object({
  audience: z.enum(["all", "inactive", "returning", "vip"]),
  deliveryMethods: z
    .object({
      pushNotification: z.boolean(),
      inAppNotification: z.boolean(),
      email: z.boolean(),
    })
    .refine(
      (methods) => Object.values(methods).some(Boolean),
      "At least one delivery method must be selected"
    ),
  timing: z.object({
    type: z.enum(["immediate", "delayed"]),
    delayTime: z.string().optional(),
  }),
  deliveryWindow: z
    .object({
      enabled: z.boolean(),
      days: z.array(z.string()),
    })
    .refine(
      (window) => !window.enabled || window.days.length > 0,
      "At least one day must be selected when delivery window is enabled"
    ),
});

// Campaign Schedule Schema
export const campaignScheduleSchema = z
  .object({
    startDate: z.string().min(1, "Start date is required"),
    endDate: z.string().min(1, "End date is required"),
  })
  .refine(
    (data) => new Date(data.endDate) > new Date(data.startDate),
    "End date must be after start date"
  );

// Complete Campaign Schema
export const campaignSchema = z.object({
  basics: campaignBasicsSchema,
  message: campaignMessageSchema,
  targeting: campaignTargetingSchema,
  schedule: campaignScheduleSchema,
  reviewed: z.boolean(),
});

// Type exports
export type CampaignBasicsFormData = z.infer<typeof campaignBasicsSchema>;
export type CampaignMessageFormData = z.infer<typeof campaignMessageSchema>;
export type CampaignTargetingFormData = z.infer<typeof campaignTargetingSchema>;
export type CampaignScheduleFormData = z.infer<typeof campaignScheduleSchema>;
export type CampaignFormData = z.infer<typeof campaignSchema>;
