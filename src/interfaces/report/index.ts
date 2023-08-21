import { BabyInterface } from 'interfaces/baby';
import { GetQueryInterface } from 'interfaces';

export interface ReportInterface {
  id?: string;
  daily_report?: number;
  weekly_report?: number;
  monthly_report?: number;
  baby_id: string;
  created_at?: any;
  updated_at?: any;

  baby?: BabyInterface;
  _count?: {};
}

export interface ReportGetQueryInterface extends GetQueryInterface {
  id?: string;
  baby_id?: string;
}
