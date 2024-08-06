import { config } from "../env.js";

const CMDS = {
  CHAT: 'chat'
}

async function main() {
  const chatContent = document.getElementById('chat-content').value;
  const { apiKey } = await chrome.storage.sync.get({ apiKey: config.API_KEY });

  chrome.runtime.sendMessage({ 
    cmd: CMDS.CHAT,
    prompt: chatContent,
    apiKey
  }, function(response) {
    console.log(response);
  });
}

document.addEventListener('DOMContentLoaded', function() {
  const sendBtn = document.getElementById('sendBtn');

  sendBtn.addEventListener('click', function() {
    const searchBar = document.getElementById('search-bar');
    const newBlank = document.getElementById('new-blank');

    searchBar.style.display = 'none';
    newBlank.append('Generating...');
    newBlank.style.display = 'flex';

    main();
  });
})