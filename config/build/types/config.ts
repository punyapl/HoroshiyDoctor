export type BuildMode = 'production' | 'development'
export interface BuildPaths {
    entry: string;
    build: string;
    html: string;
    favicon: string;
    src: string;
    locales: string;
    buildLocales: string;
}

export interface BuildEnv {
    token: string;
    mode: BuildMode;
    port: number;
    apiUrl: string;
    ymapKey: string;
}

export interface BuildOptions {
    mode: BuildMode;
    paths: BuildPaths;
    isDev: boolean;
    port: number;
    apiUrl: string;
    token: string;
    ymapKey: string;
    project: 'storybook' | 'jest' | 'main';
}
