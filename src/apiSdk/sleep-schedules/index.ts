import axios from 'axios';
import queryString from 'query-string';
import { SleepScheduleInterface, SleepScheduleGetQueryInterface } from 'interfaces/sleep-schedule';
import { GetQueryInterface, PaginatedInterface } from '../../interfaces';

export const getSleepSchedules = async (
  query?: SleepScheduleGetQueryInterface,
): Promise<PaginatedInterface<SleepScheduleInterface>> => {
  const response = await axios.get('/api/sleep-schedules', {
    params: query,
    headers: { 'Content-Type': 'application/json' },
  });
  return response.data;
};

export const createSleepSchedule = async (sleepSchedule: SleepScheduleInterface) => {
  const response = await axios.post('/api/sleep-schedules', sleepSchedule);
  return response.data;
};

export const updateSleepScheduleById = async (id: string, sleepSchedule: SleepScheduleInterface) => {
  const response = await axios.put(`/api/sleep-schedules/${id}`, sleepSchedule);
  return response.data;
};

export const getSleepScheduleById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/sleep-schedules/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteSleepScheduleById = async (id: string) => {
  const response = await axios.delete(`/api/sleep-schedules/${id}`);
  return response.data;
};
