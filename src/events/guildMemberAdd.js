const client = global.bot;
const { Collection } = require("discord.js");
const inviterSchema = require("../schemas/inviter");
const inviteMemberSchema = require("../schemas/inviteMember");
const coin = require("../schemas/coin");
const gorev = require("../schemas/invite");
const otokayit = require("../schemas/otokayit");
const bannedTag = require("../schemas/bannedTag");
const regstats = require("../schemas/registerStats");
const conf = require("../configs/sunucuayar.json")
const isimcek = require("../configs/isimcek.json")
const emojis = require("../configs/emojis.json")
const moment = require("moment");
const forceBans = require("../schemas/forceBans");
const isimler = require("../schemas/names");

module.exports = async (member) => {

  const data = await forceBans.findOne({ guildID: conf.GuildID, userID: member.user.id });
  if (data) return member.guild.members.ban(member.user.id, { reason: "Sunucudan kalıcı olarak yasaklandı!" }).catch(() => {});
  
  let guvenilirlik = Date.now()-member.user.createdTimestamp < 1000*60*60*24*7;
  if (guvenilirlik) {
  if(conf.fakeAccRole) member.roles.add(conf.fakeAccRole).catch();
  } else if(conf.unregRoles) member.roles.add(conf.unregRoles).catch();
  if (member.user.username.includes(conf.tag)) { member.setNickname(`${conf.tag} İsim | Yaş`).catch(); }
  else { member.setNickname(`${conf.ikinciTag} İsim | Yaş`).catch();}
  
  if (member.user.username.includes(conf.tag)) {
    await member.roles.add(conf.ekipRolu)
    await member.roles.add(conf.unregRoles)
    client.channels.cache.find(x => x.name.includes(isimcek.kanalcek.taglilog)).send({ content:`<@${member.id}> adlı kişi sunucumuza taglı şekilde katıldı, isminde ${conf.tag} sembolü bulunuyor.`})
  }

    
const otoreg = await otokayit.findOne({ userID: member.id })
 const tagModedata = await regstats.findOne({ guildID: conf.GuildID })
  if (tagModedata && tagModedata.tagMode === false ) {
    if (otoreg && tagModedata.otoreg === true) {
      await member.roles.set(otoreg.roleID)
      await member.setNickname(`${member.user.username.includes(conf.tag) ? conf.tag : (conf.ikinciTag ? conf.ikinciTag : (conf.tag || ""))} ${otoreg.name} | ${otoreg.age}`);
     if(conf.chatChannel && client.channels.cache.has(conf.chatChannel)) client.channels.cache.get(conf.chatChannel).send({ content:`Aramıza hoşgeldin **${member}**! Sunucumuzda daha önceden kayıtın bulunduğu için direkt içeriye alındınız. Kuralları okumayı unutma!`}).then((e) => setTimeout(() => { e.delete(); }, 10000));
     await isimler.findOneAndUpdate({ guildID: conf.GuildID, userID: member.user.id }, { $push: { names: { name: member.displayName, sebep: "Oto.Bot Kayıt", rol: otoreg.roleID.map(x => `<@&${x}>`), date: Date.now() } } }, { upsert: true });
    }
}

  let memberGün = moment(member.user.createdAt).format("DD");
  let memberTarih = moment(member.user.createdAt).format("YYYY HH:mm:ss");
  let memberAylar = moment(member.user.createdAt).format("MM").replace("01", "Ocak").replace("02", "Şubat").replace("03", "Mart").replace("04", "Nisan").replace("05", "Mayıs").replace("06", "Haziran").replace("07", "Temmuz").replace("08", "Ağustos").replace("09", "Eylül").replace("10", "Ekim").replace("11", "Kasım").replace("12", "Aralık");

  var üyesayısı = member.guild.memberCount.toString().replace(/ /g, "    ")
        var üs = üyesayısı.match(/([0-9])/g)
        üyesayısı = üyesayısı.replace(/([a-zA-Z])/g, "bilinmiyor").toLowerCase()
        if(üs) {
          üyesayısı = üyesayısı.replace(/([0-9])/g, d => {
            return {
              '0': `0`,
              '1': `1`,
              '2': `2`,
              '3': `3`,
              '4': `4`,
              '5': `5`,
              '6': `6`,
              '7': `7`,
              '8': `8`,
              '9': `9`}[d];
            })
          }     


  const channel = member.guild.channels.cache.get(conf.invLogChannel);
  const kayitchannel = member.guild.channels.cache.get(conf.teyitKanali);
  const kurallar = member.guild.channels.cache.get(conf.kurallar);
  if (!channel) return;
  if (member.user.bot) return;

  const cachedInvites = client.invites.get(member.guild.id)
  const newInvites = await member.guild.invites.fetch();
  const usedInvite = newInvites.find(inv => cachedInvites.get(inv.code) < inv.uses);
  newInvites.each(inv => cachedInvites.set(inv.code, inv.uses));
  client.invites.set(member.guild.id, cachedInvites);

  const res = await bannedTag.findOne({ guildID: conf.GuildID });
  if (!res) return
  
    res.taglar.forEach(async x => {

  if(res.taglar.some(x => member.user.tag.includes(x))) { 
    await member.roles.set(conf.jailRole)
    await member.setNickname("Yasaklı Tag")
    if (conf.Main.dmMessages) member.send({ content:`${member.guild.name} adlı sunucumuza olan erişiminiz engellendi! Sunucumuzda yasaklı olan bir simgeyi (${x}) isminizde taşımanızdan dolayıdır. Sunucuya erişim sağlamak için simgeyi (${x}) isminizden çıkartmanız gerekmektedir.\n\nSimgeyi (${x}) isminizden kaldırmanıza rağmen üstünüzde halen Yasaklı Tag rolü varsa sunucudan gir çık yapabilirsiniz veya sağ tarafta bulunan yetkililer ile iletişim kurabilirsiniz. **-Yönetim**\n\n__Sunucu Tagımız__\n**${conf.tag}**`}).catch(() => {});
}
}) 

if (!usedInvite) {
kayitchannel.wsend({ content:`
Merhabalar ${member} (\`${member.id}\`) Sunucumuza Hoşgeldin 🍃

Hesabın \`${memberGün} ${memberAylar} ${memberTarih}\` Tarihinde (<t:${Math.floor(member.user.createdTimestamp / 1000)}:R>) Oluşturulmuş ${guvenilirlik ? `\`Şüpheli!\`` : `\`Güvenli!\`` }
Seninle Beraber **${üyesayısı}** Kişi Olduk. Tagımızı (\`${conf.tag}\`) alarak bizlere destek olabilirsin. ${tagModedata ? tagModedata.tagMode === true ? `(**Şuan da taglı alımdayız**)`:``:``}

Sunucumuza \`Sunucu Özel Url\` Tarafından <t:${Math.floor(Date.now() / 1000)}:R> Davet Edildin

Kayıt Olmak İçin Soldaki \`V.Confirmed\` Kanallara Katılarak Ve \`"İsim | Yaş"\` Vererek Kayıt Olabilirsin! İyi eğlenceler. ||<@&${conf.teyitciRol}>||
\`\`\`
Kayıt olduktan sonra kuralları okuduğunuzu kabul edeceğiz ve içeride yapılacak cezalandırma işlemlerini bunu göz önünde bulundurarak yapacağız.
\`\`\`
`});
channel.wsend({ content:`${member}, Üyesi Sunucumuza <t:${Math.floor(Date.now() / 1000)}> Tarihinde \`Sunucu Url\` Tarafından Davet Edildi`})
return }
if (!usedInvite) return;
await inviteMemberSchema.findOneAndUpdate({ guildID: member.guild.id, userID: member.user.id }, { $set: { inviter: usedInvite.inviter.id } }, { upsert: true });
if (Date.now() - member.user.createdTimestamp <= 1000 * 60 * 60 * 24 * 7) {
await inviterSchema.findOneAndUpdate({ guildID: member.guild.id, userID: usedInvite.inviter.id }, { $inc: { total: 1, fake: 1 } }, { upsert: true });
const inviterData = await inviterSchema.findOne({ guildID: member.guild.id, userID: usedInvite.inviter.id });
const total = inviterData ? inviterData.total : 0;
kayitchannel.wsend({ content:`${member} isimli üye sunucuya katıldı fakat hesabı (<t:${Math.floor(member.user.createdTimestamp / 1000)}:R>) açıldığı için şüpheli olarak işaretlendi.`});
channel.wsend({ content:`${member}, Üyesi Sunucumuza <t:${Math.floor(Date.now() / 1000)}> Tarihinde ${usedInvite.inviter.tag} Davetiyle Katıldı! (\`${total}\`)`})
member.roles.set(conf.fakeAccRole)
} else {
await inviterSchema.findOneAndUpdate({ guildID: member.guild.id, userID: usedInvite.inviter.id }, { $inc: { total: 1, regular: 1 } }, { upsert: true });
const inviterData = await inviterSchema.findOne({ guildID: member.guild.id, userID: usedInvite.inviter.id });
const total = inviterData ? inviterData.total : 0;
kayitchannel.wsend({ content:`
Merhabalar ${member} (\`${member.id}\`) Sunucumuza Hoşgeldin 🍃

Hesabın \`${memberGün} ${memberAylar} ${memberTarih}\` Tarihinde (<t:${Math.floor(member.user.createdTimestamp / 1000)}:R>) Oluşturulmuş ${guvenilirlik ? `\`Şüpheli!\`` : `\`Güvenli!\`` }
Seninle Beraber **${üyesayısı}** Kişi Olduk. Tagımızı (\`${conf.tag}\`) alarak bizlere destek olabilirsin. ${tagModedata ? tagModedata.tagMode === true ? `(**Şuan da taglı alımdayız**)`:``:``}

Sunucumuza ${usedInvite.inviter} Üyesi Tarafından <t:${Math.floor(Date.now() / 1000)}:R> Davet Edildin

Kayıt Olmak İçin Soldaki \`V.Confirmed\` Kanallara Katılarak Ve \`"İsim | Yaş"\` Vererek Kayıt Olabilirsin! İyi eğlenceler. ||<@&${conf.teyitciRol}>||
\`\`\`
Kayıt olduktan sonra kuralları okuduğunuzu kabul edeceğiz ve içeride yapılacak cezalandırma işlemlerini bunu göz önünde bulundurarak yapacağız.
\`\`\`
`});
channel.wsend({ content:`${member}, Üyesi Sunucumuza <t:${Math.floor(Date.now() / 1000)}> Tarihinde ${usedInvite.inviter.tag} Tarafından Davet Edildi! (\`${total}\`)`})
}
await coin.findOneAndUpdate({ guildID: member.guild.id, userID: usedInvite.inviter.id }, { $inc: { coin: 1 } }, { upsert: true });
const gorevData = await gorev.findOne({ guildID: member.guild.id, userID: usedInvite.inviter.id });
if (gorevData) { await gorev.findOneAndUpdate({ guildID: member.guild.id, userID: usedInvite.inviter.id }, { $inc: { invite: 1 } }, { upsert: true });}
};

module.exports.conf = {
  name: "guildMemberAdd",
};
