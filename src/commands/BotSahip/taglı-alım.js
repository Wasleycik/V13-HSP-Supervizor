const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");
const conf = require("../../configs/sunucuayar.json")
const isimcek = require("../../configs/isimcek.json")
const emojis = require("../../configs/emojis.json")
const registerData  = require("../../schemas/registerStats");

module.exports = {
    conf: {
      aliases: ["taglıalım","taglı-alım"],
      name: "taglı-alım",
      help: "taglı-alım",
      category: "sahip",
      owner: true,
    },

  run: async (client, message, args) => {  

    let data = await registerData.findOne({ guildID: message.guild.id })
    if(!data) new registerData({guildID: message.guild.id, tagMode: false}).save();

    let ac = new MessageButton()
    .setCustomId("ac")
    .setLabel("Aktif")
    .setStyle("SECONDARY")

    let kapa = new MessageButton()
    .setCustomId("kapa")
    .setLabel("Deaktif")
    .setStyle("SECONDARY")

    if (data && data.tagMode === true) {
      ac.setStyle('SECONDARY').setDisabled(true);
    } else {
      ac.setStyle('SUCCESS');
    }

    if (data && data.tagMode === false) {
      kapa.setStyle('SECONDARY').setDisabled(true);
    } else {
      kapa.setStyle('DANGER');
    }

    const taglialimrow = new MessageActionRow()
    .addComponents([ ac, kapa ]);
  
  
    let taglialimembed = new MessageEmbed()  
    .setDescription(`
${message.author} Taglı Modunu Aktifleştirmek ve Deaktifleştirmek için butonları kullanınız.

**Taglı Alım Modu Şu Anda :**  ${data.tagMode ? `Açık` : `kapalı`}

`)
    .setFooter({ text: `Kapalı olan buton şuanki taglı modunu gösterir tekrar kullanılamaz.`})
    .setAuthor({ name: message.guild.name, iconURL: message.guild.iconURL({ dynamic: true }) })

  let msg = await message.channel.send({ embeds: [taglialimembed], components: [taglialimrow] })

  var filter = button => button.user.id === message.author.id;

  let collector = await msg.createMessageComponentCollector({ filter, time: 30000 })

  collector.on("collect", async (button) => {

    if (button.customId === "ac") {
      await button.deferUpdate();
      let data = await registerData.findOne({ guildID: message.guild.id })
      data.tagMode = true;
      data.save();
      msg.edit({ content: `Taglı Alım modu başarıyla **Aktif** edildi!`, embeds: [], components: [] });
    }
    if (button.customId === "kapa") {
      await button.deferUpdate();
      let data = await registerData.findOne({ guildID: message.guild.id })
      data.tagMode = false;
      data.save();
      msg.edit({ content: `Taglı Alım modu başarıyla **Deaktif** edildi!`, embeds: [], components: [] });
    }

  })
}
}
