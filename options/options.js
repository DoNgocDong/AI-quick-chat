const saveOptions = () => {
  const apiKey = String(document.getElementById('targetApiKey').value);

  function setTimeoutDisplay(element, ms) {
    setTimeout(() => {
      element.style.display = 'none';
    }, ms);
  }

  if(!apiKey || apiKey == '') {
    chrome.storage.sync.clear();
  }
  else {
    chrome.storage.sync.set({ apiKey: apiKey.trim() });
  }

  const status = document.getElementById('saveStatus');
  status.style.display = 'inline';
  setTimeoutDisplay(status, 1000);
};

const resetOptions = () => {
  chrome.storage.sync.clear();
  document.getElementById('targetApiKey').value = '';
  document.getElementById('saveStatus').style.display = 'none'
}

const restoreOptions = () => {
  chrome.storage.sync.get({ apiKey: '' }, (items) => {
    document.getElementById('targetApiKey').value = items.apiKey;
  });
};

document.addEventListener('DOMContentLoaded', restoreOptions);
document.getElementById('saveBtn').addEventListener('click', saveOptions);
document.getElementById('resetBtn').addEventListener('click', resetOptions);