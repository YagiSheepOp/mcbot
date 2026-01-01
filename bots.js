const mineflayer = require("mineflayer")

console.log("=== REAL NAME BOT SCRIPT ACTIVE ===")

const HOST = "budget-1.vulcanmc.fun"
const PORT = 25007
const JOIN_DELAY = 8001

// 👇 REAL PLAYER-LIKE NAMES (EDIT HERE)
const BOT_NAMES = [
  "YagiSheep",
  "Istieler",
  "dreamguy",
  "demons_here",
  "Sm_Gop"
]

let index = 0

function startBot(name) {
  console.log("Starting bot with name:", name)

  const bot = mineflayer.createBot({
    host: HOST,
    port: PORT,
    username: name,   // ✅ FIXED NAME
    version: false
  })

  bot.once("login", () => {
    console.log("[LOGIN OK]", name)
  })

  bot.on("kicked", r => console.log("[KICKED]", name, r))
  bot.on("error", e => console.log("[ERROR]", name, e.message))
}

const interval = setInterval(() => {
  if (index >= BOT_NAMES.length) {
    clearInterval(interval)
    return
  }

  startBot(BOT_NAMES[index])
  index++
}, JOIN_DELAY)

setInterval(() => {
  console.log("Alive | Bots started:", index)
}, 60000)
