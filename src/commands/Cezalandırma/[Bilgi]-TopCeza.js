const conf = require("../../configs/sunucuayar.json")
const isimcek = require("../../configs/isimcek.json")
const emojis = require("../../configs/emojis.json")
const ceza = require("../../schemas/ceza");
module.exports = {
  conf: {
    aliases: ["topceza","tc"],
    name: "topceza",
    help: "topceza",
    category: "cezalandırma",
  },

  run: async (client, message, args, embed) => {
    let cezaTop = await ceza.find({ guildID: message.guild.id }).sort({ top: -1 });
    if (!cezaTop.length) 
    {
    message.channel.send({ content:"Herhangi bir ceza verisi bulunamadı!"}).then((e) => setTimeout(() => { e.delete(); }, 5000)); 
    return }
    let list = cezaTop
    .filter((x) => message.guild.members.cache.has(x.userID))
    .splice(0, 20)
    .map((x, i) => `${x.userID === message.author.id ? `\` ${i + 1} \` <@${x.userID}> Toplam **${x.top}** **(Sen)**` : `\` ${i + 1} \` <@${x.userID}> Toplam **${x.top}**`}`)
    .join("\n");

    message.channel.send({ embeds: [embed.setDescription(list)] });

},
};


