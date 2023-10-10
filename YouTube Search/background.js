const YT_ID = 'YouTubeSearch'

const createdMenus = {};

const createContextMenu = () => {
    chrome.contextMenus.create({
        id: YT_ID,
        title: '🔎 Search',
        contexts: ['selection'],
    });
    console.log('Context menu created.');
    createdMenus[YT_ID] = true;
}

if (createdMenus[YT_ID]) {
    console.log('Context menu already exists.');
} else {
    createContextMenu();
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === YT_ID) {
        chrome.contextMenus.update(YT_ID, {
            title: `🔎 "${message.text}"`
        })
    }
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
    if (info.menuItemId === YT_ID) {
        const query = info.selectionText.replace(/ /g, '+');
        const URL = 'https://www.youtube.com/results?search_query=' + query;
        chrome.tabs.create({ url: URL });
    }
});