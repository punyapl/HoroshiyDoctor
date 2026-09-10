import MiniCssExtractPlugin from 'mini-css-extract-plugin'

export function buildCssLoaders (isDev: boolean) {
    return [
        {
            test: /\.css$/i,
            use: ['style-loader', 'css-loader', 'sass-loader', 'postcss-loader',],
        },
        {
            test: /\.s[ac]ss$/i,
            exclude: /node_modules/,
            use: [
                isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
                {
                    loader: 'css-loader',
                    options: {
                        modules: {
                            namedExport: false,
                            auto: /\.module\./i,
                            localIdentName: isDev ? '[path][name]__[local]' : '[hash:base64:8]',
                        },
                    },
                },
                'postcss-loader',
                'sass-loader',
            ],
        },
    ]
}
