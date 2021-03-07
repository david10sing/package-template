const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: './src/index.tsx',
  externals: {      
    // Don't bundle react or react-dom      
    react: {          
        commonjs: "react",          
        commonjs2: "react",          
        amd: "React",          
        root: "React"      
    },      
    "react-dom": {          
        commonjs: "react-dom",          
        commonjs2: "react-dom",          
        amd: "ReactDOM",          
        root: "ReactDOM"      
    }  
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: 'file-loader',
          },
        ],
      },
      {
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'fonts/'
            }
          }
        ]
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'resolve-url-loader',
            options: {
              keepQuery: true,
            },
          },
          // Translates CSS into CommonJS
          'css-loader',
          // Compiles Sass to CSS
          'sass-loader',
        ],
      },
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'bundle.css',
    }),
  ],
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    alias: {          
      'react': path.resolve(__dirname, './node_modules/react'),
      'react-dom': path.resolve(__dirname, './node_modules/react-dom'),      
    },
  },
  output: {
    filename: 'bundle.js',
    library: 'react-scrollspy-io',
    libraryTarget: 'umd',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
};
