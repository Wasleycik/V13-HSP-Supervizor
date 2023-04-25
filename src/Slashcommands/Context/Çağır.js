const { ApplicationCommandType } = require('discord-api-types/v10');
const { ContextMenuCommandBuilder, hyperlink } = require("@discordjs/builders");
const { MessageEmbed, MessageActionRow, MessageButton, IntegrationApplication } = require("discord.js");
const conf = require("../../configs/sunucuayar.json");
const { green, red } = require("../../configs/emojis.json");
const moment = require("moment");
require("moment-duration-format")
moment.locale("tr")
const client = global.bot;

module.exports = {
	data: new ContextMenuCommandBuilder()
	.setName('Çağır')
	.setType(ApplicationCommandType.User),
		
  async execute(interaction, client) {
let member = client.guilds.cache.get(conf.GuildID).members.cache.get(interaction.targetId);
if (!member) return;

if (!interaction.member.voice.channel) {
  return interaction.reply({ content: "Bir ses kanalında olmalısın!", ephemeral: true });
}
if (!member.voice.channel) {
  return interaction.reply({ content: "Bu kullanıcı herhangi bir ses kanalında bulunmuyor!", ephemeral: true });
}
if (interaction.member.voice.channel === member.voice.channel) {
  return interaction.reply({ content: "Zaten aynı kanaldasınız!", ephemeral: true });
}

const row = new MessageActionRow()
.addComponents(

new MessageButton()
.setCustomId("onay")
.setLabel("Kabul Et")
.setStyle("SUCCESS")
.setEmoji("915754671728132126"),

new MessageButton()
.setCustomId("red")
.setLabel("Reddet")
.setStyle("DANGER")
.setEmoji("920412153712889877"),
);

const row2 = new MessageActionRow()
.addComponents(
new MessageButton()
.setCustomId("onayy")
.setLabel("İşlem Başarılı")
.setStyle("SUCCESS")
.setDisabled(true),
);

const row3 = new MessageActionRow()
.addComponents(
new MessageButton()
.setCustomId("redd")
.setLabel("İşlem Başarısız")
.setStyle("DANGER")
.setDisabled(true),
);

if (interaction.member.permissions.has("ADMINISTRATOR")) {
    member.voice.setChannel(interaction.member.voice.channel.id);
    interaction.reply({ embeds: [new MessageEmbed().setThumbnail(interaction.user.avatarURL({ dynamic: true, size: 2048 })).setDescription(`${interaction.user}, ${member} kişisini yanınıza taşıdınız.`)], ephemeral: true });
    const log = new MessageEmbed()
      .setColor("#2f3136")
      .setDescription(`
    Bir Transport işlemi gerçekleşti.
  
    Odaya Taşınan Kullanıcı: ${member} - \`${member.id}\`
    Odasına Taşıyan Yetkili: ${interaction.user} - \`${interaction.user.id}\``)
    .setFooter({ text: `${moment(Date.now()).format("LLL")}`})
      client.channels.cache.find(x => x.name == "voice_log").wsend({ embeds: [log] });
  } else {

    let ozi = new MessageEmbed()  
      .setDescription(`${member}, ${interaction.user} \`${interaction.member.voice.channel.name}\` odasına seni çekmek istiyor. Kabul ediyor musun?`)
      .setFooter({ text: `Lütfen 30 saniye içerisinde işlem iptal edilecektir.`})
      .setAuthor({ name: member.displayName, iconURL: member.user.displayAvatarURL({ dynamic: true }) })

    let msg = await interaction.reply({ content: `${member}`, embeds: [ozi], components: [row] })

    var filter = button => button.user.id === member.user.id;

    let collector = await interaction.channel.createMessageComponentCollector({ filter, componentType: 'BUTTON', max: 1, time: 30000 })

    collector.on("collect", async (button) => {

      if (button.customId === "onay") {
        await button.deferUpdate();

        const embeds = new MessageEmbed()
          .setAuthor({ name: member.displayName, iconURL: member.user.avatarURL({ dynamic: true }) })
          .setFooter({ text: interaction.user.tag, iconURL: interaction.user.avatarURL({ dynamic: true }) })
          .setTimestamp()
          .setDescription(`${interaction.user}, ${member} kişisini yanınıza taşıdınız.`)
        member.voice.setChannel(interaction.member.voice.channel.id);
        await interaction.deleteReply();
        await interaction.followUp({ embeds: [embeds], components: [row2], ephemeral: true })
      }

      if (button.customId === "red") {
        await button.deferUpdate();

        const embedss = new MessageEmbed()
          .setAuthor({ name: member.displayName, iconURL: member.user.avatarURL({ dynamic: true })})
          .setFooter({ text: interaction.user.tag, iconURL: interaction.user.avatarURL({ dynamic: true })})
          .setTimestamp()
          .setDescription(`${interaction.user}, ${member} yanına taşıma işlemi iptal edildi.`)
          await interaction.deleteReply();
          await interaction.followUp({ embeds: [embedss], components: [row3], ephemeral: true })
      }

    });
  }
}
};