const moment = require("moment");
const cezapuan = require("../../schemas/cezapuan")
const ceza = require("../../schemas/ceza")
moment.locale("tr");
const conf = require("../../configs/sunucuayar.json")
const isimcek = require("../../configs/isimcek.json")
const emojis = require("../../configs/emojis.json")
const messageUserChannel = require("../../schemas/messageUserChannel");
module.exports = {
  conf: {
    aliases: ["cezapuan","cp"],
    name: "cezapuan",
    help: "cezapuan <Kişi/ID>",
    category: "cezalandırma",
  },

  run: async (client, message, args, embed) => {
if (!message.member.permissions.has("BAN_MEMBERS") &&  !conf.banHammer.some(x => message.member.roles.cache.has(x))) { message.channel.send({ content:"Yeterli yetkin bulunmuyor!"}).then((e) => setTimeout(() => { e.delete(); }, 5000));
return 
}
const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;
if (!member) { message.channel.send({ content:"Böyle bir kullanıcı bulunamadı!"}).then((e) => setTimeout(() => { e.delete(); }, 5000));
return 
}
const cezaData = await ceza.findOne({ guildID: conf.GuildID, userID: member.id });
const cezapuanData = await cezapuan.findOne({ userID: member.user.id });
message.reply({ content:`${member} kişisinin toplamda \`${cezapuanData ? cezapuanData.cezapuan : 0}\` ceza puanı ve (Toplam **${cezaData ? cezaData.ceza.length : 0}** Ceza) olarak gözükmekte!`})
},
};

