const moment = require("moment");
require("moment-duration-format");
const messageUser = require("../../schemas/messageUser");
const voiceUser = require("../../schemas/voiceUser");
const coin = require("../../schemas/coin");
const dolar = require("../../schemas/dolar");
const db = require("../../schemas/inviter");
const regstats = require("../../schemas/registerStats");
const { MessageEmbed, MessageActionRow, MessageSelectMenu } = require("discord.js");
const conf = require("../../configs/sunucuayar.json")

module.exports = {
    conf: {
      aliases: ["topstat","ts","top"],
      name: "topstat",
      help: "topstat",
      category: "stat",
    },
  
run: async (client, message, args, prefix) => {
  let kanallar = conf.chatChannel;
  if (!message.member.permissions.has(8n) && kanallar.includes(message.channel.id)) return message.reply({ content: `Bu komutu chatte kullanamazsın, bot komut kanallarını kullanınız`, ephemeral: true }).then((e) => setTimeout(() => { e.delete(); }, 10000)); 

    const row = new MessageActionRow()
    .addComponents(
        new MessageSelectMenu()
            .setCustomId('top')
            .setPlaceholder('Sıralama kategorisi seçimi yapın!')
            .addOptions([
                { label: 'Sunucunun En İyileri', description: 'En iyi istatistiğine sahip üyeler', value: 'top1', emoji: '🏆' },
                { label: 'Genel Ses Sıralaması', description: 'Tüm zamanların 20 genel ses sıralaması', value: 'top2', emoji: '🎧' },
                { label: 'Haftalık Ses Sıralaması', description: 'Bu haftanın 20 ses sıralaması', value: 'top3', emoji: '🎧' },
                { label: 'Genel Mesaj Sıralaması', description: 'Tüm zamanların 20 genel mesaj sıralaması', value: 'top4', emoji: '📑' },
                { label: 'Haftalık Mesaj Sıralaması', description: 'Bu haftanın 20 mesaj sıralaması', value: 'top5', emoji: '📑' },
                { label: 'Genel Yetkili Sıralaması', description: 'Tüm zamanların yetkili sıralaması', value: 'top6', emoji: '🔑' },
                { label: 'Genel Zengin Sıralaması', description: 'Tüm zamanların zengin sıralaması', value: 'top7', emoji: '💰' },
                { label: 'Genel Davet Sıralaması', description: 'Tüm zamanların davet sıralaması', value: 'top8', emoji: '📩' },
                { label: 'Genel Kayıt Sıralaması', description: 'Tüm zamanların kayıt sıralaması', value: 'top9', emoji: '📋' },
            ]),
    );
   
const embed = new MessageEmbed()
.setAuthor({ name: message.guild.name, iconURL: message.guild.iconURL({ dynamic: true, size: 2048 })})
.setDescription(`Aşağıdaki menüden **${message.guild.name}** sunucusunun \`${moment(Date.now()).format("LLL")}\` tarihli Tüm zamanlar ve haftalık istatistik verilerini listeleyebilirsiniz.`)
.setThumbnail(message.guild.iconURL({ dynamic: true, size: 2048 }));

  let msg = await message.channel.send({ embeds: [embed], components: [row]})

    var filter = (xd) => xd.user.id === message.author.id;
    let collector =  msg.createMessageComponentCollector({ filter, componentType: 'SELECT_MENU', time: 99999999 })
  
collector.on("collect", async (interaction) => {
if(interaction.values[0] === "top1") {
await interaction.deferUpdate();

const messageUsersData1 = await messageUser.find({ guildID: message.guild.id }).sort({ topStat: -1 });
const voiceUsersData1 = await voiceUser.find({ guildID: message.guild.id }).sort({ topStat: -1 });
const mesajeniyi = messageUsersData1.splice(0, 1).map((x, index) => `<@${x.userID}>`);
const seseniyi = voiceUsersData1.splice(0, 1).map((x, index) => `<@${x.userID}>`);
///
const messageUsersData2 = await messageUser.find({ guildID: message.guild.id }).sort({ weeklyStat: -1 });
const voiceUsersData2 = await voiceUser.find({ guildID: message.guild.id }).sort({ weeklyStat: -1 });
const mesajhaftanıneniyisi = messageUsersData2.splice(0, 1).map((x, index) => `<@${x.userID}>`);
const seshaftanıneniyisi = voiceUsersData2.splice(0, 1).map((x, index) => `<@${x.userID}>`);

const embeds = new MessageEmbed()
.setDescription(`
🎉 Aşağıda **${message.guild.name}** sunucusunun en iyileri sıralanmaktadır.

\` 👑 En İyi Ses \` ${seseniyi.length > 0 ? seseniyi : "Veri Bulunmuyor."}
\` 👑 En İyi Mesaj \` ${mesajeniyi.length > 0 ? mesajeniyi : "Veri Bulunmuyor."}

\` 👑 Haftalık Ses Sıralama \` ${seshaftanıneniyisi.length > 0 ? seshaftanıneniyisi : "Veri Bulunmuyor."}
\` 👑 Haftalık Mesaj Sıralama \` ${mesajhaftanıneniyisi.length > 0 ? mesajhaftanıneniyisi : "Veri Bulunmuyor."}

En iyiler \`${moment(Date.now()).format("LLL")}\` tarihinde otomatik olarak güncellenmiştir.`)
.setAuthor({ name: message.guild.name, iconURL: message.guild.iconURL({ dynamic: true, size: 2048 })})
.setThumbnail(message.guild.iconURL({ dynamic: true, size: 2048 }));

msg.edit({ embeds: [embeds], components : [row] })}

if(interaction.values[0] === "top2") {
await interaction.deferUpdate();
const voiceUsersData = await voiceUser.find({ guildID: message.guild.id }).sort({ topStat: -1 });
let list = voiceUsersData
.filter((x) => message.guild.members.cache.has(x.userID))
.splice(0, 20)
.map((x, index) => `${x.userID === message.author.id ? `\` ${index+1} \` <@${x.userID}> \`${moment.duration(x.topStat).format("H [saat], m [dakika]")}\` **(Sen)**` : `\` ${index+1} \` <@${x.userID}> \`${moment.duration(x.topStat).format("H [saat], m [dakika]")}\``}`)
.join("\n");

const embeds = new MessageEmbed()
.setDescription(`
🎉 Aşağıda **${message.guild.name}** sunucusunun genel sohbet( \`ses\` ) sıralaması listelenmektedir.

${list.length > 0 ? list : "Veri Bulunmuyor."}

Genel sohbet( \`ses\` ) sıralaması \`${moment(Date.now()).format("LLL")}\` tarihinde otomatik olarak güncellenmiştir.`)
.setAuthor({ name: message.guild.name, iconURL: message.guild.iconURL({ dynamic: true, size: 2048 })})
.setThumbnail(message.guild.iconURL({ dynamic: true, size: 2048 }));

msg.edit({ embeds: [embeds], components : [row] })}

if(interaction.values[0] === "top3") {
await interaction.deferUpdate();
const voiceUsersData3 = await voiceUser.find({ guildID: message.guild.id }).sort({ weeklyStat: -1 });
let list = voiceUsersData3
.filter((x) => message.guild.members.cache.has(x.userID))
.splice(0, 20)
.map((x, index) => `${x.userID === message.author.id ? `\` ${index+1} \` <@${x.userID}> \`${moment.duration(x.topStat).format("H [saat], m [dakika]")}\` **(Sen)**` : `\` ${index+1} \` <@${x.userID}> \`${moment.duration(x.topStat).format("H [saat], m [dakika]")}\``}`)
.join("\n");

const embeds = new MessageEmbed()
.setDescription(`
🎉 Aşağıda **${message.guild.name}** sunucusunun bu haftanın sohbet( \`ses\` ) sıralaması listelenmektedir.
  
${list.length > 0 ? list : "Veri Bulunmuyor."}
  
Bu haftanın sohbet( \`ses\` ) sıralaması \`${moment(Date.now()).format("LLL")}\` tarihinde otomatik olarak güncellenmiştir.`)
.setAuthor({ name: message.guild.name, iconURL: message.guild.iconURL({ dynamic: true, size: 2048 })})
.setThumbnail(message.guild.iconURL({ dynamic: true, size: 2048 }));
  
msg.edit({ embeds: [embeds], components : [row] })}

if(interaction.values[0] === "top4") {
await interaction.deferUpdate();
const messageUsersData = await messageUser.find({ guildID: message.guild.id }).sort({ topStat: -1 });
let list = messageUsersData
.filter((x) => message.guild.members.cache.has(x.userID))
.splice(0, 20)
.map((x, index) => `${x.userID === message.author.id ? `\` ${index+1} \` <@${x.userID}> \`${Number(x.topStat).toLocaleString()} mesaj\` **(Sen)**` : `\` ${index+1} \` <@${x.userID}> \`${Number(x.topStat).toLocaleString()} mesaj\``}`)
.join("\n");

const embeds = new MessageEmbed()
.setDescription(`
🎉 Aşağıda **${message.guild.name}** sunucusunun genel sohbet( \`mesaj\` ) sıralaması listelenmektedir.
    
${list.length > 0 ? list : "Veri Bulunmuyor."}
    
Genel sohbet( \`mesaj\` ) sıralaması \`${moment(Date.now()).format("LLL")}\` tarihinde otomatik olarak güncellenmiştir.`)
.setAuthor({ name: message.guild.name, iconURL: message.guild.iconURL({ dynamic: true, size: 2048 })})
.setThumbnail(message.guild.iconURL({ dynamic: true, size: 2048 }));
 
msg.edit({ embeds: [embeds], components : [row] })}

if(interaction.values[0] === "top5") {
await interaction.deferUpdate();
const messageUsersData3 = await messageUser.find({ guildID: message.guild.id }).sort({ weeklyStat: -1 });
let list = messageUsersData3
.filter((x) => message.guild.members.cache.has(x.userID))
.splice(0, 20)
.map((x, index) => `${x.userID === message.author.id ? `\` ${index+1} \` <@${x.userID}> \`${Number(x.topStat).toLocaleString()} mesaj\` **(Sen)**` : `\` ${index+1} \` <@${x.userID}> \`${Number(x.topStat).toLocaleString()} mesaj\``}`)
.join("\n");

const embeds = new MessageEmbed()
.setDescription(`
🎉 Aşağıda **${message.guild.name}** sunucusunun bu haftanın sohbet( \`mesaj\` ) sıralaması listelenmektedir.
      
${list.length > 0 ? list : "Veri Bulunmuyor."}
      
Bu haftanın sohbet( \`mesaj\` ) sıralaması \`${moment(Date.now()).format("LLL")}\` tarihinde otomatik olarak güncellenmiştir.`)
.setAuthor({ name: message.guild.name, iconURL: message.guild.iconURL({ dynamic: true, size: 2048 })})
.setThumbnail(message.guild.iconURL({ dynamic: true, size: 2048 }));
   
msg.edit({ embeds: [embeds], components : [row] })}

if(interaction.values[0] === "top6") {
  await interaction.deferUpdate();

const coinData = await coin.find({ guildID: message.guild.id }).sort({ coin: -1 });
let list = coinData
.filter((x) => message.guild.members.cache.has(x.userID))
.splice(0, 20)
.map((x, index) => `${x.userID === message.author.id ? `\` ${index+1} \` <@${x.userID}> \`${Number(x.coin).toLocaleString()} Yetki Puanı\` **(Sen)**` : `\` ${index+1} \` <@${x.userID}> \`${Number(x.coin).toLocaleString()} Yetki Puanı\``}`)
.join("\n");

const embeds = new MessageEmbed()
.setDescription(`
🎉 Aşağıda **${message.guild.name}** sunucusunun genel yetkili sıralaması listelenmektedir.
        
${list.length > 0 ? list : "Veri Bulunmuyor."}
        
Genel Yetkili sıralaması \`${moment(Date.now()).format("LLL")}\` tarihinde otomatik olarak güncellenmiştir.`)
.setAuthor({ name: message.guild.name, iconURL: message.guild.iconURL({ dynamic: true, size: 2048 })})
.setThumbnail(message.guild.iconURL({ dynamic: true, size: 2048 }));
     
  msg.edit({ embeds: [embeds], components : [row] })}

if(interaction.values[0] === "top7") {
  await interaction.deferUpdate();
  
  const dolarData = await dolar.find({ guildID: message.guild.id }).sort({ dolar: -1 });
  let list = dolarData
  .filter((x) => message.guild.members.cache.has(x.userID))
  .splice(0, 20)
  .map((x, index) => `${x.userID === message.author.id ? `\` ${index+1} \` <@${x.userID}> \`${Number(x.dolar).toLocaleString()} Dolar\` **(Sen)**` : `\` ${index+1} \` <@${x.userID}> \`${Number(x.dolar).toLocaleString()} Dolar\``}`)
  .join("\n");        
         
const embeds = new MessageEmbed()
.setDescription(`
🎉 Aşağıda **${message.guild.name}** sunucusunun genel zengin sıralaması listelenmektedir.
                
${list.length > 0 ? list : "Veri Bulunmuyor."}
                
Genel Zengin sıralaması \`${moment(Date.now()).format("LLL")}\` tarihinde otomatik olarak güncellenmiştir.`)
.setAuthor({ name: message.guild.name, iconURL: message.guild.iconURL({ dynamic: true, size: 2048 })})
.setThumbnail(message.guild.iconURL({ dynamic: true, size: 2048 }));

msg.edit({ embeds: [embeds], components : [row] })}

if(interaction.values[0] === "top8") {
  await interaction.deferUpdate();
  
  let data = await db.find({ guildID: message.guild.id }).sort({ total: -1 });
  if (!data.length) return msg.edit({ embeds: [new MessageEmbed().setDescription("Herhangi bir davet verisi bulunamadı!")] });
  let arr = [];
  data.forEach((x) => arr.push({ id: x.userID, total: x.total }));
  let index = arr.findIndex((x) => x.id == message.author.id) + 1;

  let list = data
    .filter((x) => message.guild.members.cache.has(x.userID))
    .splice(0, 20)
    .map((x, index) => `${x.userID === message.author.id ? `\` ${index + 1} \` <@${x.userID}> - **${x.total} davet** \`(${x.regular} ✅, ${x.bonus} 🔍, ${x.fake} ⛔, ${x.leave} ❌)\` **(Sen)**` : `\` ${index + 1} \` <@${x.userID}> - **${x.total}** davet \`(${x.regular} ✅, ${x.bonus} 🔍, ${x.fake} ⛔, ${x.leave} ❌)\``}`)
    .join("\n");

const veri = await db.findOne({ guildID: message.guild.id, userID: message.author.id });
if (index < 20) {
const embeds = new MessageEmbed()
.setDescription(`
🎉 Aşağıda **${message.guild.name}** sunucusunun genel davet sıralaması listelenmektedir.
                
${list}
                
Genel Davet sıralaması \`${moment(Date.now()).format("LLL")}\` tarihinde otomatik olarak güncellenmiştir.
**Not:** \`✅ Gerçek / 🔍 Bonus / ⛔ Fake / ❌ Ayrılmış\``)
.setAuthor({ name: message.guild.name, iconURL: message.guild.iconURL({ dynamic: true, size: 2048 })})
.setThumbnail(message.guild.iconURL({ dynamic: true, size: 2048 }));
msg.edit({ embeds: [embeds], components : [row] })
} else {
const embeds2 = new MessageEmbed()
.setDescription(`
🎉 Aşağıda **${message.guild.name}** sunucusunun genel davet sıralaması listelenmektedir.
                
${list} \n... \n\` ${index} \` ${message.author} **${veri.total} davet** \`(${veri.regular} ✅, ${veri.bonus} 🔍, ${veri.fake} ⛔, ${veri.leave} ❌)\` **(Sen)**
                
Genel Davet sıralaması \`${moment(Date.now()).format("LLL")}\` tarihinde otomatik olarak güncellenmiştir.
**Not:** \`✅ Gerçek / 🔍 Bonus / ⛔ Fake / ❌ Ayrılmış\``)
.setAuthor({ name: message.guild.name, iconURL: message.guild.iconURL({ dynamic: true, size: 2048 })})
.setThumbnail(message.guild.iconURL({ dynamic: true, size: 2048 }));
msg.edit({ embeds: [embeds2], components : [row] })
}}

if(interaction.values[0] === "top9") {
  await interaction.deferUpdate();
  let data = await regstats.find({ guildID: message.guild.id }).sort({ top: -1 });

  if (!data.length) return msg.edit({ embeds: [new MessageEmbed().setDescription("Herhangi bir teyit verisi bulunamadı!")] });
  let arr = [];
  data.forEach((x) => arr.push({ id: x.userID, erkek: x.erkek, kız: x.kız }));
  let index = arr.findIndex((x) => x.id == message.author.id) + 1;

  let list = data
    .filter((x) => message.guild.members.cache.has(x.userID))
    .splice(0, 20)
    .map((x, i) => `${x.userID === message.author.id ? `\` ${i + 1} \` **<@${x.userID}> - Erkek __${x.erkek}__ Kadın __${x.kız}__ (Sen)**` : `\` ${i + 1} \` <@${x.userID}> - Erkek __${x.erkek}__ Kadın __${x.kız}__`}`)
    .join("\n");

const veri = await regstats.findOne({ guildID: message.guild.id, userID: message.author.id });
if (index < 20) {
const embeds = new MessageEmbed()
.setDescription(`
🎉 Aşağıda **${message.guild.name}** sunucusunun genel kayıt sıralaması listelenmektedir.
                    
${list}
                    
Genel Kayıt sıralaması \`${moment(Date.now()).format("LLL")}\` tarihinde otomatik olarak güncellenmiştir.
`)
.setAuthor({ name: message.guild.name, iconURL: message.guild.iconURL({ dynamic: true, size: 2048 })})
.setThumbnail(message.guild.iconURL({ dynamic: true, size: 2048 }));
msg.edit({ embeds: [embeds], components : [row] })
} else {
const embeds2 = new MessageEmbed()
.setDescription(`
🎉 Aşağıda **${message.guild.name}** sunucusunun genel kayıt sıralaması listelenmektedir.
                    
${list} \n... \n\` ${index} \` ${message.author} **Erkek __${veri.erkek}__ Kadın __${veri.kız}__ (Sen)**
                    
Genel Kayıt sıralaması \`${moment(Date.now()).format("LLL")}\` tarihinde otomatik olarak güncellenmiştir.
`)
    .setAuthor({ name: message.guild.name, iconURL: message.guild.iconURL({ dynamic: true, size: 2048 })})
    .setThumbnail(message.guild.iconURL({ dynamic: true, size: 2048 }));
    msg.edit({ embeds: [embeds2], components : [row] })
    }}
})
},
  };