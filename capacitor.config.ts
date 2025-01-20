import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'Angeliha',
  webDir: 'www',
  plugins: {
    GoogleAuth: {
      scopes: ['profile', 'email'],
      serverClientId: '991356467165-bopj7f42st1sdvv2p0i9rnlilaqv4tg6.apps.googleusercontent.com',
      forceCodeForRefreshToken: true,
    }
  }
};

export default config;
