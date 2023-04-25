const { MessageEmbed, Client, MessageActionRow, MessageButton } = require('discord.js');
const conf = require("../../configs/sunucuayar.json")
const isimcek = require("../../configs/isimcek.json")
const emojis = require("../../configs/emojis.json")
const penals = require("../../schemas/penals");
const cezapuan = require("../../schemas/cezapuan")
const ceza = require("../../schemas/ceza")
const { table } = require('table');
const ms = require("ms")
const moment = require("moment");
moment.locale("tr");
const client = global.bot; 

module.exports = {
  conf: {
    aliases: ["sicil", "cezalar"],
    name: "sicil",
    help: "sicil <Kişi/ID>",
    category: "cezalandırma",
  },

  run: async (client, message, args, embed) => {
    if (!message.member.permissions.has(8n) && !conf.jailHammer.some(x => message.member.roles.cache.has(x))) 
    {
    message.channel.send({ content:"Yeterli yetkin bulunmuyor!"}).then((e) => setTimeout(() => { e.delete(); }, 5000)); 
    return }
    const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;
    const cezaData = await ceza.findOne({ guildID: message.guild.id, userID: member.user.id });
    const cezapuanData = await cezapuan.findOne({ userID: member.user.id });
    await penals.find({ guildID: message.guild.id, userID: member.user.id, }).sort({ date: -1 }).exec(async (err, res) => {
        let xd = [
            ["ID", "Tarih", "Ceza", "Sebep"]
        ];

        let xd2 = [
            ["ID", "Ceza", "Tarih", "Bitiş", "Yetkili", "Sebep"]
        ];

        let config = {
            border: {
                topBody: ``,
                topJoin: ``,
                topLeft: ``,
                topRight: ``,

                bottomBody: ``,
                bottomJoin: ``,
                bottomLeft: ``,
                bottomRight: ``,

                bodyLeft: `│`,
                bodyRight: `│`,
                bodyJoin: `│`,

                joinBody: ``,
                joinLeft: ``,
                joinRight: ``,
                joinJoin: ``
            }
        };

        res.map(x => {
           xd.push([x.id, `${moment(x.date).format("LLL")}`, x.type, x.reason])
        })

        res.map(x => {
           xd2.push([x.id, x.type, `${moment(x.date).format("LLL")}`, `${x.finishDate ? `${moment(x.finishDate).format("LLL")}` : "Yok"}`, client.users.cache.get(x.staff).tag, x.reason])
        })

        let jaylen = table(xd.slice(0, 15), config)
        let ozi = table(xd2, config)

        let data = await penals.find({ guildID: message.guild.id, userID: member.user.id, }).sort({ date: -1 });
        if (data.length === 0) return message.channel.send({ content:`${member.toString()} üyesinin sicili temiz!`}).then((e) => setTimeout(() => { e.delete(); }, 5000));
       
        const row = new MessageActionRow()
        .addComponents(
          new MessageButton().setCustomId('dosya').setEmoji("🚫").setStyle('PRIMARY'),
          new MessageButton().setCustomId('sayi').setEmoji("❔").setStyle('PRIMARY'),
          new MessageButton().setCustomId('iptal').setEmoji("909485171240218634").setStyle('DANGER'),
        );

    let msg = await message.channel.send({ content: `${member} kullanıcısının toplam **${cezaData ? cezaData.ceza.length : 0}** cezası bulunmakta son 15 ceza aşağıda belirtilmiştir. Tüm ceza bilgi dosyasını görüntülemek için 🚫 emojisine, ceza sayılarına bakmak için ❔ emojisine basabilirsin.\nTek bir cezaya detaylı bakmak için \`!cezasorgu ID\` komutunu kullanabilirsiniz. \`\`\`cs\n${jaylen}\n\`\`\``, components: [row] })

    var filter = (button) => button.user.id === message.author.id;
     const collector = msg.createMessageComponentCollector({ filter, time: 30000 })

    collector.on('collect', async (button) => {

    if (button.customId === "dosya") {
      row.components[0].setDisabled(true) 
      msg.edit({ components: [row] }); 
      button.reply({ content: `${member} kullanıcısının toplamda **${cezaData ? cezaData.ceza.length : 0}** cezası  bulunmaktadır ve aşağıdaki belgede yazmaktadır.`, files: [{ attachment: Buffer.from(ozi), name: `${member.user.username}_sicil.txt` }], components: [], ephemeral: true }); 
    } else if (button.customId === "sayi") {
        row.components[1].setDisabled(true) 
        msg.edit({ components: [row] }); 
        let sec = res.map(x => (x.type))
        let chatMute = sec.filter(x => x == "CHAT-MUTE").length || 0
        let voiceMute = sec.filter(x => x == "VOICE-MUTE").length || 0
        let tjail = sec.filter(x => x == "TEMP-JAIL").length || 0
        let jail = sec.filter(x => x == "JAIL").length || 0
        let ban = sec.filter(x => x == "BAN").length || 0
        button.reply({ content: `\`\`\`cs\n${member.user.username} kullanıcısının ceza bilgileri aşağıda belirtilmiştir:\n\nChat Mute: ${chatMute} kez.\nSes Mute: ${voiceMute} kez.\nCezalı Bilgisi: ${tjail + jail} kez.\nBan Bilgisi: ${ban} kez.\n\nKullanıcı toplamda ${cezaData ? cezaData.ceza.length : 0} kez kural ihlali yapmış, kullanıcının Toplam Ceza Puanı: ${cezapuanData ? cezapuanData.cezapuan : 0} \`\`\``, ephemeral: true })
    } else if (button.customId === "iptal") {
        row.components[0].setDisabled(true) 
        row.components[1].setDisabled(true) 
        row.components[2].setDisabled(true) 
        msg.edit({ components: [row] });    
        button.reply({ content: "İşlem başarıyla iptal edildi!", ephemeral: true })
    }
})  
    collector.on('end', async (button, reason) => {
        row.components[0].setDisabled(true) 
        row.components[1].setDisabled(true) 
        row.components[2].setDisabled(true) 
        msg.edit({ components: [row] });  
    })   
})  

  },
};