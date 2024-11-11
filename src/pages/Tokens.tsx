import React, { useState, useEffect } from 'react';
import { Eye, EyeOff, Copy, Check, Key } from 'lucide-react';

const Tokens = () => {
  const [showToken, setShowToken] = useState(false);
  const [copied, setCopied] = useState(false);
  const [timer, setTimer] = useState<number | null>(null);
  
  const cognitoToken = "d290f1ee-6c54-4b01-90e6-d701748f0851"; // Example token

  useEffect(() => {
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [timer]);

  const handleShowToken = () => {
    setShowToken(true);
    if (timer) clearTimeout(timer);
    const newTimer = window.setTimeout(() => {
      setShowToken(false);
    }, 30000);
    setTimer(newTimer);
  };

  const handleCopyToken = async () => {
    try {
      await navigator.clipboard.writeText(cognitoToken);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy token');
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Security Tokens</h1>

      <div className="bg-gray-800 rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <Key className="w-5 h-5 text-blue-500" />
            <h3 className="text-lg font-medium">Cognito ID</h3>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={handleCopyToken}
              className="p-2 rounded-lg hover:bg-gray-700 transition-colors"
              title="Copy token"
            >
              {copied ? (
                <Check className="w-5 h-5 text-green-500" />
              ) : (
                <Copy className="w-5 h-5 text-gray-400" />
              )}
            </button>
            <button
              onClick={handleShowToken}
              className="p-2 rounded-lg hover:bg-gray-700 transition-colors"
              title={showToken ? "Hide token" : "Show token"}
            >
              {showToken ? (
                <EyeOff className="w-5 h-5 text-gray-400" />
              ) : (
                <Eye className="w-5 h-5 text-gray-400" />
              )}
            </button>
          </div>
        </div>
        
        <div className="bg-gray-900 rounded-lg p-4 font-mono text-sm">
          {showToken ? (
            <div className="flex items-center justify-between">
              <span>{cognitoToken}</span>
              <span className="text-xs text-gray-400">
                Hidden in {Math.ceil((30000 - (Date.now() - (timer ?? Date.now()))) / 1000)}s
              </span>
            </div>
          ) : (
            <div className="flex items-center space-x-1">
              {Array(36).fill('•').map((dot, i) => (
                <span key={i} className="text-gray-500">{dot}</span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Tokens;