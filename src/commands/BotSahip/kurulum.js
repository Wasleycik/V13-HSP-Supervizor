const { Database } = require("ark.db");
const Discord = require('discord.js');
const db = new Database("/src/configs/emojis.json");
const { Modal, TextInputComponent, showModal } = require('discord-modals')
const {Intents, SelectMenuComponent, Client, Collection, MessageActionRow, MessageButton, MessageAttachment, MessageEmbed, Permissions, Constants, ApplicationCommandPermissionsManager } = require("discord.js");
const conf = require("../../configs/sunucuayar.json")
const isimcek = require("../../configs/isimcek.json")
const emojis = require("../../configs/emojis.json")
const ranks = require("../../configs/ranks.json")

module.exports = {
  conf: {
    aliases: [],
    name: "kurulum",
    help: "kurulum",
    category: "sahip",
    owner: true,
  },

  run: async (client, message, args) => {

    if (message.guild === null) {
      return message.reply({ content: `Bu komutu sadece Sunucuda kullanabilirsin!`, ephemeral: true })
    } else if (!conf.owners.includes(message.author.id)) {
      return message.reply({ content: ":x: Bot developerı olmadığın için kurulumu yapamazsın.", ephemeral: true })
    } else {

		const kurulumembed = new Discord.MessageEmbed()
.setColor("#2f3136")
.setAuthor({ name: `${message.guild.name}`,iconURL: message.guild.iconURL({ dynamic: true }) })
.setDescription(`
Lütfen Yapmak İstediğiniz Kurulumu Aşağıdaki Butonlara Tıklayarak Cevaplayınız

60 Saniye İçerisinde Menü Otomatik Kapanmaktadır
`)

  const row = new MessageActionRow()
  .addComponents(
  new MessageButton()
  .setCustomId("rol")
  .setLabel("Menü Rol Kurulum")
  .setStyle("PRIMARY"),

  new MessageButton()
  .setCustomId("kanalkurulum")
  .setLabel("Kanal Kurulum")
  .setStyle("SUCCESS"),

  new MessageButton()
  .setCustomId("emoji")
  .setLabel("Emoji Kurulum")
  .setStyle("DANGER"),
  );

      let msg = await message.channel.send({ embeds: [kurulumembed], components: [row]})

      var filter = (button) => button.user.id === message.author.id;
      const collector = msg.createMessageComponentCollector({ filter, componentType: 'BUTTON', max: 3, time: 60000 })


      collector.on("collect", async interaction => {

        if (interaction.customId === "kanalkurulum") {
          await interaction.deferUpdate();

		const kanalkurulumembed = new Discord.MessageEmbed()
.setColor("#2f3136")
.setDescription(`
\`\`\`    ឵឵              KURULACAK KANALLARIN LİSTESİ \`\`\`
Aşağıda Listede Kurulacak Kanallar Ve İsimleri Listelenmektedir.

\`1\` **Level Log :** \`(${isimcek.kanalcek.levelbilgi})\` - \`7\` **Mesaj Log :** \`(${isimcek.kanalcek.messagelog})\`
\`2\` **Leaderboard :** \`(${isimcek.kanalcek.leaderboard})\` - \`8\` **Rank Log :** \`(${isimcek.kanalcek.ranklog})\`
\`3\` **Komut Log :** \`(${isimcek.kanalcek.komutlog})\` - \`9\` **İsim Log :** \`(${isimcek.kanalcek.namelog})\`
\`4\` **Taglı Log :** \`(${isimcek.kanalcek.taglilog})\` - \`10\` **Market Log :** \`(${isimcek.kanalcek.marketlog})\`
\`5\` **Rol Log :** \`(${isimcek.kanalcek.rollog})\` - \`11\` **Yetki Log :** \`(${isimcek.kanalcek.yetkilog})\`
\`6\` **Ses Log :** \`(${isimcek.kanalcek.voicelog})\`

Yukarıda Belirtmiş Olduğum Kanalları Kurmama İstiyorsanız Lütfen Aşağıdaki Butonları Kullanınız

`)

  const kanalkurulumrow = new MessageActionRow()
  .addComponents(
  new MessageButton()
  .setCustomId("kanal")
  .setLabel("ONAYLA")
  .setStyle("PRIMARY"),

  new MessageButton()
  .setCustomId("iptal")
  .setLabel("KAPAT")
  .setStyle("DANGER"),
  );

msg.edit({embeds: [kanalkurulumembed], components: [kanalkurulumrow]})

        }

        if (interaction.customId === "kanal") {
          await interaction.deferUpdate();

		const kurulduembed = new Discord.MessageEmbed()
.setColor("#2f3136")
.setAuthor({ name: `${message.guild.name}`,iconURL: message.guild.iconURL({ dynamic: true }) })
.setDescription(`
Log Kanalları Başarılı Bir Şekilde Kurulmuştur
`)

          const parent = await interaction.guild.channels.create(isimcek.kanalcek.logkatagori, {
            type: 'GUILD_CATEGORY',
            permissionOverwrites: [{
              id: interaction.guild.id,
              deny: ['VIEW_CHANNEL'],
            }]
          });
          await interaction.guild.channels.create(isimcek.kanalcek.levelbilgi, {
            type: 'GUILD_TEXT',
            parent: parent.id,
            permissionOverwrites: [{
            id: interaction.guild.id,
            allow: ['VIEW_CHANNEL'],
            deny: ['SEND_MESSAGES'],
          }]
          });
          await interaction.guild.channels.create(isimcek.kanalcek.messagelog, {
            type: 'GUILD_TEXT',
            parent: parent.id
          });
          await interaction.guild.channels.create(isimcek.kanalcek.voicelog, {
            type: 'GUILD_TEXT',
            parent: parent.id
          });
          await interaction.guild.channels.create(isimcek.kanalcek.taglilog, {
            type: 'GUILD_TEXT',
            parent: parent.id
          });
          await interaction.guild.channels.create(isimcek.kanalcek.namelog, {
            type: 'GUILD_TEXT',
            parent: parent.id
          });
          await interaction.guild.channels.create(isimcek.kanalcek.ranklog, {
            type: 'GUILD_TEXT',
            parent: parent.id

          });
          await interaction.guild.channels.create(isimcek.kanalcek.marketlog, {
            type: 'GUILD_TEXT',
            parent: parent.id
          });
          await interaction.guild.channels.create(isimcek.kanalcek.rollog, {
            type: 'GUILD_TEXT',
            parent: parent.id
          });
          await interaction.guild.channels.create(isimcek.kanalcek.yetkilog, {
            type: 'GUILD_TEXT',
            parent: parent.id
          });
          await interaction.guild.channels.create(isimcek.kanalcek.komutlog, {
            type: 'GUILD_TEXT',
            parent: parent.id
          });
          await interaction.guild.channels.create(isimcek.kanalcek.verilog, {
            type: 'GUILD_TEXT',
            parent: parent.id
          });
          await interaction.guild.channels.create(isimcek.kanalcek.dmlog, {
            type: 'GUILD_TEXT',
            parent: parent.id
          });
          await interaction.guild.channels.create(isimcek.kanalcek.hatalog, {
            type: 'GUILD_TEXT',
            parent: parent.id
          });

          msg.edit({ embeds: [kurulduembed], components: []}).then((e) => setTimeout(() => { e.delete(); }, 10000));

        }

        if (interaction.customId === "rol") {
          await interaction.deferUpdate();

		const rolkembed = new Discord.MessageEmbed()
.setColor("#2f3136")
.setAuthor({ name: `${message.guild.name}`,iconURL: message.guild.iconURL({ dynamic: true }) })
.setDescription(`
Menü için gerekli Rollerin kurulumu başarıyla tamamlanmıştır.\n**Not:** Renk rollerini booster ve taglı rollerinin üstüne taşıyınız.
`)


         await interaction.guild.roles.create({
            name: isimcek.rolcek.etkinlikayraç,
            color: "#000000",
            permissions: "0",
            reason: "Etkinlik Ayraç Başarıyla Kuruldu."
          });
  
          await interaction.guild.roles.create({
            name: isimcek.rolcek.çekilişk,
            color: "#f89292",
            permissions: "0",
            reason: "Rol Seçim Menüsü için Lazımki kurduk sanane aq."
          });

          await interaction.guild.roles.create({
            name: isimcek.rolcek.etkinlikk,
            color: "#f89292",
            permissions: "0",
            reason: "Rol Seçim Menüsü için Lazımki kurduk sanane aq."
          });

          await interaction.guild.roles.create({
            name: isimcek.rolcek.ilişkiayraç,
            color: "#000000",
            permissions: "0",
            reason: "İlişki Ayraç Başarıyla Kuruldu."
          });

          await interaction.guild.roles.create({
            name: isimcek.rolcek.sevgilimvar,
            color: "#e73084",
            permissions: "0",
            reason: "Rol Seçim Menüsü için Lazımki kurduk sanane aq."
          });

          await interaction.guild.roles.create({
            name: isimcek.rolcek.sevgilimyok,
            color: "#b0d0f7",
            permissions: "0",
            reason: "Rol Seçim Menüsü için Lazımki kurduk sanane aq."
          });

          await interaction.guild.roles.create({
            name: isimcek.rolcek.nomanit,
            color: "#eeebeb",
            permissions: "0",
            reason: "Rol Seçim Menüsü için Lazımki kurduk sanane aq."
          });

          await interaction.guild.roles.create({
            name: isimcek.rolcek.lgbt,
            color: "#ff00bc",
            permissions: "0",
            reason: "Rol Seçim Menüsü için Lazımki kurduk sanane aq."
          });

          await interaction.guild.roles.create({
            name: isimcek.rolcek.takımayraç,
            color: "#000000",
            permissions: "0",
            reason: "Takım Ayraç Başarıyla Kuruldu."
          });

          await interaction.guild.roles.create({
            name: isimcek.rolcek.galatasaray,
            color: "#ff0000",
            permissions: "0",
            reason: "Rol Seçim Menüsü için Lazımki kurduk sanane aq."
          });

          await interaction.guild.roles.create({
            name: isimcek.rolcek.fenerbahçe,
            color: "#ffe700",
            permissions: "0",
            reason: "Rol Seçim Menüsü için Lazımki kurduk sanane aq."
          });


          await interaction.guild.roles.create({
            name: isimcek.rolcek.beşiktaş,
            color: "#0c0101",
            permissions: "0",
            reason: "Rol Seçim Menüsü için Lazımki kurduk sanane aq."
          });

          await interaction.guild.roles.create({
            name: isimcek.rolcek.trabzonspor,
            color: "#805a5a",
            permissions: "0",
            reason: "Rol Seçim Menüsü için Lazımki kurduk sanane aq."
          });

         await interaction.guild.roles.create({
            name: isimcek.rolcek.renkayraç,
            color: "#000000",
            permissions: "0",
            reason: "Renk Ayraç Başarıyla Kuruldu."
          });

          await interaction.guild.roles.create({
            name: isimcek.rolcek.pembe,
            color: "#d22988",
            permissions: "0",
            reason: "Rol Seçim Menüsü için Lazımki kurduk sanane aq."
          });

          await interaction.guild.roles.create({
            name: isimcek.rolcek.mor,
            color: "#8330ff",
            permissions: "0",
            reason: "Rol Seçim Menüsü için Lazımki kurduk sanane aq."
          });

          await interaction.guild.roles.create({
            name: isimcek.rolcek.sarı,
            color: "#ffff00",
            permissions: "0",
            reason: "Rol Seçim Menüsü için Lazımki kurduk sanane aq."
          });

          await interaction.guild.roles.create({
            name: isimcek.rolcek.beyaz,
            color: "#f7f7f7",
            permissions: "0",
            reason: "Rol Seçim Menüsü için Lazımki kurduk sanane aq."
          });

          await interaction.guild.roles.create({
            name: isimcek.rolcek.turuncu,
            color: "#ff6100",
            permissions: "0",
            reason: "Rol Seçim Menüsü için Lazımki kurduk sanane aq."
          });


          await interaction.guild.roles.create({
            name: isimcek.rolcek.yeşil,
            color: "#4de07f",
            permissions: "0",
            reason: "Rol Seçim Menüsü için Lazımki kurduk sanane aq."
          });

          await interaction.guild.roles.create({
            name: isimcek.rolcek.kırmızı,
            color: "#ff0000",
            permissions: "0",
            reason: "Rol Seçim Menüsü için Lazımki kurduk sanane aq."
          });


         await interaction.guild.roles.create({
            name: isimcek.rolcek.burçayraç,
            color: "#000000",
            permissions: "0",
            reason: "Burç Ayraç Başarıyla Kuruldu."
          });

          await interaction.guild.roles.create({
            name: isimcek.rolcek.koç,
            color: "#0a0909",
            permissions: "0",
            reason: "Rol Seçim Menüsü için Lazımki kurduk sanane aq."
          });

          await interaction.guild.roles.create({
            name: isimcek.rolcek.boğa,
            color: "#0a0909",
            permissions: "0",
            reason: "Rol Seçim Menüsü için Lazımki kurduk sanane aq."
          });

          await interaction.guild.roles.create({
            name: isimcek.rolcek.ikizler,
            color: "#0a0909",
            permissions: "0",
            reason: "Rol Seçim Menüsü için Lazımki kurduk sanane aq."
          });

          await interaction.guild.roles.create({
            name: isimcek.rolcek.yengeç,
            color: "#0a0909",
            permissions: "0",
            reason: "Rol Seçim Menüsü için Lazımki kurduk sanane aq."
          });

          await interaction.guild.roles.create({
            name: isimcek.rolcek.aslan,
            color: "#0a0909",
            permissions: "0",
            reason: "Rol Seçim Menüsü için Lazımki kurduk sanane aq."
          });

          await interaction.guild.roles.create({
            name: isimcek.rolcek.başak,
            color: "#0a0909",
            permissions: "0",
            reason: "Rol Seçim Menüsü için Lazımki kurduk sanane aq."
          });

          await interaction.guild.roles.create({
            name: isimcek.rolcek.terazi,
            color: "#0a0909",
            permissions: "0",
            reason: "Rol Seçim Menüsü için Lazımki kurduk sanane aq."
          });

          await interaction.guild.roles.create({
            name: isimcek.rolcek.akrep,
            color: "#0a0909",
            permissions: "0",
            reason: "Rol Seçim Menüsü için Lazımki kurduk sanane aq."
          });

          await interaction.guild.roles.create({
            name: isimcek.rolcek.yay,
            color: "#0a0909",
            permissions: "0",
            reason: "Rol Seçim Menüsü için Lazımki kurduk sanane aq."
          });

          await interaction.guild.roles.create({
            name: isimcek.rolcek.oğlak,
            color: "#0a0909",
            permissions: "0",
            reason: "Rol Seçim Menüsü için Lazımki kurduk sanane aq."
          });

          await interaction.guild.roles.create({
            name: isimcek.rolcek.kova,
            color: "#0a0909",
            permissions: "0",
            reason: "Rol Seçim Menüsü için Lazımki kurduk sanane aq."
          });

          await interaction.guild.roles.create({
            name: isimcek.rolcek.balık,
            color: "#0a0909",
            permissions: "0",
            reason: "Rol Seçim Menüsü için Lazımki kurduk sanane aq."
          });

         await interaction.guild.roles.create({
            name: isimcek.rolcek.oyunayraç,
            color: "#000000",
            permissions: "0",
            reason: "Oyun Ayraç Başarıyla Kuruldu."
          });

          await interaction.guild.roles.create({
            name: isimcek.rolcek.graticio,
            color: "#0a0909",
            permissions: "0",
            reason: "Rol Seçim Menüsü için Lazımki kurduk sanane aq."
          });

          await interaction.guild.roles.create({
            name: isimcek.rolcek.vampirk,
            color: "#0a0909",
            permissions: "0",
            reason: "Rol Seçim Menüsü için Lazımki kurduk sanane aq."
          });

          await interaction.guild.roles.create({
            name: isimcek.rolcek.doğrulukc,
            color: "#0a0909",
            permissions: "0",
            reason: "Rol Seçim Menüsü için Lazımki kurduk sanane aq."
          });

          await interaction.guild.roles.create({
            name: isimcek.rolcek.amongus,
            color: "#0a0909",
            permissions: "0",
            reason: "Rol Seçim Menüsü için Lazımki kurduk sanane aq."
          });

          await interaction.guild.roles.create({
            name: isimcek.rolcek.csgo,
            color: "#0a0909",
            permissions: "0",
            reason: "Rol Seçim Menüsü için Lazımki kurduk sanane aq."
          });

          await interaction.guild.roles.create({
            name: isimcek.rolcek.minecraft,
            color: "#0a0909",
            permissions: "0",
            reason: "Rol Seçim Menüsü için Lazımki kurduk sanane aq."
          });

          await interaction.guild.roles.create({
            name: isimcek.rolcek.valorant,
            color: "#0a0909",
            permissions: "0",
            reason: "Rol Seçim Menüsü için Lazımki kurduk sanane aq."
          });

          await interaction.guild.roles.create({
            name: isimcek.rolcek.gta5,
            color: "#0a0909",
            permissions: "0",
            reason: "Rol Seçim Menüsü için Lazımki kurduk sanane aq."
          });

          await interaction.guild.roles.create({
            name: isimcek.rolcek.lol,
            color: "#0a0909",
            permissions: "0",
            reason: "Rol Seçim Menüsü için Lazımki kurduk sanane aq."
          });

          await interaction.guild.roles.create({
            name: isimcek.rolcek.fortnite,
            color: "#0a0909",
            permissions: "0",
            reason: "Rol Seçim Menüsü için Lazımki kurduk sanane aq."
          });

          await interaction.guild.roles.create({
            name: isimcek.rolcek.mlbb,
            color: "#0a0909",
            permissions: "0",
            reason: "Rol Seçim Menüsü için Lazımki kurduk sanane aq."
          });

          await interaction.guild.roles.create({
            name: isimcek.rolcek.pubg,
            color: "#0a0909",
            permissions: "0",
            reason: "Rol Seçim Menüsü için Lazımki kurduk sanane aq."
          });

         await interaction.guild.roles.create({
            name: "▬▬▬▬▬▬▬▬▬",
            color: "#000000",
            permissions: "0",
            reason: "Bitiş Ayraç Başarıyla Kuruldu."
          });

          msg.edit({ embeds: [rolkembed], components: []}).then((e) => setTimeout(() => { e.delete(); }, 10000));

        }



        if (interaction.customId === "emoji") {
          await interaction.deferUpdate();

          const emojis = [
              { name: "star", url: "https://cdn.discordapp.com/emojis/899680497427431424.gif?size=44" },
              { name: "rewards", url: "https://cdn.discordapp.com/emojis/899680521951514734.gif?size=44" },
              { name: "revusome", url: "https://cdn.discordapp.com/emojis/901441419363889172.png?size=96" },
              { name: "miniicon", url: "https://cdn.discordapp.com/emojis/899339236724068372.png?size=44" },
              { name: "red", url: "https://cdn.discordapp.com/attachments/827439712834158622/827439875170500629/red.gif" },
              { name: "green", url: "https://cdn.discordapp.com/attachments/827439712834158622/827439878664486913/green.gif" },
              { name: "staff", url: "https://cdn.discordapp.com/emojis/899680505119780895.gif?size=44" },
              { name: "Muhabbet", url: "https://cdn.discordapp.com/emojis/899339317896429641.gif?size=44" },
              { name: "galp", url: "https://cdn.discordapp.com/emojis/899680513806184570.gif?size=44" },
              { name: "kirmiziok", url: "https://cdn.discordapp.com/emojis/901441275381817426.gif?size=44" },
              { name: "Revuu", url: "https://cdn.discordapp.com/emojis/901441322152493066.gif?size=44" },
              { name: "Mute", url: "https://cdn.discordapp.com/emojis/901441287469809706.png?size=44" },
              { name: "Cezaa", url: "https://cdn.discordapp.com/emojis/901441311050178591.png?size=44" },
              { name: "Jail", url: "https://cdn.discordapp.com/emojis/903566151727087686.png?size=96" },
              { name: "Book", url: "https://cdn.discordapp.com/emojis/903564842978402304.png?size=96" },
              { name: "Kilit", url: "https://cdn.discordapp.com/emojis/903564832387760128.png?size=96" },
              { name: "Mute2", url: "https://cdn.discordapp.com/emojis/899339342986739802.png?size=96" },
              { name: "Unmute", url: "https://cdn.discordapp.com/emojis/899339351283105812.png?size=96" },
              { name: "fill", url: "https://cdn.discordapp.com/emojis/899339288636956752.gif?size=44" },
              { name: "empty", url: "https://cdn.discordapp.com/emojis/899340041229307966.png?size=44" },
              { name: "fillStart", url: "https://cdn.discordapp.com/emojis/899339278000222249.gif?size=44" },
              { name: "emptyEnd", url: "https://cdn.discordapp.com/emojis/899340050226118737.png?size=44" },
              { name: "fillEnd", url: "https://cdn.discordapp.com/emojis/862062197776580618.gif?size=96" },
              { name: "xp", url: "https://cdn.discordapp.com/emojis/838468875825446922.gif?v=1" },
              { name: "gulucuk", url: "https://cdn.discordapp.com/emojis/838469248602865735.png?v=1" },
              { name: "mesaj2", url: "https://cdn.discordapp.com/emojis/838468915814334464.gif?v=1" },
              { name: "altin", url: "https://cdn.discordapp.com/emojis/836694825243508756.gif?v=1" },
              { name: "altin2", url: "https://cdn.discordapp.com/emojis/836694821128372224.gif?v=1" },
              { name: "voice", url: "https://cdn.discordapp.com/emojis/841076020399308831.png?v=1" },
              { name: "channel", url: "https://cdn.discordapp.com/emojis/841076020399308831.png?v=1" },
              { name: "ozispotify", url: "https://cdn.discordapp.com/emojis/899337292840312912.png?size=44" },
              { name: "ozinetflix", url: "https://cdn.discordapp.com/emojis/941993358518284298.webp?size=96&quality=lossless" },
              { name: "oziexxen", url: "https://cdn.discordapp.com/emojis/900396713116835900.png?size=44" },
              { name: "oziblutv", url: "https://cdn.discordapp.com/emojis/900396707362246666.png?size=44" },
              { name: "ozinitro", url: "https://cdn.discordapp.com/emojis/941993742934614047.webp?size=96&quality=lossless" },
              { name: "oziyoutube", url: "https://cdn.discordapp.com/emojis/941993963013935115.gif?size=96&quality=lossless" },
              { name: "slotgif", url: "https://cdn.discordapp.com/emojis/931686726567612426.gif?v=1" },
              { name: "slotpatlican", url: "https://cdn.discordapp.com/emojis/931686717902192660.png?size=44" },
              { name: "slotkiraz", url: "https://cdn.discordapp.com/emojis/931686708037185546.png?size=44" },
              { name: "slotkalp", url: "https://cdn.discordapp.com/emojis/931686698138603610.png?size=44" },
              { name: "partner", url: "https://cdn.discordapp.com/emojis/923691826374934618.webp?size=96&quality=lossless" },
              { name: "online", url: "https://cdn.discordapp.com/emojis/901829756603998269.webp?size=96&quality=lossless" },
              { name: "duyuru", url: "https://cdn.discordapp.com/emojis/935136070377553930.webp?size=96&quality=lossless" },
              { name: "cizgi", url: "https://cdn.discordapp.com/emojis/916013869816745994.gif?size=96" }
          ]
          const SayıEmojis = [
              { name: "sifir", url: "https://cdn.discordapp.com/emojis/943146617043828788.gif?size=96&quality=lossless" },
              { name: "bir", url: "https://cdn.discordapp.com/emojis/943147988375715861.gif?size=96&quality=lossless" },
              { name: "iki", url: "https://cdn.discordapp.com/emojis/943148029639278622.gif?size=96&quality=lossless" },
              { name: "uc", url: "https://cdn.discordapp.com/emojis/943148080025460766.gif?size=96&quality=lossless" },
              { name: "dort", url: "https://cdn.discordapp.com/emojis/943148147327262751.gif?size=96&quality=lossless" },
              { name: "bes", url: "https://cdn.discordapp.com/emojis/943148227753033809.gif?size=96&quality=lossless" },
              { name: "alti", url: "https://cdn.discordapp.com/emojis/943148271738707988.gif?size=96&quality=lossless" },
              { name: "yedi", url: "https://cdn.discordapp.com/emojis/943148318165442700.gif?size=96&quality=lossless" },
              { name: "sekiz", url: "https://cdn.discordapp.com/emojis/943148360368537620.gif?size=96&quality=lossless" },
              { name: "dokuz", url: "https://cdn.discordapp.com/emojis/943148402655510620.gif?size=96&quality=lossless" }
            ]
          emojis.forEach(async (x) => {
              if (interaction.guild.emojis.cache.find((e) => x.name === e.name)) return db.set(x.name, interaction.guild.emojis.cache.find((e) => x.name === e.name).toString());
              const emoji = await interaction.guild.emojis.create(x.url, x.name);
              await db.set(x.name, emoji.toString()); 
              message.channel.send({ content: `\`${x.name}\` isimli emoji oluşturuldu! (${emoji.toString()})`, ephemeral: true })

            })

            SayıEmojis.forEach(async (x) => {
              if (interaction.guild.emojis.cache.find((e) => x.name === e.name)) return db.set(x.name, interaction.guild.emojis.cache.find((e) => x.name === e.name).toString());
              const emoji = await interaction.guild.emojis.create(x.url, x.name);
              await db.set(x.name, emoji.toString()); 
              message.channel.send({ content: `\`${x.name}\` isimli sayı emojisi oluşturuldu! (${emoji.toString()})`, ephemeral: true })

            })
        }

if(interaction.customId === "iptal") {
await interaction.deferUpdate();
if(msg) msg.delete();
interaction.followUp({ content: `Kurulum Sistemi Başarıyla İptal Edildi Ve Kapatıldı.`, ephemeral: true });
}
  
      })

    }
  },
};