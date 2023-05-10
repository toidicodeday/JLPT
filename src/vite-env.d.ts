/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL: string
  readonly VITE_SENDBIRD_APP_ID: string
  readonly VITE_SITE_API_TOKEN: string
  readonly VITE_ONESIGNAL_ADMIN_APP_KEY: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
