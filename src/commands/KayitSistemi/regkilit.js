const { MessageEmbed, Client, Message, MessageActionRow, MessageButton, MessageSelectMenu } = require("discord.js");
const Discord = require('discord.js');
const client = global.bot;
const conf = require('../../configs/sunucuayar.json');
const registerData  = require("../../schemas/registerStats");

module.exports = {
  conf: {
    aliases: ["registerkilit","regkilit"],
    name: "registerkilit",
    help: "registerkilit",
    category: "kayıt",
    owner: true,
  },

  run: async (client, message, args) => {
     if (!message.member.permissions.has("ADMINISTRATOR")) return message.channel.send({ embeds: [embed.setDescription(`${message.member}, Bu komutu kullanmak için gerekli yetkiye sahip değilsin!`)] });
     let data = await registerData.findOne({ guildID: message.guild.id })
     if(!data) new registerData({guildID: message.guild.id, regkilit: false}).save();
      let channels = message.guild.channels.cache.filter(ch => ch.parentId == conf.registerParents)

const embed = new Discord.MessageEmbed()
.setColor("#2f3136")
.setAuthor({ name: message.guild.name, iconURL: message.guild.iconURL({ dynamic: true }) })
.setDescription(`
Aşağıdaki Butonları Kullanarak Sunucunun Register Sistemini Kapatıp Açabilirsiniz.
\`\`\`diff
- Register Kilit Sistemi : ${data.regkilit ? "Açık" : "Kapalı"}

+ Register voice kanallarının ve register sisteminin kilitlenmesini/açılmasını istiyorsanız: Register Kilit butonunu kullanın.\`\`\`

`);

    let ac = new MessageButton()
    .setCustomId("kayıtaç")
    .setLabel("Kayıtları Aç")
    .setStyle("SECONDARY")

    let kapa = new MessageButton()
    .setCustomId("kayıtkapa")
    .setLabel("Kayıtları Kapat")
    .setStyle("SECONDARY")

    let iptal = new MessageButton()
    .setCustomId("iptal")
    .setLabel("İptal Et")
    .setStyle("SECONDARY")

    if (data && data.regkilit === false) {
      ac.setStyle('SECONDARY').setDisabled(true);
    } else {
      ac.setStyle('SUCCESS');
    }

    if (data && data.regkilit === true) {
      kapa.setStyle('SECONDARY').setDisabled(true);
    } else {
      kapa.setStyle('DANGER');
    }

    const regkilitrow = new MessageActionRow()
    .addComponents([ ac, kapa, iptal]);

      let msg = await message.channel.send({embeds: [embed], components: [regkilitrow]}).then(async (msg) => {
     
    var filter = (interaction) => interaction.user.id == message.author.id;
    let collector = msg.createMessageComponentCollector({filter: filter, time: 60000});
    collector.on('collect', async (interaction) => {

 if (interaction.customId === "kayıtaç") {

const kilitaçembed = new Discord.MessageEmbed()
.setColor("#2f3136")
.setAuthor(`Register Kilit`)
.setDescription(`
**${message.guild.name}** Sunucusunun Register Kilit sistemi şuan: ${data.regkilit ? "Kapatıldı" : ""}

`);

        data.regkilit = false;
        data.save();
interaction.update({embeds: [kilitaçembed], components: []})
}


 if (interaction.customId === "kayıtkapa") {

const kilitleembed = new Discord.MessageEmbed()
.setColor("#2f3136")
.setAuthor(`Register Kilit`)
.setDescription(`
**${message.guild.name}** Sunucusunun Register Kilit sistemi şuan: ${data.regkilit ? "" : "Açıldı"}

`);

        data.regkilit = true;
        data.save();

interaction.update({embeds: [kilitleembed], components: []})
}


if(interaction.customId === "iptal") {
  if(msg) msg.delete().catch({})
  interaction.reply({ content :"İşlem Başarıyla İptal Edildi.", ephemeral: true })
}
      collector.on('end', (collected, reason) => {
        if(reason == "time"){
            msg.delete().catch(err => {});
        }
    })
    

    })})}}