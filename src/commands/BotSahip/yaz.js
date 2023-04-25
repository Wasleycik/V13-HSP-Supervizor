const conf = require("../../configs/sunucuayar.json")
const isimcek = require("../../configs/isimcek.json")
const emojis = require("../../configs/emojis.json")
module.exports = {
  conf: {
    aliases: [],
    name: "yaz",
    help: "yaz <Mesaj/Text>",
    category: "sahip",
    owner: true,
  },

  run: async (client, message, args) => {
    if(!args[0]) return;
    message.delete();
    message.channel.send({ content: args.join(' ')});
  },
};

  