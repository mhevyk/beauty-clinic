/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_PORT: string;
  readonly VITE_PREVIEW_PORT: string;
  readonly VITE_APP_TITLE: string;
  readonly VITE_APP_RECAPTCHA_KEY: string;
  readonly VITE_APP_MAPBOX_ACCESS_TOKEN: string;
  readonly VITE_APP_MAPBOX_STYLE_LINK: string;
  readonly VITE_GRAPHQL_API_UR: string;
  readonly VITE_REST_API_URL: string;
  readonly VITE_API_BASE_IMAGE_URL: string;
  readonly VITE_TINYMCE_API_KEY: string;
  readonly VITE_TINYMCE_API_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
