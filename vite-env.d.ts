/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly BASE_URL: string,
  readonly VITE_URL_DB_LOCAL: string,
  readonly JWT_SECRET: string,
  readonly JWT_REFRESH: string,
  readonly NODE_ENV: string,
  readonly ORIGIN: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
