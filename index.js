const fs = require('fs');
const crypto = require('crypto');

// Часть 1
const input = fs.createReadStream("input.txt");
const output = fs.createWriteStream("output.txt");

const hash = crypto.createHash('md5');

let first = input.pipe(hash);
first    
    .pipe(output);
first
    .pipe(process.stdout);

// Часть 2
const Transform  = require("stream").Transform;
const input2 = fs.createReadStream("input2.txt");
const output2 = fs.createWriteStream("output2.txt");

const hash2 = crypto.createHash('md5');

class CTransform extends Transform {
  constructor(options) {
    super(options);
  }

  _transform(chunk, encoding, callback) {
    hash2.update(chunk);
    this.push(hash2.digest('hex'));
    console.log('---------------\n');
    callback();
  }
}

let second = input2.pipe(new CTransform());
second
    .pipe(process.stdout);
second
    .pipe(output2);