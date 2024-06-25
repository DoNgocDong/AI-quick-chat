const PORTS = 'quick-chat';

const CMDS = {
  CHAT: 'chat'
}

async function main() {
  chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
    if(msg.cmd === CMDS.CHAT) {
      const data = msg.data;

      sendResponse(`response: ${data}`);
    }

    return true;
  });
}

main();