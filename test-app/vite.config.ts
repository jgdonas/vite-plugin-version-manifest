import { defineConfig } from 'vite';
import versionManifest from 'vite-plugin-version-manifest'; 

export default defineConfig({
  plugins: [
    versionManifest({ verbose: true })
  ],
});