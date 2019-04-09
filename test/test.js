let { tokenizer } = require('./../src/tokenizer.js');

console.log( tokenizer("{}") );
console.log( tokenizer("{}")[0] );
console.log( tokenizer("{}")[1] );
console.log( tokenizer("{}").length );

console.log( tokenizer("\"Hello, World\"") );
console.log( tokenizer("Hello, World\"") );

console.log( tokenizer(" 5 > 3 ") );
