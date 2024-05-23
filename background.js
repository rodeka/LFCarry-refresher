url_block = [
    "https://sse.lfcarry.com/.well-known/mercure",
    "https://sse.legionfarm.com/.well-known/mercure",
    "https://mc.yandex.ru/metrika/tag.js",
    "https://lfcarry.com/admin/js/booster-area/order-notify.js?v=RY211220",
    "https://www.google-analytics.com/analytics.js",
    "https://cdn.amplitude.com/libs/amplitude-5.2.2-min.gz.js",
    "https://gc.kis.v2.scr.kaspersky-labs.com",
    "https://lfcarry.com/admin/js/booster-area/common.js?v=RY031220"
];

chrome.webRequest.onBeforeRequest.addListener(
    function(details) {
        for(let i=0; i<url_block.length; i++)
            if(details.url.indexOf(url_block[i]) !== -1)
                return {cancel: true};
        return {cancel: false};
    },
    {urls: ["<all_urls>"]},
    ["blocking"]
);