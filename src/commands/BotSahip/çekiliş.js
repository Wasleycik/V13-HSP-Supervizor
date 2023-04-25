const cekilis = require('../../schemas/cekilis')
const { MessageEmbed, Client, Message, MessageActionRow, MessageSelectMenu } = require("discord.js");
const moment = require("moment");
const Discord = require("discord.js");
const ms = require("ms")
const conf = require("../../configs/sunucuayar.json")
const isimcek = require("../../configs/isimcek.json")
const emojis = require("../../configs/emojis.json")
module.exports = {
  conf: {
    aliases: ['çekiliş'],
    name: "çekiliş",
    help: "çekiliş",
    category: "sahip",
    owner: true,
  },
 
    run: async (client, message, args, durum, kanal ,embed) => {
    if (!message.member.permissions.has("ADMINISTRATOR")) return message.channel.send({ embeds: [embed.setDescription(`**UYARI :** Bu komutu kullanabilmek için yeterli yetkiye sahip değilsin!`)] }).sil(15)
    let zaman = args[0]
    let kazanan = args[1]
    let odul = args.slice(2).join(" ");
    let arr = [];
    if (!zaman) return message.channel.send({ content: `\`HATA!\` Lütfen komutu doğru kullanın! \`.çekiliş 10m 1 Netflix\`` })
    if (!kazanan) return message.channel.send({ content: `\`HATA!\` Lütfen komutu doğru kullanın! \`.çekiliş 10m 1 Netflix\`` })
    if (isNaN(kazanan)) return message.channel.send({ content: `\`HATA!\` Lütfen komutu doğru kullanın! \`.çekiliş 10m 1 Netflix\`` })
    if (kazanan > 1) return message.channel.send({ content: `\`HATA!\` Şuanlık sadece 1 kazanan belirleyebilirsiniz!` })
    if (!odul) return message.channel.send({ content: `\`HATA!\` Lütfen komutu doğru kullanın! \`.çekiliş 10m 1 Netflix\`` })
    let sure = ms(zaman)
    let kalan = Date.now() + sure
    if (message) message.delete();
    const row = new Discord.MessageActionRow().addComponents(
      new Discord.MessageButton().setCustomId("katil").setEmoji("989311021736923147").setStyle("PRIMARY")
    )

		const snç = new Discord.MessageEmbed()
.setAuthor(`🎉 ÇEKİLİŞ BAŞLADI 🎉`)
.setTitle(`Hediye : \`${odul}\``)
.setFooter(`${kazanan} Kazanan!`)
.setTimestamp()
.setDescription(` 
Çekilişi Başlatan : ${message.author}
Bitiş Zamanı : <t:${Math.floor(kalan / 1000)}:R>
\`Aşağıdaki butona basarak katılabilirsiniz!\`
        `);

    let msg = await message.channel.send({
      embeds: [snç], components: [row]
    })

    setTimeout(() => {
      if (arr.length <= 1) {
        if (msg) msg.edit({
          embeds: [new Discord.MessageEmbed().setColor("RANDOM").setAuthor(`🎉 ÇEKİLİŞ İPTAL EDİLDİ🎉`).setTitle(`Hediye : \`${odul}\``).setDescription(`
Çekilişe katılım olmadığından çekiliş iptal edildi!
`)], components: []
        })
        return;
      }
      let random = arr[Math.floor(Math.random() * arr.length)]
      message.channel.send({ content: `<@${random}> tebrikler kazandın!` })
      if (msg) msg.edit({
        embeds: [new Discord.MessageEmbed().setColor("RANDOM").setAuthor(`🎉 ÇEKİLİŞ SONUÇLANDI🎉`).setTitle(`Hediye : \`${odul}\``).setFooter(`${arr.length} katılımcı!`).setDescription(`
Çekiliş sonuçlandı! 
Çekilişi Başlatan : ${message.author} 
Kazanan : <@${random}>
                    `)], components: []
      })
    }, sure)

    let collector = await msg.createMessageComponentCollector({})
    collector.on("collect", async (button) => {
      button.deferUpdate(true)
      if (button.customId == "katil") {
        let tikdata = await cekilis.findOne({ messageID: button.message.id })
        if (tikdata?.katilan.includes(button.member.id)) return;
        await cekilis.findOneAndUpdate({ messageID: button.message.id }, { $push: { katilan: button.member.id } }, { upsert: true })
        arr.push(button.member.id)
        if (msg) msg.edit({
          embeds: [new Discord.MessageEmbed().setColor("RANDOM").setAuthor(`🎉 ÇEKİLİŞ BAŞLADI🎉`).setTitle(`Hediye : \`${odul}\``).setFooter(`${kazanan} Kazanan!`).setDescription(`
Çekilişi Başlatan : ${message.author}
Bitiş Zamanı : <t:${Math.floor(kalan / 1000)}:R>
Katılan kişi sayısı : ${tikdata?.katilan.length + 1 || 1}
En Son Katılan : ${button.user.toString()}
\`Aşağıdaki butona basarak katılabilirsiniz!\`
                            `)]
        })
      }
    })
  }
}