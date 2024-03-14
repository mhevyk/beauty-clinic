/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string;
  readonly VITE_APP_RECAPTCHA_KEY: string;
  readonly VITE_APP_GOOGLE_MAPS_API_KEY: string;
  readonly VITE_APP_GOOGLE_MAP_ID: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
