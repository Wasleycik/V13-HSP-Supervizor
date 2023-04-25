const conf = require("../../configs/sunucuayar.json")
const { red, green } = require("../../configs/emojis.json");
const voice = require("../../schemas/voiceInfo");
const { MessageEmbed } = require("discord.js");
const moment = require("moment");
require("moment-duration-format");

module.exports = {
  conf: {
    aliases: ["nerede", "n","sestemi"],
    name: "nerede",
    help: "nerede",
    category: "yetkili",
  },

  run: async (client, message, args, embed) => {
    if(!conf.teyitciRolleri.some(oku => message.member.roles.cache.has(oku)) && !conf.sahipRolu.some(oku => message.member.roles.cache.has(oku)) && !message.member.permissions.has('ADMINISTRATOR')) 
    {message.react(red)
    return
    }
    const channel = message.guild.channels.cache.get(args[0]);
    const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;
    if (channel) {
      const data = await voice.find({}).sort({ date: -1 });
      message.reply({embeds: [embed.setDescription(`
\`${channel.name}\` adlı kanaldaki üyelerin ses bilgileri:

${channel.members.map((x) => `${x.toString()}: \`${data.find((u) => u.userID === x.user.id) ? moment.duration(Date.now() - data.find((u) => u.userID === x.user.id).date).format("H [saat], m [dakika], s [saniyedir]") : "Bulunamadı!"} seste.\``).join("\n")}
      `)]});
    } else {
      if (!member.voice.channel) return message.channel.send({ content:`${red} ${member.toString()} üyesi herhangi bir ses kanalında bulunmuyor!`});

      const data = await voice.findOne({ userID: member.user.id });
      message.react(green)
      let voiceChannel = member.voice.channel
      let limit = member.voice.channel.userLimit || "~";
      let mic = member.voice.selfMute ? `Kapalı!` : `Açık!`
      let kulak = member.voice.selfDeaf ? `Kapalı!` : `Açık!`
      let ekran =  member.voice.streaming ? `Açık!` : `Kapalı!`
      let kamera = member.voice.selfVideo ? `Açık!` : `Kapalı!`

      voiceChannel.createInvite().then(invite =>
message.reply({ embeds: [embed.setDescription(`
${member.toString()} kişisi <#${member.voice.channel.id}> kanalında. Kanala gitmek için [tıklaman](https://discord.gg/${invite.code}) yeterli

**Ses durumu**:
Mikrofon: \`${member.voice.mute ? `Kapalı` : `Açık`}\`
Kulaklık: \`${member.voice.deaf ? `Kapalı` : `Açık`}\`
Ekran: \`${ekran}\`
Kamera: \`${kamera}\`
Doluluk: \` ${member.voice.channel.members.size}/${limit} \`

**Ses kanalında bulunan üyeler**:
\`\`\`
${member.voice.channel.members.size <= 8 ? member.voice.channel.members.map(x => x.user.tag).join("\n") : `${member.voice.channel.members.array().slice(0, 8).map(x => x.user.tag).join("\n")} ve ${member.voice.channel.members.size - 8} kişi daha.`}
\`\`\` 
`).setAuthor({ name: member.user.tag, iconURL: member.user.displayAvatarURL({ dynamic: true }) }).setFooter({ text: `${moment(Date.now()).format("LLL")}`})]}));

    }
  },
};