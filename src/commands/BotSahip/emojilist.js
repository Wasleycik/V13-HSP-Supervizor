const { Client, Message, Util} = require("discord.js");
const Discord = require("discord.js");
const conf = require("../../configs/sunucuayar.json");

module.exports = {
  conf: {
    aliases: ["emojilist","emojiliste"],
    name: "emojilist",
    help: "emojilist (Emojileri Idleri İle Listeler)",
    category: "sahip",
    owner: true,
  },
 
    run: async (client, message, args, durum, kanal) => {
    if(!message.member.permissions.has('ADMINISTRATOR')) return;
    let veri = message.guild.emojis.cache.map(emoji => `(${emoji.id}) ${emoji.toString()}`).join('\n')
    const arr = Discord.Util.splitMessage(veri, { maxLength: 1950, char: "\n" });
    arr.forEach(element => {
       message.channel.send(Discord.Formatters.codeBlock("diff", element));
    });
  }
};