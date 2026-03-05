import React, { useEffect } from 'react';

export const OAuthCallback: React.FC = () => {
  useEffect(() => {
    // 1. Grab the token and user info from the URL parameters
    const params = new URLSearchParams(window.location.search);
    const token = params.get('token');
    const userStr = params.get('user');

    if (token) {
      // 2. Save them to localStorage (This triggers the event in your main window!)
      localStorage.setItem('token', token);
      if (userStr) {
        localStorage.setItem('user', decodeURIComponent(userStr));
      }

      // 3. Close the popup!
      window.close();
    }
  }, []);

  return (
    <div className="h-screen w-screen flex items-center justify-center bg-white text-slate-900">
      <div className="flex flex-col items-center">
        <div className="size-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-4"></div>
        <h2 className="text-lg font-bold">Completing Login...</h2>
        <p className="text-slate-500 text-xs mt-2">You can close this window if it gets stuck.</p>
      </div>
    </div>
  );
};