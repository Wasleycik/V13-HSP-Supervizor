const { Client, Message, MessageEmbed} = require("discord.js");
const conf = require("../../configs/sunucuayar.json");
module.exports = {
    conf: {
      aliases: ["ytçağır","ytcall"],
      name: "yetkiliçağır",
      help: "yetkiliçağır",
      category: "yönetim"
    },
  
    run: async (client, message, args, embed) => {
    if(!message.member.permissions.has('ADMINISTRATOR')) return message.reply("aa").then(s => setTimeout(() => s.delete().catch(err => {}), 5000));
    let enAltYetkiliRolü = message.guild.roles.cache.get(conf.teyitciRol);
    let yetkililer = message.guild.members.cache.filter(uye => !uye.user.bot  && uye.roles.highest.position >= enAltYetkiliRolü.position && !uye.voice.channel)
    if (yetkililer.length == 0) return message.reply('Aktif olup, seste olmayan yetkili bulunmuyor. Maşallah!');
    let mesaj = await message.channel.send(`**${yetkililer.size}** yetkiliye sese gelme çağırısı yapılıyor`);
//message.channel.send(`** ${yetkililer.map(yetkili => `${yetkili}`).join(', ')}** yetkiliye sese gelme çağırısı yapılıyor`);
    var filter = m => m.author.id === message.author.id && m.author.id !== client.user.id && !m.author.bot;
        yetkililer.forEach((yetkili) => {
          setTimeout(() => {
            yetkili.send(message.guild.name+' Sunucusunda yetkin var ancak seste değilsin. Eğer sese girmez isen yetki yükseltimin göz önünde bulundurulacaktır.').then(x => mesaj.edit({embeds: [embed.setDescription(`${yetkili} yetkilisine özelden mesaj atıldı!`)]})).catch(err => message.channel.send(`${yetkili}, Sunucusunda yetkin var ancak seste değilsin. Eğer sese girmez isen yetki yükseltimin göz önünde bulundurulacaktır. Ayrıca dm'ni aç mesaj atamıyorum.`).then(x => mesaj.edit({embeds: [embed.setDescription(`${yetkili} yetkilisine özelden mesaj atılamadığı için kanalda etiketlendi!`)]})));
          }, 4*1000);
        });
    }
};