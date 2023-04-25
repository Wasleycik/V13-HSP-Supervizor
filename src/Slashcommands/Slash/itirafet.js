const {Client, CommandInteraction, MessageEmbed, Permissions} = require("discord.js");
const { SlashCommandBuilder, hyperlink } = require("@discordjs/builders");
const conf = require("../../configs/sunucuayar.json");
const isimcek = require("../../configs/isimcek.json");
module.exports = {
  data: new SlashCommandBuilder()
    .setName("itiraf-yap")
    .setDescription("İtiraf Yaparsın.")
    .addStringOption(option => option.setName('itiraf').setDescription('İtirafını Yaz')),

  async execute(interaction , client) {
  const uye = interaction.member
  const itiraf = interaction.options.getString("itiraf");
 let itiriafkanalı = await client.channels.cache.find(x => x.name.includes(isimcek.kanalcek.itirafkanal))
 let itiraflogu = await client.channels.cache.find(x => x.name.includes(isimcek.kanalcek.itiraflog))

       
          itiriafkanalı.send({
            embeds: [new MessageEmbed()
              .setAuthor({ name: interaction.guild.name, iconURL: interaction.guild.iconURL({ dynamic: true }) })
              .setDescription(`
Gizemli Bir Kullanıcıdan <t:${Math.floor(Date.now() / 1000)}> Tarihinde Yeni Bir İtiraf Geldi.

\`•\` **Gizemli Kullanıcının İtirafı : ** || ${itiraf} ||`)
              .setColor("#2ACAEA")
              .setFooter({text:`/itiraf-yap İle Sende İtiraf Et`})
            ]
          })

    
          itiraflogu.send({
            embeds: [new MessageEmbed()
              .setAuthor({name:interaction.user.tag,iconURL: interaction.user.avatarURL()})   
              .setDescription(`
${uye} <t:${Math.floor(Date.now() / 1000)}> Tarihinde Bir İtirafta Bulundu 

\`•\` İtiraf Eden : ${uye} \`${uye.id}\`
\`•\` İtiraf Tarihi : <t:${Math.floor(Date.now() / 1000)}>
\`•\` İtirafı :  || ${itiraf} ||
`)
              .setColor("#2ACAEA")
            ]
          })
        


   interaction.reply({content: `İtirafın gönderildi.`, ephemeral: true});
   
   
},
};