import axios from 'axios';
import queryString from 'query-string';
import { SweetspotInterface, SweetspotGetQueryInterface } from 'interfaces/sweetspot';
import { GetQueryInterface, PaginatedInterface } from '../../interfaces';

export const getSweetspots = async (
  query?: SweetspotGetQueryInterface,
): Promise<PaginatedInterface<SweetspotInterface>> => {
  const response = await axios.get('/api/sweetspots', {
    params: query,
    headers: { 'Content-Type': 'application/json' },
  });
  return response.data;
};

export const createSweetspot = async (sweetspot: SweetspotInterface) => {
  const response = await axios.post('/api/sweetspots', sweetspot);
  return response.data;
};

export const updateSweetspotById = async (id: string, sweetspot: SweetspotInterface) => {
  const response = await axios.put(`/api/sweetspots/${id}`, sweetspot);
  return response.data;
};

export const getSweetspotById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/sweetspots/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteSweetspotById = async (id: string) => {
  const response = await axios.delete(`/api/sweetspots/${id}`);
  return response.data;
};
