const Cryptr = require("cryptr");
const cryptr = new Cryptr(process.env.CRYPTR);

exports.encrypt = (string) => cryptr.encrypt(string);
exports.decrypt = (string) => cryptr.decrypt(string);
