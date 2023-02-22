const socket = io("ws://localhost:3000")

const section = document.querySelector("section")
const form = document.querySelector("form")
const input = document.querySelector("input")

async function loadMessages() {
  const messages = await fetch("http://localhost:3000/messages").then(res => res.json())
  console.log(messages)

  section.innerHTML = ""
  messages.forEach(renderMessage)
}

function renderMessage(msg) {
  section.innerHTML += `<div class="message"><b>${msg.username}</b><p>${msg.content}</p></div>`
}

loadMessages()

form.addEventListener("submit", (ev) => {
  ev.preventDefault()

  if (input.value) {
    socket.emit("message_sent", input.value)
    input.value = ""
  }
})

socket.on("message_received", (msg) => {
  console.log(msg)
  renderMessage(msg)
})