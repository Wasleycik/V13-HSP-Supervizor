const Discord = require('discord.js') 
const ozi = require("../../schemas/dolar");
const { altin, altin2, rewards, kirmiziok } = require("../../configs/emojis.json")
let ms = require("ms");
const conf = require("../../configs/sunucuayar.json")
const isimcek = require("../../configs/isimcek.json")
const emojis = require("../../configs/emojis.json")

module.exports = {
    conf: {
      aliases: ["günlük"],
      name: "daily",
      help: "daily",
      category: "market",
    },
  
run: async (client, message, args) => {

   if (!message.guild) return;

 let kanallar = isimcek.kanalcek.botcommands;
   if (!kanallar.includes(message.channel.name)) return message.reply({ content:`${kanallar.map(x => `${client.channels.cache.find(chan => chan.name == x)}`)} kanallarında kullanabilirsiniz.`}).then((e) => setTimeout(() => { e.delete(); }, 10000)); 
	
	let data = await ozi.findOne({userID: message.author.id, guildID: message.guild.id});
  if (!data || data && !data.hesap.length) return await message.reply({ content: `Komutu kullanabilmek için Hesap oluşturmanız gerekmektedir. ${kirmiziok} \` !hesapoluştur \``})

  let timeout = 1000*60*60*24
    const sayi = Math.floor(Math.random() * 450) + 1
    let gunluk = data.dolarTime
    if (gunluk !== null && timeout - (Date.now() - gunluk) > 0) {
        let time = ms(timeout - (Date.now() - gunluk));
        message.channel.send(`:stopwatch: **|** Hata! **${message.author.username}** Bu komutu ${time} sonra kullanabilirsin.`)
    } else {
        await ozi.findOneAndUpdate({userID: message.author.id, guildID: message.guild.id}, {$inc: {dolar: sayi}, $set: {dolarTime: Date.now()}}, {upsert: true})
        message.channel.send({ content:`${rewards} **|** Başarılı bir şekilde günlük ödülünü aldın. (Ödülün: **${sayi}** ${altin2} )`})
    }  
}}
