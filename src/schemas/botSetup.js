const { Schema, model } = require("mongoose");

const schema = Schema({ 
  guildID: { type: String, default: "" },
  Tag: { type: String, default: "" },
  SecondaryTag: { type: String, default: "" },
  Link: { type: String, default: "" },

  ManRole: { type: Array, default: [] },
  WomanRole: { type: Array, default: [] },
  UnregisterRole: { type: Array, default: [] },
  FamilyRole: { type: Array, default: [] },
  VipRole: { type: Array, default: [] },
  MüzisyenRole: { type: Array, default: [] },
  TasarımcıRole: { type: Array, default: [] },
  StreamerRole: { type: Array, default: [] },
  TerapistRole: { type: Array, default: [] },
  SorunÇözücüRole: { type: Array, default: [] },
  BoosterRole: { type: Array, default: [] },
  StaffRole: { type: Array, default: [] },
  YetkiliRole: { type: Array, default: [] },
  TeyitciRole: { type: Array, default: [] },
  SahipRole: { type: Array, default: [] },
  RolVericiRole: { type: Array, default: [] },

  Jail: { type: Array, default: [] },
  CMute: { type: Array, default: [] },
  VMute: { type: Array, default: [] },
  FakeAcc: { type: Array, default: [] },
  WarnH: { type: Array, default: [] },
  BanH: { type: Array, default: [] },
  JailH: { type: Array, default: [] },
  CMuteH: { type: Array, default: [] },
  VMuteH: { type: Array, default: [] },

  Rules: { type: String, default: "" },
  Chat: { type: String, default: "" },
  WelcomeChat: { type: String, default: "" },
  InviteChat: { type: String, default: "" },
  BanLog: { type: String, default: "" },
  JailLog: { type: String, default: "" },
  CMuteLog: { type: String, default: "" },
  VMuteLog: { type: String, default: "" },
  WarnLog: { type: String, default: "" },
  CezaPuanLog: { type: String, default: "" },

  RegisterP: { type: String, default: "" },
  PublicP: { type: String, default: "" },
  FunP: { type: Array, default: [] },
  SolvingP: { type: Array, default: [] },
  PrivateP: { type: String, default: "" },
  AloneP: { type: String, default: "" },

});

module.exports = model("botSetup", schema);