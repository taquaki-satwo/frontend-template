# フロントエンド設定手順

## 環境

```bash
sw_vers
ProductName:    Mac OS X
ProductVersion: 10.14.6
BuildVersion:   18G2022

node -v
v12.14.0

npm -v
6.13.4
```

## 最終的なディレクトリとファイル

```bash
.
├── .babelrc
├── .editorconfig
├── .eslintrc.js
├── .gitignore
├── .node-version
├── package-lock.json
├── package.json
├── postcss.config.js
├── public
│   ├── index.html
│   └── js
│       └── bundle.js
├── src
│   ├── css
│   │   ├── components
│   │   │   └── component.css
│   │   └── style.css
│   └── js
│       ├── index.js
│       └── modules
│           └── module.js
├── webpack.common.js
├── webpack.dev.js
└── webpack.prod.js
```

## 最終的なpackage.json

```
{
  "name": "frontend-template",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "webpack-dev-server --open --config webpack.dev.js",
    "build": "webpack --config webpack.prod.js"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "@babel/core": "^7.7.7",
    "@babel/preset-env": "^7.7.7",
    "babel-loader": "^8.0.6",
    "core-js": "^3.6.2",
    "css-loader": "^3.4.1",
    "eslint": "^6.8.0",
    "postcss-custom-properties": "^9.0.2",
    "postcss-import": "^12.0.1",
    "postcss-loader": "^3.0.0",
    "regenerator-runtime": "^0.13.3",
    "style-loader": "^1.1.2",
    "webpack": "^4.41.5",
    "webpack-cli": "^3.3.10",
    "webpack-dev-server": "^3.10.1",
    "webpack-merge": "^4.2.2"
  }
}
```

## 1. .gitignore

```bash
gibo update
gibo dump macOS Windows Node VisualStudioCode JetBrains >> .gitignore
```

## 2. Node.js

```bash
anyenv update
nodenv install 12.14.0
nodenv local 12.14.0
node -v
v12.14.0
```

```bash
npm i -g npm
npm -v
6.13.4
```

## 3. EditorConfig

```bash
touch .editorconfig
```

```:.editorconfig
root = true

[*]
indent_style = space
indent_size = 2
end_of_line = lf
charset = utf-8
trim_trailing_whitespace = true
insert_final_newline = true

[.md]
trim_trailing_whitespace = false
```

### 4. package.json

```bash
npm init -y
```

### 5. ESlint

```bash
npm i -D eslint
npx esint --init
? How would you like to use ESLint? To check syntax, find problems, and enforce code style
? What type of modules does your project use? JavaScript modules (import/export)
? Which framework does your project use? None of these
? Does your project use TypeScript? No
? Where does your code run? Browser, Node
? How would you like to define a style for your project? Answer questions about your style
? What format do you want your config file to be in? JavaScript
? What style of indentation do you use? Spaces
? What quotes do you use for strings? Single
? What line endings do you use? Unix
? Do you require semicolons? Yes
```

```JavaScript:.eslintrc.js
module.exports = {
    'env': {
        'browser': true,
        'es6': true,
        'node': true
    },
    'extends': 'eslint:recommended',
    'globals': {
        'Atomics': 'readonly',
        'SharedArrayBuffer': 'readonly'
    },
    'parserOptions': {
        'ecmaVersion': 2018,
        'sourceType': 'module'
    },
    'rules': {
        'indent': [
            'error',
            2
        ],
        'linebreak-style': [
            'error',
            'unix'
        ],
        'quotes': [
            'error',
            'single'
        ],
        'semi': [
            'error',
            'always'
        ]
    }
};
```

スペースを手動で変更

```JavaScript:.eslintrc.js
...
     'rules': {
         'indent': [
             'error',
-            4
+            2
         ],
...
```

## 4. 基本ファイル

```bash
mkdir public && touch public/index.html
mkdir -p src/js/modules && touch src/js/index.js src/js/modules/module.js
```

```HTML:public/index.html
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <title></title>
</head>
<body>
  <script src="./js/bundle.js"></script>
</body>
</html>
```

```JavaScript:src/js/index.js
import { msg } from './modules/module';
console.log(msg);
```

```JavaScript:src/js/modules/module.js
export const msg = 'HELLO';
```

## 5. webpack 基本設定

```bash
npm i -D webpack webpack-cli
touch webpack.config.js
```

```JavaScript:webpack.config.js
const path = require('path');

module.exports = {
  entry: './src/js/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'public/js'),
  },
};
```

```JSON:package.json
...
   "scripts": {
-    "test": "echo \"Error: no test specified\" && exit 1"
+    "test": "echo \"Error: no test specified\" && exit 1",
+    "build": "webpack"
   },
...
```

```bash
npm run build
tree public
public
├── index.html
└── js
    └── bundle.js
```

## 6. webpack-dev-server

```bash
npm i -D webpack-dev-server
```

```JavaScript:webpack.config.js
...
+  devServer: {
+    contentBase: path.resolve(__dirname, 'public'),
+    publicPath: '/js/'
+  }
...
```

```JSON:package.json
...
   "scripts": {
     "test": "echo \"Error: no test specified\" && exit 1",
+    "start": "webpack-dev-server --open",
     "build": "webpack"
   },
...
```

## 7. プロダクションビルド

```bash
npm i -D webpack-merge
mv webpack.config.js webpack.common.js
touch webpack.dev.js webpack.prod.js
```

```JavaScript:webpack.common.js
const path = require('path');

module.exports = {
  entry: './src/js/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'public/js')
  }
};
```

```JavaScript:webpack.dev.js
const path = require('path');
const merge = require('webpack-merge');
const common = require('./webpack.common');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'source-map',
  devServer: {
    contentBase: path.resolve(__dirname, 'public'),
    publicPath: '/js/'
  }
});
```

```JavaScript:webpack.prod.js
const merge = require('webpack-merge');
const common = require('./webpack.common');

module.exports = merge(common, {
  mode: 'production'
});
```

```JSON:package.json
...
 "scripts": {
     "test": "echo \"Error: no test specified\" && exit 1",
-    "start": "webpack-dev-server --open",
-    "build": "webpack"
+    "start": "webpack-dev-server --open --config webpack.dev.js",
+    "build": "webpack --config webpack.prod.js"
   },
...
```

```JavaScript:src/js/index.js
 import { msg } from './modules/module';
+
+if (process.env.NODE_ENV === 'development') {
+  console.warn('開発環境');
+}
+
 console.log(msg);
```

## 8. babel

```bash
npm i -D babel-loader @babel/core @babel/preset-env core-js regenerator-runtime
touch .babelrc
```

```:.babelrc
{
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          ie: 11,
          esmodules: true
        },
        useBuiltIns: 'usage',
        corejs: 3
      }
    ]
  ]
}
```

```JavaScript:src/js/index.js
+import 'core-js';
+import 'regenerator-runtime/runtime';
 import { msg } from './modules/module';
...
```

```JavaScript:src/js/modules/module.js
-export const msg = 'HELLO';
+const exampleObject = {
+  a: 'HELLO',
+  b: ' ',
+  c: 'WORLD'
+};
+
+export const msg = Object.values(exampleObject);
```

```JavaScript:webpack.common.js
...
+ module: {
+   rules: [
+     {
+       test: /\.m?js$/,
+       exclude: /node_modules/,
+       use: {
+         loader: 'babel-loader'
+       }
+     }
+   ]
  }
...
```

## 9. CSS

```bash
mkdir -p src/css/components && touch src/css/style.css src/css/components/component.css
```

```CSS:src/css/style.css
@import './components/component.css';

body {
  background-color: var(--color);
}
```

```CSS:src/css/components/component.css
:root {
  --color: red;
}
```

```bash
npm i -D css-loader postcss-loader postcss-import postcss-custom-properties
touch postcss.config.js
```

```JavaScript:postcss.config.js
module.exports = {
  plugins: {
    'postcss-import': {},
    'postcss-custom-properties': {}
  }
};
```

```JavaScript:webpack.common.js
...
+     },
+     {
+       test: /\.css$/,
+       use: [
+         'style-loader',
+         { loader: 'css-loader', options: { importLoaders: 1 } },
+         'postcss-loader'
+       ]
      }
...
```

```JavaScript:src/js/index.js
...
import { msg } from './modules/module';
+import '../css/style.css';
...
```

## Todo

* html-webpack-plugin
* clean-webpack-plugin
* Pug
* images
* fonts
* eslint-Loader
* Minify
* Uglify
* optimization－splitChunks
* dotenv、cross-env、env-option
