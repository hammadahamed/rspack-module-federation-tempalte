const rspack = require("@rspack/core");
const refreshPlugin = require("@rspack/plugin-react-refresh");
const isDev = process.env.NODE_ENV === "development";
const path = require("path");
const { VueLoaderPlugin } = require("vue-loader");

const printCompilationMessage = require("./compilation.config.js");

/**
 * @type {import('@rspack/cli').Configuration}
 */
module.exports = {
  context: __dirname,
  entry: {
    main: "./src/index.ts",
  },
  devServer: {
    port: 6786,
    historyApiFallback: true,
    watchFiles: [path.resolve(__dirname, "src")],
    onListening: function (devServer) {
      const port = devServer.server.address().port;
      printCompilationMessage("compiling", port);
      devServer.compiler.hooks.done.tap("OutputMessagePlugin", (stats) => {
        setImmediate(() => {
          if (stats.hasErrors()) {
            printCompilationMessage("failure", port);
          } else {
            printCompilationMessage("success", port);
          }
        });
      });
    },
  },
  resolve: {
    extensions: [".js", ".ts", ".vue", ".json"],
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: "vue-loader",
        options: {
          experimentalInlineMatchResource: true,
        },
      },
      {
        test: /\.css$/,
        use: [
          "vue-style-loader",
          {
            loader: "css-loader",
            options: {
              modules: {
                localIdentName: "[local]__[hash:base64:8]",
                namedExport: false,
              },
            },
          },
        ],
      },
      {
        test: /\.scss$|\.sass$/,
        use: [
          "vue-style-loader",
          "css-loader",
          //   {
          //     loader: "css-loader",
          //     options: {
          //       modules: {
          //         localIdentName: "[local]__[hash:base64:8]",
          //         namedExport: false,
          //       },
          //     },
          //   },
          "sass-loader",
          {
            loader: "sass-loader",
            options: {
              // using `modern-compiler` and `sass-embedded` together significantly improve build performance,
              // requires `sass-loader >= 14.2.1`
              api: "modern-compiler",
              implementation: require.resolve("sass-embedded"),
            },
          },
        ],
      },
      {
        test: /\.svg$/,
        type: "asset",
      },
      {
        test: /\.(jsx?|tsx?)$/,
        use: [
          {
            loader: "builtin:swc-loader",
            options: {
              sourceMap: true,
              jsc: {
                parser: {
                  syntax: "typescript",
                  tsx: true,
                },
                transform: {
                  react: {
                    runtime: "automatic",
                    development: isDev,
                    refresh: isDev,
                  },
                },
              },
              env: {
                targets: [
                  "chrome >= 87",
                  "edge >= 88",
                  "firefox >= 78",
                  "safari >= 14",
                ],
              },
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new VueLoaderPlugin(),
    new rspack.container.ModuleFederationPlugin({
      name: "rsRemote",
      filename: "remoteEntry.js",
      exposes: {
        "./Content": "./src/components/Content",
      },
      shared: {
        vue: {
          singleton: true,
          requiredVersion: "^3.0.0",
          eager: true,
        },
      },
    }),
    new rspack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV),
    }),
    new rspack.ProgressPlugin({}),
    new rspack.HtmlRspackPlugin({
      template: "./src/index.html",
    }),
    isDev ? new refreshPlugin() : null,
  ].filter(Boolean),
};
