# PostCSS Rewrite Composes

## The problem
When using your own internal component library or libraries like Tachyons & Basscss, with PostCSS + CSSModules you often want to compose the utility classes from these libraries to build more complex components in your app.

**However what you don't want to do is have to write paths like the following:**
```css
  .Tachyons {
    composes: aspect-ration from 'tachyons/src/_aspect-ratios.css';
    composes : bg-right from 'tachyons/css/tachyons.css';
  }
  .Basscss {
    composes: mr2 from 'basscss/css/basscss.css';  
  }
  .MyFramework {
    composes: Input from 'MyFramework/build/es6/Input/Input.css';
  }
```

**Instead we would like to write them like to write them like this**

```css
  .Tachyons {
    composes: aspect-ration from 'tachyons/_aspect-ratios.css';
    composes : bg-right from 'tachyons/tachyons.css';
  }
  .Basscss {
    composes: mr2 from 'basscss/basscss.css';  
  }
  .MyFramework {
    composes: Input from 'MyFramework/Input/Input.css';
  }
```

**So that they match our JS imports**
```js
  import Input from 'MyFramework/Input/Input.js'
```
While it's true you could use an alias in webpack for building your bundle and even use it for running test. I prefer to run test separate of webpack when developing and use a similar plugin for babel that also rewrites my imports based on wether I'm running the code in webpack or running it in my test suit. By this I mean my component library has both an es6 build and commonjs build. Webpack uses the former and mocha the later.

## [Example Usage](example.js)
```js
  import rewireComposes from 'postcss-rewrite-composes'
  postcss([rewireComposes({
    prefix: 'mercury-storybook',
    subPath: 'build/es6'
  })])
```
**Run** ```npm run example``` to see example output.

## Options
### prefix
- Type: ```string```
- Alias path prefix **Note no slashes at the end of the prefix.**

### subPath
- Type: ```string```
- Subpath removed when you wrote your aliased composes rules. **Note no slashes at the beginning or end of the subpath.**
