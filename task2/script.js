const socket = io('http://localhost:3000');

const form = document.getElementById('chat-form');
const messageInput = document.getElementById('message');
const usernameInput = document.getElementById('username');
const messages = document.getElementById('messages');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const user = usernameInput.value.trim();
  const msg = messageInput.value.trim();
  if (user && msg) {
    socket.emit('chatMessage', { user, msg });
    messageInput.value = '';
  }
});

socket.on('message', ({ user, msg }) => {
  const div = document.createElement('div');
  div.classList.add('message');
  div.innerHTML = `<span>${user}:</span> ${msg}`;
  messages.appendChild(div);
  messages.scrollTop = messages.scrollHeight;
});
