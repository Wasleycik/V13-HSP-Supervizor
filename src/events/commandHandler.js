const { MessageEmbed } = require("discord.js");
const client = global.bot;
let sended = false;
const conf = require("../configs/sunucuayar.json")
const isimcek = require("../configs/isimcek.json")
const emojis = require("../configs/emojis.json")
setInterval(() => {
  client.cooldown.forEach((x, index) => {
    if (Date.now() - x.lastUsage > x.cooldown) client.cooldown.delete(index);
  });
}, 8000);

module.exports = async (message) => {
  let prefix = conf.Main.prefix.find((x) => message.content.toLowerCase().startsWith(x));
  if (message.author.bot || !message.guild || !prefix || conf.unregRoles.some(x => message.member.roles.cache.has(x)) || conf.jailRole.some(x => message.member.roles.cache.has(x))) return;
  let args = message.content.substring(prefix.length).trim().split(" ");
  let commandName = args[0].toLowerCase();

  const embed = new MessageEmbed().setFooter({ text: conf.AltBaşlık}).setColor(message.member.displayHexColor).setAuthor({ name: message.member.displayName, iconURL: message.author.avatarURL({ dynamic: true })});

  args = args.splice(1);
  let cmd = client.commands.has(commandName) ? client.commands.get(commandName) : client.commands.get(client.aliases.get(commandName));
  let komutLog = client.channels.cache.find(x => x.name.includes(isimcek.kanalcek.komutlog));

  if (cmd) {
    if (cmd.conf.owner && !conf.owners.includes(message.author.id)) return;
    const cooldown = cmd.conf.cooldown || 3000;
    const cd = client.cooldown.get(message.author.id);
    if (cd) {
      const diff = Date.now() - cd.lastUsage;
      if (diff < cooldown)
        if (!sended) {
          sended = true;
          return message.channel.send({ content:`${message.author}, Bu komutu tekrar kullanabilmek için **${Number(((cooldown - diff) / 1000).toFixed(2))}** daha beklemelisin!`}).then((x) => x.delete({ timeout: (cooldown - diff) }));
        }
    } else client.cooldown.set(message.author.id, { cooldown, lastUsage: Date.now() });
    cmd.run(client, message, args, embed, prefix);
    const ozi = new MessageEmbed()
    .setColor("#2f3136")
    .setTimestamp()
    .setFooter({ text: `Kullanma Zamanı :`})
    .setDescription(`
    ${message.author} tarafından ${message.channel} kanalında \`${prefix}${commandName}\` komutu kullanıldı.
                        
    \`•\` Komut Kanalı: ${message.channel} - (\`${message.channel.id}\`)
    \`•\` Komut Sahibi: ${message.author} - (\`${message.author.id}\`)
    \`•\` Komut İçeriği: \`\`\`${message.content}\`\`\`
    `)
    if(komutLog) komutLog.wsend({ embeds: [ozi]})
  }
};

module.exports.conf = {
  name: "messageCreate",
};
