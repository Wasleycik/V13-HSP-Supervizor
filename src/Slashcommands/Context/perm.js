const { ApplicationCommandType } = require('discord-api-types/v10');
const { ContextMenuCommandBuilder, hyperlink } = require("@discordjs/builders");
const { MessageEmbed, MessageActionRow, MessageSelectMenu, IntegrationApplication } = require("discord.js");
const conf = require("../../configs/sunucuayar.json");
const isimcek = require("../../configs/isimcek.json");
const moment = require("moment");
require("moment-duration-format")
moment.locale("tr")
const client = global.bot;

module.exports = {
	data: new ContextMenuCommandBuilder()
	.setName('Perm Ver-Al')
	.setType(ApplicationCommandType.User),
		
  async execute(interaction, client) {
    let uye = client.guilds.cache.get(conf.GuildID).members.cache.get(interaction.targetId);
    if (!uye) return;

    if (!interaction.member.permissions.has("ADMINISTRATOR")) return interaction.reply({content: `Yönetici olmadığınız için kullanamazsınız!`, ephemeral: true })
    if(interaction.user.id === uye.id) return interaction.reply({content: `Kendine Rol Veremezsin dostum!`, ephemeral: true })
    
    const perm = new MessageActionRow()
    .addComponents(
        new MessageSelectMenu()
            .setCustomId('perm')
            .setPlaceholder('Eklemek istediğiniz perm için tıklayınız')
            .addOptions([
                {
                    label: 'Vip',
                    value: 'vip',
                },
                {
                    label: 'Müzisyen',
                    value: 'müzisyen',
                },						
                {
                    label: 'Tasarımcı',
                    value: 'tasarımcı',
                },
                {
                    label: 'Streamer',
                    value: 'streamer',
                },
                {
                    label: 'Terapist',
                    value: 'terapi',
                },
                {
                    label: 'Sorun Çözücü',
                    value: 'sorun',
                },
            ]),
    );
    
    interaction.reply({ content : `${uye} kullanıcısına perm eklemek için aşağıdaki menüyü kullanınız`, components: [perm], ephemeral: true });
    
    const filter = i => i.user.id == interaction.user.id 
    const collector = interaction.channel.createMessageComponentCollector({ filter, componentType: 'SELECT_MENU', max: 1, time: 20000 });
    collector.on("collect", async (interaction) => {
    
         if (interaction.values[0] === "vip") {
            uye.roles.cache.has(conf.vipRole) ? uye.roles.remove(conf.vipRole) : uye.roles.add(conf.vipRole);
            if(!uye.roles.cache.has(conf.vipRole)) {
              client.channels.cache.find(x => x.name.includes(isimcek.kanalcek.rollog)).send({ embeds: [new MessageEmbed().setDescription(`${uye} isimli kişiye **${moment(Date.now()).format("LLL")}** tarihinde ${interaction.user} tarafından **Vip** adlı rol verildi.`)]})
              interaction.reply({ content:`✅ Başarıyla ${uye}, isimli kişiye **Vip** rolü verildi.`, components: [], ephemeral: true });
            } else {
              client.channels.cache.find(x => x.name.includes(isimcek.kanalcek.rollog)).send({ embeds: [new MessageEmbed().setDescription(`${uye} isimli kişiye **${moment(Date.now()).format("LLL")}** tarihinde ${interaction.user} tarafından **Vip** adlı rol geri alındı.`)]})
              interaction.reply({ content:`✅ Başarıyla ${uye}, isimli kişinin **Vip** rolü geri alındı.`, components: [], ephemeral: true });
            };
         }
    
         if (interaction.values[0] === "müzisyen") {
            uye.roles.cache.has(conf.müzisyenRole) ? uye.roles.remove(conf.müzisyenRole) : uye.roles.add(conf.müzisyenRole);
            if(!uye.roles.cache.has(conf.müzisyenRole)) {
              client.channels.cache.find(x => x.name.includes(isimcek.kanalcek.rollog)).send({ embeds: [new MessageEmbed().setDescription(`${uye} isimli kişiye **${moment(Date.now()).format("LLL")}** tarihinde ${interaction.user} tarafından **Müzisyen** adlı rol verildi.`)]})
              interaction.reply({ content:`✅ Başarıyla ${uye}, isimli kişiye **Müzisyen** rolü verildi.`, components: [], ephemeral: true });
            } else {
              client.channels.cache.find(x => x.name.includes(isimcek.kanalcek.rollog)).send({ embeds: [new MessageEmbed().setDescription(`${uye} isimli kişiye **${moment(Date.now()).format("LLL")}** tarihinde ${interaction.user} tarafından **Müzisyen** adlı rol geri alındı.`)]})
              interaction.reply({ content:`✅ Başarıyla ${uye}, isimli kişinin **Müzisyen** rolü geri alındı.`, components: [], ephemeral: true });
            };
         }
    
        if (interaction.values[0] === "tasarımcı") {
            uye.roles.cache.has(conf.tasarımcıRole) ? uye.roles.remove(conf.tasarımcıRole) : uye.roles.add(conf.tasarımcıRole);
            if(!uye.roles.cache.has(conf.tasarımcıRole)) {
              client.channels.cache.find(x => x.name.includes(isimcek.kanalcek.rollog)).send({ embeds: [new MessageEmbed().setDescription(`${uye} isimli kişiye **${moment(Date.now()).format("LLL")}** tarihinde ${interaction.user} tarafından **Tasarımcı** adlı rol verildi.`)]})
              interaction.reply({ content:`✅ Başarıyla ${uye}, isimli kişiye **Tasarımcı** rolü verildi.`, components: [], ephemeral: true });
            } else {
              client.channels.cache.find(x => x.name.includes(isimcek.kanalcek.rollog)).send({ embeds: [new MessageEmbed().setDescription(`${uye} isimli kişiye **${moment(Date.now()).format("LLL")}** tarihinde ${interaction.user} tarafından **Tasarımcı** adlı rol geri alındı.`)]})
              interaction.reply({ content:`✅ Başarıyla ${uye}, isimli kişinin **Tasarımcı** rolü geri alındı.`, components: [], ephemeral: true });
            };
         }
    
        if (interaction.values[0] === "streamer") {
            uye.roles.cache.has(conf.streamerRole) ? uye.roles.remove(conf.streamerRole) : uye.roles.add(conf.streamerRole);
            if(!uye.roles.cache.has(conf.streamerRole)) {
              client.channels.cache.find(x => x.name.includes(isimcek.kanalcek.rollog)).send({ embeds: [new MessageEmbed().setDescription(`${uye} isimli kişiye **${moment(Date.now()).format("LLL")}** tarihinde ${interaction.user} tarafından **Streamer** adlı rol verildi.`)]})
              interaction.reply({ content:`✅ Başarıyla ${uye}, isimli kişiye **Streamer** rolü verildi.`, components: [], ephemeral: true });
            } else {
              client.channels.cache.find(x => x.name.includes(isimcek.kanalcek.rollog)).send({ embeds: [new MessageEmbed().setDescription(`${uye} isimli kişiye **${moment(Date.now()).format("LLL")}** tarihinde ${interaction.user} tarafından **Streamer** adlı rol geri alındı.`)]})
              interaction.reply({ content:`✅ Başarıyla ${uye}, isimli kişinin **Streamer** rolü geri alındı.`, components: [], ephemeral: true });
            };
         }
    
         if (interaction.values[0] === "terapi") {
          uye.roles.cache.has(conf.terapistRole) ? uye.roles.remove(conf.terapistRole) : uye.roles.add(conf.terapistRole);
          if(!uye.roles.cache.has(conf.terapistRole)) {
            client.channels.cache.find(x => x.name.includes(isimcek.kanalcek.rollog)).send({ embeds: [new MessageEmbed().setDescription(`${uye} isimli kişiye **${moment(Date.now()).format("LLL")}** tarihinde ${interaction.user} tarafından **Terapist** adlı rol verildi.`)]})
            interaction.reply({ content:`✅ Başarıyla ${uye}, isimli kişiye **Terapist** rolü verildi.`, components: [], ephemeral: true });
          } else {
            client.channels.cache.find(x => x.name.includes(isimcek.kanalcek.rollog)).send({ embeds: [new MessageEmbed().setDescription(`${uye} isimli kişiye **${moment(Date.now()).format("LLL")}** tarihinde ${interaction.user} tarafından **Terapist** adlı rol geri alındı.`)]})
            interaction.reply({ content:`✅ Başarıyla ${uye}, isimli kişinin **Terapist** rolü geri alındı.`, components: [], ephemeral: true });
          };
       }
    
        if (interaction.values[0] === "sorun") {
            uye.roles.cache.has(conf.sorunçözücüRole) ? uye.roles.remove(conf.sorunçözücüRole) : uye.roles.add(conf.sorunçözücüRole);
            if(!uye.roles.cache.has(conf.sorunçözücüRole)) {
              client.channels.cache.find(x => x.name.includes(isimcek.kanalcek.rollog)).send({ embeds: [new MessageEmbed().setDescription(`${uye} isimli kişiye **${moment(Date.now()).format("LLL")}** tarihinde ${interaction.user} tarafından **Sorun Çözücü** adlı rol verildi.`)]})
              interaction.reply({ content:`✅ Başarıyla ${uye}, isimli kişiye **Sorun Çözücü** rolü verildi.`, components: [], ephemeral: true });
            } else {
              client.channels.cache.find(x => x.name.includes(isimcek.kanalcek.rollog)).send({ embeds: [new MessageEmbed().setDescription(`${uye} isimli kişiye **${moment(Date.now()).format("LLL")}** tarihinde ${interaction.user} tarafından **Sorun Çözücü** adlı rol geri alındı.`)]})
              interaction.reply({ content:`✅ Başarıyla ${uye}, isimli kişinin **Sorun Çözücü** rolü geri alındı.`, components: [], ephemeral: true });
            };
         }
        })
}
};