const { Discord , Client, Message, MessageEmbed } = require("discord.js");

module.exports = {
  conf: {
    aliases: ["stickeryükle","sticker-yükle"],
    name: "stickeryükle",
    help: "stickeryükle",
    category: "sahip",
    owner: true,
  },

  run: async (client, message, args) => {

    if(!message.member.permissions.has('ADMINISTRATOR')) return message.reply("Yetersiz Yetki").then(s => setTimeout(() => s.delete().catch(err => {}), 5000));
    let url = args[0]
    let isim = args[1] 
    let tag = args[2]
    let açıklama = args.slice(3).join(" ")
    if(!url) return message.reply("Lütfen Sticker Linki Belirtiniz").then(s => setTimeout(() => s.delete().catch(err => {}), 5000));
    if(!isim) return message.reply("Lütfen Bir İsim Belirtiniz").then(s => setTimeout(() => s.delete().catch(err => {}), 5000));
    if(!tag) return message.reply("Lütfen Bir Tag Belirtiniz").then(s => setTimeout(() => s.delete().catch(err => {}), 5000));
    if(!açıklama) return message.reply("Lütfen Bir Açıklama Belirtiniz").then(s => setTimeout(() => s.delete().catch(err => {}), 5000));
    stickerOluştur(url, isim, tag, açıklama, message)
    }
};

/**
* @param {String} link 
* @param {String} ad  
* @param {String} tag 
* @param {String} açıklama
* @param {Object} message
* Sticker eklemesi için yapılan ufak bir fonksiyon.
*/


function stickerOluştur(link, ad, tag, açıklama, message) {
  message.guild.stickers.create(link, ad, tag, {description: açıklama})
  .then(sticker =>
    message.reply({embeds: [
        new Discord.MessageEmbed()
        .setDescription(`Başarıyla **${ad}** isimli çıkartma \`${tag}\` tagı ile oluşturuldu.`)
    ]})
  .then(x => {  
    setTimeout(() => {
          x.delete()

      }, 7500);
  }))

  .catch(console.error);
}