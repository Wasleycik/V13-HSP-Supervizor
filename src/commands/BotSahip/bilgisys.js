const { MessageEmbed, Client, Message, MessageActionRow, MessageSelectMenu, MessageButton } = require("discord.js");
const Discord = require('discord.js');
const conf = require("../../configs/sunucuayar.json")
const isimcek = require("../../configs/isimcek.json")
const emojis = require("../../configs/emojis.json")
const ranks = require("../../configs/ranks.json")
const client = global.bot;

module.exports = {
  conf: {
    aliases: ["bilgi"],
    name: "bilgi",
    help: "bilgi",
    category: "sahip",
    owner: true,
  },
 
    run: async (client, message, args, durum, kanal) => {
      if (!message.member.permissions.has("ADMINISTRATOR")) return message.channel.send({ content:  `${message.member}, Bu komutu kullanmak için gerekli yetkiye sahip değilsin!`}).then((e) => setTimeout(() => { e.delete(); }, 10000));
message.delete()
		const embed = new Discord.MessageEmbed()
.setColor("RED")
.setAuthor({ name: `${message.guild.name} (Bilgi Sistemi)`,iconURL: message.guild.iconURL({ dynamic: true }) })
.setDescription(`
Aşağıdaki Menüden Lütden Yazdırmak İstediğiniz Metni Seçiniz.
`);

      const rowww = new MessageActionRow()
    .addComponents(
        new MessageSelectMenu()
            .setCustomId('bilgisys')
            .setPlaceholder(`Görmek İçin Tıkla!`)
            .addOptions([
                { label: 'Kural Bilgi',description: 'Sunucu Kuralları İçin Bilgi Menüsü Atar!', value: 'kurallmenü', emoji: { "name": "💎" },},
                { label: 'Bilgilendirme',description: 'İstiklal Marşı Andımız Gençliğe Hitabe Bilgilendirme!', value: 'bilgilendirmemenü', emoji: { "name": "💎" },},
                { label: 'Ceza Bilgi',description: 'Sunucu İçi Ve Dışı Ceza Bilgi Menüsünü Atar!', value: 'cezamenü', emoji: { "name": "💎" },},
                { label: 'Yetkili Kuralları',description: 'Yetkili Kurallarını Atar!', value: 'ytkural', emoji: { "name": "💎" },},
                { label: 'Tag Bilgi',description: 'Tag Bilgilendirme Menüsünü Atar!', value: 'tagbilgi', emoji: { "name": "💎" },},
                { label: 'Kayıt Bilgi',description: 'Kayıt Bilgilendirme Menüsünü Atar!', value: 'kayitbilgi', emoji: { "name": "💎" },},
                { label: 'Boost Bilgi',description: 'Boost Bilgilendirme Menüsünü Atar!', value: 'boostbilgi', emoji: { "name": "💎" },},
                { label: 'Türkiye',description: 'İstiklal Marşı Andımız Gençliğe Hitabe Bilgilendirme!', value: 'türkiyeee', emoji: { "name": "💎" },},
                { label: 'İptal Et',description: 'Menüyü Kapatır!', value: 'iptal', emoji: { "name": "❌" },},
             ]),
    );

let msg = await message.channel.send({embeds: [embed], components: [rowww] });

 var filter = (button) => button.user.id === message.author.id;
 let collector = await msg.createMessageComponentCollector({ filter, time: 60000 })

collector.on("collect", async (bilgisys) => {

if(bilgisys.values[0] === "kurallmenü"){
msg.delete()
const kuralembed = new Discord.MessageEmbed()
.setColor("#2f3136")
.setAuthor({ name: `${message.guild.name} / KURALLAR`,iconURL: message.guild.iconURL({ dynamic: true }) })
.setDescription(`
\`\`\`    ឵឵           KURAL BİLGİLENDİRME MENÜSÜ \`\`\`
__**Reklam**__
\`\`\`fix
> • Sözlü reklamlar, link ile reklam, özelden reklam, resim ile reklam ve benzeri şekilde reklamlar yapmak yasaktır.
\`\`\`
__**Küfür, Argo, Hakaret**__
\`\`\`fix
> • Her kanalda küfür etmek ve argo kullanmak yasaktır.
> • Üyelere karşı hakaret etmek ve dalga geçme yasaktır.
\`\`\`
__**Yetkililer ve Yetki**__
\`\`\`fix
> • Yetki istemek yasaktır.
> • Yetkili alımları ile ilgili soru sormak yasaktır.
> • Yetkilileri boş yere @etiketlemek ve @etiketleyerek spam yapmak yasaktır.
> • Yetkililere saygılı olun.
\`\`\`
__**Spam, Flood, Etiketleme**__
\`\`\`fix
> • Spam yapmak yasaktır.
> • Bir kelimeyi sürekli bir mesajda yazmak yasaktır.
> • Flood yapmak alt alta yazmak yasaktır.
> • Bir üyeyi sürekli @etiketlemek yasaktır.
\`\`\`
__**Din, Siyaset, Cinsellik**__
\`\`\`fix
> • Din ile ilgili konuşmak, tartışmak, kullanıcı adlarını din ile ilgili koymak yasaktır.
> • Siyaset ile ilgili konuşmak, tartışmak, kullanıcı adlarını siyaset ile ilgili koymak yasaktır.
> • 18+ fotoğraflar paylaşmak ve konuşmak yasaktır.
\`\`\`
__**Kavga, Tartışmak**__
\`\`\`fix
> • Kavga etmek, kavgaya dahil olmak ve tartışmak yasaktır.
> • Herhangi bir sorununuz varsa yetkiliye danışınız\`\`\`
\`\`\`diff
- Yukarıda Belirtmiş Olduğumuz Kurallar Harici İnsanlığa Sığmayacak Davranışlar Ve Benzeri Şeyler Kesinlikle Yasaktır\`\`\`
**Aşağıdaki Menüyü Kullanarak Ceza-i İşlemler Hakkında Bilgi Edinebilirsiniz.**

`);
 
const kuralroww = new MessageActionRow()
    .addComponents(
        new MessageSelectMenu()
            .setCustomId('cezamenü')
            .setPlaceholder(`Ceza-i İşlemleri Görmek için tıkla!`)
            .addOptions([
                { label: 'Sunucu Ceza Bilgi',description: 'Sunucu İçerisinde Bulunan Cezalar Hakkında Bilgi Alırsınız!', value: 'sc', emoji: { "name": "☢️" },},
                { label: 'Chat Ceza Bilgi',description: 'Yazılı Kanallarda Bulunan Cezalar Hakkında Bilgi Alırsınız!', value: 'cc', emoji: { "name": "💭" },},
                { label: 'Ses Ceza Bilgi',description: 'Sesli Kanallarda Bulunan Cezalar Hakkında Bilgi Alırsınız!', value: 'scb', emoji: { "name": "📣" },},
             ]),
    );
  
await message.channel.send({embeds: [kuralembed], components: [kuralroww] });
}
if(bilgisys.values[0] === "bilgilendirmemenü"){
msg.delete()
		const bilgilendirmeembed = new Discord.MessageEmbed()
.setColor("#2f3136")
.setAuthor({ name: `${message.guild.name} / BİLGİLENDİRME`,iconURL: message.guild.iconURL({ dynamic: true }) })
.setDescription(`

\`\`\`fix
Sunucumuzun Asıl Amacı Sohbeti Saran Vakit Geçirebileceğiniz Diğer Publardan Benzersiz Farklı Etkinliklerin Bulunduğu Public Bir Sunucudur.
\`\`\`
\`•\` **Sunucumuzda Kayıt Olmak İçin \`V.Confirmed\` Kanallarına Katılıp \`"İsim | Yaş"\` Vererek Kolay Bir Şekilde Kayıt Olabilirsiniz.**

\`•\` **Sunucu Kuralları İhlali Sonucu Çeşitli Cezalara Tabi Tutulabilirsiniz.**

\`•\` **Boost Basarak Boosterlara Özel \`Çekiliş Etkinlik VB\` Katılabilirsiniz.**

\`•\` **Saygı Bizim İçin Herşeydir \`Küfür/Küçümseme/Saygısızlık/kavga\` Vb Davranışlar Yapmamaya Özen Gösterelim**

\`•\` **Kayıt Olduktan Sonra Kuralları Okumayı Unutmayın Cezai İşlemler Kurallara Göre Uygulanmaktadır.**

\`•\` **Sunucumuzda Kesinlikle \`Sanal Mafyalara/Primcilere/Toxic İnsanlara\` Yer Yoktur.**
\`\`\`fix
Aşağıdaki Menüden Sunucu Kuralları Vb Şeyler Hakında Bilgi Alabilirsiniz.
\`\`\`

`);

      const bilgilendirmerow = new MessageActionRow()
    .addComponents(
        new MessageSelectMenu()
            .setCustomId('bilgilendirmemenü')
            .setPlaceholder(`Görmek İçin Tıkla!`)
            .addOptions([
                { label: 'Sunucu Kuralları',description: 'Sunucu Kurallarını Gösterir!', value: 'kurallar', emoji: { "name": "📖" },},
                { label: 'Tag Bilgi / Avantaj',description: 'Tag Bilgi Ve Avantajlarını Görürsün!', value: 'tagbilgi', emoji: { "name": "🔷" },},
                { label: 'Boost Bilgi / Avantaj',description: 'Boost Bilgi Ve Avantajlarını Görürsün!', value: 'boostbilgi', emoji: { "name": "🔰" },},
             ]),
    );

  
     await message.channel.send({embeds: [bilgilendirmeembed], components: [bilgilendirmerow] });

}
if(bilgisys.values[0] === "cezamenü"){
msg.delete()
const cezablgembed = new Discord.MessageEmbed()
.setColor("RED")
.setDescription(`
\`\`\`    ឵឵           CEZA BİLGİLENDİRME MENÜSÜ \`\`\`
Ceza-i İşlemler Hakkında Bilgi Alamak İstiyorsan Aşağıdaki Menüyü Kullan

**NOT :** \`Sunucuya Kayıt Oldunuzdan İtibaren Ceza-i İşlemleri Okuduğunuz Farzedilir Ve Ona Göre Ceza-i İşlem Uygulanır\`

`);
 
const cezablgmenü = new MessageActionRow()
    .addComponents(
        new MessageSelectMenu()
            .setCustomId('cezamenü')
            .setPlaceholder(`Ceza-i İşlemleri Görmek için tıkla!`)
            .addOptions([
                { label: 'Sunucu Ceza Bilgi',description: 'Sunucu İçerisinde Bulunan Cezalar Hakkında Bilgi Alırsınız!', value: 'sc', emoji: { "name": "☢️" },},
                { label: 'Chat Ceza Bilgi',description: 'Yazılı Kanallarda Bulunan Cezalar Hakkında Bilgi Alırsınız!', value: 'cc', emoji: { "name": "💭" },},
                { label: 'Ses Ceza Bilgi',description: 'Sesli Kanallarda Bulunan Cezalar Hakkında Bilgi Alırsınız!', value: 'scb', emoji: { "name": "📣" },},
             ]),
    );
  
await message.channel.send({embeds: [cezablgembed], components: [cezablgmenü] });
}

if(bilgisys.values[0] === "türkiyeee"){
msg.delete()
const bayramkutlamaembed = new Discord.MessageEmbed()
.setColor("RED")
.setImage('https://cdn.discordapp.com/attachments/1095430190961786913/1096499380284043284/Lentil_Salad_with_Cumin_and_Garlic_Tabbouleh_with_Mint_and_Parsley_Puree_Baba_Ghanoush_with_Pita_Bread.png')
.setDescription(`
\`\`\`    ឵឵             TÜRKİYE CUMHURİYETİ \`\`\`
🇹🇷 Aşağıdaki Menüleri Kullanarak **İstiklal Marşı / Andımız / Gençlğe Hitabe Ve Bayram Kutlama Ve Anma** Günlerini Öğrenebilirsiniz.

**Not :** Günlerde Değişiklik Veya Hatalar Olmuş Olabilir Lütfen Dikkat Ediniz.
`);

const türkiyerow = new MessageActionRow()
    .addComponents(
        new MessageSelectMenu()
            .setCustomId('türkiyee')
            .setPlaceholder(`Görmek İçin Tıkla!`)
            .addOptions([
                { label: 'İstiklal Marşımız',description: 'İstiklal Marşını Gösterir!', value: 'istiklalm', emoji: { "name": "💖" },},
                { label: 'Gençliğe Hitabe',description: 'Gençliğe Hitabemizi Gösterir!', value: 'ghitabe', emoji: { "name": "💖" },},
                { label: 'Öğrenci Andımız',description: 'Öğrenci Andımızı Gösterir!', value: 'andımız', emoji: { "name": "💖" },},

             ]),
    );

const bayramkutlamarow = new MessageActionRow()
    .addComponents(
        new MessageSelectMenu()
            .setCustomId('bayramkutlama')
            .setPlaceholder(`Bayram Ve Anma Günlerini Görmek İçin Tıkla!`)
            .addOptions([
                { label: 'Ocay Ayı',description: 'Ocak Ayındaki Bayram Ve Anma Günlerini Gösterir!', value: 'ocak', emoji: { "name": "💟" },},
                { label: 'Şubat Ayı',description: 'Şubat Ayındaki Bayram Ve Anma Günlerini Gösterir!', value: 'şubat', emoji: { "name": "💟" },},
                { label: 'Mart Ayı',description: 'Mart Ayındaki Bayram Ve Anma Günlerini Gösterir!', value: 'mart', emoji: { "name": "💟" },},
                { label: 'Nisan Ayı',description: 'Nisan Ayındaki Bayram Ve Anma Günlerini Gösterir!', value: 'nisan', emoji: { "name": "💟" },},
                { label: 'Mayıs Ayı',description: 'Mayıs Ayındaki Bayram Ve Anma Günlerini Gösterir!', value: 'mayıs', emoji: { "name": "💟" },},
                { label: 'Haziran Ayı',description: 'Haziran Ayındaki Bayram Ve Anma Günlerini Gösterir!', value: 'haziran', emoji: { "name": "💟" },},
                { label: 'Temmuz Ayı',description: 'Temmuz Ayındaki Bayram Ve Anma Günlerini Gösterir!', value: 'temmuz', emoji: { "name": "💟" },},
                { label: 'Ağustos Ayı',description: 'Ağustos Ayındaki Bayram Ve Anma Günlerini Gösterir!', value: 'ağustos', emoji: { "name": "💟" },},
                { label: 'Eylül Ayı',description: 'Eylül Ayındaki Bayram Ve Anma Günlerini Gösterir!', value: 'eylül', emoji: { "name": "💟" },},
                { label: 'Ekim Ayı',description: 'Ekim Ayındaki Bayram Ve Anma Günlerini Gösterir!', value: 'ekim', emoji: { "name": "💟" },},
                { label: 'Kasım Ayı',description: 'Kasım Ayındaki Bayram Ve Anma Günlerini Gösterir!', value: 'kasım', emoji: { "name": "💟" },},
                { label: 'Aralık Ayı',description: 'Aralık Ayındaki Bayram Ve Anma Günlerini Gösterir!', value: 'aralık', emoji: { "name": "💟" },},
             ]),
    );
  
const türkrowbtn = new MessageActionRow()
		.addComponents(
    new MessageButton().setCustomId("a").setLabel("💝💝").setStyle("DANGER").setDisabled(true),
    new MessageButton().setCustomId("b").setLabel("TÜRKİYE").setStyle("DANGER").setDisabled(true),
    new MessageButton().setCustomId("d").setLabel("CUMHURİYETİ").setStyle("DANGER").setDisabled(true),
    new MessageButton().setCustomId("c").setLabel("💝💝").setStyle("DANGER").setDisabled(true),
	);

await message.channel.send({embeds: [bayramkutlamaembed], components: [türkiyerow,bayramkutlamarow,türkrowbtn] });
}

if(bilgisys.values[0] === "iptal") {
await bilgisys.deferUpdate();
if(msg) msg.delete();
bilgisys.followUp({ content: `Bilgilendirme Sistemi Başarıyla İptal Edildi.`, ephemeral: true });
}

      })
    },
 }


client.on('interactionCreate', async bilgisys => {
    if (!bilgisys.isSelectMenu()) return;

const sc = new Discord.MessageEmbed()
.setColor("RANDOM")
.setAuthor(`Sunucu Ceza Bilgilendirme Menüsü`)
.setDescription(`
**Reklam/Taciz;**

> **Uyarı Sayısı:** \`Uyarı yok, direkt ceza uygulanır!\`
> **Ceza Bilgi:** \`Dm yoluyla da olsa Her türlü iması ve şakası yasaktır!\`
> **Ceza Süresi:** \`Sınırsız Ban\`

**Kişisel Bilgileri Sunucuda Paylaşmak/İfşalamak;**

> **Uyarı Sayısı:** \`Uyarı yok, direkt ceza uygulanır!\`
> **Ceza Bilgi:** \`Şakası olmamak üzere AF'ta yoktur!\`
> **Ceza Süresi:** \`Sınırsız Ban\`

**Tehdit/Şantaj/Dolandırıcılık;**

> **Uyarı Sayısı:** \`Uyarı yok, direkt ceza uygulanır!\`
> **Ceza Bilgi:** \`Her türlü iması ve şakası yasaktır!\`
> **Ceza Süresi:** \`Sınırsız Jail\`

**Kişisel Olayları Sunucuya Yansıtmak;**

> **Uyarı Sayısı:** \`Uyarı yok, direkt ceza uygulanır!\`
> **Ceza Bilgi:** \`Şakası olmamak üzere AF'ta yoktur!\`
> **Ceza Süresi:** \`7 Gün Jail\`

**Oda/Sunucu Trollemek;**

> **Uyarı Sayısı:** \`Uyarı yok, direkt ceza uygulanıyor!\`
> **Ceza Bilgi:** \`Her türlü iması ve şakası yasaktır! (Kayıt kanallarında trol yapılıyorsa cezası sunucudan yasaklanmaktır.)\`
> **Ceza Süresi:** \`Sınırsız Jail\`


**Kişilerin İç/Dış Görünüşlerini Yargılamak/Dalga Geçmek;**

> **Uyarı Sayısı:** \`Uyarı yok, direkt ceza uygulanır!\`
> **Ceza Bilgi:** \`Her türlü iması ve şakası yasaktır!\`
> **Ceza Süresi:** \`Sınırsız Jail\`

**Sunucu Düzenini Bozmak;**

> **Uyarı Sayısı:** \`Uyarı yok, direkt ceza uygulanır!\`
> **Ceza Bilgi:** \`Her türlü iması ve şakası yasaktır!\`
> **Ceza Süresi:** \`Sınırsın Jail\`

`);
    
if (bilgisys.values[0] === "sc") 

{bilgisys.reply({ embeds:[sc] ,ephemeral: true })};

//*-----------------------------------------------------------*//

const cc = new Discord.MessageEmbed()
.setColor("RANDOM")
.setAuthor(`Chat Ceza Bilgilendirme Menüsü`)
.setDescription(`
**Küfür;**

**Uyarı Sayısı:** \`1\`
**Ceza Bilgi:** \`Her türlüsü ve her türlü iması yasaktır!\`
Ceza Süresi: \`20 Dakika Mute\`
Tekrar Süresi: \`1 Saat Mute\`
Tekrar Süresi: \`3 Saat Mute\`

Kışkırtma/Argo/Hakaret;

Uyarı Sayısı: \`1\`
Ceza Bilgi: \`Şaka dahi olsa AF yoktur!\`
Ceza Süresi: \`15 Dakika Mute\`
Tekrar Süresi: \`45 Dakika Mute\`
Tekrar Süresi: \`2 Saat Mute\`

Ailevi/Abartı Küfür;

Uyarı Sayısı: \`Uyarı yok, direkt ceza uygulanır!\`
Ceza Bilgi: \`Her türlüsü ve her türlü iması yasaktır!\`
Ceza Süresi: \`2 Saat Mute\`
Tekrar Süresi: \`6 Saat Mute\`
Tekrar Süresi: \`12 Saat Mute\`

Kavga Etmek veya Çıkarmak;

Uyarı Sayısı: \`1\`
Ceza Bilgi: \`Her türlü iması ve şakası yasaktır!\`
Ceza Süresi: \`4 Saat Mute\`
Tekrar Süresi: \`12 Saat Mute\`
Tekrar Süresi: \`24 Saat Mute\`

Din/Dil/Irk Ayrımı Yapmak/Hakaret Etmek;

Uyarı Sayısı: \`1
Ceza Bilgi: \`Her türlü iması ve şakası yasaktır!\`
Ceza Süresi: \`1 Gün Mute\`
Tekrar Süresi: \`2 Gün Jail\`
Tekrar Süresi: \`7 Gün Jail\`

Cinsel/Din/Irk/Siyaset V.b Konular Açmak;

Uyarı Sayısı: \`1\`
Ceza Bilgi: \`Her türlü iması ve şakası yasaktır!\`
Ceza Süresi: \`6 Saat Mute\`
Tekrar Süresi: \`1 Gün Mute\`
Tekrar Süresi: \`3 Gün Mute\`

Flood/Spam/Capslock/Harf Uzatma;

Uyarı Sayısı: \`1\`
Ceza Bilgi: \`Harf uzatma sınırı '16' - Şakası bile yasaktır!\`
Ceza Süresi: \`10 Dakika Mute\`
Tekrar Süresi: \`30 Dakika Mute\`
Tekrar Süresi: \`1 Saat Mute\`

Metin Kanallarını Amacı Dışında Kullanmak;

Uyarı Sayısı: \`1\`
Ceza Bilgi: \`Şakası bile yasaktır!\`
Ceza Süresi: \`10 Dakika Mute\`
Tekrar Süresi: \`30 Dakika Mute\`
Tekrar Süresi: \`1 Saat Mute\`

Yasaklı(+18, Cinsel, Kan, Vahşet) Fotoğraf Video Paylaşımı;

Uyarı Sayısı: \`Uyarı yok, direkt ceza uygulanır!\`
Ceza Bilgi: \`Her türlü iması ve şakası yasaktır!\`
Ceza Süresi: \`6 Saat mute\`
Tekrar Süresi: \`1 Gün Jail\`
Tekrar Süresi: \`7 Gün Jail\`

`);

if (bilgisys.values[0] === "cc") {
    {bilgisys.reply({ embeds:[cc] ,ephemeral: true })};
}
//*-----------------------------------------------------------*//
  
const scb = new Discord.MessageEmbed()
.setColor("RANDOM")
.setAuthor(`Voice Ceza Bilgilendirme Menüsü`)
.setDescription(`
Küfür;

Uyarı Sayısı: 1
Ceza Bilgi: Her türlüsü ve her türlü iması yasaktır!
Ceza Süresi: 20 Dakika mute
Tekrar Süresi: 1 Saat Mute
Tekrar Süresi: 3 Saat Mute

Kışkırtma/Argo/Hakaret;

Uyarı Sayısı: 1
Ceza Bilgi: Şaka dahi olsa AF yoktur!
Ceza Süresi: 15 Dakika Mute
Tekrar Süresi: 45 Dakika Mute
Tekrar Süresi: 2 Saat Mute

Ailevi/Abartı Küfür;

Uyarı Sayısı: Uyarı yok, direkt ceza uygulanır!
Ceza Bilgi: Her türlüsü ve her türlü iması yasaktır!
Ceza Süresi: 2 Saat Mute
Tekrar Süresi: 6 Saat Mute
Tekrar Süresi: 12 Saat Mute

Kavga Etmek veya Çıkarmak;

Uyarı Sayısı: 1
Ceza Bilgi: Her türlü iması ve şakası yasaktır!
Ceza Süresi: 4 Saat Mute
Tekrar Süresi: 12 Saat Mute
Tekrar Süresi: 24 Saat Mute

Din/Dil/Irk Ayrımı Yapmak/Hakaret Etmek;

Uyarı Sayısı: 1
Ceza Bilgi: Her türlü iması ve şakası yasaktır!
Ceza Süresi: 1 Gün Mute
Tekrar Süresi: 2 Gün Jail
Tekrar Süresi: 7 Gün Jail

Cinsel/Din/Irk/Siyaset V.b Konular Açmak;

Uyarı Sayısı: 1
Ceza Bilgi: Her türlü iması ve şakası yasaktır!
Ceza Süresi: 6 Saat Mute
Tekrar Süresi: 1 Gün Mute
Tekrar Süresi: 7 Gün Mute

`);

if (bilgisys.values[0] === "scb") {
   {bilgisys.reply({ embeds:[scb] ,ephemeral: true })};

};

if (bilgisys.values[0] === "kurallar") {
const kurallar = new Discord.MessageEmbed()
.setColor("#2f3136")
.setAuthor({ name: `${bilgisys.guild.name} / KURALLAR`,iconURL: bilgisys.guild.iconURL({ dynamic: true }) })
.setDescription(`
\`\`\`    ឵឵           KURAL BİLGİLENDİRME MENÜSÜ \`\`\`
__**Reklam**__
\`\`\`fix
> • Sözlü reklamlar, link ile reklam, özelden reklam, resim ile reklam ve benzeri şekilde reklamlar yapmak yasaktır.
\`\`\`
__**Küfür, Argo, Hakaret**__
\`\`\`fix
> • Her kanalda küfür etmek ve argo kullanmak yasaktır.
> • Üyelere karşı hakaret etmek ve dalga geçme yasaktır.
\`\`\`
__**Yetkililer ve Yetki**__
\`\`\`fix
> • Yetki istemek yasaktır.
> • Yetkili alımları ile ilgili soru sormak yasaktır.
> • Yetkilileri boş yere @etiketlemek ve @etiketleyerek spam yapmak yasaktır.
> • Yetkililere saygılı olun.
\`\`\`
__**Spam, Flood, Etiketleme**__
\`\`\`fix
> • Spam yapmak yasaktır.
> • Bir kelimeyi sürekli bir mesajda yazmak yasaktır.
> • Flood yapmak alt alta yazmak yasaktır.
> • Bir üyeyi sürekli @etiketlemek yasaktır.
\`\`\`
__**Din, Siyaset, Cinsellik**__
\`\`\`fix
> • Din ile ilgili konuşmak, tartışmak, kullanıcı adlarını din ile ilgili koymak yasaktır.
> • Siyaset ile ilgili konuşmak, tartışmak, kullanıcı adlarını siyaset ile ilgili koymak yasaktır.
> • 18+ fotoğraflar paylaşmak ve konuşmak yasaktır.
\`\`\`
__**Kavga, Tartışmak**__
\`\`\`fix
> • Kavga etmek, kavgaya dahil olmak ve tartışmak yasaktır.
> • Herhangi bir sorununuz varsa yetkiliye danışınız\`\`\`
\`\`\`diff
- Yukarıda Belirtmiş Olduğumuz Kurallar Harici İnsanlığa Sığmayacak Davranışlar Ve Benzeri Şeyler Kesinlikle Yasaktır\`\`\`
`);
bilgisys.reply({ embeds:[kurallar] ,ephemeral: true })

}
        
    if(bilgisys.values[0] === "tagbilgi"){
		const tagbilgi = new Discord.MessageEmbed()
.setColor("#2f3136")
.setAuthor(`▬▬▬▬▬▬▬▬▬▬▬▬・Tag Avantajları・▬▬▬▬▬▬▬▬▬▬▬▬▬`)
.setDescription(`

:balloon: - Taglı Arkadaşlara Özel Metin Ve Ses Kanalları

:balloon: - Çekilişlerde Ve Etkinliklerde Daha Fazla Avantaj

:balloon: - Sunucumuzda Kolay Bir Şekilde Yetkili Olabilirsin

:balloon: - Tagımızı Alan Üyeler (<@&${conf.ekipRolu}>) Rolüne Sahip Olurlar Bu Sayede Diğer Üyelerden Ayrı Ve Daha Yukarda Dururlar.

:balloon: - Tag Alan Arkadaşlar İçin Özel Çekilişler Ve Etkinlikler

\`Tag Nedir  ?\`

:balloon: - Tag Her Sunucunun Kendisini Temsil Etmesi İçin Birtakım Sembol Veya Sayıdan Oluşan Bir Takım İşarettir

\`Peki Nasıl alırım ?\`

:balloon: - Ayarlar Kısmından Kullanıcı Adınıza (\`${conf.tag}\`) Ekleyerek Kolay Bir Şekilde Sende Aramıza Katılabilirsin

`);

  
     await bilgisys.reply({embeds: [tagbilgi],ephemeral: true});
    }

    if(bilgisys.values[0] === "kayitbilgi"){

		const kayaıtbilgi = new Discord.MessageEmbed()
.setColor("#2f3136")
.setAuthor(`Kayıt Sistemi Hakkında Bilgi`)
.setDescription(`

Selam Yetkili Arkadaşlar Register Komutları Hakkında Bilgileri Buradan Öğrenebilirsiniz

**.k / .e @üye İsmi Yaşı** Bu Komut Kayıt Komutudur Butonludur Kayıt Ettikten Sonra Butonlara Basıp Kişinin Cinsiyetini Seçmelisiniz 

Bu Komut Sadece 
hesperos-register
Kanalında Çalışmaktadır

**.topteyit** Sunucudaki Yetkililerin Kayıt Listesini Gösterir

**.teyitler / .kayıtsayı** Kaydettiğiniz Üyelerin Sayısını Verir

Bu Komutları Sadece 
bot-commands
 
yetkili-commands
Kanalında Kullanabilirsiniz

**.cinsiyet @üye** Bu Komut İle Yanlış Cinsiyette Kaydettiğiniz Kişilerin Cinsiyetini Kolaylık İle Değiştirmenize Yaramakta 

`);

  
     await bilgisys.channel.wsend({embeds: [kayaıtbilgi]});

    }

    if(bilgisys.values[0] === "boostbilgi"){

		const boostbilgi = new Discord.MessageEmbed()
.setColor("#2f3136")
.setAuthor(`▬▬▬▬▬▬▬▬▬▬▬▬・Boost Avantajları・▬▬▬▬▬▬▬▬▬▬▬▬▬`)
.setDescription(`

:money_with_wings: - Booster Arkadaşlara Özel Ses Ve Metin Kanalları.

:money_with_wings: - Boost Basan Kişilere (<@&${conf.ekipRolu}>) Rol Ü Verilir Ve Diğer Üyelerden Daha Üstte Ve Ön Planda Dururusunuz.

:money_with_wings: - Boosterlar Çekiliş Ve Etkinliklerde Daha Fazla Şans Ve Avantaja Sahip Olurlar

:money_with_wings: - Boost Basan Arkadaşlara Sunucu İçerisinde İstediği Şekilde İsim Değiştirme Hakkı Tanınır.
(İnvite Linki / +18 İçerik / Küfürlü Kelime Karakterleri Yasaktır)

:money_with_wings: - Booster Arkadaşlara Özel Etkinlikler Ve Çekilişlerimiz Vardır

:money_with_wings: - Booster Arkadaşlara İsteği Üzerine Ve Owner Arkadaşlar Onaylar İse Özel Rol Verilebilir

`);

  
     await bilgisys.reply({embeds: [boostbilgi],ephemeral: true });

    }

    if(bilgisys.values[0] === "ytkural"){
bilgisys.delete()
		const ytkurallar = new Discord.MessageEmbed()
.setColor("#2f3136")
.setAuthor(`▬▬▬▬▬▬▬▬▬▬▬▬・Yetkili Kurallar・▬▬▬▬▬▬▬▬▬▬▬▬▬`)
.setDescription(`

1 - Yetkililer Kesinlikle Yetki Dilenemez

2 - Yetkililer Başka Bir Kişiye İftira Ve Yalan Söyleyemez

3 - Yetkililer Kesinlikle Sunucu İçi Hakaret Söylemi Küfürlü Kelimeler Kullanamaz

4 - Yetkili Arkadaşlar Ben Dahi Sunucuda Tanıdığınız Birine Kıyak Torpil Vb Vb Kesinlikle Olmasın

5 - Yetkililer Verilen Terfiler Ve Yt Düşürmeleri Ne Karışamaz (Haksız Buluyorsanız Karışabilirsiniz)

6 - Orta Ve Üst Yt De Bulunan Yetkili Arkadaşlar Kesinlikle Farklı Bir Sunucuda Yetkili Olamaz Ve Farklı Bir Tag Kullanamazlar

7 - Yetkililer Kesinlikle Birbiri İle Kavga Etmemeli Ve Birbirlerine Hakaret Söylemi Aşşalayıcı Kelimeler Kullanmamalıdır Bu Durumun Yaşanması Durumunda Olaya Karışan Tüm Yetkililer Cezalandırılı Yada Yetkileri Bir Süreliğine Çekilir Ve Bir Günlük Zaman Aşımı Yerler

8 - Kayıt Kanalında Gelen Troll Kullanıcılara Hakaret Eyliminde Bulunmayıp Direkt Karantina Yani Jail Yetkisi Olan Birisini Çağırıp Karantinaya Atırmalıdırlar

**NOT BURAYI OKUMADAN GEÇME**

**SUNUCUMUZDA YETKİLİ VE YETKİ KAVGALARI KESİNLİKLE OLMAMALIDIR SUNUCUMUZUN ASIL AMACI YETKİ DEİL SOHBET MUHHABBET VE DOSTLUKTUR KURALLAR DIŞINDA HAKARET EYLİMİ GÖSTERECEK İFTİRA TACİZ TEHDİT VE KÜÇÜMSEME KESİNLİKLE YASAKTIR**

`);

     await bilgisys.channel.wsend({embeds: [ytkurallar]});
    }
//////////// --------------- TÜRKİYE KISMI --------------- ////////////

if(bilgisys.values[0] === "istiklalm") {
await bilgisys.deferUpdate();

		const istiklalmembed = new Discord.MessageEmbed()
.setColor("#2f3136")
.setAuthor(`▬▬▬▬▬▬▬▬▬▬▬▬・İSTİKLAL MARŞI・▬▬▬▬▬▬▬▬▬▬▬▬▬`)
.setDescription(`
Korkma, sönmez bu şafaklarda yüzen al sancak;
Sönmeden yurdumun üstünde tüten en son ocak.
O benim milletimin yıldızıdır, parlayacak;
O benimdir, o benim milletimindir ancak.

Çatma, kurban olayım, çehreni ey nazlı hilâl!
Kahraman ırkıma bir gül! Ne bu şiddet, bu celâl?
Sana olmaz dökülen kanlarımız sonra helâl...
Hakkıdır, Hakk'a tapan, milletimin istiklâl!

Ben ezelden beridir hür yaşadım, hür yaşarım.
Hangi çılgın bana zincir vuracakmış? Şaşarım!
Kükremiş sel gibiyim, bendimi çiğner, aşarım.
Yırtarım dağları, enginlere sığmam, taşarım.

Garbın âfâkını sarmışsa çelik zırhlı duvar,
Benim iman dolu göğsüm gibi serhaddim var.
Ulusun, korkma! Nasıl böyle bir îmânı boğar,
"Medeniyet!" dediğin tek dişi kalmış canavar?

Arkadaş! Yurduma alçakları uğratma, sakın.
Siper et gövdeni, dursun bu hayâsızca akın.
Doğacaktır sana va'dettiği günler Hakk'ın...
Kim bilir, belki yarın, belki yarından da yakın.

Bastığın yerleri "toprak!" diyerek geçme, tanı:
Düşün altındaki binlerce kefensiz yatanı.
Sen şehid oğlusun, incitme, yazıktır, atanı:
Verme, dünyaları alsan da, bu cennet vatanı.

Kim bu cennet vatanın uğruna olmaz ki fedâ?
Şühedâ fışkıracak toprağı sıksan, şühedâ!
Cânı, cânânı, bütün varımı alsın da Huda,
Etmesin tek vatanımdan beni dünyada cüdâ.

Ruhumun senden, İlâhi, şudur ancak emeli:
Değmesin mabedimin göğsüne nâ-mahrem eli.
Bu ezanlar -ki şehadetleri dînin temeli-
Ebedî yurdumun üstünde benim inlemeli.

O zaman vecd ile bin secde eder -varsa- taşım,
Her cerîhamdan, İlâhi, boşanıp kanlı yaşım,
Fışkırır ruh-ı mücerred gibi yerden na'şım;
O zaman yükselerek arşa değer belki başım.

Dalgalan sen de şafaklar gibi ey şanlı hilâl!
Olsun artık dökülen kanlarımın hepsi helâl.
Ebediyen sana yok, ırkıma yok izmihlâl:
Hakkıdır, hür yaşamış, bayrağımın hürriyet;
Hakkıdır, Hakk'a tapan, milletimin istiklâl!
`)
.setFooter({ text: `Yazarı : Mehmet Akif Ersoy` });


bilgisys.followUp({ embeds: [istiklalmembed], ephemeral: true });
}

if(bilgisys.values[0] === "ghitabe") {
await bilgisys.deferUpdate();

		const ghitabeembed = new Discord.MessageEmbed()
.setColor("#2f3136")
.setAuthor(`▬▬▬▬▬▬▬▬▬▬・Atatürk'ün Gençliğe Hitabesi・▬▬▬▬▬▬▬▬▬▬`)
.setDescription(`
Ey Türk Gençliği!

Birinci vazifen, Türk istiklâlini, Türk Cumhuriyetini, ilelebet, muhafaza ve müdafaa etmektir.

Mevcudiyetinin ve istikbalinin yegâne temeli budur. Bu temel, senin, en kıymetli hazinendir. İstikbalde dahi, seni bu hazineden mahrum etmek isteyecek, dahilî ve haricî bedhahların olacaktır. Bir gün, İstiklâl ve Cumhuriyeti müdafaa mecburiyetine düşersen, vazifeye atılmak için, içinde bulunacağın vaziyetin imkân ve şerâitini düşünmeyeceksin! Bu imkân ve şerâit, çok nâmüsait bir mahiyette tezahür edebilir. İstiklâl ve Cumhuriyetine kastedecek düşmanlar, bütün dünyada emsali görülmemiş bir galibiyetin mümessili olabilirler. Cebren ve hile ile aziz vatanın, bütün kaleleri zaptedilmiş, bütün tersanelerine girilmiş, bütün orduları dağıtılmış ve memleketin her köşesi bilfiil işgal edilmiş olabilir. Bütün bu şerâitten daha elîm ve daha vahim olmak üzere, memleketin dahilinde, iktidara sahip olanlar gaflet ve dalâlet ve hattâ hıyanet içinde bulunabilirler. Hattâ bu iktidar sahipleri şahsî menfaatlerini, müstevlilerin siyasi emelleriyle tevhit edebilirler. Millet, fakr ü zaruret içinde harap ve bîtap düşmüş olabilir.

Ey Türk istikbalinin evlâdı! İşte, bu ahval ve şerâit içinde dahi, vazifen; Türk İstiklâl ve Cumhuriyetini kurtarmaktır! Muhtaç olduğun kudret, damarlarındaki asil kanda mevcuttur!
`)
.setFooter({ text: `Mustafa Kemal Atatürk (20 Ekim 1927)` });


bilgisys.followUp({ embeds: [ghitabeembed], ephemeral: true });
}

if(bilgisys.values[0] === "andımız") {
await bilgisys.deferUpdate();

		const andımızembed = new Discord.MessageEmbed()
.setColor("#2f3136")
.setAuthor(`▬▬▬▬▬▬▬▬▬▬▬▬・Öğrenci Andımız・▬▬▬▬▬▬▬▬▬▬▬▬▬`)
.setDescription(`
Türküm, doğruyum, çalışkanım.
İlkem; küçüklerimi korumak,
büyüklerimi saymak,
yurdumu, milletimi özümden çok sevmektir.
Ülküm; yükselmek, ileri gitmektir.
Ey büyük Atatürk!
Açtığın yolda, gösterdiğin hedefe, hiç durmadan yürüyeceğime and içerim.
Varlığım, Türk varlığına armağan olsun.
Ne mutlu Türküm diyene!

`)
.setFooter({ text: `1997 2.Defa Değiştirilmiştir` });


bilgisys.followUp({ embeds: [andımızembed], ephemeral: true });
}

//////////// --------------- TÜRKİYE KISMI --------------- ////////////

//////////// --------------- ANMA VE KUTLAMA GÜNLERİ KISMI --------------- ////////////

if(bilgisys.values[0] === "ocak") {
await bilgisys.deferUpdate();

const ocak = new Discord.MessageEmbed()
.setColor("#2f3136")
.setFooter({ text: `Kaynak: T.C. Başbakanlık Basın-Yayın ve Enformasyon Genel Müdürlüğü` })
.setAuthor(`▬▬▬▬▬▬▬▬▬▬▬▬・OCAK AYI・▬▬▬▬▬▬▬▬▬▬▬▬▬`)
.setDescription(`
Osmaniye Kadirli Turp Festivali - Osmaniye / Kadirli	6-7 Ocak
Verem Haftası	7-13 Ocak
Beyaz Baston Körler Haftası	7-14 Ocak
Çalışan Gazeteciler Günü	10 Ocak
İdareciler Günü	10 Ocak
Orgeneral Ali Fuat Cebesoy’u Anma Günü - Sakarya / Geyve	10 Ocak
Enerji Tasarrufu Haftası	Ocak'ın 2.haftası
Ali Emiri Efendiyi Anma Günü - Diyarbakır	23 Ocak
Cüzzam Haftası	25-31 Ocak
Dünya Gümrük Günü	26 Ocak
Atatürk’ün Gaziantep’e Gelişi - Gaziantep	26 Ocak
Atatürk’ün Narlı’ya Gelişi - K. Maraş / Pazarcık	26 Ocak
Kazım Karabekir Paşa’yı Anma Günü - Karaman / Kazım Karabekir	26 Ocak
Kazım Karabekir Paşa’yı Anma Günü - Kars	26 Ocak
Atatürk’ün Silifke’ye Gelişi - İçel	27 Ocak
`);

bilgisys.followUp({ embeds: [ocak], ephemeral: true });
}


if(bilgisys.values[0] === "şubat") {
await bilgisys.deferUpdate();

		const şubat = new Discord.MessageEmbed()
.setColor("#2f3136")
.setFooter({ text: `Kaynak: T.C. Başbakanlık Basın-Yayın ve Enformasyon Genel Müdürlüğü` })
.setAuthor(`▬▬▬▬▬▬▬▬▬▬▬▬・ŞUBAT AYI・▬▬▬▬▬▬▬▬▬▬▬▬▬`)
.setDescription(`
Dünya Kanser Günü	4 Şubat
Atatürk’ün Gelişini Anma Günü - Aydın / Kuşadası	4 Şubat
Atatürk’ün Gelişini Anma Günü - Denizli	4 Şubat
Atatürk’ün Gelişini Anma Günü - Niğde	5 Şubat
Atatürk'ün Gelişini Anma Günü - Balıkesir	6 Şubat
Gaziantep’e Gazilik Unvanının Verilişi - Gaziantep	8 Şubat
Dünya Sigarayı Bırakma Günü	9 Şubat
Atatürk’ün Gelişini Anma Günü - Malatya	13 Şubat
Sevgililer Günü	14 Şubat
Atatürk'ün Gelişini Anma Günü - Antalya / Alanya	18 Şubat
Atatürk'ün Gelişini Anma Günü - Aydın	24 Şubat
Aşık Şenlik Şenliği - Ardahan / Çıldır	25 Şubat
Sivil Savunma Günü	28 Şubat
Uluslararası Kar Şenliği - Kayseri / Erciyes Şubat içinde
`);

bilgisys.followUp({ embeds: [şubat], ephemeral: true });
}

if(bilgisys.values[0] === "mart") {
await bilgisys.deferUpdate();

		const mart = new Discord.MessageEmbed()
.setColor("#2f3136")
.setFooter({ text: `Kaynak: T.C. Başbakanlık Basın-Yayın ve Enformasyon Genel Müdürlüğü` })
.setAuthor(`▬▬▬▬▬▬▬▬▬▬▬▬・MART AYI・▬▬▬▬▬▬▬▬▬▬▬▬▬`)
.setDescription(`
Muhasebeciler Günü	1 Mart
Yeşilay Haftası	1-7 Mart
Hatay Devlet Başkanı Tayfur Sökmen’in ölüm yıldönümü - Hatay	3 Mart
Atatürk'ün Gelişini Anma Günü - Antalya	6 Mart
Dünya Kadınlar Günü	8 Mart
Atatürk'ün Aspendos’a Gelişi - Antalya / Serik	9 Mart
Tıp Bayramı	14 Mart
Dünya Tüketiciler Günü	15 Mart
Atatürk'ün Gelişini Anma Günü - Adana	15 Mart
Akköy Yağlı Pehlivan Güreşleri - Denizli	15-25 Mart
Atatürk'ün Gelişini Anma Günü - İçel / Tarsus	16 Mart
Atatürk'ün Gelişini Anma Günü - İçel	17 Mart
Şehitler Günü	18 Mart
Çanakkale Zaferi'ni Anma Günü - Çanakkale	18 Mart
Yaşlılar Haftası	18-24 Mart
Nevruz Bayramı	21 Mart
Dünya Ormancılık Günü (*)	21 Mart
Dünya Şiir Günü	21 Mart
Dünya Su Günü	22 Mart
Dünya Meteoroloji Günü	23 Mart
Ziya Gökalp’in Doğumunu Anma Günü - Diyarbakır	23 Mart
Dünya Tüberküloz Günü	24 Mart
Atatürk'ün Gelişini Anma Günü - Kütahya	24 Mart
Dünya Tiyatrolar Günü	27 Mart
Dünya Demiryolu Çalışanları Günü	27 Mart
Kütüphane Haftası	Mart'ın son haftası
Vergi Haftası	Mart'ın son haftası
`);

bilgisys.followUp({ embeds: [mart], ephemeral: true });
}

if(bilgisys.values[0] === "nisan") {
await bilgisys.deferUpdate();

		const nisan = new Discord.MessageEmbed()
.setColor("#2f3136")
.setFooter({ text: `Kaynak: T.C. Başbakanlık Basın-Yayın ve Enformasyon Genel Müdürlüğü` })
.setAuthor(`▬▬▬▬▬▬▬▬▬▬▬▬・NİSAN AYI・▬▬▬▬▬▬▬▬▬▬▬▬▬`)
.setDescription(`
İnönü Zaferleri - Eskişehir	1 Nisan
Çukurova’da Milli Mücadelenin Başlangıç Günü - Adana	1 Nisan
Kanserle Savaş Haftası	1-7 Nisan
Avukatlar Günü	5 Nisan
Atatürk'ün, Diyarbakır'ın Fahri Hemşehrisi Oluşunu Anma Günü - Diyarbakır	5 Nisan
Bursa'nın Fethi - Bursa	5 Nisan
Dünya Sağlık Günü	7 Nisan
Gazi Günü - Bartın	8 Nisan
Sağlık Haftası	8-14 Nisan
Polis Teşkilatının Kuruluşu	10 Nisan
Turizm Haftası	15-22 Nisan
Ebeler Haftası	21-28 Nisan
Ulusal Egemenlik ve Çocuk Bayramı	23 Nisan
Uluslararası 23 Nisan Çocuk Şenlikleri	23 Nisan
Pilotlar Günü	26 Nisan
Uluslararası NYSA Kültür ve Sanat Festivali - Aydın / Sultanhisar	28-30 Nisan
Dünya Dans Günü	29 Nisan
Lale Festivali - Muş	29-30 Nisan
Demre Festivali - Antalya / Demre	Nisan’ın son haftası
Mesir Şenlikleri - Manisa	Nisan içinde
`);

bilgisys.followUp({ embeds: [nisan], ephemeral: true });
}

if(bilgisys.values[0] === "mayıs") {
await bilgisys.deferUpdate();

		const mayıs = new Discord.MessageEmbed()
.setColor("#2f3136")
.setFooter({ text: `Kaynak: T.C. Başbakanlık Basın-Yayın ve Enformasyon Genel Müdürlüğü` })
.setAuthor(`▬▬▬▬▬▬▬▬▬▬▬▬・MAYIS AYI・▬▬▬▬▬▬▬▬▬▬▬▬▬`)
.setDescription(`
Emek ve Dayanışma Günü	1 Mayıs
Çilek, Tarım, Kültür ve Sanat Festivali - Aydın / Sultanhisar	1-5 Mayıs
Kültür ve Bahar Bayramı - Aydın / Koçarlı	1-5 Mayıs
Dünya Basın Özgürlüğü Günü	3 Mayıs
Dünya Astım Günü	3 Mayıs
İş Sağlığı ve Güvenliği Haftası	4-10 Mayıs
Lale Şenlikleri - Ankara / Sincan	5-7 Mayıs
Hıdrellez	6 Mayıs
Yunus Emre Kültür ve Sanat Haftası - Eskişehir	6-10 Mayıs
Kan Haftası	6-12 Mayıs
Beymelek Bahar Şenliği - Antalya / Kale	6-26 Mayıs
Karayolu Güvenliği ve Trafik Haftası	Mayıs’ın ilk cumartesi günüyle başlayan hafta
İstatistik Günü	9 Mayıs
Avrupa Günü	9 Mayıs
Uluslar Arası Yat Festivali - Muğla / Marmaris	Mayıs’ın 2. haftası
Sakatlar Haftası	10-16 Mayıs
Türk Dil Bayramı ve Yunus Emre'yi Anma Törenleri - Karaman	12-13 Mayıs
Hemşirelik Haftası	12-18 Mayıs
Türk Dil Bayramı	13 Mayıs
Dünya Eczacılık Günü	14 Mayıs
Dünya Çiftçiler Günü	14 Mayıs
Afrodisias Kültür ve Sanat Festivali - Aydın / Karacasu	14 Mayıs
Anneler Günü	Mayıs'ın 2. pazarı
Yeryüzü İklim Günü	15 Mayıs
Hava Şehitlerini Anma Günü	15 Mayıs
Batman’ın İl Oluşu - Batman	16 Mayıs
Dünya Telekomünikasyon Günü	17 Mayıs
Bayramiç Panayırı - Çanakkale / Bayramiç	17-20 Mayıs
Müzeler Haftası	18-24 Mayıs
Atatürk'ü Anma ve Gençlik ve Spor Bayramı	19 Mayıs
Denizli Belediyesi Amatör Tiyatrolar Festivali - Denizli	19-23 Mayıs
Gençlik Haftası	19-25 Mayıs
25 Mayıs Atatürk’ü Anma ve Kutlama Festivali - Samsun / Havza	19-25 Mayıs
Uluslar Arası Karadeniz Giresun Aksu Festivali - Giresun	20-23 Mayıs
Dünya Süt Günü	21 Mayıs
Uluslar Arası Agamemnon Kültür ve Sanat Festivali - İzmir / Balçova	21-25 Mayıs
Ayazma Şenlikleri - Gümüşhane	Mayıs’ın 3. haftası
Karagöz Kültür Sanat ve Kakava Festivali - Kırklareli	Mayıs’ın 3. haftası
Döşemealtı Halı Festivali - Antalya / Yeniköy	Mayıs’ın 3. haftası
Milli Mücadeleye Katılmayı Anma Günü - Denizli / Sarayköy	24 Mayıs
Türkler’in Rumeli’ye Çıkışları - Çanakkale / Gelibolu	26-28 Mayıs
Milli Mücadelede Düşmana Ayvalık’ta Atılan İlk Kurşun - Balıkesir / Ayvalık	29 Mayıs
İstanbul’un Fethi - İstanbul	29 Mayıs
Açlıkla Mücadele Haftası	30 Mayıs-5 Haziran
Dünya Sigarasız Günü	31 Mayıs
Dünya Hostesler Günü	31 Mayıs
Antiocheia Kültür ve Sanat Festivali - Isparta / Yalvaç	Mayıs içinde
`);

bilgisys.followUp({ embeds: [mayıs], ephemeral: true });
}

if(bilgisys.values[0] === "haziran") {
await bilgisys.deferUpdate();

		const haziran = new Discord.MessageEmbed()
.setColor("#2f3136")
.setAuthor(`▬▬▬▬▬▬▬▬▬▬▬▬・HAZİRAN AYI・▬▬▬▬▬▬▬▬▬▬▬▬▬`)
.setDescription(`
Dünya Çevre Günü	5 Haziran
Geleneksel Pilav Günü - Sakarya / Taraklı	Haziran’ın ilk pazarı
Çilek Festivali Kültür ve Turizm Etkinlikleri Haftası - Bartın	Haziran’ın ilk haftası
Kelha Rebeta Şenlikleri - Batman / Kozluk	Haziran’ın ilk haftası
Sivaslı Çilek Festivali - Uşak / Sivaslı	Haziran’ın ilk haftası
Karagöl Şenlikleri - Bolu / Kıbrıscık	Haziran’ın ilk haftası
Uluslararası Bergama Kermesi - İzmir / Bergama	Haziran’ın ilk haftası
Aladağ Şenlikleri - Karabük	Haziran’ın ilk haftası
Düzce Uluslararası Halk Oyunları ve Turizm Festivali - Düzce	Haziran’ın 1. hafta sonu
Yayla Şenliği - Konya / Sarayönü	1-7 Haziran
Uluslararası Bandırma Kuş Cenneti Kültür ve Turizm Festivali - Balıkesir / Bandırma	1-10 Haziran
Uluslararası Bursa Festivali - Bursa	1 Haziran-12 Temmuz
Yeşili Kiraz Festivali - Mardin / Yeşili	5-6 Haziran
Çaybaşı Köyü Kültür Dayanışma Yayla Şenliği - Kastamonu / Tosya	6 Haziran
Kiraz Festivali - Tekirdağ	Haziran’ın 2. haftası
Uluslararası Karadeniz Ereğli Osmanlı Çileği Kültür Festivali - Zonguldak	Haziran’ın 2. haftası
Kayısı Bayramı - İçel / Mut	Haziran’ın 2. haftası
Karagöz Kültür Şenliği - Bursa / Orhaniye	Haziran’ın 2. haftası
Kiraz Şenliği - Çanakkale / Lapseki	Haziran’ın 2. haftası
Nasrettin Hoca Doğum Şenlikleri - Eskişehir	8-10 Haziran
Şeref ve Kahramanlık Günü - İnebolu	9 Haziran
Karacaoğlan Kültür ve Sanat Festivali - İçel / Mut	9-11 Haziran
Honaz Kiraz Festivali - Denizli / Honaz	10-11 Haziran
İmamoğlu Şeftali Festivali - Adana / İmamoğlu	10-12 Haziran
Yozgat Sürmeli Festivali - Yozgat	10-15 Haziran
Gül Bayramı - Konya	12 Haziran
Kiraz Festivali - Tokat / Zile	12-14 Haziran
Atatürk Kültür ve Sanat Haftası - Amasya	12-22 Haziran
Atatürk’ün Bergama’ya Gelişi - İzmir / Bergama	13 Haziran
Hasanbeyli Kiraz Festivali - Osmaniye / Hasanbeyli	13 Haziran
Hazar Şiir Akşamları - Elazığ / Sivrice	13-15 Haziran
Rize Çay ve Turizm Festivali - Rize	Haziran’ın 3. haftası
Fakıbey Şenlikleri - Yozgat / Yenifakılı	16 Haziran
Dünya Çölleşme ve Kuraklıkla Mücadele Günü	17 Haziran
Çömlekçilik Festivali - Niğde / Altunhisar	17 Haziran
Yeşilyurt Kiraz, Kültür, Sanat ve Spor Şenlikleri - Malatya / Yeşilyurt	17-18 Haziran
Karakucak Güreşleri ve Efkari Şenliği - Artvin / Ardanuç	18-25 Haziran
Dünya Mülteciler Günü	20 Haziran
Atatürk’ün İzinde-Gölgesinde Damal Şenlikleri - Ardahan / Damal	20 Haziran
Atatürk’ün Eskişehir’e Gelişi - Eskişehir	21 Haziran
Zonguldak’ın Kurtuluşu ve Uzun Mehmet’i Anma Günü - Zonguldak	21 Haziran
Eldivan Kiraz Festivali ve Geleneksel Yağlı Güreşler - Çankırı / Eldivan	21-23 Haziran
Ağrı Dağı Festivali - Iğdır	22 Haziran
Aşık Veysel Kültür Festivali - Sivas / Sarkışla	22-23 Haziran
Pamukkale Kültür ve Müzik Festivali - Denizli	22-27 Haziran
Babalar Günü	Haziran'ın 3. pazarı
Boduroğlu Yayla Şenlikleri - Karabük / Ovacık	Haziran’ın son haftası
Çorlu Kültür ve Sanat Festivali - Tekirdağ / Çorlu	Haziran’ın son haftası
Baba Hızır Hz. Anma Günü - Bolu / Mengen	Haziran’ın son pazarı

`);
		const haziran2 = new Discord.MessageEmbed()
.setColor("#2f3136")
.setFooter({ text: `Kaynak: T.C. Başbakanlık Basın-Yayın ve Enformasyon Genel Müdürlüğü` })
.setDescription(`
Gezin Çilek Festivali - Elazığ / Gezin	23 Haziran
Uluslararası Hitit Fuar ve Festivali - Çorum	3 Haziran-2 Temmuz
Kuşköy Kuşdili Şenlikleri - Giresun / Çanakçı	24 Haziran
Pir Sultan Abdal Banaz Şenlikleri - Sivas / Yıldızeli	24-25 Haziran
Söğüt Eli Ernek Yayla Şenliği - Gümüşhane / Kelkit	25 Haziran
Geleneksel Şamlı Panayırı - Balıkesir / Şamlı	25-26 Haziran
Uluslararası Kahta Kommagene Festivali - Adıyaman / Kahta	25-27 Haziran
Sarıkaya Milli Kültür ve Sanat Festivali Yozgat / Sarıkaya	25-30 Haziran
Uyuşturucu Kullanımı ve Trafiği ile Mücadele Günü	26 Haziran
Atatürk’ün Tokat’a Gelişi - Tokat	26 Haziran
Bozhöyük Yayla Şenlikleri - Yozgat / Bozhöyük	26 Haziran
Atatürk ün Sivas’a Gelişi - Sivas	27 Haziran
Kafkasör Kültür Turizm ve Sanat Festivali - Artvin / Kafkasör	27 Haziran-1 Temmuz
İlküvez Yayla Şenlikleri - Ordu / Çaybaşı	28-29 Haziran
Geleneksel Hoşislamlar Şöleni - Çankırı / Atkaracalar	28-30 Haziran
Uluslararası Kaş Likya Festivali - Antalya / Kaş	28 Haziran-2 Temmuz
Geleneksel Kocayayla Şenliği - Bursa / Keles	29-30 Haziran
Çemişgezek Dut ve Peynir Festivali - Tunceli / Çemişgezek	29-30 Haziran
Beyaz Kiraz Festivali - Konya / Ereğli	29-30 Haziran
Çamiçi Yayla Şenlikleri - Tokat / Niksar	30 Haziran
Altınlar Kemer Festivali - Antalya / Kemer	30 Haziran-5 Temmuz
Tatvan Doğu Anadolu Fuarı - Bitlis / Tatvan	30 Haziran-24 Temmuz
Kutludüğün Gözleme, Ayran Kültür Sanat Festivali - Ankara / Mamak	Haziran içinde
Uluslararası Kaplıca Festivali ve Kültür Şenlikleri - Ankara / Haymana	Haziran içinde
Ortaca Festivali - Muğla / Ortaca	Haziran içinde
Kiraz Festivali - Nevşehir / Aksalur	Haziran içinde
Fevziye Yağlı Güreşleri - Yalova / Altınova-Fevziye	Haziran içinde
Karaelmas Festivali - Zonguldak	Haziran içinde
`);

bilgisys.followUp({ embeds: [haziran,haziran2], ephemeral: true });
}

if(bilgisys.values[0] === "temmuz") {
await bilgisys.deferUpdate();

		const temmuz = new Discord.MessageEmbed()
.setColor("#2f3136")
.setAuthor(`▬▬▬▬▬▬▬▬▬▬▬▬・TEMMUZ AYI・▬▬▬▬▬▬▬▬▬▬▬▬▬`)
.setDescription(`
Kabotaj ve Denizcilik Bayramı	1 Temmuz
Atatürk’ün Erzincan’a Gelişi - Erzincan	1 Temmuz
Kültür ve Sanat Festivali - Ordu	1-3 Temmuz
Hopa Kültür, Sanat ve Deniz Fest. - Artvin / Hopa	1-5 Temmuz
Atatürk’ün Erzurum’a Gelişi - Erzurum	3 Temmuz
Altınova Tavşanlı Beldesi Şehitlerini Anma Günü - Yalova / Altınova	3 Temmuz
Ceyhan Karpuz Festivali - Adana / Ceyhan	3 Temmuz
İskenderun Uluslararası Kültür ve Turizm Festivali - Hatay / İskenderun	5 Temmuz
Nasrettin Hoca Festivali - Konya / Akşehir	5-10 Temmuz
Kütahya Dumlupınar Fuarı - Kütahya	5-31 Temmuz
Tavşandağı Kafkas Festivali - Amasya / Merzifon	6-9 Temmuz
Yeşilce Kültür ve Yayla Şenlikleri - Ordu / Mesudiye	6-12 Temmuz
Hazar Gölü Su Sporu Şenlikleri - Elazığ / Sivrice	7-8 Temmuz
Bursa Milli Fuarı - Bursa	7-31 Temmuz
Yayık Yayma Seyranı - Ardahan / Posof	Temmuz’un 1. haftası
Kiraz Festivali ve Yağlı Pehlivan Güreşleri - Isparta / Uluborlu	Temmuz’un 1. haftası
Çilek Festivali - Kırklareli / Demirköy	Temmuz’un 1. haftası
Fındık Festivali - Ordu	Temmuz’un 1. haftası
Karacaören Yayla Şenlikleri - Sivas / Suşehri	Temmuz’un 1. haftası
Bölüklü Yayla Festivali - Zonguldak / Alaplı	Temmuz’un 1. haftası
Yörük Ayranı Şöleni - Afyon / Sincanlı	Temmuz’un 1. pazarı
Şeyhül-İmran Bayramı - Bolu / Mudurnu	Temmuz’un 1. pazarı
Kızık Yayla Bayramı - Bolu/Seben/Kızık Yaylası	Temmuz’un 1. pazarı
Vişne Festivali - Afyon / Çay	Temmuz’un 2. haftası
Kardüz (Gölyaka) Yayla Şenliği - Düzce / Gölyaka	Temmuz’un 2. haftası
Uluslararası Akçakoca Turizm, Kültür ve Fındık Festivali - Düzce / Akçakoca	Temmuz’un 2. haftası
Adala Şeftali ve Kültür Şenliği - Manisa / Salihli / Adala	Temmuz’un 2. haftası
Suçıktı Günü - Balıkesir / Dursunbey	Temmuz’un 2. haftası
Bayburt Dede Korkut Uluslararası Kültür-Sanat Şölenleri - Bayburt	Temmuz’un 2. haftası
Karadağ Yayla Şenlikleri - Trabzon / Vakfıkebir	Temmuz’un 2. haftası
Abant Bayramı - Bolu / Abant	Temmuz’un 2. pazarı
Zigana Yayla Şenlikleri - Gümüşhane / Torul	Temmuz’un 2. pazarı
Soğucak Yayla Şenliği - Sakarya / Sapanca	Temmuz’un 2. pazarı
Kiraz Festivali - Niğde / Ulukışla/Darboğaz	8 Temmuz
İyidere Deniz Şenlikleri - Rize / İyidere	8-10 Temmuz
Dünya Nüfus Günü	11 Temmuz
Peynir Festivali - Ordu / Kabataş	13-14 Temmuz
Yöresel Çambaşı Yayla Şenliği - Ordu / Kabadüz	13-14 Temmuz
Aksaray Kültür ve Turizm Festivali - Aksaray	13-16 Temmuz
Ağlı Kalesi ve Yayla Şenlikleri - Kastamonu / Ağlı	13-17 Temmuz
Kümbet Yayla Şenliği - Giresun / Dereli	14-15 Temmuz
Kurtdereli Mehmet Pehlivan Yağlı Güreşleri - Balıkesir / Kurtdere Köyü	14-16 Temmuz
Kültür ve Turizm Festivali - Kütahya	14-16 Temmuz
Kangal Çoban Köpeği Koyunu Kültür ve Sanat Festivali - Sivas / Kangal	14-16 Temmuz
Yenicekent Üzüm Festivali - Denizli / Yenicekent	Temmuz’un 3. haftası
Özdere Uluslararası Kültür-Sanat ve Turizm Festivali - İzmir / Menderes	Temmuz’un 3. haftası
Dikmen Kebap ve Eğlence Festivali - Sinop / Dikmen	Temmuz’un 3. haftası

`);
		const temmuz2 = new Discord.MessageEmbed()
.setColor("#2f3136")
.setFooter({ text: `Kaynak: T.C. Başbakanlık Basın-Yayın ve Enformasyon Genel Müdürlüğü` })
.setDescription(`
Devrek Baston ve Kültür Festivali - Zonguldak / Devrek	Temmuz’un 3. haftası
Erciyes Atlı Yayla Turizm Şenlikleri - Kayseri / Erciyes Dağı	Temmuz’un 3. pazarı
Atatürk’ün İznik’e Gelişi - Bursa / İznik	15 Temmuz
Eymir Yayla Şenlikleri - Yozgat / Eymir	15-16 Temmuz
Sardalya Festivali - Çanakkale / Gelibolu	15-17 Temmuz
Kocaeli Eğlence Fuarı - Kocaeli / İzmit	15 Temmuz-15 Ağustos
Atatürk’ün Bolu’ya Gelişi - Bolu	17 Temmuz
Üzüm Şenlikleri - İçel / Tarsus	17-23 Temmuz
Malatya Fuarı ve Kayısı Şenlikleri - Malatya	17-31 Temmuz
Atatürk’ün Düzce Merkez ve Gümüşova-Selamlar Köyüne Gelişi - Düzce	18 Temmuz
Topçam Yöresi Yayla Şenlikleri - Ordu / Mesudiye	18 Temmuz
Ilgaz Dağı Kültür ve Sanat Festivali - Çankırı / Ilgaz	19-21 Temmuz
Çandarlı Kaleiçi Kültür ve Sanat Fest. - İzmir / Dikili	19-21 Temmuz
Ünye Uluslararası Kültür, Sanat ve Turizm Festivali - Ordu / Ünye	19-21 Temmuz
Tut Kültür ve Sanat Festivali - Adıyaman / Tut	19-23 Temmuz
Pertek Peynir ve Pekmez Festivali - Tunceli / Pertek	20 Temmuz
Kiraz Festivali - Kocaeli / Körfez / Yarımca	20-21 Temmuz
Gerze Kültür ve Sanat Festivali - Sinop / Gerze	20-22 Temmuz
Antakya Uluslararası Turizm Kültür ve Sanat Festivali - Hatay / Antakya	20-23 Temmuz
Şebinkarahisar Şenlikleri - Giresun / Şebinkarahisar	21-22 Temmuz
Kepsut Şeftali Şenliği Festivali - Balıkesir / Kepsut	Temmuz’un 4. haftası
Perşembe Yaylası Şenlikleri - Ordu / Perşembe	Temmuz’un 4. haftası
Turizm Şenliği - Ordu / Ünye	Temmuz’un 4. haftası
Bahadın Kültür Şenliği - Yozgat / Bahadın	Temmuz’un 4. haftası
Kaba-Oğuz Köyleri Yayla Şenlikleri - Amasya / Gümüşhacıköy	22-23 Temmuz
Kazankaya Kanyon Kültür ve Turizm Festivali - Yozgat / Kazankaya	22-23 Temmuz
Manavgat Turizm Festivali - Antalya / Manavgat	23-27 Temmuz
Gazeteciler (Basın) Bayramı	24 Temmuz
Ulubey Kültür ve Sanat Festivali - Ordu / Ulubey	26-27 Temmuz
Düzoba Yaylası Şenlikleri - Ordu / Kumru	27-28 Temmuz
Abana Kültür-Sanat ve Deniz Şenlikleri - Kastamonu / Abana	27-29 Temmuz
Ulusal Çenesuyu Festivali - Kocaeli / Derince	27-29 Temmuz
Türkeli Yaz Şenlikleri - Sinop / Türkeli	27-29 Temmuz
Uluslararası “Milet-Apollon” Bilim, Bilicilik Festivali - Aydın / Didim	28-30 Temmuz
Dadaloğlu Kültür ve Sanat Şenliği - Kayseri / Tomarza	31 Temmuz
Sürmene Kültür Turizm Şenliği - Trabzon / Sürmene	31 Temmuz
Reşadiye Koç Festivali - Tokat / Reşadiye	31 Temmuz-1 Ağustos
Çamlıdere Aluç Dağı Festivali - Ankara / Çamlıdere	Temmuz içinde
Dörtdivan Köroğlu Yayla Şenlikleri - Bolu / Dörtdivan	Temmuz içinde
Uluslararası Çeşme Müzik Festivali - İzmir / Çeşme	Temmuz içinde
Akdağ Yayla Şenlikleri - Samsun / Ladik	Temmuz içinde
Şerefiye Panayırı - Sivas / Zara	Temmuz içinde
Almus Vişne Festivali - Tokat / Almus	Temmuz içinde
`);

bilgisys.followUp({ embeds: [temmuz,temmuz2], ephemeral: true });

}

if(bilgisys.values[0] === "ağustos") {
await bilgisys.deferUpdate();

		const ağustos = new Discord.MessageEmbed()
.setColor("#2f3136")
.setAuthor(`▬▬▬▬▬▬▬▬▬▬▬▬・AĞUSTOS AYI・▬▬▬▬▬▬▬▬▬▬▬▬▬`)
.setDescription(`
Ardahan Bal Festivali - Ardahan	Ağustos’un 1. haftası
Cevizli Ayran Festivali - Antalya / Akseki	Ağustos’un 1. haftası
Göle Ulusal Kaşar Festivali - Ardahan / Göle	Ağustos’un 1. haftası
Mengen Aşçılık ve Turizm Festivali - Bolu / Mengen	Ağustos’un 1. haftası
Yeşiltepe Yayla Şenliği - Trabzon / Maçka	Ağustos’un 1. haftası
Kültür Sanat ve Armut Festivali - Bursa / Gürsu	Ağustos’un 1. haftası
Seyit Veli Baba Sultanı Anma Töreni ve Pilav Festivali - Isparta/Senirkent/Uluğbey	Ağustos’un 1. haftası
Obruk Yeşil Tepe Yayla Şenlikleri - Kastamonu / İhsangazi	Ağustos’un 1. haftası
Karaköy (Çilimli) Türbelerini Anma Ektinliği - Düzce / Karaköy	Ağustos’un 1. haftası
Tarım Sanayi ve El Sanatları Fuarı - Kahramanmaraş	1-30 Ağustos
Erdek Festivali - Balıkesir / Erdek	1-31 Ağustos
Atatürk’ün Konya’ya Gelişi - Konya	3 Ağustos
Alabalık Festivali - Sivas / Gürün	3-4 Ağustos
Doğa Turu ve Suğla Yayla Şenlikleri - Kastamonu / Pınarbaşı	4-6 Ağustos
Geleneksel Engiz Yaz Şenlikleri - Samsun / 19 Mayıs	4-5 Ağustos
Konya Fuarı - Konya	5 Ağustos-5 Eylül
Kızılcahamam Su Festivali - Ankara / Kızılcahamam	Ağustos’un 2. haftası
Otlukbeli Şenlikleri - Erzincan / Otlukbeli	Ağustos’un 2. haftası
Turizm ve Zeytin Şenliği - Balıkesir / Burhaniye	Ağustos’un 2. haftası
Ayazma İda Şenlikleri - Çanakkale / Bayramiç	Ağustos’un 2. haftası
Ulu Yayla Şenlikleri - Karabük / Safranbolu	Ağustos’un 2. haftası
Müzik ve Yağlı Güreş Festivali - Karabük / Eskipazar	Ağustos’un 2. haftası
Ağustos Şenlikleri - Tekirdağ / Hayrabolu	8-11 Ağustos
Mordoğan Yaz Festivali - İzmir / Karaburun	9-11 Ağustos
Kültür, Sanat ve Turizm Şenliği - Muğla / Ula	9-13 Ağustos
Üzüm ve Biber Festivali - Gaziantep / İslahiye	10-11 Ağustos
Yayladağı Festivali - Hatay / Yayladağı	10-11 Ağustos
Uluslararası Troya Festivali - Çanakkale	10-18 Ağustos
Biber Festivali - Kahramanmaraş	12 Ağustos
Zorkun Yaylası Çocuk Şenliği - Osmaniye	12 Ağustos
Pazar Kültür, Sanat ve Spor Festivali - Rize / Pazar	12-13 Ağustos
Hemşin Bal, Kültür ve Turizm Şenlikleri - Rize / Hemşin	12-13 Ağustos
Zeytinli Belediyesi Zeytin Şenlikleri - Balıkesir / Edremit	13-15 Ağustos
Urla Bağbozumu Şenlikleri - İzmir / Urla	13-15 Ağustos
Taytan Üzüm Şenliği - Manisa / Salihli	14-15 Ağustos
İncesu Günü Festivali - Afyon / Dinar	Ağustos’un 3. haftası
Güre Belediyesi Sarıkız Etkinlikleri - Balıkesir / Edremit / Güre	Ağustos’un 3. haftası
Bağbozumu Festivali - Çanakkale / Bozcaada	Ağustos’un 3. haftası
Altınoluk Antandros “Yaşama Saygı” Kültür ve Sanat Festivali - Balıkesir / Altınoluk	Ağustos’un 3. haftası
Bolu Panayırı - Bolu	15 Ağustos-15 Eylül
Ağın Kültür ve Sanat Şenliği - Elazığ / Ağın	15 Ağustos-15 Eylül
Kars’ın Selçuklu Türkleri Tarafından Fethi - Kars	16 Ağustos
Acur Festivali - Mardin/Midyat/Acurlubel	16 Ağustos
Kavaklıdere Kültür-Sanat Festivali - Muğla / Kavaklıdere	16-17 Ağustos
Hacı Bektaş-i Veli’yi Anma Törenleri ve Kültür-Sanat Etkinlikleri - Nevşehir / Hacıbektaş	16-18 Ağustos
Kırıkkale’nin İl Oluşunun Kutlanması - Kırıkkale	17 Ağustos

`);
		const ağustos2 = new Discord.MessageEmbed()
.setColor("#2f3136")
.setFooter({ text: `Kaynak: T.C. Başbakanlık Basın-Yayın ve Enformasyon Genel Müdürlüğü` })
.setDescription(`
Elma ve Tufana Şenliği - Konya / Ereğli	17-18 Ağustos
Güreş ve Müzik Festivali - Niğde / Koyunlu	18-19 Ağustos
Datça Badem Festivali - Muğla / Datça	18-21 Ağustos
Çamoluk Bal Festivali - Giresun / Çamoluk	19 Ağustos
Dondurma Festivali - Kahramanmaraş	19 Ağustos
Yayla Ortası Şenliği - Trabzon / Çaykara	20 Ağustos
Sarız Kilim Festivali - Kayseri / Sarız	20 Ağustos
Balıkesir 6 Eylül Milli Fuarı - Balıkesir	20 Ağustos-6 Eylül
Arıcılık ve Bal Şenliği - Yozgat / Şefaatli	21 Ağustos
Beyağaç Kartal Gölü Eren Günü - Denizli	Ağustos’un 4. haftası
Kemaliye (Eğin) Şenlikleri - Erzincan / Kemaliye	Ağustos’un 4. haftası
Ertuğrulgazi’yi Anma ve Yörük Şenlikleri - Eskişehir	Ağustos’un 4. haftası
Mucur Köme ve Flamingo Kültür Fest. - Kırşehir / Mucur	Ağustos’un 4. haftası
Donanma Kenti Gölcük Yaz Şenlikleri - Kocaeli / Gölcük	Ağustos’un 4. haftası
Anzer Yaylası Bal Şenlikleri - Rize / İkizdere	Ağustos’un 4. haftası
Celal BAYAR’ı Anma Günleri - Bursa / Gemlik	22 Ağustos
Ahlat Kültür Haftası - Bitlis / Ahlat	23-25 Ağustos
Atatürk’ün Çankırı’ya Gelişi, Şapka İnkılabı ve Karatekin Festivali - Çankırı	23-25 Ağustos
Pir’i Sani Hz. Anma Çerkeş Kültür ve Hayvancılık Festivali - Çankırı / Çerkeş	23-25 Ağustos
Zafer Haftası Şenlikleri ve Karakucak Güreş Festivali - K. Maraş / Göksun	23-30 Ağustos
Atatürk’ün Kastamonu’ya Gelişi, Şapka ve Kıyafet İnkılabı Kutlaması - Kastamonu	23-31 Ağustos
Mercidabık Zaferi - Kilis / Yavuzlu	24 Ağustos
Yoğurt-Un Şenlikleri ve Türkmen Şöl. - Nevşehir / Kalaba	25 Ağustos
Çelikhan Bal Kültür ve Turizm Fest. - Adıyaman / Çelikhan	25-26 Ağustos
Tyana Kültür Şenliği - Niğde / Bor / Kemerhisar	25-26 Ağustos
Yılantaş Kültür Turizm ve Sanat Etkinlikleri Festivali - Trabzon / Araklı	25 Ağustos-1 Eylül
Zafer Haftası	26-30 Ağustos
Dumlupınar Zafer Şenlikleri - Kütahya / Dumlupınar	26-30 Ağustos
İzmir Enternasyonal Fuarı - İzmir	26 Ağustos-10 Eylül
Devrekani Tarım-Kültür ve Sanat Fest. - Kastamonu / Devrekani	27-29 Ağustos
Çayeli Kültür ve Sanat Festivali - Rize / Çayeli	27-29 Ağustos
Ticaret ve Sanayi Fuarı - Sivas	27 Ağustos-6 Eylül
Mezitli Şenliği - İçel / Mersin	28-29 Ağustos
Amazon Şenlikleri - Samsun / Terme / Gölyazı	28-30 Ağustos
Pamuk Festivali - Aydın/Söke/Sarıkemer	29-31 Ağustos
Fevzi ÇAKMAK’ı Anma Günü ve Kırobası - İçel / Silifke	30 Ağustos
Malazgirt Zaferi Kutlamaları - Muş / Malazgirt	30 Ağustos
Zengibar Karakucak Güreşleri - Malatya / Darende	30 Ağustos
Uluslararası Turizm ve Elsanatları Fes. - Nevşehir / Avanos	31 Ağustos-1 Eylül
Nallıhan Taptuk Emre’yi ve Kızı Bacım Sultanı Anma Törenleri - Ankara / Nallıhan	Ağustos içinde
Sidere Festivali - Artvin / Arhavi	Ağustos içinde
Ötüken Şöleni-Aba Güreşleri Festivali - Hatay	Ağustos içinde
Keçiborlu Domates ve Kültür Festivali - Isparta / Keçiborlu	Ağustos içinde
Sarıveliler İlçesi Dumlugöze Köyü Kardelen Çiçeği Festivali - Karaman / Sarıveliler	Ağustos içinde
Hasandede Kültür Şenlikleri - Kırıkkale	Ağustos içinde
Atatürk’ün Karamürsel’e Gelişi - Kocaeli / Karamürsel	Ağustos içinde
Yavuz Sultan Selim Han Selemen Yayla Şenlikleri - Tokat / Reşadiye	Ağustos içinde
Çınarcık Altın Çınar Festivali - Yalova / Çınarcık	Ağustos içinde
`);

bilgisys.followUp({ embeds: [ağustos,ağustos2], ephemeral: true });
}

if(bilgisys.values[0] === "eylül") {
await bilgisys.deferUpdate();

		const eylül = new Discord.MessageEmbed()
.setColor("#2f3136")
.setAuthor(`▬▬▬▬▬▬▬▬▬▬▬▬・EYLÜL AYI・▬▬▬▬▬▬▬▬▬▬▬▬▬`)
.setDescription(`
Dünya Barış Günü	1 Eylül
Atatürk’ün Suşehri’ne Gelişi - Sivas / Suşehri	1 Eylül
Kavun-Karpuz Festivali - Kırıkkale / Sulakyurt	1 Eylül
Barış Günleri Şenliği - Aydın / Didim	1-2 Eylül
Tirebolu Fındık Festivali - Giresun / Tirebolu	1-2 Eylül
Aşık Seyrani Kültür ve Sanat Şen. - Kayseri / Develi	1-2 Eylül
Ezine Panayırı - Çanakkale / Ezine	1-3 Eylül
Karahallı Cılandıras Dokuma Fest. - Uşak	2 Eylül
Atmaca 53 Festivali - Rize / Ardeşen	2-4 Eylül
Yağcıbedir Halı Festivali - Balıkesir / Sındırgı	3-6 Eylül
Halk Sağlığı Haftası	3-9 Eylül
Yunus Emre’yi Anma Haftası - Aksaray	Eylül’ün 1. haftası
Sincan Yenikent Kavun Festivali ve Kültürel Şenlikleri - Ankara / Yenikent	Eylül’ün 1. haftası
Uruş Kapama Şöleni - Ankara / Beypazarı	Eylül’ün 1. haftası
Kaş Likya Festivali - Antalya / Kaş	Eylül’ün 1. haftası
Seyit Bilal Anma Günü - Batman / Gercüş	Eylül’ün 1. haftası
Bal Festivali - Erzincan / Refahiye	Eylül’ün 1. haftası
Hayme Ana’yı Anma ve Domaniç Şenliği - Kütahya / Domaniç	Eylül’ün 1. haftası
Arapgir Bağbozumu Şenlikleri - Malatya / Arapgir	Eylül’ün 1. haftası
Tepealan Şenlikleri - Ordu / Korgan	Eylül’ün 1. haftası
Geleneksel Akıncılar Kavun Fest. - Sivas / Akıncılar	Eylül’ün 1. haftası
Kadıralak Yayla Şenliği - Trabzon / Tonya	Eylül’ün 1. haftası
Kültür-Sanat Festivali ve Kurtuluş Kutlamaları - Bursa / Orhangazi	3-10 Eylül
Ödemiş Milli Fuarı - İzmir / Ödemiş	3-13 Eylül
Sivri Şenliği - Trabzon / Tonya	4 Eylül
4 Eylül Kültür ve Sanat Festivali - İzmir / Tire	4-6 Eylül
Hadimi Hazretlerini Anma Günü - Konya / Hadim	4-12 Eylül
Geleneksel Altın İncir Festivali - Aydın / İncirliova	5 Eylül
Ayran Festivali - Balıkesir / Susurluk	5 Eylül
Uluslararası Taşköprü Kültür ve Sarımsak Festivali - Kastamonu / Taşköprü	6-9 Eylül
Pülümür Geleneksel Bal Festivali - Tunceli / Pülümür	7 Eylül
Yayla Dönüşü Şenliği - Yozgat / Boğazlıyan	7 Eylül
Yunus Emre Anma Günü - Kırşehir	Eylül’ün 2. haftası
Köroğlu Kültür Sanat Festivali - Bolu	Eylül’ün 2. haftası
Munzur Melenkoç Yayla Şenlikleri - Erzincan / Yaylabaşı	Eylül’ün 2. haftası
Manisa’nın Düşman İşgalinden Kurtuluşu ve Bağbozumu Şenlikleri - Manisa	8 Eylül

`);
		const eylül2 = new Discord.MessageEmbed()
.setColor("#2f3136")
.setFooter({ text: `Kaynak: T.C. Başbakanlık Basın-Yayın ve Enformasyon Genel Müdürlüğü` })
.setDescription(`
Üzüm Festivali - Kayseri / İncesu	8 Eylül
Boğa Güreşi - Muğla / Ula	8-9 Eylül
Şenköy Kültür Sanat ve Turizm Fest. - Hatay	9 Eylül
Kabalı Panayırı - Sinop / Kabalı	12-16 Eylül
Sakarya Zaferi ve Gordiyon Şenlikleri - Ankara / Polatlı	13 Eylül
Topçam Şenlikleri - Tokat	13-14 Eylül
Çivril Elma Festivali - Denizli / Çivril	3-14 Eylül
Uluslararası Kültür Şenliği - Kırıkkale / Karakeçili	Eylül’ün 3. haftası
Çal Bağbozumu Şenlikleri - Denizli / Çal	Eylül’ün 3. haftası
Atatürk’ün Sinop’a Gelişi - Sinop	15 Eylül
Türkmen Sofrası - Nevşehir	15 Eylül
Mersin Kültür ve Sanat Şenliği - Mersin	15 Eylül – 5 Ekim
Kültür-Sanat Festivali - Antalya / Side	15-30 Eylül
Yöresel Cafer Dede Kültürel Etk. - Amasya / Uygur	16 Eylül
Miryokefelon Zaferinin Yıldönümü - Isparta / Gelendost	17 Eylül
Savaştepe Panayırı - Balıkesir / Savaştepe	17-19 Eylül
Ayancık Panayırı - Sinop / Ayancık	18-21 Eylül
Sonbahar Hayvan ve Emtia Panayırı - Kırklareli / Pehlivanköy	18-22 Eylül
Atatürk’ün Giresun’a Gelişi - Giresun	19 Eylül
Atatürk’ün Ordu’ya Gelişi - Ordu	19 Eylül
Şehitler ve Gaziler Günü	19 Eylül
Şehitler ve Gaziler Haftası	19 Eylül’ü içine alan hafta
Altın Safran Belgesel Film Festivali - Karabük / Safranbolu	20-24 Eylül
Uluslararası Kültür ve Sanat Fest. - Mersin	20-30 Eylül
Erfelek (Karasu) Panayırı - Sinop / Erfelek	21-26 Eylül
Göynük Panayırı - Bolu / Göynük	Eylül’ün 4. haftası
Akçadağ Kültür ve Sanat Şenlikleri - Malatya / Akçadağ	Eylül’ün 4. haftası
Oğuzeli Nar Festivali - Gaziantep / Oğuzeli	22-23 Eylül
Besni Eğitim ve Kültür Festivali - Adıyaman / Besni	22-24 Eylül
Geleneksel Kaymak ve Kurtuluş Şen. - Afyon / Bolvadin	24 Eylül
Türkiye Cirit Oyunları - Konya	25-26 Eylül
İtfaiyecilik Haftası	25 Eylül -1 Ekim
Dil Bayramı	26 Eylül
Avrupa Dil Günü	26 Eylül
Dünya Turizm Günü	27 Eylül
Sungurbey Şenliği - Çorum / Sungurlu	28-29 Eylül
Taraklı Panayırı - Sakarya / Taraklı	28-30 Eylül
Gölbaşı Kuru Peygamber Üzüm Fes. - Adıyaman / Gölbaşı	29 Eylül -1 Ekim
Soğan Kültür ve Sanat Festivali - Yozgat / Aydıncık	30 Eylül
Uluslararası Atatürk Barajı Su Sporları Şöleni - Adıyaman	Eylül içinde
Eylül Şenlikleri - Amasya / Suluova	Eylül içinde
Yağlı Güreş Festivali - Ankara / Keçiören	Eylül içinde
Kültür – Turizm Festivali - Diyarbakır	Eylül içinde
Kuşburnu-Pestil Turizm Festivali - Gümüşhane	Eylül içinde
Ermenek Sıla Festivali - Karaman / Ermenek	Eylül içinde
Sarıveliler Bal Festivali - Karaman	Eylül içinde
Afşin Eshab-ı Kehf Kültür Sanat ve Karakucak Güreş Fest. - K.Maraş / Afşin	Eylül içinde
Gökçeli Üzüm ve Yaprak Fest. - Tokat / Niksar	Eylül içinde
Bal Teşvik Festivali - Zonguldak / Devrek	Eylül içinde
`);

bilgisys.followUp({ embeds: [eylül,eylül2], ephemeral: true });
}

if(bilgisys.values[0] === "ekim") {
await bilgisys.deferUpdate();

		const ekim = new Discord.MessageEmbed()
.setColor("#2f3136")
.setFooter({ text: `Kaynak: T.C. Başbakanlık Basın-Yayın ve Enformasyon Genel Müdürlüğü` })
.setAuthor(`▬▬▬▬▬▬▬▬▬▬▬▬・EKİM AYI・▬▬▬▬▬▬▬▬▬▬▬▬▬`)
.setDescription(`
Dünya Yaşlılar Günü	1 Ekim
Camiler ve Din Görevlileri Haftası	1-7 Ekim
Dünya Habitat Günü	Ekim’in ilk pazartesi
Dünya Konut Günü	Ekim’in ilk pazartesi
Dünya Mimarlık Günü	Ekim’in ilk pazartesi
Dünya Çocuk Günü	Ekim’in ilk pazartesi
Adilcevaz Ceviz Yetiştiriciliği ve Kültür Etkinlikleri Festivali - Bitlis / Adilcevaz	Ekim’in 1. haftası
Seben Panayırı - Bolu / Seben	Ekim’in 1. haftası
Gerede Panayırı - Bolu / Gerede	Ekim’in 1. haftası
Ayvacık Festivali - Çanakkale / Ayvacık	Ekim’in 1. haftası
Kaman Ceviz ve Kültür Festivali - Kırşehir / Kaman	Ekim’in 1. haftası
Kültür ve Tanıtım Festivali - Çorum / İskilip	1-3 Ekim
Altın Portakal Film Festivali Kısa Film ve Video Film Festivali - Antalya	1-5 Ekim
Anadolu Günleri Festivali - Ankara / Etimesgut	1-15 Ekim
Dünya Hayvanları Koruma Günü	4 Ekim
Dünya Uzay Haftası	4-10 Ekim
Elma Şenlikleri - İçel / Silifke	5 Ekim
Osmaniye Fıstık Festivali - Osmaniye	5-7 Ekim
Zile Asırlık Panayır - Tokat / Zile	5-20 Ekim
Atatürk’ün Kars’a Gelişi - Kars	6 Ekim
Oymaağaç Köyü Bağ Bozumu Orcik ve Pestil Şenlikleri - Elazığ / Oymaağaç Köyü	7 Ekim
Ahilik Haftası	Ekim’in 2. pazartesi
Yenicekent Nar Şenlikleri - Denizli	Ekim’in 2. haftası
Ahilik Kültürü Haftası ve Esnaf Bayr. - Kırşehir	Ekim’in 2. haftası
Atatürk’ün Bandırma’ya Gelişi - Balıkesir / Bandırma	8 Ekim
Dünya Posta Günü	9 Ekim
Atatürk’ün Nazilli’ye Gelişi - Aydın / Nazilli	9 Ekim
Dünya Ruh Sağlığı Günü	10 Ekim
Eskişehir Festivali - Eskişehir	10-18 Ekim
Dünya Gazete Dağıtıcıları Günü	11 Ekim
Atatürk’ün Şebinkarahisar’a Gelişi - Giresin / Şebinkarahisar	11 Ekim
13 Ekim Ankara’nın Başkent Oluşu - Ankara	13 Ekim
Dünya Standartlar Günü	14 Ekim
Karacaoğlan Günü - Adana / Feke	14 Ekim
Atatürk’ün Yozgat’a Gelişi - Yozgat	15 Ekim
İncir Festivali - Mardin / Akarsu Bel.	16 Ekim
Dünya Gıda Günü	16 Ekim
Boyabat Panayırı - Sinop / Boyabat	16-22 Ekim
Dünya Yoksullukla Mücadele Günü	17 Ekim
Birleşmiş Milletler Günü	24 Ekim
Geleneksel Aşıklar Bayramı - Konya	25-29 Ekim
Atatürk’ün Kilis’e Gelişi - Kilis	28 Ekim
Kızılay Haftası	28 Ekim-4 Kasım
Cumhuriyet Bayramı	29 Ekim
Afrodisias Kültür Sanat Festivali - Aydın / Karacasu / Geyre	29 Ekim
Pirinç Panayırı - Çorum / Kargı	29 Ekim-4 Kasım
Kaz Festivali - Ardahan / Çıldır	30 Ekim
Bal-Ceviz Festivali - Batman / Sason	30-31 Ekim
Gökırmak Panayırı - Sinop / Durağan	30 Ekim-5 Kasım
`);

bilgisys.followUp({ embeds: [ekim], ephemeral: true });
}

if(bilgisys.values[0] === "kasım") {
await bilgisys.deferUpdate();

		const kasım = new Discord.MessageEmbed()
.setColor("#2f3136")
.setFooter({ text: `Kaynak: T.C. Başbakanlık Basın-Yayın ve Enformasyon Genel Müdürlüğü` })
.setAuthor(`▬▬▬▬▬▬▬▬▬▬▬▬・KASIM AYI・▬▬▬▬▬▬▬▬▬▬▬▬▬`)
.setDescription(`
Türk Harf İnkılabı Haftası	1-7 Kasım
Organ Nakli Haftası	3-9 Kasım
Rahvan At Yarışı - Söke / Aydın	Kasım’ın 1. haftası
Pirinç Panayırı - Osmancık / Çorum	Kasım’ın 1. haftası
Uluslararası Yat Yarışları - Marmaris / Muğla	Kasım’ın 1. haftası
Hamamköy Köyü Kestane Festivali - Ödemiş / İzmir	Kasım 1. pazarı
Zeytin Festivali - Orhangazi / Bursa	Kasım’ın 1. pazartesisi
Uluslararası Karagöz ve Kukla Oyunları Festivali - Bursa	4–8 Kasım
Nahçivan Günleri - Iğdır	5-8 Kasım
Dünya Şehircilik Günü	8 Kasım
Pamuk Festivali - Şenyurt / Mardin	9 Kasım
Atatürk'ün Ölüm Günü	10 Kasım
Atatürk Haftası	10-16 Kasım
Atatürk’ün Bitlis’e gelişi - Bitlis	13 Kasım
Dünya Diabet Günü	14 Kasım
Dünya Çocuk Kitapları Haftası	Kasım’ın 2. haftası
Atatürk’ün Diyarbakır’a gelişi - Diyarbakır	15 Kasım
Atatürk’ün Elazığ’a gelişi - Elazığ	17 Kasım
Atatürk’ün Pertek’e gelişi - Pertek / Tunceli	17 Kasım
Dünya Çocuk Hakları Günü	20 Kasım
Uzuncaburç Kültür Şenliği - Silifke / İçel	20 Kasım
Ceviz Festivali - Yeşilalan / Mardin	21 Kasım
Diş Hekimleri Günü	22 Kasım
Ağız ve Diş Sağlığı Haftası	22 Kasım’ı içine alan hafta
Öğretmenler Günü	24 Kasım
Avrupa Film Festivali - Bursa	24-29 Kasım
Kadına Yönelik Şiddete Karşı Uluslararası Mücadele Günü	25 Kasım
Seyyid Burhaneddin’i Anma Günü - Kayseri 27 Kasım
`);

bilgisys.followUp({ embeds: [kasım], ephemeral: true });
}

if(bilgisys.values[0] === "aralık") {
await bilgisys.deferUpdate();

		const aralık = new Discord.MessageEmbed()
.setColor("#2f3136")
.setAuthor(`▬▬▬▬▬▬▬▬▬▬▬▬・ARALIK AYI・▬▬▬▬▬▬▬▬▬▬▬▬▬`)
.setDescription(`
Adıyaman’ın İl Oluşu Etkinlikleri - Adıyaman	1 Aralık
Dünya AIDS Günü	1 Aralık
Köleliğin Yasaklanması Günü	2 Aralık
Dünya Özürlüler Günü	3 Aralık
Dünya Madenciler Günü	4 Aralık
Ahmet Kuddusi Anma Günü - Bor / Niğde	4 Aralık
Uluslararası Sivil Havacılık Günü	7 Aralık
Kültür ve Sanat Etkinlikleri - Köseçobanlı-Gülnar-İçel	7 Aralık
Kestane Festivali - Köşk-Aydın	Aralık’ın 1. haftası
Sanayi ve İhracaat Ürünleri Fuarı - Konya	10 Aralık
Dünya İnsan Hakları Günü	10 Aralık
İnsan Hakları Haftası	10 Aralık’ı içine alan hafta
Hz. Mevlana’yı Anma Törenleri - Konya	10-17 Aralık
Tutum, Yatırım ve Türk Malları Haftası	12-18 Aralık
Yoksullarla Dayanışma Haftası	12-18 Aralık
Uluslararası Çocuk ve Gençlik Tiyatroları Festivali - Bursa	14-20 Aralık
Atatürk’ün Kayseri’ye Gelişi - Kayseri	19 Aralık
Portakal Festivali - Dörtyol-Hatay	19 Aralık
Atatürk’ün Kırklareli’ne Gelişi - Kırklareli	20 Aralık
Dünya Kooperatifçilik Günü	21 Aralık
Atatürk’ün Kırşehir’e Gelişi - Kırşehir	24 Aralık
2. Cumhurbaşkanı İsmet İnönü’yü Anma Töreni - Malatya	25 Aralık
Atatürk’ün Ankara’ya Gelişi - Ankara	27 Aralık
`)
.setFooter({ text: `Kaynak: T.C. Başbakanlık Basın-Yayın ve Enformasyon Genel Müdürlüğü` });

bilgisys.followUp({ embeds: [aralık], ephemeral: true });
}

//////////// --------------- ANMA VE KUTLAMA GÜNLERİ KISMI BİTİŞ --------------- ////////////

})
