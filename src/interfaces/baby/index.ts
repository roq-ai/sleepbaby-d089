import { ReportInterface } from 'interfaces/report';
import { SleepScheduleInterface } from 'interfaces/sleep-schedule';
import { SweetspotInterface } from 'interfaces/sweetspot';
import { OrganizationInterface } from 'interfaces/organization';
import { GetQueryInterface } from 'interfaces';

export interface BabyInterface {
  id?: string;
  name: string;
  age: number;
  nap_times?: number;
  organization_id: string;
  created_at?: any;
  updated_at?: any;
  report?: ReportInterface[];
  sleep_schedule?: SleepScheduleInterface[];
  sweetspot?: SweetspotInterface[];
  organization?: OrganizationInterface;
  _count?: {
    report?: number;
    sleep_schedule?: number;
    sweetspot?: number;
  };
}

export interface BabyGetQueryInterface extends GetQueryInterface {
  id?: string;
  name?: string;
  organization_id?: string;
}
