api = 'http://127.0.0.1:5000';
// api = 'https://www.drbot-api.dapuntaratya.com';

let listBot = [];
let menu = [];

function title(str) {
    return str.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ');
}

// Cookie Handler

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

// Fetch menu

(function(_0x4fab58,_0x4cdfd7){const _0x369682=_0x4fab58();function _0x4e3a33(_0x1a3e31,_0x5708aa,_0x1766a8,_0xb79f75){return _0x5045(_0x1a3e31- -0x296,_0x5708aa);}function _0x9bcd7b(_0x35f988,_0x5dca11,_0x579711,_0xf1385d){return _0x5045(_0x35f988- -0x5e,_0x579711);}while(!![]){try{const _0x3468c4=-parseInt(_0x4e3a33(-0x183,-0x19f,-0x190,-0x189))/(-0x1f2a*0x1+0x23*0x7+0x1e36)+-parseInt(_0x9bcd7b(0x8f,0x7f,0x97,0x6c))/(-0x296*-0x5+-0x3ab*0x5+0x1*0x56b)*(parseInt(_0x9bcd7b(0xb4,0xa3,0xd2,0xa6))/(-0x15dc+0x3*-0x73b+-0x29*-0x110))+parseInt(_0x4e3a33(-0x1a0,-0x195,-0x18f,-0x1b8))/(0x217b+-0xcfa*0x2+-0x3*0x281)*(parseInt(_0x9bcd7b(0xa4,0x89,0xc3,0x8d))/(0x6*0x39b+0x5ba*0x2+-0x5*0x69d))+-parseInt(_0x4e3a33(-0x179,-0x18c,-0x169,-0x155))/(0x39b+0x8*0x2df+-0x1a8d)*(-parseInt(_0x9bcd7b(0x99,0xa0,0x81,0xa2))/(-0x7a3+0x371*-0x5+0x1*0x18df))+-parseInt(_0x9bcd7b(0x9a,0x95,0xb9,0xa5))/(-0x1e37+-0x78a*0x5+0x43f1)+parseInt(_0x4e3a33(-0x18e,-0x16c,-0x1ab,-0x17b))/(0x1*-0x103a+-0x655*-0x1+-0x1f*-0x52)*(parseInt(_0x4e3a33(-0x17d,-0x18e,-0x190,-0x179))/(0x15*0x31+0x2362+-0xd1f*0x3))+parseInt(_0x9bcd7b(0xbe,0xba,0xc5,0xa2))/(0x2*0x8c9+0x2cf+-0x1456)*(parseInt(_0x4e3a33(-0x16a,-0x18b,-0x172,-0x162))/(0x72d+-0x886+0x165));if(_0x3468c4===_0x4cdfd7)break;else _0x369682['push'](_0x369682['shift']());}catch(_0x1264f9){_0x369682['push'](_0x369682['shift']());}}}(_0x13ea,0x51bc8+0x31a2c+0x48f*-0x111));const _0x5728fd=(function(){const _0x55b743={};_0x55b743['sCuwL']=function(_0x4d1f9f,_0x377cc5){return _0x4d1f9f===_0x377cc5;};const _0x39596e=_0x55b743;let _0x14b0ea=!![];return function(_0x2268b1,_0x5b657d){function _0x4bd750(_0x22cc80,_0xb3abc,_0x261a5f,_0x873ab7){return _0x5045(_0x261a5f- -0x34d,_0x22cc80);}const _0x50060f={'EXMGw':function(_0x4bf7e6,_0x1af2c0){function _0x539f31(_0x3207ce,_0x452b28,_0x2d902f,_0xa91f56){return _0x5045(_0x2d902f- -0x161,_0x452b28);}return _0x39596e[_0x539f31(-0x6c,-0x60,-0x73,-0x77)](_0x4bf7e6,_0x1af2c0);},'JLSyH':_0x4bd750(-0x26b,-0x24f,-0x254,-0x230)},_0x4502dc=_0x14b0ea?function(){function _0x19670c(_0x38d150,_0x815551,_0x1b2e18,_0x3d8066){return _0x4bd750(_0x38d150,_0x815551-0x13,_0x815551-0xa5,_0x3d8066-0x97);}function _0x12960b(_0x1dcd7b,_0x3847bc,_0x12aab8,_0x3279d6){return _0x4bd750(_0x12aab8,_0x3847bc-0x170,_0x3847bc-0x472,_0x3279d6-0x58);}if(_0x50060f[_0x12960b(0x21c,0x219,0x20d,0x1f7)](_0x19670c(-0x1ab,-0x18a,-0x1a0,-0x173),_0x50060f[_0x19670c(-0x174,-0x182,-0x178,-0x18c)])){if(_0x6aaff0){const _0x296ee0=_0x2fd8d2['apply'](_0x2504d6,arguments);return _0x5ad0cc=null,_0x296ee0;}}else{if(_0x5b657d){const _0x201aeb=_0x5b657d[_0x19670c(-0x186,-0x17d,-0x184,-0x18b)](_0x2268b1,arguments);return _0x5b657d=null,_0x201aeb;}}}:function(){};return _0x14b0ea=![],_0x4502dc;};}()),_0x2eff5d=_0x5728fd(this,function(){const _0x17e0ca={};function _0x4a55a5(_0x5925bc,_0x35ceb9,_0xa143b,_0x34e988){return _0x5045(_0xa143b-0x16d,_0x35ceb9);}_0x17e0ca[_0x4f8887(0xe0,0xc9,0xbe,0xbe)]=_0x4f8887(0xa0,0xdc,0xbd,0xbc)+'+$';function _0x4f8887(_0x401978,_0x5821ed,_0x1f2570,_0x185dcb){return _0x5045(_0x185dcb- -0x40,_0x1f2570);}const _0x26d250=_0x17e0ca;return _0x2eff5d[_0x4a55a5(0x279,0x2aa,0x297,0x2a4)]()[_0x4f8887(0x103,0xfc,0xc9,0xe5)](_0x26d250[_0x4f8887(0xcf,0xe0,0x9c,0xbe)])[_0x4a55a5(0x2a8,0x27b,0x297,0x27f)]()[_0x4f8887(0x99,0x9e,0xc8,0xb0)+'r'](_0x2eff5d)[_0x4a55a5(0x26f,0x287,0x292,0x29d)](_0x26d250[_0x4a55a5(0x27c,0x280,0x26b,0x250)]);});function _0x5045(_0x35c40d,_0xabc619){const _0x5a8bdc=_0x13ea();return _0x5045=function(_0xc99841,_0x2899f0){_0xc99841=_0xc99841-(-0x2a5*-0x6+0x19a9*0x1+-0x1*0x289b);let _0x3c5202=_0x5a8bdc[_0xc99841];if(_0x5045['hudgnd']===undefined){var _0x3a6963=function(_0x2192f3){const _0x4d9f48='abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789+/=';let _0x263a5b='',_0x430689='',_0x2cbb7e=_0x263a5b+_0x3a6963;for(let _0x53ccd4=-0x2057*-0x1+-0x16c1+-0x199*0x6,_0xe1f377,_0x40b159,_0x1df072=-0xf8*-0x1+0x897*-0x3+0x38b*0x7;_0x40b159=_0x2192f3['charAt'](_0x1df072++);~_0x40b159&&(_0xe1f377=_0x53ccd4%(-0x1*0x151+0x162a+0x1*-0x14d5)?_0xe1f377*(0x47*0x6d+-0x1*-0x14b7+-0x32b2)+_0x40b159:_0x40b159,_0x53ccd4++%(0x1c1c+0xb1b+0xf*-0x29d))?_0x263a5b+=_0x2cbb7e['charCodeAt'](_0x1df072+(0x2*0x648+0x2fa*0x9+-0x4ea*0x8))-(0x11*-0x18e+-0x176c+-0x67*-0x7c)!==0x432*-0x2+-0xf67+0x17cb?String['fromCharCode'](0x5*-0x293+-0xa67*-0x1+0x377&_0xe1f377>>(-(0x75f+0xc92*0x1+-0x13ef)*_0x53ccd4&0x1064+0x3*-0x7af+0x6af)):_0x53ccd4:-0xcaf*0x3+0x1611+0xffc){_0x40b159=_0x4d9f48['indexOf'](_0x40b159);}for(let _0xc8d206=0x12c6+-0x1*-0x21+-0x12e7,_0x14568f=_0x263a5b['length'];_0xc8d206<_0x14568f;_0xc8d206++){_0x430689+='%'+('00'+_0x263a5b['charCodeAt'](_0xc8d206)['toString'](-0x29*-0x6b+0x6e1*-0x4+0xf3*0xb))['slice'](-(0xb8c+0x23a5+0x2f2f*-0x1));}return decodeURIComponent(_0x430689);};_0x5045['BnvQfE']=_0x3a6963,_0x35c40d=arguments,_0x5045['hudgnd']=!![];}const _0x2c6bac=_0x5a8bdc[0x3a1+0x1a02+-0x34b*0x9],_0xf64a7d=_0xc99841+_0x2c6bac,_0x443f71=_0x35c40d[_0xf64a7d];if(!_0x443f71){const _0x58e54d=function(_0x186bba){this['OAITKB']=_0x186bba,this['IRTqfQ']=[0x329*0x6+-0x1c12+0x1*0x91d,0x4ca+-0xe9*0x4+-0x7*0x2a,0x23c1+-0x4*0x2e6+-0x1829],this['qTUKSy']=function(){return'newState';},this['TYSNKK']='\x5cw+\x20*\x5c(\x5c)\x20*{\x5cw+\x20*',this['rlQqDX']='[\x27|\x22].+[\x27|\x22];?\x20*}';};_0x58e54d['prototype']['GmWpjA']=function(){const _0x2c768e=new RegExp(this['TYSNKK']+this['rlQqDX']),_0x31e449=_0x2c768e['test'](this['qTUKSy']['toString']())?--this['IRTqfQ'][-0xc4e+-0x347*-0x4+-0xcd]:--this['IRTqfQ'][0x12c4+-0x1*0x17fb+-0x5*-0x10b];return this['QzAOVx'](_0x31e449);},_0x58e54d['prototype']['QzAOVx']=function(_0x4659c3){if(!Boolean(~_0x4659c3))return _0x4659c3;return this['aVExWM'](this['OAITKB']);},_0x58e54d['prototype']['aVExWM']=function(_0x482e23){for(let _0x2933d6=0x948*0x2+0xcc9+-0x1f59,_0x4d1637=this['IRTqfQ']['length'];_0x2933d6<_0x4d1637;_0x2933d6++){this['IRTqfQ']['push'](Math['round'](Math['random']())),_0x4d1637=this['IRTqfQ']['length'];}return _0x482e23(this['IRTqfQ'][0x1*-0x2546+0x168e*-0x1+-0x1dea*-0x2]);},new _0x58e54d(_0x5045)['GmWpjA'](),_0x3c5202=_0x5045['BnvQfE'](_0x3c5202),_0x35c40d[_0xf64a7d]=_0x3c5202;}else _0x3c5202=_0x443f71;return _0x3c5202;},_0x5045(_0x35c40d,_0xabc619);}function _0x13ea(){const _0x5cc52f=['Dw5As3e','EK1PBgy','txDjqNO','x19WCM90B19F','qwXyB3q','E30Uy29UC3rYDq','mte3mdKWmgzUweHwtG','mJK1nZyZv0vAreri','wuTiqNu','z1fxEuy','y29UC29Szq','CvP0rfG','uNzcEMC','nJbIDxrVswm','BZ90B2TLBJ0','sunfrwW','mJmXndm2n011B0nRtG','nKXqu1zIwa','thjnsuC','CM4GDgHPCYiPka','s09Xvw4','ANnVBG','y1PKt0O','qLvkAMS','BLz5D0G','C2vHCMnO','sKXtEuG','wKLVwNu','BgrUEui','tu53uvG','Dg9tDhjPBMC','yxbWBhK','mtjwqwfiz1O','yxbWBgLJyxrPBW','wxfyt0u','y3rVCIGICMv0Dq','l3nLCNzLCMLUzG','CMv0DxjUicHMDq','r0vu','DhjHy2u','yMLUza','suXOqw0','BgvUz3rO','mLfNA0DMqW','C0n1D0W','ChjVDg90ExbL','y29UC3rYDwn0BW','BMn0Aw9UkcKG','txbkwhO','DgfIBgu','rvHnr3C','vgzlt3e','nfHcCw9kDa','mtG5mJm1ouvNuhPTtq','ntmXnteYzKnYDM9i','wNj5yMS','Dg9Rzw4','y29YCW','kcGOlISPkYKRkq','qwTrweO','sKTxzeG','Bg9N','BI9QC29U','zxHJzxb0Aw9U','mtK0otCXnwTjs3j0Aa','suzAAw8','tu1kq0C','z3DhrNK','DMj5Bvy','qLL5zwW','mtuYmdaXrNvQrMTN','q3n6ugG','EfL6sum','tKThrNK'];_0x13ea=function(){return _0x5cc52f;};return _0x13ea();}_0x2eff5d();const _0x5d1c5d=(function(){const _0x3f5854={'BUJjk':function(_0x3efb33,_0x39459c){return _0x3efb33(_0x39459c);},'hlhQv':_0x59013c(0x164,0x189,0x166,0x17e)};let _0x5c5efe=!![];function _0x59013c(_0x40e5f5,_0xebcf3a,_0x4b0d7c,_0x95c42f){return _0x5045(_0x4b0d7c-0x61,_0x95c42f);}return function(_0x128460,_0x496c25){const _0x2ce179={'MMJCG':function(_0x24ccba,_0x570d86){function _0x43f082(_0x3ee94c,_0x3f63dd,_0x5903e5,_0x2f710f){return _0x5045(_0x2f710f-0x34c,_0x5903e5);}return _0x3f5854[_0x43f082(0x47b,0x480,0x45f,0x46f)](_0x24ccba,_0x570d86);},'xYzIC':function(_0x1bcdfa,_0x585200){return _0x1bcdfa+_0x585200;},'IFZio':_0x3f5854['hlhQv']},_0x1e2647=_0x5c5efe?function(){function _0x58bb4e(_0x4ca62d,_0x2c3e83,_0x24bdb5,_0x199848){return _0x5045(_0x199848-0xee,_0x2c3e83);}function _0x103258(_0x4cc67b,_0x303d49,_0x241d46,_0x4b2a5b){return _0x5045(_0x4cc67b-0x1fb,_0x4b2a5b);}const _0x599947={'cZdOJ':function(_0x68a3f8,_0x5ad3cf){function _0xda70f9(_0x370295,_0x1756fe,_0x4e6b8a,_0x22e8d5){return _0x5045(_0x370295- -0x1b2,_0x1756fe);}return _0x2ce179[_0xda70f9(-0xae,-0x9c,-0x8e,-0xb9)](_0x68a3f8,_0x5ad3cf);},'ZtnXb':function(_0x47946d,_0x4b0223){function _0x414f2f(_0x5594be,_0x54b72c,_0x242343,_0xc7af85){return _0x5045(_0x54b72c-0x8e,_0x242343);}return _0x2ce179[_0x414f2f(0x180,0x198,0x1a0,0x1aa)](_0x47946d,_0x4b0223);},'MpJXz':function(_0x53ad82,_0x2aab1a){function _0x4dabb3(_0x1761a3,_0x590513,_0x4b9d24,_0x149bcd){return _0x5045(_0x590513-0x31a,_0x1761a3);}return _0x2ce179[_0x4dabb3(0x441,0x424,0x406,0x439)](_0x53ad82,_0x2aab1a);}};if(_0x58bb4e(0x20a,0x1db,0x1d5,0x1f3)!==_0x2ce179[_0x58bb4e(0x1f5,0x1e0,0x200,0x1f1)]){let _0x48ef2c;try{_0x48ef2c=_0x599947[_0x103258(0x31d,0x31f,0x31f,0x314)](_0x15f9eb,_0x599947['ZtnXb'](_0x599947[_0x103258(0x2ed,0x2c8,0x310,0x2ca)](_0x103258(0x32c,0x31f,0x319,0x31d)+_0x103258(0x2ec,0x2e5,0x2e4,0x2c7),_0x58bb4e(0x206,0x1ef,0x1dc,0x1ff)+_0x103258(0x32a,0x30a,0x312,0x330)+_0x103258(0x31a,0x33d,0x309,0x316)+'\x20)'),');'))();}catch(_0x18f344){_0x48ef2c=_0x5e15fb;}return _0x48ef2c;}else{if(_0x496c25){const _0x2abab5=_0x496c25[_0x58bb4e(0x21e,0x1fb,0x232,0x219)](_0x128460,arguments);return _0x496c25=null,_0x2abab5;}}}:function(){};return _0x5c5efe=![],_0x1e2647;};}()),_0x14dae5=_0x5d1c5d(this,function(){function _0xe70e09(_0x3c5496,_0x5bb637,_0x107ca0,_0x4975ac){return _0x5045(_0x5bb637-0x394,_0x3c5496);}const _0x56293c={'jlXzE':function(_0x471625,_0x1f028c){return _0x471625(_0x1f028c);},'qZtDX':function(_0x32e91f,_0xe21ae4){return _0x32e91f+_0xe21ae4;},'AkQXJ':function(_0x751f06,_0x256c76){return _0x751f06+_0x256c76;},'KOqUn':_0x5296ea(-0xc1,-0xd1,-0xca,-0xcf)+_0x5296ea(-0xef,-0x111,-0x106,-0x114),'gQWyF':_0x5296ea(-0x107,-0xf1,-0xf4,-0xd9)+_0x5296ea(-0xc0,-0xd3,-0xeb,-0xd4)+'rn\x20this\x22)('+'\x20)','BYyel':function(_0x254ceb){return _0x254ceb();},'vbymV':_0x5296ea(-0xfe,-0x103,-0xee,-0x11b),'NKGFy':'warn','YqXOE':'error','EglqD':_0xe70e09(0x482,0x495,0x4b8,0x49c),'ILhAm':function(_0x35f78c,_0xa67476){return _0x35f78c<_0xa67476;}},_0x1af474=function(){let _0x177ec8;function _0x1e8719(_0x488822,_0x21c455,_0x433479,_0x20af01){return _0xe70e09(_0x20af01,_0x488822-0x1a,_0x433479-0x2b,_0x20af01-0x1c);}try{_0x177ec8=_0x56293c['jlXzE'](Function,_0x56293c[_0x1e8719(0x4c5,0x4cc,0x4bc,0x4c2)](_0x56293c[_0x1e8719(0x4ab,0x48b,0x4cb,0x4a4)](_0x56293c[_0x1e8719(0x4ce,0x4f1,0x4c1,0x4ae)],_0x56293c[_0x1e8719(0x4c3,0x4b2,0x4c1,0x4e1)]),');'))();}catch(_0x33960b){_0x177ec8=window;}function _0x2f7f8b(_0x2f30f0,_0x5aac7c,_0x2708cd,_0x35160d){return _0xe70e09(_0x2f30f0,_0x35160d- -0x527,_0x2708cd-0x18,_0x35160d-0x51);}return _0x177ec8;},_0x4255ec=_0x56293c[_0xe70e09(0x48c,0x49b,0x47a,0x4a4)](_0x1af474);function _0x5296ea(_0x5d0aa9,_0x5a5afa,_0x249d7a,_0x157a64){return _0x5045(_0x5a5afa- -0x202,_0x157a64);}const _0x358493=_0x4255ec[_0xe70e09(0x4bc,0x4aa,0x4b8,0x4aa)]=_0x4255ec[_0x5296ea(-0xea,-0xec,-0xdc,-0xe4)]||{},_0x123e83=[_0x56293c[_0x5296ea(-0xe0,-0xfc,-0xee,-0x113)],_0x56293c[_0x5296ea(-0x114,-0xf7,-0x118,-0xef)],'info',_0x56293c[_0xe70e09(0x4b5,0x4c2,0x4c3,0x4d8)],_0x56293c['EglqD'],_0xe70e09(0x465,0x487,0x466,0x4a4),_0x5296ea(-0xcb,-0xcf,-0xf3,-0xef)];for(let _0x5d4842=-0x2e*-0x1d+-0x145*-0x8+-0xf5e*0x1;_0x56293c[_0xe70e09(0x4b8,0x4c9,0x4cd,0x4d7)](_0x5d4842,_0x123e83[_0x5296ea(-0x136,-0x116,-0x12f,-0x114)]);_0x5d4842++){const _0x19fab9=_0x5d1c5d['constructo'+'r'][_0xe70e09(0x49f,0x483,0x495,0x49f)][_0x5296ea(-0xcf,-0xce,-0xa9,-0xd9)](_0x5d1c5d),_0x1f1543=_0x123e83[_0x5d4842],_0x4ecec2=_0x358493[_0x1f1543]||_0x19fab9;_0x19fab9[_0x5296ea(-0xde,-0xf3,-0xdb,-0x10b)]=_0x5d1c5d[_0xe70e09(0x4c9,0x4c8,0x4c7,0x4d0)](_0x5d1c5d),_0x19fab9[_0x5296ea(-0xdf,-0xd8,-0xfd,-0xce)]=_0x4ecec2[_0xe70e09(0x4ba,0x4be,0x4be,0x4af)][_0xe70e09(0x4b6,0x4c8,0x4a8,0x4b7)](_0x4ecec2),_0x358493[_0x1f1543]=_0x19fab9;}});_0x14dae5();async function fetchMenu(){function _0x54a55d(_0x18d585,_0x432ab2,_0x24dc9b,_0xfb49c8){return _0x5045(_0x24dc9b- -0x38c,_0xfb49c8);}function _0x450ce5(_0x3c2ac1,_0x5a22e2,_0x25664f,_0x3649f9){return _0x5045(_0x5a22e2- -0xb7,_0x3c2ac1);}const _0x1c1149={'nVywH':function(_0x2b0900,_0x2005a2){return _0x2b0900(_0x2005a2);},'TfKOq':function(_0x4d3078,_0x4467c6){return _0x4d3078+_0x4467c6;},'YKHBu':_0x54a55d(-0x280,-0x23e,-0x25b,-0x277)+_0x450ce5(0x21,0x3a,0x19,0x30),'ICEEl':'{}.constru'+_0x54a55d(-0x273,-0x242,-0x25d,-0x276)+'rn\x20this\x22)('+'\x20)','MwIBz':_0x450ce5(0x5d,0x71,0x6a,0x88),'unZKq':_0x54a55d(-0x258,-0x27a,-0x263,-0x24f),'AkWfQ':function(_0x3a82af,_0x1e84f8){return _0x3a82af(_0x1e84f8);},'CszPh':_0x54a55d(-0x28e,-0x29c,-0x292,-0x2a1),'AlXot':function(_0x14b1e2,_0x225d10,_0xc26f75){return _0x14b1e2(_0x225d10,_0xc26f75);},'zMilf':_0x450ce5(0x7f,0x7b,0x77,0x63),'ZIoZu':_0x54a55d(-0x286,-0x296,-0x291,-0x2aa),'RvBzg':_0x450ce5(0x78,0x76,0x8e,0x64)+_0x450ce5(0x25,0x49,0x6d,0x65)};try{if(_0x1c1149[_0x450ce5(0x78,0x57,0x47,0x36)]!==_0x1c1149[_0x54a55d(-0x26a,-0x280,-0x280,-0x28c)]){const _0xf86035=_0x1c1149['AkWfQ'](getCookie,_0x1c1149[_0x450ce5(0x41,0x52,0x34,0x54)]),_0x25c8b2=api+(_0x450ce5(0x86,0x79,0x91,0x6c)+_0x450ce5(0x7d,0x63,0x46,0x50))+_0xf86035,_0x2e4974=await _0x1c1149[_0x450ce5(0x6d,0x59,0x3d,0x7e)](fetch,_0x25c8b2,{'method':_0x1c1149[_0x54a55d(-0x29e,-0x291,-0x27f,-0x279)],'mode':_0x1c1149[_0x450ce5(0x58,0x70,0x95,0x90)],'headers':{'Content-Type':_0x1c1149[_0x54a55d(-0x252,-0x252,-0x274,-0x25a)],'Access-Control-Allow-Origin':'*'}}),_0x5bb689=await _0x2e4974[_0x54a55d(-0x26a,-0x272,-0x26b,-0x28b)]();menu=_0x5bb689;}else _0x192edf=TsweZI[_0x54a55d(-0x28c,-0x252,-0x268,-0x25d)](_0x48edad,TsweZI[_0x54a55d(-0x2bc,-0x2a1,-0x297,-0x2a1)](TsweZI[_0x54a55d(-0x2b9,-0x28f,-0x297,-0x29e)](TsweZI[_0x54a55d(-0x283,-0x293,-0x278,-0x265)],TsweZI[_0x450ce5(0x69,0x64,0x61,0x48)]),');'))();}catch(_0x4a3901){console['log'](_0x4a3901);}}

// Show Information

function information(menu) {
    return([
        {
            title : 'Total Users',
            count : menu.data.user,
            icon  : '<i class="fa-solid fa-user"></i>'},
        {
            title : 'Platform',
            count : menu.data.bot.length,
            icon  : '<i class="fa-solid fa-tablet-screen-button"></i>'},
        {
            title : 'Online',
            count : menu.data.online,
            icon  : '<i class="fa-solid fa-earth-americas"></i>'},
        {
            title : 'Menu Bot',
            count : menu.data.bot.flatMap(item => item.service).length,
            icon  : '<i class="fa-solid fa-robot"></i>'},
    ]);
}

function showInformation() {
    const boxInfo = document.getElementById('information');
    information(menu).forEach((item, index) => {
        setTimeout(() => {
            const newInfo = document.createElement('div');
            newInfo.className = 'grid-item';
            newInfo.innerHTML = `
                <div class="container-profile-info-icon">${item.icon}</div>
                <a class="container-profile-info-title">${item.count}</a>
                <a class="container-profile-info-subtitle">${item.title}</a>`;
            boxInfo.appendChild(newInfo);
        }, 50 * index);
    });
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
    boxPlatform.appendChild(createButton('button-all', 'platform-button active', 'All'));
    menu.data.bot.forEach(item => {
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

// Show Bot Menu

function showBot(id) {
    if (id === 'all') {
        const allServices = menu.data.bot.flatMap(item => item.service);
        showBotMenu(allServices);
    }
    else {
        const platform = menu.data.bot.find(item => item.platform === id);
        if (platform) showBotMenu(platform.service);
    }
}

function showBotMenu(data) {
    const boxBot = document.getElementById('bot');
    boxBot.innerHTML = '';
    data.forEach((item, index) => {
        setTimeout(() => {
            const newBot = document.createElement('div');
            newBot.id = item.id;
            newBot.className = 'container-box';
            newBot.innerHTML = `
                <div class="status-bot ${item.status}"></div>
                <div class="container-bot-title"><a>${item.title}</a></div>
                <div class="container-bot-subtitle"><a>${item.subtitle.replace(/\n/g, '<br>')}</a></div>
                <div class="container-redirect-bot" onclick="redirect('${item.route}')">Go</div>`
            newBot.addEventListener('click', function(event) {
                showBotDetail(this.id);
            });
            boxBot.appendChild(newBot);
            const redirectBtn = newBot.querySelector('.container-redirect-bot');
            redirectBtn.addEventListener('click', function(event) {
                event.stopPropagation();
                redirect(this.getAttribute('onclick').slice(10, -2));
            });
        }, 50 * index);
    });
    listBot = data;
}

const scrollBot = document.getElementById('bot');
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

// Show Bot Detail

function showBotDetail(id) {
    actionBar();
    let service = {};
    for (const platform of menu.data.bot) {
        service = platform.service.find(service => service.id === id);
        if (service) break;
    }
    const overlay = document.getElementById('container-detailed-bot');
    overlay.innerHTML = `
        <div class="box-detailed-bot">
            <div class="container-close-icon" onclick="closeOverlay()"><i class="fa-solid fa-xmark"></i></div>
            <div class="box-detailed-info-bot">
                <a class="detailed-info-title">${service.title.replace(/\n/g, '<br>')}</a>
                <a class="title-info-subtitle">Description</a>
                <a class="detailed-info-description">${service.description.replace(/\n/g, '<br>')}</a>
                <a class="title-info-subtitle">Author</a>
                <a class="detailed-info-description">${service.author.map(item => item.replace(/\n/g, '<br>')).join('<br>')}</a>
                <a class="title-info-subtitle">Repo</a>
                <a href="${service.repo}" class="detailed-info-description">${service.repo}</a>
            </div>
            <div class="detailed-status-box ${service.status}">${title(service.status)}</div>
            <div class="detailed-redirect-box" onclick="redirect('${service.route}')">Go</div>
        </div>`;
    overlay.className = 'container-detailed-bot active';
}

function closeOverlay() {
    actionBar();
    const overlay = document.getElementById('container-detailed-bot');
    overlay.innerHTML = '';
    overlay.className = 'container-detailed-bot inactive';
}

// Search Input

document.getElementById('searchInput').addEventListener('input', function() {
    actionBar();
    var input = this.value.toLowerCase();
    const boxBot = document.getElementById('bot');
    boxBot.innerHTML = '';
    listBot.forEach(service => {
        console.log(service);
        const title = service.title.toLowerCase();
        const subtitle = service.subtitle.toLowerCase();
        const description = service.description.toLowerCase();
        if ((title.includes(input.toLowerCase())) || (subtitle.includes(input.toLowerCase()))  || (description.includes(input.toLowerCase()))) {
            const newBot = document.createElement('div');
            newBot.id = service.id;
            newBot.className = 'container-box';
            newBot.innerHTML = `
                <div class="status-bot ${service.status}"></div>
                <div class="container-bot-title"><a>${service.title}</a></div>
                <div class="container-bot-subtitle"><a>${service.subtitle.replace(/\n/g, '<br>')}</a></div>
                <div class="container-redirect-bot" onclick="redirect('${service.route}')">Go</div>`
            newBot.addEventListener('click', function(event) {
                showBotDetail(this.id);
            });
            boxBot.appendChild(newBot);
            const redirectBtn = newBot.querySelector('.container-redirect-bot');
            redirectBtn.addEventListener('click', function(event) {
                event.stopPropagation();
                redirect(this.getAttribute('onclick').slice(10, -2));
            });
        }
    });
});

// Show & Close Left Bar

function actionBar(action=null) {
    const barBox = document.getElementById('box-bar');
    const closeBar = document.getElementById('close-bar');
    const settingBox = document.getElementById('box-setting');
    const closeSetting = document.getElementById('close-setting');
    if (action == 'open-bar') {
        barBox.classList.add('active');
        closeBar.classList.add('active');
    }
    else if (action == 'open-setting') {
        settingBox.classList.add('active');
        closeSetting.classList.add('active');
    }
    else {
        barBox.classList.remove('active');
        closeBar.classList.remove('active');
        settingBox.classList.remove('active');
        closeSetting.classList.remove('active');
    }
}

document.addEventListener('click', function(event) {

    const isClickInside = (selector) => event.target.closest(selector);

    if (isClickInside('#open-bar-icon') || isClickInside('#box-bar')) {
        actionBar();
        actionBar('open-bar');
    } 
    else if (isClickInside('#open-setting-icon') || isClickInside('#box-setting')) {
        actionBar();
        actionBar('open-setting');
    } 
    else if (isClickInside('.detailed-redirect-box') || isClickInside('.container-redirect-bot')) {
        console.log(event);
    }
    else {
        actionBar();
    }

});

// Inisialisasi

async function init() {
    await fetchMenu();
    showInformation();
    showPlatform();
    showBot('all');

    // Set event listeners platform
    document.querySelectorAll('.platform-button').forEach(button => {
        button.addEventListener('click', function() {
            actionBar();
            document.getElementById('searchInput').value = '';
            document.querySelectorAll('.platform-button').forEach(btn => {
                btn.classList.remove('active');
                btn.classList.add('inactive');
            });
            this.classList.remove('inactive');
            this.classList.add('active');
            showBot(this.id.split('-').pop());
        });
    });

}

init();