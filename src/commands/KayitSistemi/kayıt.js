const { MessageEmbed, Client, MessageActionRow, MessageButton } = require('discord.js');
const coin = require("../../schemas/coin");
const conf = require("../../configs/sunucuayar.json");
const toplams = require("../../schemas/toplams");
const kayitg = require("../../schemas/kayitgorev");
const { red , green } = require("../../configs/emojis.json")
const isimler = require("../../schemas/names");
const regstats = require("../../schemas/registerStats");
const otokayit = require("../../schemas/otokayit");
const moment = require("moment")
moment.locale("tr")
const client = global.bot;

module.exports = {
  conf: {
    aliases: ["kayit", "kayıt", "kadın", "Kadın", "k", "kadin", "Kadin", "Woman", "kız", "Kız", "erkek", "Erkek", "e", "ERKEK", "Man", "man"],
    name: "kayıt",
    help: "kayıt <@Kişi/ID> <Isim> <Yaş>",
    category: "kayıt",
  },
  
run: async (client, message, args, embed, prefix) => { 

   const regkilitdata = await regstats.findOne({ guildID: message.guild.id })
    if (regkilitdata && regkilitdata.regkilit === true) {
    return message.reply({ embeds: [embed.setDescription(`
Sunucu Kayıt Sistemi Bir Yönetici Tarafından Kapatılmıştır.

Kayıt Sistemi Açılana Kadar Kayıt Yapamazsınız Lütfen Açılana Kadar Bekleyiniz
`)]})
}

    let uye = message.mentions.members.first() || message.guild.members.cache.get(args[0])
    if(!conf.teyitciRolleri.some(oku => message.member.roles.cache.has(oku)) && !conf.sahipRolu.some(oku => message.member.roles.cache.has(oku)) && !message.member.permissions.has('ADMINISTRATOR')) 
    {
    message.react(red)
    message.reply({ content:`Yetkin bulunmamakta dostum.\Yetkili olmak istersen başvurabilirsin.`}).then((e) => setTimeout(() => { e.delete(); }, 5000)); 
    return }
    if(!uye) 
    {
    message.react(red)
    message.reply({ content:`\`${prefix}kayıt <@wasley/ID> <Isim> <Yaş>\``}).then((e) => setTimeout(() => { e.delete(); }, 5000)); 
    return }
    if(message.author.id === uye.id) 
    {
    message.react(red)
    message.reply({ content:`Kendini kayıt edemezsin.`}).then((e) => setTimeout(() => { e.delete(); }, 5000)); 
    return }
    if(!uye.manageable) 
    {
    message.react(red)
    message.reply({ content:`Böyle birisini kayıt edemiyorum.`}).then((e) => setTimeout(() => { e.delete(); }, 5000)); 
    return }
    if(message.member.roles.highest.position <= uye.roles.highest.position) 
    {
    message.react(red)
    message.reply({ content:`Senden yüksekte olan birisini kayıt edemezsin.`}).then((e) => setTimeout(() => { e.delete(); }, 5000)); 
    return }
    const data = await isimler.findOne({ guildID: message.guild.id, userID: uye.user.id });
    args = args.filter(a => a !== "" && a !== " ").splice(1);
    let setName;
    let isim = args.filter(arg => isNaN(arg)).map(arg => arg.charAt(0).replace('i', "İ").toUpperCase()+arg.slice(1)).join(" ");
    let yaş = args.filter(arg => !isNaN(arg))[0] || "";
    if(!isim && !yaş) 
    {
    message.react(red)
    message.reply({ content:`\`${prefix}kayıt <@wasley/ID> <Isim> <Yaş>\``}).then((e) => setTimeout(() => { e.delete(); }, 5000)); 
    return }

   const tagModedata = await regstats.findOne({ guildID: message.guild.id })
    if (tagModedata && tagModedata.tagMode === true) {
    if(!uye.user.username.includes(conf.tag) && !uye.roles.cache.has(conf.vipRole) && !uye.roles.cache.has(conf.boosterRolu)) return message.reply({ embeds: [embed.setDescription(`${uye.toString()} isimli üyenin kullanıcı adında tagımız (\` ${conf.tag} \`) olmadığı, <@&${conf.boosterRolu}>, <@&${conf.vipRole}> Rolü olmadığı için isim değiştirmekden başka kayıt işlemi yapamazsınız.`)] });
    }

    if(!yaş) 
    { setName = `${uye.user.username.includes(conf.tag) ? conf.tag : (conf.ikinciTag ? conf.ikinciTag : (conf.tag || ""))} ${isim}`;
    } else { setName = `${uye.user.username.includes(conf.tag) ? conf.tag : (conf.ikinciTag ? conf.ikinciTag : (conf.tag || ""))} ${isim} | ${yaş}`;
  }

    uye.setNickname(`${setName}`).catch(err => message.reply({ content:`İsim çok uzun.`}))
    const datas = await regstats.findOne({ guildID: message.guild.id, userID: message.member.id });
    const pubCategory = message.guild.channels.cache.filter((x) => x.parentId && x.parentId === conf.publicParents);

    if(conf.erkekRolleri.some(x => uye.roles.cache.has(x)) || conf.kizRolleri.some(y => uye.roles.cache.has(y))) {
    message.react(red)
    message.reply({ content: `Bu üye zaten kayıtlı durumda yanlış kayıt ettiyseniz eğer kayıtsız atarak tekrar kayıt edebilirsiniz.`, ephemeral: true }); 
    return }
    
    const row = new MessageActionRow()
		.addComponents(

    new MessageButton()
    .setCustomId("MAN")
    .setLabel("ERKEK")
    .setStyle("PRIMARY"),

    new MessageButton()
    .setCustomId("WOMAN")
    .setLabel("KADIN")
    .setStyle("PRIMARY"),

    new MessageButton()
    .setCustomId("İPTAL")
    .setLabel("İptal")
    .setStyle("DANGER"),

	);

    let erkekRol = conf.erkekRolleri;
    let kadinRol = conf.kizRolleri;

let wass = new MessageEmbed()
.setColor("RANDOM")
.setDescription(`
${uye.toString()} üyesinin ismi \`"${setName}\`" olarak değiştirildi,

${red} Kişisinin toplamda **${data ? `${data.names.length}` : "0"}** isim kayıtı bulundu
${data ? data.names.splice(0, 3).map((x, i) => `\`${x.name}\` (${x.rol}) (<@${x.yetkili}>)`).join("\n") : "Daha önce kayıt olmamış."}
    `)
.setAuthor({ name: message.guild.name, iconURL: message.guild.iconURL({ dynamic: true }) })
.setFooter({ text: `Lütfen 30 saniye alttaki butonlara basarak kullanıcının cinsiyetini belirleyin.` })

 let msg = await message.channel.send({ embeds: [wass], components : [row] })
 
 var filter = (button) => button.user.id === message.author.id;
 let collector = await msg.createMessageComponentCollector({ filter, time: 30000 })

      collector.on("collect", async (button) => {

if(button.customId === "MAN") {
 
 let manss = new MessageEmbed()
  .setColor("BLACK")
  .setAuthor({ name: message.author.tag, iconURL:  message.author.avatarURL({ dynamic: true  })})
  .setDescription(`
  ${uye.toString()} Kişisinin İsmi \`${setName}\` Olarak Değiştirildi 
  
  **ERKEK** Olarak Kayıt Edildi!
  `)
  const erk = new MessageActionRow()
  .addComponents(

  new MessageButton()
  .setCustomId("MAN")
  .setLabel("ERKEK")
  .setStyle("SECONDARY")
  .setDisabled(true),
  

  new MessageButton()
  .setCustomId("WOMAN")
  .setLabel("KADIN")
  .setStyle("PRIMARY")
  .setDisabled(true),

);

  button.update({ embeds: [manss], components: [erk]});

    await uye.roles.add(conf.erkekRolleri)
    await uye.roles.remove(conf.unregRoles)
    await coin.findOneAndUpdate({ guildID: uye.guild.id, userID: message.author.id }, { $inc: { coin: conf.Main.toplamsCoin } }, { upsert: true });
    await toplams.findOneAndUpdate({ guildID: message.guild.id, userID: message.author.id }, { $push: { toplams: uye.user.id } }, { upsert: true });
    await regstats.findOneAndUpdate({ guildID: message.guild.id, userID: message.author.id }, { $inc: { top: 1, topGuild24: 1, topGuild7: 1, top24: 1, top7: 1, top14: 1, erkek: 1, erkek24: 1, erkek7: 1, erkek14: 1, }, }, { upsert: true });
    await isimler.findOneAndUpdate({ guildID: message.guild.id, userID: uye.user.id }, { $push: { names: { name: uye.displayName, yetkili: message.author.id, rol: conf.erkekRolleri.map(x => `<@&${x}>`).join(" , "), date: Date.now() } } }, { upsert: true });
    const kayitgData = await kayitg.findOne({ guildID: message.guild.id, userID: message.author.id });
    if (kayitgData)
    {
    await kayitg.findOneAndUpdate({ guildID: message.guild.id, userID: message.author.id }, { $inc: { kayit: 1 } }, { upsert: true });
    }

    if(conf.chatChannel && client.channels.cache.has(conf.chatChannel)) client.channels.cache.get(conf.chatChannel).send({ content:`Aramıza **${uye}** yakışıklısı katıldı onu Merhaba ile karşılayın.`}).then((e) => setTimeout(() => { e.delete(); }, 15000));

         await otokayit.updateOne({
          userID: uye.user.id
           }, {
           $set: {
                  userID: uye.user.id,
                  roleID: erkekRol,
                  name: isim,
                  age: yaş
                }
             }, {
                 upsert: true
              }).exec();

   if (uye && uye.voice && uye.voice.channel && conf.registerParents.includes(uye.voice.channel.parentId)) {
    setTimeout(() => {
     uye.voice.setChannel(pubCategory.random());
     uye.send({ content: `Sevgili ${uye.toString()} başarıyla kayıtınız tamamlandığı için teyit kanallarından **Public Ses Odamıza** tarafımca çekildiniz. - *İyi Sohbetler :D* \` ${message.guild.name} \` `}).catch(() => {});
    }, 10000);
  }

}

if(button.customId === "WOMAN") {

let wmnss = new MessageEmbed()
.setColor("BLACK")
.setAuthor({ name: message.author.tag, iconURL:  message.author.avatarURL({ dynamic: true  })})
.setDescription(`
${uye.toString()} Kişisinin ismi \`${setName}\` Olarak Değiştirildi

**KADIN** Olarak Kayıt Edildi
`)
const kzk = new MessageActionRow()
  .addComponents(

  new MessageButton()
  .setCustomId("MAN")
  .setLabel("ERKEK")
  .setStyle("PRIMARY")
  .setDisabled(true),
  

  new MessageButton()
  .setCustomId("WOMAN")
  .setLabel("KADIN")
  .setStyle("SECONDARY")
  .setDisabled(true),

);
button.update({ embeds: [wmnss], components: [kzk]});

    await uye.roles.add(conf.kizRolleri)
    await uye.roles.remove(conf.unregRoles)
    await coin.findOneAndUpdate({ guildID: uye.guild.id, userID: message.author.id }, { $inc: { coin: conf.Main.toplamsCoin } }, { upsert: true });
    await toplams.findOneAndUpdate({ guildID: message.guild.id, userID: message.author.id }, { $push: { toplams: uye.user.id } }, { upsert: true });
    await regstats.findOneAndUpdate({ guildID: message.guild.id, userID: message.author.id }, { $inc: { top: 1, topGuild24: 1, topGuild7: 1, top24: 1, top7: 1, top14: 1, kız: 1, kız24: 1, kız7: 1, kız14: 1, }, }, { upsert: true });
    await isimler.findOneAndUpdate({ guildID: message.guild.id, userID: uye.user.id }, { $push: { names: { name: uye.displayName, yetkili: message.author.id,  rol: conf.kizRolleri.map(x => `<@&${x}>`).join(" , "), date: Date.now() } } }, { upsert: true });
    const kayitgData = await kayitg.findOne({ guildID: message.guild.id, userID: message.author.id });
    if (kayitgData)
    {
    await kayitg.findOneAndUpdate({ guildID: message.guild.id, userID: message.author.id }, { $inc: { kayit: 1 } }, { upsert: true });
    }

    if(conf.chatChannel && client.channels.cache.has(conf.chatChannel)) client.channels.cache.get(conf.chatChannel).send({ content:`Aramıza **${uye}** güzelliği katıldı onu Merhaba ile karşılayın.`}).then((e) => setTimeout(() => { e.delete(); }, 15000));

         await otokayit.updateOne({
          userID: uye.user.id
           }, {
           $set: {
                  userID: uye.user.id,
                  roleID: kadinRol,
                  name: isim,
                  age: yaş
                }
             }, {
                 upsert: true
              }).exec();

    if (uye && uye.voice && uye.voice.channel && conf.registerParents.includes(uye.voice.channel.parentId)) {
      setTimeout(() => {
        uye.voice.setChannel(pubCategory.random());
        uye.send({ content: `Sevgili ${uye.toString()} başarıyla kayıtınız tamamlandığı için teyit kanallarından **Public Ses Odamıza** tarafımca çekildiniz. - *İyi Sohbetler :D* \` ${message.guild.name} \` `}).catch(() => {});
       }, 10000);
      }
}

if(button.customId === "İPTAL") {
if(msg) msg.delete();
button.reply({ content:`İşlem Başarıyla İptal Edildi`, embeds: [], components: [], ephemeral: true});
uye.setNickname(`${conf.ikinciTag} İsim | Yaş`)
await uye.roles.add(conf.unregRoles)
await uye.roles.remove(conf.kizRolleri)
await uye.roles.remove(conf.erkekRolleri)
}

   });
}   
}
