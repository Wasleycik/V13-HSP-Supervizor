const { MessageEmbed, Client, Message, MessageActionRow, MessageButton, MessageSelectMenu } = require("discord.js");
const Discord = require('discord.js');
const client = global.bot;
const conf = require("../../configs/sunucuayar.json")
const isimcek = require("../../configs/isimcek.json")
const emojis = require("../../configs/emojis.json")

module.exports = {
  conf: {
    aliases: ["denetims"],
    name: "denetim",
    help: "denetim",
    category: "sahip",
    owner: true,
  },

  run: async (client, message, args) => {

		const embed = new Discord.MessageEmbed()
.setColor("#2f3136")
.setAuthor(`Sunucu Denetim Kanal / Rol`)
.setDescription(`
Aşağıda **${message.guild.name}** sunucusuna ait denetim kaydında bulunan silinen rolleri ve kanalları listelersiniz.
`);
  const row = new MessageActionRow()
  .addComponents(
  new MessageButton()
  .setCustomId("rol")
  .setLabel("🛑 Rol")
  .setStyle("SECONDARY"),

  new MessageButton()
  .setCustomId("kanal")
  .setLabel("🛑 Kanal")
  .setStyle("SECONDARY"),


  new MessageButton()
  .setCustomId("iptal")
  .setLabel("❌ İptal Et")
  .setStyle("SECONDARY"),
  );



      let msg = await message.channel.send({embeds: [embed], components: [row]}).then(async (msg) => {
     
    var filter = (interaction) => interaction.user.id == message.author.id;
    let collector = msg.createMessageComponentCollector({filter: filter, time: 60000});
    collector.on('end', (collected, reason) => {
        if(reason == "time"){
            msg.delete().catch(err => {});
        }
    })
    collector.on('collect', async (interaction) => {

 if (interaction.customId === "rol") {

      const audit = await message.guild.fetchAuditLogs({ type: 'ROLE_DELETE' }).then(a => a.entries)
      const denetim = audit.filter(e => Date.now() - e.createdTimestamp < 1000 * 60 * 60).map(e => `Rol İsim: **${e.changes.filter(e => e.key === 'name').map(e => e.old)}**\n Rol ID: \`${e.target.id}\`\n\n`)
   		const embed1 = new Discord.MessageEmbed()
.setColor("#2f3136")
.setAuthor(`Sunucu Rol Denetim`)
.setDescription(`
Son 1 saat de silinmiş herhangi bir rol bulunamadı!
`);   
if (!denetim.length) return interaction.reply({embeds: [embed1], components: [], ephemeral: true})

       		const rold = new Discord.MessageEmbed()
.setColor("#2f3136")
.setAuthor(`Son 1 Saate Silinen Roller`)
.setDescription(`
${denetim}
`);   
        interaction.reply({embeds: [rold], components: [], ephemeral: true})

}

 if (interaction.customId === "kanal") {
      const audit = await message.guild.fetchAuditLogs({ type: 'CHANNEL_DELETE' }).then(a => a.entries)

      const denetim = audit.filter(e => Date.now() - e.createdTimestamp < 1000 * 60 * 60).map(e => `Kanal İsim: (**${e.changes.filter(e => e.key === 'name').map(e => e.old)}**)\n Kanal ID: \`${e.target.id}\`\n\n`)
       		const embed2 = new Discord.MessageEmbed()
.setColor("#2f3136")
.setAuthor(`Sunucu Kanal Denetim`)
.setDescription(`
Son 1 saat de silinmiş herhangi bir kanal bulunamadı!
`);     
if (!denetim.length) return interaction.reply({embeds: [embed2], components: [], ephemeral: true})

       		const kanald = new Discord.MessageEmbed()
.setColor("#2f3136")
.setAuthor(`Son 1 Saate Silinen Kanallar`)
.setDescription(`
${denetim}
`);   
        interaction.reply({embeds: [kanald], components: [], ephemeral: true})

}


if(interaction.customId === "iptal") {
  if(msg) msg.delete().catch({})
  interaction.reply({ content :"İşlem Başarıyla İptal Edildi.", ephemeral: true })
}
  
      })

    }
 )}}