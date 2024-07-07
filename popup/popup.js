const CMDS = {
  CHAT: 'chat'
}

async function main() {
  const chatContent = document.getElementById('chat-content').value;

  chrome.runtime.sendMessage({ 
    cmd: CMDS.CHAT,
    prompt: chatContent
  }, function(response) {
    console.log(response);
  });
}

document.addEventListener('DOMContentLoaded', function() {
  const sendBtn = document.getElementById('sendBtn');

  sendBtn.addEventListener('click', function() {
    main();
  });
})