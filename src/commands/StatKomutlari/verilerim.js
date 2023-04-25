const { voice, mesaj2, star, miniicon } = require("../../configs/emojis.json");
const messageUserChannel = require("../../schemas/messageUserChannel");
const voiceUserChannel = require("../../schemas/voiceUserChannel");
const messageUser = require("../../schemas/messageUser");
const voiceUser = require("../../schemas/voiceUser");
const voiceUserParent = require("../../schemas/voiceUserParent");
const moment = require("moment");
const inviterSchema = require("../../schemas/inviter");
const regstats = require("../../schemas/registerStats");
require("moment-duration-format");
const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");
const conf = require("../../configs/sunucuayar.json")
const wait = require('node:timers/promises').setTimeout;

module.exports = {
  conf: {
    aliases: ["verilerim", "verim"],
    name: "verilerim",
    help: "verilerim",
    category: "stat"
  },

  run: async (client, message, args, embed, prefix) => {

    const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;
    const inviterData = await inviterSchema.findOne({ guildID: message.guild.id, userID: member.user.id });
    const total = inviterData ? inviterData.total : 0;
    const regular = inviterData ? inviterData.regular : 0;
    const bonus = inviterData ? inviterData.bonus : 0;
    const leave = inviterData ? inviterData.leave : 0;
    const fake = inviterData ? inviterData.fake : 0;

    const category = async (parentsArray) => {
      const data = await voiceUserParent.find({ guildID: message.guild.id, userID: member.id });
      const voiceUserParentData = data.filter((x) => parentsArray.includes(x.parentID));
      let voiceStat = 0;
      for (var i = 0; i <= voiceUserParentData.length; i++) {
        voiceStat += voiceUserParentData[i] ? voiceUserParentData[i].parentData : 0;
      }
      return moment.duration(voiceStat).format("H [saat], m [dakika] s [saniye]");
    };

    const Active1 = await messageUserChannel.find({ guildID: message.guild.id, userID: member.id }).sort({ channelData: -1 });
    const Active2 = await voiceUserChannel.find({ guildID: message.guild.id, userID: member.id }).sort({ channelData: -1 });
    let messageTop;
    Active1.length > 0 ? messageTop = Active1.splice(0, 5).map(x => `<#${x.channelID}>: \`${Number(x.channelData).toLocaleString()} mesaj\``).join("\n") : messageTop = "Veri bulunmuyor."

    const messageData = await messageUser.findOne({ guildID: message.guild.id, userID: member.id });
    const voiceData = await voiceUser.findOne({ guildID: message.guild.id, userID: member.id });
    const messageWeekly = messageData ? messageData.weeklyStat : 0;
    const voiceWeekly = moment.duration(voiceData ? voiceData.weeklyStat : 0).format("H [saat], m [dakika]");
    const messageDaily = messageData ? messageData.dailyStat : 0;
    const voiceDaily = moment.duration(voiceData ? voiceData.dailyStat : 0).format("H [saat], m [dakika]");
    const data = await regstats.findOne({ guildID: message.guild.id, userID: member.id });

    embed.setColor("RANDOM").setDescription(`${member.toString()}'n verileri aşağıda verilmiştir.`)
      .addFields(
        {
          name: "**Kullanıcı Bilgileri**", value: `
\`\`\`diff
+ Kullanıcı : ${member.user.username}
- Kullanıcı ID : ${message.author.id}
\`\`\`
**Ses Bilgileri:**
\`\`\`diff
+ Sohbet Kanalları: ${await category(conf.publicParents)}
- Kayıt Kanalları: ${await category(conf.registerParents)}
+ Private Kanalları: ${await category(conf.privateParents)}
- Toplantı Kanalları: ${await category(conf.funParents)}
+ Eğlence Kanalları: ${await category(conf.funParents)}
- Yayın Kanalları: ${await category(conf.funParents)}
+ Diğer Kanallar: ${await category(conf.funParents)}
\`\`\`
**Metin Bilgileri:**
\`\`\`diff
- Toplam Mesaj: ${messageData ? messageData.topStat : 0} 
\`\`\`
**İnvite Bilgileri:**(\`\`${total}\`\`)
\`\`\`diff
+ 0 Şüpheli Olmayan Hesaplar
- ${bonus} Bottan Eklenen Bonus Invıte
+ ${leave} Sunucudan Ayrılan Kullanıcılar
- 0 Hesabı 7 Gün Önceden Açılan Kullanıcılar
\`\`\`
**Kayıt Bilgileri:**(\`\`${data ? data.top : 0}\`\`)
\`\`\`diff
+ Erkek Kayıt Bilgisi: ${data ? data.erkek : 0}
- Kadın Kayıt Bilgisi: ${data ? data.kız : 0}
\`\`\`
`, inline: true
        },
      )
    let msg = await message.channel.send({ embeds: [embed] })
  }
};