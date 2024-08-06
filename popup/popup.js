import { config } from "../env.js";

const CMDS = {
  CHAT: 'chat'
}

function generater(text) {
  const newBlank = document.getElementById('new-blank');

  const converter = new showdown.Converter();
  const outputHtml = converter.makeHtml(String(text));

  newBlank.innerHTML = outputHtml;
}

async function main() {
  const chatContent = document.getElementById('chat-content').value;
  const { apiKey } = await chrome.storage.sync.get({ apiKey: config.API_KEY });

  chrome.runtime.sendMessage({ 
    cmd: CMDS.CHAT,
    prompt: chatContent,
    apiKey
  }, function(response) {
    generater(response);
  });
}

document.addEventListener('DOMContentLoaded', function() {
  const sendBtn = document.getElementById('sendBtn');

  sendBtn.addEventListener('click', function() {
    const searchBar = document.getElementById('search-bar');
    const newBlank = document.getElementById('new-blank');

    searchBar.style.display = 'none';
    newBlank.append('Please wait...');
    newBlank.style.display = 'block';

    main();
  });
})