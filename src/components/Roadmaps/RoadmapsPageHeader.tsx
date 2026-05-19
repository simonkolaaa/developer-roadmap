import { isLoggedIn } from '../../lib/jwt.ts';
import { showLoginPopup } from '../../lib/popup.ts';

export function RoadmapsPageHeader() {
  return (
    <div className="bg-slate-950 py-10 sm:py-20 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[300px] bg-purple-600/20 blur-[120px] rounded-full pointer-events-none"></div>
      
      <div className="container relative z-10">
        <div className="flex flex-col items-start sm:items-center">
          <h1 className="text-4xl font-extrabold sm:text-7xl bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-500 bg-clip-text text-transparent mb-4">
            Developer Roadmaps
          </h1>
          <p className="mt-1 mb-8 text-base text-slate-400 sm:text-xl text-center max-w-2xl">
            Browse the ever-growing list of up-to-date, community driven roadmaps
          </p>
          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:gap-4">
            <a
              className="inline-flex justify-center items-center rounded-full bg-slate-800 border border-slate-700 px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-slate-700 hover:shadow-[0_0_20px_rgba(255,255,255,0.1)] sm:text-base"
              href="https://draw.roadmap.sh"
              onClick={(e) => {
                if (!isLoggedIn()) {
                  e.preventDefault();
                  showLoginPopup();
                }
              }}
            >
              Draw your own roadmap
            </a>
            <a
              className="inline-flex justify-center items-center rounded-full bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-3 text-sm font-bold text-white transition-all hover:shadow-[0_0_30px_rgba(168,85,247,0.4)] sm:text-base"
              href="/ai"
              onClick={(e) => {
                if (!isLoggedIn()) {
                  e.preventDefault();
                  showLoginPopup();
                }
              }}
            >
              ✨ Generate Roadmaps with AI
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
