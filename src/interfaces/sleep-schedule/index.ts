import { BabyInterface } from 'interfaces/baby';
import { GetQueryInterface } from 'interfaces';

export interface SleepScheduleInterface {
  id?: string;
  start_time: any;
  end_time: any;
  sleep_hours?: number;
  baby_id: string;
  created_at?: any;
  updated_at?: any;

  baby?: BabyInterface;
  _count?: {};
}

export interface SleepScheduleGetQueryInterface extends GetQueryInterface {
  id?: string;
  baby_id?: string;
}
