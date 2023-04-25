const conf = require("../../configs/sunucuayar.json")
const moment = require("moment");
moment.locale("tr");
const { red } = require("../../configs/emojis.json")
let table = require("string-table");
const client = global.bot;

module.exports = {
  conf: {
    aliases: ["ysay","yetkilises","sesteolmayan"],
    name: "ysay",
    help: "ysay",
    category: "yönetim",
  },

  run: async (client, message, args, embed, durum) => {

  if (!message.guild) return;
  if (!message.member.permissions.has(8n)) return

      var tyy = message.guild.members.cache.filter(yetkili => yetkili.roles.cache.has(conf.teyitciRol)).map(mr => mr).join(', ')
      var ToplamYetkili = message.guild.members.cache.filter(yetkili => yetkili.roles.cache.has(conf.staffs[0])).size
      var SesteOlanYetkili = message.guild.members.cache.filter(yetkili => yetkili.roles.cache.has(conf.staffs[0])).filter(yetkilises => yetkilises.voice.channel).size
      var AktifYetkili = message.guild.members.cache.filter(yetkili => yetkili.roles.cache.has(conf.staffs[0]) && yetkili.presence && yetkili.presence.status !== "offline").size
      let SesteOlmayanYetkili = message.guild.members.cache.filter(yetkili => yetkili.roles.cache.has(conf.staffs[0])).filter(yetkilises => !yetkilises.voice.channel && yetkilises.presence && yetkilises.presence.status != "offline").size

      let Ozi = message.guild.members.cache.filter(yetkili => yetkili.roles.cache.has(conf.staffs[0])).filter(yetkilises => !yetkilises.voice.channel  && yetkilises.presence && yetkilises.presence.status != "offline")

      let tablo = [{
        "TOPLAM": ToplamYetkili + " kişi",
        "AKTİF": AktifYetkili + " kişi",
        "SESTE": SesteOlanYetkili + " kişi",
        "SESTE OLMAYAN": SesteOlmayanYetkili + " kişi"
      }]

      message.channel.send({ content: `\`\`\`js\n${table.create(tablo)}\`\`\`\n **Tüm Yetkililer**\n${tyy}\n\n**Seste Olmayan Yetkililer**\n${Ozi.map(yetkili => `${yetkili}`).join(', ')}`})
    

    
}}