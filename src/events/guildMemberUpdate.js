const { MessageEmbed } = require("discord.js")
const conf = require("../configs/sunucuayar.json")
const isimcek = require("../configs/isimcek.json")
const emojis = require("../configs/emojis.json")
const roller = require("../schemas/rolveridb")
var moment = require('moment-timezone');
moment().tz("Europe/Istanbul").format('LL');
const client = global.bot;
module.exports = async (oldMember, newMember) => {
  await newMember.guild.fetchAuditLogs({
    type: "MEMBER_ROLE_UPDATE"
  }).then(async (audit) => {
    let ayar = audit.entries.first()
    let hedef = ayar.target
    let yapan = ayar.executor
    if (yapan.bot) return
    newMember.roles.cache.forEach(async role => {
      if (!oldMember.roles.cache.has(role.id)) {
        const emed = new MessageEmbed()
          .setAuthor({ name: hedef.tag, iconURL: hedef.displayAvatarURL({ dynamic: true }) })
          .setColor("RANDOM")
          .setDescription(`
                    Kişinin Eklenen Ve Alınan Tüm Rollerine Bakmak İçin \`!rollog @wasley\` Komutunu Kullan 

                    \`•\` **Rol Eklenen kişi :** ${hedef} - (\`${hedef.id}\`)
                    \`•\` **Rolün Eklendiği Zaman :** <t:${Math.floor(Date.now() / 1000)}> (<t:${Math.floor(Date.now() / 1000)}:R>)`)
          .addFields(
            { name: `\`•\` Rolü Ekleyen Kişi`, value: `${yapan} - **${yapan.id}**`, inline: false },
            { name: `\`•\` Eklenen Rol`, value: `${role} - **${role.id}**`, inline: false }
          )
          .setFooter({ text: yapan.tag, iconURL: yapan.displayAvatarURL({ dynamic: true }) })
          .setTimestamp()
          client.channels.cache.find(x => x.name.includes(isimcek.kanalcek.rollog)).wsend({ embeds: [emed]})
        roller.findOne({
          user: hedef.id
        }, async (err, res) => {
          if (!res) {
            let arr = []
            arr.push({
              rol: role.id,
              mod: yapan.id,
              user: hedef.id,
              tarih: moment(Date.now()).format("LLL"),
              state: "Ekleme"
            })
            let newData = new roller({
              user: hedef.id,
              roller: arr
            })
            newData.save().catch(e => console.log(e))
          } else {
            res.roller.push({
              rol: role.id,
              mod: yapan.id,
              user: hedef.id,
              tarih: moment(Date.now()).format("LLL"),
              state: "Ekleme"
            })
            res.save().catch(e => console.log(e))
          }
        })
      }
    });
    oldMember.roles.cache.forEach(async role => {
      if (!newMember.roles.cache.has(role.id)) {
        const emeed = new MessageEmbed()
        .setAuthor({ name: hedef.tag, iconURL: hedef.displayAvatarURL({ dynamic: true }) })
        .setColor("RANDOM")
          .setDescription(`
                    Kişinin Eklenen Ve Alınan Tüm Rollerine Bakmak İçin \`!rollog @wasley\` Komutunu Kullan 

                    \`•\` **Rol Alanan kişi :** ${hedef} - (\`${hedef.id}\`)
                    \`•\` **Rolün Alındığı Zaman :** <t:${Math.floor(Date.now() / 1000)}> (<t:${Math.floor(Date.now() / 1000)}:R>)`)
          .addFields(
            { name: `\`•\` Rolü Alan Kişi`, value: `${yapan} - **${yapan.id}**`, inline: false },
            { name: `\`•\` Alınan Rol`, value: `${role} - **${role.id}**`, inline: false }
          )
          .setFooter({ text: yapan.tag, iconURL: yapan.displayAvatarURL({ dynamic: true }) })
          .setTimestamp()
          client.channels.cache.find(x => x.name.includes(isimcek.kanalcek.rollog)).wsend({ embeds: [emeed]})
        roller.findOne({
          user: hedef.id
        }, async (err, res) => {
          if (!res) {
            let arr = []
            arr.push({
              rol: role.id,
              mod: yapan.id,
              user: hedef.id,
              tarih: moment(Date.now()).format("LLL"),
              state: "Kaldırma"
            })
            let newData = new roller({
              user: hedef.id,
              roller: arr
            })
            newData.save().catch(e => console.log(e))
          } else {
            res.roller.push({
              rol: role.id,
              mod: yapan.id,
              user: hedef.id,
              tarih: moment(Date.now()).format("LLL"),
              state: "Kaldırma"
            })
            res.save().catch(e => console.log(e))
          }
        })
      }
    });
  })
}
module.exports.conf = {
  name: "guildMemberUpdate",
};