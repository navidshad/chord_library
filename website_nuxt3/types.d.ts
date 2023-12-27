declare global {
  namespace NodeJS {
    interface ProcessEnv {
      VUE_APP_BASE_URL: string;
    }
  }

  interface ImportMetaEnv {
    VITE_BASE_URL: string;
  }
}