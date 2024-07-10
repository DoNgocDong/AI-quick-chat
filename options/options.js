const saveOptions = () => {
  const apiKey = document.getElementById('targetApiKey').value;

  chrome.storage.sync.set( { apiKey: apiKey }, () => {
    const status = document.getElementById('saveStatus');
    status.style.display = 'inline';

    setTimeout(() => {
      status.style.display = 'none';
    }, 1000);
  });
};

const resetOptions = () => {
  chrome.storage.sync.set({ apiKey: '' }, () => {
    document.getElementById('targetApiKey').value = '';
    document.getElementById('saveStatus').style.display = 'none'
  });
}

const restoreOptions = () => {
  chrome.storage.sync.get( { apiKey: '' }, (items) => {
    document.getElementById('targetApiKey').value = items.apiKey;
  });
};

document.addEventListener('DOMContentLoaded', restoreOptions);
document.getElementById('saveBtn').addEventListener('click', saveOptions);
document.getElementById('resetBtn').addEventListener('click', resetOptions);