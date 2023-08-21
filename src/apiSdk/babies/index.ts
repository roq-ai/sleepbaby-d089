import axios from 'axios';
import queryString from 'query-string';
import { BabyInterface, BabyGetQueryInterface } from 'interfaces/baby';
import { GetQueryInterface, PaginatedInterface } from '../../interfaces';

export const getBabies = async (query?: BabyGetQueryInterface): Promise<PaginatedInterface<BabyInterface>> => {
  const response = await axios.get('/api/babies', {
    params: query,
    headers: { 'Content-Type': 'application/json' },
  });
  return response.data;
};

export const createBaby = async (baby: BabyInterface) => {
  const response = await axios.post('/api/babies', baby);
  return response.data;
};

export const updateBabyById = async (id: string, baby: BabyInterface) => {
  const response = await axios.put(`/api/babies/${id}`, baby);
  return response.data;
};

export const getBabyById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/babies/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteBabyById = async (id: string) => {
  const response = await axios.delete(`/api/babies/${id}`);
  return response.data;
};
