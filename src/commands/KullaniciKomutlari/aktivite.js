const { Client, Message, MessageEmbed, MessageButton, MessageActionRow, MessageSelectMenu} = require("discord.js");
const { DiscordTogether } = require('discord-together');
const client = global.bot;
client.discordTogether = new DiscordTogether(client);
const { green, red } = require("../../configs/emojis.json")

    module.exports = {
        conf: {
          aliases: ["aktivite", "together","etkinlik"],
          name: "aktivite",
          help: "aktivite",
          category: "kullanıcı",
        },
      
    run: async (client, message, args, prefix) => {
    if(!message.member.voice.channel) return message.reply(`Herhangi bir ses kanalı bağlı değilsin, Üzgünüm!`).then(x => {
      message.react(red)
      setTimeout(() => { x.delete()}, 7500);
    });

    let Activitys = [
      {label: "Youtube", description:"Arkadaşlarınla Youtube ile video seyretmek ister misin?", value: "youtube", emoji: {id: "997820361246789713"}},
      {label: "Poker Night", description:"Arkadaşlarınla Poker Night oynamak ister misin?", value: "poker", "emoji": { "name": "🃏" }},
      {label: "Santranç", description:"Arkadaşlarınla Satranç oynamak ister misin?", value: "chess", "emoji": { "name": "♟️" }},
      {label: "Dama", description:"Arkadaşlarınla Dama oynamak ister misin?", value: "checkers", "emoji": { "name": "🥏"}},
      {label: "Kelime Oyunu", description:"Arkadaşlarınla Kelime Oyunu oynamak ister misin?", value: "wordsnack", "emoji": { "name": "🔠" }},
      {label: "Heceleme", description:"Arkadaşlarınla Heceleme oynamak ister misin?", value: "spellcast", "emoji": { "name": "🆗" }},
    ]
    let row = new MessageActionRow().addComponents(
      new MessageSelectMenu()
      .setCustomId("jaylenozi")
      .setPlaceholder(`Aktivitenizi belirleyin!`)
      .addOptions([ Activitys ]),
    )

let embed = new MessageEmbed()
.setAuthor({ name: message.guild.name, iconURL: message.guild.iconURL({ dynamic: true }) }).setTimestamp().setColor(message.author.displayHexColor).setFooter({ text: message.author.tag, iconURL: message.author.avatarURL({ dynamic: true })}).setThumbnail(message.guild.iconURL({ dynamic: true }))
.addField(`AKTİVİTE SEÇİM`,`
\` ❯ \` Aşağıda ki sıralanan aktivitelerden oynamak veya aktivite yapmak için menüden tıklayarak seçebilirsiniz.
`)
    message.channel.send({embeds: [embed], components: [row]}).then(msg => {
      let filter = i => i.user.id == message.member.id
      let collector = msg.createMessageComponentCollector({ filter, componentType: 'SELECT_MENU', max: 1, time: 30000 })

      collector.on('collect', async (i) => {
        if(i.customId == "jaylenozi") {
        	let etkinlik = i.values

          if(etkinlik == "youtube") {
            client.discordTogether.createTogetherCode(message.member.voice.channel.id, 'youtube').then(async invite => {
              embed.setDescription(`${message.member} tarafından Youtube Together seçildi!`).setFooter({ text: "Bu davet 10 saniye içerisinde silinecektir."})
              msg.edit({embeds: [embed], components: []}).then((e) => setTimeout(() => { e.delete(); }, 10000));
              message.react(green)
                await i.reply({content: `İzlemek için arkadaşlarınla bu davet kodunu kullanabilirsin.\n${invite.code}`, ephemeral: true})
            });
          };

          if(etkinlik == "poker") {
            client.discordTogether.createTogetherCode(message.member.voice.channel.id, 'poker').then(async invite => {
              embed.setDescription(`${message.member} tarafından Poker Night seçildi!`).setFooter({ text: "Bu davet 10 saniye içerisinde silinecektir."})
              msg.edit({embeds: [embed], components: []}).then((e) => setTimeout(() => { e.delete(); }, 10000));
              message.react(green)
                await i.reply({content: `İzlemek için arkadaşlarınla bu davet kodunu kullanabilirsin.\n${invite.code}`, ephemeral: true})
            });
          };

          if(etkinlik == "chess") {
            client.discordTogether.createTogetherCode(message.member.voice.channel.id, 'chess').then(async invite => {
              embed.setDescription(`${message.member}, tarafından Satranç seçildi!`).setFooter({ text: "Bu davet 10 saniye içerisinde silinecektir."})
              msg.edit({embeds: [embed], components: []}).then((e) => setTimeout(() => { e.delete(); }, 10000));
              message.react(green)
                await i.reply({content: `Oynamak için arkadaşlarınla bu davet kodunu kullanabilirsin.\n${invite.code}`, ephemeral: true})
            });
          };
        
          if(etkinlik == "checkers") {
            client.discordTogether.createTogetherCode(message.member.voice.channel.id, 'checkers').then(async invite => {
              embed.setDescription(`${message.member}, tarafından Dama seçildi!`).setFooter({ text: "Bu davet 10 saniye içerisinde silinecektir."})
              msg.edit({embeds: [embed], components: []}).then((e) => setTimeout(() => { e.delete(); }, 10000));
              message.react(green)
                await i.reply({content: `Oynamak için arkadaşlarınla bu davet kodunu kullanabilirsin.\n${invite.code}`, ephemeral: true})
            });
          };
        
          if(etkinlik == "wordsnack") {
            client.discordTogether.createTogetherCode(message.member.voice.channel.id, 'wordsnack').then(async invite => {
              embed.setDescription(`${message.member}, tarafından Kelime Oyunu seçildi!`).setFooter({ text: "Bu davet 10 saniye içerisinde silinecektir."})
              msg.edit({embeds: [embed], components: []}).then((e) => setTimeout(() => { e.delete(); }, 10000));
              message.react(green)
                await i.reply({content: `Oynamak için arkadaşlarınla bu davet kodunu kullanabilirsin.\n${invite.code}`, ephemeral: true})
            });
          };
        
          if(etkinlik == "spellcast") {
            client.discordTogether.createTogetherCode(message.member.voice.channel.id, 'spellcast').then(async invite => {
              embed.setDescription(`${message.member}, tarafından Heceleme seçildi!`).setFooter({ text: "Bu davet 10 saniye içerisinde silinecektir."})
              msg.edit({embeds: [embed], components: []}).then((e) => setTimeout(() => { e.delete(); }, 10000));
              message.react(green)
                await i.reply({content: `Oynamak için arkadaşlarınla bu davet kodunu kullanabilirsin.\n${invite.code}`, ephemeral: true})
            });
          };
        }
      })
    });
    }
};