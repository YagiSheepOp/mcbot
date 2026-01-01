const mineflayer = require("mineflayer")

console.log("=== BOT SCRIPT CLEAN v4 ===")

const HOST = "budget-1.vulcanmc.fun"
const PORT = 25007

// SLOW JOIN (important)
const JOIN_DELAY = 7000

// FIXED REAL NAMES
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

// NO reconnects
// NO chat
// NO movement

let index = 0

function startBot(name) {
  const bot = mineflayer.createBot({
    host: HOST,
    port: PORT,
    username: name,
    version: false,
    hideErrors: true
  })

  bot.on("login", () => {
    console.log(`[+] ${name} logged in`)
  })

  bot.on("spawn", () => {
    console.log(`[✓] ${name} spawned`)
  })

  // 🚫 DISABLE CHAT COMPLETELY (FIXES crash)
  bot.removeAllListeners("chat")
  bot._client.removeAllListeners("chat")
  bot._client.removeAllListeners("player_chat")

  bot.on("kicked", reason => {
    console.log(`[KICKED] ${name}`)
  })

  bot.on("error", err => {
    console.log(`[ERROR] ${name}: ${err.message}`)
  })
}

// JOIN ONE BY ONE ONLY
const joinInterval = setInterval(() => {
  if (index >= BOT_NAMES.length) {
    clearInterval(joinInterval)
    console.log("All bots attempted.")
    return
  }

  const name = BOT_NAMES[index]
  console.log(`Starting bot ${index + 1}: ${name}`)
  startBot(name)
  index++

}, JOIN_DELAY)

// Keep Railway alive
setInterval(() => {
  console.log("Alive | Bots attempted:", index)
}, 60000)
