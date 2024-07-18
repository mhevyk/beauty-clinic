/// <reference types="vite/client" />
/// <reference types="vite-plugin-svgr/client" />

interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string;
  readonly VITE_APP_RECAPTCHA_KEY: string;
  readonly VITE_APP_MAPBOX_ACCESS_TOKEN: string;
  readonly VITE_APP_MAPBOX_STYLE_LINK: string;
  readonly VITE_API_URL: string;
  readonly VITE_API_BASE_IMAGE_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
