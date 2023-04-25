const { MessageEmbed, Client, MessageActionRow, MessageButton } = require('discord.js');
const moment = require("moment");
moment.locale("tr");
const penals = require("../../schemas/penals");
const conf = require("../../configs/sunucuayar.json")
const {red, green, Revuu} = require("../../configs/emojis.json")
module.exports = {
  conf: {
    aliases: ["unmute","uncmute"],
    name: "unmute",
    help: "unmute <Kişi/ID>",
    category: "cezalandırma",
  },

  run: async (client, message, args, embed) => {
    if (!message.member.permissions.has(8n) && !conf.cmuteHammer.some(x => message.member.roles.cache.has(x))) 
    {
    message.react(red)
    message.channel.send({ content: "Yeterli yetkin bulunmuyor!"}).then((e) => setTimeout(() => { e.delete(); }, 5000)); 
    return }
    const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    if (!member) 
    {
    message.react(red)
    message.channel.send( { content:"Bir üye belirtmelisin!"}).then((e) => setTimeout(() => { e.delete(); }, 5000)); 
    return }
    if (!conf.chatMute.some(x => member.roles.cache.has(x)) && !conf.voiceMute.some(x => member.roles.cache.has(x))) 
    {
    message.react(red)
    message.channel.send( { content:"Bu üye muteli değil!"}).then((e) => setTimeout(() => { e.delete(); }, 5000));   
    return }
    if (!message.member.permissions.has(8n) && member.roles.highest.position >= message.member.roles.highest.position) 
    {
    message.react(red)
    message.channel.send( { content:"Kendinle aynı yetkide ya da daha yetkili olan birinin susturmasını kaldıramazsın!"}).then((e) => setTimeout(() => { e.delete(); }, 5000)); 
    return }
    if (!member.manageable) 
    {
    message.react(red)
    message.channel.send( { content:"Bu üyenin susturmasını kaldıramıyorum!"}).then((e) => setTimeout(() => { e.delete(); }, 5000)); 
    return }
    
    let mute = new MessageButton()
    .setCustomId("mute")
    .setLabel("Chat Mute")
    .setStyle("SECONDARY")
    .setEmoji("997820341718089739");

    let vmute = new MessageButton()
    .setCustomId("vmute")
    .setLabel("Voice Mute")
    .setStyle("SECONDARY")
    .setEmoji("997876085624668231");

    if (!conf.chatMute.some(x => member.roles.cache.has(x))) {
        mute.setStyle('SECONDARY').setDisabled(true);
    } else {
        mute.setStyle('SUCCESS');
    }

    if (!conf.voiceMute.some(x => member.roles.cache.has(x))) {
        vmute.setStyle('SECONDARY').setDisabled(true);
    } else {
        vmute.setStyle('DANGER');
    }

    const row = new MessageActionRow()
    .addComponents([ mute, vmute ]);
  
    let ozi = new MessageEmbed()  
    .setDescription(`${member} üyesinin kaldırmak istediğiniz chat/voice mute cezalarını butonla aşağıdan seçiniz.`)
    .setFooter({ text: `Kapalı olan buton mutesi olmadığını gösterir kullanılamaz.`})
    .setAuthor({ name: message.guild.name, iconURL: message.guild.iconURL({ dynamic: true }) })
    .setThumbnail(message.guild.iconURL({ dynamic: true, size: 2048 }));

  let msg = await message.channel.send({ embeds: [ozi], components: [row] })

  var filter = button => button.user.id === message.author.id;

  let collector = await msg.createMessageComponentCollector({ filter, time: 30000 })

  collector.on("collect", async (button) => {

    if (button.customId === "mute") {
      await button.deferUpdate();

      mute.setStyle('SECONDARY').setDisabled(true);

      message.react(green)
      member.roles.remove(conf.chatMute);
      const data = await penals.findOne({ userID: member.user.id, guildID: message.guild.id, type: "CHAT-MUTE", active: true });
      if (data) {
        data.active = false;
        await data.save();
      }

      if (conf.Main.dmMessages) member.send({ content:`**${message.guild.name}** sunucusunda, **${message.author.tag}** tarafından susturmanız kaldırıldı!`}).catch(() => {});

      let ozi = new MessageEmbed()  
      .setDescription(`${member.toString()} üyesinin susturması, ${message.author} tarafından kaldırıldı.`)
      .setFooter({ text: `Kapalı olan buton mutesi olmadığını gösterir kullanılamaz.`})
      .setAuthor({ name: message.guild.name, iconURL: message.guild.iconURL({ dynamic: true }) })
      .setThumbnail(message.guild.iconURL({ dynamic: true, size: 2048 }));
  
      await msg.edit({ embeds: [ozi], components: [row] });
    }
    if (button.customId === "vmute") {
      await button.deferUpdate();

      vmute.setStyle('SECONDARY').setDisabled(true);

      message.react(green)
      member.roles.remove(conf.voiceMute);
      if (member.voice.channelId && member.voice.serverMute) member.voice.setMute(false);
      const data = await penals.findOne({ userID: member.user.id, guildID: message.guild.id, type: "VOICE-MUTE", active: true });
      if (data) {
        data.active = false;
        data.removed = true;
        await data.save();
      }

      if (conf.Main.dmMessages) member.send({ content:`**${message.guild.name}** sunucusunda, **${message.author.tag}** tarafından **sesli kanallarda** olan susturmanız kaldırıldı!`}).catch(() => {});

      let ozi = new MessageEmbed()  
      .setDescription(`${member.toString()} üyesinin **sesli kanallarda** susturması, ${message.author} tarafından kaldırıldı.`)
      .setFooter({ text: `Kapalı olan buton mutesi olmadığını gösterir kullanılamaz.`})
      .setAuthor({ name: message.guild.name, iconURL: message.guild.iconURL({ dynamic: true }) })
      .setThumbnail(message.guild.iconURL({ dynamic: true, size: 2048 }));
  
      await msg.edit({ embeds: [ozi], components: [row] });
    }

  })
  },
};


