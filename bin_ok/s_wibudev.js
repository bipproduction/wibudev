const a0_0x210ed3=a0_0x2add;(function(_0x1384d9,_0x567e5d){const _0x63c6fc=a0_0x2add,_0x5f0371=_0x1384d9();while(!![]){try{const _0x3ef511=-parseInt(_0x63c6fc(0x112))/0x1+parseInt(_0x63c6fc(0xf7))/0x2+parseInt(_0x63c6fc(0x11a))/0x3+-parseInt(_0x63c6fc(0x10c))/0x4*(parseInt(_0x63c6fc(0x11d))/0x5)+parseInt(_0x63c6fc(0x11e))/0x6+-parseInt(_0x63c6fc(0xf0))/0x7*(parseInt(_0x63c6fc(0xf5))/0x8)+parseInt(_0x63c6fc(0xfb))/0x9;if(_0x3ef511===_0x567e5d)break;else _0x5f0371['push'](_0x5f0371['shift']());}catch(_0x57c128){_0x5f0371['push'](_0x5f0371['shift']());}}}(a0_0x5da2,0x8f0c9));const root=require('child_process')['execSync'](a0_0x210ed3(0x101))['toString']()[a0_0x210ed3(0x114)](),arg=process[a0_0x210ed3(0x104)][a0_0x210ed3(0x126)](0x2),_=require(root+'/lodash');require(root+a0_0x210ed3(0x119));const {execSync}=require(a0_0x210ed3(0xeb)),host_name=execSync(a0_0x210ed3(0x109))[a0_0x210ed3(0xea)]()[a0_0x210ed3(0x114)](),path=require(a0_0x210ed3(0x11b)),list_menu=[{'id':a0_0x210ed3(0x107),'arg':a0_0x210ed3(0x106),'des':a0_0x210ed3(0x10f),'fun':server_available},{'id':a0_0x210ed3(0x127),'arg':a0_0x210ed3(0x127),'des':'create\x20new\x20server\x20app','fun':create_server_app}];function a0_0x2add(_0x8b5219,_0x450578){const _0x24d614=a0_0x5da2();return a0_0x2add=function(_0x465ed7,_0x2b2bc2){_0x465ed7=_0x465ed7-0xea;let _0x5da2eb=_0x24d614[_0x465ed7];return _0x5da2eb;},a0_0x2add(_0x8b5219,_0x450578);}function help(){const _0x431d98=a0_0x210ed3;console[_0x431d98(0xf2)]((_0x431d98(0x100)+list_menu[_0x431d98(0xed)](_0x4847b8=>_0x4847b8[_0x431d98(0x118)]+'\x09'+_0x4847b8[_0x431d98(0xec)])[_0x431d98(0x11c)]('\x0a')+_0x431d98(0x116))[_0x431d98(0xff)]);}async function server_app(){const _0x442630=a0_0x210ed3,_0x242f2b=(function(){let _0x4ac66c=!![];return function(_0x40e0bd,_0x21d75a){const _0x54f48f=_0x4ac66c?function(){const _0x2c7763=a0_0x2add;if(_0x21d75a){const _0x1b0180=_0x21d75a[_0x2c7763(0x108)](_0x40e0bd,arguments);return _0x21d75a=null,_0x1b0180;}}:function(){};return _0x4ac66c=![],_0x54f48f;};}()),_0x206f13=_0x242f2b(this,function(){const _0x2935ba=a0_0x2add;return _0x206f13['toString']()['search'](_0x2935ba(0xef))[_0x2935ba(0xea)]()[_0x2935ba(0xf1)](_0x206f13)[_0x2935ba(0x121)](_0x2935ba(0xef));});_0x206f13();if(host_name!==_0x442630(0x10d))return console[_0x442630(0xf2)](_0x442630(0x110)[_0x442630(0xfa)]);if(_[_0x442630(0x123)](arg))return help();const _0x25ae3f=list_menu['find'](_0xb8a347=>_0xb8a347[_0x442630(0x118)]===arg[0x0]);if(!_0x25ae3f)return help();_0x25ae3f['fun']();}server_app();function create_server_app(){const _0x11e8b0=a0_0x210ed3,_0x194c73=JSON['parse'](execSync('curl\x20-s\x20-o-\x20https://wibudev.wibudev.com/assets/config.json')[_0x11e8b0(0xea)]()[_0x11e8b0(0x114)]()),_0x7b3809={[_0x11e8b0(0x11f)]:null,[_0x11e8b0(0xfe)]:null,[_0x11e8b0(0x113)]:null},_0x59d855=host_name===_0x194c73[_0x11e8b0(0x122)][_0x11e8b0(0x120)]?_0x194c73[_0x11e8b0(0x105)]['prod'][_0x11e8b0(0xf6)]+_0x11e8b0(0x10a)+_0x194c73[_0x11e8b0(0x105)]['prod'][_0x11e8b0(0x102)]+_0x11e8b0(0xf8):_0x194c73[_0x11e8b0(0x105)][_0x11e8b0(0xfc)]['protocol']+_0x11e8b0(0x10a)+_0x194c73['env']['dev'][_0x11e8b0(0x102)]+':'+_0x194c73['env'][_0x11e8b0(0xfc)][_0x11e8b0(0x10e)]+_0x11e8b0(0x117),_0x17bec7=execSync(_0x11e8b0(0xf3)+_0x59d855)[_0x11e8b0(0xea)]()[_0x11e8b0(0x114)]();eval(_0x17bec7);const _0x4631b7=sub_arg(_[_0x11e8b0(0x115)](_0x7b3809),arg);if(!_0x4631b7)return;const _0x44693d='\x0aserver\x20{\x0a\x09server_name\x20'+_0x4631b7[_0x11e8b0(0x11f)]+';\x0a\x0a\x09location\x20/\x20{\x0a\x09\x09proxy_pass\x20http://localhost:'+_0x4631b7[_0x11e8b0(0xfe)]+_0x11e8b0(0xee),_0x14692d=path[_0x11e8b0(0x11c)](__dirname,'/etc/nginx/sites-enabled/'+_0x4631b7[_0x11e8b0(0x113)]+'_'+_0x4631b7['--port']);execSync(_0x11e8b0(0x10b)+_0x44693d+_0x11e8b0(0xfd)+_0x14692d,{'stdio':_0x11e8b0(0x103)}),console['log'](_0x11e8b0(0x125)['green']);}function a0_0x5da2(){const _0x9b407a=['splice','crt','toString','child_process','des','map',';\x0a\x09\x09proxy_http_version\x201.1;\x0a\x09\x09proxy_set_header\x20Upgrade\x20$http_upgrade;\x0a\x09\x09proxy_set_header\x20Connection\x20\x27upgrade\x27;\x0a\x09\x09proxy_set_header\x20Host\x20$host;\x0a\x09\x09proxy_cache_bypass\x20$http_upgrade;\x0a\x09}\x0a}\x0a','(((.+)+)+)+$','7KMUoPw','constructor','log','curl\x20-s\x20-o-\x20','MAX\x20PORT:\x20','7651792ygCxXc','protocol','1074410fjKVSp','/assets/sub_arg.js','maxBy','yellow','8419680ZFAIOW','dev','\x22\x20>\x20','--port','cyan','\x0a\x0aWIBUDEV:\x0aversion:\x201.0.0\x0a--------------\x0a','npm\x20root\x20-g','host','inherit','argv','env','ser-ava','server_available','apply','hostname','://','sudo\x20echo\x20\x22','1749860pPIvFQ','srv442857','port','menampilkan\x20list\x20server','\x0a\x20\x20\x20\x20app\x20ini\x20hanya\x20bisa\x20berjalan\x20di\x20server\x0a\x20\x20\x20\x20','ls\x20/etc/nginx/sites-enabled','139327CqKrCa','--app-name','trim','keys','\x0a\x20\x20\x20\x20\x0a\x20\x20\x20\x20','/assets/sub-arg','arg','/colors','11400TNcHey','path','join','5WnSOHI','3856020DnkuXs','--server-name','host_name','search','server','isEmpty','split','SUCCESS'];a0_0x5da2=function(){return _0x9b407a;};return a0_0x5da2();}function server_available(){const _0x3c2cdc=a0_0x210ed3;try{const _0x8ab490=execSync(_0x3c2cdc(0x111))[_0x3c2cdc(0xea)]()[_0x3c2cdc(0x114)](),_0x5a0807=_0x8ab490[_0x3c2cdc(0x124)]('\x0a')[_0x3c2cdc(0xed)](_0x22c68c=>({'name':_0x22c68c,'port':+_0x22c68c[_0x3c2cdc(0x124)]('_')[0x1]}));console['table'](_0x5a0807),console[_0x3c2cdc(0xf2)](_0x3c2cdc(0xf4),_[_0x3c2cdc(0xf9)](_0x5a0807,_0x5a3999=>_0x5a3999[_0x3c2cdc(0x10e)]));}catch(_0x148490){console[_0x3c2cdc(0xf2)];}}