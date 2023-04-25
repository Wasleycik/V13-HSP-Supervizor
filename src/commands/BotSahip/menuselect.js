const { MessageEmbed, Client, Message, MessageButton, MessageActionRow, MessageSelectMenu } = require("discord.js");
const Discord = require('discord.js');
const conf = require("../../configs/sunucuayar.json")
const isimcek = require("../../configs/isimcek.json")
const emojis = require("../../configs/emojis.json")
const client = global.bot;

module.exports = {
  conf: {
    aliases: ["rolmenü"],
    name: "menü",
    help: "rolmenü",
    category: "sahip",
    owner: true,
  },
 
    run: async (client, message, args, durum, kanal) => {

     message.delete()

   let menüembed = new MessageEmbed()
   .setColor("BLACK")
   .setAuthor({ name: client.guilds.cache.get(conf.GuildID).name, iconURL: client.guilds.cache.get(conf.GuildID).iconURL({dynamic:true})})
   .setDescription(`Aşağıdaki Butonları Kullanarak Kurmak İstediğiniz Menüleri Seçiniz`)

    const row = new MessageActionRow()
		.addComponents(

    new MessageButton()
    .setCustomId("burçkur")
    .setLabel("Burç")
    .setStyle("SECONDARY"),

    new MessageButton()
    .setCustomId("iliskikur")
    .setLabel("İlişki")
    .setStyle("SECONDARY"),

    new MessageButton()
    .setCustomId("oyunkur")
    .setLabel("Oyun")
    .setStyle("SECONDARY"),

    new MessageButton()
    .setCustomId("renkkur")
    .setLabel("Renk")
    .setStyle("SECONDARY"),

    new MessageButton()
    .setCustomId("takimkur")
    .setLabel("Takım")
    .setStyle("SECONDARY"),

	);
    const row2 = new MessageActionRow()
		.addComponents(

    new MessageButton()
    .setCustomId("etkinlikmenü")
    .setLabel("eTKİNLİK")
    .setStyle("SECONDARY"),

    new MessageButton()
    .setCustomId("hepsikur")
    .setLabel("Hepsini Kur")
    .setStyle("SECONDARY"),

    new MessageButton()
    .setCustomId("iptal")
    .setLabel("Kapat / İptal Et")
    .setStyle("SECONDARY"),

	);

 let msg = await message.channel.send({ embeds: [menüembed], components : [row,row2] })

    var filter = (xd) => xd.user.id === message.author.id;
    let collector = await msg.createMessageComponentCollector({ filter,  time: 30000 })
    
    collector.on("collect", async (menü) => {

if (menü.customId === "hepsikur") {
        await msg.delete({ timeout: 1500 });

        client.api.channels(message.channel.id).messages.post({
            data: {
                "content": `**Burç Rol :**`,
                "components": [{
                    "type": 1, "components": [{
                        "type": 3, "custom_id": "burc", "options": [
                            { "label": "Koç", "value": "koç", "emoji": { "name": "♈" }, },
                            { "label": "Boğa", "value": "boğa", "emoji": { "name": "♉" }, },
                            { "label": "İkizler", "value": "ikizler", "emoji": { "name": "♊" }, },
                            { "label": "Yengeç", "value": "yengeç", "emoji": { "name": "♋" }, },
                            { "label": "Aslan", "value": "aslan", "emoji": { "name": "♌" }, },
                            { "label": "Başak", "value": "başak", "emoji": { "name": "♍" }, },
                            { "label": "Terazi", "value": "terazi", "emoji": { "name": "♎" }, },
                            { "label": "Akrep", "value": "akrep", "emoji": { "name": "♏" }, },
                            { "label": "Yay", "value": "yay", "emoji": { "name": "♐" }, },
                            { "label": "Oğlak", "value": "oğlak", "emoji": { "name": "♑" }, },
                            { "label": "Kova", "value": "kova", "emoji": { "name": "♒" }, },
                            { "label": "Balık", "value": "balık", "emoji": { "name": "♓" }, },
                            { "label": "Rol İstemiyorum", "value": "rolsil", "emoji": { "name": "🗑️" }, }
                        ], "placeholder": "Burç Rol Al", "min_values": 1, "max_values": 1
                    }],
                }
                ]
            }
        })

        client.api.channels(message.channel.id).messages.post({
            data: {
                "content": `**İlişki Rol :**`,
                "components": [{
                    "type": 1, "components": [{
                        "type": 3, "custom_id": "iliski", "options": [
                            { "label": "Sevgilim Var", "value": "sevgilimvar", "emoji": { "name": "❤️" }, },
                            { "label": "Sevgilim Yok", "value": "sevgilimyok", "emoji": { "name": "💔" }, },
                            { "label": "Sevgili Yapmıyorum", "value": "sevgiliyapmıyorum", "emoji": { "name": "🤍" }, },
                            { "label": "Lgbt", "value": "lgbt", "emoji": { "name": "🏳️‍🌈" }, },
                            { "label": "Rol İstemiyorum", "value": "rolsil", "emoji": { "name": "🗑️" }, }
                        ], "placeholder": "İlişki Rol Al", "min_values": 1, "max_values": 1
                    }],
                }
                ]
            }
        })	

        client.api.channels(message.channel.id).messages.post({
            data: {
                "content": `**Oyun Rol :**`,
                "components": [{
                    "type": 1, "components": [{
                        "type": 3, "custom_id": "oyun", "options": [
                            { "label": "Minecraft", "value": "mc", "emoji": { "name": "🎯" }, },
                            { "label": "Mobile Legends", "value": "mlbb", "emoji": { "name": "🎯" }, },
                            { "label": "League Of Legends", "value": "lol", "emoji": { "name": "🎯" }, },
                            { "label": "Gta 5", "value": "gta5", "emoji": { "name": "🎯" }, },
                            { "label": "Valorant", "value": "valo", "emoji": { "name": "🎯" }, },
                            { "label": "Among Us", "value": "amongus", "emoji": { "name": "🎯" }, },
                            { "label": "Conter Strike Go", "value": "csgo", "emoji": { "name": "🎯" }, },
                            { "label": "Rol İstemiyorum", "value": "rolsil", "emoji": { "name": "🗑️" }, }
                        ], "placeholder": "Oyun Rol Al", "min_values": 1, "max_values": 1
                    }],
                }
                ]
            }
        })	

        client.api.channels(message.channel.id).messages.post({
            data: {
                "content": `**Renk Rol :**`,
                "components": [{
                    "type": 1, "components": [{
                        "type": 3, "custom_id": "renk", "options": [
                            { "label": "Mavi", "value": "mavi", "emoji": { "name": "🔵" }, },
                            { "label": "Kırmızı", "value": "kırmızı", "emoji": { "name": "🔴" }, },
                            { "label": "Sarı", "value": "sarı", "emoji": { "name": "🟡" }, },
                            { "label": "Siyah", "value": "siyah", "emoji": { "name": "🖤" }, },
                            { "label": "Beyaz", "value": "beyaz", "emoji": { "name": "🤍" }, },
                            { "label": "Yeşil", "value": "yeşil", "emoji": { "name": "🟢" }, },
                            { "label": "Mor", "value": "mor", "emoji": { "name": "🟣" }, },
                            { "label": "Kahverengi", "value": "kahverengi", "emoji": { "name": "🟤" }, },
                            { "label": "Turuncu", "value": "turuncu", "emoji": { "name": "🟠" }, },
                            { "label": "Rol İstemiyorum", "value": "rolsil", "emoji": { "name": "🗑️" }, }
                        ], "placeholder": "Renk Rol Al", "min_values": 1, "max_values": 1
                    }],
                }
                ]
            }
        })

        client.api.channels(message.channel.id).messages.post({
            data: {
                "content": `**Takım Rol :**`,
                "components": [{
                    "type": 1, "components": [{
                        "type": 3, "custom_id": "takim", "options": [
                            { "label": "Galatasaray", "value": "gs", "emoji": { "name": "❤️" }, },
                            { "label": "Fenerbahçe", "value": "fb", "emoji": { "name": "💛" }, },
                            { "label": "Beşiktaş", "value": "bjk", "emoji": { "name": "🖤" }, },
                            { "label": "TrabzonSpor", "value": "ts", "emoji": { "name": "💙" }, },
                            { "label": "Rol İstemiyorum", "value": "rolsil", "emoji": { "name": "🗑️" }, }
                        ], "placeholder": "Takım Rol Al", "min_values": 1, "max_values": 1
                    }],
                }
                ]
            }
        })

        }
        if (menü.customId === "etkinlikmenü") {
        await msg.delete({ timeout: 1500 });
        client.api.channels(message.channel.id).messages.post({
            data: {
                "content": `
:tada: Merhaba Sayın Sunucu Üyelerimiz \`@everyone\` veya \`@here\` Atılmayacağından Dolayı Rollerinizi Amayı Unutmayınız. **Çekilişler,Etkinlikler V/K ve D/C'den** Haberdar Olabilirsin.

\` ⦁ \` (<@&${conf.etkinlik}>) Rolü **DC / VK** Gibi Sunucu İçi Oynanan Oyunlar Ve Daha Fazla Etkinlikten Haberdar Olmanızı Sağlar.
                        
\` ⦁ \` (<@&${conf.çekiliş}>) Rolü Sizleri Sunucu İçi Özel Çekilişlerden Haberdar Olmanızı Sağlar.

**NOT:** \`Owner Arkadaşlar Tarafından Kesinlikle Rollerinizi Almanız Önerilmektedir.\``,
                "components": [{
                    "type": 1, "components": [{
                        "type": 3, "custom_id": "etkinliks", "options": [
                            { "label": "Etkinlik Katılımcısı", "description": "Etkinliklerden haberdar olmak için", "value": "etkinlik", "emoji": { "id": "941075067230625803" }, },
                            { "label": "Çekiliş Katılımcısı", "description": "Çekilişlerden haberdar olmak için", "value": "cekilis", "emoji": { "id": "941074179401338900" }, },
                            { "label": "Rol İstemiyorum", "value": "rolsil", "emoji": { "name": "🗑️" }, }
                        ], "placeholder": "Rollerinizi Almayı Unutmayın. (Önerilen)", "min_values": 0, "max_values": 2
                    }],
                }
                ]
            }
        })
        }

if (menü.customId === "burçkur") {
        await msg.delete({ timeout: 1500 });
        client.api.channels(message.channel.id).messages.post({
            data: {
                "content": `**Burç Rol :**`,
                "components": [{
                    "type": 1, "components": [{
                        "type": 3, "custom_id": "burc", "options": [
                            { "label": "Koç", "value": "koç", "emoji": { "name": "♈" }, },
                            { "label": "Boğa", "value": "boğa", "emoji": { "name": "♉" }, },
                            { "label": "İkizler", "value": "ikizler", "emoji": { "name": "♊" }, },
                            { "label": "Yengeç", "value": "yengeç", "emoji": { "name": "♋" }, },
                            { "label": "Aslan", "value": "aslan", "emoji": { "name": "♌" }, },
                            { "label": "Başak", "value": "başak", "emoji": { "name": "♍" }, },
                            { "label": "Terazi", "value": "terazi", "emoji": { "name": "♎" }, },
                            { "label": "Akrep", "value": "akrep", "emoji": { "name": "♏" }, },
                            { "label": "Yay", "value": "yay", "emoji": { "name": "♐" }, },
                            { "label": "Oğlak", "value": "oğlak", "emoji": { "name": "♑" }, },
                            { "label": "Kova", "value": "kova", "emoji": { "name": "♒" }, },
                            { "label": "Balık", "value": "balık", "emoji": { "name": "♓" }, },
                            { "label": "Rol İstemiyorum", "value": "rolsil", "emoji": { "name": "🗑️" }, }
                        ], "placeholder": "Burç Rol Al", "min_values": 1, "max_values": 1
                    }],
                }
                ]
            }
        })

        }
if (menü.customId === "renkkur") {
        await msg.delete({ timeout: 1500 });
        client.api.channels(message.channel.id).messages.post({
            data: {
                "content": `**Renk Rol :**`,
                "components": [{
                    "type": 1, "components": [{
                        "type": 3, "custom_id": "renk", "options": [
                            { "label": "Mavi", "value": "mavi", "emoji": { "name": "🔵" }, },
                            { "label": "Kırmızı", "value": "kırmızı", "emoji": { "name": "🔴" }, },
                            { "label": "Sarı", "value": "sarı", "emoji": { "name": "🟡" }, },
                            { "label": "Siyah", "value": "siyah", "emoji": { "name": "🖤" }, },
                            { "label": "Beyaz", "value": "beyaz", "emoji": { "name": "🤍" }, },
                            { "label": "Yeşil", "value": "yeşil", "emoji": { "name": "🟢" }, },
                            { "label": "Mor", "value": "mor", "emoji": { "name": "🟣" }, },
                            { "label": "Kahverengi", "value": "kahverengi", "emoji": { "name": "🟤" }, },
                            { "label": "Turuncu", "value": "turuncu", "emoji": { "name": "🟠" }, },
                            { "label": "Rol İstemiyorum", "value": "rolsil", "emoji": { "name": "🗑️" }, }
                        ], "placeholder": "Renk Rol Al", "min_values": 1, "max_values": 1
                    }],
                }
                ]
            }
        })

        }
if (menü.customId === "iliskikur") {
        await msg.delete({ timeout: 1500 });

        client.api.channels(message.channel.id).messages.post({
            data: {
                "content": `**İlişki Rol :**`,
                "components": [{
                    "type": 1, "components": [{
                        "type": 3, "custom_id": "iliski", "options": [
                            { "label": "Sevgilim Var", "value": "sevgilimvar", "emoji": { "name": "❤️" }, },
                            { "label": "Sevgilim Yok", "value": "sevgilimyok", "emoji": { "name": "💔" }, },
                            { "label": "Sevgili Yapmıyorum", "value": "sevgiliyapmıyorum", "emoji": { "name": "🤍" }, },
                            { "label": "Lgbt", "value": "lgbt", "emoji": { "name": "🏳️‍🌈" }, },
                            { "label": "Rol İstemiyorum", "value": "rolsil", "emoji": { "name": "🗑️" }, }
                        ], "placeholder": "İlişki Rol Al", "min_values": 1, "max_values": 1
                    }],
                }
                ]
            }
        })	
        }
if (menü.customId === "oyunkur") {
        await msg.delete({ timeout: 1500 });
        client.api.channels(message.channel.id).messages.post({
            data: {
                "content": `**Oyun Rol :**`,
                "components": [{
                    "type": 1, "components": [{
                        "type": 3, "custom_id": "oyun", "options": [
                            { "label": "Minecraft", "value": "mc", "emoji": { "name": "🎯" }, },
                            { "label": "Mobile Legends", "value": "mlbb", "emoji": { "name": "🎯" }, },
                            { "label": "League Of Legends", "value": "lol", "emoji": { "name": "🎯" }, },
                            { "label": "Gta 5", "value": "gta5", "emoji": { "name": "🎯" }, },
                            { "label": "Valorant", "value": "valo", "emoji": { "name": "🎯" }, },
                            { "label": "Among Us", "value": "amongus", "emoji": { "name": "🎯" }, },
                            { "label": "Conter Strike Go", "value": "csgo", "emoji": { "name": "🎯" }, },
                            { "label": "Rol İstemiyorum", "value": "rolsil", "emoji": { "name": "🗑️" }, }
                        ], "placeholder": "Oyun Rol Al", "min_values": 1, "max_values": 1
                    }],
                }
                ]
            }
        })	

        }
if (menü.customId === "takimkur") {
        await msg.delete({ timeout: 1500 });

        client.api.channels(message.channel.id).messages.post({
            data: {
                "content": `**Takım Rol :**`,
                "components": [{
                    "type": 1, "components": [{
                        "type": 3, "custom_id": "takim", "options": [
                            { "label": "Galatasaray", "value": "gs", "emoji": { "name": "❤️" }, },
                            { "label": "Fenerbahçe", "value": "fb", "emoji": { "name": "💛" }, },
                            { "label": "Beşiktaş", "value": "bjk", "emoji": { "name": "🖤" }, },
                            { "label": "TrabzonSpor", "value": "ts", "emoji": { "name": "💙" }, },
                            { "label": "Rol İstemiyorum", "value": "rolsil", "emoji": { "name": "🗑️" }, }
                        ], "placeholder": "Takım Rol Al", "min_values": 1, "max_values": 1
                    }],
                }
                ]
            }
        })
        }

if(menü.customId === "iptal") {
  if(msg) msg.delete().catch({})
  menü.reply({ content :"Başarıyla İptal Edildi Ve Mesaj Silindi.", ephemeral: true })
}
}

  
)}}

client.on("interactionCreate", async(interaction) => {
const member = await client.guilds.cache.get(conf.GuildID).members.fetch(interaction.member.user.id)
if (!member) return;

 if (interaction.customId === "etkinliks") {
        let eventsMap = new Map([
          ["etkinlik", conf.etkinlik],
          ["cekilis", conf.çekiliş],
        ])
        let roles = [conf.etkinlik, conf.çekiliş]
        var role = []
        for (let index = 0; index < interaction.values.length; index++) {
          let ids = interaction.values[index]
          let den = eventsMap.get(ids)
          var role = []
          role.push(den);
        }
        if (interaction.values[0] === "rolsil") {
            await member.roles.remove(roles)
          } else {
            if (!interaction.values.length) {
                await member.roles.remove(roles).catch(err => {})
              } else if (interaction.values.length > 1) {
                await member.roles.add(roles).catch(err => {})
              } else {
                await member.roles.remove(roles).catch(err => {})
                await member.roles.add(role).catch(err => {})
              }
          }
        interaction.reply({ content: "Rolleriniz düzenlendi.", ephemeral: true })
      }

      if (interaction.customId === "burc") {
        let burçMap = new Map([
            ["koç", conf.koç],
            ["boğa", conf.boğa],
            ["ikizler", conf.ikizler],
            ["yengeç", conf.yengeç],
            ["aslan", conf.aslan],
            ["başak", conf.başak],
            ["terazi", conf.terazi],
            ["akrep", conf.akrep],
            ["yay", conf.yay],
            ["oğlak", conf.oğlak],
            ["kova", conf.kova],
            ["balık", conf.balık],
          ])
          let roles = [conf.koç, conf.boğa, conf.ikizler, conf.yengeç, conf.aslan, conf.başak, conf.terazi, conf.akrep, conf.yay, conf.oğlak, conf.kova, conf.balık]
          let role = burçMap.get(interaction.values[0])
          if (interaction.values[0] === "rolsil") {
            await member.roles.remove(roles)
          } else if (role) {
            if (roles.some(m => member.roles.cache.has(m))) {
              await member.roles.remove(roles)
            }
            await member.roles.add(role)
          }
          interaction.reply({ content: "Başarıyla \`Burç\` Rolleriniz düzenlendi.", ephemeral: true })    
      }

      if (interaction.customId === "iliski") {
        let iliskiMap = new Map([
            ["sevgilimvar", conf.couple],
            ["lgbt", conf.lgbt],
            ["sevgilimyok", conf.alone],
            ["sevgiliyapmıyorum", conf.sevgiliyapmıyorum],
          ])
          let roles = [conf.couple, conf.alone, conf.lgbt, conf.sevgiliyapmıyorum]
          let role = iliskiMap.get(interaction.values[0])
          if (interaction.values[0] === "rolsil") {
            await member.roles.remove(roles)
          } else if (role) {
            if (roles.some(m => member.roles.cache.has(m))) {
              await member.roles.remove(roles)
            }
            await member.roles.add(role)
          }
          interaction.reply({ content: "Başarıyla \`İlişki\` Rolleriniz düzenlendi.", ephemeral: true })    
      }

if (interaction.customId === "renk") {
        let color = new Map([
          ["mavi", conf.mavi],
          ["kirmizi", conf.kırmızı],
          ["sarı", conf.sarı],
          ["siyah", conf.siyah],
          ["beyaz", conf.beyaz],
          ["yesil", conf.yeşil],
          ["mor", conf.mor],
          ["kahverengi", conf.kahverengi],
          ["turuncu", conf.turuncu],
  
        ])
        let role = color.get(interaction.values[0])
        let renkroller = [conf.mavi, conf.kırmızı, conf.sarı, conf.siyah, conf.beyaz, conf.yeşil, conf.mor, conf.kahverengi, conf.turuncu]
        if (!member.roles.cache.has(conf.ekipRolu) && !member.roles.cache.has(conf.Guild.boosterRolu) && !member.permissions.has("ADMINISTRATOR")) {
            interaction.reply({ content: "Rollerin güncellenirken bir sorun meydana geldi **(İsminde Sunucu Tag'ı Yoktur veya Boost basmamışsın)**" , ephemeral: true })
        } else {
          if (interaction.values[0] === "rolsil") {
            await member.roles.remove(renkroller)
          } else if (role) {
            if (renkroller.some(m => member.roles.cache.has(m))) {
              await member.roles.remove(renkroller)
            }
            await member.roles.add(role)
          }
          interaction.reply({ content: "Başarıyla \`Renk\` Rolleriniz düzenlendi.", ephemeral: true })
        }
      }

      if (interaction.customId === "takim") {
        let iliskiMap = new Map([
            ["gs", conf.gs],
            ["fb", conf.fb],
            ["ts", conf.ts],
            ["bjk", conf.bjk],
          ])
          let roles = [conf.gs, conf.ts, conf.fb, conf.bjk]
          let role = iliskiMap.get(interaction.values[0])
          if (interaction.values[0] === "rolsil") {
            await member.roles.remove(roles)
          } else if (role) {
            if (roles.some(m => member.roles.cache.has(m))) {
              await member.roles.remove(roles)
            }
            await member.roles.add(role)
          }
          interaction.reply({ content: "Başarıyla \`Takım\` Rolleriniz düzenlendi.", ephemeral: true })    
      }

    if (interaction.customId === "oyun") {
        let GameMap = new Map([
          ["mc", conf.minecraft],
          ["mlbb", conf.mlbb],
          ["lol", conf.lol],
          ["gta5", conf.gta5],
          ["valo", conf.valorant],
          ["amongus", conf.amongus],
          ["csgo", conf.csgo],
        ])
        let roles = [conf.minecraft, conf.mlbb, conf.lol, conf.gta5, conf.valorant, conf.amongus ,conf.csgo]
        var role = []
        for (let index = 0; index < interaction.values.length; index++) {
          let ids = interaction.values[index]
          let den = GameMap.get(ids)
          role.push(den)
        }
        if (!interaction.values.length) {
          await member.roles.remove(roles)
        } else {
          await member.roles.remove(roles)
          await member.roles.add(role)
        } 
        interaction.reply({ content: "Başarıyla \`Oyun\` Rolleriniz düzenlendi.", ephemeral: true })
      }
	
}) 	