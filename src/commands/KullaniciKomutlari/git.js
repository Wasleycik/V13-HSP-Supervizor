const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");
const moment = require("moment");
moment.locale("tr");
const conf = require("../../configs/sunucuayar.json");
const { green, red } = require("../../configs/emojis.json")
const client = global.bot;

module.exports = {
    conf: {
      aliases: ["git"],
      name: "git",
      help: "git <Kişi/ID>",
      category: "kullanıcı",
    },
  
run: async (client, message, args, embed, prefix) => {

  let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;

  if (!message.member.voice.channel) {
    return message.reply({ content: "Bir ses kanalında olmalısın!" });
}
  if (!member) {
    return message.reply({ content: "Bir üye etiketle ve tekrardan dene!" });
}
  if (!member.voice.channel) {
    return message.reply({ content: "Bu kullanıcı herhangi bir ses kanalında bulunmuyor!" });
}
  if (message.member.voice.channel === member.voice.channel) {
    return message.reply({ content: "Zaten aynı kanaldasınız!" });
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

  if (message.member.permissions.has("ADMINISTRATOR")) {
      message.member.voice.setChannel(member.voice.channel.id)
      message.react(green)
      message.reply({ embeds: [embed.setThumbnail(message.author.avatarURL({ dynamic: true, size: 2048 })).setDescription(`${message.author}, ${member} kişisini yanınıza gittiniz.`)] });
      const log = embed
      .setColor("#2f3136")
      .setDescription(`
      Bir Transport işlemi gerçekleşti.
  
      Odaya Giden Kullanıcı: ${member} - \`${member.id}\`
      Odasına Gidilen Yetkili: ${message.author} - \`${message.author.id}\`
      `)
      .setFooter({ text: `${moment(Date.now()).format("LLL")}`})
      client.channels.cache.find(x => x.name == "voice_log").wsend({ embeds: [log] });
} else {    

let ozi = new MessageEmbed()
.setDescription(`${member}, ${message.author} \`${member.voice.channel.name}\` odasına gelmek istiyor. Kabul ediyor musun?`)
.setFooter({ text: `Lütfen 30 saniye içerisinde işlem iptal edilecektir.`})
.setAuthor({ name: member.displayName, iconURL: member.user.displayAvatarURL({ dynamic: true }) })

let msg = await message.channel.send({ content: `${member}`, embeds: [ozi], components: [row] })

var filter = button => button.user.id === member.user.id;

let collector = await msg.createMessageComponentCollector({ filter, time: 30000 })

collector.on("collect", async (button) => {

if(button.customId === "onay") {
  await button.deferUpdate();

const embeds = new MessageEmbed() 
.setAuthor({ name: member.displayName, iconURL: member.user.avatarURL({ dynamic: true })})
.setFooter({ text: message.author.tag, iconURL: message.author.avatarURL({ dynamic: true })})
.setTimestamp()
.setDescription(`${message.author}, ${member} kişisinin yanına başarıyla gittiniz.`)

message.member.voice.setChannel(member.voice.channel.id)

msg.edit({
embeds: [embeds],
components : [row2]
})

}

if(button.customId === "red") {
  await button.deferUpdate();

const embedss = new MessageEmbed() 
.setAuthor({ name: member.displayName, iconURL: member.user.avatarURL({ dynamic: true })})
.setFooter({ text: message.author.tag, iconURL: message.author.avatarURL({ dynamic: true })})
.setTimestamp()
.setDescription(`${message.author}, ${member} yanına gitme işlemi iptal edildi.`)

msg.edit({
  embeds: [embedss],
  components : [row3]
})
    }
 });

}
}
}
