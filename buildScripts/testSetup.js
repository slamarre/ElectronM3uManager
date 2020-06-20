// this file isnt transpiled so mus use commonjs and ES5

//register bable to transpile before our tests run
require('babel-register')();

//diable webpack features that mocha doesnt understand.
require.extensions['.css'] = function () {};
