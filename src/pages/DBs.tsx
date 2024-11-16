// import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Database } from 'lucide-react';

interface DB {
  id: string;
  name: string;
  items?: number;
}

const DBs = () => {
  const navigate = useNavigate();

  const dbs: DB[] = [
    { id: '550e8400-e29b-41d4-a716-446655440000', name: 'Orders' },
    { id: '6ba7b810-9dad-11d1-80b4-00c04fd430c8', name: 'Products' },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">DBs</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {dbs.map((db) => (
          <button
            key={db.id}
            onClick={() => navigate(`/dbs/${db.id}`)}
            className="bg-gray-800 rounded-lg p-4 hover:bg-gray-700 transition-colors text-left w-full"
          >
            <div className="flex items-center space-x-3">
              <Database className="w-6 h-6 text-blue-500 flex-shrink-0" />
              <div>
                <h3 className="font-medium">{db.name}</h3>
                {db.items !== undefined && (
                  <p className="text-sm text-gray-400">{db.items} items</p>
                )}
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default DBs;
