import { BabyInterface } from 'interfaces/baby';
import { GetQueryInterface } from 'interfaces';

export interface SweetspotInterface {
  id?: string;
  ideal_sleep_window?: any;
  ideal_nap_time?: any;
  ideal_night_sleep_time?: any;
  baby_id: string;
  created_at?: any;
  updated_at?: any;

  baby?: BabyInterface;
  _count?: {};
}

export interface SweetspotGetQueryInterface extends GetQueryInterface {
  id?: string;
  baby_id?: string;
}
