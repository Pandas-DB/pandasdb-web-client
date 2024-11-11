import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FileSpreadsheet, ArrowLeft } from 'lucide-react';

interface DataFile {
  id: string;
  name: string;
  size: string;
  lastModified: string;
}

const DBView = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const getDBFiles = (dbId: string): { name: string; files: DataFile[] } => {
    if (dbId === '550e8400-e29b-41d4-a716-446655440000') {
      return {
        name: 'Orders',
        files: [
          {
            id: '1',
            name: 'Month to date orders',
            size: '2.3MB',
            lastModified: '2024-03-15',
          },
          {
            id: '2',
            name: 'Daily orders',
            size: '1.1MB',
            lastModified: '2024-03-15',
          },
          {
            id: '3',
            name: 'Customer 123 Orders',
            size: '856KB',
            lastModified: '2024-03-15',
          },
        ],
      };
    }
    return {
      name: 'Products',
      files: [],
    };
  };

  const db = getDBFiles(id || '');

  const handleDownload = (name: string) => {
    const csvContent = `timestamp,order_id,customer,amount
${new Date().toISOString()},ORD-001,Customer A,150.00
${new Date().toISOString()},ORD-002,Customer B,275.50
${new Date().toISOString()},ORD-003,Customer C,89.99`;

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${name.toLowerCase().replace(/\s+/g, '_')}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <button
          onClick={() => navigate('/dbs')}
          className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to DBs</span>
        </button>
        <h1 className="text-2xl font-bold">{db.name}</h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {db.files.map((file) => (
          <button
            key={file.id}
            onClick={() => handleDownload(file.name)}
            className="bg-gray-800 rounded-lg p-4 hover:bg-gray-700 transition-colors text-left w-full"
          >
            <div className="flex items-center space-x-3">
              <FileSpreadsheet className="w-6 h-6 text-blue-500 flex-shrink-0" />
              <div>
                <h3 className="font-medium">{file.name}</h3>
                <div className="flex items-center space-x-2 mt-1">
                  <span className="text-sm text-gray-400">{file.size}</span>
                  <span className="text-gray-500">•</span>
                  <span className="text-sm text-gray-400">
                    {new Date(file.lastModified).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default DBView;