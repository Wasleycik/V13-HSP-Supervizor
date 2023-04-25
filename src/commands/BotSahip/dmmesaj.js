const Discord = require("discord.js");
const ms = require("ms");
const moment = require("moment");
moment.locale("tr");
const conf = require("../../configs/sunucuayar.json")
const isimcek = require("../../configs/isimcek.json")
const emojis = require("../../configs/emojis.json")

module.exports = {
  conf: {
    aliases: ["dmat"],
    name: "dmmesaj",
    help: "dmmesaj",
    category: "sahip",
    owner: true,
  },

  run: async (client, message, args, embed) => {

    if (!message.member.permissions.has("ADMINISTRATOR")) return message.reply({ embeds: [embed.setDescription(`Komutu kullanmak için geçerli yetkin olmalı.`)] }).catch((err) => console.log(err), client.tick(message)).then((e) => setTimeout(() => { e.delete(); }, 10000));
    let dmkisi = message.mentions.members.first() || message.guild.members.cache.get(args[0])
    if (!dmkisi) return message.channel.send(':x: **DM Atacağın Kişiyi Seçmelisin**');
    let dm = args.slice(1).join(' ');
    if (!dm) return message.channel.send(':x: **DM Atcağım Yazıyı Unuttun!**');
    message.delete();
    const dmat = new Discord.MessageEmbed()
    
    dmkisi.send(`${dm}`);
    message.channel.send("Mesaj Başarıyla Gönderildi").then(x => x.delete({timeout: 1000}));


    
}}