const ozi = require("../../schemas/dolar");
let limit = new Map();
let ms = require("ms");
const { rewards, slotgif, slotpatlican, slotkiraz, slotkalp, red, green, kirmiziok } = require("../../configs/emojis.json")
const conf = require("../../configs/sunucuayar.json")
const isimcek = require("../../configs/isimcek.json")
const emojis = require("../../configs/emojis.json")

module.exports = {
    conf: {
      aliases: ["s", "slot", "Slot"],
      name: "slot",
      help: "slot <Miktar>",
      category: "market",
    },
  
run: async (client, message, args, embed, prefix) => {

    if (!message.guild) return;
	
    let dolarData = await ozi.findOne({ guildID: message.guild.id, userID: message.author.id });
    if (!dolarData || dolarData && !dolarData.hesap.length) return await message.reply({ content: `Komutu kullanabilmek için Hesap oluşturmanız gerekmektedir. ${kirmiziok} \` !hesapoluştur \``})
    if (!dolarData || dolarData && !dolarData.dolar) return await message.reply({ content: `Komutu kullanabilmek için coine ihtiyacınız var. Günlük coininizi almadıysanız ${kirmiziok} \` !daily \``})
  
 let kanallar = isimcek.kanalcek.botcommands;
    if (!kanallar.includes(message.channel.name)) return message.reply({ content:`${kanallar.map(x => `${client.channels.cache.find(chan => chan.name == x)}`)} kanallarında kullanabilirsiniz.`}).then((e) => setTimeout(() => { e.delete(); }, 10000)); 
	

	  let data = limit.get(message.author.id) || {dailyCoinTime: 0};
    let timeout = 1000*8
    let gunluk = data.dailyCoinTime
    if (gunluk !== null && timeout - (Date.now() - gunluk) > 0) {
        let time = ms(timeout - (Date.now() - gunluk));
        message.reply({ content:`:stopwatch: **|** Hata! **${message.author.username}** Bu komutu ${time} sonra kullanabilirsin.`})
	} else {
	limit.set(message.author.id, {dailyCoinTime: Date.now()})
	setTimeout(() => {
		limit.delete(message.author.id)
	}, 1000*8)

    const slot = [slotkalp, slotkiraz, slotpatlican] 

    let sec = args[0];
    if(!sec || !Number(args[0])) return message.reply({ content:`Kaç dolar ile oynamak istiyorsun?`})
    if(sec >= 50000) return message.reply({ content:"50.000 dolardan fazla bir dolar ile oyun oynamayazsın"})


    let ozislot1 = slot[Math.floor(Math.random() * slot.length)];
    let ozislot2 = slot[Math.floor(Math.random() * slot.length)];
    let ozislot3 = slot[Math.floor(Math.random() * slot.length)];


    if(dolarData.dolar && 50000 < sec) return message.reply({ content:`:no_entry: | **${message.author.username}**, Yeterli miktar da paran yoktur! (Max: 50.000 Tutarında Oynayabilirsin)`}) 


let slotMessage = await message.reply(`
\`___SLOTS___\`
  ${slotgif} ${slotgif} ${slotgif}
**\`|         |\`**
**\`|         |\`**
`)


if(ozislot1 === ozislot2 && ozislot1 === ozislot3 ) {

let carpma = sec * 2
await ozi.findOneAndUpdate({ guildID: message.guild.id, userID: message.author.id }, { $inc: { dolar: +carpma } }, { upsert: true });
setTimeout(() => {
slotMessage.edit({ content: `
\`___SLOTS___\`
  ${ozislot1} ${ozislot2} ${ozislot3}
\`|         |\`
\`|         |\`
:tada: **Tebrikler!** Bu oyunu kazandınız! 
Kazanılan Ödül: \` ${sec} Market Parası => [ 2x ] => +${carpma} Market Parası \``})
}, 2500)
} else {

await ozi.findOneAndUpdate({ guildID: message.guild.id, userID: message.author.id }, { $inc: { dolar: -sec } }, { upsert: true });
setTimeout(() => {
  slotMessage.edit({ content:`
\`___SLOTS___\`
  ${ozislot1} ${ozislot2} ${ozislot3}
**\`|         |\`**
**\`|         |\`**
${red} **Kaybettin!** Bu oyunu kazanamadın!
Kaybedilen Miktar: \` ${sec} Market Parası \``})
}, 2500)
}

}}}
