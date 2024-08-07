const CMDS = {
  CHAT: 'chat'
}

async function sendMessageAI(url, prompt, apiKey) {
  const body = {
    contents: [{
      parts: [{
        text: prompt
      }]
    }]
  }

  try {
    const response = await fetch(url + '?' + new URLSearchParams({key: apiKey}).toString(), {
      method: 'POST',
      headers: {
        "Content-Type": 'application/json'
      },
      body: JSON.stringify(body)
    });

    const data = await response.json();
    return data.candidates[0].content.parts[0].text;
  }
  catch (err) {
    throw new Error(err);
  }
}

chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
  if(msg.cmd === CMDS.CHAT) {
    const prompt = msg.prompt;
    const apiUrl = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent';

    sendMessageAI(apiUrl, prompt, msg.apiKey)
    .then(response => sendResponse(response))
    .catch(err => sendResponse(err?.message || err));

    return true;
  }
});
