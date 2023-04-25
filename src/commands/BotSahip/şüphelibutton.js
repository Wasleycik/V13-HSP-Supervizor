const { Discord, MessageButton, MessageActionRow } = require("discord.js");
const conf = require("../../configs/sunucuayar.json")
const isimcek = require("../../configs/isimcek.json")
const emojis = require("../../configs/emojis.json")
const moment = require("moment");
moment.locale("tr");
const client = global.bot;

module.exports = {
  conf: {
    aliases: [],
    name: "şüphelibutton",
    help: "şüphelibutton",
    category: "sahip",
    owner: true,
  },

  run: async (client, message, args, embed) => {

    client.api.channels(message.channel.id).messages.post({
      data: {
        "content": `❗️ Aşağıda ki Butonlardan Hesabınızın 7 Günlük Kalan Süresini Öğrenebilirsiniz Hesabınız İlk 7 Günü Doldurduysa Butona Basıp Şüpheliden Çıkabilirsiniz.`, "components": [{
          "type": 1, "components": [

            { "type": 2, "style": 4, "custom_id": "süpheli", "label": "Hesap Kontrol" },

          ]
        }]
      }
    })
  },
};

client.on('interactionCreate', async interaction => {

  const member = await client.guilds.cache.get(conf.GuildID).members.fetch(interaction.member.user.id)
  if (!member) return;

  if (interaction.customId === "süpheli") {
    if (!conf.fakeAccRole.some(x => member.roles.cache.has(x))) {
    await interaction.reply({ content: `Şüpheli Hesap değilsiniz.`, ephemeral: true });
  return }

 let guvenilirlik = Date.now() - member.user.createdTimestamp < 1000 * 60 * 60 * 24 * 7;

 if (guvenilirlik) {
  await interaction.reply({ content: `Hesabınız (<t:${Math.floor(member.user.createdTimestamp / 1000)}:R>) tarihinde oluşturulmuş şüpheli kategorisinden çıkmaya uygun değildir.`, ephemeral: true });
} else {
  await interaction.reply({ content: `7 gün süreniz dolduğu için karantinadan çıkarıldınız.`, ephemeral: true });
  await member.roles.set(conf.unregRoles)
} 
}
})
