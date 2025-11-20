import { useState } from 'react';
import Sidebar from './components/Sidebar';
import GlassPanel from './components/GlassPanel';

interface User {
  username: string;
  avatar_url: string;
}

function App(): React.JSX.Element {
  const [user, setUser] = useState<User | null>(null);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async () => {
    setIsLoggingIn(true);
    setError(null);
    try {
      const result = await window.electron.ipcRenderer.invoke('auth:soundcloud');
      if (result.success) {
        // Fetch user data
        const response = await fetch('https://api.soundcloud.com/me', {
          headers: {
            Authorization: `OAuth ${result.token}`
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }

        const userData = await response.json();
        setUser(userData);
      } else {
        setError(result.error || 'Login failed');
        // If the error is about missing configuration, we could show a more helpful message or modal here
        if (result.error.includes('SOUNDCLOUD_CLIENT_ID')) {
           // Ideally, we could open the settings or show a modal. For now, the error message is descriptive.
        }
      }
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'An error occurred');
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <div className="flex h-screen p-4 gap-4">
      <aside className="w-[250px] shrink-0">
        <Sidebar
          user={user}
          onLogin={handleLogin}
          onLogout={handleLogout}
          isLoggingIn={isLoggingIn}
        />
      </aside>
      <main className="flex-1 min-w-0">
        <GlassPanel className="h-full p-8">
          <h2 className="text-3xl font-bold mb-6">
            {user ? `Welcome, ${user.username}` : 'Welcome'}
          </h2>
          {error && (
            <div className="bg-red-500/20 border border-red-500/50 text-red-200 px-4 py-2 rounded mb-4">
              {error}
            </div>
          )}
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
