// src/pages/DBView.tsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FileSpreadsheet, ArrowLeft } from 'lucide-react';
import { api } from '../services/api';
import APIStatusIndicator from '../components/APIStatusIndicator';

interface DataFrame {
  data: any[];
  metadata: {
    total_rows: number;
    chunks: Array<{
      path: string;
      rows: number;
      number: number;
    }>;
  };
}

const DBView: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [dataFrame, setDataFrame] = useState<DataFrame | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isUsingFixtures, setIsUsingFixtures] = useState(false);

  useEffect(() => {
    const fetchDataFrame = async () => {
      if (!id) return;
      
      try {
        const data = await api.getDataFrame(id, { use_last: true });
        setDataFrame(data);
        setIsUsingFixtures(!process.env.REACT_APP_API_URL || process.env.REACT_APP_USE_FIXTURES === 'true');
      } catch (err) {
        setError('Failed to fetch dataframe');
        setIsUsingFixtures(true);
      } finally {
        setLoading(false);
      }
    };

    fetchDataFrame();
  }, [id]);

  const handleDownload = async (format: 'csv' | 'json') => {
    if (!dataFrame || !id) return;

    const content = format === 'csv' 
      ? convertToCSV(dataFrame.data)
      : JSON.stringify(dataFrame.data, null, 2);
    
    const type = format === 'csv' ? 'text/csv' : 'application/json';
    const extension = format === 'csv' ? 'csv' : 'json';
    
    const blob = new Blob([content], { type });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${id}.${extension}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  const convertToCSV = (data: any[]) => {
    if (data.length === 0) return '';
    
    const headers = Object.keys(data[0]);
    const rows = data.map(row => 
      headers.map(header => {
        const value = row[header];
        return typeof value === 'string' && value.includes(',') 
          ? `"${value}"`
          : value;
      }).join(',')
    );
    
    return [headers.join(','), ...rows].join('\n');
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center text-gray-400">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-red-500">{error}</div>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center space-x-4">
        <button
          onClick={() => navigate('/dbs')}
          className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to DBs</span>
        </button>
        <h1 className="text-2xl font-bold">{id}</h1>
      </div>

      {dataFrame && (
        <div className="space-y-6">
          <div className="bg-gray-800 rounded-lg p-6">
            <h2 className="text-lg font-medium mb-4">DataFrame Info</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-gray-400">Total Rows</p>
                <p className="text-xl font-medium">
                  {dataFrame.metadata.total_rows.toLocaleString()}
                </p>
              </div>
              <div>
                <p className="text-gray-400">Chunks</p>
                <p className="text-xl font-medium">
                  {dataFrame.metadata.chunks.length}
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-4">
            <button
              onClick={() => handleDownload('csv')}
              className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
            >
              <FileSpreadsheet className="w-5 h-5" />
              <span>Download CSV</span>
            </button>
            <button
              onClick={() => handleDownload('json')}
              className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
            >
              <FileSpreadsheet className="w-5 h-5" />
              <span>Download JSON</span>
            </button>
          </div>

          {/* Preview table */}
          <div className="bg-gray-800 rounded-lg overflow-hidden">
            <div className="p-4 border-b border-gray-700">
              <h3 className="font-medium">Data Preview</h3>
              <p className="text-sm text-gray-400">Showing first 10 rows</p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-900">
                    {dataFrame.data[0] && Object.keys(dataFrame.data[0]).map(header => (
                      <th key={header} className="px-4 py-3 text-left text-sm font-medium text-gray-300">
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {dataFrame.data.slice(0, 10).map((row, i) => (
                    <tr key={i} className="border-t border-gray-700 hover:bg-gray-750">
                      {Object.values(row).map((value: any, j) => (
                        <td key={j} className="px-4 py-3 text-sm">
                          {typeof value === 'object' ? JSON.stringify(value) : value}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
      
      <APIStatusIndicator isUsingFixtures={isUsingFixtures} />
    </div>
  );
};

export default DBView;
