import { ServiceCategory } from "./service-category.interface";
import { WeekDay } from "./week-day.interface";

export interface Provider {
  firstName?: string;
  lastName?: string;
  providerId?: number;
  email?: string;
  companyName?: string;
  phoneNumber?: string;
  description?: string;
  address?: string;
  availableDays?: WeekDay[];
  category?: ServiceCategory[];
  workHours?: ProviderProfileDetailsWorkHour[];
  clientProviderId?: number;
  providerUserId?: number;
  newMessageCount?: number;
}

export interface ProviderProfileDetailsWorkHour {
  toWorkHourId?: number;
  fromWorkHourId?: number;
}
