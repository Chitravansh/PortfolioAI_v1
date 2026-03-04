import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, Upload, Brain, Globe, Palette, Sun, Moon } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { useTheme } from '../../contexts/Theme';

import landingPage from '../../assets/images/landingPage.png';

interface LandingPageProps {
  onStart: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onStart }) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="flex flex-col items-center">
      <header className="sticky top-0 z-50 w-full border-b border-primary/10 bg-white/80 dark:bg-background/80 backdrop-blur-md px-6 md:px-20 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="size-8 bg-primary rounded-lg flex items-center justify-center text-white">
            <Sparkles size={20} />
          </div>
          <h2 className="text-xl font-bold tracking-tight">PortfoliAI</h2>
        </div>
        <div className="hidden md:flex items-center gap-8">
          <nav className="flex gap-8 text-sm font-medium text-slate-600 dark:text-slate-300">
            <a href="#" className="hover:text-primary">Features</a>
            <a href="#" className="hover:text-primary">How it Works</a>
            <a href="#" className="hover:text-primary">Pricing</a>
          </nav>
          <div className="flex items-center gap-3">
            <Button variant="ghost" className="p-2 rounded-full" onClick={toggleTheme}>
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </Button>
            <Button onClick={onStart}>Get Started</Button>
            <Button variant="secondary" onClick={onStart}>Log In</Button>
          </div>
        </div>
      </header>

      <section className="max-w-7xl px-6 py-16 md:py-24 text-center flex flex-col items-center gap-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl space-y-6"
        >
          <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-tight">
            Transform Your Resume Into a <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-indigo-400">Stunning Portfolio</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            PortfoliAI uses advanced AI to convert your static resume into a professional, hosted digital portfolio in seconds. Stand out in the job market with zero effort.
          </p>
        </motion.div>

        <div className="flex flex-col md:flex-row gap-4 w-full justify-center">
          <Button className="h-14 px-10 text-lg" onClick={onStart}>
            <Upload size={24} />
            Upload Resume
          </Button>
          <Button variant="outline" className="h-14 px-10 text-lg">View Samples</Button>
        </div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="mt-8 w-full max-w-5xl aspect-video rounded-2xl overflow-hidden shadow-2xl border border-primary/10"
        >
          <img 
            src={landingPage}
            alt="Portfolio Preview" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </motion.div>
      </section>

      <section className="max-w-7xl px-6 py-20 w-full">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl md:text-4xl font-bold">Powerful Features for Your Career</h2>
          <p className="text-slate-600 dark:text-slate-400 max-w-xl mx-auto">Everything you need to showcase your professional journey in a way that recruiters love.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { icon: Brain, title: 'AI Extraction', desc: 'Automatically parse your resume data with high accuracy using state-of-the-art LLMs.' },
            { icon: Globe, title: 'Instant Hosting', desc: 'Get a live URL instantly. Our secure, global edge hosting ensures your portfolio loads lightning-fast.' },
            { icon: Palette, title: 'Custom Themes', desc: 'Choose from a variety of professional templates and customize colors, fonts, and layouts.' }
          ].map((f, i) => (
            <Card key={i} className="p-8 space-y-6 hover:shadow-xl transition-shadow group">
              <div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                <f.icon size={28} />
              </div>
              <div className="space-y-3">
                <h3 className="text-xl font-bold">{f.title}</h3>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{f.desc}</p>
              </div>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
};
