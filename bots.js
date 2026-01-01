const mineflayer = require("mineflayer")

const SERVER_IP = "budget-1.vulcanmc.fun"
const SERVER_PORT = 25007

const BOT_COUNT = 15          // ✅ change here (10–20)
const JOIN_DELAY = 5000       // ✅ VERY IMPORTANT (5 sec)

let activeBots = 0

function randomName() {
  const chars = "abcdefghijklmnopqrstuvwxyz"
  let name = "GCart"
  for (let i = 0; i < 6; i++) {
    name += chars[Math.floor(Math.random() * chars.length)]
  }
  return name
}

function startBot() {
  if (activeBots >= BOT_COUNT) return

  const username = randomName()
  activeBots++

  const bot = mineflayer.createBot({
    host: SERVER_IP,
    port: SERVER_PORT,
    username: username,
    version: false
  })

  bot.once("login", () => {
    console.log(`[+] ${username} joined (${activeBots}/${BOT_COUNT})`)
  })

  bot.once("end", () => {
    console.log(`[-] ${username} disconnected`)
  })

  bot.once("error", err => {
    console.log(`[!] ${username}: ${err.message}`)
  })
}

// JOIN bots SLOWLY
let interval = setInterval(() => {
  startBot()
  if (activeBots >= BOT_COUNT) clearInterval(interval)
}, JOIN_DELAY)

// Prevent Railway idle
setInterval(() => {
  console.log(`Alive | Bots target: ${BOT_COUNT}`)
}, 60000)
