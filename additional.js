"use strict";

const Readable  = require("stream").Readable;
const Writable  = require("stream").Writable;
const Transform  = require("stream").Transform;

const HIGH_WATER_MARK = 1;

function getRandomInRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

class RandReadable extends Readable {
    constructor(options) {
        options.objectMode = true;
        super(options);
    }
    
    _read(size) {
        let i = 0;
        while (i < 1) {                            
            i++;
            this.push(getRandomInRange(1, 9));  //цифры от 1 до 9 включительно
        }
    }
    
}

class ConsoleWritable extends Writable {
    constructor(options) {
        options.objectMode = true;
        super(options);
    }
    
    _write (chunk, encoding, callback) {
       console.log(chunk.toString());
        callback();
    }
}

class CTransform extends Transform {
    
    constructor(options) {
    options.objectMode = true;
    super(options);
  }

  _transform(chunk, encoding, callback) {
    let tmp = parseInt(chunk.toString()) * 2;
      setTimeout(() => {
        this.push(tmp*2);
        callback();
    }, 1000);
  }
}

let options = {highWaterMark: HIGH_WATER_MARK};

(new RandReadable(options))
    .pipe(new CTransform(options))
    .pipe(new ConsoleWritable(options))
