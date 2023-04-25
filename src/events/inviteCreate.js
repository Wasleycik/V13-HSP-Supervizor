const client = global.bot;
const conf = require("../configs/sunucuayar.json")
const isimcek = require("../configs/isimcek.json")
const emojis = require("../configs/emojis.json")

/**
 * @param {Invite} invite
 * @returns {Promise<void>}
 */

 module.exports = async (invite) => {
  const invites = await invite.guild.invites.fetch();

  const codeUses = new Map();
  invites.each(inv => codeUses.set(inv.code, inv.uses));

  client.invites.set(invite.guild.id, codeUses);
};

module.exports.conf = {
  name: "inviteCreate",
};