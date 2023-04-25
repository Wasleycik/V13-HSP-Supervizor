const { MessageEmbed, Client, Message, MessageActionRow, MessageSelectMenu } = require("discord.js");
const Discord = require('discord.js');
const client = global.bot;
const conf = require("../../configs/sunucuayar.json")
const isimcek = require("../../configs/isimcek.json")
const emojis = require("../../configs/emojis.json")

module.exports = {
  conf: {
    aliases: ["kısayollar"],
    name: "kısayollar",
    help: "kısayollar",
    category: "sahip",
    owner: true,
  },
 
    run: async (client, message, args, prefix) => {
 
			const kısayollar = new MessageActionRow()
			.addComponents(
			  new MessageSelectMenu()
				.setCustomId('kısayollar')
				.setPlaceholder('Komutlar hakkında yardım almak için tıkla!')
				.addOptions([
				  {
					label: 'Kullanıcı Komutları',
					description: 'Kullanıcı Komutlar kategorisinin yardım bilgileri için tıkla!',
					value: 'kısayollar1',
				  },
				  {
					label: 'Market Komutları',
					description: 'Market Komutlar kategorisinin yardım bilgileri için tıkla!',
					value: 'kısayollar2',
				  },						
				  {
					label: 'Kayıt Komutları',
					description: 'Kayıt Komutlar kategorisinin yardım bilgileri için tıkla!',
					value: 'kısayollar3',
				  },
				  {
					label: 'Cezalandırma Komutları',
					description: 'Cezalandırma Komutlar kategorisinin yardım bilgileri için tıkla!',
					value: 'kısayollar4',
				  },
				  {
					label: 'Stat Komutları',
					description: 'Stat Komutlar kategorisinin yardım bilgileri için tıkla!',
					value: 'kısayollar5',
				  },
				  {
					label: 'Yetkili Komutları',
					description: 'Yetkili Komutlar kategorisinin yardım bilgileri için tıkla!',
					value: 'kısayollar6',
				  },
				  {
					label: 'Kurucu Komutları',
					description: 'Kurucu Komutlar kategorisinin yardım bilgileri için tıkla!',
					value: 'kısayollar7',
				  },
				  {
					label: 'Sahip Komutları',
					description: 'Sahip Komutlar kategorisinin yardım bilgileri için tıkla!',
					value: 'kısayollar8',
				  },
				]),
			);

     await message.channel.send({ content : `${star} \`${message.guild.name}\`, bot komutlarını incelemek için aşağıdaki menüyü kullan!`, components: [kısayollar] });

    },
  };

  client.on('interactionCreate', interaction => {

    if (!interaction.isSelectMenu()) return;

if (interaction.values[0] === "kısayollar1") {
    interaction.reply({ content : `
\`\`\`
${client.commands.filter(x => x.conf.category !== "-" && x.conf.category == "kullanıcı").map(x => `.${x.conf.help}`).join('\n')}
\`\`\`
`, ephemeral: true })
};

if (interaction.values[0] === "kısayollar2") {
    interaction.reply({ content : `
\`\`\`
${client.commands.filter(x => x.conf.category !== "-" && x.conf.category == "market").map(x => `.${x.conf.help}`).join('\n')}
\`\`\`
`, ephemeral: true })
};

if (interaction.values[0] === "kısayollar3") {
    interaction.reply({ content : `
\`\`\`
${client.commands.filter(x => x.conf.category !== "-" && x.conf.category == "kayıt").map(x => `.${x.conf.help}`).join('\n')}
\`\`\`
`, ephemeral: true })
};
  
if (interaction.values[0] === "kısayollar4") {
    interaction.reply({ content : `
\`\`\`
${client.commands.filter(x => x.conf.category !== "-" && x.conf.category == "cezalandırma").map(x => `.${x.conf.help}`).join('\n')}
\`\`\`
`, ephemeral: true })
};

if (interaction.values[0] === "kısayollar5") {
    interaction.reply({ content : `
\`\`\`
${client.commands.filter(x => x.conf.category !== "-" && x.conf.category == "stat").map(x => `.${x.conf.help}`).join('\n')}
\`\`\`
`, ephemeral: true })
};

if (interaction.values[0] === "kısayollar6") {
    interaction.reply({ content : `
\`\`\`
${client.commands.filter(x => x.conf.category !== "-" && x.conf.category == "yetkili").map(x => `.${x.conf.help}`).join('\n')}
\`\`\`
`, ephemeral: true })
};

if (interaction.values[0] === "kısayollar7") {
    interaction.reply({ content : `
\`\`\`
${client.commands.filter(x => x.conf.category !== "-" && x.conf.category == "yönetim").map(x => `.${x.conf.help}`).join('\n')}
\`\`\`
`, ephemeral: true })
};

if (interaction.values[0] === "kısayollar8") {
    interaction.reply({ content : `
\`\`\`
${client.commands.filter(x => x.conf.category !== "-" && x.conf.category == "sahip").map(x => `.${x.conf.help}`).join('\n')}
\`\`\`
`, ephemeral: true })
};
});
      
