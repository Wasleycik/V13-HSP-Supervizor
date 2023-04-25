const Discord = require("discord.js");
const { MessageEmbed, MessageActionRow, MessageSelectMenu } = require("discord.js");
const messageUser = require("../../schemas/messageUser");
const voiceUser = require("../../schemas/voiceUser");
const voiceUserParent = require("../../schemas/voiceUserParent");
const inviterSchema = require("../../schemas/inviter");
const inviteMemberSchema = require("../../schemas/inviteMember");
const nameData = require("../../schemas/names")
const conf = require("../../configs/sunucuayar.json")
const isimcek = require("../../configs/isimcek.json")
const emojis = require("../../configs/emojis.json")
const ranks = require("../../configs/ranks.json")
const moment = require("moment");
moment.locale("tr");
const client = global.bot;

module.exports = {
  conf: {
    aliases: [],
    name: "buttonpanel",
    help: "buttonpanel",
    category: "sahip",
    owner: true,
  },

  run: async (client, message, args) => {
    const bpanelrow = new MessageActionRow()
    .addComponents(
        new MessageSelectMenu()
            .setCustomId('kısayollar')
            .setPlaceholder(`Kısayolları Görmek İçin Tıkla`)
            .addOptions([
                { label: 'Sunucu Giriş',description: 'Sunucuya Giriş Tarihinizi Öğrenin.', value: 'I', emoji: { "name": "✨" },},
                { label: 'Hesap Açılış',description: 'Hesabınızın Açılış Tarihini Öğrenin.', value: 'III', emoji: { "name": "✨" },},
                { label: 'Rolleriniz',description: 'Üzerinizde Bulunan Rollerin Listesini Atar.', value: 'II', emoji: { "name": "✨" },},
                { label: 'Aktiflik',description: 'Sunucudaki Anlık Aktif Listesini Görüntüleyin.', value: 'VI', emoji: { "name": "✨" },},
                { label: 'Davet Stat',description: 'Sunucudaki Davet Bilgilerinizi Görüntüleyin.', value: 'IV', emoji: { "name": "✨" },},
                { label: 'Mesaj Stat',description: 'Sunucudaki Mesaj Bilgilerinizi Görüntüleyin.', value: 'VIII', emoji: { "name": "✨" },},
                { label: 'Ses Stat',description: 'Sunucudaki Ses Bilgilerinizi Görüntüleyin.', value: 'IX', emoji: { "name": "✨" },},
                { label: 'İsim Geçmişi',description: 'Önceki İsim Bilgilerinizi Öğrenin.', value: 'VII', emoji: { "name": "✨" },},
             ]),
    );

			const kısayollar = new MessageActionRow()
			.addComponents(
			  new MessageSelectMenu()
				.setCustomId('komutlar')
				.setPlaceholder('Komutlar hakkında yardım almak için tıkla!')
				.addOptions([
				  { label: 'Kullanıcı Komutları',description: 'Kullanıcı Komutlar kategorisinin yardım bilgileri için tıkla!',value: 'kısayollar1',emoji: { "name": "✨"},},
				  { label: 'Market Komutları',description: 'Market Komutlar kategorisinin yardım bilgileri için tıkla!',value: 'kısayollar2',emoji: { "name": "✨"},},						
				  { label: 'Kayıt Komutları',description: 'Kayıt Komutlar kategorisinin yardım bilgileri için tıkla!',value: 'kısayollar3',emoji: { "name": "✨"},},
				  { label: 'Cezalandırma Komutları',description: 'Cezalandırma Komutlar kategorisinin yardım bilgileri için tıkla!',value: 'kısayollar4',emoji: { "name": "✨"}, },
				  { label: 'Stat Komutları',description: 'Stat Komutlar kategorisinin yardım bilgileri için tıkla!',value: 'kısayollar5',emoji: { "name": "✨"},},
				  { label: 'Yetkili Komutları',description: 'Yetkili Komutlar kategorisinin yardım bilgileri için tıkla!',value: 'kısayollar6',emoji: { "name": "✨"},},
				  { label: 'Kurucu Komutları',description: 'Kurucu Komutlar kategorisinin yardım bilgileri için tıkla!',value: 'kısayollar7',emoji: { "name": "✨"},},
				  { label: 'Sahip Komutları',description: 'Sahip Komutlar kategorisinin yardım bilgileri için tıkla!',value: 'kısayollar8',emoji: { "name": "✨"},},
				]),
			);

let msg = await message.channel.send({content: `⭐️ Sunucu İçi Bilgilerinizi Botun Komutlarını Ve Diğer Herşeyi Buradan Öğrenebilirsiniz.`, components: [bpanelrow,kısayollar] });

  },
};

client.on('interactionCreate', async interaction => {
    if (!interaction.isSelectMenu()) return;

const member = interaction.user;
const inviterData = await inviterSchema.findOne({ guildID: conf.GuildID, userID: interaction.user.id });
const total = inviterData ? inviterData.total : 0;
const regular = inviterData ? inviterData.regular : 0;
const bonus = inviterData ? inviterData.bonus : 0;
const leave = inviterData ? inviterData.leave : 0;
const fake = inviterData ? inviterData.fake : 0;
const invMember = await inviteMemberSchema.find({ guildID: conf.GuildID, inviter: interaction.user.id });
const daily = invMember ? interaction.guild.members.cache.filter((m) => invMember.some((x) => x.userID === m.user.id) && Date.now() - m.joinedTimestamp < 1000 * 60 * 60 * 24).size : 0;
const weekly = invMember ? interaction.guild.members.cache.filter((m) => invMember.some((x) => x.userID === m.user.id) && Date.now() - m.joinedTimestamp < 1000 * 60 * 60 * 24 * 7).size : 0;
const tagged = invMember ? interaction.guild.members.cache.filter((m) => invMember.some((x) => x.userID === m.user.id) && m.user.username.includes(conf.tag)).size : 0;

////////////////////////////////////////////////////////////////////////////////////////////

const data = await nameData.findOne({ guildID: conf.GuildID, userID: member.id });

////////////////////////////////////////////////////////////////////////////////////////////

const messageData = await messageUser.findOne({ guildID: conf.GuildID, userID: interaction.user.id });
const voiceData = await voiceUser.findOne({ guildID: conf.GuildID, userID: interaction.user.id });

  const messageWeekly = messageData ? messageData.weeklyStat : 0;
  const voiceWeekly = moment.duration(voiceData ? voiceData.weeklyStat : 0).format("H [saat], m [dakika]");
  const messageDaily = messageData ? messageData.dailyStat : 0;
  const voiceDaily = moment.duration(voiceData ? voiceData.dailyStat : 0).format("H [saat], m [dakika]");

////////////////////////////////////////////////////////////////////////////////////////////

const category = async (parentsArray) => {
  const data = await voiceUserParent.find({ guildID: conf.GuildID, userID: member.id });
  const voiceUserParentData = data.filter((x) => parentsArray.includes(x.parentID));
  let voiceStat = 0;
  for (var i = 0; i <= voiceUserParentData.length; i++) {
    voiceStat += voiceUserParentData[i] ? voiceUserParentData[i].parentData : 0;
  }
  return moment.duration(voiceStat).format("H [saat], m [dakika] s [saniye]");
};

////////////////////////////////////////////////////////////////////////////////////////////

if(interaction.values[0] === "I")
{
await interaction.reply({ content: `**Sunucuya Giriş Tarihiniz :** <t:${Math.floor(interaction.member.joinedTimestamp / 1000)}> (<t:${Math.floor(interaction.member.joinedTimestamp / 1000)}:R>)`, ephemeral: true });
}

if(interaction.values[0] === "II")
{
await interaction.reply({ content: `**Üzerinde Bulunan Rollerin Listesi ;**
        
${(await interaction.guild.members.cache.get(member.id).roles.cache.filter(a => a.name !== '@everyone').map(a => a).join(' ') ? await interaction.guild.members.cache.get(member.id).roles.cache.filter(a => a.name !== '@everyone').map(a => a).join(', ') : 'Hiç yok.')}`, ephemeral: true });
}

if(interaction.values[0] === "III")
{
await interaction.reply({ content: `**Hesabınız** <t:${Math.floor(member.createdTimestamp / 1000)}>  (<t:${Math.floor(member.createdTimestamp / 1000)}:R>) **Tarihinde Açılmış**`, ephemeral: true });
}

if(interaction.values[0] === "IV")
{
await interaction.reply({ content: `
${member.toString()}, <t:${Math.floor(Date.now() / 1000)}> Tarihine Kadar Sunucumuzda Yapmış Olduğunuz Tüm İnvite İstatislikleriniz Aşağıda Belirtilmiştir.
\`•\` **Toplam** \`${regular}\` **Davetin Bulunmakta.**

\`•\` \`(${total} gerçek, ${bonus} bonus, ${leave} ayrılmış, ${fake} fake)\`
      
\`•\` \`Günlük: ${daily}, Haftalık: ${weekly}, Taglı: ${tagged}\`
`, ephemeral: true });
}

if(interaction.values[0] === "V")
{
await interaction.guild.members.cache.get(member.id).roles.cache.has(conf.boosterRolu) ? interaction.guild.members.cache.get(member.id).roles.set([conf.boosterRolu, conf.unregRoles[0]]) : interaction.guild.members.cache.get(member.id).roles.set(conf.unregRoles)
await interaction.reply({ content: `${member.toString()} üyesi başarıyla kayıtsıza atıldı!`, ephemeral: true });
}

if(interaction.values[0] === "VI")
{
await interaction.reply({ content: `
\`•\` **Sesli Kanallardaki Toplam Üye Sayısı :** \`${(interaction.guild.members.cache.filter((x) => x.voice.channel).size)}\`
\`•\` **Sunucudaki Toplam Üye Sayısı :** \`${(interaction.guild.memberCount)}\`
\`•\` **Sunucunun Oluşturulma Tarihi :** \`${moment(interaction.guild.createdAt).locale("tr").format("LLL")}\`
\`•\` **Sunucu Destek/Id Numarası :** \`${(interaction.guild.id)}\`
`, ephemeral: true });
}

if(interaction.values[0] === "VII")
{
const ambed = new Discord.MessageEmbed()
.setAuthor({ name: `${member.username} üyesinin isim bilgileri;`})
.setColor("DARK_BUT_NOT_BLACK")
.setFooter({ text: interaction.user.tag, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) })
.setDescription(data ? data.names.splice(0, 10).map((x, i) => `\` ${i + 1} \` \` ${x.name} \` ${x.sebep ? `(${x.sebep})` : ""} ${x.rol ? `(${x.rol})` : ""} ${x.yetkili ? `(<@${x.yetkili}>)` : ""} <t:${Math.floor(x.date / 1000)}:R>`).join("\n") : "Bu kullanıcıya ait isim geçmişi bulunmuyor!")         
await interaction.reply({ embeds: [ambed], ephemeral: true });
}

if(interaction.values[0] === "VIII")
{
await interaction.reply({ content: `
${member.toString()}, <t:${Math.floor(Date.now() / 1000)}> Tarihine Kadar Sunucumuzda Yapmış Olduğunuz Tüm Mesaj İstatislikleriniz Aşağıda Belirtilmiştir.

⭐️ **Mesaj İstatistiği**
\`•\` Toplam: \`${messageData ? messageData.topStat : 0}\`

\`•\` Haftalık Mesaj: \`${Number(messageWeekly).toLocaleString()} mesaj\`
\`•\` Günlük Mesaj: \`${Number(messageDaily).toLocaleString()} mesaj\`
`, ephemeral: true });
}

if(interaction.values[0] === "IX")
{
await interaction.reply({ content: `
${member.toString()}, <t:${Math.floor(Date.now() / 1000)}> Tarihine Kadar Sunucumuzda Yapmış Olduğunuz Tüm Ses İstatislikleriniz Aşağıda Belirtilmiştir.

⭐️ **Sesli Sohbet İstatistiği**
\`•\` Toplam: \`${moment.duration(voiceData ? voiceData.topStat : 0).format("H [saat], m [dakika] s [saniye]")}\`

\`•\` Haftalık Ses: \`${voiceWeekly}\`
\`•\` Günlük Ses: \`${voiceDaily}\`
`, ephemeral: true });
}

})