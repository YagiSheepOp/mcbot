const mineflayer = require("mineflayer")

const SERVER_IP = "budget-1.vulcanmc.fun"
const SERVER_PORT = 25007
const BOT_COUNT = 5        // ⚠️ Railway realistic limit
const JOIN_DELAY = 8000    // VERY slow

let started = 0

function randomName() {
  return "Bot_" + Math.random().toString(36).substring(2, 8)
}

function startBot() {
  if (started >= BOT_COUNT) return
  started++

  const bot = mineflayer.createBot({
    host: SERVER_IP,
    port: SERVER_PORT,
    username: randomName(),
    version: false
  })

  bot.on("login", () => {
    console.log(`[+] ${bot.username} joined`)
    
    // behave like human
    setInterval(() => {
      bot.setControlState("jump", true)
      setTimeout(() => bot.setControlState("jump", false), 500)
      bot.chat("hello")
    }, 30000)
  })

  bot.on("kicked", r => console.log("Kicked:", r))
  bot.on("error", e => console.log("Err:", e.message))
}

setInterval(startBot, JOIN_DELAY)
