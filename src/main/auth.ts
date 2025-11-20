import { BrowserWindow } from 'electron'

export const SOUNDCLOUD_CLIENT_ID = import.meta.env.VITE_SOUNDCLOUD_CLIENT_ID || process.env.SOUNDCLOUD_CLIENT_ID
export const SOUNDCLOUD_REDIRECT_URI = import.meta.env.VITE_SOUNDCLOUD_REDIRECT_URI || process.env.SOUNDCLOUD_REDIRECT_URI || 'http://localhost/callback'

export async function authenticateSoundCloud(): Promise<string> {
  if (!SOUNDCLOUD_CLIENT_ID) {
    throw new Error('SOUNDCLOUD_CLIENT_ID is not configured. Please check your .env file.')
  }

  return new Promise((resolve, reject) => {
    const authWindow = new BrowserWindow({
      width: 800,
      height: 600,
      show: true,
      autoHideMenuBar: true,
      webPreferences: {
        nodeIntegration: false,
        contextIsolation: true,
        sandbox: true
      }
    })

    const authUrl = `https://secure.soundcloud.com/connect?client_id=${SOUNDCLOUD_CLIENT_ID}&redirect_uri=${SOUNDCLOUD_REDIRECT_URI}&response_type=token&display=popup`

    authWindow.loadURL(authUrl)

    const handleUrl = (url: string): void => {
      if (url.startsWith(SOUNDCLOUD_REDIRECT_URI)) {
        // SoundCloud implicit grant returns access_token in the hash
        // e.g. http://localhost/callback#access_token=...&scope=...
        const hash = url.split('#')[1]
        const params = new URLSearchParams(hash)
        const accessToken = params.get('access_token')
        const error = params.get('error')

        if (accessToken) {
          resolve(accessToken)
          authWindow.close()
        } else if (error) {
          reject(new Error(error))
          authWindow.close()
        }
      }
    }

    authWindow.webContents.on('will-navigate', (_, url) => {
      handleUrl(url)
    })

    authWindow.webContents.on('will-redirect', (_, url) => {
      handleUrl(url)
    })

    authWindow.on('closed', () => {
      // If the promise hasn't been resolved yet, it means the user closed the window without logging in
      // We can't check promise state easily, but we can handle this by ignoring if already resolved
      // However, creating a robust promise wrapper is better.
      // For now, we rely on the fact that resolve/reject are only called once.
      reject(new Error('User cancelled login'))
    })
  })
}
