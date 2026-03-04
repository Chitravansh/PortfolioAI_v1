import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
// import { PublicPortfolioPage } from './PublicPortfolioPage'; // Adjust path
import { PublicPortfolioPage } from '../PublicPortfolio';
import { PortfolioData } from '../../services/geminiService';

export const ViewPortfolio = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  
  const [portfolioData, setPortfolioData] = useState<PortfolioData | null>(null);
  const [theme, setTheme] = useState<string>('Modern');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchPublicData = async () => {
      try {
        setLoading(true);
        // We use the public API route that doesn't require a Token
        const res = await fetch(`/api/public/portfolio/${slug}`);
        
        if (!res.ok) {
          setError(true);
          return;
        }

        const data = await res.json();
        // data here should match your Portfolio model: { name, data, template, ... }
        setPortfolioData(data.data);
        setTheme(data.template || 'Modern');
      } catch (err) {
        console.error("Public fetch error:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    if (slug) fetchPublicData();
  }, [slug]);

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="animate-spin size-8 border-4 border-primary border-t-transparent rounded-full" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-screen flex flex-col items-center justify-center gap-4">
        <h1 className="text-2xl font-bold">Portfolio Not Found</h1>
        <p className="text-slate-500">The link you followed may be broken or the portfolio is set to draft.</p>
        <button 
          onClick={() => navigate('/')}
          className="px-4 py-2 bg-primary text-white rounded-lg"
        >
          Go Home
        </button>
      </div>
    );
  }

  return (
    <PublicPortfolioPage 
      data={portfolioData} 
      theme={theme} 
      onBack={() => navigate(-1)} 
    />
  );
};