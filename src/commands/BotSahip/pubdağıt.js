const Discord = require("discord.js");
const conf = require("../../configs/sunucuayar.json")
const isimcek = require("../../configs/isimcek.json")
const emojis = require("../../configs/emojis.json")
const ranks = require("../../configs/ranks.json")

module.exports = {
  conf: {
    aliases: ['pubdağıt'],
    name: "pubdağıt",
    help: "pubdağıt",
    category: "sahip",
    owner: true,
  },

  run: async (client, message, args) => {

      let voiceChannel = message.member.voice.channelID;
      if (!voiceChannel) return message.reply("Herhangi bir ses kanalında değilsin!");
      let publicRooms = message.guild.channels.cache.filter(c => c.parentID === conf.publicParents && c.id && c.type === "voice");
      message.member.voice.channel.members.array().forEach((m, index) => {
        setTimeout(() => {
           if (m.voice.channelID !== voiceChannel) return;
           m.voice.setChannel(publicRooms.random().id);
        }, index*1000);
      });
      message.reply(`\`${message.member.voice.channel.name}\` adlı ses kanalındaki üyeler rastgele public odalara dağıtılmaya başlandı!`);
    }

  }