const { MessageEmbed } = require("discord.js");
const client = global.bot;
const bannedTag = require("../schemas/bannedTag");
const conf = require("../configs/sunucuayar.json")
const isimcek = require("../configs/isimcek.json")
const emojis = require("../configs/emojis.json")
const regstats = require("../schemas/registerStats");

module.exports = async (oldUser, newUser) => {
    if (oldUser.bot || newUser.bot || (oldUser.username === newUser.username)) return;
    const guild = client.guilds.cache.get(conf.GuildID);
    if (!guild) return;
    const member = guild.members.cache.get(oldUser.id);
    if (!member) return;
    const channel = client.channels.cache.find(x => x.name.includes(isimcek.kanalcek.taglilog));
    const kanal = guild.channels.cache.get(conf.chatChannel)
    if (oldUser.username.includes(conf.tag) && !newUser.username.includes(conf.tag)) {
    let ekip = guild.roles.cache.get(conf.ekipRolu);
    let roles = member.roles.cache.clone().filter(e => e.managed || e.rawPosition < ekip.rawPosition);
    let roles2 = member.roles.cache.clone().filter(e => e.managed || e.rawPosition > ekip.rawPosition);

   const tagModedata = await regstats.findOne({ guildID: conf.GuildID })
    if (tagModedata && tagModedata.tagMode === true) {
   if(!member.roles.cache.has(conf.vipRole) && !member.roles.cache.has(conf.boosterRolu)) return member.roles.set(conf.unregRoles);
  } else if (conf.ekipRolu) {
  if (member.roles.cache.has(ekip)) member.roles.remove(ekip).catch();
  member.roles.set(roles).catch();
  }
  if (member.manageable) member.setNickname(member.displayName.replace(conf.tag, conf.ikinciTag)).catch(console.error);

if (!channel) return;
const embed = new MessageEmbed()
.setAuthor({ name: client.guilds.cache.get(conf.GuildID).name, iconURL: client.guilds.cache.get(conf.GuildID).iconURL({dynamic:true})})
.setThumbnail(member.displayAvatarURL({ dynamic: true, size: 2048 }))
.setColor("RANDOM")
.setDescription(`
${member.toString()} isimli eski taglımız, tagımızı <t:${Math.floor(Date.now() / 1000)}:R> bıraktı.

\` ➥ \` İsim Değişikliği: \` ${oldUser.tag} \` => **${newUser.tag}**
\` ➥ \` Anlık taglı üye: **${guild.members.cache.filter(x => x.user.username.includes(conf.tag)).size}**

**Üstünden çekilen rolleri şunlardır;**
${roles2 ? `${roles2.map(role => `${role}`).join(', ')}` : `<@&${conf.ekipRolu}>`}
`);

channel.wsend({ content: `${member.toString()} [\` ${member.id} \`]`, embeds: [embed]});
} else if (!oldUser.username.includes(conf.tag) && newUser.username.includes(conf.tag)){
member.roles.add(conf.ekipRolu);
if (member.manageable) member.setNickname(member.displayName.replace(conf.ikinciTag, conf.tag)).catch(console.error);
if (!channel) return;
const embed = new MessageEmbed()
.setAuthor({ name: client.guilds.cache.get(conf.GuildID).name, iconURL: client.guilds.cache.get(conf.GuildID).iconURL({dynamic:true})})
.setThumbnail(member.displayAvatarURL({ dynamic: true, size: 2048 }))
.setColor("RANDOM")
.setDescription(`
${member.toString()} isimli üye ailemize katıldı, tagımızı <t:${Math.floor(Date.now() / 1000)}:R> aldı.

\` ➥ \` İsim Değişikliği: \` ${oldUser.tag} \` => **${newUser.tag}**
\` ➥ \` Anlık taglı üye: **${guild.members.cache.filter(x => x.user.username.includes(conf.tag)).size}**
`);
channel.wsend({ content: `${member.toString()} [\` ${member.id} \`]`, embeds: [embed]});
kanal.wsend({ content: `${member.toString()} üyesi ${conf.tag} tagımızı alarak ailemize katıldı! Ailemiz ${guild.members.cache.filter(x => x.user.username.includes(conf.tag)).size} kişi oldu!` }).then((e) => setTimeout(() => { e.delete(); }, 5000));
}
  
    const res = await bannedTag.findOne({ guildID: conf.GuildID });
    if (!res) return
    res.taglar.forEach(async x => {
      
    if (!oldUser.tag.includes(x) && newUser.tag.includes(x)) {
        !member.roles.cache.has(conf.boosterRolu) 
        await member.roles.set(conf.jailRole).catch();
        await member.setNickname('Yasaklı Tag');
       member.send({ content:`${guild.name} adlı sunucumuza olan erişiminiz engellendi! Sunucumuzda yasaklı olan bir simgeyi (${x}) isminizde taşımanızdan dolayıdır. Sunucuya erişim sağlamak için simgeyi (${x}) isminizden çıkartmanız gerekmektedir.\n\nSimgeyi (${x}) isminizden kaldırmanıza rağmen üstünüzde halen Yasaklı Tag rolü varsa sunucudan gir çık yapabilirsiniz veya sağ tarafta bulunan yetkililer ile iletişim kurabilirsiniz. **-Yönetim**\n\n__Sunucu Tagımız__\n**${conf.tag}**`})
      } else
      if (oldUser.tag.includes(x) && !newUser.tag.includes(x)) { 
        !member.roles.cache.has(conf.boosterRolu) 
        await member.roles.set(conf.unregRoles).catch();
        await member.setNickname(`${member.user.username.includes(conf.tag) ? conf.tag : (conf.ikinciTag ? conf.ikinciTag : (conf.tag || ""))} İsim | Yaş`);
      member.send({ content:`${guild.name} adlı sunucumuza olan erişim engeliniz kalktı. İsminizden (${x}) sembolünü kaldırarak sunucumuza erişim hakkı kazandınız. Keyifli Sohbetler**-Yönetim**`})
      }
    })

};

module.exports.conf = {
  name: "userUpdate",
};
