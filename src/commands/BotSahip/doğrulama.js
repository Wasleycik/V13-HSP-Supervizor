const { Discord, MessageButton, MessageActionRow } = require("discord.js");
const conf = require("../../configs/sunucuayar.json");
const { green, red, Jail } = require("../../configs/emojis.json")
const moment = require("moment");
moment.locale("tr");
const client = global.bot;

module.exports = {
  conf: {
    aliases: ["hızlıgrş","doğrulamak"],
    name: "doğrulama",
    help: "doğrulama (Botun Rol Vermediği Kişilerin Rol Alabilmesini Sağlar)",
    category: "sahip",
    owner: true,
  },

  run: async (client, message, args, embed) => {

    client.api.channels(message.channel.id).messages.post({
      data: {
        "content": `
**Merhaba Kullanıcı;**

Sunucumuza Şuan Çok Hızlı Giriş İşlemi Yapıldığı İçin Rol Dağıtımı Durduruldu.Aşşağıdaki Burona Tıklayarak Bot Hesap Olmadığını Doğrulayıp Sunucuda Gerekli Rollerini Alabilirsin.Eğer Yanlış Bir Durum Olduğunu Düşünüyorsan Sağ Taraftaki Yetkililere Yazmaktan Çekinme!

Eğer Bu Kanalı Anlık Olarak Gördüysen Kayıt İşlemine #hesperos-register Bu Kanaldan Devam Edebilirsin

İyi Günler Dileriz.

**H Ξ S P Ξ R O S**
`, "components": [{
          "type": 1, "components": [

            { "type": 2, "style": 3, "custom_id": "Doğrula", "label": "Doğrula"},

          ]
        }]
      }
    })
  },
};

client.on('interactionCreate', async interaction => {

  if (interaction.customId === "Doğrula") {
    await interaction.reply({ content: `Doğrulama Başarılı Teyit Kanallarına Yönlendiriliyorsunuz.`, ephemeral: true });
    await interaction.member.roles.set(conf.unregRoles)
}
})