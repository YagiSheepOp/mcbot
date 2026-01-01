const mineflayer = require("mineflayer")

/* ========= SERVER CONFIG ========= */
const HOST = "budget-1.vulcanmc.fun"
const PORT = 25007

/* ========= BOT SETTINGS ========= */
const JOIN_DELAY = 6000   // 6 seconds (IMPORTANT)
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
] // 👈 12 bots (same as before)

/* ================================= */

let i = 0

function createBot(name) {
  const bot = mineflayer.createBot({
    host: HOST,
    port: PORT,
    username: name,
    version: false
  })

  bot.on("login", () => {
    console.log(`[+] ${name} logged in`)
  })

  bot.on("spawn", () => {
    console.log(`[✓] ${name} spawned`)
  })

  bot.on("end", () => {
    console.log(`[-] ${name} disconnected`)
  })

  bot.on("kicked", reason => {
    console.log(`[KICKED] ${name}:`, reason)
  })

  bot.on("error", err => {
    console.log(`[ERROR] ${name}: ${err.message}`)
  })
}

/* ===== JOIN ONE BY ONE (IMPORTANT) ===== */
const interval = setInterval(() => {
  if (i >= BOT_NAMES.length) {
    console.log("All bots attempted.")
    clearInterval(interval)
    return
  }

  const name = BOT_NAMES[i]
  console.log(`Starting bot ${i + 1}: ${name}`)
  createBot(name)
  i++

}, JOIN_DELAY)

/* ===== KEEP RAILWAY PROCESS ALIVE ===== */
setInterval(() => {
  console.log("Alive | Bots:", i, "/", BOT_NAMES.length)
}, 60000)
