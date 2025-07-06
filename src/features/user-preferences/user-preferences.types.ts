import { z } from 'zod';

export interface UserPreferences {
  id: string;
  userId: string;
  strengthPreference: 'light' | 'medium' | 'strong';
  defaultCupSize: number; // 50-1000
  notificationsBrewed: boolean;
  notificationsMaintenance: boolean;
  notificationsErrors: boolean;
  notificationMethod: 'email' | 'sms' | 'push' | 'none';
  smsPhoneNumber?: string;
  allowIntegrations: boolean;
  cloudControlAccess: boolean;
  theme: 'light' | 'dark' | 'auto';
  autoBrewSchedule?: string; // JSON string
  units: 'metric' | 'imperial';
  shareRecipes: boolean;
  language: 'en' | 'es' | 'fr' | 'de';
  timezone: string; // IANA timezone
  createdAt: string; // ISO 8601
  updatedAt: string; // ISO 8601
}

export const userPreferencesSchema = z.object({
  strengthPreference: z.enum(['light', 'medium', 'strong']),
  defaultCupSize: z.coerce.number().min(50).max(1000),
  notificationsBrewed: z.boolean(),
  notificationsMaintenance: z.boolean(),
  notificationsErrors: z.boolean(),
  notificationMethod: z.enum(['email', 'sms', 'push', 'none']),
  smsPhoneNumber: z
    .string()
    .regex(/^\+?[1-9]\d{1,14}$/)
    .optional()
    .or(z.literal('')),
  allowIntegrations: z.boolean(),
  cloudControlAccess: z.boolean(),
  theme: z.enum(['light', 'dark', 'auto']),
  autoBrewSchedule: z.string().optional().or(z.literal('')),
  units: z.enum(['metric', 'imperial']),
  shareRecipes: z.boolean(),
  language: z.enum(['en', 'es', 'fr', 'de']),
  timezone: z
    .string()
    .regex(/^[A-Za-z_]+\/[A-Za-z_]+$/, 'Timezone must be in IANA format (e.g., America/New_York)'),
});

export type UserPreferencesForm = z.infer<typeof userPreferencesSchema>;

// Auto brew schedule type for easier handling
export interface AutoBrewSchedule {
  enabled: boolean;
  time: string; // HH:MM format
  days: string[]; // Array of day names
}
