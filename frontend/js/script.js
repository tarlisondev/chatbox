// Elements Login
const login = document.querySelector('.login');
const loginForm = login.querySelector('.login--form');
const loginInput = login.querySelector('.login--input');

// Elements Chat
const chat = document.querySelector('.chat');
const chatForm = chat.querySelector('.chat--form');
const chatInput = chat.querySelector('.chat--input');
const chatMessages = chat.querySelector('.chat--messages');


const user = { id: "", name: "", color: "" }

const colors = [
  'coral', 'cyan', 'deeppink', 'floralwhite', 'lime', 'springgreen', 'red', 'tomato', 'yellow'
]

let ws;

const createMessageSelfElement = (content) => {

  const div = document.createElement('div');
  div.classList.add("message--self");
  div.innerHTML = content;

  return div;
}

const createMessageOtherElement = (content, sender, senderColor) => {

  const div = document.createElement('div');
  const span = document.createElement('span');

  div.classList.add("message--other");

  div.classList.add("message--self");
  span.classList.add("message--sender");
  span.style.color = senderColor

  div.appendChild(span);

  span.innerHTML = sender;
  div.innerHTML += content;

  return div;
}

const getRandomColor = () => {
  const randomIndex = Math.floor(Math.random() * colors.length);
  return colors[randomIndex]
}

const scrollScreen = () => {
  window.scrollTo({
    top: document.body.scrollHeight,
    behavior: "smooth"
  })
}

const processMessage = ({ data }) => {
  const { userId, userName, userColor, content } = JSON.parse(data);

  const message = userId == user.id ? createMessageSelfElement(content) : createMessageOtherElement(content, userName, userColor)

  chatMessages.appendChild(message)

  scrollScreen()
}

const handleLogin = (event) => {
  event.preventDefault();

  user.id = Date.now()
  user.name = loginInput.value;
  user.color = getRandomColor()

  login.style.display = 'none';
  chat.style.display = 'flex';

  ws = new WebSocket('wss://chat-backend-100c.onrender.com');
  ws.onmessage = processMessage;
  console.log(user)
}

const sendMessage = (event) => {
  event.preventDefault();

  const message = {
    userId: user.id,
    userName: user.name,
    userColor: user.color,
    content: chatInput.value
  }

  ws.send(JSON.stringify(message));

  chatInput.value = "";
}

loginForm.addEventListener('submit', handleLogin);
chatForm.addEventListener('submit', sendMessage);
