const { MessageEmbed, MessageActionRow, MessageSelectMenu, MessageButton } = require("discord.js");
const { Database } = require("ark.db");
const setupdb = new Database("/src/configs/sunucuayar.json");
const conf = require("../../configs/sunucuayar.json")
const isimcek = require("../../configs/isimcek.json")
const emojis = require("../../configs/emojis.json")

module.exports = {
  conf: {
    aliases: ["kur","setup"],
    name: "setup",
    help: "setup",
    category: "sahip",
    owner: true,
  },

  run: async (client, message, args) => {

    let choose = args[0]

const row = new MessageActionRow()
.addComponents(
new MessageSelectMenu()
.setCustomId('select')
.setPlaceholder('Bot Kurulum bilgilendirme için tıklayınız')
.addOptions([
  { label: 'Bot Kurulum Bilgilendirme', description: 'Bot kurulum komutları hakkında bilgi almanızı sağlar.', value: 'help' },
  { label: 'Bot Kurulum Liste', description: 'Bot kurulum listesindeki kayıtlı verileri gösterir.', value: 'help2' },
]),
);
    
const row2 = new MessageActionRow()
.addComponents(
new MessageSelectMenu()
.setCustomId('select2')
.setPlaceholder('Bot Kurulum komutları için tıklayınız')
.addOptions([
  { label: 'Sunucu Kurulum Bilgilendirme', description: 'Sunucu kurulum komutları hakkında bilgi almanızı sağlar.', value: 'Server' },
  { label: 'Rol Kurulum Bilgilendirme', description: 'Rol kurulum komutları hakkında bilgi almanızı sağlar.', value: 'Roles' },
  { label: 'Menü Rol Kurulum Bilgilendirme', description: 'Menü Rol kurulum komutları hakkında bilgi almanızı sağlar.', value: 'Roles4' },
  { label: 'Kanal Kurulum Bilgilendirme', description: 'Kanal kurulum komutları hakkında bilgi almanızı sağlar.', value: 'Channel' },
  { label: 'Kategori Kurulum Bilgilendirme', description: 'Kategori kurulum komutları hakkında bilgi almanızı sağlar.', value: 'Category' },
  { label: 'Veri Yenileme', description: 'Sunucu kurulumunuz bittikten sonra verileri dataya günceller.', value: 'Restart' },
]),
);

const row3 = new MessageActionRow()
.addComponents(
new MessageSelectMenu()
.setCustomId('select3')
.setPlaceholder('Bot Kurulum Verileri için tıklayınız')
.addOptions([
  { label: 'Sunucu Veri Bilgilendirme', description: 'Sunucu kurulum verilerinden kurulanları görüntülersiniz.', value: 'Server2' },
  { label: 'Rol Veri Bilgilendirme', description: 'Rol kurulum verilerinden kurulanları görüntülersiniz.', value: 'Roles2' },
  { label: 'Menü Rol Veri Bilgilendirme', description: 'Menü Rol kurulum verilerinden kurulanları görüntülersiniz.', value: 'Roles3' },
  { label: 'Kanal Veri Bilgilendirme', description: 'Kanal kurulum verilerinden kurulanları görüntülersiniz.', value: 'Channel2' },
  { label: 'Kategori Veri Bilgilendirme', description: 'Kategori kurulum verilerinden kurulanları görüntülersiniz.', value: 'Category2' },
  { label: 'Veri Yenileme', description: 'Sunucu verilerinizi en son kurduğunuz haline günceller.', value: 'Restart2' },
]),
);

if(!choose) {
await message.reply({ content: `Botun kurulumu hakkında bilgi almak için aşağıdaki menüyü kullanınız.`, components: [row] });
}

const embed = new MessageEmbed().setThumbnail(message.guild.iconURL({ dynamic: true, size: 2048 }))
.setDescription(`${message.author.toString()}, **${message.guild.name}** sunucususu içerisinde <t:${Math.floor(Date.now() / 1000)}:R>'den itibaren sunucu kurulum komutları hakkında bilgilendirme almak için aşağıdaki menüyü kullanabilirsiniz.`)
.setFooter({
text: `Veri Yenileme ile kurulum verilerinizi datadan güncellemeyi unutmayınız.`,
iconURL: message.author.displayAvatarURL({ dynamic: true })
})

const embed2 = new MessageEmbed().setThumbnail(message.guild.iconURL({ dynamic: true, size: 2048 }))
.setDescription(`${message.author.toString()}, **${message.guild.name}** sunucususu içerisinde <t:${Math.floor(Date.now() / 1000)}:R>'den itibaren sunucuda kurulumu gerçekleşmiş olan veriler hakkında bilgilendirme almak için aşağıdaki menüyü kullanabilirsiniz.`)
.setFooter({
text: `Veri Yenileme ile kurulum verilerinizi datadan güncellemeyi unutmayınız.`,
iconURL: message.author.displayAvatarURL({ dynamic: true })
})

const filter = i => i.user.id == message.author.id    
    let collector = await message.channel.createMessageComponentCollector({ filter, componentType: 'SELECT_MENU', max: 5, time: 120000 })
    collector.on("collect", async (interaction) => {

    if (interaction.values[0] === "Server") {
const sunucu = new MessageEmbed()
.setDescription(`${message.author.toString()}, ${message.guild.name} sunucusu içerisinde Aşağıdaki listeden sunucu conflarının kurulum komutlarının kullanımını görüntülüyebilirsiniz.

\`\`\`diff\n- SUNUCU KURULUM confLARI -\`\`\`
!kur tag \`<Örnek: ✬ >\`
!kur ikinciTag \`<Örnek: • >\`
!kur url \`<Örnek: hesperos >\`
`)
.setFooter({
text: message.author.tag,
iconURL: message.author.displayAvatarURL({ dynamic: true })
})
      await interaction.reply({ embeds: [sunucu], components: [], ephemeral: true }).catch({});
    }

    if (interaction.values[0] === "Roles") {
const rol = new MessageEmbed()
.setDescription(`${message.author.toString()}, ${message.guild.name} sunucusu içerisinde Aşağıdaki listeden rollerin kurulum komutlarının kullanımını görüntülüyebilirsiniz.

\`\`\`diff\n- ROL KURULUM confLARI -\`\`\`
!kur manRoles \`<Örnek: @🌀 Mannlich @♂ >\`
!kur womanRoles \`<Örnek: @🌺 Weiblich @♀️ >\`
!kur unregRoles \`<Örnek: @Kayıtsız >\`
!kur familyRole \`<Örnek: @Taglı >\`
!kur boosterRole \`<Örnek: @Server Booster >\`
!kur endüşükytrol \`<Örnek: @Endüşükyt >\` (Başvuru Sistemi İçin)
!kur ilkytrolleri \`<Örnek: @BaşlangıçYt1 @BaşlangıçYt2 >\` (Başvuru Sistemi İçin)
!kur staffs \`<Örnek: @Yetkili @Yetkili2 >\`
!kur yetkiliRoles \`<Örnek: @SağGörünümPerm @RegisterRol >\`
!kur teyitciRoles \`<Örnek: @BotKomutRol @RegisterRol >\`
!kur sahipRoles \`<Örnek: @Owner @Ceo >\`
!kur rolverici \`<Örnek: @Tag @ÇiftTag >\`
!kur canlıdestek \`<Örnek: @Canlı Destek >\` (Destek Bot)
!kur yetkilialım \`<Örnek: @Yetkili Alım DM >\`(Başvuru Sistemi İçin)

\`\`\`diff\n- PERM ROL KURULUM confLARI -\`\`\`
!kur vipRole \`<Örnek: @Vip >\`
!kur müzisyenRole \`<Örnek: @Musician >\`
!kur tasarımcıRole \`<Örnek: @Designer >\`
!kur streamerRole \`<Örnek: @Streamer >\`
!kur terapistRole \`<Örnek: @Terapist >\`
!kur sorunçözücüRole \`<Örnek: @Sorun Çözücü >\`

\`\`\`diff\n- CEZALANDIRMA ROL KURULUM confLARI -\`\`\`
!kur jailRole \`<Örnek: @⛔ Karantina >\`
!kur chatMute \`<Örnek: @Muted >\`
!kur voiceMute \`<Örnek: @V.Muted >\`
!kur fakeAccRole \`<Örnek: @🛑 Cezalı >\`
!kur warnHammer \`<Örnek: @|| Warn >\`
!kur banHammer \`<Örnek: @|| Ban >\`
!kur jailHammer \`<Örnek: @|| Jail >\`
!kur cmuteHammer \`<Örnek: @|| Chat Mute >\`
!kur vmuteHammer \`<Örnek: @|| Voice Mute >\`
`)
.setFooter({
text: message.author.tag,
iconURL: message.author.displayAvatarURL({ dynamic: true })
})
      await interaction.reply({ embeds: [rol], components: [], ephemeral: true }).catch({});
    }

    if (interaction.values[0] === "Roles4") {
const rol4embed = new MessageEmbed()
.setDescription(`${message.author.toString()}, ${message.guild.name} sunucusu içerisinde Aşağıdaki listeden bota kurulmuş veya kurulmamış rol confları verilerini görüntülüyebilirsiniz.

\`\`\`diff\n- İLİŞKİ ROL KURULUM CONFLARI -\`\`\`
!kur couple \`<Örnek: @rol >\`
!kur alone \`<Örnek: @rol >\`
!kur sevgiliyapmıyorum \`<Örnek: @rol >\`
!kur lgbt \`<Örnek: @rol >\`

\`\`\`diff\n- OYUN ROL KURULUM CONFLARI -\`\`\`
!kur minecraft \`<Örnek: @rol >\`
!kur mlbb \`<Örnek: @rol >\`
!kur lol \`<Örnek: @rol >\`
!kur gta5 \`<Örnek: @rol >\`
!kur valorant \`<Örnek: @rol >\`
!kur amongus \`<Örnek: @rol >\`
!kur csgo \`<Örnek: @rol >\`

\`\`\`diff\n- BURÇ ROL KURULUM CONFLARI -\`\`\`
!kur koç \`<Örnek: @rol >\`
!kur boğa \`<Örnek: @rol >\`
!kur ikizler \`<Örnek: @rol >\`
!kur yengeç \`<Örnek: @rol >\`
!kur aslan \`<Örnek: @rol >\`
!kur başak \`<Örnek: @rol >\`
!kur terazi \`<Örnek: @rol >\`
!kur akrep \`<Örnek: @rol >\`
!kur yay \`<Örnek: @rol >\`
!kur oğlak \`<Örnek: @rol >\`
!kur kova \`<Örnek: @rol >\`
!kur balık \`<Örnek: @rol >\`

\`\`\`diff\n- TAKIM ROL KURULUM CONFLARI -\`\`\`
!kur gs \`<Örnek: @rol >\`
!kur fb \`<Örnek: @rol >\`
!kur ts \`<Örnek: @rol >\`
!kur bjk \`<Örnek: @rol >\`

\`\`\`diff\n- RENK ROL KURULUM CONFLARI -\`\`\`
!kur mavi \`<Örnek: @rol >\`
!kur kırmızı \`<Örnek: @rol >\`
!kur sarı \`<Örnek: @rol >\`
!kur siyah \`<Örnek: @rol >\`
!kur beyaz \`<Örnek: @rol >\`
!kur yeşil \`<Örnek: @rol >\`
!kur mor \`<Örnek: @rol >\`
!kur kahverengi \`<Örnek: @rol >\`
!kur turuncu \`<Örnek: @rol >\`

\`\`\`diff\n- SEÇENEK ROL KURULUM CONFLARI -\`\`\`
!kur çekiliş \`<Örnek: @rol >\`
!kur etkinlik \`<Örnek: @rol >\`
`)
.setFooter({
text: message.author.tag,
iconURL: message.author.displayAvatarURL({ dynamic: true })
})

      await interaction.reply({ embeds: [rol4embed], components: [], ephemeral: true }).catch({});
    }

    if (interaction.values[0] === "Channel") {
const kanal = new MessageEmbed()
.setDescription(`${message.author.toString()}, ${message.guild.name} sunucusu içerisinde Aşağıdaki listeden kanal conflarının kurulum komutlarının kullanımını görüntülüyebilirsiniz.

\`\`\`diff\n- KANAL KURULUM confLARI -\`\`\`
!kur kurallar \`<Örnek: #rules >\`
!kur chatChannel \`<Örnek: #chat >\`
!kur welcomeChannel \`<Örnek: #welcome-to-server >\`
!kur inviteChannel \`<Örnek: #invite-channel >\`
!kur banLogChannel \`<Örnek: #ban-log >\`
!kur jailLogChannel \`<Örnek: #jail-log >\`
!kur cmuteLogChannel \`<Örnek: #mute-bilgi >\`
!kur vmuteLogChannel \`<Örnek: #ses-mute-bilgi >\`
!kur warnLogChannel \`<Örnek: #uyarı-log >\`
!kur cezapuanlog \`<Örnek: #ceza-puan-bilgi >\`
`)
.setFooter({
text: message.author.tag,
iconURL: message.author.displayAvatarURL({ dynamic: true })
})
      await interaction.reply({ embeds: [kanal], components: [], ephemeral: true }).catch({});
    }

    if (interaction.values[0] === "Category") {
const kategori = new MessageEmbed()
.setDescription(`${message.author.toString()}, ${message.guild.name} sunucusu içerisinde Aşağıdaki listeden kategori conflarının kurulum komutlarının kullanımını görüntülüyebilirsiniz.

\`\`\`diff\n- KATEGORİ KURULUM confLARI -\`\`\`
!kur registerParents \`<Örnek: #WELCOME-TO-SERVER >\`
!kur publicParents \`<Örnek: #SERVER-PUBLIC-VOICE >\`
!kur funParents \`<Örnek: #VK-DC-ROOMS/#GAME-ROOMS >\`
!kur solvingParents \`<Örnek: #SORUN-ÇÖZÜM/#SERVER-SILIVRI >\`
!kur privateParents \`<Örnek: #SECRET-ODALAR >\`
!kur aloneParents \`<Örnek: #ALONA-ODALAR >\`
`)
.setFooter({
text: message.author.tag,
iconURL: message.author.displayAvatarURL({ dynamic: true })
})
      await interaction.reply({ embeds: [kategori], components: [], ephemeral: true }).catch({});
    }

if (interaction.values[0] === "Restart") {
    await interaction.reply({ content: `Sunucu Kurulum Verileri Güncelleniyor ve __**Bot**__ yeniden başlatılıyor!`, components: [], ephemeral: true }).catch({});
    process.exit(0)
    }
})

    let collector2 = await message.channel.createMessageComponentCollector({ filter, componentType: 'SELECT_MENU', max: 5, time: 120000 })
    collector2.on("collect", async (interaction) => {

    if (interaction.values[0] === "Server2") {
const server2embed = new MessageEmbed()
.setDescription(`${message.author.toString()}, ${message.guild.name} sunucusu içerisinde Aşağıdaki listeden bota kurulmuş veya kurulmamış Sunucu confları verilerini görüntülüyebilirsiniz.

\`\`\`diff\n- SUNUCU KURULUM VERİLERİ -\`\`\`
Bot-Owner: (${conf.owners.length > 0 ? `${conf.owners.map(x => `<@${x}>`).join(",")}` : "\`YOK\`"})
Tag: (\` ${conf.tag ? conf.tag : "YOK"} \`) / (\` ${conf.ikinciTag ? conf.ikinciTag : "YOK"} \`)
Link: (${conf.serverUrl ? conf.serverUrl : "\`YOK\`"})
`)
.setFooter({
text: message.author.tag,
iconURL: message.author.displayAvatarURL({ dynamic: true })
})
      await interaction.reply({ embeds: [server2embed], components: [], ephemeral: true }).catch({});
    }

    if (interaction.values[0] === "Roles2") {
const roles2embed = new MessageEmbed()
.setDescription(`${message.author.toString()}, ${message.guild.name} sunucusu içerisinde Aşağıdaki listeden bota kurulmuş veya kurulmamış rol confları verilerini görüntülüyebilirsiniz.

\`\`\`diff\n- ROL KURULUM VERİLERİ -\`\`\`
Man Roles: (${conf.erkekRolleri.length > 0 ? `${conf.erkekRolleri.map(x => `<@&${x}>`).join(",")}` : "\`YOK\`"})
Woman Roles: (${conf.kizRolleri.length > 0 ? `${conf.kizRolleri.map(x => `<@&${x}>`).join(",")}` : "\`YOK\`"})
Unregister Role: (${conf.unregRoles.length > 0 ? `${conf.unregRoles.map(x => `<@&${x}>`).join(",")}` : "\`YOK\`"})
Family Role: (${conf.ekipRolu ? `<@&${conf.ekipRolu}>` : "\`YOK\`"})
Booster Role: (${conf.boosterRolu ? `<@&${conf.boosterRolu}>` : "\`YOK\`"})
En Düşük Yetki Rol: (${conf.endüşükytrol ? `<@&${conf.endüşükytrol}>` : "\`YOK\`"})
İlk Yetkili Roles: (${conf.ilkytrolleri.length > 0 ? `${conf.ilkytrolleri.map(x => `<@&${x}>`).join(",")}` : "\`YOK\`"})
Staff Roles: (${conf.staffs.length > 0 ? `${conf.staffs.map(x => `<@&${x}>`).join(",")}` : "\`YOK\`"})
Yetkili Roles: (${conf.yetkiRolleri.length > 0 ? `${conf.yetkiRolleri.map(x => `<@&${x}>`).join(",")}` : "\`YOK\`"})
Teyitci Roles: (${conf.teyitciRolleri.length > 0 ? `${conf.teyitciRolleri.map(x => `<@&${x}>`).join(",")}` : "\`YOK\`"})
Sahip Roles: (${conf.sahipRolu.length > 0 ? `${conf.sahipRolu.map(x => `<@&${x}>`).join(",")}` : "\`YOK\`"})
Rol Verici Roles: (${conf.rolverici.length > 0 ? `${conf.rolverici.map(x => `<@&${x}>`).join(",")}` : "\`YOK\`"})
Canlı Destek Role: (${conf.canlıdestekRol ? `<@&${conf.canlıdestekRol}>` : "\`YOK\`"})
Yetkili Alım Role: (${conf.yetkilialımRol ? `<@&${conf.yetkilialımRol}>` : "\`YOK\`"})

\`\`\`diff\n- PERM KURULUM VERİLERİ -\`\`\`
Vip Role: (${conf.vipRole ? `<@&${conf.vipRole}>` : "\`YOK\`"})
Müzisyen Rol: (${conf.müzisyenRole ? `<@&${conf.müzisyenRole}>` : "\`YOK\`"})
Tasarımcı Rol: (${conf.tasarımcıRole ? `<@&${conf.tasarımcıRole}>` : "\`YOK\`"})
Streamer Role: (${conf.streamerRole ? `<@&${conf.streamerRole}>` : "\`YOK\`"})
Terapist Rol: (${conf.terapistRole ? `<@&${conf.terapistRole}>` : "\`YOK\`"})
Sorun Çözme Rol: (${conf.sorunçözücüRole ? `<@&${conf.sorunçözücüRole}>` : "\`YOK\`"})

\`\`\`diff\n- CEZALANDIRMA ROL KURULUM VERİLERİ -\`\`\`
Jail Role: (${conf.jailRole.length > 0 ? `${conf.jailRole.map(x => `<@&${x}>`).join(",")}` : "\`YOK\`"})
Chat Mute Role: (${conf.chatMute.length > 0 ? `${conf.chatMute.map(x => `<@&${x}>`).join(",")}` : "\`YOK\`"})
Voice Mute Role: (${conf.voiceMute.length > 0 ? `${conf.voiceMute.map(x => `<@&${x}>`).join(",")}` : "\`YOK\`"}))
Fake Account Role: (${conf.fakeAccRole.length > 0 ? `${conf.fakeAccRole.map(x => `<@&${x}>`).join(",")}` : "\`YOK\`"})
Warn Hammer Role: (${conf.warnHammer.length > 0 ? `${conf.warnHammer.map(x => `<@&${x}>`).join(",")}` : "\`YOK\`"})
Ban Hammer Role: (${conf.banHammer.length > 0 ? `${conf.banHammer.map(x => `<@&${x}>`).join(",")}` : "\`YOK\`"})
Jail Hammer Role: (${conf.jailHammer.length > 0 ? `${conf.jailHammer.map(x => `<@&${x}>`).join(",")}` : "\`YOK\`"})
CMute Hammer Role: (${conf.cmuteHammer.length > 0 ? `${conf.cmuteHammer.map(x => `<@&${x}>`).join(",")}` : "\`YOK\`"})
VMute Hammer Role: (${conf.vmuteHammer.length > 0 ? `${conf.vmuteHammer.map(x => `<@&${x}>`).join(",")}` : "\`YOK\`"})
`)
.setFooter({
text: message.author.tag,
iconURL: message.author.displayAvatarURL({ dynamic: true })
})

      await interaction.reply({ embeds: [roles2embed], components: [], ephemeral: true }).catch({});
    }

    if (interaction.values[0] === "Roles3") {
const roles3embed = new MessageEmbed()
.setDescription(`${message.author.toString()}, ${message.guild.name} sunucusu içerisinde Aşağıdaki listeden bota kurulmuş veya kurulmamış rol confları verilerini görüntülüyebilirsiniz.

\`\`\`diff\n- İLİŞKİ ROL KURULUM VERİLERİ -\`\`\`
Sevgilim Var : (${conf.couple ? `<@&${conf.couple}>` : "\`YOK\`"})
Sevgilim Yok : (${conf.alone ? `<@&${conf.alone}>` : "\`YOK\`"})
Sevgili Yapmıyorum : (${conf.sevgiliyapmıyorum ? `<@&${conf.sevgiliyapmıyorum}>` : "\`YOK\`"})
Lgbt : (${conf.lgbt ? `<@&${conf.lgbt}>` : "\`YOK\`"})

\`\`\`diff\n- OYUN ROL KURULUM VERİLERİ -\`\`\`
Minecraft : (${conf.minecraft ? `<@&${conf.minecraft}>` : "\`YOK\`"})
Mobile Legends : (${conf.mlbb ? `<@&${conf.mlbb}>` : "\`YOK\`"})
League Of Legensa : (${conf.lol ? `<@&${conf.lol}>` : "\`YOK\`"})
Gta5 : (${conf.gta5 ? `<@&${conf.gta5}>` : "\`YOK\`"})
Valorant : (${conf.valorant ? `<@&${conf.valorant}>` : "\`YOK\`"})
AmongUs : (${conf.amongus ? `<@&${conf.amongus}>` : "\`YOK\`"})
Counter Strike : (${conf.csgo ? `<@&${conf.csgo}>` : "\`YOK\`"})

\`\`\`diff\n- BURÇ ROL KURULUM VERİLERİ -\`\`\`
Koç : (${conf.koç ? `<@&${conf.koç}>` : "\`YOK\`"})
Boğa : (${conf.boğa ? `<@&${conf.boğa}>` : "\`YOK\`"})
İkizler : (${conf.ikizler ? `<@&${conf.ikizler}>` : "\`YOK\`"})
Yengeç : (${conf.yengeç ? `<@&${conf.yengeç}>` : "\`YOK\`"})
Aslan : (${conf.aslan ? `<@&${conf.aslan}>` : "\`YOK\`"})
Başak : (${conf.başak ? `<@&${conf.başak}>` : "\`YOK\`"})
Terazi : (${conf.terazi ? `<@&${conf.terazi}>` : "\`YOK\`"})
Akrep : (${conf.akrep ? `<@&${conf.akrep}>` : "\`YOK\`"})
Yay : (${conf.yay ? `<@&${conf.yay}>` : "\`YOK\`"})
Oğlak : (${conf.oğlak ? `<@&${conf.oğlak}>` : "\`YOK\`"})
Kova : (${conf.kova ? `<@&${conf.kova}>` : "\`YOK\`"})
Balık : (${conf.balık ? `<@&${conf.balık}>` : "\`YOK\`"})

\`\`\`diff\n- TAKIM ROL KURULUM VERİLERİ -\`\`\`
GalataSaray : (${conf.gs ? `<@&${conf.gs}>` : "\`YOK\`"})
FenerBahçe : (${conf.fb ? `<@&${conf.fb}>` : "\`YOK\`"})
TrabzonSpor : (${conf.ts ? `<@&${conf.ts}>` : "\`YOK\`"})
Beşiktaş : (${conf.bjk ? `<@&${conf.bjk}>` : "\`YOK\`"})

\`\`\`diff\n- RENK ROL KURULUM VERİLERİ -\`\`\`
Mavi : (${conf.mavi ? `<@&${conf.mavi}>` : "\`YOK\`"})
Kırmızı : (${conf.kırmızı ? `<@&${conf.kırmızı}>` : "\`YOK\`"})
Sarı : (${conf.sarı ? `<@&${conf.sarı}>` : "\`YOK\`"})
Siyah : (${conf.siyah ? `<@&${conf.siyah}>` : "\`YOK\`"})
Beyaz : (${conf.beyaz ? `<@&${conf.beyaz}>` : "\`YOK\`"})
Yeşil : (${conf.yeşil ? `<@&${conf.yeşil}>` : "\`YOK\`"})
Mor : (${conf.mor ? `<@&${conf.mor}>` : "\`YOK\`"})
Kahverengi : (${conf.kahverengi ? `<@&${conf.kahverengi}>` : "\`YOK\`"})
Turuncu : (${conf.turuncu ? `<@&${conf.turuncu}>` : "\`YOK\`"})

\`\`\`diff\n- SEÇENEK ROL KURULUM VERİLERİ -\`\`\`
Çekiliş : (${conf.çekiliş ? `<@&${conf.çekiliş}>` : "\`YOK\`"})
Etkinlik : (${conf.etkinlik ? `<@&${conf.etkinlik}>` : "\`YOK\`"})
`)
.setFooter({
text: message.author.tag,
iconURL: message.author.displayAvatarURL({ dynamic: true })
})

      await interaction.reply({ embeds: [roles3embed], components: [], ephemeral: true }).catch({});
    }

    if (interaction.values[0] === "Channel2") {
const channel2embed = new MessageEmbed()
.setDescription(`${message.author.toString()}, ${message.guild.name} sunucusu içerisinde Aşağıdaki listeden bota kurulmuş veya kurulmamış kanal confları verilerini görüntülüyebilirsiniz.

\`\`\`diff\n- KANAL KURULUM VERİLERİ -\`\`\`
Kurallar: (${conf.kurallar.length ? `<#${conf.kurallar}>` : "\`YOK\`"})
Chat Channel: (${conf.chatChannel.length ? `<#${conf.chatChannel}>` : "\`YOK\`"})
Welcome Channel: (${conf.teyitKanali.length ? `<#${conf.teyitKanali}>` : "\`YOK\`"})
İnvite Channel: (${conf.invLogChannel.length ? `<#${conf.invLogChannel}>` : "\`YOK\`"})
Ban Log Channel: (${conf.banLogChannel.length ? `<#${conf.banLogChannel}>` : "\`YOK\`"})
Jail Log Channel: (${conf.jailLogChannel.length ? `<#${conf.jailLogChannel}>` : "\`YOK\`"})
CMute Log Channel: (${conf.cmuteLogChannel.length ? `<#${conf.cmuteLogChannel}>` : "\`YOK\`"})
VMute Log Channel: (${conf.vmuteLogChannel.length ? `<#${conf.vmuteLogChannel}>` : "\`YOK\`"})
Warn Log Channel: (${conf.warnLogChannel.length ? `<#${conf.warnLogChannel}>` : "\`YOK\`"})
Ceza-Puan Log Channel: (${conf.cezapuanlog.length ? `<#${conf.cezapuanlog}>` : "\`YOK\`"})
`)
.setFooter({
text: message.author.tag,
iconURL: message.author.displayAvatarURL({ dynamic: true })
})
      await interaction.reply({ embeds: [channel2embed], components: [], ephemeral: true }).catch({});
    }

    if (interaction.values[0] === "Category2") {
const catagory2embed = new MessageEmbed()
.setDescription(`${message.author.toString()}, ${message.guild.name} sunucusu içerisinde Aşağıdaki listeden bota kurulmuş veya kurulmamış kategori confları verilerini görüntülüyebilirsiniz.

\`\`\`diff\n- KATEGORİ KURULUM VERİLERİ -\`\`\`
Register Parents: (** ${conf.registerParents.length ? `${conf.registerParents.map(x => `<#${x}>`).join(",")}` : "\`YOK\`"} **)
Public Parents: (** ${conf.publicParents.length ? `<#${conf.publicParents}>` : "\`YOK\`"} **)
Fun Parents: (** ${conf.funParents.length > 0 ? `${conf.funParents.map(x => `<#${x}>`).join(",")}` : "\`YOK\`"} **)
Solving Parents: (** ${conf.solvingParents.length > 0 ? `${conf.solvingParents.map(x => `<#${x}>`).join(",")}` : "\`YOK\`"} **)
Private Parents: (** ${conf.privateParents.length ? `${conf.privateParents.map(x => `<#${x}>`).join(",")}` : "\`YOK\`"} **)
Alone Parents: (** ${conf.aloneParents.length ? `${conf.aloneParents.map(x => `<#${x}>`).join(",")}` : "\`YOK\`"} **)
`)
.setFooter({
text: message.author.tag,
iconURL: message.author.displayAvatarURL({ dynamic: true })
})
      await interaction.reply({ embeds: [catagory2embed], components: [], ephemeral: true }).catch({});
    }

if (interaction.values[0] === "Restart2") {
      await interaction.reply({ content: `Sunucu Kurulum Verileri Güncelleniyor ve __**Bot**__ yeniden başlatılıyor!`, components: [], ephemeral: true }).catch({});
      process.exit(0)
    }
})

    const collector3 = message.channel.createMessageComponentCollector({ filter, componentType: 'SELECT_MENU', max: 2, time: 120000 });
    collector3.on("collect", async (interaction) => {
   
        if (interaction.values[0] === "help") {
            await interaction.reply({ embeds: [embed], components: [row2], ephemeral: true }).catch({});
          }
          if (interaction.values[0] === "help2") {
            await interaction.reply({ embeds: [embed2], components: [row3], ephemeral: true }).catch({});
          }
    
        });



/////
const setup1 = [
  { name: ["tag"], conf: "tag", cmdName: "Tag" },
  { name: ["secondarytag", "secondary-tag", "ikincitag", "ikinciTag"], conf: "ikinciTag", cmdName: "İkinci Tag" },
  { name: ["link", "url"], conf: "serverUrl", cmdName: "Url" },
]

const setup2 = [
  { name: ["ilkytroller","başlangıçyt","ytbaşlangıçroller"], conf: "ilkytrolleri", cmdName: "Yetkili Rol(leri)" },
  { name: ["staffs","staffrole","staffRole","staffRoles"], conf: "staffs", cmdName: "Yetkili Rol(leri)" },
  { name: ["erkekrol","manrole","manRoles","manroles"], conf: "erkekRolleri", cmdName: "Erkek Rolleri Rol(leri)" },
  { name: ["kadınrol","womanrole","womanRoles","womanroles"], conf: "kizRolleri", cmdName: "Kız Rolleri Rol(leri)" },
  { name: ["kayıtsızrol","unregisterrole","unregisterRole","unregRoles"], conf: "unregRoles", cmdName: "Kayıtsız Rol(leri)" },
  { name: ["yetkilirol","yetkilirole","yetkiliRole","yetkiliRoles"], conf: "yetkiRolleri", cmdName: "Yetki Rol(leri)" },
  { name: ["teyitcirol","teyitcirole","teyitciRole","teyitciRoles"], conf: "teyitciRolleri", cmdName: "Teyitci Rol(leri)" },
  { name: ["sahiprol","sahiprole","sahipRole","sahipRoles"], conf: "sahipRolu", cmdName: "Sahip Rol(leri)" },
  { name: ["warnHammer","warnhammer","warnh"], conf: "warnHammer", cmdName: "Warn Hammer" },
  { name: ["banHammer","banhammer","banh"], conf: "banHammer", cmdName: "Ban Hammer" },
  { name: ["jailHammer","jailhammer","jailh"], conf: "jailHammer", cmdName: "Jail Hammer" },
  { name: ["cmutehammer","cmuteHammer","cmh"], conf: "cmuteHammer", cmdName: "Chat-Mute Hammer" },
  { name: ["vmutehammer","vmuteHammer","vmh"], conf: "vmuteHammer", cmdName: "Voice-Mute Hammer" },
  { name: ["jail","jailRole","jailRole","jailRoles"], conf: "jailRole", cmdName: "Jail Rol" },
  { name: ["chatMute","chatmute","chatMuteRole","chatmterole"], conf: "chatMute", cmdName: "Chat-Mute Rol" },
  { name: ["voiceMute","voicemute","voicemuteRole","voicemuterole"], conf: "voiceMute", cmdName: "Voice-Mute Rol" },
  { name: ["fakeAcc","fakeaccrole","fakeAccRole","fakeAccRoles"], conf: "fakeAccRole", cmdName: "Yeni Hesap Rol" },
  { name: ["rolverici","rolvericirole","rolvericiRole","rolvericiRoles"], conf: "rolverici", cmdName: "Rol Yönetici Rol" },
]

const setup3 = [
  { name: ["taglırol","familyrole","familyRole","familyRoles"], conf: "ekipRolu", cmdName: "Taglı Rol(leri)" },
  { name: ["boosterrol","boosterrole","boosterRole","boosterRoles"], conf: "boosterRolu", cmdName: "Booster Rol" },
  { name: ["viprol","viprole","vipRole","vipRoles"], conf: "vipRole", cmdName: "Vip Rol" },
  { name: ["müzisyenrol","müzisyenrole","müzisyenRole","müzisyen"], conf: "müzisyenRole", cmdName: "Müziysen Rol" },
  { name: ["tasarımcırol","tasarımcırole","tasarımcıRole","tasarımcı"], conf: "tasarımcıRole", cmdName: "Tasarımcı Rol" },
  { name: ["streamerrol","streamerrole","streamerRole","streamer"], conf: "streamerRole", cmdName: "Streamer Rol" },
  { name: ["sorunçözücürol","sorunçözücürole","sorunçözücüRole","sorunçözücü"], conf: "sorunçözücüRole", cmdName: "Sorun Çöüzücü Rol" },
  { name: ["terapistrol","terapistrole","terapistRole","terapist"], conf: "terapistRole", cmdName: "Terapist Rol" },
  { name: ["canlıdestekrol","canlıdestekrole","canlıdestekRole","canlıdestek"], conf: "canlıdestekRol", cmdName: "Canlı Destek Rol" },
  { name: ["yetkilialımrol","yetkilialımrole","yetkilialımRole","yetkilialım"], conf: "yetkilialımRol", cmdName: "Yetkili Alım Rol" },
  { name: ["endüşükyt","ilkytrol"], conf: "endüşükytrol", cmdName: "En Düşük Yetki Rol" },
]

const setup4 = [
  { name: ["chat","genelchat","chatChannel","chatchannel"], conf: "chatChannel", cmdName: "Chat Kanal" },
  { name: ["welcome","register","welcomechannel","welcomeChannel"], conf: "teyitKanali", cmdName: "Hoşgeldin Kanal" },
  { name: ["invite","invitekanal","inviteChannel","invitechannel"], conf: "invLogChannel", cmdName: "İnvite Kanal" },
  { name: ["bankanal","banlog","banLogChannel","banlogchannel"], conf: "banLogChannel", cmdName: "Ban Log Kanal" },
  { name: ["jailkanal","jaillog","jailLogChannel","jaillogchannel"], conf: "jailLogChannel", cmdName: "Jail Log Kanal" },
  { name: ["cmutekanal","cmutelog","cmuteLogChannel","cmutelogchannel"], conf: "cmuteLogChannel", cmdName: "Chat-Mute Log Kanal" },
  { name: ["vmutekanal","vmutelog","vmuteLogChannel","vmutelogchannel"], conf: "vmuteLogChannel", cmdName: "Voice-Mute Log Kanal" },
  { name: ["warnkanal","warnlog","warnLogChannel","warnlogchannel"], conf: "warnLogChannel", cmdName: "Uyarı Log Kanal" },
  { name: ["rules","kurallar","kurallarkanalı","ruleschannel"], conf: "kurallar", cmdName: "Kurallar Kanal" },
  { name: ["cezapuankanal","cezapuanlog","cezapuanLogChannel","cezapuanlogchannel"], conf: "cezapuanlog", cmdName: "Ceza Puan Log Kanal" },
]
 
const setup5 = [
  { name: ["registerParents","registerparents","registerParent","registerparent"], conf: "registerParents", cmdName: "Register Kategori" },
  { name: ["solvingParents","solvingparents","solvingParent","solvingparent"], conf: "solvingParents", cmdName: "Geçersiz Kategori(leri)" },
  { name: ["privateParents","privateparents","privateParent","privateparent"], conf: "privateParents", cmdName: "Secret Kategori" },
  { name: ["aloneParents","aloneparents","aloneParent","aloneparent"], conf: "aloneParents", cmdName: "Alone Kategori" },
  { name: ["funParents","funparents","funParent","funparent"], conf: "funParents", cmdName: "Eğlence Kategori(leri)" },
]

const setup6 = [
  { name: ["publicParents","publicparents","publicParent","publicparent"], conf: "publicParents", cmdName: "Public Kategori" },
]

const setup7 = [
  { name: ["couple","lovers","sevgilimvar"], conf: "couple", cmdName: "İlişki Rolleri" },
  { name: ["alone","sevgilimyok"], conf: "alone", cmdName: "İlişki Rolleri" },
  { name: ["lgbt","gay","trans"], conf: "lgbt", cmdName: "İlişki Rolleri" },
  { name: ["sevgiliyapmıyorum","nomanit"], conf: "sevgiliyapmıyorum", cmdName: "İlişki Rolleri" },
  { name: ["minecraft"], conf: "minecraft", cmdName: "Oyun Rolleri" },
  { name: ["mlbb"], conf: "mlbb", cmdName: "Oyun Rolleri" },
  { name: ["lol","leagueoflegends"], conf: "lol", cmdName: "Oyun Rolleri" },
  { name: ["gta5"], conf: "gta5", cmdName: "Oyun Rolleri" },
  { name: ["valorant","valo"], conf: "valorant", cmdName: "Oyun Rolleri" },
  { name: ["amongus","amugas"], conf: "amongus", cmdName: "Oyun Rolleri" },
  { name: ["csgo","counterstrike"], conf: "csgo", cmdName: "Oyun Rolleri" },
  { name: ["koç"], conf: "koç", cmdName: "Burç Rolleri" },
  { name: ["boğa"], conf: "boğa", cmdName: "Burç Rolleri" },
  { name: ["ikizler"], conf: "ikizler", cmdName: "Burç Rolleri" },
  { name: ["yengeç"], conf: "yengeç", cmdName: "Burç Rolleri" },
  { name: ["aslan"], conf: "aslan", cmdName: "Burç Rolleri" },
  { name: ["başak"], conf: "başak", cmdName: "Burç Rolleri" },
  { name: ["terazi"], conf: "terazi", cmdName: "Burç Rolleri" },
  { name: ["akrep"], conf: "akrep", cmdName: "Burç Rolleri" },
  { name: ["yay"], conf: "yay", cmdName: "Burç Rolleri" },
  { name: ["oğlak"], conf: "oğlak", cmdName: "Burç Rolleri" },
  { name: ["kova"], conf: "kova", cmdName: "Burç Rolleri" },
  { name: ["balık"], conf: "balık", cmdName: "Burç Rolleri" },
  { name: ["gs","galatasaray"], conf: "gs", cmdName: "Takım Rolleri" },
  { name: ["fb","fenerbahçe"], conf: "fb", cmdName: "Takım Rolleri" },
  { name: ["ts","trabzonspor"], conf: "ts", cmdName: "Takım Rolleri" },
  { name: ["bjk","beşiktaş"], conf: "bjk", cmdName: "Takım Rolleri" },
  { name: ["mavi","blue"], conf: "mavi", cmdName: "Renk Rolleri" },
  { name: ["kırmızı","red"], conf: "kırmızı", cmdName: "Renk Rolleri" },
  { name: ["sarı"], conf: "sarı", cmdName: "Renk Rolleri" },
  { name: ["siyah","black"], conf: "siyah", cmdName: "Renk Rolleri" },
  { name: ["beyaz","white"], conf: "beyaz", cmdName: "Renk Rolleri" },
  { name: ["yeşil"], conf: "yeşil", cmdName: "Renk Rolleri" },
  { name: ["mor"], conf: "mor", cmdName: "Renk Rolleri" },
  { name: ["kahverengi"], conf: "kahverengi", cmdName: "Renk Rolleri" },
  { name: ["turuncu"], conf: "turuncu", cmdName: "Renk Rolleri" },
  { name: ["çekiliş"], conf: "çekiliş", cmdName: "Seçenek Rolleri" },
  { name: ["etkinlik"], conf: "etkinlik", cmdName: "Seçenek Rolleri" },
]

setup1.forEach(async (x) => {
  if(x.name.some(x => x === choose)) {
  let select = args[1];
  if (!select) {
  message.reply({ content: `Sunucu **${x.cmdName}** belirtmelisin`, ephemeral: true });
  return }
  setupdb.set(`${x.conf}`, `${select}`)
  message.reply({ content: `**${select}** ${x.cmdName} listesine başarıyla eklendi.`, ephemeral: true })
};
});

setup2.forEach(async (x) => {
  if(x.name.some(x => x === choose)) {
  let rol;
  if (message.mentions.roles.size >= 1) {
    rol = message.mentions.roles.map(r => r.id);
  }
  let db = setupdb.get(`${x.conf}`)
  if(rol) {
  if(db.some(ozi => ozi.includes(rol.id))) {
  setupdb.pull(`${x.conf}`, `${rol.map(x => x)}`)
  message.reply({ content: `${rol.map(x => `<@&${x}>`)} ${x.cmdName} listesinden başarıyla kaldırıldı.`, ephemeral: true })
  } else {
  let xd = []
  rol.map(x => 
  xd.push(`${x}`)
  )
  setupdb.set(`${x.conf}`, xd)
  message.reply({ content: `${rol.map(x => `<@&${x}>`)} ${x.cmdName} listesine başarıyla eklendi.`, ephemeral: true })
  }
  } else if (!rol) {
  message.reply({ content: `Sunucu ${x.cmdName} belirtmelisin`, ephemeral: true });
  return }
  };
});
   
setup3.forEach(async (x) => {
  if(x.name.some(x => x === choose)) {
  let rol = message.mentions.roles.first() || message.guild.roles.cache.get(args[2]) || message.guild.roles.cache.find(ozi => ozi.name === args.join(" "))
  if (rol) {
  setupdb.set(`${x.conf}`, `${rol.id}`)
  message.reply({ content: `${rol} ${x.cmdName} listesine başarıyla eklendi.`, ephemeral: true })
  } else if (!rol) {
  message.reply({ content: `Sunucu ${x.cmdName} belirtmelisin`, ephemeral: true });
  return }
};
});

setup4.forEach(async (x) => {
  if(x.name.some(x => x === choose)) {
  let channel = message.mentions.channels.first() || message.guild.channels.cache.get(args[2]) || message.guild.channels.cache.find(ozi => ozi.name === args.join(" "))
  if (channel) {
  setupdb.set(`${x.conf}`, `${channel.id}`)
  message.reply({ content: `<#${channel.id}> ${x.cmdName} listesine başarıyla eklendi.`, ephemeral: true })
  } else if (!channel) {
  message.reply({ content: `Sunucu ${x.cmdName} belirtmelisin`, ephemeral: true });
  return }
  };
});

setup5.forEach(async (x) => {
  if(x.name.some(x => x === choose)) {
  let kanal;
  if (args.length >= 1) {
    kanal = args
    .filter((id) => message.guild.channels.cache.has(id))
    .map((id) => message.guild.channels.cache.get(id));
  }
  let db = setupdb.get(`${x.conf}`)
  if(kanal) {
  if(db.some(ozi => ozi.includes(kanal.id))) {
  setupdb.pull(`${x.conf}`, `${kanal.map(x => x)}`)
  message.reply({ content: `**${kanal.map(x => `${x}`)}** ${x.cmdName} listesinden başarıyla kaldırıldı.`, ephemeral: true })
  } else {
  let xd = []
  kanal.map(x => 
  xd.push(`${x.id}`)
  )
  setupdb.set(`${x.conf}`, xd)
  message.reply({ content: `**${kanal.map(x => `${x}`)}** ${x.cmdName} listesine başarıyla eklendi.`, ephemeral: true })
  }
  } else if (!kanal) {
  message.reply({ content: `Sunucu **${x.cmdName}** belirtmelisin`, ephemeral: true });
  return }
  };
});

setup6.forEach(async (x) => {
  if(x.name.some(x => x === choose)) {
  let jaylen = message.mentions.channels.first() || message.guild.channels.cache.get(args[1])
  if (!jaylen) return message.reply({ content: `Sunucu **${x.cmdName}** belirtmelisin`, ephemeral: true })
  setupdb.set(`${x.conf}`, jaylen.id)
  message.reply({ content: `**${jaylen}** ${x.cmdName} listesine başarıyla eklendi.`, ephemeral: true });
};
});

setup7.forEach(async (x) => {
  if(x.name.some(x => x === choose)) {
  let rol = message.mentions.roles.first() || message.guild.roles.cache.get(args[2]) || message.guild.roles.cache.find(ozi => ozi.name === args.join(" "))
  if (rol) {
  setupdb.set(`${x.conf}`, `${rol.id}`)
  message.reply({ content: `${rol} ${x.cmdName} listesine başarıyla eklendi.`, ephemeral: true })
  } else if (!rol) {
  message.reply({ content: `Sunucu ${x.cmdName} belirtmelisin`, ephemeral: true });
  return }
};
});


  }
};