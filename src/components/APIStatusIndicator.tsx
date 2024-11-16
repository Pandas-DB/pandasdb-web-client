import React from 'react';
import { CloudOff, Cloud } from 'lucide-react';

const APIStatusIndicator = ({ isUsingFixtures }: { isUsingFixtures: boolean }) => {
  return (
    <div className="fixed bottom-4 right-4 flex items-center space-x-2 bg-gray-800 text-sm rounded-full px-3 py-1.5 text-gray-300">
      {isUsingFixtures ? (
        <>
          <CloudOff className="w-4 h-4 text-yellow-500" />
          <span>Using Local Data</span>
        </>
      ) : (
        <>
          <Cloud className="w-4 h-4 text-green-500" />
          <span>Live API</span>
        </>
      )}
    </div>
  );
};

export default APIStatusIndicator;
