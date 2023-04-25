const conf = require("../../configs/sunucuayar.json")
const { MessageEmbed, Client, Message, MessageActionRow, MessageButton, MessageSelectMenu } = require("discord.js");
const { red } = require("../../configs/emojis.json")
const emoji = require("../../configs/emojis.json")
const moment = require("moment");
moment.locale("tr");

module.exports = {
  conf: {
    aliases: ["say"],
    name: "say",
    help: "say",
    category: "yetkili",
  },

  run: async (client, message, args, embed) => {
    if(!conf.teyitciRolleri.some(oku => message.member.roles.cache.has(oku)) && !conf.sahipRolu.some(oku => message.member.roles.cache.has(oku)) && !message.member.permissions.has('ADMINISTRATOR')) 
    {
      message.react(red)
      return
    }
    let Tag = conf.tag 

    var takviye = rakam(message.guild.premiumSubscriptionCount)
    var takviyesayı = rakam(message.guild.premiumTier)
    var TotalMember = rakam(message.guild.memberCount)
    var AktifMember = rakam(message.guild.members.cache.filter(m => m.presence && m.presence.status !== "offline").size)
    let tag = `${rakam(message.guild.members.cache.filter(u => u.user.username.includes(Tag)).size)}`
    var sesli = rakam(message.guild.members.cache.filter((x) => x.voice.channel).size)

   let sayembed = new MessageEmbed()
               .setColor('RANDOM')
               .setAuthor({ name: message.guild.name, iconURL: message.guild.iconURL({ dynamic: true }) })
               .setDescription(`
<t:${Math.floor(Date.now() / 1000)}:R> **Tarihli Sunucu Verisi**

\`•\` Sunucuda Toplam **${TotalMember}** (\`${AktifMember} Aktif\`) Kullanıcı Bulunmakta.
\`•\` Şu An Sesli Kanallarda **${sesli}** (\`+${message.guild.members.cache.filter(x => x.user.bot && x.voice.channel).size} Bot\`) Kişi Bulunmakta.
\`•\` Toplam Taglı **${tag}** Kişi Tagımızı (\`${Tag}\`) Alarak Bizi Desteklemiş.
\`•\` Sunucumuza **${takviye}** adet boost Basmış ${message.guild.premiumTier != "Yok" ? `(\`${message.guild.premiumTier.replace("TIER_1","1").replace("TIER_2","2").replace("TIER_3", "3")}.Seviye\`)` : ``}
`)

const row = new MessageActionRow()
		.addComponents(
  new MessageButton().setCustomId("detaylısay").setLabel("Detaylı").setStyle("SECONDARY"),
  new MessageButton().setCustomId("yenile").setLabel("♻️ Yenile").setStyle("PRIMARY"),
	);

      const msg = message.channel.send({ embeds: [sayembed], components: [row]}).then(async (msg) => {
      var filter = (button) => button.user.id === message.author.id;
      const collector = msg.createMessageComponentCollector({ filter, componentType: 'BUTTON', max: 3, time: 60000 })
      collector.on("collect", async interaction => {

if (interaction.customId === "yenile") {
    
/*const row1 = new MessageActionRow()
		.addComponents(
  new MessageButton().setCustomId("detaylısay").setLabel("Detaylı").setStyle("SECONDARY"),
  new MessageButton().setCustomId("menü").setLabel("♻️ Yenile").setStyle("PRIMARY"),

	);*/

   let sayembed1 = new MessageEmbed()
               .setColor('RANDOM')
               .setAuthor({ name: message.guild.name, iconURL: message.guild.iconURL({ dynamic: true }) })
               .setDescription(`
<t:${Math.floor(Date.now() / 1000)}:R> **Tarihli Sunucu Verisi**

\`•\` Sunucuda Toplam **${TotalMember}** (\`${AktifMember} Aktif\`) Kullanıcı Bulunmakta.
\`•\` Şu An Sesli Kanallarda **${sesli}** (\`+${message.guild.members.cache.filter(x => x.user.bot && x.voice.channel).size} Bot\`) Kişi Bulunmakta.
\`•\` Toplam Taglı **${tag}** Kişi Tagımızı Alarak Bizi Desteklemiş.
\`•\` Sunucumuza **${takviye}** adet boost Basmış ${message.guild.premiumTier != "Yok" ? `(\`${message.guild.premiumTier.replace("TIER_1","1").replace("TIER_2","2").replace("TIER_3", "3")}.Seviye\`)` : ``}
`)

    interaction.update({
      embeds: [sayembed1], components: [row]
  })
}

if (interaction.customId === "detaylısay") {

    const row2 = new MessageActionRow()
		.addComponents(
  new MessageButton().setCustomId("yenile").setLabel("◀️ Geri").setStyle("PRIMARY"),
	);

    var ToplamYetkili = message.guild.members.cache.filter(yetkili => yetkili.roles.cache.has(conf.staffs[0])).size

    interaction.update({
      embeds: [embed
        .setAuthor({ name: message.guild.name, iconURL: message.guild.iconURL({ dynamic: true }) })
        .setDescription(`
\`\`\`fix
Aşağıda Sunucu Verilerini Daha Detaylı Görebilirsiniz.
\`\`\`
       \`•\` **Sunucunun Toplam Üye Sayısı :** \`${rakam(message.guild.memberCount)}\`
       \`•\` **Sunucudaki Toplam Aktif Kullanıcı Sayısı :** \`${AktifMember}\`
       \`•\` **Sesli Kanallardaki Toplam Üye Sayısı :** \`${sesli}\`
       \`•\` **Sesli Kanallardaki Toplam Bot Sayısı :** \`${message.guild.members.cache.filter(x => x.user.bot && x.voice.channel).size}\`
       \`•\` **Sunucunun Tagı :** \`${Tag}\`
       \`•\` **Sunucunun Toplam Taglı Sayısı :** \`${tag}\`
       \`•\` **Sunucunun Toplam Yetkili Sayısı :** \`${ToplamYetkili}\`  
       \`•\` **Sunucunun Boost Sayısı :** \`${takviye}\`
       \`•\` **Sunucunun Boost Seviyesi :** ${message.guild.premiumTier != "Yok" ? `\`${message.guild.premiumTier.replace("TIER_1","1").replace("TIER_2","2").replace("TIER_3", "3")}.Seviye\`` : ``}
       \`•\` **Sunucudaki Bot Sayısı :** \`${message.guild.members.cache.filter(x => x.user.bot).size}\`
\`\`\`fix
Aşağıda Saate Göre Giriş İstatistiği Verilmiştir.
\`\`\`
       \`•\` **1 saat :** \`${rakam(message.guild.members.cache.filter(ramal => (new Date().getTime() - ramal.joinedTimestamp) < 1000 * 60 * 60).size)}\` kullanıcı giriş yapmış.
       \`•\` **1 gün :** \`${rakam(message.guild.members.cache.filter(ramal => (new Date().getTime() - ramal.joinedTimestamp) < 1000 * 60 * 60 * 24).size)}\` kullanıcı giriş yapmış.
       \`•\` **1 hafta :** \`${rakam(message.guild.members.cache.filter(ramal => (new Date().getTime() - ramal.joinedTimestamp) < 1000 * 60 * 60 * 24 * 7).size)}\` kullanıcı giriş yapmış.
       \`•\` **1 ay :**\`${rakam(message.guild.members.cache.filter(ramal => (new Date().getTime() - ramal.joinedTimestamp) < 1000 * 60 * 60 * 24 * 30).size)}\` kullanıcı giriş yapmış.
      `)

    ], components: [row2]
  })
}


})
            collector.on('end', () => {
  const timeoutroww = new MessageActionRow()
  .addComponents(
  new MessageButton().setCustomId("detaylısay").setLabel("Detaylı").setStyle("SECONDARY").setDisabled(true),
  new MessageButton().setCustomId("yenile").setLabel("♻️ Yenile").setStyle("PRIMARY").setDisabled(true),
);
 msg.edit({components: [timeoutroww]})
            });
})
 },
 };

function rakam(sayi) {
  var basamakbir = sayi.toString().replace(/ /g, "     ");
  var basamakiki = basamakbir.match(/([0-9])/g);
  basamakbir = basamakbir.replace(/([a-zA-Z])/g, "bilinmiyor").toLowerCase();
  if (basamakiki) {
    basamakbir = basamakbir.replace(/([0-9])/g, d => {
      return {
        '0': `0`,
        '1': `1`,
        '2': `2`,
        '3': `3`,
        '4': `4`,
        '5': `5`,
        '6': `6`,
        '7': `7`,
        '8': `8`,
        '9': `19`
      }
      [d];
    })
  }
  return basamakbir;
}