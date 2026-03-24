import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.horizonbank.app',
  appName: 'Horizon Bank',
  webDir: 'dist',
  server: {
    // During development, load from the Vite dev server instead of the built files
    // Uncomment the line below and set to your local IP for live reload on device:
    // url: 'http://192.168.1.X:5173',
    androidScheme: 'https',
  },
};

export default config;
