// src/components/DBs.tsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Database } from 'lucide-react';
import { api } from '../services/api';
import APIStatusIndicator from './APIStatusIndicator';

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

const DBs: React.FC = () => {
  const navigate = useNavigate();
  const [dataFrames, setDataFrames] = useState<DataFrameMetadata[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isUsingFixtures, setIsUsingFixtures] = useState(false);

  useEffect(() => {
    const fetchDataFrames = async () => {
      try {
        const data = await api.getDataFrames();
        setDataFrames(data);
        setIsUsingFixtures(!process.env.REACT_APP_API_URL || process.env.REACT_APP_USE_FIXTURES === 'true');
      } catch (err) {
        setError('Failed to fetch databases');
        setIsUsingFixtures(true);
      } finally {
        setLoading(false);
      }
    };

    fetchDataFrames();
  }, []);

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">DBs</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {dataFrames.map((df) => (
          <button
            key={df.df_name}
            onClick={() => navigate(`/dbs/${df.df_name}`)}
            className="bg-gray-800 rounded-lg p-4 hover:bg-gray-700 transition-colors text-left w-full"
          >
            <div className="flex items-center space-x-3">
              <Database className="w-6 h-6 text-blue-500 flex-shrink-0" />
              <div>
                <h3 className="font-medium">{df.df_name}</h3>
                <p className="text-sm text-gray-400">
                  {df.total_rows.toLocaleString()} rows
                </p>
                <p className="text-xs text-gray-500">
                  Last updated: {new Date(df.created_at).toLocaleDateString()}
                </p>
                {df.metadata?.chunks && (
                  <p className="text-xs text-gray-500">
                    {df.metadata.chunks.length} chunks
                  </p>
                )}
              </div>
            </div>
          </button>
        ))}
      </div>
      <APIStatusIndicator isUsingFixtures={isUsingFixtures} />
    </div>
  );
};

export default DBs;
