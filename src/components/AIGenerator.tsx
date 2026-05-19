import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MermaidRenderer } from './MermaidRenderer';

export const AIGenerator = () => {
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [mermaidData, setMermaidData] = useState('');

  const generateRoadmap = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    setLoading(true);
    setError('');
    setMermaidData('');

    try {
      const response = await fetch('/api/generate-roadmap', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Errore nella generazione della mappa');
      }

      setMermaidData(data.diagram);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex w-full flex-col items-center gap-8 relative z-10">
      <motion.form 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        onSubmit={generateRoadmap} 
        className="relative w-full max-w-2xl"
      >
        <motion.div
          animate={loading ? {
            boxShadow: ["0px 0px 0px rgba(168, 85, 247, 0)", "0px 0px 40px rgba(168, 85, 247, 0.6)", "0px 0px 0px rgba(168, 85, 247, 0)"],
          } : {}}
          transition={{ duration: 2, repeat: Infinity }}
          className="rounded-full rounded-full"
        >
          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Cosa vuoi imparare? (es. Python, Docker, React...)"
            className="w-full rounded-full border-2 border-slate-700 bg-slate-900/80 backdrop-blur-md px-6 py-4 pr-36 text-white placeholder-slate-400 shadow-[0_0_20px_rgba(0,0,0,0.5)] transition-colors focus:border-purple-500 focus:outline-none"
            disabled={loading}
          />
        </motion.div>
        
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          type="submit"
          disabled={loading || !prompt.trim()}
          className="absolute top-2 right-2 bottom-2 flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 px-8 font-bold text-white shadow-lg transition-all hover:from-blue-500 hover:to-purple-500 disabled:opacity-50"
        >
          {loading ? (
            <>
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="h-4 w-4 rounded-full border-2 border-white border-t-transparent" 
              />
              Generazione...
            </>
          ) : (
            'Genera ✨'
          )}
        </motion.button>
      </motion.form>

      <AnimatePresence>
        {error && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="w-full max-w-2xl rounded-xl border border-red-500/30 bg-red-900/30 p-4 text-center text-red-400 backdrop-blur-sm"
          >
            {error}
          </motion.div>
        )}
      </AnimatePresence>

      {mermaidData && (
        <motion.div 
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ type: "spring", bounce: 0.4, duration: 0.8 }}
          className="mt-4 flex w-full flex-col gap-4 relative"
        >
          <div className="absolute inset-0 -z-10 bg-gradient-to-b from-purple-900/20 to-transparent blur-[100px] rounded-[100px]" />
          
          <div className="flex w-full justify-end px-4 gap-3">
            <motion.button
              whileHover={{ scale: 1.05, backgroundColor: "rgba(22, 163, 74, 0.4)" }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                const title = window.prompt("Scegli un nome per la tua Roadmap:", prompt || "Nuova Roadmap");
                if (title) {
                  const id = 'custom-' + Date.now();
                  const saved = JSON.parse(localStorage.getItem('my-roadmaps') || '[]');
                  saved.push({ id, title, content: mermaidData, date: new Date().toISOString() });
                  localStorage.setItem('my-roadmaps', JSON.stringify(saved));
                  alert('Roadmap salvata con successo nella tua Homepage!');
                }
              }}
              className="rounded-md border border-green-700 bg-green-900/30 px-4 py-2 text-xs font-bold text-green-400 backdrop-blur-md transition-colors flex items-center gap-2 shadow-[0_0_15px_rgba(22,163,74,0.2)]"
            >
              💾 Salva nei Miei Percorsi
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05, backgroundColor: "rgba(51, 65, 85, 0.8)" }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                navigator.clipboard.writeText(mermaidData);
                alert(
                  'Codice Mermaid copiato negli appunti! Puoi incollarlo in local-roadmaps.ts',
                );
              }}
              className="rounded-md border border-slate-700 bg-slate-800/80 backdrop-blur-md px-4 py-2 text-xs font-bold text-slate-300 transition-colors hover:text-white"
            >
              Copia Codice Mermaid
            </motion.button>
          </div>
          
          <div className="rounded-2xl border border-slate-800 bg-slate-900/50 backdrop-blur-xl shadow-2xl p-2">
            <MermaidRenderer content={mermaidData} definitions={{}} />
          </div>
        </motion.div>
      )}
    </div>
  );
};
