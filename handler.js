"use strict";

const co = require("co");

// Your first function handler
module.exports.hello = (event, context, cb) => {
  co(function*(){
    switch (event.path.p) {
    case "0":
      return {result: "ok"};
    case "1":
      throw new HogeError("hogehoge",[
        {"reason1": "hogeがあれなんでだめ"},
        {"reason2": "これがhogeなんでだめ"}
      ]);
    default:
      throw new FugaError("fugafuga",[
        {"reason1": "アレがこれなんでだめ"},
        {"reason2": "これがアレなんでだめ"}
      ]);
    }
  }).then(result => {
    cb(null, result);
  }).catch(cb);
};


class HogeError extends Error {
  constructor(msg, details) {
    const obj = {
      code: "Forbidden",
      message: msg,
      errors: details
    };
    super(JSON.stringify(obj));
  }
}

class FugaError extends Error {
  constructor(msg, details) {
    const obj = {
      code: "BadRequest",
      message: msg,
      errors: details
    };
    super(JSON.stringify(obj));
  }
}