const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");
const { red } = require("../../configs/emojis.json")

module.exports = {
  conf: {
    aliases: ["kilit","lock"],
    name: "kilit",
    help: "kilit",
    category: "yönetim",
  },

  run: async (client, message, args) => {  
    if(!message.member.permissions.has('ADMINISTRATOR')) 
    {
      message.react(red)
      return
    }

    let ac = new MessageButton()
    .setCustomId("ac")
    .setStyle("SECONDARY")
    .setEmoji("🔓");

    let kapa = new MessageButton()
    .setCustomId("kapa")
    .setStyle("SECONDARY")
    .setEmoji("🔒");

    if (message.channel.permissionsFor(message.guild.id).has('SEND_MESSAGES') === (true || null)) {
      ac.setStyle('SUCCESS').setDisabled(true);
    } else {
      ac.setStyle('SUCCESS');
    }

    if (message.channel.permissionsFor(message.guild.id).has('SEND_MESSAGES') === false) {
      kapa.setStyle('DANGER').setDisabled(true);
    } else {
      kapa.setStyle('DANGER');
    }

    const row = new MessageActionRow()
    .addComponents([ ac, kapa ]);
  
  
    let ozi = new MessageEmbed()  
    .setDescription(`${message.author} Kanal Kilidini Aktifleştirmek ve Deaktifleştirmek için butonları kullanınız.`)
    .setFooter({ text: `Kapalı olan buton şuanki kanalın kilit durumunu gösterir tekrar kullanılamaz.`})
    .setAuthor({ name: message.guild.name, iconURL: message.guild.iconURL({ dynamic: true }) })
    .setThumbnail(message.guild.iconURL({ dynamic: true, size: 2048 }));

  let msg = await message.channel.send({ embeds: [ozi], components: [row] })

  var filter = button => button.user.id === message.author.id;

  let collector = await msg.createMessageComponentCollector({ filter, time: 30000 })

  collector.on("collect", async (button) => {

    if (button.customId === "ac") {
      await button.deferUpdate();
      let everyone = message.guild.roles.cache.find(r => r.name === "@everyone");
      message.channel.permissionOverwrites.edit(everyone.id, {
        SEND_MESSAGES: null
      }).then(async() => {
          message.react("🔓")
          await msg.edit({ content: `Kanalın kilidi başarıyla açıldı.`, embeds: [], components: [] });
      })
    }
    if (button.customId === "kapa") {
      await button.deferUpdate();
      let everyone = message.guild.roles.cache.find(r => r.name === "@everyone");
      message.channel.permissionOverwrites.edit(everyone.id, {
          SEND_MESSAGES: false
      }).then(async() => {
          message.react("🔒")
          await msg.edit({ content: `Kanal başarıyla kilitlendi.`, embeds: [], components: [] });
      })
    }

  })
  },
};