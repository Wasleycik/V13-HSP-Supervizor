const { MessageEmbed, MessageActionRow, MessageSelectMenu } = require("discord.js");
const conf = require("../../configs/sunucuayar.json")
const messageUserChannel = require("../../schemas/messageUserChannel");
const voiceUserChannel = require("../../schemas/voiceUserChannel");
const messageUser = require("../../schemas/messageUser");
const voiceUser = require("../../schemas/voiceUser");
const voiceUserParent = require("../../schemas/voiceUserParent");
const isimler = require("../../schemas/names");
const register = require("../../schemas/registerStats");
const inviterSchema = require("../../schemas/inviter");
const moment = require("moment");
require("moment-duration-format");
const wait = require('node:timers/promises').setTimeout;
 
module.exports = {
    conf: {
      aliases: ["me","stat"],
      name: "stat",
      help: "stat",
      category: "stat",
    },
  
run: async (client, message, args, prefix) => {
  let kanallar = conf.chatChannel;
  if (!message.member.permissions.has(8n) && kanallar.includes(message.channel.id)) return message.reply({ content: `Bu komutu chatte kullanamazsın, bot komut kanallarını kullanınız`, ephemeral: true }).then((e) => setTimeout(() => { e.delete(); }, 10000)); 

    const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;
    const inviterData = await inviterSchema.findOne({ guildID: message.guild.id, userID: member.user.id });
    const total = inviterData ? inviterData.total : 0;
    const regular = inviterData ? inviterData.regular : 0;
    const bonus = inviterData ? inviterData.bonus : 0;
    const leave = inviterData ? inviterData.leave : 0;
    const fake = inviterData ? inviterData.fake : 0;

    const category = async (parentsArray) => {
        const data = await voiceUserParent.find({ guildID: message.guild.id, userID: member.id });
        const voiceUserParentData = data.filter((x) => parentsArray.includes(x.parentID));
        let voiceStat = 0;
        for (var i = 0; i <= voiceUserParentData.length; i++) {
          voiceStat += voiceUserParentData[i] ? voiceUserParentData[i].parentData : 0;
        }
        return moment.duration(voiceStat).format("H [saat], m [dakika] s [saniye]");
      };
      
      const Active1 = await messageUserChannel.find({ guildID: message.guild.id, userID: member.id }).sort({ channelData: -1 });
      const Active2 = await voiceUserChannel.find({ guildID: message.guild.id, userID: member.id }).sort({ channelData: -1 });
      let messageTop;
      Active1.length > 0 ? messageTop = Active1.splice(0, 5).map(x => `<#${x.channelID}>: \`${Number(x.channelData).toLocaleString()} mesaj\``).join("\n") : messageTop = "Veri bulunmuyor."

      const messageData = await messageUser.findOne({ guildID: message.guild.id, userID: member.id });
      const voiceData = await voiceUser.findOne({ guildID: message.guild.id, userID: member.id });
      const messageWeekly = messageData ? messageData.weeklyStat : 0;
      const voiceWeekly = moment.duration(voiceData ? voiceData.weeklyStat : 0).format("H [saat], m [dakika]");
      const messageDaily = messageData ? messageData.dailyStat : 0;
      const voiceDaily = moment.duration(voiceData ? voiceData.dailyStat : 0).format("H [saat], m [dakika]");

      if (member.user.bot) return;
  
      let nameData = await isimler.findOne({ guildID: message.guild.id, userID: member.id });
      let registerData = await register.findOne({ guildID: message.guild.id, userID: member.id });
    
               const roles = member.roles.cache.filter(role => role.id !== message.guild.id).sort((a, b) => b.position - a.position).map(role => `<@&${role.id}>`);
                const rolleri = []
                if (roles.length > 6) {
                    const lent = roles.length - 6
                    let itemler = roles.slice(0, 6)
                    itemler.map(x => rolleri.push(x))
                    rolleri.push(`${lent} daha...`)
                } else {
                    roles.map(x => rolleri.push(x))
                }
                const members = [...message.guild.members.cache.filter(x => !x.user.bot).values()].sort((a, b) => a.joinedTimestamp - b.joinedTimestamp);
                const joinPos = members.map((u) => u.id).indexOf(member.id);
                const previous = members[joinPos - 1] ? members[joinPos - 1].user : null;
                const next = members[joinPos + 1] ? members[joinPos + 1].user : null;
                const bilgi = `${previous ? `**${previous.tag}** > ` : ""}<@${member.id}>${next ? ` > **${next.tag}**` : ""}`
                let üye = message.guild.members.cache.get(member.id)
                let nickname = üye.displayName == member.username ? "" + member.username + " [Yok] " : member.displayName
    
      const yazı = [] 
      if(member.user.username.length > 15) {
      let yarrak = member.user.username.slice(0, 15)
         yazı.push(`${yarrak}...`)  
        } else {
        yazı.push(`${member.user.tag}`)
        }

      const row = new MessageActionRow()
      .addComponents(
          new MessageSelectMenu()
              .setCustomId('top')
              .setPlaceholder(`${yazı}'n detaylarını görüntüle`)
              .addOptions([
                  { label: 'Genel Sıralama', description: `${message.guild.name} sunucusunun Top20 istatistik sıralaması`, value: 'stat1', emoji: `📊` },
                  { label: 'Ses İstatistik Detay', description: 'Ses istatistiklerinin detaylı bilgilerini görüntülemektedir', value: 'stat2', emoji: `🎤` },
                  { label: 'Mesaj İstatistik Detay', description: 'Mesaj istatistiklerinin detaylı bilgilerini görüntülemektedir', value: 'stat3', emoji: `✉️` },
                  { label: 'Kullanıcı Bilgi', description: `${message.guild.name} sunucusunun Top20 istatistik sıralaması`, value: 'stat4', emoji: `⚔️` },
                  { label: `İşlem İptal`, value: 'stat5', emoji: {id: "909485171240218634"}},
               ]),
      );

const embed = new MessageEmbed()
.setAuthor({ name: message.guild.name, iconURL: message.guild.iconURL({ dynamic: true, size: 2048 })}).setColor("RANDOM")
.setDescription(`
${member.toString()}, (${member.roles.highest}) üyesinin \` ${message.guild.name} \` sunucusundaki \`${moment(Date.now()).format("LLL")}\` tarihinden itibaren Tüm zamanlar ve haftalık istatistik verileri belirtilmiştir.`)
.addFields(
{ name: "__**Toplam Ses**__",  value: `\`\`\`cs\n${moment.duration(voiceData ? voiceData.topStat : 0).format("H [saat], m [dakika]")}\n\`\`\``, inline: true },
{ name: "__**Toplam Mesaj**__",  value: `\`\`\`cs\n${messageData ? messageData.topStat : 0} mesaj\n\`\`\``, inline: true },
{ name:"__**Toplam Davet**__",  value: `\`\`\`cs\n${inviterData ? `${total} regular`: "Veri bulunmuyor."} \n\`\`\``, inline: true },
)      
.addField(`
📢 **Sesli İstatistiği**`, `

\`•\` Haftalık Ses Aktifliği: \` ${moment.duration(voiceData ? voiceData.weeklyStat : 0).format("H [saat], m [dakika]")} \`
\`•\` Günlük Ses Aktifliği: \` ${moment.duration(voiceData ? voiceData.dailyStat : 0).format("H [saat], m [dakika]")} \`
`, false)
.addField(`
💭 **Yazı İstatistiği**`, `

\`•\` Haftalık Atılan Mesaj: \` ${Number(messageWeekly).toLocaleString()} mesaj \`
\`•\` Günlük Atılan Mesaj: \` ${Number(messageDaily).toLocaleString()} mesaj \`

⭐️ **Davetleri:** **${total}** (**${regular}** gerçek, **${bonus}** bonus, **${leave}** ayrılmış, **${fake}** fake)
`, false);

    let msg = await message.channel.send({ embeds: [embed], components: [row]})

    var filter = (xd) => xd.user.id === message.author.id;
    let collector =  msg.createMessageComponentCollector({ filter, componentType: 'SELECT_MENU', time: 99999999 })
    
collector.on("collect", async (interaction) => {

if(interaction.values[0] === "stat1") {
await interaction.deferUpdate();

const voiceUsersData = await voiceUser.find({ guildID: message.guild.id }).sort({ topStat: -1 });
let list = voiceUsersData
.filter((x) => message.guild.members.cache.has(x.userID))
.splice(0, 10)
.map((x, index) => `${x.userID === member.id ? `\` ${index+1} \` <@${x.userID}> \`${moment.duration(x.topStat).format("H [saat], m [dakika]")}\` **(Sen)**` : `\` ${index+1} \` <@${x.userID}> \`${moment.duration(x.topStat).format("H [saat], m [dakika]")}\``}`)
.join("\n");

const embeds = new MessageEmbed()
.setDescription(`
🎉 Aşağıda **${message.guild.name}** sunucusunun genel sohbet( \`ses\` ) sıralaması listelenmektedir.

${list.length > 0 ? list : "Veri Bulunmuyor."}

Genel sohbet( \`ses\` ) sıralaması \`${moment(Date.now()).format("LLL")}\` tarihinde otomatik olarak güncellenmiştir.`)
.setAuthor({ name: message.guild.name, iconURL: message.guild.iconURL({ dynamic: true, size: 2048 })})
.setThumbnail(message.guild.iconURL({ dynamic: true, size: 2048 }));

interaction.followUp({ embeds: [embeds], ephemeral: true })
/////
const messageUsersData = await messageUser.find({ guildID: message.guild.id }).sort({ topStat: -1 });
let list2 = messageUsersData
.filter((x) => message.guild.members.cache.has(x.userID))
.splice(0, 10)
.map((x, index) => `${x.userID === member.id ? `\` ${index+1} \` <@${x.userID}> \`${Number(x.topStat).toLocaleString()} mesaj\` **(Sen)**` : `\` ${index+1} \` <@${x.userID}> \`${Number(x.topStat).toLocaleString()} mesaj\``}`)
.join("\n");

const embeds2 = new MessageEmbed()
.setDescription(`
🎉 Aşağıda **${message.guild.name}** sunucusunun genel sohbet( \`mesaj\` ) sıralaması listelenmektedir.
    
${list2.length > 0 ? list2 : "Veri Bulunmuyor."}
    
Genel sohbet( \`mesaj\` ) sıralaması \`${moment(Date.now()).format("LLL")}\` tarihinde otomatik olarak güncellenmiştir.`)
.setAuthor({ name: message.guild.name, iconURL: message.guild.iconURL({ dynamic: true, size: 2048 })})
.setThumbnail(message.guild.iconURL({ dynamic: true, size: 2048 }));
 
interaction.followUp({ embeds: [embeds2], ephemeral: true })
}

if(interaction.values[0] === "stat2") {
await interaction.deferUpdate();
const embeds = new MessageEmbed()
.setDescription(`🎉 Aşağıda **${message.guild.name}** sunucusunun genel sohbet( \`ses\` ) sıralaması listelenmektedir.`)
.addFields(
{ name: "__**Toplam Ses**__",  value: `\`\`\`cs\n${moment.duration(voiceData ? voiceData.topStat : 0).format("H [saat], m [dakika]")}\n\`\`\``, inline: true },
{ name: "__**Haftalık Ses**__",  value: `\`\`\`cs\n${voiceWeekly}\n\`\`\``, inline: true },
{ name:"__**Günlük Ses**__",  value: `\`\`\`cs\n${voiceDaily}\n\`\`\``, inline: true },
)
.addField(`⭐️ **Sesli Sohbet İstatistiği**`, `
\`•\` Toplam: \`${moment.duration(voiceData ? voiceData.topStat : 0).format("H [saat], m [dakika]")}\`
\`•\` Public Odalar: \` ${await category(conf.publicParents)} \`
\`•\` Secret Odalar: \` ${await category(conf.privateParents)} \`
\`•\` Alone Odalar: \` ${await category(conf.aloneParents)} \`
\`•\` Yönetim Yetkili Odaları: \` ${await category(conf.funParents)} \`
\`•\` Kayıt Odaları: \` ${await category(conf.registerParents)} \`

Genel sohbet( \`ses\` ) sıralaması \`${moment(Date.now()).format("LLL")}\` tarihinde otomatik olarak güncellenmiştir.
`, false)
.setAuthor({ name: message.guild.name, iconURL: message.guild.iconURL({ dynamic: true, size: 2048 })})
.setThumbnail(message.guild.iconURL({ dynamic: true, size: 2048 }));
msg.edit({ embeds: [embeds], components : [row] })}

if(interaction.values[0] === "stat3") {
await interaction.deferUpdate();
const embeds = new MessageEmbed()
.setDescription(`🎉 Aşağıda **${message.guild.name}** sunucusunun genel sohbet( \`mesaj\` ) sıralaması listelenmektedir.`)
.addFields(
{ name: "__**Toplam Mesaj**__",  value: `\`\`\`cs\n${messageData ? messageData.topStat : 0} mesaj\n\`\`\``, inline: true },
{ name: "__**Haftalık Mesaj**__",  value: `\`\`\`cs\n${Number(messageWeekly).toLocaleString()} mesaj\n\`\`\``, inline: true },
{ name:"__**Günlük Mesaj**__",  value: `\`\`\`cs\n${Number(messageDaily).toLocaleString()} mesaj\n\`\`\``, inline: true },
)
.addField(`⭐️ **Mesaj İstatistiği**`, `
${messageTop}

Genel sohbet( \`mesaj\` ) sıralaması \`${moment(Date.now()).format("LLL")}\` tarihinde otomatik olarak güncellenmiştir.
`, false)
.setAuthor({ name: message.guild.name, iconURL: message.guild.iconURL({ dynamic: true, size: 2048 })})
.setThumbnail(message.guild.iconURL({ dynamic: true, size: 2048 }));
msg.edit({ embeds: [embeds], components : [row] })}

  if(interaction.values[0] === "stat4") {
  await interaction.deferUpdate();

const embeds = new MessageEmbed()
.setDescription(`🎉 Aşağıda ${member} kullanıcısının kullanıcı bilgisi görüntülenmektedir.`)  
.addField(`❯ Kullanıcı Bilgisi`,`
\` • \` Hesap: ${member}
\` • \` Kullanıcı ID: ${member.id}
\` • \` Kuruluş Tarihi: <t:${Math.floor(member.user.createdTimestamp / 1000)}:R>
`)
  .addField(`❯ Sunucu Bilgisi`,`
\` • \` Sunucu İsmi: ${nickname}
\` • \` Katılım Tarihi: <t:${Math.floor(member.joinedAt / 1000)}:R>
\` • \` Katılım Sırası: ${(message.guild.members.cache.filter(a => a.joinedTimestamp <= member.joinedTimestamp).size).toLocaleString()}/${(message.guild.memberCount).toLocaleString()}
\` • \` Katılım Bilgisi: ${bilgi}

\` • \` Bazı Rolleri: (${rolleri.length}): ${rolleri.join(", ")}
\` • \` İsim geçmişi:  **${nameData ? `${nameData.names.length}` : "0"}** 
${nameData ? nameData.names.splice(0, 1).map((x, i) => `\` ${x.name} \` ${x.sebep ? `(${x.sebep})` : ""} ${x.rol ? `(${x.rol})` : ""}`).join("\n") : ""}
`)
if (member.permissions.has("ADMINISTRATOR") || conf.teyitciRolleri.some(x => member.roles.cache.has(x))) 
embeds.addField(`❯ Yetkili Bilgisi`,
`• Toplam kayıt: ${registerData ? registerData.top : 0} • Erkek kayıt : ${registerData ? registerData.erkek : 0} • Kadın kayıt : ${registerData ? registerData.kız : 0} •`)
.setAuthor({ name: message.guild.name, iconURL: message.guild.iconURL({ dynamic: true, size: 2048 })})
.setThumbnail(message.guild.iconURL({ dynamic: true, size: 2048 }));

  msg.edit({ embeds: [embeds], components : [row] })}

  if(interaction.values[0] === "stat5") {
  await interaction.deferUpdate();
  if(msg) msg.delete();
}

})
},
};
  
