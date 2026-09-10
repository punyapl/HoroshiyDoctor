import path from 'path'
import { config, } from 'dotenv'
import { buildWebpackConfig, } from './config/build/buildWebpackConfig'
import { type BuildEnv, type BuildPaths, } from './config/build/types/config'

export default (env: BuildEnv) => {
    const paths: BuildPaths = {
        entry: path.resolve(__dirname, 'src', 'index.tsx'),
        build: path.resolve(__dirname, 'build'),
        html: path.resolve(__dirname, 'public', 'index.html'),
        favicon: path.resolve(__dirname, 'public', 'favicon.svg'),
        src: path.resolve(__dirname, 'src'),
        locales: path.resolve(__dirname, 'public', 'locales'),
        buildLocales: path.resolve(__dirname, 'build', 'locales'),
    }

    const mode = env?.mode || 'development'
    const PORT = env?.port || 3000
    const apiUrl = env?.apiUrl ?? config().parsed?.apiUrl ?? '/'
    const token = env?.token ?? config().parsed?.token ?? ''
    const ymapKey = env?.ymapKey ?? config().parsed?.ymapKey ?? ''

    const isDev = mode === 'development'

    return buildWebpackConfig({
        mode,
        paths,
        isDev,
        apiUrl,
        token,
        ymapKey,
        port: PORT,
        project: 'main',
    })
}
