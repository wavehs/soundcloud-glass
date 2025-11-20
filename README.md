# soundcloud

An Electron application with React and TypeScript

## Recommended IDE Setup

- [VSCode](https://code.visualstudio.com/) + [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) + [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)

## Project Setup

### Install

```bash
$ npm install
```

### Configuration (Required for Login)

To use the SoundCloud login feature, you must configure a Client ID. SoundCloud has paused public API registration, so you may need to use an existing Client ID or find one for testing purposes.

1.  **Create configuration file**:
    Copy `.env.example` to `.env`:
    ```bash
    cp .env.example .env
    ```

2.  **Obtain a Client ID**:
    *   **Option A (Official):** Use an existing Client ID from an app you registered previously at [SoundCloud for Developers](https://soundcloud.com/you/apps).
    *   **Option B (Workaround/Testing):**
        1.  Open [SoundCloud](https://soundcloud.com) in your browser.
        2.  Open Developer Tools (F12) and go to the **Network** tab.
        3.  Play a track.
        4.  Filter requests by `client_id`.
        5.  Copy the `client_id` value found in the request URL.
        *Note: Public Client IDs may not support the Login flow due to Redirect URI restrictions. They typically only work for public playback.*

3.  **Update `.env`**:
    Open `.env` and paste your Client ID:
    ```env
    SOUNDCLOUD_CLIENT_ID=your_pasted_client_id
    SOUNDCLOUD_REDIRECT_URI=http://localhost/callback
    ```
    *Ensure the `SOUNDCLOUD_REDIRECT_URI` matches what is registered for your Client ID.*

### Development

```bash
$ npm run dev
```

### Build

```bash
# For windows
$ npm run build:win

# For macOS
$ npm run build:mac

# For Linux
$ npm run build:linux
```
