const mineflayer = require("mineflayer")

console.log("=== BASELINE BOT SCRIPT LOADED ===")

const HOST = "budget-1.vulcanmc.fun"
const PORT = 25007

const JOIN_DELAY = 8000   // slow & safe

const BOT_NAMES = [
  "YagiSheep",
  "Istieler",
  "dreamguy",
  "demons_here",
  "Sm_Gop"
] // START WITH 5 ONLY

let index = 0

function startBot(name) {
  console.log("Attempting:", name)

  const bot = mineflayer.createBot({
    host: HOST,
    port: PORT,
    username: name,
    version: false
  })

  bot.on("login", () => {
    console.log("[LOGIN OK]", name)
  })

  bot.on("spawn", () => {
    console.log("[SPAWN OK]", name)
  })

  bot.on("kicked", reason => {
    console.log("[KICKED]", name, reason)
  })

  bot.on("error", err => {
    console.log("[ERROR]", name, err.message)
  })
}

const interval = setInterval(() => {
  if (index >= BOT_NAMES.length) {
    clearInterval(interval)
    console.log("Done attempting bots.")
    return
  }

  startBot(BOT_NAMES[index])
  index++
}, JOIN_DELAY)

setInterval(() => {
  console.log("Alive | Tried:", index)
}, 60000)
