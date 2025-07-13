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

// Improved validation schema
export const userPreferencesSchema = z.object({
  strengthPreference: z.enum(['light', 'medium', 'strong']),
  defaultCupSize: z.coerce
    .number()
    .min(50, 'Cup size must be at least 50ml')
    .max(1000, 'Cup size cannot exceed 1000ml'),
  notificationsBrewed: z.boolean(),
  notificationsMaintenance: z.boolean(),
  notificationsErrors: z.boolean(),
  notificationMethod: z.enum(['email', 'sms', 'push', 'none']),
  smsPhoneNumber: z
    .string()
    .regex(/^\+[1-9]\d{1,14}$/, 'Phone number must be in E.164 format (e.g., +1234567890)')
    .optional()
    .or(z.literal('')),
  allowIntegrations: z.boolean(),
  cloudControlAccess: z.boolean(),
  theme: z.enum(['light', 'dark', 'auto']),
  autoBrewSchedule: z
    .string()
    .refine((val) => {
      if (!val || val.trim() === '') return true;
      try {
        const parsed = JSON.parse(val);
        // Basic validation for the expected structure
        return (
          typeof parsed === 'object' &&
          typeof parsed.enabled === 'boolean' &&
          typeof parsed.time === 'string' &&
          Array.isArray(parsed.days)
        );
      } catch {
        return false;
      }
    }, 'Auto brew schedule must be valid JSON with enabled, time, and days fields')
    .optional()
    .or(z.literal('')),
  units: z.enum(['metric', 'imperial']),
  shareRecipes: z.boolean(),
  language: z.enum(['en', 'es', 'fr', 'de']),
  timezone: z
    .string()
    .regex(/^[A-Za-z_]+\/[A-Za-z_]+$/, 'Timezone must be in IANA format (e.g., America/New_York)')
    .min(1, 'Timezone is required'),
});

export type UserPreferencesForm = z.infer<typeof userPreferencesSchema>;

// Type for create mutation (requires all fields)
export type CreateUserPreferencesInput = UserPreferencesForm;

// Type for update mutation (allows partial updates but with proper typing)
export type UpdateUserPreferencesInput = Partial<UserPreferencesForm>;

// Auto brew schedule type for easier handling
export interface AutoBrewSchedule {
  enabled: boolean;
  time: string; // HH:MM format
  days: string[]; // Array of day names
}

// Helper function to safely parse auto brew schedule
export const parseAutoBrewSchedule = (schedule: string): AutoBrewSchedule | null => {
  try {
    if (!schedule || schedule.trim() === '') return null;
    const parsed = JSON.parse(schedule);
    if (
      typeof parsed === 'object' &&
      typeof parsed.enabled === 'boolean' &&
      typeof parsed.time === 'string' &&
      Array.isArray(parsed.days)
    ) {
      return parsed as AutoBrewSchedule;
    }
    return null;
  } catch {
    return null;
  }
};
