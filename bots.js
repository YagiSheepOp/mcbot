const mineflayer = require("mineflayer")

console.log("=== FINAL CLEAN BOT SCRIPT ===")

const HOST = "budget-1.vulcanmc.fun"
const PORT = 25007
const JOIN_DELAY = 8000

const BOT_NAMES = [
  "YagiSheep",
  "Istieler",
  "dreamguy",
  "demons_here",
  "Sm_Gop",
  "ShadowX",
  "FireLad",
  "KnightOP",
  "DarkSoul",
  "IceWolf",
  "RogueYT",
  "SwiftKill"
]

let i = 0

function startBot(name) {
  console.log("Starting:", name)

  const bot = mineflayer.createBot({
    host: HOST,
    port: PORT,
    username: name,
    version: false
  })

  bot.once("login", () => console.log("[LOGIN]", name))
  bot.once("spawn", () => console.log("[SPAWN]", name))

  bot.on("kicked", r => console.log("[KICKED]", name, r))
  bot.on("error", e => console.log("[ERROR]", name, e.message))
}

const interval = setInterval(() => {
  if (i >= BOT_NAMES.length) {
    clearInterval(interval)
    return
  }
  startBot(BOT_NAMES[i])
  i++
}, JOIN_DELAY)

setInterval(() => {
  console.log("Alive:", i)
}, 60000)
