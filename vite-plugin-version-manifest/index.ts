import type { Plugin, ResolvedConfig } from 'vite';
import { join } from 'node:path';
import { readFileSync, writeFileSync } from 'node:fs';
import { execSync } from 'node:child_process';

const PLUGIN_NAME = 'vite-plugin-version-manifest';

export interface Manifest {
  environment: string;
  versions: {
    package: string;
    node: string;
  };
  gitInfo: GitInfo;
  buildInfo: {
    time: string;
    duration: number;
  };
  runtimeInfo: RuntimeInfo;
}

interface GitInfo {
  commitHash: string;
  branch: string;
}

type Runtime = 'Node.js' | 'Deno' | 'Bun';

interface RuntimeInfo {
  runtime: Runtime;
  version: string;
}

interface Config {
  verbose: boolean;
  outFileName: string;
}

let pluginConfig: Config = {
  verbose: false,
  outFileName: 'version-manifest.json',
};

const versionManifest = (config: Partial<Config> = pluginConfig): Plugin => {
  pluginConfig = { ...pluginConfig, ...config };

  let viteConfig: ResolvedConfig;

  let buildStartTime: number;

  return {
    // Mandatory: used for error messages
    name: PLUGIN_NAME,

    configResolved(resolvedConfig) {
      viteConfig = resolvedConfig;
    },

    buildStart() {
      buildStartTime = Date.now();
    },

    closeBundle() {
      const environment = viteConfig.mode;
      const version = getVersion(viteConfig);
      const gitInfo = getGitInfo();
      const buildTime = new Date().toISOString();
      const buildDuration = Date.now() - buildStartTime;
      const runtimeInfo = getRuntimeInfo();

      const manifest: Manifest = {
        environment,
        versions: {
          package: version,
          node: process.version,
        },
        gitInfo,
        buildInfo: {
          time: buildTime,
          duration: buildDuration,
        },
        runtimeInfo,
      };

      const stringifiedManifest = JSON.stringify(manifest, null, 2);

      writeFileSync(
        join(
          viteConfig.root,
          viteConfig.build.outDir,
          pluginConfig.outFileName
        ),
        stringifiedManifest
      );

      print(`Version Manifest generated: ${stringifiedManifest}`, 'info');
    },
  };
};

const getVersion = (config: ResolvedConfig): string => {
  const packageJsonPath = join(config.root, 'package.json');

  const packageJsonContent = readFileSync(packageJsonPath, 'utf-8');

  const packageJson = JSON.parse(packageJsonContent);

  const { version } = packageJson;

  return version ?? 'unavailable';
};

const getGitInfo = (): GitInfo => {
  // If the user did not initialize a git repository, we just return 'unavailable'
  try {
    const gitRevisionIdentifier = execSync('git rev-parse --short HEAD', {
      stdio: 'pipe',
    });
    const gitBranch = execSync('git rev-parse --abbrev-ref HEAD', {
      stdio: 'pipe',
    });

    return {
      commitHash: gitRevisionIdentifier.toString().trim(),
      branch: gitBranch.toString().trim(),
    };
  } catch {
    print(
      `Could not retrieve git info, using 'unavailable' as commit hash and branch name.`,
      'warn'
    );

    return {
      commitHash: 'unavailable',
      branch: 'unavailable',
    };
  }
};

const getRuntimeInfo = (): RuntimeInfo => {
  const getRuntimeName = (): Runtime => {
    // Cast to `any` to bypass TypeScript's strict checks
    if (typeof (globalThis as never)['Bun'] !== 'undefined') {
      return 'Bun';
    }

    if (typeof (globalThis as never)['Deno'] !== 'undefined') {
      return 'Deno';
    }

    return 'Node.js';
  };

  return {
    runtime: getRuntimeName(),
    version: process.version,
  };
};

const print = (message: string, level: 'info' | 'warn' | 'error' = 'info') => {
  if (pluginConfig.verbose) {
    console[level](`[${PLUGIN_NAME}] ${message}`);
  }
};

export default versionManifest;