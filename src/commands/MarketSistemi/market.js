const { MessageEmbed, Client, Message, MessageButton, MessageActionRow } = require("discord.js");
const Discord = require('discord.js');
const dolar = require("../../schemas/dolar")
const conf = require("../../configs/sunucuayar.json")
const { red, green, star, kirmiziok } = require("../../configs/emojis.json")
const table = require("table");
const client = global.bot;
module.exports = {
    conf: {
      aliases: ["market","shop"],
      name: "market",
      help: "market",
      category: "market",
    },

 run: async (client, message, embed) => {

  let dolarData = await dolar.findOne({ guildID: message.guild.id, userID: message.author.id });  
  if (!dolarData || dolarData && !dolarData.dolar) return await message.reply({ content: `Komutu kullanabilmek için coine ihtiyacınız var. Günlük coininizi almadıysanız ${kirmiziok} \` !daily \``})

  let spotify = new MessageButton()
  .setStyle('SUCCESS')
  .setLabel("Spotify Premium")
  .setCustomId("ozispotify")
  .setEmoji("941993326700265512")

  let netflix = new MessageButton()
  .setStyle('SUCCESS')
  .setLabel("Netflix UHD")
  .setCustomId("ozinetflix")
  .setEmoji("941993358518284298")

  let youtube = new MessageButton()
  .setStyle('SUCCESS')
  .setLabel("Youtube Premium")
  .setCustomId("oziyoutube")
  .setEmoji("941993963013935115")

  let cnitro = new MessageButton()
  .setStyle('SUCCESS')
  .setLabel("Discord Classic Nitro")
  .setCustomId("ozicnitro")
  .setEmoji("941993712978890752")

  let bnitro = new MessageButton()
  .setStyle('SUCCESS')
  .setLabel("Discord Boost Nitro")
  .setCustomId("ozibnitro")
  .setEmoji("941993742934614047")

  var çıkış = new MessageButton()
  .setStyle('DANGER')
  .setLabel('Market Çıkış')
  .setCustomId('çıkış')
  .setEmoji("920412153712889877");


 if (dolarData.dolar > 40000) {
    spotify.setStyle('SUCCESS');
  } else {
    spotify.setStyle('SECONDARY').setDisabled(true);
  }

 if (dolarData.dolar > 50000) {
    netflix.setStyle('SUCCESS');
  } else {
    netflix.setStyle('SECONDARY').setDisabled(true);
  }

 if (dolarData.dolar > 60000) {
    youtube.setStyle('SUCCESS');
  } else {
    youtube.setStyle('SECONDARY').setDisabled(true);
  }

 if (dolarData.dolar > 125000) {
    cnitro.setStyle('SUCCESS');
  } else {
    cnitro.setStyle('SECONDARY').setDisabled(true);
  }

 if (dolarData.dolar > 150000) {
    bnitro.setStyle('SUCCESS');
  } else {
    bnitro.setStyle('SECONDARY').setDisabled(true);
  }


   const market = new MessageActionRow()
  .addComponents([ spotify, netflix, youtube ]);

   const market2 = new MessageActionRow()
  .addComponents([ cnitro, bnitro, çıkış ]);


  let urundata = [
        { Id: "1", urunAdi: "Spotify Premium", urunDetayi: "1 Ay", urunFiyati: "40000"},
        { Id: "2", urunAdi: "Netflix UHD", urunDetayi: "1 Ay", urunFiyati: "50000"},
        { Id: "3", urunAdi: "Youtube Premium", urunDetayi: "3 Ay", urunFiyati: "60000"},
        { Id: "4", urunAdi: "Discord Classic Nitro", urunDetayi: "1 Ay", urunFiyati: "125000"},
        { Id: "5", urunAdi: "Discord Boostlu Nitro", urunDetayi: "1 Ay", urunFiyati: "150000"}
    ]

    let urunler = [["ID", "Ürün İsmi", "Ürün Detayı" ,"Ürün Fiyatı"]];
       urunler = urunler.concat(urundata.map(value => { 
         let urunfiyatioku = `${value.urunFiyati} 💵`	
          return [
          `#${value.Id}`,
          `${value.urunAdi}`,
          `${value.urunDetayi}`,
          `${urunfiyatioku}`
        ]
    }))


    let ozi = new MessageEmbed()
.setDescription(`\n🤑 **${message.guild.name}** mağazasına hoş geldin ${message.member}, \nBurada kendine çeşitli eşyalar ve sunucumuz için işine yarayabilecek \nbelirli özelliklerden satın alabilirsin.`)
.addField(`${star} Mağaza (\`Bakiye: ${dolarData ? Math.floor(parseInt(dolarData.dolar)) : 0} 💵\`)`,`\`\`\`css
${table.table(urunler, {
          border: table.getBorderCharacters(`void`),
          columnDefault: {
            paddingLeft: 0,
            paddingRight: 1,
        },
        columns: {
          0: {
              paddingLeft: 1
          },
          1: {
              paddingLeft: 1
          },
          2: {
              paddingLeft: 1,
              alignment: "center"
          },
          3: {
              paddingLeft: 1,
              paddingRight: 1,
          },
      },

        /**
        * @typedef {function} drawHorizontalLine
        * @param {number} index
        * @param {number} size
        * @return {boolean}
        */

        drawHorizontalLine: (index, size) => {
          return index === 0 || index === 1 || index === size;
      }
      })}\`\`\``)
.addField(`${star} Ürün nasıl satın alabilirim?`,`Aşağıda beliren butonlardan yeşil olanlara \`30 Saniye\` içerisinde tıklayarak satın alabilirsin.`)
   
let jaylen = await message.channel.send({ embeds: [ozi],  components: [market, market2] });
    var filter = (xd) => xd.user.id === message.author.id;
   
    let collector = await jaylen.createMessageComponentCollector({filter,  time: 30000 })

      collector.on("collect", async (button) => {

    if (button.customId === "ozispotify") {
      await button.deferUpdate();

      let spotify = new MessageEmbed()
.setDescription(`:tada: Tebrikler! Başarıyla \`Spotify Premium\` ürününü satın aldınız! Yetkililer en kısa zaman da sizinle iletişime geçecektir!`)
.setFooter({ text: `Satın Alma İşlemi Başarılı`})
.setTimestamp()
.setAuthor({ name:  message.author.tag, iconURL:  message.author.avatarURL({ dynamic: true })})
.setThumbnail(message.author.displayAvatarURL({ dynamic: true, size: 2048 }))

        client.channels.cache.find(x => x.name == "market_log").send(`${message.author} kişisi \`Spotify Premium\` ürününü satın aldı. İletişime geçmenizi bekliyor! :tada:`)
         await dolar.findOneAndUpdate({ guildID: conf.GuildID, userID: message.author.id }, { $inc: { dolar: -40000 } }, { upsert: true });
         
      jaylen.edit({ embeds: [spotify], components: []}); 

        }

      if (button.customId === "ozinetflix") {
        await button.deferUpdate();

      let netflix = new MessageEmbed()
.setDescription(`:tada: Tebrikler! Başarıyla \`Netflix UHD\` ürününü satın aldınız! Yetkililer en kısa zaman da sizinle iletişime geçecektir!`)
.setFooter({ text: `Satın Alma İşlemi Başarılı`})
.setTimestamp()
.setAuthor({ name:  message.author.tag, iconURL:  message.author.avatarURL({ dynamic: true })})
.setThumbnail(message.author.displayAvatarURL({ dynamic: true, size: 2048 }))

client.channels.cache.find(x => x.name == "market_log").send(`${message.author} kişisi \`Netflix UHD\` ürününü satın aldı. İletişime geçmenizi bekliyor! :tada:`)
         await dolar.findOneAndUpdate({ guildID: conf.GuildID, userID: message.author.id }, { $inc: { dolar: -50000 } }, { upsert: true });
         
      jaylen.edit({ embeds: [netflix], components: []}); 

        }

      if (button.customId === "oziyoutube") {
        await button.deferUpdate();

      let youtube = new MessageEmbed()
.setDescription(`:tada: Tebrikler! Başarıyla \`Youtube Premium\` ürününü satın aldınız! Yetkililer en kısa zaman da sizinle iletişime geçecektir!`)
.setFooter({ text: `Satın Alma İşlemi Başarılı`})
.setTimestamp()
.setAuthor({ name:  message.author.tag, iconURL:  message.author.avatarURL({ dynamic: true })})
.setThumbnail(message.author.displayAvatarURL({ dynamic: true, size: 2048 }))

client.channels.cache.find(x => x.name == "market_log").send(`${message.author} kişisi \`Youtube Premium\` ürününü satın aldı. İletişime geçmenizi bekliyor! :tada:`)
         await dolar.findOneAndUpdate({ guildID: conf.GuildID, userID: message.author.id }, { $inc: { dolar: -60000 } }, { upsert: true });

      jaylen.edit({ embeds: [youtube], components: []}); 

        }

       if (button.customId === "ozicnitro") {
        await button.deferUpdate();

      let cnitro = new MessageEmbed()
.setDescription(`:tada: Tebrikler! Başarıyla \`Discord Classic Nitro\` ürününü satın aldınız! Yetkililer en kısa zaman da sizinle iletişime geçecektir!`)
.setFooter({ text: `Satın Alma İşlemi Başarılı`})
.setTimestamp()
.setAuthor({ name:  message.author.tag, iconURL:  message.author.avatarURL({ dynamic: true })})
.setThumbnail(message.author.displayAvatarURL({ dynamic: true, size: 2048 }))

client.channels.cache.find(x => x.name == "market_log").send(`${message.author} kişisi \`Classic Nitro\` ürününü satın aldı. İletişime geçmenizi bekliyor! :tada:`)
         await dolar.findOneAndUpdate({ guildID: conf.GuildID, userID: message.author.id }, { $inc: { dolar: -125000 } }, { upsert: true });

      jaylen.edit({ embeds: [cnitro], components: []}); 

        }

      if (button.customId === "ozibnitro") {
        await button.deferUpdate();

      let bnitro = new MessageEmbed()
.setDescription(`:tada: Tebrikler! Başarıyla \`Discord Nitro Boost\` ürününü satın aldınız! Yetkililer en kısa zaman da sizinle iletişime geçecektir!`)
.setFooter({ text: `Satın Alma İşlemi Başarılı`})
.setTimestamp()
.setAuthor({ name:  message.author.tag, iconURL:  message.author.avatarURL({ dynamic: true })})
.setThumbnail(message.author.displayAvatarURL({ dynamic: true, size: 2048 }))

client.channels.cache.find(x => x.name == "market_log").send(`${message.author} kişisi \`Boostlu Nitro\` ürününü satın aldı. İletişime geçmenizi bekliyor! :tada:`)
         await dolar.findOneAndUpdate({ guildID: conf.GuildID, userID: message.author.id }, { $inc: { dolar: -150000 } }, { upsert: true });

      jaylen.edit({ embeds: [bnitro], components: []}); 

        }

      if (button.customId == "çıkış") {
      await jaylen.delete({ timeout: 1500 });
      }

}
)}

}  
