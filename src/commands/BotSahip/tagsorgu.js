const Discord = require("discord.js")
const moment = require("moment");
moment.locale("tr");

module.exports = {
  conf: {
    aliases: ["tag-sorgu","tagsorgu","taginfo"],
    name: "tag-info",
    help: "tag-info",
    category: "sahip",
    owner: true,
  },
run: async (client, message, args, embed, prefix) => { 
 if(!message.member.permissions.has("ADMINISTRATOR")) return message.channel.send({content: "`Bu komutu kullanmak için **YÖNETİCİ** yetkisine sahip olmalısın!`"});
const cst = args.slice(0).join(" ")
if(!cst) return message.reply("Bir Tag Belirt!")
const sonuc = message.guild.members.cache.filter(mr => mr.user.username.includes(cst)).size
const sonuc2 = message.guild.members.cache.filter(mr => mr.user.username.includes(cst)).map(mr => mr).join('--')

message.reply("Belirtilen Taga Sahip Bu Sunucuda `"+sonuc+"` Kişi Var!")
 message.channel.send(`**Tagdaki Üyeler** ; \n${sonuc2 || "Kimse yok"}`)


}
}