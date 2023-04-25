const moment = require("moment");
const cezapuans = require("../../schemas/cezapuan");
const ceza = require("../../schemas/ceza")
const name = require("../../schemas/names");
const penals = require("../../schemas/penals");
require("moment-duration-format");
const conf = require("../../configs/sunucuayar.json");
const { kirmiziok, green, red ,star } = require("../../configs/emojis.json");
const { TeamMember, MessageEmbed, MessageActionRow, MessageButton ,MessageSelectMenu} = require("discord.js");

const messageUser = require("../../schemas/messageUser");
const voiceUser = require("../../schemas/voiceUser");
const coin = require("../../schemas/coin");
const dolar = require("../../schemas/dolar");
const db = require("../../schemas/inviter");
const regstats = require("../../schemas/registerStats");
const isimcek = require("../../configs/isimcek.json")

module.exports = {
  conf: {
    aliases: ["sf","sıfırla"],
    name: "sıfırla",
    help: "sıfırla <@Kişi/ID>",
    category: "yönetim",
  },

  run: async (client, message, args, embed) => {
if (!message.member.permissions.has('ADMINISTRATOR'))
{
message.reply({ content:"Bu işlemi yapamazsın dostum!"}).then((e) => setTimeout(() => { e.delete(); }, 5000));
message.react(red)
return;
}
    const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;
     
const verilog = client.channels.cache.find(x => x.name.includes(isimcek.kanalcek.verilog));
if (!verilog) return;

const row = new MessageActionRow()
.addComponents(
new MessageSelectMenu()
.setCustomId('select')
.setPlaceholder('Lütfen Menüden Bir İşlem Seçiniz.')
.addOptions([
  { label: 'İsim Sıfırla', description: 'İsim Verilerini Sıfırlamanı Sağlar.', value: 'isim_sıfırla' },
  { label: 'Ceza Puan Sıfırla', description: 'Ceza Puan Verilerini Sıfırlamanı Sağlar.', value: 'cezapuan_sıfırla' },
  { label: 'Sicil Sıfırla', description: 'Sicil Verilerini Sıfırlamanı Sağlar.', value: 'sicil_sıfırla' },
  { label: 'Stat Sıfırla', description: 'Stat Verilerini Sıfırlamanı Sağlar.', value: 'stat_sıfırla' },
  { label: 'İptal Et', description: 'Menüyü Kapatır.', value: 'iptal_button' },
]),
);
    
const row1 = new MessageActionRow()
.addComponents(
new MessageSelectMenu()
.setCustomId('select2')
.setPlaceholder('Lütfen Yapmak İstediğiniz İşlemi Seçiniz.')
.addOptions([
  { label: 'Mesaj Sıfırla', description: 'Mesaj Verilerini Sıfırlar.', value: 'mesajsıfırla' },
  { label: 'Ses Sıfırla', description: 'Ses Verilerini Sıfırlar.', value: 'sessıfırla' },
  { label: 'Coin Sıfırla', description: 'Coin Verilerini Sıfırlar.', value: 'coinsıfırla' },
  { label: 'Dolar Sıfırla', description: 'Dolar Verilerini Sıfırlar.', value: 'dolarsıfırla' },
  { label: 'Davet Sıfırla', description: 'Davet Verilerini Sıfırlar.', value: 'davetsıfırla' },
  { label: 'Kayıt Sıfırla', description: 'Kayıt Verilerini Sıfırlar.', value: 'kayıtsıfırla' },
  { label: 'Hepsi', description: 'Tüm Stat Verilerini Sıfırlar.', value: 'hepsinisıfırla' },
]),
);

 embed.setAuthor({ name: message.guild.name, iconURL: message.guild.iconURL({ dynamic: true }) })
.setTimestamp()
.setColor(message.author.displayHexColor)
.setFooter({ text: message.author.tag, iconURL: message.author.avatarURL({ dynamic: true })})
.setDescription(`${message.author}, Lütfen ${member.toString()} Üyesinin Sıfırlamak İstediğiniz Veriyi Aşağıdaki Menüden Seçiniz.`)

    let msg = await message.channel.send({ embeds: [embed], components: [row] });
    const filter = i => i.user.id == message.author.id    
    let collector = await message.channel.createMessageComponentCollector({ filter, componentType: 'SELECT_MENU', max: 5, time: 120000 })

    collector.on("collect", async (button) => {

    if(button.values[0] === "stat_sıfırla") {   

     /* await messageUser.deleteMany({userID: member.user.id, guildID: message.guild.id})
      await voiceUser.deleteMany({userID: member.user.id, guildID: message.guild.id})
      await coin.deleteMany({userID: member.user.id, guildID: message.guild.id})
      await dolar.deleteMany({userID: member.user.id, guildID: message.guild.id})
      await db.deleteMany({userID: member.user.id, guildID: message.guild.id})
      await regstats.deleteMany({userID: member.user.id, guildID: message.guild.id})
*/
      const stat = new MessageEmbed()
      .setDescription(`${message.author}, ${member.toString()} Üyesinin Sıfırlamak İstediğiniz Stat Verisini Aşağıdaki Menüden Seçiniz.`) 
  
  await button.reply({embeds: [stat],components : [row1], ephemeral: true})
      }

      if(button.values[0] === "isim_sıfırla") {
    
        await name.deleteMany({userID: member.user.id, guildID: message.guild.id})
      const isim = new MessageEmbed()
      .setDescription(`${member.toString()} Üyesinin İsim Geçmişi Verisi ${message.author} Tarafından <t:${Math.floor(Date.now() / 1000)}> Tarihinde <t:${Math.floor(Date.now() / 1000)}:R> Temizlendi!`)

      button.reply({embeds: [isim],components : [], ephemeral: true}) 

       const isimlogembed = new MessageEmbed()
        .setAuthor({ name: `${message.guild.name}`, iconURL: `${message.guild.iconURL({ dynamic: true })}` })
        .setColor("RANDOM")
        .setDescription(`
        ${message.author} Üyesi ${member.toString()} İsimli Üyenin İsim Verilerini Sıfırladı.
        
        \`•\` **Sıfırlayan :** ${message.author} (\`${message.author.id}\`) 
        \`•\` **Sıfırlanan :** ${member} (\`${member.id}\`)    
        \`•\` **Sıfırlandığı Zaman :** <t:${Math.floor(Date.now() / 1000)}> (<t:${Math.floor(Date.now() / 1000)}:R>)
        `);

        verilog.send({embeds: [isimlogembed],components : []})
        msg.delete()
      
      }

  if(button.values[0] === "cezapuan_sıfırla") {

    await cezapuans.deleteMany({userID: member.user.id, guildID: message.guild.id})
    await ceza.deleteMany({userID: member.user.id, guildID: message.guild.id})
    const cezapuan = new MessageEmbed()
    .setDescription(`${member.toString()} Üyesinin Ceza Puan Verisi ${message.author} Tarafından <t:${Math.floor(Date.now() / 1000)}> Tarihinde <t:${Math.floor(Date.now() / 1000)}:R> Temizlendi!`) 


      button.reply({embeds: [cezapuan],components : [], ephemeral: true}) 

       const cezaplogembed = new MessageEmbed()
        .setAuthor({ name: `${message.guild.name}`, iconURL: `${message.guild.iconURL({ dynamic: true })}` })
        .setColor("RANDOM")
        .setDescription(`
        ${message.author} Üyesi ${member.toString()} İsimli Üyenin Ceza Puan Verilerini Sıfırladı.
        
        \`•\` **Sıfırlayan :** ${message.author} (\`${message.author.id}\`) 
        \`•\` **Sıfırlanan :** ${member} (\`${member.id}\`)    
        \`•\` **Sıfırlandığı Zaman :** <t:${Math.floor(Date.now() / 1000)}> (<t:${Math.floor(Date.now() / 1000)}:R>)
        `);

        verilog.send({embeds: [cezaplogembed],components : []})
        msg.delete()
    }
 if(button.values[0] === "sicil_sıfırla") {   

    await penals.deleteMany({userID: member.user.id, guildID: message.guild.id})
    const sicil = new MessageEmbed()
    .setDescription(`${member.toString()} Üyesinin Sicil Verisi ${message.author} Tarafından <t:${Math.floor(Date.now() / 1000)}> Tarihinde <t:${Math.floor(Date.now() / 1000)}:R> Temizlendi!`) 

      button.reply({embeds: [sicil],components : [], ephemeral: true}) 

       const sicillogembed = new MessageEmbed()
        .setAuthor({ name: `${message.guild.name}`, iconURL: `${message.guild.iconURL({ dynamic: true })}` })
        .setColor("RANDOM")
        .setDescription(`
        ${message.author} Üyesi ${member.toString()} İsimli Üyenin Sicil Verilerini Sıfırladı.
        
        \`•\` **Sıfırlayan :** ${message.author} (\`${message.author.id}\`) 
        \`•\` **Sıfırlanan :** ${member} (\`${member.id}\`)    
        \`•\` **Sıfırlandığı Zaman :** <t:${Math.floor(Date.now() / 1000)}> (<t:${Math.floor(Date.now() / 1000)}:R>)
        `);

        verilog.send({embeds: [sicillogembed],components : []})
        msg.delete()
    }



if(button.values[0] === "mesajsıfırla"){
 
  await messageUser.deleteMany({userID: member.user.id, guildID: message.guild.id})

      const mesajstat = new MessageEmbed()
      .setDescription(`${member.toString()} Üyesinin Mesaj Stat Verisi ${message.author} Tarafından <t:${Math.floor(Date.now() / 1000)}> Tarihinde <t:${Math.floor(Date.now() / 1000)}:R> Temizlendi!`) 
  
      button.reply({embeds: [mesajstat],components : [], ephemeral: true}) 

       const mesajlogembed = new MessageEmbed()
        .setAuthor({ name: `${message.guild.name}`, iconURL: `${message.guild.iconURL({ dynamic: true })}` })
        .setColor("RANDOM")
        .setDescription(`
        ${message.author} Üyesi ${member.toString()} İsimli Üyenin Mesaj Stat Verilerini Sıfırladı.
        
        \`•\` **Sıfırlayan :** ${message.author} (\`${message.author.id}\`) 
        \`•\` **Sıfırlanan :** ${member} (\`${member.id}\`)    
        \`•\` **Sıfırlandığı Zaman :** <t:${Math.floor(Date.now() / 1000)}> (<t:${Math.floor(Date.now() / 1000)}:R>)
        `);

        verilog.send({embeds: [mesajlogembed],components : []})
        msg.delete()
}

if(button.values[0] === "sessıfırla"){

        await voiceUser.deleteMany({userID: member.user.id, guildID: message.guild.id})

      const sesstat = new MessageEmbed()
      .setDescription(`${member.toString()} Üyesinin Ses Stat Verisi ${message.author} Tarafından <t:${Math.floor(Date.now() / 1000)}> Tarihinde <t:${Math.floor(Date.now() / 1000)}:R> Temizlendi!`) 
  
      button.reply({embeds: [sesstat],components : [], ephemeral: true}) 

       const seslogembed = new MessageEmbed()
        .setAuthor({ name: `${message.guild.name}`, iconURL: `${message.guild.iconURL({ dynamic: true })}` })
        .setColor("RANDOM")
        .setDescription(`
        ${message.author} Üyesi ${member.toString()} İsimli Üyenin Ses Stat Verilerini Sıfırladı.
        
        \`•\` **Sıfırlayan :** ${message.author} (\`${message.author.id}\`) 
        \`•\` **Sıfırlanan :** ${member} (\`${member.id}\`)    
        \`•\` **Sıfırlandığı Zaman :** <t:${Math.floor(Date.now() / 1000)}> (<t:${Math.floor(Date.now() / 1000)}:R>)
        `);

        verilog.send({embeds: [seslogembed],components : []})
        msg.delete()

}
if(button.values[0] === "coinsıfırla"){

      await coin.deleteMany({userID: member.user.id, guildID: message.guild.id})

  
      const coinstat = new MessageEmbed()
      .setDescription(`${member.toString()} Üyesinin Coin Verisi ${message.author} Tarafından <t:${Math.floor(Date.now() / 1000)}> Tarihinde <t:${Math.floor(Date.now() / 1000)}:R> Temizlendi!`) 
  
      button.reply({embeds: [coinstat],components : [], ephemeral: true}) 

       const coinlogembed = new MessageEmbed()
        .setAuthor({ name: `${message.guild.name}`, iconURL: `${message.guild.iconURL({ dynamic: true })}` })
        .setColor("RANDOM")
        .setDescription(`
        ${message.author} Üyesi ${member.toString()} İsimli Üyenin Coin Verilerini Sıfırladı.
        
        \`•\` **Sıfırlayan :** ${message.author} (\`${message.author.id}\`) 
        \`•\` **Sıfırlanan :** ${member} (\`${member.id}\`)    
        \`•\` **Sıfırlandığı Zaman :** <t:${Math.floor(Date.now() / 1000)}> (<t:${Math.floor(Date.now() / 1000)}:R>)
        `);

        verilog.send({embeds: [coinlogembed],components : []})
        msg.delete()
}
if(button.values[0] === "dolarsıfırla"){

      await dolar.deleteMany({userID: member.user.id, guildID: message.guild.id})

        const dolarstat = new MessageEmbed()
      .setDescription(`${member.toString()} Üyesinin Dolar Verisi ${message.author} Tarafından <t:${Math.floor(Date.now() / 1000)}> Tarihinde <t:${Math.floor(Date.now() / 1000)}:R> Temizlendi!`) 
  
      button.reply({embeds: [dolarstat],components : [], ephemeral: true}) 

       const dolarlogembed = new MessageEmbed()
        .setAuthor({ name: `${message.guild.name}`, iconURL: `${message.guild.iconURL({ dynamic: true })}` })
        .setColor("RANDOM")
        .setDescription(`
        ${message.author} Üyesi ${member.toString()} İsimli Üyenin Dolar Verilerini Sıfırladı.
        
        \`•\` **Sıfırlayan :** ${message.author} (\`${message.author.id}\`) 
        \`•\` **Sıfırlanan :** ${member} (\`${member.id}\`)    
        \`•\` **Sıfırlandığı Zaman :** <t:${Math.floor(Date.now() / 1000)}> (<t:${Math.floor(Date.now() / 1000)}:R>)
        `);

        verilog.send({embeds: [dolarlogembed],components : []})
        msg.delete()
}
if(button.values[0] === "davetsıfırla"){

      await db.deleteMany({userID: member.user.id, guildID: message.guild.id})

       const davetstat = new MessageEmbed()
      .setDescription(`${member.toString()} Üyesinin Davet Stat Verisi ${message.author} Tarafından <t:${Math.floor(Date.now() / 1000)}> Tarihinde <t:${Math.floor(Date.now() / 1000)}:R> Temizlendi!`) 
  
      button.reply({embeds: [davetstat],components : [], ephemeral: true}) 

       const davetlogembed = new MessageEmbed()
        .setAuthor({ name: `${message.guild.name}`, iconURL: `${message.guild.iconURL({ dynamic: true })}` })
        .setColor("RANDOM")
        .setDescription(`
        ${message.author} Üyesi ${member.toString()} İsimli Üyenin İnvite Verilerini Sıfırladı.
        
        \`•\` **Sıfırlayan :** ${message.author} (\`${message.author.id}\`) 
        \`•\` **Sıfırlanan :** ${member} (\`${member.id}\`)    
        \`•\` **Sıfırlandığı Zaman :** <t:${Math.floor(Date.now() / 1000)}> (<t:${Math.floor(Date.now() / 1000)}:R>)
        `);

        verilog.send({embeds: [davetlogembed],components : []})
        msg.delete() 

}
if(button.values[0] === "kayıtsıfırla"){

      await regstats.deleteMany({userID: member.user.id, guildID: message.guild.id})
      const kayıtstat = new MessageEmbed()
      .setDescription(`${member.toString()} Üyesinin Kayıt Stat Verisi ${message.author} Tarafından <t:${Math.floor(Date.now() / 1000)}> Tarihinde <t:${Math.floor(Date.now() / 1000)}:R> Temizlendi!`) 
  
      button.reply({embeds: [kayıtstat],components : [], ephemeral: true}) 

       const kayıtlogembed = new MessageEmbed()
        .setAuthor({ name: `${message.guild.name}`, iconURL: `${message.guild.iconURL({ dynamic: true })}` })
        .setColor("RANDOM")
        .setDescription(`
        ${message.author} Üyesi ${member.toString()} İsimli Üyenin Kayıt Verilerini Sıfırladı.
        
        \`•\` **Sıfırlayan :** ${message.author} (\`${message.author.id}\`) 
        \`•\` **Sıfırlanan :** ${member} (\`${member.id}\`)    
        \`•\` **Sıfırlandığı Zaman :** <t:${Math.floor(Date.now() / 1000)}> (<t:${Math.floor(Date.now() / 1000)}:R>)
        `);

        verilog.send({embeds: [kayıtlogembed],components : []})
        msg.delete()
}
if(button.values[0] === "hepsinisıfırla"){

       await messageUser.deleteMany({userID: member.user.id, guildID: message.guild.id})
      await voiceUser.deleteMany({userID: member.user.id, guildID: message.guild.id})
      await coin.deleteMany({userID: member.user.id, guildID: message.guild.id})
      await dolar.deleteMany({userID: member.user.id, guildID: message.guild.id})
      await db.deleteMany({userID: member.user.id, guildID: message.guild.id})
      await regstats.deleteMany({userID: member.user.id, guildID: message.guild.id})
      const hepsi = new MessageEmbed()
      .setDescription(`${member.toString()} Üyesinin Stat Verisi ${message.author} Tarafından <t:${Math.floor(Date.now() / 1000)}> Tarihinde <t:${Math.floor(Date.now() / 1000)}:R> Temizlendi!`) 
  
    button.reply({embeds: [hepsi],components : [], ephemeral: true})

       const hepsilogembed = new MessageEmbed()
        .setAuthor({ name: `${message.guild.name}`, iconURL: `${message.guild.iconURL({ dynamic: true })}` })
        .setColor("RANDOM")
        .setDescription(`
        ${message.author} Üyesi ${member.toString()} İsimli Üyenin Tüm Stat Verilerini Sıfırladı.
        
        \`•\` **Sıfırlayan :** ${message.author} (\`${message.author.id}\`) 
        \`•\` **Sıfırlanan :** ${member} (\`${member.id}\`)    
        \`•\` **Sıfırlandığı Zaman :** <t:${Math.floor(Date.now() / 1000)}> (<t:${Math.floor(Date.now() / 1000)}:R>)
        `);

    verilog.send({embeds: [hepsilogembed],components : []})
    msg.delete()
}
 if(button.values[0] === "iptal_button") {   
    const iptal = new MessageEmbed()
    .setDescription(`✅ Sıfırlama işlemi iptal edildi`) 

msg.edit({embeds: [iptal],components : []}).then((e) => setTimeout(() => { e.delete(); }, 10000));
    }


  })
  }
};
