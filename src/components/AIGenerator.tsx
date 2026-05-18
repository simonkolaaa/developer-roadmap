import { useState } from 'react';
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
    <div className="flex w-full flex-col items-center gap-8">
      <form onSubmit={generateRoadmap} className="relative w-full max-w-2xl">
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Cosa vuoi imparare? (es. Python, Docker, React...)"
          className="w-full rounded-full border-2 border-slate-700 bg-slate-900 px-6 py-4 pr-32 text-white placeholder-slate-400 shadow-lg transition-colors focus:border-blue-500 focus:outline-none"
          disabled={loading}
        />
        <button
          type="submit"
          disabled={loading || !prompt.trim()}
          className="absolute top-2 right-2 bottom-2 flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 px-6 font-medium text-white transition-all hover:from-blue-500 hover:to-purple-500 disabled:opacity-50"
        >
          {loading ? (
            <>
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
              Generazione...
            </>
          ) : (
            'Genera ✨'
          )}
        </button>
      </form>

      {error && (
        <div className="w-full max-w-2xl rounded-xl border border-red-500/30 bg-red-900/30 p-4 text-center text-red-400">
          {error}
        </div>
      )}

      {mermaidData && (
        <div className="mt-4 flex w-full flex-col gap-4">
          <div className="flex w-full justify-end px-4">
            <button
              onClick={() => {
                navigator.clipboard.writeText(mermaidData);
                alert(
                  'Codice Mermaid copiato negli appunti! Puoi incollarlo in local-roadmaps.ts',
                );
              }}
              className="rounded-md border border-slate-700 bg-slate-800 px-3 py-1.5 text-xs text-slate-300 transition-colors hover:text-white"
            >
              Copia Codice Mermaid
            </button>
          </div>
          <MermaidRenderer content={mermaidData} definitions={{}} />
        </div>
      )}
    </div>
  );
};
