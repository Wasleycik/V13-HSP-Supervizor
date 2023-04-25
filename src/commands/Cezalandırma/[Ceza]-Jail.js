const { MessageEmbed, MessageActionRow, MessageSelectMenu } = require("discord.js");
const coin = require("../../schemas/coin");
const moment = require("moment");
const ceza = require("../../schemas/ceza");
const cezapuan = require("../../schemas/cezapuan")
const jailLimit = new Map();
const ms = require("ms")
moment.locale("tr");
const conf = require("../../configs/sunucuayar.json")
const { red, green, Revuu, kirmiziok, revusome } = require("../../configs/emojis.json")
module.exports = {
  conf: {
    aliases: ["jail","temp-jail"],
    name: "jail",
    help: "jail <Kişi/ID> <Süre> <Sebep>",
    category: "cezalandırma",
  },

  run: async (client, message, args, embed) => {
    if (!message.member.permissions.has(8n) && !conf.jailHammer.some(x => message.member.roles.cache.has(x))) 
    {
    message.react(red)
    message.channel.send({ content:"Yeterli yetkin bulunmuyor!"}).then((e) => setTimeout(() => { e.delete(); }, 5000)); 
    return }
    const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    if (!member) { message.channel.send({ content:"Bir üye belirtmelisin!"}).then((e) => setTimeout(() => { e.delete(); }, 5000));
    message.react(red) 
    return }
    if (conf.jailRole.some(x => member.roles.cache.has(x))) { message.channel.send({ content:"Bu üye zaten jailde!"}).then((e) => setTimeout(() => { e.delete(); }, 5000));
    message.react(red) 
    return }
    if (message.member.roles.highest.position <= member.roles.highest.position) return message.channel.send({ content: "Kendinle aynı yetkide ya da daha yetkili olan birini jailleyemezsin!"});
    if (!member.manageable) return message.channel.send({ content:"Bu üyeyi jailleyemiyorum!"});
    if (conf.Main.jaillimit > 0 && jailLimit.has(message.author.id) && jailLimit.get(message.author.id) == conf.Main.jaillimit) 
    {
    message.react(red)
    message.channel.send({ content:"Saatlik jail sınırına ulaştın!"}).then((e) => setTimeout(() => { e.delete(); }, 5000)); 
    return }

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
            .setCustomId('jail')
            .setPlaceholder(`${yazı}'n Jail Atılma Sebebi?`)
            .addOptions([
                { label: 'Cinsellik, taciz ve ağır hakaret (1 Hafta)', value: 'jail1', emoji: { "name": "🛡" }},
                { label: 'Sunucu kurallarına uyum sağlamamak (3 Gün)', value: 'jail2', emoji: { "name": "🛡" }},
                { label: 'Sesli/Mesajlı/Ekran P. DM Taciz (1 Gün)', value: 'jail3', emoji: { "name": "🛡" }},
                { label: 'Dini, Irki ve Siyasi değerlere Hakaret (1 Ay)', value: 'jail4', emoji: { "name": "🛡" }},
                { label: 'Abartı rahatsız edici yaklaşımda bulunmak! (2 Hafta)', value: 'jail5', emoji: { "name": "🛡" }},
                { label: 'Sunucu içerisi abartı trol / Kayıt trol yapmak! (3 Gün)', value: 'jail6', emoji: { "name": "🛡" }},
                { label: 'Sunucu Kötüleme / Saygısız Davranış (1 Ay)', value: 'jail7', emoji: { "name": "🛡" }},
                { label: 'Diğer / Yanlış Davranış (Sınırsız)', value: 'jail8', emoji: { "name": "🛡" }},
                { label: `İşlem İptal`, value: 'jail9', emoji: { "name": "❌" }},
             ]),
    );

const duration = args[1] ? ms(args[1]) : undefined;

if (duration) {
  const reason = args.slice(2).join(" ") || "Belirtilmedi!";

  await ceza.findOneAndUpdate({ guildID: message.guild.id, userID: member.user.id }, { $push: { ceza: 1 } }, { upsert: true });
  await ceza.findOneAndUpdate({ guildID: message.guild.id, userID: member.user.id }, { $inc: { top: 1 } }, { upsert: true });
  await ceza.findOneAndUpdate({ guildID: message.guild.id, userID: message.author.id }, { $inc: { JailAmount: 1 } }, {upsert: true});
  await coin.findOneAndUpdate({ guildID: member.guild.id, userID: member.user.id }, { $inc: { coin: -20 } }, { upsert: true });
  await cezapuan.findOneAndUpdate({ guildID: message.guild.id, userID: member.user.id }, { $inc: { cezapuan: 15 } }, { upsert: true });
  const cezapuanData = await cezapuan.findOne({ guildID: message.guild.id, userID: member.user.id });
  if(conf.cezapuanlog) message.guild.channels.cache.get(conf.cezapuanlog).send({ content:`${member} üyesi \`jail cezası\` alarak toplam \`${cezapuanData ? cezapuanData.cezapuan : 0} ceza puanına\` ulaştı!`});
  member.roles.cache.has(conf.boosterRolu) ? member.roles.set([conf.boosterRolu, conf.jailRole[0]]) : member.roles.set(conf.jailRole)
  message.react(green) 
  const penal = await client.penalize(message.guild.id, member.user.id, "TEMP-JAIL", true, message.author.id, reason, true, Date.now() + duration);
  if(msg) msg.delete();
  await message.channel.send({ content:`${green} ${member.toString()} üyesi, ${message.author} tarafından, \`${reason}\` nedeniyle jaillendi! \`(Ceza ID: #${penal.id})\``}).then((e) => setTimeout(() => { e.delete(); }, 50000));
  if (conf.Main.dmMessages) member.send({ content:`**${message.guild.name}** sunucusunda, **${message.author.tag}** tarafından, **${reason}** sebebiyle, <t:${Math.floor((Date.now() + duration) / 1000)}:R>'ya kadar jaillendiniz.`}).catch(() => {});
  
  const log = embed
  .setAuthor({ name: member.user.username, iconURL:  member.user.displayAvatarURL({ dynamic: true }) })
  .setColor("#2f3136")
  .setDescription(`
  ${member.toString()} Adlı Kişiye Jail Atıldı
  
  \` • \` Jail Atan Kişi : ${message.author} (\`${message.author.id}\`)
  \` • \` Ceza Başlangıç: <t:${Math.floor(Date.now() / 1000)}> (<t:${Math.floor(Date.now() / 1000)}:R>)
  \` • \` Ceza Bitiş: <t:${Math.floor((Date.now() + duration) / 1000)}> (<t:${Math.floor((Date.now() + duration) / 1000)}:R>)
  \` • \` Ceza Sebebi: \`${reason}\`
  `)
  .setFooter({ text:`${moment(Date.now()).format("LLL")}    (Ceza ID: #${penal.id})` })
  
  message.guild.channels.cache.get(conf.jailLogChannel).wsend({ embeds: [log]});

  if (conf.Main.jaillimit > 0) {
    if (!jailLimit.has(message.author.id)) jailLimit.set(message.author.id, 1);
    else jailLimit.set(message.author.id, jailLimit.get(message.author.id) + 1);
    setTimeout(() => {
      if (jailLimit.has(message.author.id)) jailLimit.delete(message.author.id);
    }, 1000 * 60 * 60);
  }
} else if (!duration) {
  var msg = await message.channel.send({ content: `${member.toString()} isimli kullanıcıyı jail gönderme sebebinizi menüden seçiniz.`, components: [row]})
}

if (msg) {
var filter = (xd) => xd.user.id === message.author.id;
let collector =  msg.createMessageComponentCollector({ filter, componentType: 'SELECT_MENU', time: 30000 })
    
collector.on("collect", async (interaction) => {

if(interaction.values[0] === "jail1") {
await interaction.deferUpdate();
const duration = "1w" ? ms("1w") : undefined;
const reason = "Cinsellik, taciz ve ağır hakaret";

await ceza.findOneAndUpdate({ guildID: message.guild.id, userID: member.user.id }, { $push: { ceza: 1 } }, { upsert: true });
await ceza.findOneAndUpdate({ guildID: message.guild.id, userID: member.user.id }, { $inc: { top: 1 } }, { upsert: true });
await ceza.findOneAndUpdate({ guildID: message.guild.id, userID: message.author.id }, { $inc: { JailAmount: 1 } }, {upsert: true});
await coin.findOneAndUpdate({ guildID: member.guild.id, userID: member.user.id }, { $inc: { coin: -20 } }, { upsert: true });
await cezapuan.findOneAndUpdate({ guildID: message.guild.id, userID: member.user.id }, { $inc: { cezapuan: 15 } }, { upsert: true });
const cezapuanData = await cezapuan.findOne({ guildID: message.guild.id, userID: member.user.id });
if(conf.cezapuanlog) message.guild.channels.cache.get(conf.cezapuanlog).send({ content:`${member} üyesi \`jail cezası\` alarak toplam \`${cezapuanData ? cezapuanData.cezapuan : 0} ceza puanına\` ulaştı!`});
member.roles.cache.has(conf.boosterRolu) ? member.roles.set([conf.boosterRolu, conf.jailRole[0]]) : member.roles.set(conf.jailRole)
message.react(green)
const penal = await client.penalize(message.guild.id, member.user.id, "TEMP-JAIL", true, message.author.id, reason, true, Date.now() + duration);
if(msg) msg.delete();
interaction.followUp({ content:`${green} ${member.toString()} üyesi, ${message.author} tarafından, \`${reason}\` nedeniyle jaillendi! \`(Ceza ID: #${penal.id})\``}).then((e) => setTimeout(() => { e.delete(); }, 50000));
if (conf.Main.dmMessages) member.send({ content:`**${message.guild.name}** sunucusunda, **${message.author.tag}** tarafından, **${reason}** sebebiyle, <t:${Math.floor((Date.now() + duration) / 1000)}:R>'ya kadar jaillendiniz.`}).catch(() => {});

const log = embed
.setAuthor({ name: member.user.username, iconURL:  member.user.displayAvatarURL({ dynamic: true }) })
.setColor("#2f3136")
.setDescription(`
  ${member.toString()} Adlı Kişiye Jail Atıldı
  
  \` • \` Jail Atan Kişi : ${message.author} (\`${message.author.id}\`)
  \` • \` Ceza Başlangıç: <t:${Math.floor(Date.now() / 1000)}> (<t:${Math.floor(Date.now() / 1000)}:R>)
  \` • \` Ceza Bitiş: <t:${Math.floor((Date.now() + duration) / 1000)}> (<t:${Math.floor((Date.now() + duration) / 1000)}:R>)
  \` • \` Ceza Sebebi: \`${reason}\`
`)
.setFooter({ text:`${moment(Date.now()).format("LLL")}    (Ceza ID: #${penal.id})` })

message.guild.channels.cache.get(conf.jailLogChannel).wsend({ embeds: [log]});

if (conf.Main.jaillimit > 0) {
  if (!jailLimit.has(message.author.id)) jailLimit.set(message.author.id, 1);
  else jailLimit.set(message.author.id, jailLimit.get(message.author.id) + 1);
  setTimeout(() => {
    if (jailLimit.has(message.author.id)) jailLimit.delete(message.author.id);
  }, 1000 * 60 * 60);
}
}

if(interaction.values[0] === "jail2") {
await interaction.deferUpdate();
const duration = "3d" ? ms("3d") : undefined;
const reason = "Sunucu kurallarına uyum sağlamamak";

await ceza.findOneAndUpdate({ guildID: message.guild.id, userID: member.user.id }, { $push: { ceza: 1 } }, { upsert: true });
await ceza.findOneAndUpdate({ guildID: message.guild.id, userID: member.user.id }, { $inc: { top: 1 } }, { upsert: true });
await ceza.findOneAndUpdate({ guildID: message.guild.id, userID: message.author.id }, { $inc: { JailAmount: 1 } }, {upsert: true});
await coin.findOneAndUpdate({ guildID: member.guild.id, userID: member.user.id }, { $inc: { coin: -20 } }, { upsert: true });
await cezapuan.findOneAndUpdate({ guildID: message.guild.id, userID: member.user.id }, { $inc: { cezapuan: 15 } }, { upsert: true });
const cezapuanData = await cezapuan.findOne({ guildID: message.guild.id, userID: member.user.id });
if(conf.cezapuanlog) message.guild.channels.cache.get(conf.cezapuanlog).send({ content:`${member} üyesi \`jail cezası\` alarak toplam \`${cezapuanData ? cezapuanData.cezapuan : 0} ceza puanına\` ulaştı!`});
member.roles.cache.has(conf.boosterRolu) ? member.roles.set([conf.boosterRolu, conf.jailRole[0]]) : member.roles.set(conf.jailRole)
message.react(green)
const penal = await client.penalize(message.guild.id, member.user.id, "TEMP-JAIL", true, message.author.id, reason, true, Date.now() + duration);

if(msg) msg.delete();
interaction.followUp({ content:`${green} ${member.toString()} üyesi, ${message.author} tarafından, \`${reason}\` nedeniyle jaillendi! \`(Ceza ID: #${penal.id})\``}).then((e) => setTimeout(() => { e.delete(); }, 50000));
if (conf.Main.dmMessages) member.send({ content:`**${message.guild.name}** sunucusunda, **${message.author.tag}** tarafından, **${reason}** sebebiyle, <t:${Math.floor((Date.now() + duration) / 1000)}:R>'ya kadar jaillendiniz.`}).catch(() => {});

const log = embed
.setAuthor({ name: member.user.username, iconURL:  member.user.displayAvatarURL({ dynamic: true }) })
.setColor("#2f3136")
.setDescription(`
  ${member.toString()} Adlı Kişiye Jail Atıldı
  
  \` • \` Jail Atan Kişi : ${message.author} (\`${message.author.id}\`)
  \` • \` Ceza Başlangıç: <t:${Math.floor(Date.now() / 1000)}> (<t:${Math.floor(Date.now() / 1000)}:R>)
  \` • \` Ceza Bitiş: <t:${Math.floor((Date.now() + duration) / 1000)}> (<t:${Math.floor((Date.now() + duration) / 1000)}:R>)
  \` • \` Ceza Sebebi: \`${reason}\`
`)
.setFooter({ text:`${moment(Date.now()).format("LLL")}    (Ceza ID: #${penal.id})` })

message.guild.channels.cache.get(conf.jailLogChannel).wsend({ embeds: [log]});

if (conf.Main.jaillimit > 0) {
  if (!jailLimit.has(message.author.id)) jailLimit.set(message.author.id, 1);
  else jailLimit.set(message.author.id, jailLimit.get(message.author.id) + 1);
  setTimeout(() => {
    if (jailLimit.has(message.author.id)) jailLimit.delete(message.author.id);
  }, 1000 * 60 * 60);
}
}

if(interaction.values[0] === "jail3") {
await interaction.deferUpdate();
const duration = "1d" ? ms("1d") : undefined;
const reason = "Sesli/Mesajlı/Ekran P. DM Taciz";

await ceza.findOneAndUpdate({ guildID: message.guild.id, userID: member.user.id }, { $push: { ceza: 1 } }, { upsert: true });
await ceza.findOneAndUpdate({ guildID: message.guild.id, userID: member.user.id }, { $inc: { top: 1 } }, { upsert: true });
await ceza.findOneAndUpdate({ guildID: message.guild.id, userID: message.author.id }, { $inc: { JailAmount: 1 } }, {upsert: true});
await coin.findOneAndUpdate({ guildID: member.guild.id, userID: member.user.id }, { $inc: { coin: -20 } }, { upsert: true });
await cezapuan.findOneAndUpdate({ guildID: message.guild.id, userID: member.user.id }, { $inc: { cezapuan: 15 } }, { upsert: true });
const cezapuanData = await cezapuan.findOne({ guildID: message.guild.id, userID: member.user.id });
if(conf.cezapuanlog) message.guild.channels.cache.get(conf.cezapuanlog).send({ content:`${member} üyesi \`jail cezası\` alarak toplam \`${cezapuanData ? cezapuanData.cezapuan : 0} ceza puanına\` ulaştı!`});
member.roles.cache.has(conf.boosterRolu) ? member.roles.set([conf.boosterRolu, conf.jailRole[0]]) : member.roles.set(conf.jailRole)
message.react(green)
const penal = await client.penalize(message.guild.id, member.user.id, "TEMP-JAIL", true, message.author.id, reason, true, Date.now() + duration);

if(msg) msg.delete();
interaction.followUp({ content:`${green} ${member.toString()} üyesi, ${message.author} tarafından, \`${reason}\` nedeniyle jaillendi! \`(Ceza ID: #${penal.id})\``}).then((e) => setTimeout(() => { e.delete(); }, 50000));
if (conf.Main.dmMessages) member.send({ content:`**${message.guild.name}** sunucusunda, **${message.author.tag}** tarafından, **${reason}** sebebiyle, <t:${Math.floor((Date.now() + duration) / 1000)}:R>'ya kadar jaillendiniz.`}).catch(() => {});

const log = embed
.setAuthor({ name: member.user.username, iconURL:  member.user.displayAvatarURL({ dynamic: true }) })
.setColor("#2f3136")
.setDescription(`
  ${member.toString()} Adlı Kişiye Jail Atıldı
  
  \` • \` Jail Atan Kişi : ${message.author} (\`${message.author.id}\`)
  \` • \` Ceza Başlangıç: <t:${Math.floor(Date.now() / 1000)}> (<t:${Math.floor(Date.now() / 1000)}:R>)
  \` • \` Ceza Bitiş: <t:${Math.floor((Date.now() + duration) / 1000)}> (<t:${Math.floor((Date.now() + duration) / 1000)}:R>)
  \` • \` Ceza Sebebi: \`${reason}\`
`)
.setFooter({ text:`${moment(Date.now()).format("LLL")}    (Ceza ID: #${penal.id})` })

message.guild.channels.cache.get(conf.jailLogChannel).wsend({ embeds: [log]});

if (conf.Main.jaillimit > 0) {
  if (!jailLimit.has(message.author.id)) jailLimit.set(message.author.id, 1);
  else jailLimit.set(message.author.id, jailLimit.get(message.author.id) + 1);
  setTimeout(() => {
    if (jailLimit.has(message.author.id)) jailLimit.delete(message.author.id);
  }, 1000 * 60 * 60);
}
}

if(interaction.values[0] === "jail4") {
await interaction.deferUpdate();
const duration = "4w" ? ms("4w") : undefined;
const reason = "Dini, Irki ve Siyasi değerlere Hakaret";

await ceza.findOneAndUpdate({ guildID: message.guild.id, userID: member.user.id }, { $push: { ceza: 1 } }, { upsert: true });
await ceza.findOneAndUpdate({ guildID: message.guild.id, userID: member.user.id }, { $inc: { top: 1 } }, { upsert: true });
await ceza.findOneAndUpdate({ guildID: message.guild.id, userID: message.author.id }, { $inc: { JailAmount: 1 } }, {upsert: true});
await coin.findOneAndUpdate({ guildID: member.guild.id, userID: member.user.id }, { $inc: { coin: -20 } }, { upsert: true });
await cezapuan.findOneAndUpdate({ guildID: message.guild.id, userID: member.user.id }, { $inc: { cezapuan: 15 } }, { upsert: true });
const cezapuanData = await cezapuan.findOne({ guildID: message.guild.id, userID: member.user.id });
if(conf.cezapuanlog) message.guild.channels.cache.get(conf.cezapuanlog).send({ content:`${member} üyesi \`jail cezası\` alarak toplam \`${cezapuanData ? cezapuanData.cezapuan : 0} ceza puanına\` ulaştı!`});
member.roles.cache.has(conf.boosterRolu) ? member.roles.set([conf.boosterRolu, conf.jailRole[0]]) : member.roles.set(conf.jailRole)
message.react(green)
const penal = await client.penalize(message.guild.id, member.user.id, "TEMP-JAIL", true, message.author.id, reason, true, Date.now() + duration);

if(msg) msg.delete();
interaction.followUp({ content:`${green} ${member.toString()} üyesi, ${message.author} tarafından, \`${reason}\` nedeniyle jaillendi! \`(Ceza ID: #${penal.id})\``}).then((e) => setTimeout(() => { e.delete(); }, 50000));
if (conf.Main.dmMessages) member.send({ content:`**${message.guild.name}** sunucusunda, **${message.author.tag}** tarafından, **${reason}** sebebiyle, <t:${Math.floor((Date.now() + duration) / 1000)}:R>'ya kadar jaillendiniz.`}).catch(() => {});

const log = embed
.setAuthor({ name: member.user.username, iconURL:  member.user.displayAvatarURL({ dynamic: true }) })
.setColor("#2f3136")
.setDescription(`
  ${member.toString()} Adlı Kişiye Jail Atıldı
  
  \` • \` Jail Atan Kişi : ${message.author} (\`${message.author.id}\`)
  \` • \` Ceza Başlangıç: <t:${Math.floor(Date.now() / 1000)}> (<t:${Math.floor(Date.now() / 1000)}:R>)
  \` • \` Ceza Bitiş: <t:${Math.floor((Date.now() + duration) / 1000)}> (<t:${Math.floor((Date.now() + duration) / 1000)}:R>)
  \` • \` Ceza Sebebi: \`${reason}\`
`)
.setFooter({ text:`${moment(Date.now()).format("LLL")}    (Ceza ID: #${penal.id})` })

message.guild.channels.cache.get(conf.jailLogChannel).wsend({ embeds: [log]});

if (conf.Main.jaillimit > 0) {
  if (!jailLimit.has(message.author.id)) jailLimit.set(message.author.id, 1);
  else jailLimit.set(message.author.id, jailLimit.get(message.author.id) + 1);
  setTimeout(() => {
    if (jailLimit.has(message.author.id)) jailLimit.delete(message.author.id);
  }, 1000 * 60 * 60);
}
}

if(interaction.values[0] === "jail5") {
await interaction.deferUpdate();
const duration = "2w" ? ms("2w") : undefined;
const reason = "Abartı rahatsız edici yaklaşımda bulunmak!";

await ceza.findOneAndUpdate({ guildID: message.guild.id, userID: member.user.id }, { $push: { ceza: 1 } }, { upsert: true });
await ceza.findOneAndUpdate({ guildID: message.guild.id, userID: member.user.id }, { $inc: { top: 1 } }, { upsert: true });
await ceza.findOneAndUpdate({ guildID: message.guild.id, userID: message.author.id }, { $inc: { JailAmount: 1 } }, {upsert: true});
await coin.findOneAndUpdate({ guildID: member.guild.id, userID: member.user.id }, { $inc: { coin: -20 } }, { upsert: true });
await cezapuan.findOneAndUpdate({ guildID: message.guild.id, userID: member.user.id }, { $inc: { cezapuan: 15 } }, { upsert: true });
const cezapuanData = await cezapuan.findOne({ guildID: message.guild.id, userID: member.user.id });
if(conf.cezapuanlog) message.guild.channels.cache.get(conf.cezapuanlog).send({ content:`${member} üyesi \`jail cezası\` alarak toplam \`${cezapuanData ? cezapuanData.cezapuan : 0} ceza puanına\` ulaştı!`});
member.roles.cache.has(conf.boosterRolu) ? member.roles.set([conf.boosterRolu, conf.jailRole[0]]) : member.roles.set(conf.jailRole)
message.react(green)
const penal = await client.penalize(message.guild.id, member.user.id, "TEMP-JAIL", true, message.author.id, reason, true, Date.now() + duration);

if(msg) msg.delete();
interaction.followUp({ content:`${green} ${member.toString()} üyesi, ${message.author} tarafından, \`${reason}\` nedeniyle jaillendi! \`(Ceza ID: #${penal.id})\``}).then((e) => setTimeout(() => { e.delete(); }, 50000));
if (conf.Main.dmMessages) member.send({ content:`**${message.guild.name}** sunucusunda, **${message.author.tag}** tarafından, **${reason}** sebebiyle, <t:${Math.floor((Date.now() + duration) / 1000)}:R>'ya kadar jaillendiniz.`}).catch(() => {});

const log = embed
.setAuthor({ name: member.user.username, iconURL:  member.user.displayAvatarURL({ dynamic: true }) })
.setColor("#2f3136")
.setDescription(`
  ${member.toString()} Adlı Kişiye Jail Atıldı
  
  \` • \` Jail Atan Kişi : ${message.author} (\`${message.author.id}\`)
  \` • \` Ceza Başlangıç: <t:${Math.floor(Date.now() / 1000)}> (<t:${Math.floor(Date.now() / 1000)}:R>)
  \` • \` Ceza Bitiş: <t:${Math.floor((Date.now() + duration) / 1000)}> (<t:${Math.floor((Date.now() + duration) / 1000)}:R>)
  \` • \` Ceza Sebebi: \`${reason}\`
`)
.setFooter({ text:`${moment(Date.now()).format("LLL")}    (Ceza ID: #${penal.id})` })

message.guild.channels.cache.get(conf.jailLogChannel).wsend({ embeds: [log]});

if (conf.Main.jaillimit > 0) {
  if (!jailLimit.has(message.author.id)) jailLimit.set(message.author.id, 1);
  else jailLimit.set(message.author.id, jailLimit.get(message.author.id) + 1);
  setTimeout(() => {
    if (jailLimit.has(message.author.id)) jailLimit.delete(message.author.id);
  }, 1000 * 60 * 60);
}
}

if(interaction.values[0] === "jail6") {
await interaction.deferUpdate();
const duration = "3d" ? ms("3d") : undefined;
const reason = "Sunucu içerisi abartı trol / Kayıt trol yapmak!";

await ceza.findOneAndUpdate({ guildID: message.guild.id, userID: member.user.id }, { $push: { ceza: 1 } }, { upsert: true });
await ceza.findOneAndUpdate({ guildID: message.guild.id, userID: member.user.id }, { $inc: { top: 1 } }, { upsert: true });
await ceza.findOneAndUpdate({ guildID: message.guild.id, userID: message.author.id }, { $inc: { JailAmount: 1 } }, {upsert: true});
await coin.findOneAndUpdate({ guildID: member.guild.id, userID: member.user.id }, { $inc: { coin: -20 } }, { upsert: true });
await cezapuan.findOneAndUpdate({ guildID: message.guild.id, userID: member.user.id }, { $inc: { cezapuan: 15 } }, { upsert: true });
const cezapuanData = await cezapuan.findOne({ guildID: message.guild.id, userID: member.user.id });
if(conf.cezapuanlog) message.guild.channels.cache.get(conf.cezapuanlog).send({ content:`${member} üyesi \`jail cezası\` alarak toplam \`${cezapuanData ? cezapuanData.cezapuan : 0} ceza puanına\` ulaştı!`});
member.roles.cache.has(conf.boosterRolu) ? member.roles.set([conf.boosterRolu, conf.jailRole[0]]) : member.roles.set(conf.jailRole)
message.react(green)
const penal = await client.penalize(message.guild.id, member.user.id, "TEMP-JAIL", true, message.author.id, reason, true, Date.now() + duration);

if(msg) msg.delete();
interaction.followUp({ content:`${green} ${member.toString()} üyesi, ${message.author} tarafından, \`${reason}\` nedeniyle jaillendi! \`(Ceza ID: #${penal.id})\``}).then((e) => setTimeout(() => { e.delete(); }, 50000));
if (conf.Main.dmMessages) member.send({ content:`**${message.guild.name}** sunucusunda, **${message.author.tag}** tarafından, **${reason}** sebebiyle, <t:${Math.floor((Date.now() + duration) / 1000)}:R>'ya kadar jaillendiniz.`}).catch(() => {});

const log = embed
.setAuthor({ name: member.user.username, iconURL:  member.user.displayAvatarURL({ dynamic: true }) })
.setColor("#2f3136")
.setDescription(`
  ${member.toString()} Adlı Kişiye Jail Atıldı
  
  \` • \` Jail Atan Kişi : ${message.author} (\`${message.author.id}\`)
  \` • \` Ceza Başlangıç: <t:${Math.floor(Date.now() / 1000)}> (<t:${Math.floor(Date.now() / 1000)}:R>)
  \` • \` Ceza Bitiş: <t:${Math.floor((Date.now() + duration) / 1000)}> (<t:${Math.floor((Date.now() + duration) / 1000)}:R>)
  \` • \` Ceza Sebebi: \`${reason}\`
`)
.setFooter({ text:`${moment(Date.now()).format("LLL")}    (Ceza ID: #${penal.id})` })

message.guild.channels.cache.get(conf.jailLogChannel).wsend({ embeds: [log]});

if (conf.Main.jaillimit > 0) {
  if (!jailLimit.has(message.author.id)) jailLimit.set(message.author.id, 1);
  else jailLimit.set(message.author.id, jailLimit.get(message.author.id) + 1);
  setTimeout(() => {
    if (jailLimit.has(message.author.id)) jailLimit.delete(message.author.id);
  }, 1000 * 60 * 60);
}
}

if(interaction.values[0] === "jail7") {
await interaction.deferUpdate();
const duration = "4w" ? ms("4w") : undefined;
const reason = "Sunucu Kötüleme / Saygısız Davranış";

await ceza.findOneAndUpdate({ guildID: message.guild.id, userID: member.user.id }, { $push: { ceza: 1 } }, { upsert: true });
await ceza.findOneAndUpdate({ guildID: message.guild.id, userID: member.user.id }, { $inc: { top: 1 } }, { upsert: true });
await ceza.findOneAndUpdate({ guildID: message.guild.id, userID: message.author.id }, { $inc: { JailAmount: 1 } }, {upsert: true});
await coin.findOneAndUpdate({ guildID: member.guild.id, userID: member.user.id }, { $inc: { coin: -20 } }, { upsert: true });
await cezapuan.findOneAndUpdate({ guildID: message.guild.id, userID: member.user.id }, { $inc: { cezapuan: 15 } }, { upsert: true });
const cezapuanData = await cezapuan.findOne({ guildID: message.guild.id, userID: member.user.id });
if(conf.cezapuanlog) message.guild.channels.cache.get(conf.cezapuanlog).send({ content:`${member} üyesi \`jail cezası\` alarak toplam \`${cezapuanData ? cezapuanData.cezapuan : 0} ceza puanına\` ulaştı!`});
member.roles.cache.has(conf.boosterRolu) ? member.roles.set([conf.boosterRolu, conf.jailRole[0]]) : member.roles.set(conf.jailRole)
message.react(green)
const penal = await client.penalize(message.guild.id, member.user.id, "TEMP-JAIL", true, message.author.id, reason, true, Date.now() + duration);

if(msg) msg.delete();
interaction.followUp({ content:`${green} ${member.toString()} üyesi, ${message.author} tarafından, \`${reason}\` nedeniyle jaillendi! \`(Ceza ID: #${penal.id})\``}).then((e) => setTimeout(() => { e.delete(); }, 50000));
if (conf.Main.dmMessages) member.send({ content:`**${message.guild.name}** sunucusunda, **${message.author.tag}** tarafından, **${reason}** sebebiyle, <t:${Math.floor((Date.now() + duration) / 1000)}:R>'ya kadar jaillendiniz.`}).catch(() => {});

const log = embed
.setAuthor({ name: member.user.username, iconURL:  member.user.displayAvatarURL({ dynamic: true }) })
.setColor("#2f3136")
.setDescription(`
  ${member.toString()} Adlı Kişiye Jail Atıldı
  
  \` • \` Jail Atan Kişi : ${message.author} (\`${message.author.id}\`)
  \` • \` Ceza Başlangıç: <t:${Math.floor(Date.now() / 1000)}> (<t:${Math.floor(Date.now() / 1000)}:R>)
  \` • \` Ceza Bitiş: <t:${Math.floor((Date.now() + duration) / 1000)}> (<t:${Math.floor((Date.now() + duration) / 1000)}:R>)
  \` • \` Ceza Sebebi: \`${reason}\`
`)
.setFooter({ text:`${moment(Date.now()).format("LLL")}    (Ceza ID: #${penal.id})` })

message.guild.channels.cache.get(conf.jailLogChannel).wsend({ embeds: [log]});

if (conf.Main.jaillimit > 0) {
  if (!jailLimit.has(message.author.id)) jailLimit.set(message.author.id, 1);
  else jailLimit.set(message.author.id, jailLimit.get(message.author.id) + 1);
  setTimeout(() => {
    if (jailLimit.has(message.author.id)) jailLimit.delete(message.author.id);
  }, 1000 * 60 * 60);
}
}

if(interaction.values[0] === "jail8") {
await interaction.deferUpdate();

await ceza.findOneAndUpdate({ guildID: message.guild.id, userID: member.user.id }, { $push: { ceza: 1 } }, { upsert: true });
await ceza.findOneAndUpdate({ guildID: message.guild.id, userID: member.user.id }, { $inc: { top: 1 } }, { upsert: true });
await ceza.findOneAndUpdate({ guildID: message.guild.id, userID: message.author.id }, { $inc: { JailAmount: 1 } }, {upsert: true});
await coin.findOneAndUpdate({ guildID: member.guild.id, userID: member.user.id }, { $inc: { coin: -20 } }, { upsert: true });
await cezapuan.findOneAndUpdate({ guildID: message.guild.id, userID: member.user.id }, { $inc: { cezapuan: 15 } }, { upsert: true });
const cezapuanData = await cezapuan.findOne({ guildID: message.guild.id, userID: member.user.id });
if(conf.cezapuanlog) message.guild.channels.cache.get(conf.cezapuanlog).send({ content:`${member} üyesi \`jail cezası\` alarak toplam \`${cezapuanData ? cezapuanData.cezapuan : 0} ceza puanına\` ulaştı!`});
member.roles.cache.has(conf.boosterRolu) ? member.roles.set([conf.boosterRolu, conf.jailRole[0]]) : member.roles.set(conf.jailRole)
message.react(green)
const penal = await client.penalize(message.guild.id, member.user.id, "TEMP-JAIL", true, message.author.id, true);
if(msg) msg.delete();
interaction.followUp({ content:`${green} ${member.toString()} üyesi, ${message.author} tarafından, jaillendi! \`(Ceza ID: #${penal.id})\``}).then((e) => setTimeout(() => { e.delete(); }, 50000));
if (conf.Main.dmMessages) member.send({ content:`**${message.guild.name}** sunucusunda, **${message.author.tag}** tarafından, Sınırsız jaillendiniz.`}).catch(() => {});

const log = embed
.setAuthor({ name: member.user.username, iconURL:  member.user.displayAvatarURL({ dynamic: true }) })
.setColor("#2f3136")
.setDescription(`
  ${member.toString()} Adlı Kişiye Jail Atıldı
  
  \` • \` Jail Atan Kişi : ${message.author} (\`${message.author.id}\`)
  \` • \` Ceza Başlangıç: <t:${Math.floor(Date.now() / 1000)}> (<t:${Math.floor(Date.now() / 1000)}:R>)
  \` • \` Ceza Bitiş: \`Sınırsız\`
  \` • \` Ceza Sebebi: \`Özel / Önemli\`
`)
.setFooter({ text:`${moment(Date.now()).format("LLL")}    (Ceza ID: #${penal.id})` })

message.guild.channels.cache.get(conf.jailLogChannel).wsend({ embeds: [log]});

if (conf.Main.jaillimit > 0) {
  if (!jailLimit.has(message.author.id)) jailLimit.set(message.author.id, 1);
  else jailLimit.set(message.author.id, jailLimit.get(message.author.id) + 1);
  setTimeout(() => {
    if (jailLimit.has(message.author.id)) jailLimit.delete(message.author.id);
  }, 1000 * 60 * 60);
}
}

if(interaction.values[0] === "jail9") {
await interaction.deferUpdate();
if(msg) msg.delete();
interaction.followUp({ content: `${green} Jail Atma işlemi başarıyla iptal edildi.`, ephemeral: true });
}
})
}
  },
};

