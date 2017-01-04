const rewireComposes = require('./index.js');
const fs = require('fs');
const postcss = require('postcss');
fs.readFile('example/src/test.css', (err, css) => {
  postcss([rewireComposes({
    prefix: 'mercury-storybook',
    subPath: 'build/es6'
  })])
  .process(css, { from: 'example/src/test.css', to: 'example/dest/test.css' })
  .then(result => {
    fs.writeFile('example/dest/test.css', result.css);
    if ( result.map ) fs.writeFile('example/dest/test.css.map', result.map);
  });
});
