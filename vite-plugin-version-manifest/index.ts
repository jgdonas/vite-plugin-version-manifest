import type { Plugin, ResolvedConfig } from 'vite';
import { join } from 'node:path';
import { readFileSync, writeFileSync } from 'node:fs';
import { execSync } from 'node:child_process';

const PLUGIN_NAME = 'vite-plugin-version-manifest';


interface Config {
  verbose: boolean,
  outFileName: string
}

let pluginConfig: Config = {
  verbose: false,
  outFileName: 'version-manifest.json'
}

const versionManifest = (config: Partial<Config> = pluginConfig): Plugin => {

  pluginConfig = { ...pluginConfig, ...config };

  let viteConfig: ResolvedConfig;

  return {
    // Mandatory: used for error messages
    name: PLUGIN_NAME,
  
    configResolved(resolvedConfig) {
      viteConfig = resolvedConfig;
    },

    async closeBundle () {
      const version = getVersion(viteConfig);
      const commitHash = getCommitHash();
      const buildTime = new Date().toISOString();

      const manifest = {
        version,
        commitHash,
        dateTime: buildTime, 
      }

      const stringifiedManifest = JSON.stringify(manifest, null, 2);

      writeFileSync(
        join(viteConfig.root, viteConfig.build.outDir, pluginConfig.outFileName),
        stringifiedManifest
      );

      print(`Version Manifest generated: ${stringifiedManifest}`, 'info');
    }
  };
}

const getVersion = (config: ResolvedConfig): string => {
  const packageJsonPath = join(config.root, 'package.json');

  const packageJsonContent = readFileSync(packageJsonPath, 'utf-8');

  const packageJson = JSON.parse(packageJsonContent);

  const { version } = packageJson;

  return version ?? 'unavailable';
}

const getCommitHash = (): string => {
  // If the user did not initialize a git repository, we just return 'unavailable'
  try {
    const gitRevisionIdentifier = execSync('git rev-parse --short HEAD', { stdio: 'pipe' });

    return  gitRevisionIdentifier.toString().trim();
  } catch (error) {
    print(`Could not retrieve git commit hash, using 'unavailable' as commit hash.`, 'warn');

    return 'unavailable';
  }
}

const print = (message: string, level: 'info' | 'warn' | 'error' = 'info') => {
  if (pluginConfig.verbose) {
    console[level](`[${PLUGIN_NAME}] ${message}`);
  }
}

export default versionManifest;