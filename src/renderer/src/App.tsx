import Sidebar from './components/Sidebar';
import GlassPanel from './components/GlassPanel';

function App(): React.JSX.Element {
  return (
    <div className="flex h-screen p-4 gap-4">
      <aside className="w-[250px] shrink-0">
        <Sidebar />
      </aside>
      <main className="flex-1 min-w-0">
        <GlassPanel className="h-full p-8">
          <h2 className="text-3xl font-bold mb-6">Welcome Back</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Dummy Content */}
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white/5 p-6 rounded-lg border border-white/5 hover:bg-white/10 transition-colors cursor-pointer">
                <div className="h-32 bg-white/5 rounded-md mb-4 animate-pulse" />
                <div className="h-4 w-3/4 bg-white/10 rounded mb-2" />
                <div className="h-4 w-1/2 bg-white/10 rounded" />
              </div>
            ))}
          </div>
        </GlassPanel>
      </main>
    </div>
  );
}

export default App;
