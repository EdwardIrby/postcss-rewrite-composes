const postcss = require('postcss');
const aliasComposes = require('../index.js');
const test = require('tape');
test('Test rewritten alias', (t) =>{;
  const options = {
    prefix: 'mercury-storybook',
    subPath: 'build/es6'
  }
  const run = (input, output, opts) => {
    return postcss([ aliasComposes(opts) ]).process(input)
    .then( result => {
      t.equal(result.css, output, `composes rule should equal ${output}`);
    });
  }
  run(
    ".a {composes: ClassToBeComposes from 'mercury-storybook/a.css';}",
    ".a {composes: ClassToBeComposes from 'mercury-storybook/build/es6/a.css';}",
    options
  );
  run(
    ".a {composes: b;}",
    ".a {composes: b;}",
    options
  );
  run(
    '.a {composes: ClassToBeComposes from "mercury-storybook/a.css";}',
    '.a {composes: ClassToBeComposes from "mercury-storybook/build/es6/a.css";}',
    options
  );
  t.end();
})
