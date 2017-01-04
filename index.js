'use strict';
const postcss = require('postcss');
module.exports = postcss.plugin('postcss-alias-composes', (options = {}) => {
  return function (css) {
    css.walkRules(rule => {
      rule.walkDecls('composes', decl => {
        const string = decl.value;
        const re = new RegExp(`("|')(${options.prefix})`);
        const prefix = re.exec(string);
        if(prefix){
          const modulePath = `${options.prefix}/${options.subPath}`
          decl.value = string.replace(options.prefix, modulePath)
        }
      });
    });
  }
})
