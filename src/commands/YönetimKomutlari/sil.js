const { MessageEmbed, Client, MessageActionRow, MessageButton } = require('discord.js');
const { green, red } = require("../../configs/emojis.json")
module.exports = {
    conf: {
      aliases: ["sil","temizle"],
      name: "sil",
      help: "sil",
      category: "yönetim",
    },
  
    run: async (client, message, args, embed) => {
        if (!message.member.permissions.has('MANAGE_MESSAGES')) return;

        const row = new MessageActionRow().addComponents(
          new MessageButton().setCustomId("on").setLabel("10").setStyle("PRIMARY"),
          new MessageButton().setCustomId("yirmibes").setLabel("25").setStyle("PRIMARY"),
          new MessageButton().setCustomId("elli").setLabel("50").setStyle("PRIMARY"),
          new MessageButton().setCustomId("yüz").setLabel("100").setStyle("PRIMARY"),
          new MessageButton().setCustomId("iptal").setLabel("X").setStyle("DANGER")
        );

        let ozi = new MessageEmbed()
.setDescription(`
\` > \` __Kaç adet mesaj sileceğinizi butonlar ile seçiniz.__
`)
.setAuthor({ name: message.member.displayName, iconURL: message.member.displayAvatarURL({ dynamic: true }) })

 let msg = await message.channel.send({ embeds: [ozi], components : [row] })

 var filter = (button) => button.user.id === message.author.id;
 let collector = await msg.createMessageComponentCollector({ filter, time: 60000 })

collector.on("collect", async (button) => {

if(button.customId === "on") {
await message.delete();
await message.channel.bulkDelete(10);
message.channel.send({ content:`${green} 10 adet mesaj silindi!`}).then((e) => setTimeout(() => { e.delete(); }, 5000));
}
if(button.customId === "yirmibes") {
await message.delete();
await message.channel.bulkDelete(25);
message.channel.send({ content:`${green} 25 adet mesaj silindi!`}).then((e) => setTimeout(() => { e.delete(); }, 5000));
}
if(button.customId === "elli") {
await message.delete();
await message.channel.bulkDelete(50);
message.channel.send({ content:`${green} 50 adet mesaj silindi!`}).then((e) => setTimeout(() => { e.delete(); }, 5000));
}
if(button.customId === "yüz") {
await message.delete();
await message.channel.bulkDelete(99);
message.channel.send({ content:`${green} 100 adet mesaj silindi!`}).then((e) => setTimeout(() => { e.delete(); }, 5000));
}
if(button.customId === "iptal") {
await message.delete();
msg.edit({ content:`${red} Mesaj silme işleminden vazgeçtiniz.`, embeds: [], components: [] }).then((e) => setTimeout(() => { e.delete(); }, 5000));
}
      })
  },
};