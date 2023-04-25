const moment = require("moment");
const penals = require("../../schemas/penals")
const cezapuan = require("../../schemas/cezapuan")
const ceza = require("../../schemas/ceza")
const conf = require("../../configs/sunucuayar.json")
const isimcek = require("../../configs/isimcek.json")
const emojis = require("../../configs/emojis.json")
moment.locale("tr");
const client = global.bot; 

module.exports = {
  conf: {
    aliases: ["cezasorgu","sorgu","ceza"],
    name: "cezasorgu",
    help: "cezasorgu <Ceza-ID>",
    category: "cezalandırma",
  },

  run: async (client, message, args, embed) => {
    if (isNaN(args[0])) return message.channel.send({ content:"Ceza ID'si bir sayı olmalıdır!"}).then((e) => setTimeout(() => { e.delete(); }, 5000));
    const data = await penals.findOne({ guildID: message.guild.id, id: args[0] });
    if (!data) return message.channel.send({ content:`${args[0]} ID'li bir ceza bulunamadı!`}).then((e) => setTimeout(() => { e.delete(); }, 5000));

    const cezaData = await ceza.findOne({ guildID: message.guild.id, userID: data.userID });
    const cezapuanData = await cezapuan.findOne({ userID: data.userID });
    var cezasayı = `${cezapuanData ? cezapuanData.cezapuan : 0}`

    let durum;
    if(cezasayı < 5) durum = "Çok Güvenli";
    if(cezasayı >= 5 && cezasayı < 20) durum = "Güvenli";
    if(cezasayı >= 20 && cezasayı < 30) durum = "Şüpheli";
    if(cezasayı >= 30 && cezasayı < 40) durum = "Tehlikeli";
    if(cezasayı >= 50) durum = "Çok Tehlikeli";

    const xd = embed
    .setAuthor({ name: message.guild.name, iconURL: message.guild.iconURL({ dynamic: true, size: 2048 })})
    .setDescription(`
${message.guild.name} sunucusunda <@${data.userID}> kullanıcısının ID'si verilen ceza bilgisi aşağıda listelenmiştir.

**Ceza-i İşlemi**
\`\`\`cs
ID => ${data.id}
Ceza Durumu: ${data.active ? `🔴 (Bitti)` : `🟢 (Aktif)`}
Yetkili => ${client.users.cache.get(data.staff).tag}
Tür => ${data.type}
Sebep => ${data.reason}
Bitiş Tarihi => ${data.finishDate ? `${moment(data.finishDate).format("LLL")}` : "Bulunmamaktadır."}
\`\`\`
**Tüm Ceza-i İşlemler** (\`Toplam ${cezaData ? cezaData.ceza.length : 0} Ceza - ${durum} \`)
`)

    message.channel.send({ embeds: [xd] });
  },
};