import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ThemeProvider } from './contexts/Theme';
import { AuthProvider, useAuth } from './contexts/Auth';

import { LandingPage } from './pages/Landing';
import { AuthPage } from './pages/Auth';
import { DashboardPage } from './pages/Dashboard';
import { EditorPage } from './pages/Editor';
import { PublicPortfolioPage } from './pages/PublicPortfolio';
import { ScanningOverlay } from './components/ScanningOverlay';

import { extractTextFromFile } from './lib/fileParser';
import { analyzeResume, PortfolioData } from './services/geminiService';
import { OAuthCallback } from './pages/OAuth/OAuthCallback';

/* ======================================================
   Types
   ====================================================== */

export interface Portfolio {
  id: string;                 // MongoDB _id
  name: string;
  data: PortfolioData;
  theme: string;
  slug: string; 
  status: 'draft' | 'active'; // IMPORTANT: draft vs published
  lastEdited: string;
  url: string;
}

/* ======================================================
   Main App Content
   ====================================================== */

const AppContent: React.FC = () => {
  const { user, isAuthenticated } = useAuth();

  if (window.location.pathname === '/oauth-callback') {
    return <OAuthCallback />;
  } 

  const navigateTo = (newView: typeof view) => {
  setView(newView);
  // Optional: Clean the URL when moving to private pages
  if (newView === 'dashboard') {
    window.history.pushState({}, '', '/dashboard');
  } else if (newView === 'landing') {
    window.history.pushState({}, '', '/');
  }
};

  /* --------------------
     App State
     -------------------- */
     
  const [view, setView] = useState<
    'landing' | 'auth' | 'dashboard' | 'scanning' | 'editor' | 'public'
  >('landing');

  const [portfolios, setPortfolios] = useState<Portfolio[]>([]);
  const [selectedPortfolioId, setSelectedPortfolioId] = useState<string | null>(null);

  const [portfolioData, setPortfolioData] = useState<PortfolioData | null>(null);
  const [selectedTheme, setSelectedTheme] = useState('Modern');
  const [selectedSlug, setSelectedSlug] = useState<string>('');

  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState('Initializing...');
  const [error, setError] = useState<string | null>(null);

  const [authMode, setAuthMode] = useState<'login' | 'register'>('login')


  /* ======================================================
   URL ROUTING LOGIC (for deep-linking)
   ====================================================== */
// useEffect(() => {
//   const path = window.location.pathname;
  
//   // Check if the URL is a public view link
//   if (path.startsWith('/view/')) {
//     const slug = path.split('/view/')[1];
//     if (slug) {
//       handleLoadPublicPortfolio(slug);
//     }
//   }
// }, []);

/* ======================================================
     1. INITIAL ROUTE CHECK (Runs ONCE on boot)
     ====================================================== */
  // useEffect(() => {
  //   const initApp = async () => {
  //     const path = window.location.pathname;

  //     if (path.startsWith('/view/')) {
  //       const slug = path.split('/view/')[1];
  //       if (slug) {
  //         await handleLoadPublicPortfolio(slug);
  //         return; // Exit early so it doesn't default to landing
  //       }
  //     }

  //     // If no public slug, check auth
  //     if (isAuthenticated) {
  //       setView('dashboard');
  //     } else {
  //       setView('landing');
  //     }
  //   };

  //   initApp();
  // }, []); // Only runs on mount


  useEffect(() => {
    const initApp = async () => {
      const path = window.location.pathname;

      if (path.startsWith('/view/')) {
        // Grab the slug and strip out any trailing slashes or spaces
        const rawSlug = path.split('/view/')[1];
        const cleanSlug = rawSlug?.split('/')[0]?.trim(); 
        
        if (cleanSlug) {
          await handleLoadPublicPortfolio(cleanSlug);
          return; 
        }
      }

      if (isAuthenticated) {
        setView('dashboard');
      } else {
        setView('landing');
      }
    };

    initApp();
  }, []);

// const handleLoadPublicPortfolio = async (slug: string) => {
//   setView('scanning'); // Show a loader while fetching
//   setStatus('Loading public portfolio...');
  
//   try {
//     const res = await fetch(`/api/public/portfolio/${slug}`);
//     if (!res.ok) throw new Error('Portfolio not found or private');
    
//     const result = await res.json();
    
//     // Set the data so the PublicPortfolioPage can render it
//     setPortfolioData(result.data);
//     setSelectedTheme(result.template || 'Modern');
//     setView('public');
//   } catch (err: any) {
//     console.error(err);
//     setError(err.message);
//     console.error(err);
//     // If it fails, send them to landing after a delay
//     setTimeout(() => setView('landing'), 2000);
//   }
// };

// const handleLoadPublicPortfolio = async (slug: string) => {
//   setView('scanning'); // Show a loader while fetching
//   setStatus('Loading public portfolio...');
//   setError(null);
  
//   try {
//     const res = await fetch(`/api/public/portfolio/${slug}`);
    
//     if (!res.ok) {
//       throw new Error('Portfolio is either a draft or does not exist.');
//     }
    
//     const result = await res.json();
    
//     // Set the data so the PublicPortfolioPage can render it
//     setPortfolioData(result.data ? result.data : result); 
//     setSelectedTheme(result.template || 'Modern');
//     setView('public');
//   } catch (err: any) {
//     console.error("Public Fetch Error:", err);
//     setError(err.message);
    
//     // Wait 3 seconds so you can ACTUALLY see the error on screen, 
//     // then send them to the landing page.
//     setTimeout(() => {
//       setView('landing');
//       window.history.pushState({}, '', '/');
//     }, 3000);
//   }
// };

    const handleLoadPublicPortfolio = async (slug: string) => {
    setView('scanning'); 
    setStatus('Loading public portfolio...');
    setError(null);
    
    try {
      const res = await fetch(`/api/public/portfolio/${slug}`);
      
      if (!res.ok) {
        throw new Error('Portfolio is either a draft or does not exist.');
      }
      
      const result = await res.json();
      
      setPortfolioData(result.data ? result.data : result); 
      setSelectedTheme(result.template || 'Modern');
      setView('public');
    } catch (err: any) {
      console.error("Public Fetch Error:", err);
      setError(err.message);
      
      setTimeout(() => {
        setView('landing');
        window.history.pushState({}, '', '/');
      }, 3000);
    }
  };

  /* ======================================================
     FETCH PORTFOLIOS (JWT ONLY)
     FIX: removed userId param, backend derives from token
     ====================================================== */
  const fetchPortfolios = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return;

      const res = await fetch('/api/portfolios', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error('Failed to fetch portfolios');

      const data = await res.json();

      setPortfolios(
        data.map((p: any) => ({
          id: p._id,                       // ✅ always MongoDB _id
          name: p.name,
          data: p.data,
          theme: p.template || 'Modern',
          status: p.status,
          // ✅ ADD THIS LINE
             slug: p.slug,
          lastEdited: new Date(p.updatedAt).toLocaleDateString(),
         url: `/view/${p.slug}`,     // ✅ public share link
        }))
      );
    } catch (err) {
      console.error(err);
    }
  };

  /* Fetch portfolios after login */
  useEffect(() => {
    if (user) fetchPortfolios();
  }, [user]);

  /* ======================================================
     AUTH ↔ VIEW SYNC
     ====================================================== */
  useEffect(() => {

    if (window.location.pathname.startsWith('/view/')) {
      return; 
    } 

    if (isAuthenticated && (view === 'landing' || view === 'auth')) {
      setView('dashboard');
    }

    if (!isAuthenticated && ['dashboard', 'editor'].includes(view)) {
      setView('landing');
    }
  }, [isAuthenticated,view]);



  /* ======================================================
     RESUME UPLOAD → AI ANALYSIS
     ====================================================== */
  const handleUpload = async (file: File) => {
    setView('scanning');
    setProgress(10);
    setStatus('Reading resume...');
    setError(null);

    try {
      const text = await extractTextFromFile(file);

      setProgress(40);
      setStatus('Analyzing with AI...');
      const data = await analyzeResume(text);

      setPortfolioData(data);

      setProgress(100);
      setStatus('Ready!');
      setTimeout(() => setView('editor'), 500);
    } catch (err: any) {
      setError(err.message || 'Processing failed');
    }
  };

  /* ======================================================
     AUTOSAVE (DRAFT)
     FIX: uses PUT + status=draft
     ====================================================== */
  useEffect(() => {
    if (!portfolioData || !selectedPortfolioId) return;

    const autosave = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) return;

        await fetch(`/api/portfolios/${selectedPortfolioId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            name: `${portfolioData.name}'s Portfolio`,
            data: portfolioData,
            template: selectedTheme,
            status: 'draft', // ✅ autosave NEVER publishes
          }),
        });
      } catch (err) {
        console.error('Autosave failed', err);
      }
    };

    const interval = setInterval(autosave, 5000); // every 5 seconds
    return () => clearInterval(interval);
  }, [portfolioData, selectedTheme, selectedPortfolioId]);

  // /* ======================================================
  //    PUBLISH PORTFOLIO
  //    FIX: PUT + status=active
  //    ====================================================== */
  // const handleSave = async (data: PortfolioData, theme: string) => {
  //   try {
  //     const token = localStorage.getItem('token');
  //     if (!token) throw new Error('Not authenticated');

  //     // If editing existing → UPDATE
  //     if (selectedPortfolioId) {
  //       await fetch(`/api/portfolios/${selectedPortfolioId}`, {
  //         method: 'PUT',
  //         headers: {
  //           'Content-Type': 'application/json',
  //           Authorization: `Bearer ${token}`,
  //         },
  //         body: JSON.stringify({
  //           name: `${data.name}'s Portfolio`,
  //           data,
  //           template: theme,
  //           status: 'active', // ✅ publish
  //         }),
  //       });
  //     }
  //     // If new portfolio → CREATE
  //     else {
  //       const res = await fetch('/api/portfolios', {
  //         method: 'POST',
  //         headers: {
  //           'Content-Type': 'application/json',
  //           Authorization: `Bearer ${token}`,
  //         },
  //         body: JSON.stringify({
  //           name: `${data.name}'s Portfolio`,
  //           data,
  //           template: theme,
  //         }),
  //       });

  //       const result = await res.json();
  //       setSelectedPortfolioId(result.portfolio._id);
  //     }

  //     await fetchPortfolios();
  //     alert('Portfolio published successfully!');
  //     setView('dashboard');
  //     setPortfolioData(null);
  //     setSelectedPortfolioId(null);
  //   } catch (err) {
  //     console.error(err);
  //     alert('Failed to publish portfolio');
  //   }
  // };

  /* ======================================================
     PUBLISH / SAVE DRAFT PORTFOLIO
     ====================================================== */
  const handleSave = async (data: PortfolioData, theme: string, status: 'draft' | 'active', customSlug: string) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('Not authenticated');

      const payload = {
        name: `${data.name}'s Portfolio`,
        data,
        template: theme,
        status, // 'draft' or 'active'
        slug: customSlug, // Send the custom slug
      };

      if (selectedPortfolioId) {
        // UPDATE
        await fetch(`/api/portfolios/${selectedPortfolioId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
          body: JSON.stringify(payload),
        });
      } else {
        // CREATE
        const res = await fetch('/api/portfolios', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
          body: JSON.stringify(payload),
        });
        const result = await res.json();
        setSelectedPortfolioId(result.portfolio._id);
      }

      await fetchPortfolios();
      alert(`Portfolio ${status === 'active' ? 'published' : 'saved as draft'} successfully!`);
      setView('dashboard');
      setPortfolioData(null);
      setSelectedPortfolioId(null);
      setSelectedSlug(''); // Reset slug
    } catch (err) {
      console.error(err);
      alert('Failed to save portfolio');
    }
  };


  /**====================================================
   * Handle Delete 
   * ====================================================
   */

  const handleDeletePortfolio = async (id: string) => {
  try {
    const token = localStorage.getItem('token');
    if (!token) return;

    await fetch(`/api/portfolios/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    // ✅ Refresh state properly
    await fetchPortfolios();

    // If currently editing this portfolio, reset editor
    if (selectedPortfolioId === id) {
      setSelectedPortfolioId(null);
      setPortfolioData(null);
      setView('dashboard');
    }
  } catch (err) {
    console.error('Delete failed', err);
    alert('Failed to delete portfolio');
  }
};

  /* ======================================================
     UI RENDER
     ====================================================== */
  return (
    <div className="min-h-screen bg-background text-foreground">
      <AnimatePresence mode="wait">

        {view === 'landing' && (
          <motion.div key="landing">
            <LandingPage onStart={(mode) => {
                setAuthMode(mode || 'register'); // 👈 Save the requested mode
                setView('auth');
              }} />
          </motion.div>
        )}

        {view === 'auth' && (
          <motion.div key="auth">
            <AuthPage onAuth={() => setView('dashboard')} 
              initialMode={authMode}/>
          </motion.div>
        )}

        {view === 'dashboard' && (
          <motion.div key="dashboard">
            <DashboardPage
              portfolios={portfolios}
              onUpload={handleUpload}
             onEdit={(id: string, newTemplate?: string) => {
                const p = portfolios.find(p => p.id === id);
                if (!p) return;

                setSelectedPortfolioId(p.id);
                setPortfolioData(p.data);
                // 👇 2. If newTemplate exists, use it! Otherwise fallback to the saved theme.
                setSelectedTheme(newTemplate || p.theme); 
                setSelectedSlug(p.slug || '');
                setView('editor');
              }}
              onView={(id) => {
                const p = portfolios.find(p => p.id === id);
                if (!p) return;

                setSelectedPortfolioId(p.id);
                setPortfolioData(p.data);
                setSelectedTheme(p.theme);
                setView('public');

                window.history.pushState({}, '', `/view/${p.slug}`);
              }}

              onDelete={handleDeletePortfolio}
              
            />
          </motion.div>
        )}

        {view === 'editor' && (
          <motion.div key="editor">
            <EditorPage
              data={portfolioData}
              theme={selectedTheme}
              initialSlug={selectedSlug}
              onThemeChange={setSelectedTheme}
              onDataChange={setPortfolioData}
              onSave={handleSave}
              onBack={() => setView('dashboard')}
            />
          </motion.div>
        )}

        {view === 'public' && (
          <motion.div key="public">
            <PublicPortfolioPage
              data={portfolioData}
              theme={selectedTheme}
              onBack={() => {
        if (isAuthenticated) {
          setView('dashboard');
          window.history.pushState({}, '', '/dashboard');
        } else {
          setView('landing');
          window.history.pushState({}, '', '/');
        }
      }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {view === 'scanning' && (
        <ScanningOverlay
          progress={progress}
          status={status}
          error={error}
          onClose={() => setView('dashboard')}
        />
      )}
    </div>
  );
};

/* ======================================================
   App Wrapper
   ====================================================== */
export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </ThemeProvider>
  );
}