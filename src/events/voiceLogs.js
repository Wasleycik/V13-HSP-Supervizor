const client = global.bot;
const conf = require("../configs/sunucuayar.json")
const isimcek = require("../configs/isimcek.json")
const emojis = require("../configs/emojis.json")
const { MessageEmbed } = require("discord.js");
const moment = require("moment");

module.exports = async (oldState, newState) => {
const channel = client.channels.cache.find(x => x.name.includes(isimcek.kanalcek.voicelog));
if (!channel) return;

if (!oldState.channel && newState.channel) return channel.wsend({ content:`${newState.member.displayName} Üyesi \`${newState.channel.name}\` Adlı Sesli Kanala <t:${Math.floor(Date.now() / 1000)}:R> Giriş Yaptı!`});
if (oldState.channel && !newState.channel) return channel.wsend({ content:`${newState.member.displayName} Üyesi <t:${Math.floor(Date.now() / 1000)}:R>  \`${oldState.channel.name}\` Adlı Ses Kanalından Ayrıldı!`});
if (oldState.channel.id && newState.channel.id && oldState.channel.id != newState.channel.id) return channel.wsend({ content:`${newState.member.displayName} Üyesi <t:${Math.floor(Date.now() / 1000)}:R> Ses Kanalını Değiştirdi! (\`${oldState.channel.name}\` => \`${newState.channel.name}\`)`});
if (oldState.channel.id && oldState.selfMute && !newState.selfMute) return channel.wsend({ content:`${newState.member.displayName} Üyesi <t:${Math.floor(Date.now() / 1000)}:R> \`${newState.channel.name}\` Adlı Ses Kanalında Kendi Susturmasını Kaldırdı!`});
if (oldState.channel.id && !oldState.selfMute && newState.selfMute) return channel.wsend({ content:`${newState.member.displayName} Üyesi <t:${Math.floor(Date.now() / 1000)}:R> \`${newState.channel.name}\` Adlı Ses Kanalında Kendisini Susturdu!`});
if (oldState.channel.id && oldState.selfDeaf && !newState.selfDeaf) return channel.wsend({ content:`${newState.member.displayName} Üyesi <t:${Math.floor(Date.now() / 1000)}:R> \`${newState.channel.name}\` Adlı Ses Kanalında Kendi Sağırlaştırmasını Kaldırdı!`});
if (oldState.channel.id && !oldState.selfDeaf && newState.selfDeaf) return channel.wsend({ content:`${newState.member.displayName} Üyesi <t:${Math.floor(Date.now() / 1000)}:R> \`${newState.channel.name}\` Adlı Ses Kanalında Kendisini Sağırlaştırdı!`});
if (oldState.channel.id && !oldState.streaming && newState.channel.id && newState.streaming) return channel.wsend({ content:`${newState.member.displayName} Üyesi <t:${Math.floor(Date.now() / 1000)}:R> \`${newState.channel.name}\` Adlı Ses Kanalında Yayın Açtı!`});
if (oldState.channel.id && oldState.streaming && newState.channel.id && !newState.streaming) return channel.wsend({ content:`${newState.member.displayName} Üyesi <t:${Math.floor(Date.now() / 1000)}:R> \`${newState.channel.name}\` Adlı Ses Kanalında Yayın Kapattı!`});
if (oldState.channel.id && !oldState.selfVideo && newState.channel.id && newState.selfVideo) return channel.wsend({ content:`${newState.member.displayName} Üyesi <t:${Math.floor(Date.now() / 1000)}:R> \`${newState.channel.name}\` Adlı Ses Kanalında Kamerasını Açtı!`});
if (oldState.channel.id && oldState.selfVideo && newState.channel.id && !newState.selfVideo) return channel.wsend({ content:`${newState.member.displayName} Üyesi <t:${Math.floor(Date.now() / 1000)}:R> \`${newState.channel.name}\` Adlı Ses Kanalında Kamerasını Kapattı!`});

const channel2 = oldState.guild.channels.cache.get(conf.vmuteLogChannel);
if (!channel2) return;
let logs = await oldState.guild.fetchAuditLogs({ limit: 1, type: "MEMBER_UPDATE" });
let entry = logs.entries.first();
if (!oldState.serverMute && newState.serverMute) return channel2.wsend({ embeds: [new MessageEmbed().setColor("RANDOM").setAuthor({ name: client.guilds.cache.get(conf.GuildID).name, iconURL: client.guilds.cache.get(conf.GuildID).iconURL({dynamic:true})}).setFooter({ text: `${moment(Date.now()).format("LLL")}`}).setDescription(`
${newState.member} Adlı Kişiye Sağ-Tık Susturma İşlemi Yapıldı.

\`•\ Mute Atılan Kişi : ${newState.member} (\`${newState.member.id}\`)
\`•\ Mute Atan Yetkili : ${entry.executor} (\`${entry.executor.id}\`)
\`•\ Mute Atıldığı Zaman : <t:${Math.floor(Date.now() / 1000)}> (<t:${Math.floor(Date.now() / 1000)}:R>)
\`•\ Mute Atılan Ses Kanal: <#${newState.channel.id}>`)]});
};

module.exports.conf = {
  name: "voiceStateUpdate",
};