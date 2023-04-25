const { Modal, TextInputComponent, showModal } = require('discord-modals')
const {Intents, SelectMenuComponent, Client, Collection, MessageActionRow, MessageButton, MessageAttachment, MessageEmbed, Permissions, Constants, ApplicationCommandPermissionsManager } = require("discord.js");
const { Database } = require("ark.db");
const db = (global.db = new Database("../../configs/database.json"));
const Discord = require('discord.js');
const conf = require("../../configs/sunucuayar.json")
const isimcek = require("../../configs/isimcek.json")
const emojis = require("../../configs/emojis.json")
const ranks = require("../../configs/ranks.json")
const client = global.bot;

module.exports = {
  conf: {
    aliases: ["başvuru","başvurusistem"],
    name: "başvuru",
    help: "başvuru",
    category: "sahip",
    owner: true,
  },
 
    run: async (client, message, args, durum, kanal) => {
		if (!message.member.permissions.has("ADMINISTRATOR")) return message.channel.send({ embeds: [embed.setDescription(`${message.member}, Bu komutu kullanmak için gerekli yetkiye sahip değilsin!`)] });

message.delete()

		const embed = new Discord.MessageEmbed()
.setColor("#2f3136")
.setAuthor({ name: `${message.guild.name}`,iconURL: message.guild.iconURL({ dynamic: true }) })
.setDescription(`
\`\`\`    ឵឵              YETKİLİ BAŞVURU FORMU \`\`\`
Sunucumuzda Yetkili Olmak İçin Başvuru Formunu Doldurmanız Gerekmektedir.

Başvuru Formunu Görmek İçin Lütfen Aşağıdaki Başvur Butonuna Basarak Kolay Bir Şekilde Görebilirsiniz

Sunucu İçi Sorumluluk Başvurusunu Kendine Güvenen Ve İlgi Alanında Bir Sorumluluk İsteyen Kişiler Yapsın Lütfen Troll Vb Şeyde Sunucudan Banlanırsınız

> \`Lütfen Boş Yere Başvuru Yapmayalım (Troll Toxic Ve Küfürlü Kelime Karakterleri Kullanmayalım)\`

`)
      const bavrrreew = new MessageActionRow()
      .addComponents(
      new MessageButton().setCustomId("ytbaşvuruu").setLabel("Yetkili Başvurusu İçin Tıkla").setStyle("SECONDARY"),
     );
      await message.channel.send({embeds: [embed], components: [bavrrreew] });
    }}

  client.on("interactionCreate", async (wsi) => {
      const modal = new Modal()
      .setCustomId('ytbaşvuruform')
      .setTitle('Yetkili Başvurusu Formu')
      .addComponents(
        new TextInputComponent()
        .setCustomId('aktiflikk')
        .setLabel('Ne Kadar Aktifsiniz ?')
        .setStyle('SHORT')
        .setMinLength(5)
        .setMaxLength(50)
        .setPlaceholder('Örn : Günde 10 Saat')
        .setRequired(true),
        new TextInputComponent()
        .setCustomId('ytlikuğpdf')
        .setLabel('Hiç Biryerde Yt Oldunmu Varsa Nereler ?')
        .setStyle('SHORT')
        .setMinLength(4)
        .setMaxLength(100)
        .setPlaceholder('örn : Hesperos Ve Darkparadise')
        .setRequired(true),
        new TextInputComponent()
        .setCustomId('swnelerypbl')
        .setLabel('Sunucumuz İçin Neler Yapabilirsin ?')
        .setStyle('SHORT')
        .setMinLength(10)
        .setMaxLength(400)
        .setPlaceholder('Örn : Günlük Olarak Sunucunuzda Soru Sormak İstiyorum')
        .setRequired(true),
        new TextInputComponent()
        .setCustomId('kayıtprtn')
        .setLabel('Kayıt Ve Partnerlik Hakkında Bilgin Varmı ?')
        .setStyle('SHORT')
        .setMinLength(10)
        .setMaxLength(400)
        .setPlaceholder('Örn : Evet Bilgim Var')
        .setRequired(true),
        new TextInputComponent()
        .setCustomId('hakkındablg')
        .setLabel('Kendiniz hakkında biraz bilgi ?')
        .setStyle('SHORT')
        .setMinLength(5)
        .setMaxLength(100)
        .setPlaceholder('Lütfen buraya yazın. / Örn: Bot Kodlamayı severim.')
        .setRequired(true)
      );
     
    if(wsi.customId === "ytbaşvuruu") {

if(!wsi.member.roles.cache.has(conf.ekipRolu)) return wsi.reply({embeds: [new Discord.MessageEmbed().setColor("#2f3136").setAuthor({ name: wsi.guild.name, iconURL: wsi.guild.iconURL({ dynamic: true }) }).setDescription(`Kullanıcı Adına Sunucu Tagını Almadığın İçin Başvuru Yapamazsın`)], ephemeral: true })
if(wsi.member.roles.cache.has(conf.endüşükytrol)) return wsi.reply({embeds: [new Discord.MessageEmbed().setColor("#2f3136").setAuthor({ name: wsi.guild.name, iconURL: wsi.guild.iconURL({ dynamic: true }) }).setDescription(`Zaten Yetkili Rollerine Sahipsin Tekrardan Başvuru Yapamazsın`)], ephemeral: true })

 wsi.showModal(modal, { client, wsi });

}

    if(wsi.customId === 'ytbaşvuruform') {
      const aktiflik = wsi.fields.getTextInputValue('aktiflikk');  
      const sunucular = wsi.fields.getTextInputValue('ytlikuğpdf');  
      const neyapabilir = wsi.fields.getTextInputValue('swnelerypbl');
      const bilgisivarmı = wsi.fields.getTextInputValue('kayıtprtn');  
      const hakkındablg = wsi.fields.getTextInputValue('hakkındablg'); 
  
      const ytalımysnrrow = new MessageActionRow()
      .addComponents(

  new MessageButton()
  .setCustomId("ytbaşvurukabul")
  .setLabel("Kabul Et")
  .setStyle("SECONDARY"),

  new MessageButton()
  .setCustomId("ytbaşvurured")
  .setLabel("Reddet")
  .setStyle("SECONDARY"),

  );

      if (hakkındablg) {
  let ytalımformcevapbilg = new Discord.MessageEmbed()
.setColor("RANDOM")
  .setDescription(`
  **${wsi.user.tag}** - (\`${wsi.user.id}\`) **Kullanıcısının Sorumluluk Başvurusu Formu**
  
   **Sunucumuzda Ne Kadar Aktif Olabilir**
  \`${aktiflik}\`
  
   **Hangi Sunucularda Yetkili Olmuş**
  \`${sunucular}\`
  
   **Sunucumuz İçin Neler Yapabilir**
  \`${neyapabilir}\`

   **Kayıt Ve Partnerlik Hakkınsa Bilgisi Varmı**
  \`${bilgisivarmı}\`
  
   **Başvuran Hakkında Biraz Bilgi**
  \`${hakkındablg}\`
  
  `)
  .setTimestamp()

        await wsi.reply({ content: `Başvurunuz başarıyla alındı, yetkili arkadaşlar sizinle ilgilenecekler, başvuru formumuzu cevapladığın için teşekkür ederiz..`, ephemeral: true });
        let message = await client.channels.cache.get(conf.başvurulog).send({ content: `<@&${conf.yetkilialımRol}> ${wsi.user.toString()}`,  embeds: [ytalımformcevapbilg], components: [ytalımysnrrow]  })      
             db.set(message.id , wsi.user.id)
 }
    }
      const modal2 = new Modal()
      .setCustomId('ytbaşvurukabul2')
      .setTitle('Onaylama Formu')
      .addComponents(
        new TextInputComponent()
        .setCustomId('başvurukabulneden')
        .setLabel('Kabul Edilme Nedeni')
        .setStyle('SHORT')
        .setMinLength(5)
        .setMaxLength(100)
        .setPlaceholder('Örn : Sorumluluğunu İyi Yapacağını Düşünüyorum')
        .setRequired(true),
      );
     
    if(wsi.customId === "ytbaşvurukabul") {
 if(!wsi.member.roles.cache.has(conf.yetkilialımRol)) return wsi.reply({ content: ":x: Sadece Yetkililer Kabuledebilir.", ephemeral: true })

 wsi.showModal(modal2, { client, wsi });

}

    if(wsi.customId === "ytbaşvurukabul2") {

  await wsi.message.delete().catch(e => {})
      const başvurukabulneden1 = wsi.fields.getTextInputValue('başvurukabulneden');

    let kblkişi = db.get(wsi.message.id)
        let kblkullanıcı = wsi.guild.members.cache.get(kblkişi) 

		const kabullletttikkk = new Discord.MessageEmbed()
.setColor("RANDOM")
.setDescription(`
> <@${kblkişi}> Tebrikler Başvurun ${wsi.user.toString()} Tarafından Kabul Edildi Artık Sende Bir Yetkilisin

Kabul Edilme Nedeni \`${başvurukabulneden1}\`

`);

        await wsi.reply({ content: `Başarıyla Kabul Ettiniz`, ephemeral: true });
await client.channels.cache.get(conf.başvurudurum).send({ content:`<@${kblkişi}>`,embeds: [kabullletttikkk]})
        db.delete(wsi.message.id)


         kblkullanıcı.roles.add(conf.ilkytrolleri)
        kblkullanıcı.send(`Tebrikler Yt Başvuru Talebin Onaylandı`);
        db.delete(wsi.message.id)
  await wsi.message.delete().catch(e => {})


    }
      const modal3 = new Modal()
      .setCustomId('ytbaşvurured2')
      .setTitle('Reddetme Formu')
      .addComponents(
        new TextInputComponent()
        .setCustomId('rednedeni')
        .setLabel('Red Edilme Nedeni')
        .setStyle('SHORT')
        .setMinLength(5)
        .setMaxLength(100)
        .setPlaceholder('Örn : Seni Uygun Göremedik')
        .setRequired(true),
      );
     
    if(wsi.customId === "ytbaşvurured") {
 if(!wsi.member.roles.cache.has(conf.yetkilialımRol)) return wsi.reply({ content: ":x: Sadece Yetkililer Red Edebilir.", ephemeral: true })

 wsi.showModal(modal3, { client, wsi });

}

    if(wsi.customId === "ytbaşvurured2") {

  await wsi.message.delete().catch(e => {})
    const rednedeni1 = wsi.fields.getTextInputValue('rednedeni');

    let redkişi = db.get(wsi.message.id)
		const redetttikkk = new Discord.MessageEmbed()
.setColor("RANDOM")
.setDescription(`
> <@${redkişi}> Malesef Başvurun ${wsi.user.toString()} Tarafından Red Edildi

Red Edilme Nedeni \`${rednedeni1}\`

`);
  await wsi.reply({ content: `Başarıyla Redettiniz`, ephemeral: true });
  await client.channels.cache.get(conf.başvurudurum).send({ content:`<@${redkişi}>`,embeds: [redetttikkk]})
  db.delete(wsi.message.id)
  await wsi.message.delete().catch(e => {})

}
/*
///Sorumluluk Kısmı

      const srmmodal = new Modal()
      .setCustomId('srmbasvuru')
      .setTitle('Sorumluluk Başvurusu Formu')
      .addComponents(
        new TextInputComponent()
        .setCustomId('isimyas')
        .setLabel('İsim ve Yaşınız ?')
        .setStyle('SHORT')
        .setMinLength(5)
        .setMaxLength(20)
        .setPlaceholder('Örn : Mustafa 18')
        .setRequired(true),
        new TextInputComponent()
        .setCustomId('aktiflik')
        .setLabel('Ne Türe Bir Sorumluluk İstiyorsun?')
        .setStyle('SHORT')
        .setMinLength(1)
        .setMaxLength(40)
        .setPlaceholder('örn : Günlük Soru Sorumluluğu')
        .setRequired(true),
        new TextInputComponent()
        .setCustomId('yarar')
        .setLabel('Bu Sorumluluğu Ne İçin İstiyorsun ?')
        .setStyle('SHORT')
        .setMinLength(5)
        .setMaxLength(100)
        .setPlaceholder('Örn : Günlük Olarak Sunucunuzda Soru Sormak İstiyorum')
        .setRequired(true),
        new TextInputComponent()
        .setCustomId('hakkında')
        .setLabel('Kendiniz hakkında biraz bilgi ?')
        .setStyle('SHORT')
        .setMinLength(5)
        .setMaxLength(100)
        .setPlaceholder('Lütfen buraya yazın. / Örn: Bot Kodlamayı severim.')
        .setRequired(true)
      );
     
    if(wsi.customId === "srmluluk") {

const zaman_asimi_map = new Map(); 

const zamanasimi = zaman_asimi_map.get(wsi.user.id) ?? false;
if (zamanasimi) return wsi.reply({ content: "1 dk sonra tekrar dene.", ephmeral: true });
zaman_asimi_map.set(wsi.user.id, true);
setTimeout(() => { zaman_asimi_map.delete(wsi.user.id) },60 * 1000);

 wsi.showModal(srmmodal, { client, wsi });
}

    if(wsi.customId === 'srmbasvuru') {
      const isimyas = wsi.fields.getTextInputValue('isimyas');  
      const aktiflik = wsi.fields.getTextInputValue('aktiflik');  
      const yarar = wsi.fields.getTextInputValue('yarar');  
      const hakkında = wsi.fields.getTextInputValue('hakkında'); 
  
      const yesnorovvv = new MessageActionRow()
      .addComponents(

  new MessageButton()
  .setCustomId("skabuet")
  .setLabel("Kabul Et")
  .setStyle("SECONDARY"),

  new MessageButton()
  .setCustomId("srededd")
  .setLabel("Reddet")
  .setStyle("SECONDARY"),

  );

      if (hakkında) {
  let srmccsdsorucevap = new Discord.MessageEmbed()
  .setDescription(`
  **${wsi.user.tag}** - (\`${wsi.user.id}\`) **Kullanıcısının Sorumluluk Başvurusu Formu**
  
   **Başvuranın İsmi Ve Yaşı**
  \`${isimyas}\`
  
   **Başvuran Ne Tür Sorumluluk İstiyor**
  \`${aktiflik}\`
  
   **Başvuran Bu Sorumluluğu Ne İçin İstiyor**
  \`${yarar}\`
  
   **Başvuran Hakkında Biraz Bilgi**
  \`${hakkında}\`
  
  `)
  .setTimestamp()

        await wsi.reply({ content: `Başvurunuz başarıyla alındı, yetkili arkadaşlar sizinle ilgilenecekler, başvuru formumuzu cevapladığın için teşekkür ederiz..`, ephemeral: true });
        let message = await client.channels.cache.get(conf.başvurulog).send({ content: `<@&${conf.başvurustaff}> ${wsi.user.toString()}`,  embeds: [srmccsdsorucevap], components: [yesnorovvv]  })      
             db.set(message.id , wsi.user.id)
 }
    }

      const srmmodal2 = new Modal()
      .setCustomId('srmkabulettikk')
      .setTitle('Onaylama Formu')
      .addComponents(
        new TextInputComponent()
        .setCustomId('kabuletmek')
        .setLabel('Düşünceni Yaz')
        .setStyle('SHORT')
        .setMinLength(5)
        .setMaxLength(100)
        .setPlaceholder('Örn : Sorumluluğunu İyi Yapacağını Düşünüyorum')
        .setRequired(true),
      );
     
    if(wsi.customId === "skabuet") {
 if(!wsi.member.roles.cache.has(conf.başvurustaff)) return wsi.reply({ content: ":x: Sadece Yetkililer Kabuledebilir.", ephemeral: true })

 wsi.showModal(srmmodal2, { client, wsi });

}

    if(wsi.customId === "srmkabulettikk") {

  await wsi.message.delete().catch(e => {})
      const kabuletmek = wsi.fields.getTextInputValue('kabuletmek');

    let kişi = db.get(wsi.message.id)
 
		const kabullletttikkk = new Discord.MessageEmbed()
.setColor("RANDOM")
.setDescription(`
> <@${kişi}> İstediğiniz Sorumluluğu ${wsi.user.toString()} Vermeyi Kabul Etti

Yetkilinin Verdiği Cevap \`${kabuletmek}\`

`);

        await wsi.reply({ content: `Başarıyla Kabul Ettiniz`, ephemeral: true });
await client.channels.cache.get(conf.başvurudurum).send({ content:`<@${kişi}>`,embeds: [kabullletttikkk]})
        db.delete(wsi.message.id)

  await wsi.message.delete().catch(e => {})


    }
      const srmmodal3 = new Modal()
      .setCustomId('srmreddettikkk')
      .setTitle('Reddetme Formu')
      .addComponents(
        new TextInputComponent()
        .setCustomId('redetmek')
        .setLabel('Düşünceni Yaz')
        .setStyle('SHORT')
        .setMinLength(5)
        .setMaxLength(100)
        .setPlaceholder('Örn : Sorumluluğunu İyi Yapacağını Düşünüyorum')
        .setRequired(true),
      );
     
    if(wsi.customId === "srededd") {
 if(!wsi.member.roles.cache.has(conf.başvurustaff)) return wsi.reply({ content: ":x: Sadece Yetkililer Kabuledebilir.", ephemeral: true })

 wsi.showModal(srmmodal3, { client, wsi });

}

    if(wsi.customId === "srmreddettikkk") {

  await wsi.message.delete().catch(e => {})
    const redetmek = wsi.fields.getTextInputValue('redetmek');

    let kişi = db.get(wsi.message.id)
		const redetttikkk = new Discord.MessageEmbed()
.setColor("RANDOM")
.setDescription(`
> <@${kişi}> İstediğiniz Sorumluluğu ${wsi.user.toString()} Vermeyi Reddetti

Yetkilinin Verdiği Cevap \`${redetmek}\`

`);
  await wsi.reply({ content: `Başarıyla Redettiniz`, ephemeral: true });
  await client.channels.cache.get(conf.başvurudurum).send({ content:`<@${kişi}>`,embeds: [redetttikkk]})
  db.delete(wsi.message.id)
  await wsi.message.delete().catch(e => {})

}*/

 })