const { Schema, model } = require("mongoose");

const schema = Schema({
	messageID: { type: String, default: "" },
	katilan: { type: Array, default: [] },
  time: { type: String, default: "" },
});

module.exports = model("cekilis", schema);