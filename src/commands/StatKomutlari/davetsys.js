const {  voice, mesaj2, star, miniicon } = require("../../configs/emojis.json");
const messageUserChannel = require("../../schemas/messageUserChannel");
const voiceUserChannel = require("../../schemas/voiceUserChannel");
const messageUser = require("../../schemas/messageUser");
const voiceUser = require("../../schemas/voiceUser");
const inviteMemberSchema = require("../../schemas/inviteMember");
const voiceUserParent = require("../../schemas/voiceUserParent");
const moment = require("moment");
const inviterSchema = require("../../schemas/inviter");
const db = require("../../schemas/inviter");
require("moment-duration-format");
const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");
const conf = require("../../configs/sunucuayar.json")
const wait = require('node:timers/promises').setTimeout;

module.exports = {
  conf: {
    aliases: ["davet"],
    name: "davet",
    help: "davet (stat [user])",
    category: "davet",
  },

  run: async (client, message, args, embed) => {

if(message.channel.id !== conf.ytcommands && message.channel.id !== conf.botcommandschannel && !message.member.permissions.has("ADMINISTRATOR")) return message.reply({content: `Bu Komutu Sadece <#${conf.botcommandschannel}> Ve <#${conf.ytcommands}> Kanalında Kullanabilirsin.`}).then((e) => setTimeout(() => { e.delete(); }, 5000));

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
      const invMember = await inviteMemberSchema.find({ guildID: message.guild.id, inviter: member.user.id });
      const daily = invMember ? message.guild.members.cache.filter((m) => invMember.some((x) => x.userID === m.user.id) && Date.now() - m.joinedTimestamp < 1000 * 60 * 60 * 24).size : 0;
      const messageData = await messageUser.findOne({ guildID: message.guild.id, userID: member.id });
      const voiceData = await voiceUser.findOne({ guildID: message.guild.id, userID: member.id });
      const messageWeekly = messageData ? messageData.weeklyStat : 0;
      const voiceWeekly = moment.duration(voiceData ? voiceData.weeklyStat : 0).format("H [saat], m [dakika]");
      const messageDaily = messageData ? messageData.dailyStat : 0;
      const voiceDaily = moment.duration(voiceData ? voiceData.dailyStat : 0).format("H [saat], m [dakika]");
      const bazıları = invMember ? invMember.filter(value => message.guild.members.cache.get(value.userID)).slice(0, 7).map((value, index) => message.guild.members.cache.get(value.userID)).join(", ") : undefined
      const weekly = invMember ? message.guild.members.cache.filter((m) => invMember.some((x) => x.userID === m.user.id) && Date.now() - m.joinedTimestamp < 1000 * 60 * 60 * 24 * 7).size : 0;
      let tagged;
      if (conf.tag && conf.tag.length > 0) tagged = invMember ? message.guild.members.cache.filter((m) => invMember.some((x) => x.userID === m.user.id) && m.user.username.includes(conf.tag)).size : 0;
      else tagged = 0;

      const row = new MessageActionRow()
      .addComponents(

  new MessageButton()
  .setCustomId("main")
  .setLabel("Menü")
  .setStyle("PRIMARY"),

  new MessageButton()
  .setCustomId("davet")
  .setLabel("Davetlerim")
  .setStyle("SECONDARY"),

  new MessageButton()
  .setCustomId("tdavet")
  .setLabel("Top Davet")
  .setStyle("SECONDARY"),

  new MessageButton()
  .setCustomId("bdavet")
  .setLabel("Bazıları")
  .setStyle("SECONDARY"),
  );

      embed.setAuthor({ name: message.guild.name, iconURL: message.guild.iconURL({ dynamic: true }) }).setTimestamp().setColor(message.author.displayHexColor).setFooter({ text: message.author.tag, iconURL: message.author.avatarURL({ dynamic: true })})
      embed.setDescription(`Merhaba ${member.toString()} Davet Statların Aşağıda Listelenmiştir.

      \` ❯ \` **Toplam** \`${total}\` **davetin Bulunmakta.**
      \` ❯ \` **Bunlardan** **(**\`${regular}\` **gerçek,** \`${bonus}\` **bonus,** \`${leave}\` **ayrılmış,** \`${fake}\` **fake)**     
      \` ❯ \` **(Günlük:** \`${daily}\` **Davet**, **Haftalık:** \`${weekly}\` **Davet**, **Taglı:** \`${tagged}\` **Davet)**
      \` ❯ \` ${bazıları ? `**Davet Ettiğin Kullanıcılar:** ${bazıları}` : ''}

      \` Aşağıdaki Butonlardan Seçim Yaparak Sunucudaki Davetlerin Hakkında Detaylı Bilgi Edinebilirsin.\` `,`
      `)

      let msg = await message.channel.send({ embeds: [embed], components: [row]})

      const filter = (xd) => xd.user.id == message.author.id;
      let collector =  msg.createMessageComponentCollector({ filter, componentType: 'BUTTON', time: 99999999 })

collector.on("collect", async (button) => {
if(button.customId === "davet") {
  await button.deferUpdate();

const embeds = new MessageEmbed()
.setDescription(`${member.toString()} Kullanıcısının Yaptığı Davetler Aşağıda Belirtilmiştir.`)

.addFields(
{ name: "__**Toplam Davet**__",  value: `
\`\`\`fix
${inviterData ? inviterData.total : 0} Davet
\`\`\`
`, inline: true },
{ name: "__**Fake Davet**__",  value: `
\`\`\`fix
${inviterData ? inviterData.fake : 0} Fake Davet
\`\`\`
`, inline: true },
{ name:"__**Bonus Davet**__",  value: `
\`\`\`fix
${inviterData ? inviterData.bonus : 0} Bonus Davet
\`\`\`
`, inline: true },
)
embeds.addField(`${star} **Davet İstatistiği**`, `
Toplam Davet **${total}**
Gerçek Davet **${regular}**
Davetinden Çıkanlar **${leave}**
Fake Davet **${fake}**

`, false);
msg.edit({
  embeds: [embeds],
  components : [row]
})}
if(button.customId === "tdavet") {
  await button.deferUpdate();

  let data = await db.find({ guildID: message.guild.id }).sort({ total: -1 });
    if (!data.length)return message.channel.send({ embeds: [embed.setDescription("Herhangi bir invite verisi bulunamadı!")] });
    let arr = [];
    data.forEach((x) => arr.push({ id: x.userID, total: x.total }));
    let index = arr.findIndex((x) => x.id == message.author.id) + 1;

    let list = data
      .filter((x) => message.guild.members.cache.has(x.userID))
      .splice(0, 20)
      .map((x, index) => `${x.userID === message.author.id ? `[\`${index + 1}.\`] <@${x.userID}> **: Toplam** \`${x.total}\` **davet** (\`${x.regular}\` **gerçek,** \`${x.bonus}\` **bonus,** \`${x.fake}\` **fake,** \`${x.leave}\` **ayrılmış**)` : `[\`${index + 1}.\`] <@${x.userID}> **: Toplam **\`${x.total}\` **davet** (\`${x.regular}\`** gerçek,** \`${x.bonus}\` **bonus,** \`${x.fake}\` **fake,** \`${x.leave}\` **ayrılmış**)`}`)
      .join("\n");

    const veri = await db.findOne({ guildID: message.guild.id, userID: message.author.id });
    if (index < 10) {
      const embed = new MessageEmbed()
      .setAuthor({ name: message.guild.name, iconURL: message.guild.iconURL({ dynamic: true })})
      .setDescription(list);
      msg.edit({
        embeds: [embed],
        components : [row]
      });
    } else {
      const embed = new MessageEmbed()
      .setAuthor({ name: message.guild.name, iconURL: message.guild.iconURL({ dynamic: true })})
      .setDescription(`${list} \n... \n**${index}. ${message.author} Toplam ${veri.total} davet (${veri.regular} gerçek, ${veri.bonus} bonus, ${veri.fake} fake, ${veri.leave} ayrılmış)**`);
      msg.edit({
        embeds: [embed],
        components : [row]
      });
    }
}
if(button.customId === "bdavet") {
  await button.deferUpdate();
  const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;
  const inviterData = await inviterSchema.findOne({ guildID: message.guild.id, userID: member.user.id });
  const total = inviterData ? inviterData.total : 0;
  const regular = inviterData ? inviterData.regular : 0;
  const bonus = inviterData ? inviterData.bonus : 0;
  const leave = inviterData ? inviterData.leave : 0;
  const fake = inviterData ? inviterData.fake : 0;
  const invMember = await inviteMemberSchema.find({ guildID: message.guild.id, inviter: member.user.id });
  const bazıları = invMember ? invMember.filter(value => message.guild.members.cache.get(value.userID)).slice(0, 7).map((value, index) => message.guild.members.cache.get(value.userID)).join("\n") : undefined
  const daily = invMember ? message.guild.members.cache.filter((m) => invMember.some((x) => x.userID === m.user.id) && Date.now() - m.joinedTimestamp < 1000 * 60 * 60 * 24).size : 0;
  const weekly = invMember ? message.guild.members.cache.filter((m) => invMember.some((x) => x.userID === m.user.id) && Date.now() - m.joinedTimestamp < 1000 * 60 * 60 * 24 * 7).size : 0;
  let tagged;
  if (conf.tag && conf.tag.length > 0) tagged = invMember ? message.guild.members.cache.filter((m) => invMember.some((x) => x.userID === m.user.id) && m.user.username.includes(conf.tag)).size : 0;
  else tagged = 0;

  const bdavet = new MessageEmbed()
    .setAuthor({ name: message.guild.name, iconURL: message.guild.iconURL({ dynamic: true }) })
    .setDescription(` \`\`\`Davet ettiğin bazı kullanıcılar aşağıda sıralanmıştır\`\`\`
    ${bazıları ? `${bazıları}` : 'yok'}
    `);
msg.edit({
  embeds: [bdavet],
  components : [row]
})}
if(button.customId === "main") {
  await button.deferUpdate();

msg.edit({
  embeds: [embed],
  components : [row]
})}
})
},
};