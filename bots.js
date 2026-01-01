const mineflayer = require("mineflayer")

// ===== SERVER DETAILS =====
const SERVER_IP = "budget-1.vulcanmc.fun"
const SERVER_PORT = 25007

// ===== JOIN SETTINGS =====
const JOIN_DELAY = 5000 // 5 seconds between each bot

// ===== REAL BOT NAMES (EDIT HERE) =====
const BOT_NAMES = [
  "YagiSheep",
  "Istieler",
  "dreamguy",
  "demons_here",
  "Sm_Gop",
  "ShadowX",
  "FireLad",
  "PvPGod",
  "KnightOP",
  "NoobSlayer",
  "DarkSoul",
  "IceWolf",
  "RogueYT",
  "SwiftKill",
  "GhostPvP"
]

// ===========================

let currentIndex = 0

function startBot(username) {
  const bot = mineflayer.createBot({
    host: SERVER_IP,
    port: SERVER_PORT,
    username: username,
    version: false // auto-detect
  })

  bot.on("login", () => {
    console.log(`[+] ${username} joined the server`)
  })

  bot.on("end", () => {
    console.log(`[-] ${username} disconnected`)
  })

  bot.on("kicked", reason => {
    console.log(`[KICKED] ${username}:`, reason)
  })

  bot.on("error", err => {
    console.log(`[ERROR] ${username}: ${err.message}`)
  })

  // Anti-AFK (light)
  bot.once("spawn", () => {
    setInterval(() => {
      try {
        bot.setControlState("jump", true)
        setTimeout(() => bot.setControlState("jump", false), 300)
      } catch {}
    }, 30000)
  })
}

// ===== START BOTS ONE BY ONE =====
const joinInterval = setInterval(() => {
  if (currentIndex >= BOT_NAMES.length) {
    console.log("All bots attempted.")
    clearInterval(joinInterval)
    return
  }

  const name = BOT_NAMES[currentIndex]
  console.log(`Starting bot: ${name}`)
  startBot(name)
  currentIndex++

}, JOIN_DELAY)

// ===== KEEP RAILWAY ALIVE =====
setInterval(() => {
  console.log("Service alive | Bots planned:", BOT_NAMES.length)
}, 60000)
