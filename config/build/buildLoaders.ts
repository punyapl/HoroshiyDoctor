import type webpack from 'webpack'
import { buildCssLoaders, } from './loaders/buildCssLoaders'
import { buildSVGLoader, } from './loaders/buildSVGLoader'
import type { BuildOptions, } from './types/config'

export function buildLoaders (options: BuildOptions): webpack.RuleSetRule[] {
    const svgLoader = buildSVGLoader()

    const cssLoaders = buildCssLoaders(options.isDev)

    const typescriptLoader = {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
    }

    const fileLoader = {
        test: /\.(png|jpe?g|gif)$/i,
        type: 'asset/resource',
    }

    const pdfLoader = {
        test: /\.(pdf)$/,
        type: 'asset/resource',
    }

    return [
        fileLoader,
        svgLoader,
        typescriptLoader,
        pdfLoader,
        ...cssLoaders,
    ]
}
