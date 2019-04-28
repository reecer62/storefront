console.log("Connected to chat room.")
var socket = io()

var form = document.getElementById("message-form")
var message = document.getElementById("message")
var messages = document.getElementById("messages")
var typingList = document.getElementById("typing")

form.addEventListener("submit", e => {
  e.preventDefault()
  socket.emit("message", message.value)
  message.value = ""
  return false
})

var canCheckTyping = true
var isTyping = false
message.addEventListener("input", e => {
  isTyping = true
  if (canCheckTyping) {
    console.log("TYPING")
    socket.emit("typing")
    canCheckTyping = false
    setTimeout(() => {
      canCheckTyping = true
      if (!isTyping) {
        socket.emit("stop typing")
      }
    }, 1000)
  }
  setTimeout(() => {
    isTyping = false
  }, 100)
})

socket.on("message", msg => {
  let node = document.createElement("li")
  let text = document.createTextNode(msg)
  node.appendChild(text)
  messages.appendChild(node)
})

socket.on("typing", clientID => {
  let isTypingEl = document.getElementById(clientID)
  if (!isTypingEl) {
    let node = document.createElement("li")
    node.setAttribute("id", clientID)
    let text = document.createTextNode(clientID + " is typing...")
    node.appendChild(text)
    typingList.appendChild(node)
  }
})

socket.on("stop typing", clientID => {
  let isTypingEl = document.getElementById(clientID)
  if (isTypingEl) {
    isTypingEl.parentNode.removeChild(isTypingEl)
  }
})
