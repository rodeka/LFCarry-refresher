const time_sleep = 13;
const url_accept = 'https://lfcarry.com/ui/api/user/service/accept'
const url_getorders = 'https://lfcarry.com/ui/api/user/service/get'

var working = true
var codebad = [];
const users_name = ["Rodeka"];

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function sound(filename) {
    new Audio(chrome.runtime.getURL(filename)).play();
}

function accept_button(button, order_id) {
    button.disabled = true;
    button.textContent = 'PICKED';
    button.style.backgroundColor = '#ea002a';
    accept(order_id);
}

function accept(id) {
    fetch("https://lfcarry.com/ui/api/user/service/accept", {
        "headers": {
          "accept": "application/json, text/plain, */*",
          "accept-language": "ru-RU,ru;q=0.9,en-AS;q=0.8,en;q=0.7,en-US;q=0.6",
          "content-type": "application/json",
          "sec-ch-ua": "\"Chromium\";v=\"110\", \"Not A(Brand\";v=\"24\", \"Google Chrome\";v=\"110\"",
          "sec-ch-ua-mobile": "?0",
          "sec-ch-ua-platform": "\"Windows\"",
          "sec-fetch-dest": "empty",
          "sec-fetch-mode": "cors",
          "sec-fetch-site": "same-origin"
        },
        "referrer": "https://lfcarry.com/ui/booster/new-deals",
        "referrerPolicy": "strict-origin-when-cross-origin",
        "body": "{\"id\":"+id+"}",
        "method": "POST",
        "mode": "cors",
        "credentials": "include"
      }).then(function (response) {
            return response.text();
        }).then(function (text){
            let answer = JSON.parse(text);
            if (answer['success']) {
                alert('You took this order!');
            } else {
                alert(answer['message']);
            }
        });    
}

function createElementFromHTML(htmlString) {
    let div = document.createElement('div');
    div.innerHTML = htmlString.trim();
    return div.firstChild;
}


function check_date() {
    return fetch('https://currentmillis.com/time/minutes-since-unix-epoch.php').then(function (response) {
        return response.text();
    }).then(function (html) {
        let now = parseInt(html);
        let dayone = new Date(2023, 11, 20).getTime()/1000/60;
        if(now<dayone)
            return true;
        else {
            alert('Time is over');
            working = false;
            location.reload();
            return false;
        }
    })
}

function check_name() {
    let name = document.body.querySelector('div.account-name__text').textContent;
    if(users_name.includes(name))
        return true;
    else {
        alert('I don`t know you :(')
        working = false;
        location.reload();
        return false;
    }
}

function check() {
    return check_date() && check_name();
}

function lsek_loaded() {
    document.title = 'LFC BOOST';
    document.querySelector('div.Header_title__2NnMD').textContent = 'LFC BOOST';
    document.querySelector('div.Header_middleBlock__2WSNK').remove();
    document.body.querySelector('div.order-list-wrap').innerHTML=''
    document.querySelector('div.NewDealsHeader_additionalBlock__1iub8').remove();
}

async function lsek() {
    while (!document.body.querySelector('div.NewDealsHeader_additionalBlockItem__200zF.NewDealsHeader_bottomBlock__2eVg5'))
        await sleep(100);
    set_start();
}

async function auction_parse(){
    // <div class="Auction_auctionContainer__1viKB"><div class="Auction_auctionCard__1kgYj"><div class="Auction_timerBlock__3-MHo"><svg width="18" height="22" viewBox="0 0 18 22" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6 2.42383V0.423828H12V2.42383H6ZM8 13.4238H10V7.42383H8V13.4238ZM9 21.4238C7.76667 21.4238 6.604 21.1865 5.512 20.7118C4.42067 20.2365 3.46667 19.5905 2.65 18.7738C1.83333 17.9572 1.18733 17.0032 0.712 15.9118C0.237333 14.8198 0 13.6572 0 12.4238C0 11.1905 0.237333 10.0278 0.712 8.93583C1.18733 7.84449 1.83333 6.89049 2.65 6.07383C3.46667 5.25716 4.42067 4.61149 5.512 4.13683C6.604 3.66149 7.76667 3.42383 9 3.42383C10.0333 3.42383 11.025 3.59049 11.975 3.92383C12.925 4.25716 13.8167 4.74049 14.65 5.37383L16.05 3.97383L17.45 5.37383L16.05 6.77383C16.6833 7.60716 17.1667 8.49883 17.5 9.44883C17.8333 10.3988 18 11.3905 18 12.4238C18 13.6572 17.7627 14.8198 17.288 15.9118C16.8127 17.0032 16.1667 17.9572 15.35 18.7738C14.5333 19.5905 13.5793 20.2365 12.488 20.7118C11.396 21.1865 10.2333 21.4238 9 21.4238ZM9 19.4238C10.9333 19.4238 12.5833 18.7405 13.95 17.3738C15.3167 16.0072 16 14.3572 16 12.4238C16 10.4905 15.3167 8.8405 13.95 7.47383C12.5833 6.10716 10.9333 5.42383 9 5.42383C7.06667 5.42383 5.41667 6.10716 4.05 7.47383C2.68333 8.8405 2 10.4905 2 12.4238C2 14.3572 2.68333 16.0072 4.05 17.3738C5.41667 18.7405 7.06667 19.4238 9 19.4238Z" fill="#476787"></path></svg><p>00:42</p></div><div class="Auction_infoBlock__GuluC"><p class="Auction_hash__3KIb5">#077AC2</p><div class="Auction_auctionTypeContainer__1jghh"><svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1.28 1.758C-0.426667 3.69605 -0.426667 6.66535 1.28 8.58562C2.82667 10.3281 5.22667 10.7726 7.2 9.91915L9.10222 11.8216C9.13778 11.8572 9.17333 11.875 9.22667 11.875H11.04C11.1467 11.875 11.2178 11.9461 11.2178 12.0528V13.7597C11.2178 13.8664 11.2889 13.9375 11.3956 13.9375H13.1022C13.2089 13.9375 13.28 14.0086 13.28 14.1153V15.8222C13.28 15.9289 13.3511 16 13.4578 16H15.8222C15.9289 16 16 15.9289 16 15.8222V13.3685C16 13.3152 15.9822 13.2796 15.9467 13.2441L9.92 7.21654C10.7378 5.33183 10.3644 3.05596 8.83556 1.52685C6.72 -0.588999 3.27111 -0.500098 1.28 1.758ZM4.49778 4.14055C3.98222 4.90511 2.86222 4.90511 2.34667 4.14055C2.06222 3.71383 2.06222 3.12708 2.34667 2.70035C2.86222 1.9358 3.98222 1.9358 4.49778 2.70035C4.78222 3.12708 4.78222 3.71383 4.49778 4.14055Z" fill="#476787"></path></svg><p>Piloted</p></div></div><p class="Auction_auctionCardDescription__HAXYf">Protect the Runner Triumph </p><div class="Auction_tagsContainer__1nSMW"><div class="Auction_auctionTag__2tVkq"><svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_8001_33346)"><path fill-rule="evenodd" clip-rule="evenodd" d="M5.52664 5.76034V1.53877L11.2499 0.75V5.76034H5.52664ZM5.05361 5.76048H0.75V2.19517L5.05361 1.60204V5.76048ZM5.05361 10.3989L0.75 9.80576V6.29093H5.05361V10.3989ZM5.52664 10.4622L11.25 11.2509V6.29112V6.29105H5.52664V10.4622Z" fill="#476787"></path></g><defs><clipPath id="clip0_8001_33346"><rect width="12" height="12" fill="white"></rect></clipPath></defs></svg>PC</div><div class="Auction_auctionTag__2tVkq">D2 Triumph</div></div><div class="Auction_auctionInfo__wcKRg">9:44 PM (GMT-4) • USA / Pennsylvania  / Drums<span class="Auction_guardianText__1l_tm">All</span></div><div class="Auction_auctionCommentContainer__XM39n Auction_auctionCommentSmall__WxjA3"> Progress: </div><div class="Auction_bidContainer__1geIR"><div class="Auction_currentBid__1hUGP"><p class="Auction_currentBidLegend__eqJQn">First Bid</p><p class="Auction_currentBidValue__2OME8">$11</p></div><div class="Auction_priceClickerContainer__1_VPP"><div class="Auction_priceClickerItem__1xtdb"><svg width="12" height="2" viewBox="0 0 12 2" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0 1H6H12" stroke="#2E5BFF" stroke-width="2"></path></svg></div><div class="Auction_priceClickerItem__1xtdb">$11</div><div class="Auction_priceClickerItem__1xtdb"><svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0 6.0001H6M6 6.0001H12M6 6.0001L5.99993 0M6 6.0001L5.99993 12" stroke="#2E5BFF" stroke-width="2"></path></svg></div></div><button class="Auction_placeBidContainer__2U9oC">Place a bid</button></div><div class="Auction_breakLine__1389f">or</div><div class="Auction_acceptBtnContainer__Io-sK"><button class="Auction_acceptBtn__VcQ7Z">Accept now for $8</button></div></div></div>
    badcode = []
    while(working){
        await sleep(5000);
        auctions = document.body.querySelectorAll('div.Auction_auctionCard__1kgYj');
        if(!auctions)
            continue;
        auctions.forEach(function(item){
            platform = item.querySelector('div.Auction_tagsContainer__1nSMW')
            code = item.querySelector('p.Auction_hash__3KIb5').textContent
            if(!badcode.includes(code)){
                sound("sound.mp3");
                badcode.push(code);
                console.log(code);
            }
        });
    }
}

async function parse(){
    lsek_loaded();
    sound("sound.mp3");
    let html = await fetch(url_getorders);
    let orders;
    if(html.status!==200)
        orders=[]
    else
        orders=JSON.parse(await html.text())["services"];
    orders.forEach(function (item){
        let order_id=item["id"];
        codebad.push(order_id);
    });
    let order_area = document.querySelector('div.order-list-wrap');
    let time_start=Date.now();
    let time_end=Date.now();
    while(working){
        time_end=Date.now();
        if (time_end - time_start < time_sleep * 1000)
            await sleep(time_sleep * 1000 - (time_end - time_start));
        else
            await sleep(time_sleep * 1000);
        time_start = Date.now();    
        let html;
        try{
            html = await fetch(url_getorders);
        } catch(error){
            console.log(error)
            continue;
        }
        
        if (html.status !== 200 && html.status !==304)
            continue;
        orders=JSON.parse(await html.text())["services"];
        orders.forEach(function(item){
            let order_id=item["id"];
            if(!codebad.includes(order_id)){
                codebad.push(order_id);
                if(!item["platform"].includes("PC"))
                    return;
                
                let order = createElementFromHTML('<div class="AuctionOrderItem_container__2ML5c"><div class="AuctionOrderItem_leftBlock__1b1e0"><p class="AuctionOrderItem_hash__27PmC">#</p></div><div class="AuctionOrderItem_mainBlock__SrYiR"><p class="AuctionOrderItem_title__2WC82"></p><div class="AuctionOrderItem_commentContainer__1WP1m"><div class="Auction_auctionInfo__wcKRg"><span class="Auction_guardianText__1l_tm"></span></div><div class="Auction_auctionCommentContainer__XM39n Auction_auctionCommentSmall__WxjA3"></div></div><div class="Auction_tagsContainer__1nSMW"></div></div><p class="AuctionOrderItem_price__2nrd4">$</p><button class="AuctionOrderItem_acceptBtn__rrsm3">Accept</button></div>');
                order.querySelector('p.AuctionOrderItem_hash__27PmC').textContent += item["code"]; // code

                let bottom_labels = order.querySelector("div.AuctionOrderItem_leftBlock__1b1e0");
                if(!item["is_selfplay"])
                    bottom_labels.appendChild(createElementFromHTML('<div class="Auction_auctionTypeContainer__1jghh"><svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1.28 1.758C-0.426667 3.69605 -0.426667 6.66535 1.28 8.58562C2.82667 10.3281 5.22667 10.7726 7.2 9.91915L9.10222 11.8216C9.13778 11.8572 9.17333 11.875 9.22667 11.875H11.04C11.1467 11.875 11.2178 11.9461 11.2178 12.0528V13.7597C11.2178 13.8664 11.2889 13.9375 11.3956 13.9375H13.1022C13.2089 13.9375 13.28 14.0086 13.28 14.1153V15.8222C13.28 15.9289 13.3511 16 13.4578 16H15.8222C15.9289 16 16 15.9289 16 15.8222V13.3685C16 13.3152 15.9822 13.2796 15.9467 13.2441L9.92 7.21654C10.7378 5.33183 10.3644 3.05596 8.83556 1.52685C6.72 -0.588999 3.27111 -0.500098 1.28 1.758ZM4.49778 4.14055C3.98222 4.90511 2.86222 4.90511 2.34667 4.14055C2.06222 3.71383 2.06222 3.12708 2.34667 2.70035C2.86222 1.9358 3.98222 1.9358 4.49778 2.70035C4.78222 3.12708 4.78222 3.71383 4.49778 4.14055Z" fill="#476787"></path></svg><p>Piloted</p></div>'));
                else
                    bottom_labels.appendChild(createElementFromHTML('<div class="Auction_auctionTypeContainer__1jghh"><svg width="20" height="12" viewBox="0 0 20 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M18.2679 3.01329C16.6641 -0.171937 14.9457 -0.394442 13.3459 0.364774C12.8607 0.594921 12.4438 0.890104 12.1409 1.27703H7.85986C7.55696 0.890104 7.14005 0.594921 6.65479 0.364774C5.05494 -0.394442 3.33651 -0.171937 1.7328 3.01329C0.127797 6.19885 -0.754222 11.1409 0.845633 11.9002C1.95759 12.4274 3.97427 10.7945 5.63992 8.68112H14.3595C16.0251 10.7945 18.0418 12.4274 19.1537 11.9002C20.7549 11.1409 19.8716 6.19885 18.2679 3.01329ZM7.4677 5.00373C7.4677 5.13242 7.35764 5.23672 7.2221 5.23672H6.04765V6.40501C6.04765 6.53366 5.93821 6.638 5.80272 6.638H5.38716H4.97155C4.83673 6.638 4.72662 6.53366 4.72662 6.40501V5.23668H3.55221C3.41676 5.23668 3.30661 5.13238 3.30661 5.00368V4.21317C3.30661 4.08452 3.41672 3.98026 3.55221 3.98026H4.72666V2.81164C4.72666 2.68303 4.83677 2.57865 4.97159 2.57865H5.38724H5.8028C5.9383 2.57865 6.04774 2.68299 6.04774 2.81164V3.98026H7.22218C7.35772 3.98026 7.46779 4.08456 7.46779 4.21317V5.00373H7.4677ZM15.0623 3.01427C15.0623 3.41603 14.7275 3.74158 14.3132 3.74158C13.8989 3.74158 13.5641 3.41603 13.5641 3.01427C13.5641 2.61251 13.899 2.28696 14.3132 2.28696C14.7275 2.28696 15.0623 2.61251 15.0623 3.01427ZM12.7682 5.24111C12.3538 5.24111 12.019 4.91524 12.019 4.51347C12.019 4.11236 12.3539 3.78649 12.7682 3.78649C13.1824 3.78649 13.5172 4.11236 13.5172 4.51347C13.5172 4.9152 13.1824 5.24111 12.7682 5.24111ZM15.8611 5.24111C15.4468 5.24111 15.112 4.91524 15.112 4.51347C15.112 4.11236 15.4468 3.78649 15.8611 3.78649C16.2754 3.78649 16.6102 4.11236 16.6102 4.51347C16.6102 4.9152 16.2754 5.24111 15.8611 5.24111ZM14.3132 6.7406C13.8989 6.7406 13.5641 6.41505 13.5641 6.01329C13.5641 5.61153 13.899 5.28598 14.3132 5.28598C14.7275 5.28598 15.0623 5.61153 15.0623 6.01329C15.0623 6.41505 14.7275 6.7406 14.3132 6.7406Z" fill="#476787"></path></svg><p>Selfplay</p></div>'));
                if(item["is_stream_required"])
                    bottom_labels.appendChild(createElementFromHTML('<div class="Auction_auctionStreamingBlock__1Klc2"><svg width="20" height="14" viewBox="0 0 20 14" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M20 2.86918V11.1227C20 11.7607 19.3037 12.159 18.7467 11.842L15.2816 9.85886V10.4237C15.2816 12.1224 13.8931 13.5 12.181 13.5H3.10055C1.38849 13.5 0 12.1224 0 10.4237V3.57627C0 1.87762 1.38849 0.5 3.10055 0.5H12.1851C13.8972 0.5 15.2857 1.87762 15.2857 3.57627V4.14114L18.7508 2.15802C19.3037 1.83292 20 2.23523 20 2.86918Z" fill="#E05C7B"></path></svg><p>With Stream</p></div>'));
                if(item["is_no_limit"])
                    bottom_labels.appendChild(createElementFromHTML('<div class="Auction_auctionStreamingBlock__1Klc2"><svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10.7055 12L9.38182 10.6764C8.90667 10.9867 8.4001 11.2242 7.86211 11.3891C7.32373 11.5539 6.76364 11.6364 6.18182 11.6364C5.37697 11.6364 4.62061 11.4835 3.91273 11.1779C3.20485 10.8726 2.58909 10.4582 2.06545 9.93455C1.54182 9.41091 1.12737 8.79515 0.822109 8.08727C0.516461 7.37939 0.363636 6.62303 0.363636 5.81818C0.363636 5.23636 0.446061 4.67627 0.610909 4.13789C0.775758 3.5999 1.01333 3.09333 1.32364 2.61818L0 1.29455L0.829091 0.465454L11.5345 11.1709L10.7055 12ZM3.27273 6.4H5.10545L3.94182 5.23636H3.27273V6.4ZM11.04 9.01818L8.42182 6.4H9.09091V5.23636H7.25818L2.98182 0.96C3.45697 0.649697 3.96373 0.412121 4.50211 0.247273C5.0401 0.0824242 5.6 0 6.18182 0C6.98667 0 7.74303 0.15263 8.45091 0.457891C9.15879 0.763539 9.77455 1.17818 10.2982 1.70182C10.8218 2.22545 11.2363 2.84121 11.5415 3.54909C11.8472 4.25697 12 5.01333 12 5.81818C12 6.4 11.9176 6.9599 11.7527 7.49789C11.5879 8.03627 11.3503 8.54303 11.04 9.01818Z" fill="#E05C7B"></path></svg><p>No-limit</p></div>'));

                

                let tag_labels = order.querySelector("div.Auction_tagsContainer__1nSMW");
                //console.log(item["platform"], item["platform"].includes("PC"), item["platform"].includes("PS4"), item["platform"].includes("XBOX"));
                
                if(item["platform"].includes("PC"))
                    tag_labels.appendChild(createElementFromHTML('<div class="Auction_auctionTag__2tVkq"><svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_8001_33346)"><path fill-rule="evenodd" clip-rule="evenodd" d="M5.52664 5.76034V1.53877L11.2499 0.75V5.76034H5.52664ZM5.05361 5.76048H0.75V2.19517L5.05361 1.60204V5.76048ZM5.05361 10.3989L0.75 9.80576V6.29093H5.05361V10.3989ZM5.52664 10.4622L11.25 11.2509V6.29112V6.29105H5.52664V10.4622Z" fill="#476787"></path></g><defs><clipPath id="clip0_8001_33346"><rect width="12" height="12" fill="white"></rect></clipPath></defs></svg>PC</div>'));
                if(item["platform"].includes("PS4"))
                    tag_labels.appendChild(createElementFromHTML('<div class="Auction_auctionTag__2tVkq"><svg width="12" height="10" viewBox="0 0 12 10" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M7.22891 2.79276V5.70491C7.83608 5.99725 8.37578 6.01974 8.78056 5.71615C9.19658 5.42381 9.42145 4.91784 9.42145 4.15326C9.42145 3.35495 9.26404 2.74779 8.91548 2.34301C8.60066 1.91574 8.03846 1.55594 7.20642 1.27485L6.99629 1.20627C6.05281 0.898208 5.24727 0.635191 4.59786 0.499023V9.21298L6.47557 9.78641V2.5454C6.46433 2.10689 7.22891 2.14062 7.22891 2.79276ZM1.31582 6.73929L0.91104 6.8967C0.303874 7.15531 -0.0109529 7.42516 0.000290961 7.66128C0.0340224 8.00984 0.427556 8.26845 1.14716 8.45959C2.0804 8.70695 3.02488 8.76317 4.00309 8.61701V7.63879L3.22727 7.93113C2.41771 8.21223 2.00169 7.97611 2.00169 7.97611C1.87801 7.8974 1.82179 7.70626 2.1591 7.58257L2.58637 7.42516L4.00309 6.91919V5.78357L3.64329 5.90725L1.31582 6.73929ZM10.9852 6.53688C11.6261 6.75051 11.9859 6.98663 11.9971 7.29022C12.0309 7.61629 11.7385 7.8749 11.0864 8.11102L10.7716 8.25719L8.07304 9.21291L6.94865 9.61769V8.48206L9.35483 7.61629L9.77085 7.44763C10.1307 7.32395 10.1531 7.12156 9.79334 7.03161C9.3211 6.90793 8.77015 7.11032 8.77015 7.11032L6.94865 7.75121V6.63808C7.61204 6.42444 8.35413 6.22206 8.97254 6.21081C9.64717 6.18832 10.2656 6.30076 10.9852 6.53688Z" fill="#476787"></path></svg>PS4</div>'));
                if(item["platform"].includes("XBOX"))
                    tag_labels.appendChild(createElementFromHTML('<div class="Auction_auctionTag__2tVkq"><svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3.09187 1.64291C3.08655 1.647 3.08247 1.65149 3.07756 1.65558C3.10739 1.62412 3.1503 1.59021 3.1785 1.57182C4.00148 1.03699 4.95236 0.750977 6.00745 0.750977C6.99429 0.750977 7.91862 1.0235 8.70768 1.49746C8.76489 1.53137 8.92099 1.63842 9.00149 1.73566V1.73607C8.24021 0.896841 6.00255 2.69747 6.00255 2.69747C5.2286 2.10094 4.51676 1.6944 3.98677 1.54976C3.54381 1.42841 3.23734 1.52974 3.09187 1.64291ZM9.8637 2.43638C9.84041 2.41064 9.81507 2.38654 9.79178 2.35998C9.59932 2.14874 9.36272 2.09767 9.14941 2.11156C8.95531 2.17244 8.05837 2.49563 6.95302 3.53915C6.95302 3.53915 8.1973 4.74897 8.9594 5.98575C9.72068 7.22253 10.1759 8.19455 9.89598 9.54369C10.7455 8.61008 11.2637 7.36962 11.2637 6.0074C11.2637 4.62884 10.7329 3.37408 9.8637 2.43638ZM7.96438 6.51405C7.62685 6.13529 7.12465 5.59269 6.46144 4.93324C6.31637 4.78901 6.16314 4.63865 6.00214 4.48298C6.00214 4.48298 5.75982 4.72527 5.44436 5.04396V5.04356C5.04063 5.45132 4.51717 5.9833 4.22663 6.29382C3.70931 6.84582 2.2272 8.57944 2.14384 9.55146C2.14384 9.55146 1.81408 8.78046 2.53776 7.00231C3.01055 5.83988 4.43912 4.09442 5.03572 3.52567C5.03572 3.52567 4.49061 2.92587 3.80656 2.51156L3.80247 2.51034C3.80247 2.51034 3.79471 2.50421 3.78245 2.49645C3.4535 2.30033 3.09432 2.14915 2.74862 2.12913C2.39556 2.15405 2.17204 2.41228 2.17204 2.41228C1.2898 3.35284 0.75 4.61699 0.75 6.00781C0.75 8.9108 3.10372 11.2646 6.00745 11.2646C7.5484 11.2646 8.93488 10.6003 9.8968 9.5441C9.89639 9.54247 9.78606 8.84951 9.07872 7.85543C8.91241 7.62253 8.30477 6.89566 7.96438 6.51405Z" fill="#476787"></path></svg>XBOX</div>'));
                
                item["tags"].forEach(function(tag){
                    let order_tag = createElementFromHTML('<div class="Auction_auctionTag__2tVkq"></div>');
                    order_tag.textContent = tag;
                    tag_labels.appendChild(order_tag);
                });


                order.querySelector('span.Auction_guardianText__1l_tm').textContent = item["customs"]["guardian"]
                order.querySelector('div.Auction_auctionCommentContainer__XM39n').textContent = item["description"]
                order.querySelector('p.AuctionOrderItem_price__2nrd4').textContent += (item["price"]/100);
                order.querySelector('p.AuctionOrderItem_title__2WC82').textContent = item["title"];
                order_area.insertBefore(order, order_area.firstChild);
                order.querySelector('button.AuctionOrderItem_acceptBtn__rrsm3').addEventListener("click", async function () {
                    accept_button(this, order_id);
                });
                sound("sound.mp3");
            }
        });
    }
}

function set_start() {
    let start = createElementFromHTML('<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="none" class="bi bi-bug" viewBox="0 0 16 16" style="cursor:pointer"> <path d="M4.355.522a.5.5 0 0 1 .623.333l.291.956A4.979 4.979 0 0 1 8 1c1.007 0 1.946.298 2.731.811l.29-.956a.5.5 0 1 1 .957.29l-.41 1.352A4.985 4.985 0 0 1 13 6h.5a.5.5 0 0 0 .5-.5V5a.5.5 0 0 1 1 0v.5A1.5 1.5 0 0 1 13.5 7H13v1h1.5a.5.5 0 0 1 0 1H13v1h.5a1.5 1.5 0 0 1 1.5 1.5v.5a.5.5 0 1 1-1 0v-.5a.5.5 0 0 0-.5-.5H13a5 5 0 0 1-10 0h-.5a.5.5 0 0 0-.5.5v.5a.5.5 0 1 1-1 0v-.5A1.5 1.5 0 0 1 2.5 10H3V9H1.5a.5.5 0 0 1 0-1H3V7h-.5A1.5 1.5 0 0 1 1 5.5V5a.5.5 0 0 1 1 0v.5a.5.5 0 0 0 .5.5H3c0-1.364.547-2.601 1.432-3.503l-.41-1.352a.5.5 0 0 1 .333-.623zM4 7v4a4 4 0 0 0 3.5 3.97V7H4zm4.5 0v7.97A4 4 0 0 0 12 11V7H8.5zM12 6a3.989 3.989 0 0 0-1.334-2.982A3.983 3.983 0 0 0 8 2a3.983 3.983 0 0 0-2.667 1.018A3.989 3.989 0 0 0 4 6h8z" fill="black"></path></svg>');
    start.addEventListener('click', async function () {
        if(check()) {
            sound("sound.mp3");
            parse();
            auction_parse();
            this.remove();
        }
        else
            this.remove();
    });
    document.querySelector("div.NewDealsHeader_additionalBlockWrapper__eNA4y").insertBefore(start, document.querySelector('div.NewDealsHeader_additionalBlockItem__200zF.NewDealsHeader_bottomBlock__2eVg5'));
}


function main() { 
    if (window.location.href === 'https://lfcarry.com/ui/booster/new-deals'){
        console.log('start refresher.js');
        lsek();
    }
        
}

main();