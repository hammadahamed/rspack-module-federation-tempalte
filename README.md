# rspack-module-federation-template

This is a boilerplat for creating micro-frontend using the concept of `Module Federation` which was initially rolled out as part of webpack5

### This project uses
- Vue3 (Host & Remote)
- Rspack (Module Bundler)

### Why I preferred **Rspack**?
- Faster the webpack
- The remote apps inside the host loads(HMR) is seamless
- Reloads(HMR) only the remote app even when it is inside the remote app
- HMR is seamless - equivalent to **`vite`**
- Built by one of the webpack creator, using **`Rust`**
- High compatibility with webpack ecosystem
