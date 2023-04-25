const { Client, Message, MessageEmbed} = require("discord.js");
const conf = require("../../configs/sunucuayar.json");
module.exports = {
    conf: {
      aliases: ["banner-oluştur"],
      name: "banner-oluştur",
      help: "banner-oluştur",
      category: "kullanıcı",
    },
  
run: async (client, message, args, embed, prefix) => {

 if(message.channel.id !== conf.botcommandschannel) return message.reply({content: `Bu Komutu Sadece <#${conf.botcommandschannel}> Kanalında Kullanabilirsin.`}).then((e) => setTimeout(() => { e.delete(); }, 5000));

    let yazi = args.slice(0).join(' ');
    if(!yazi) return message.reply("argümandoldur").then(s => setTimeout(() => s.delete().catch(err => {}), 5000));
     const bannerurl = `https://flamingtext.com/net-fu/proxy_form.cgi?imageoutput=true&script=uprise-logo&text=${yazi}`
  .replace(' ', '+')
    embed.setDescription(`[Oluşturulan Arkaplan İçin TIKLA](${bannerurl})`)
	    .setImage(bannerurl)
    message.channel.send({embeds: [embed]});
    }
};