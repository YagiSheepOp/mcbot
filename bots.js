const mineflayer = require("mineflayer")

const SERVER_IP = "budget-1.vulcanmc.fun"
const SERVER_PORT = 25007
const BOT_COUNT = 12   // start low, increase later
const JOIN_DELAY = 3000

function randomName() {
  const chars = "abcdefghijklmnopqrstuvwxyz"
  let name = "_YagiSheep_"
  for (let i = 0; i < 6; i++) {
    name += chars[Math.floor(Math.random() * chars.length)]
  }
  return name
}

let bots = []

function startBot(index) {
  const bot = mineflayer.createBot({
    host: SERVER_IP,
    port: SERVER_PORT,
    username: randomName(),
    version: false
  })

  bots.push(bot)

  bot.on("login", () => {
    console.log(`[+] ${bot.username} joined`)
  })

  bot.on("end", () => {
    console.log(`[-] ${bot.username} disconnected, reconnecting...`)
    setTimeout(() => startBot(index), 10000)
  })

  bot.on("error", err => {
    console.log(`[!] ${bot.username}: ${err.message}`)
  })
}

for (let i = 0; i < BOT_COUNT; i++) {
  setTimeout(() => startBot(i), i * JOIN_DELAY)
}

// Prevent Railway from thinking app is idle
setInterval(() => {
  console.log("Bots running:", bots.length)
}, 60000)
