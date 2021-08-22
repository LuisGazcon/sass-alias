# sass-alias

sass-alias is a node-sass and dart-sass importer that brings aliasing to sass.

## Installation

This package can be installed from npm or yarn by running one of the following commands.

### Install using **npm**:

```
npm install sass-alias
```

### Install using **yarn**:

```
yarn add sass-alias
```

## Introduction

sass-alias brings sass the capability to import files using aliasing, this make importing more easy.

## Example

Let's imagine we have the following project structure

```
project
├───components
│   └───button
│       ├───button.module.scss
│	    └───button.component.js
│
└───resources
	└───scss
        ├───colors.scss
	    └───utils.scss
```

If we want to import colors into **button.module.scss** the resulting path should look like this

```scss
@import '../../resources/scss/colors.scss';

/* more scss stuff... */
```

If we use sass-alias the resulting path could look like this

```scss
@import '@scss/colors.scss';

/* more scss stuff... */
```

## Configuration

### using sass **node-sass** or **dart-sass**

```javascript
import path from 'path';
import sass from 'sass';

import SassAlias from 'sass-alias';

sass.renderSync({
	importer: new SassAlias({
		'@scss': path.join(__dirname, 'scss'),
	}).getImporter(),
});
```

### using sass-loader in **webpack**

```javascript
// webpack.config.js
module.exports = {
	/**
	 * other webpack configuration
	 */
	module: {
		rules: [
			{
				test:  /^.*\.(sass|scss)$/,
				use: [
					/**
					 * other loaders
					 */
					{
						loader: 'sass-loader',
						options: {
							sassOptions: {
								importer: importer: new SassAlias({
									'@scss': path.join(__dirname, 'scss'),
								}).getImporter(),
							}
						}
					}
				]
			}
		]
	}
}

```

## License

This project is licensed under the MIT License, see the LICENSE.md file for details
