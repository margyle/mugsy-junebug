import { useEffect, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Separator } from '@/components/ui/separator';
import { Loader2, Save } from 'lucide-react';
import {
  useGetUserPreferences,
  useCreateUserPreferences,
  useUpdateUserPreferences,
} from '../user-preferences.hooks';
import {
  userPreferencesSchema,
  type UserPreferencesForm,
  type CreateUserPreferencesInput,
  type UpdateUserPreferencesInput,
} from '../user-preferences.types';

const getUserTimezone = (): string => {
  try {
    return Intl.DateTimeFormat().resolvedOptions().timeZone;
  } catch {
    return 'America/New_York'; // Fallback
  }
};

// Default form values for new users
const getDefaultFormValues = (): UserPreferencesForm => ({
  strengthPreference: 'medium',
  defaultCupSize: 300,
  notificationsBrewed: true,
  notificationsMaintenance: true,
  notificationsErrors: true,
  notificationMethod: 'email',
  smsPhoneNumber: '',
  allowIntegrations: false,
  cloudControlAccess: false,
  theme: 'auto',
  autoBrewSchedule: '',
  units: 'metric',
  shareRecipes: true,
  language: 'en',
  timezone: getUserTimezone(),
});

const mapPreferencesToFormData = (preferences: UserPreferencesForm): UserPreferencesForm => ({
  strengthPreference: preferences.strengthPreference,
  defaultCupSize: preferences.defaultCupSize,
  notificationsBrewed: preferences.notificationsBrewed,
  notificationsMaintenance: preferences.notificationsMaintenance,
  notificationsErrors: preferences.notificationsErrors,
  notificationMethod: preferences.notificationMethod,
  smsPhoneNumber: preferences.smsPhoneNumber || '',
  allowIntegrations: preferences.allowIntegrations,
  cloudControlAccess: preferences.cloudControlAccess,
  theme: preferences.theme,
  autoBrewSchedule: preferences.autoBrewSchedule || '',
  units: preferences.units,
  shareRecipes: preferences.shareRecipes,
  language: preferences.language,
  timezone: preferences.timezone,
});

export function UserPreferencesForm() {
  const { data: preferences, isLoading, error, isSuccess } = useGetUserPreferences();
  const createMutation = useCreateUserPreferences();
  const updateMutation = useUpdateUserPreferences();

  const form = useForm<UserPreferencesForm>({
    resolver: zodResolver(userPreferencesSchema),
    defaultValues: getDefaultFormValues(),
  });

  // Memoized form reset logic
  const resetForm = useCallback(
    (preferencesData?: UserPreferencesForm) => {
      if (preferencesData) {
        const formData = mapPreferencesToFormData(preferencesData);
        form.reset(formData);
      } else {
        form.reset(getDefaultFormValues());
      }
    },
    [form]
  );

  // Reset form when preferences data loads
  useEffect(() => {
    if (isSuccess) {
      resetForm(preferences as UserPreferencesForm);
    }
  }, [isSuccess, preferences, resetForm]);

  const onSubmit = (data: UserPreferencesForm) => {
    const baseCleanedData = {
      ...data,
      smsPhoneNumber: data.smsPhoneNumber?.trim() || undefined,
      autoBrewSchedule: data.autoBrewSchedule?.trim() || undefined,
    };

    if (preferences) {
      const updateData: UpdateUserPreferencesInput = baseCleanedData;
      updateMutation.mutate(updateData);
    } else {
      const createData: CreateUserPreferencesInput = {
        ...baseCleanedData,
        smsPhoneNumber: baseCleanedData.smsPhoneNumber || '',
        autoBrewSchedule: baseCleanedData.autoBrewSchedule || '',
      };
      createMutation.mutate(createData);
    }
  };

  const isSubmitting = createMutation.isPending || updateMutation.isPending;

  if (isLoading) {
    return (
      <div
        className="flex items-center justify-center py-8"
        role="status"
        aria-label="Loading preferences"
      >
        <Loader2 className="h-6 w-6 animate-spin" aria-hidden="true" />
        <span className="ml-2">Loading preferences...</span>
      </div>
    );
  }

  if (error) {
    void error;
    console.error('Error loading preferences');
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold">User Preferences</h1>
        <p className="text-muted-foreground">
          Customize your coffee brewing experience and app settings.
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Coffee Preferences */}
          <Card>
            <CardHeader>
              <CardTitle>Coffee Preferences</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name="strengthPreference"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Strength Preference</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger aria-label="Select coffee strength preference">
                          <SelectValue placeholder="Select strength" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="light">Light</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="strong">Strong</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormDescription>Your preferred coffee strength.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="defaultCupSize"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Default Cup Size (ml)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min={50}
                        max={1000}
                        aria-describedby="cup-size-description"
                        {...field}
                        onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                      />
                    </FormControl>
                    <FormDescription id="cup-size-description">
                      Default cup size in milliliters (50-1000).
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="autoBrewSchedule"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Auto Brew Schedule (Optional)</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder={`{"enabled": true, "time": "07:00", "days": ["monday", "tuesday", "wednesday", "thursday", "friday"]}`}
                        aria-describedby="auto-brew-description"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription id="auto-brew-description">
                      JSON configuration for automatic brewing schedule. Leave empty to disable.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          {/* Notification Preferences */}
          <Card>
            <CardHeader>
              <CardTitle>Notifications</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name="notificationMethod"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Notification Method</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger aria-label="Select notification method">
                          <SelectValue placeholder="Select method" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="email">Email</SelectItem>
                        <SelectItem value="sms">SMS</SelectItem>
                        <SelectItem value="push">Push Notifications</SelectItem>
                        <SelectItem value="none">None</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormDescription>How you&apos;d like to receive notifications.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="smsPhoneNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>SMS Phone Number (Optional)</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="+1234567890"
                        aria-describedby="phone-description"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription id="phone-description">
                      Phone number for SMS notifications (E.164 format).
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <FormField
                  control={form.control}
                  name="notificationsBrewed"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                      <div className="space-y-0.5">
                        <FormLabel>Brew Complete</FormLabel>
                        <FormDescription className="text-xs">When coffee is ready</FormDescription>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          aria-label="Enable brew complete notifications"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="notificationsMaintenance"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                      <div className="space-y-0.5">
                        <FormLabel>Maintenance</FormLabel>
                        <FormDescription className="text-xs">Cleaning reminders</FormDescription>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          aria-label="Enable maintenance notifications"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="notificationsErrors"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                      <div className="space-y-0.5">
                        <FormLabel>Errors</FormLabel>
                        <FormDescription className="text-xs">System issues</FormDescription>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          aria-label="Enable error notifications"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
          </Card>

          {/* App Preferences */}
          <Card>
            <CardHeader>
              <CardTitle>App Preferences</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="theme"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Theme</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger aria-label="Select theme preference">
                            <SelectValue placeholder="Select theme" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="light">Light</SelectItem>
                          <SelectItem value="dark">Dark</SelectItem>
                          <SelectItem value="auto">Auto</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormDescription>UI theme preference.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="units"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Units</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger aria-label="Select units preference">
                            <SelectValue placeholder="Select units" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="metric">Metric</SelectItem>
                          <SelectItem value="imperial">Imperial</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormDescription>Measurement units preference.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="language"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Language</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger aria-label="Select language preference">
                            <SelectValue placeholder="Select language" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="en">English</SelectItem>
                          <SelectItem value="es">Spanish</SelectItem>
                          <SelectItem value="fr">French</SelectItem>
                          <SelectItem value="de">German</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormDescription>Preferred language.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="timezone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Timezone</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="America/New_York"
                          aria-describedby="timezone-description"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription id="timezone-description">
                        IANA timezone name (e.g., America/New_York, Europe/London).
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <Separator />

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <FormField
                  control={form.control}
                  name="allowIntegrations"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                      <div className="space-y-0.5">
                        <FormLabel>Integrations</FormLabel>
                        <FormDescription className="text-xs">
                          Allow third-party apps
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          aria-label="Allow third-party integrations"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="cloudControlAccess"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                      <div className="space-y-0.5">
                        <FormLabel>Cloud Control</FormLabel>
                        <FormDescription className="text-xs">Remote access</FormDescription>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          aria-label="Enable cloud control access"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="shareRecipes"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                      <div className="space-y-0.5">
                        <FormLabel>Share Recipes</FormLabel>
                        <FormDescription className="text-xs">Make recipes public</FormDescription>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          aria-label="Allow recipe sharing"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
          </Card>

          {/* Submit Button */}
          <div className="flex justify-end">
            <Button type="submit" disabled={isSubmitting} className="min-w-32">
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" aria-hidden="true" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4 mr-2" aria-hidden="true" />
                  Save Preferences
                </>
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
