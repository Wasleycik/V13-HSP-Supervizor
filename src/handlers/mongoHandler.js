const mongoose = require("mongoose");
const conf = require("../configs/sunucuayar.json")
const isimcek = require("../configs/isimcek.json")
const emojis = require("../configs/emojis.json")

mongoose.connect(conf.Main.mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true });

mongoose.connection.on("connected", () => {
  console.log("✔️ [MONGO] Database bağlantısı tamamlandı!");
});
mongoose.connection.on("error", () => {
  console.error("❗️ [HATA] Database bağlantısı kurulamadı!");
});