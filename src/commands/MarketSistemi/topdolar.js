const dolar = require("../../schemas/dolar");
const conf = require("../../configs/sunucuayar.json")
const { MessageEmbed } = require("discord.js");
const moment = require("moment");
require("moment-duration-format");
module.exports = {
  conf: {
    aliases: ["topdolar","topcoin"],
    name: "topdolar",
    help: "topdolar",
    category: "market",
  }, 
  
  run: async (client, message, args, embed) => { 
    
const dolarData = await dolar.find({ guildID: message.guild.id }).sort({ dolar: -1 });
let dolarSum = 0;
const dolarUsers = dolarData.splice(0, 20).map((x, index) => {
dolarSum += x.dolar;
return `\` ${index+1} \` <@${x.userID}> \`${Number(x.dolar).toLocaleString()} Dolar\``
}).join(`\n`);
      
       
const embeds = new MessageEmbed()
.setDescription(`
🎉 Aşağıda **${message.guild.name}** sunucusunun genel dolar sıralaması listelenmektedir.
              
${dolarUsers.length > 0 ? dolarUsers : "Veri Bulunmuyor."}
              
Genel Dolar sıralaması \`${moment(Date.now()).format("LLL")}\` tarihinde otomatik olarak güncellenmiştir.`)
.setAuthor({ name: message.guild.name, iconURL: message.guild.iconURL({ dynamic: true, size: 2048 })})
.setThumbnail(message.guild.iconURL({ dynamic: true, size: 2048 }));

message.channel.send({ embeds: [embeds] })   
}}