// src/services/api.ts
import axios from 'axios';
import { fixtures } from '../fixtures/data';

const API_URL = process.env.REACT_APP_API_URL;
const USE_FIXTURES = !API_URL || process.env.REACT_APP_USE_FIXTURES === 'true';

interface DataFrameMetadata {
  df_name: string;
  total_rows: number;
  created_at: string;
  metadata?: {
    chunks: Array<{
      name: string;
      size: string;
      lastModified: string;
      rows: number;
    }>;
  };
}

export const api = {
  async getDataFrames(): Promise<DataFrameMetadata[]> {
    if (USE_FIXTURES) {
      console.log('Using fixtures for getDataFrames');
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(fixtures.dataFrames);
        }, 500); // Simulate network delay
      });
    }

    try {
      const response = await axios.get(`${API_URL}/dataframes`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('userToken')}`
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching dataframes, falling back to fixtures:', error);
      return fixtures.dataFrames;
    }
  },

  async getDataFrame(name: string, params?: { external_key?: string; use_last?: boolean }) {
    if (USE_FIXTURES) {
      console.log('Using fixtures for getDataFrame');
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(fixtures.sampleData[name as keyof typeof fixtures.sampleData]);
        }, 500);
      });
    }

    try {
      const response = await axios.get(`${API_URL}/dataframes/${name}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('userToken')}`
        },
        params
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching dataframe, falling back to fixtures:', error);
      return fixtures.sampleData[name as keyof typeof fixtures.sampleData];
    }
  },

  async uploadDataFrame(data: {
    dataframe: any[];
    dataframe_name: string;
    columns_keys?: Record<string, string>;
    external_key?: string;
    keep_last?: boolean;
  }) {
    if (USE_FIXTURES) {
      console.log('Using fixtures for uploadDataFrame');
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({ success: true, message: 'Upload simulated with fixtures' });
        }, 500);
      });
    }

    try {
      const response = await axios.post(`${API_URL}/dataframes`, data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('userToken')}`
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error uploading dataframe:', error);
      throw error;
    }
  }
};
