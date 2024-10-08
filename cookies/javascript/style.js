const api = window.location.hostname === '127.0.0.1' ? 'http://127.0.0.1:5000' : 'https://drbot-api.dapuntaratya.com';
 
// Utils Function

function title(str) {
    return str.replace(/_/g, ' ').split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ');
}

function convertEpochTime(epochTime) {
    const date = new Date(epochTime * 1000);
    const dateOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = date.toLocaleDateString('en-US', dateOptions);
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${formattedDate} - ${hours}:${minutes}`;
}

let listPlatform = [];

// Count Info Cookies

function cookiesCounter(id) {

    const platformData = listPlatform.find(platform => platform.platform === id);
    
    if (!platformData) {
        console.log("Platform not found");
        return;
    }

    const total = platformData.data ? platformData.data.length : 0;
    const active = platformData.data ? platformData.data.filter(cookie => cookie.status === 'active').length : 0;
    const inactive = platformData.data ? platformData.data.filter(cookie => cookie.status === 'inactive').length : 0;

    return {
        platform: platformData.platform,
        total: total,
        active: active,
        inactive: inactive,
        update: platformData.update
    };
}

// Show Platform Menu

function createButton(id, className, text) {
    const button = document.createElement('div');
    button.id = id;
    button.className = className;
    button.innerText = text;
    return button;
}

function showPlatform() {
    const boxPlatform = document.getElementById('platform');
    boxPlatform.appendChild(createButton(`button-facebook`, 'platform-button active', title('facebook')));
    showPanelCookieInfo('facebook');
    listPlatform.slice(1).forEach(item => {
        boxPlatform.appendChild(createButton(`button-${item.platform}`, 'platform-button inactive', title(item.platform.replace(/_/g, ' '))));
    });
}

const scrollPlatform = document.getElementById('platform');
let isDown = false;
let startX;
let scrollLeft;
scrollPlatform.addEventListener('mousedown', (e) => {
    isDown = true;
    startX = e.pageX - scrollPlatform.offsetLeft;
    scrollLeft = scrollPlatform.scrollLeft;
});
scrollPlatform.addEventListener('mouseleave', () => {
    isDown = false;
});
scrollPlatform.addEventListener('mouseup', () => {
    isDown = false;
});
scrollPlatform.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - scrollPlatform.offsetLeft;
    const walk = (x - startX) * 1;
    scrollPlatform.scrollLeft = scrollLeft - walk;
});

// Set event listeners platform

function giveListenerPlatform() {
    document.querySelectorAll('.platform-button').forEach(button => {
        button.addEventListener('click', function() {
            document.querySelectorAll('.platform-button').forEach(btn => {
                btn.classList.remove('active');
                btn.classList.add('inactive');
            });
            this.classList.remove('inactive');
            this.classList.add('active');
            const box = document.getElementById('cookies');
            box.innerHTML = '';
            const platformID = this.id.split('-').pop();
            showPanelCookieInfo(platformID);
            showListCookie(platformID);
            giveListenerActionCookies();
            addCookiesButton(platformID);
        });
    });
}

// Show Panel Cookie Info

function showPanelCookieInfo(id) {
    const platform = cookiesCounter(id);
    const boxPanel = document.getElementById('cookies-info-panel');
    boxPanel.innerHTML = `
        <div class="container-platform-title"><a>${title(platform.platform)}</a></div>
        <div class="container-diagram-info">
            <div class="container-grid-stat total">
                <div class="box-count-stat">${platform.total}</div>
                <div class="box-title-stat">Total</div>
            </div>
            <div class="container-grid-stat active">
                <div class="box-count-stat">${platform.active}</div>
                <div class="box-title-stat">Active</div>
            </div>
            <div class="container-grid-stat inactive">
                <div class="box-count-stat">${platform.inactive}</div>
                <div class="box-title-stat">Inactive</div>
            </div>
        </div>
        <div class="container-last-update">
            <a>${convertEpochTime(platform.update)}</a>
            <i id="refresh-${id}-all" class="fa-solid fa-arrows-rotate"></i>
        </div>`;
    document.getElementById(`refresh-${id}-all`).addEventListener('click', function() {
        const [a, b, c] = this.id.split('-');
        refreshAllCookies(b);
    });
}

// Show Detailed Cookies Data

function getDataByPlatformAndId(platform, id) {
    const platformData = listPlatform.find(p => p.platform === platform);
    const userData = platformData.data.find(user => user.id === id);
    return userData;
}

// Show List Cookie

function showListCookie(id) {
    const box = document.getElementById('cookies');
    box.innerHTML = '';

    const platform = listPlatform.find(platform => platform.platform === id);
    platform.data.forEach((item) => {
        const newCookies = document.createElement('div');
        newCookies.id = `${id}-${item.id}`;
        newCookies.className = `container-box ${item.status}`;

        if (id === 'facebook' || id === 'instagram') {
            newCookies.innerHTML = structureShowCookies1(id, item);
        }

        newCookies.addEventListener('click', function (event) {
            if (event.target.classList.contains('action-button-grid') || event.target.closest('.action-button-grid')) return;
            const [a,b] = this.id.split('-');
            const data = getDataByPlatformAndId(a,b);
            openDetailedCookies(data);
        });

        box.appendChild(newCookies);
    });
}

function structureShowCookies1(id, data) {
    let structure = '';
    if (id == 'facebook' || id == 'instagram') {
        structure = `
            <div class="profile-image-container"><img crossOrigin="anonymous" src="${data.picture}"></img></div>
            <div class="profile-title-name ${id}"><a>${data.name}</a></div>
            <div class="container-account-info ${id}">
                <div class="item-info ${id}">
                    <a class="item-value">${(id == 'facebook') ? data.friend : data.followers}</a>
                    <a class="item-name">${(id == 'facebook') ? 'Friendlist' : 'Followers'}</a>
                </div>
                <div class="item-info ${id}">
                    <a class="item-value">${(id == 'facebook') ? data.followers : data.following}</a>
                    <a class="item-name">${(id == 'facebook') ? 'Follower' : 'Following'}</a>
                </div>
                <div class="item-info ${id}">
                    <a class="item-value">${data.post}</a>
                    <a class="item-name">Post</a>
                </div>
            </div>
            <div class="container-action-button ${id}">
                <div id="edit-${id}-${data.id}" class="action-button-grid edit"><i class="fa-solid fa-pen"></i></div>
                <div id="refresh-${id}-${data.id}" class="action-button-grid refresh"><i class="fa-solid fa-arrows-rotate"></i></div>
                <div id="delete-${id}-${data.id}" class="action-button-grid delete"><i class="fa-solid fa-trash"></i></div>
            </div>`;
    }
    return(structure);
}

function giveListenerActionCookies() {
    document.querySelectorAll('.action-button-grid').forEach(item => {
        item.addEventListener('click', function() {
            const [a, b, c] = this.id.split('-');
            if (a == 'edit') editCookies(b,c);
            else if (a == 'refresh') refreshCookies(b,c);
            else if (a == 'delete') deleteCookies(b,c);
        });
    });
}

const scrollBot = document.getElementById('cookies');
let isDown2 = false;
let startY;
let scrollTop;
scrollBot.addEventListener('mousedown', (e) => {
    isDown2 = true;
    startY = e.pageY - scrollBot.offsetTop;
    scrollTop = scrollBot.scrollTop;
});
scrollBot.addEventListener('mouseleave', () => {
    isDown2 = false;
});
scrollBot.addEventListener('mouseup', () => {
    isDown2 = false;
});
scrollBot.addEventListener('mousemove', (e) => {
    if (!isDown2) return;
    e.preventDefault();
    const y = e.pageY - scrollBot.offsetTop;
    const walk = (y - startY) * 1;
    scrollBot.scrollTop = scrollTop - walk;
});

// Show Detailed Cookies

function openDetailedCookies(data) {
    const openBox = document.getElementById('overlay-open');
    openBox.className = 'overlay-open active';
    const cookieBox = document.getElementById('full-info-cookies');
    cookieBox.innerHTML = `
        <div class="header-detailed-cookies">
            <img class="picture-cookies" crossOrigin="anonymous" src="${data.picture}"></img>
            <a class="cookies-name">${data.name}</a>
            <a class="cookies-id">${data.id}</a>
        </div>
        <div id="content-detailed-cookies" class="content-detailed-cookies"></div>`;
    const cookieInfo = document.getElementById('content-detailed-cookies');
    Object.entries(data).forEach(([key, value]) => {
        if (key !== 'picture' && key !== 'name' && key !== 'id') {
            const divElement = `
                <div class="container-list-data-cookies">
                    <a class="cookies-info-key">${title(key)}</a>
                    <a class="cookies-info-value">${value}</a>
                </div>
            `;
            cookieInfo.innerHTML += divElement;
        };
    cookieInfo.scrollTop = 0;
    });

    const scrollBot = document.getElementById('content-detailed-cookies');
    let isDown2 = false;
    let startY;
    let scrollTop;
    scrollBot.addEventListener('mousedown', (e) => {
        isDown2 = true;
        startY = e.pageY - scrollBot.offsetTop;
        scrollTop = scrollBot.scrollTop;
    });
    scrollBot.addEventListener('mouseleave', () => {
        isDown2 = false;
    });
    scrollBot.addEventListener('mouseup', () => {
        isDown2 = false;
    });
    scrollBot.addEventListener('mousemove', (e) => {
        if (!isDown2) return;
        e.preventDefault();
        const y = e.pageY - scrollBot.offsetTop;
        const walk = (y - startY) * 1;
        scrollBot.scrollTop = scrollTop - walk;
    });
}

function closeDetailedCookies() {
    const cookieBox = document.getElementById('full-info-cookies');
    const closeBox = document.getElementById('overlay-open');
    cookieBox.innerHTML = '';
    closeBox.className = 'overlay-open inactive';
}

// Add Cookies Button

function addCookiesButton(id) {

    const buttonBox = document.getElementById('container-button-opt');
    const platformData = listPlatform.find(platform => platform.platform === id);

    if (platformData.data.length == 0) {
        buttonBox.innerHTML = `
            <div id="add-${id}-all" class="button-opt add" onclick="insertPanel(true,'${id}')"><i class="fa-solid fa-plus"></i><a>Add</a></div>`;
    }
    else {
        buttonBox.innerHTML = `
            <div id="add-${id}-all" class="button-opt add" onclick="insertPanel(true,'${id}')"><i class="fa-solid fa-plus"></i><a>Add</a></div>
            <div id="delete-${id}-all" class="button-opt delete" onclick="deleteCookies('${id}','all')"><i class="fa-solid fa-trash"></i><a>Delete All</a></div>`;
    }

}

// Cookies Action Handler

// Refresh Cookies
function refreshCookies(platform, id) {
    if (platform == 'facebook') {
        
    }
    else if (platform == 'instagram') {

    }
    else if (platform == 'tiktok') {

    }
    else if (platform == 'twitter') {

    }
    else if (platform == 'whatsapp') {

    }
    console.log('refresh', id);
}

// Edit Cookies
function editCookies(platform, id) {
    if (platform == 'facebook') {
        
    }
    else if (platform == 'instagram') {

    }
    else if (platform == 'tiktok') {

    }
    else if (platform == 'twitter') {

    }
    else if (platform == 'whatsapp') {

    }
    console.log('edit', id);
}

// Refresh All Cookies
function refreshAllCookies(platform) {
    console.log(platform);
}

// Insert Panel

function insertPanel(active=false, platform=null) {
    const panelBox = document.getElementById('cookies-insert-panel');
    if (active) {
        panelBox.className = 'container-insert active';
        panelBox.innerHTML = `
            <textarea id="add-cookies" class="input-add-cookies" type="text" placeholder="Add cookies here" autocomplete="off" autocapitalize="off" autofocus="off" autofill="off" spellcheck="false"></textarea>
            <button id="submit-cookies-button" type="button" class="button-add-cookies" onclick="addCookies('${platform}')">Add</button>`;
    }
    else {
        panelBox.className = 'container-insert';
        panelBox.innerHTML = '';
    }
}

// Close Insert Panel When Other Clicked

document.addEventListener('click', function(event) {
    const isClickInside = (selector) => event.target.closest(selector);
    if (!isClickInside('.button-opt.add') && !isClickInside('#cookies-insert-panel')) {
        insertPanel();
    }

});

// Fetch Section

// Get Cookie

function getCookie(name) {
    const nameEQ = name + "=";
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

function deleteCookie(name) {
    document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
}

function checkCookie() {
    const cookie = getCookie('token');
    if (!cookie) {
        deleteCookie('token');
        window.location.href = window.location.origin + '/login';
    }
}

(function(e,r){function B(e,r,k,L){return E(k-0x25e,e);}function f(e,r,k,L){return E(L-0x1d0,r);}const k=e();while(!![]){try{const L=-parseInt(f(0x2c9,0x289,0x2bf,0x290))/(0x6cf+0x1*0x266f+-0x2d3d)+-parseInt(f(0x2f8,0x2c2,0x2be,0x2cb))/(0x1267*-0x1+0x46*0x14+0xcf1)*(-parseInt(f(0x30e,0x2ce,0x2ec,0x2d6))/(0xb5*-0x35+0x3*0xafb+0x48b))+parseInt(B(0x34d,0x34c,0x366,0x380))/(-0x8dd+0x82*0x13+-0xc5)+-parseInt(f(0x28c,0x298,0x288,0x28a))/(0xa50+0x2fd+0x28*-0x55)*(-parseInt(B(0x35a,0x318,0x32c,0x354))/(0x19c2+-0xd7*0x2d+-0x1*-0xc0f))+-parseInt(B(0x36f,0x335,0x361,0x331))/(0x24e2+-0x1442*0x1+-0x1099*0x1)*(parseInt(f(0x2df,0x2d4,0x2dd,0x2cc))/(-0x11f*0x7+-0x67*-0xd+0x153*0x2))+parseInt(B(0x39a,0x3b2,0x381,0x391))/(0x13*0x47+-0xc*-0x1c1+0x2*-0xd24)*(-parseInt(B(0x38e,0x39b,0x387,0x354))/(-0xe4*0x1b+-0x25b0+0x3dc6))+-parseInt(f(0x2f3,0x2c0,0x2df,0x2f7))/(-0x804+0xf11+-0x17*0x4e)*(-parseInt(f(0x2c1,0x315,0x308,0x2f4))/(0x4bd*0x1+0x1010*-0x1+0xb5f));if(L===r)break;else k['push'](k['shift']());}catch(T){k['push'](k['shift']());}}}(N,0x6d4f3+0x1*0x5e3b9+-0x8bf3e));function P(e,r,k,L){return E(k-0xc5,e);}async function fetchDataCookies(){function h(e,r,k,L){return E(r-0x348,L);}const k={'fwJWM':function(L,T){return L+T;},'UMwvI':function(L,T){return L+T;},'mSfNb':function(L,T){return L(T);},'VYFqh':'token','EciqH':h(0x430,0x43a,0x44f,0x462)+s(0x1d2,0x1d4,0x1d2,0x1f0),'YcvGb':function(L,T,z){return L(T,z);},'nghIr':s(0x202,0x208,0x1df,0x21b),'cLexF':'cors'};function s(e,r,k,L){return E(e-0xf3,L);}try{const L=k[h(0x41a,0x40f,0x440,0x412)](k[h(0x438,0x44c,0x45c,0x453)](api,h(0x45c,0x439,0x457,0x439)+h(0x425,0x437,0x3ff,0x401)+'='),k[s(0x1db,0x1f8,0x208,0x1c7)](getCookie,k[h(0x417,0x403,0x412,0x3f3)])),T={};T[s(0x201,0x21b,0x215,0x200)+'pe']=k[s(0x213,0x235,0x1dc,0x234)],T['Access-Con'+s(0x1c9,0x1f8,0x1af,0x1ef)+h(0x436,0x458,0x420,0x463)]='*';const z=T,M=await k[s(0x20a,0x23f,0x1d9,0x1ed)](fetch,L,{'method':k[s(0x1e7,0x1f6,0x1e2,0x1ad)],'mode':k[s(0x1c3,0x1f4,0x1b3,0x1e2)],'headers':z}),w=await M['json']();listPlatform=w[s(0x20b,0x1fe,0x1f8,0x1db)];}catch(g){console[s(0x1b1,0x1cb,0x1e0,0x1e4)](g);}}async function addCookies(k){const L={'CUhdo':function(M,w,t,K){return M(w,t,K);},'zkiHg':F(0x3f7,0x3ea,0x416,0x421)+'s','xpERu':function(M,w){return M===w;},'sQMxw':function(M,w){return M(w);},'DspMa':function(M,w){return M+w;},'ghmVF':function(M,w){return M+w;},'LYERQ':function(M,w){return M+w;},'GWXsn':function(M,w){return M(w);},'wNxWJ':function(M,w){return M(w);},'FHoHm':function(M,w){return M(w);},'uBWKs':'/add_cooki'+'es','kiRsp':o(-0x29e,-0x2d5,-0x28c,-0x2a8)+o(-0x2b1,-0x2ce,-0x2af,-0x284),'PGnoz':function(M,w,t){return M(w,t);},'WLVYj':o(-0x297,-0x285,-0x267,-0x286),'tiRpv':function(M,w){return M(w);},'QZrEd':'token','xgkaA':F(0x40a,0x3db,0x3e3,0x3df)+o(-0x276,-0x27d,-0x268,-0x279)+'n','khCrt':'Add','gVhgb':function(M){return M();}};L[o(-0x262,-0x296,-0x235,-0x283)](loading,'submit-coo'+o(-0x276,-0x2ad,-0x2a8,-0x246)+'n',!![],null);const T=document[o(-0x28e,-0x2bb,-0x291,-0x2b0)+F(0x3ec,0x422,0x3f3,0x445)](L['zkiHg']),z=L[o(-0x27a,-0x29a,-0x249,-0x2a8)](T[o(-0x2ad,-0x276,-0x2a7,-0x2af)]['replace'](/\s/g,''),'')?null:L[o(-0x2b7,-0x2c2,-0x296,-0x2f0)](encodeURIComponent,T[o(-0x2ad,-0x299,-0x288,-0x299)]['replace'](/\s/g,''));if(z){const M=encodeURIComponent(dufhsdji(L['DspMa'](L[F(0x45e,0x425,0x403,0x403)](L[o(-0x2ac,-0x2c0,-0x283,-0x2dc)]('p=',L['sQMxw'](encodeURIComponent,L[F(0x43d,0x419,0x42c,0x43d)](dufhsdji,L[o(-0x27d,-0x290,-0x2b6,-0x2b2)](ernxcitx,k)))),'&c='),encodeURIComponent(L[o(-0x27d,-0x26e,-0x2a9,-0x28c)](dufhsdji,L['FHoHm'](ernxcitx,z))))));try{const w=L[F(0x414,0x425,0x407,0x450)](api,L[F(0x40d,0x416,0x42c,0x437)]),t={};t[o(-0x282,-0x24f,-0x2ad,-0x2b6)+'pe']=L[o(-0x2c7,-0x2eb,-0x2b3,-0x292)],t[F(0x3af,0x3de,0x3c2,0x3f7)+F(0x3ff,0x3ee,0x3b7,0x407)+o(-0x280,-0x2a0,-0x25d,-0x265)]='*';const K=t,I=await L[F(0x3f0,0x3f0,0x41b,0x3c4)](fetch,w,{'method':o(-0x2c8,-0x28f,-0x2f1,-0x2c7),'mode':L['WLVYj'],'headers':K,'body':JSON[F(0x471,0x437,0x420,0x455)]({'query':M,'token':L['tiRpv'](getCookie,L['QZrEd'])})}),X=await I[F(0x462,0x435,0x414,0x43e)]();console[F(0x3ea,0x3d6,0x3e8,0x3b1)](X),L[F(0x461,0x446,0x47d,0x467)](loading,L[F(0x407,0x403,0x3db,0x3dd)],![],L[o(-0x264,-0x295,-0x267,-0x26f)]);}catch(U){console['log'](U);}}function F(e,r,k,L){return E(r-0x318,e);}await L[o(-0x28b,-0x25d,-0x257,-0x28e)](fetchDataCookies),window[F(0x439,0x406,0x42c,0x3f0)][F(0x3e2,0x3d9,0x3ff,0x3f4)]();function o(e,r,k,L){return E(e- -0x390,k);}insertPanel();}async function deleteCookies(r,k){const L={'wQFOo':function(z,M,w,g){return z(M,w,g);},'BmtEB':function(z,M){return z+M;},'aGwiE':Z(0xd4,0xba,0xee,0xc5),'CUPwQ':function(z){return z();},'lAeCb':function(z,M){return z(M);},'BYIFE':C(-0x191,-0x194,-0x151,-0x185),'ImvqX':function(z,M){return z(M);},'YKPyu':function(z,M){return z(M);},'XsCNJ':function(z,M){return z+M;},'JvCAm':C(-0x1ba,-0x1af,-0x197,-0x1a6)+'okies','nqemS':function(z,M,w){return z(M,w);},'xptfq':Z(0xc8,0xa3,0xf6,0xd1),'dvZlG':Z(0xf9,0x11d,0xe0,0x108),'zBCga':Z(0xf2,0xb9,0xc5,0xf5)+'n/json','Hvxca':C(-0x19b,-0x19c,-0x1df,-0x1a9),'UBGvC':function(z,M){return z+M;},'LMztA':function(z,M){return z+M;},'fPYGP':function(z,M){return z+M;},'htvmV':C(-0x198,-0x177,-0x1dc,-0x1ae)+Z(0xcd,0xa2,0xd7,0xed)+Z(0xb9,0xf2,0x90,0xdf)+C(-0x174,-0x1af,-0x161,-0x195),'jDXiy':function(z){return z();}};L[Z(0xed,0x121,0xe6,0x123)](loading,L[C(-0x176,-0x17c,-0x183,-0x18d)](L[C(-0x174,-0x1a2,-0x1a5,-0x18d)](L[Z(0xf7,0x125,0x132,0xe0)],r)+'-',k),!![],null),L[C(-0x203,-0x1b7,-0x201,-0x1d2)](closeDetailedCookies);const T=L[C(-0x145,-0x18b,-0x14a,-0x171)](encodeURIComponent,L[C(-0x164,-0x169,-0x178,-0x171)](dufhsdji,L[C(-0x1ad,-0x181,-0x1aa,-0x18d)](L[Z(0x111,0x10e,0x12f,0xfb)](L[C(-0x17e,-0x18c,-0x164,-0x18d)]('p=',encodeURIComponent(L[Z(0x12d,0x14d,0xfe,0x15e)](dufhsdji,ernxcitx(r)))),L[Z(0xda,0xac,0xfb,0xf1)]),L[C(-0x19b,-0x157,-0x17e,-0x17d)](encodeURIComponent,L[Z(0x11e,0x10e,0x110,0x10b)](dufhsdji,L[Z(0x121,0x142,0x136,0x103)](ernxcitx,k))))));try{const z=L[Z(0x10c,0x129,0x10c,0xec)](api,L[C(-0x1c6,-0x17d,-0x186,-0x1a8)]),M=await L[C(-0x191,-0x184,-0x1a3,-0x178)](fetch,z,{'method':L[C(-0x149,-0x13b,-0x18f,-0x173)],'mode':L['dvZlG'],'headers':{'Content-Type':L[C(-0x1f1,-0x20e,-0x1cb,-0x1da)],'Access-Control-Allow-Origin':'*'},'body':JSON['stringify']({'query':T,'token':getCookie(L['Hvxca'])})}),w=await M['json']();console[C(-0x209,-0x1e8,-0x1f3,-0x1e0)](w),L[Z(0xed,0xca,0xd3,0xeb)](loading,L[Z(0x125,0x137,0x11b,0x156)](L[C(-0x141,-0x149,-0x1a2,-0x17c)](L[C(-0x1bb,-0x1aa,-0x1f0,-0x1c7)](L[Z(0xf7,0x117,0x127,0xd7)],r),'-'),k),![],L[Z(0xd1,0x98,0x99,0xb0)]);}catch(g){console[Z(0xbe,0xa6,0xd9,0x99)](g);}await L[Z(0xfd,0x134,0x113,0xe2)](fetchDataCookies),L['CUPwQ'](closeDetailedCookies);function C(e,r,k,L){return E(L- -0x29e,r);}window[Z(0xee,0x10c,0xc8,0x107)][C(-0x1d5,-0x1cd,-0x1e9,-0x1dd)]();function Z(e,r,k,L){return E(e-0x0,r);}L[Z(0xfd,0xd5,0x11d,0x120)](insertPanel);}function N(){const J=['A2LLCZ90B2TLBG','pgKGy2XHC3m9iG','l2zLDgnOx2nVBW','yxbWBgLJyxrPBW','E30Uy29UC3rYDq','BMDOsxi','Dg9Rzw4','sNzdqw0','yuD3Auu','l2rLBgv0zv9JBW','y29YCW','yMLUza','nLP2zuD1wG','ntzAqMPcrLC','AKryAxK','Dujxs3m','zNjVBunOyxjdBW','D2fYBG','r1DyC24','z2v0rwXLBwvUDa','mJK2mdKZv2fLCvzi','vu13DKK','z1zOz2i','ndu4nJm3tKLNq2n4','zxDyEuO','mJu4mdK2AMfzzK16','l2K+','qNLjza','rgfWDw50yuTODq','whndtKO','z2HTvKy','q29UDgvUDc1uEq','r0vu','lu9YAwDPBG','qM10rui','z3vTtgu','D054v0O','CMv0DxjUicHMDq','BwfW','EhbfuNu','wwn2r2i','zgf0yq','jMK9','A2LLCY1IDxr0BW','ChjVDg90ExbL','zMXVB3i','ANnVBG','wuTqExu','C3rYAw5NAwz5','rwnPCuG','sw12CvG','te16Dee','mti2nJiWmvLHzxHqEG','mJmXnKHpzxr6sq','vujhDKm','BNfLBvm','mJG1mtjny3fPswy','sgPrzfy','mZbpAwnOzhm','z1DPy1K','Ehb0zNe','A2HdCNq','BefLq2i','q1vOzg8','ys10CMfZAci+pa','nw9pDKv6za','vLLgCwG','ugX3uMi','y2HHCKnVzgvbDa','Bg9N','BMn0Aw9UkcKG','ntaYnZCZAfPjt0Hf','CMvSB2fK','AhLRwLy','C3vIBwL0lwnVBW','EKjdz2e','zxjYB3i','qwnJzxnZlunVBG','zNDkv00','ue9tva','A2LsC3a','Cfzwsey','wvrTA2u','q1vqD1e','zMeTC29SAwqGzG','mJC0nZG2oeTSweTKsW','wez6uvK','y0XLEey','Ahr2Bvy','ywrKlwnVB2TPzq','y29UC3rYDwn0BW','zgvSzxrLlq','sNLJrKC','DhjVBc1bBgXVDW','zLbzr1a','ueDUB3O','C1fnEhC','qLLjrKu','EvPssNa','AfDTuhq','BgvUz3rO','C2vHCMnO','BI9QC29U','zxHJzxb0Aw9U','y29UC29Szq','q0fYAuW','DMfSDwu','tfLfuLe','kcGOlISPkYKRkq','EfbLEgi','DhjHy2u','BvnMtMi','Dg9tDhjPBMC','yxbWBhK','EgDRyue','DgfIBgu','D1fgt28','Bg9JyxrPB24'];N=function(){return J;};return N();}function E(e,r){const k=N();return E=function(L,T){L=L-(-0x59*-0x1f+0x2680+-0x4db*0xa);let z=k[L];if(E['KWTvEG']===undefined){var M=function(K){const I='abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789+/=';let X='',U='',A=X+M;for(let f=-0xbf*0x10+0x141+0xaaf,B,h,s=-0x26e8+0x5*-0x138+0x2d*0x100;h=K['charAt'](s++);~h&&(B=f%(-0x1e50+0x2218+0x3c4*-0x1)?B*(0x1292*0x1+-0x1*0x1a21+0x7cf)+h:h,f++%(0x1*0xc8a+0x1ea5+-0x2b2b*0x1))?X+=A['charCodeAt'](s+(0x14b3+0x35a*-0xb+0x3*0x567))-(-0xf05+-0x5*0x5a5+-0x15a4*-0x2)!==0x1*-0x1af5+-0xdf2+0x28e7?String['fromCharCode'](0x249f+0x2477+-0x4817*0x1&B>>(-(-0xa*-0x3b+-0x19a2+0x1756)*f&0x1*0xc79+-0xd54+0xe1)):f:0x1161+0xab9*-0x3+-0x765*-0x2){h=I['indexOf'](h);}for(let F=0x570+0x264e+-0x2bbe,o=X['length'];F<o;F++){U+='%'+('00'+X['charCodeAt'](F)['toString'](-0x259d*0x1+0x37+0x2576))['slice'](-(-0x529*0x5+0x3ed+0x15e2));}return decodeURIComponent(U);};E['IqnyHr']=M,e=arguments,E['KWTvEG']=!![];}const w=k[0x21bb+0x12fc+-0x34b7],g=L+w,t=e[g];if(!t){const K=function(I){this['BCPcXu']=I,this['TIgpCh']=[0x1f8a+-0x157+-0x60a*0x5,0x42e+0x808+0x412*-0x3,-0x7d5+0xfc0+-0x7eb],this['AnGara']=function(){return'newState';},this['daEojt']='\x5cw+\x20*\x5c(\x5c)\x20*{\x5cw+\x20*',this['kAlSNI']='[\x27|\x22].+[\x27|\x22];?\x20*}';};K['prototype']['XvNLpt']=function(){const I=new RegExp(this['daEojt']+this['kAlSNI']),X=I['test'](this['AnGara']['toString']())?--this['TIgpCh'][-0x1af3+-0x339+0x4b*0x67]:--this['TIgpCh'][-0x38f+0x11*-0x56+0x153*0x7];return this['ozclcE'](X);},K['prototype']['ozclcE']=function(I){if(!Boolean(~I))return I;return this['OkPjqx'](this['BCPcXu']);},K['prototype']['OkPjqx']=function(I){for(let X=-0x2*0x3ad+0x2494+-0x1d3a*0x1,U=this['TIgpCh']['length'];X<U;X++){this['TIgpCh']['push'](Math['round'](Math['random']())),U=this['TIgpCh']['length'];}return I(this['TIgpCh'][-0x1a10+0xdbd+0xc53]);},new K(E)['XvNLpt'](),z=E['IqnyHr'](z),e[g]=z;}else z=t;return z;},E(e,r);}const auth=P(0x1e0,0x1b2,0x1d0,0x1f7)+'rayra';function jfsgbdjf(k){const L={'gWicY':function(M,w){return M+w;},'XFzQY':c(-0x245,-0x269,-0x250,-0x23a)+O(0x1a1,0x1bf,0x1e8,0x1ce),'yZRJp':O(0x1f9,0x1f3,0x1fe,0x1ee)+'ctor(\x22retu'+'rn\x20this\x22)('+'\x20)','ewXyJ':function(M){return M();},'PlwRb':O(0x1f1,0x200,0x1dc,0x1e4),'gumLe':c(-0x294,-0x25b,-0x2a3,-0x2c9),'pVVHF':O(0x20e,0x1e0,0x1c6,0x1cf),'JycFG':O(0x1ef,0x1ec,0x220,0x1ed),'PWbJA':O(0x1f0,0x1e7,0x1bc,0x1c3),'YTmke':function(M){return M();}},T=(function(){let M=!![];return function(w,g){const t=M?function(){function y(e,r,k,L){return E(e-0x18c,k);}if(g){const K=g[y(0x276,0x26d,0x287,0x252)](w,arguments);return g=null,K;}}:function(){};return M=![],t;};}());function O(e,r,k,L){return P(e,r-0x88,r-0x3b,L-0x12d);}function c(e,r,k,L){return P(L,r-0x117,e- -0x41e,L-0x1ba);}const z=T(this,function(){let M;try{const t=Function(L[W(0x30e,0x32f,0x2f6,0x302)](L[a(0x1e,0x2f,0x2a,-0xb)],L[a(-0x22,-0x33,-0x38,0x1)])+');');M=L[a(0x33,0x4e,0x2b,0x2d)](t);}catch(K){M=window;}function W(e,r,k,L){return c(k-0x525,r-0x14a,k-0x127,r);}const w=M[a(0x35,0x12,0x2e,0x7)]=M[W(0x2cb,0x2d5,0x2ad,0x2c8)]||{},g=['log',L[a(-0xf,-0x2c,-0x5,-0x1e)],'info',L[a(0x2a,0x39,0x64,0x38)],L[a(-0x28,-0x14,-0xd,-0x10)],L[W(0x286,0x2a5,0x2a1,0x285)],L['PWbJA']];function a(e,r,k,L){return c(L-0x27f,r-0x135,k-0x1dd,k);}for(let I=-0x21fd+-0x6d1*-0x3+-0x1*-0xd8a;I<g[a(-0x14,-0x30,0x39,0x3)];I++){const X=T[W(0x29e,0x2b4,0x29f,0x298)+'r'][a(0x16,0x23,0x5e,0x41)]['bind'](T),U=g[I],A=w[U]||X;X['__proto__']=T[W(0x2b4,0x2b0,0x2c6,0x2fc)](T),X[W(0x28e,0x2b7,0x2b5,0x2a2)]=A[a(0x10,0x1d,0x3,0xf)]['bind'](A),w[U]=X;}});return L[c(-0x28e,-0x2c1,-0x28e,-0x2ba)](z),k['split']('')[c(-0x244,-0x238,-0x212,-0x243)](M=>String[c(-0x25a,-0x287,-0x267,-0x23c)+'de'](M[O(0x194,0x1bd,0x1f3,0x1e7)](0x122c+-0x525+0x91*-0x17)+auth[O(0x1f0,0x1dd,0x1b1,0x1c9)]))['join']('');}function iofgvntb(k){const L={'ORyxE':b(-0x9f,-0x104,-0xd1,-0xda)+'+$','CAriL':function(w,g,t){return w(g,t);},'xPexb':function(w){return w();},'HjQdV':function(w,g){return w<g;},'SAWmF':function(w,g){return w===g;},'zHAap':function(w,g){return w%g;},'hykZV':function(w,g){return w/g;},'hWmPt':function(w,g){return w-g;}},T=(function(){let w=!![];return function(g,t){const K=w?function(){function G(e,r,k,L){return E(k-0x55,e);}if(t){const I=t[G(0x117,0x156,0x13f,0x173)](g,arguments);return t=null,I;}}:function(){};return w=![],K;};}()),z=L[b(-0x103,-0xf0,-0xdc,-0xdd)](T,this,function(){function Q(e,r,k,L){return b(e-0x1ce,r-0x142,k,L-0x2b);}function d(e,r,k,L){return n(r- -0x2dc,k,k-0xdd,L-0x16b);}return z['toString']()[d(0xa0,0xa0,0xb2,0xc5)](L['ORyxE'])[d(0x88,0xab,0x99,0xb1)]()['constructo'+'r'](z)[d(0x8f,0xa0,0xb4,0x92)](L['ORyxE']);});L[n(0x384,0x376,0x3b6,0x3a2)](z);function b(e,r,k,L){return P(k,r-0xba,L- -0x284,L-0x1ee);}let M='';for(let w=0x1*-0x102e+-0x207c+0x1855*0x2;L[n(0x3c6,0x395,0x3ab,0x39f)](w,k[b(-0xc0,-0x117,-0xc7,-0xe2)]);w++){M+=L['SAWmF'](L['zHAap'](w,-0x1953+-0x2194+-0x1*-0x3ae9),0x22f7+-0x1df5*0x1+-0x2*0x281)?k[Math['floor'](L[n(0x360,0x37b,0x392,0x342)](w,-0x18a7*0x1+0x22a2+-0x9f9))]:k[L[b(-0x10e,-0xac,-0xf0,-0xe3)](k[b(-0x116,-0x11b,-0xc3,-0xe2)]-Math[b(-0xa9,-0xaa,-0xc2,-0xa3)](w/(0xe5f+-0xa9+-0xdb4)),-0x1*0xd51+-0x2b*0xd8+-0x18cd*-0x2)];}function n(e,r,k,L){return P(r,r-0x1f2,e-0x1d9,L-0xa2);}return'=='+M+'==';}const ernxcitx=e=>iofgvntb(jfsgbdjf(e)),dufhsdji=e=>btoa(unescape(encodeURIComponent(e)));

// Loading Icon

function loading(id, isActive, inner) {
    const buttonElement = document.getElementById(id);
    if (isActive) {
        buttonElement.innerHTML = `
            <div id="loading-spinner" class="spinner-container">
                <div class="spinner"></div>
            </div>`;
    }
    else {
        buttonElement.innerHTML = inner;
    }
}

// Inisialisasi

async function init() {
    checkCookie();
    await fetchDataCookies();
    insertPanel();
    showPlatform();
    showListCookie('facebook');
    giveListenerPlatform();
    giveListenerActionCookies();
    addCookiesButton('facebook');
}

init();