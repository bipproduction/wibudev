const a0_0x4804c3=a0_0x3875;(function(_0x540687,_0x28c69d){const _0x113260=a0_0x3875,_0x8412fb=_0x540687();while(!![]){try{const _0x11c7d8=-parseInt(_0x113260(0x15b))/0x1+parseInt(_0x113260(0x14b))/0x2*(-parseInt(_0x113260(0x139))/0x3)+-parseInt(_0x113260(0x14f))/0x4*(-parseInt(_0x113260(0x151))/0x5)+parseInt(_0x113260(0x14a))/0x6+parseInt(_0x113260(0x142))/0x7*(-parseInt(_0x113260(0x160))/0x8)+parseInt(_0x113260(0x147))/0x9*(-parseInt(_0x113260(0x15f))/0xa)+parseInt(_0x113260(0x131))/0xb;if(_0x11c7d8===_0x28c69d)break;else _0x8412fb['push'](_0x8412fb['shift']());}catch(_0x32aa7b){_0x8412fb['push'](_0x8412fb['shift']());}}}(a0_0x5afb,0xce46a));const root=require(a0_0x4804c3(0x166))[a0_0x4804c3(0x141)](a0_0x4804c3(0x133))['toString']()[a0_0x4804c3(0x137)](),{address}=require('ip'),arg=process['argv'][a0_0x4804c3(0x150)](0x2);require(root+'/makuro/node_modules/colors');function a0_0x3875(_0x17e22b,_0x818a41){const _0x551402=a0_0x5afb();return a0_0x3875=function(_0x419f61,_0x1322a8){_0x419f61=_0x419f61-0x12a;let _0x5afb8a=_0x551402[_0x419f61];return _0x5afb8a;},a0_0x3875(_0x17e22b,_0x818a41);}const moment=require(root+a0_0x4804c3(0x167)),_=require(root+a0_0x4804c3(0x15d)),{execSync}=require('child_process'),{box}=require(a0_0x4804c3(0x13d)),columnify=require(a0_0x4804c3(0x14e)),list_menu=[{'arg':a0_0x4804c3(0x15a),'des':'backup\x20database','req':[a0_0x4804c3(0x12d)],'fun':dump},{'arg':a0_0x4804c3(0x144),'des':a0_0x4804c3(0x153),'req':[a0_0x4804c3(0x12d),a0_0x4804c3(0x135)],'fun':restore},{'arg':a0_0x4804c3(0x148),'des':a0_0x4804c3(0x149),'req':[a0_0x4804c3(0x13c),a0_0x4804c3(0x12d)],'fun':sql}];function help(){const _0x15069b=a0_0x4804c3;console[_0x15069b(0x161)](_0x15069b(0x12f)+box(columnify(list_menu[_0x15069b(0x155)](_0x399246=>({..._[_0x15069b(0x15c)](_0x399246,[_0x15069b(0x154)])}))))+'\x0a\x0a');}async function pg(){const _0x409470=a0_0x4804c3,_0x2b2eb5=(function(){let _0x22d7cf=!![];return function(_0x755758,_0x3d8640){const _0x13074f=_0x22d7cf?function(){const _0x5b9049=a0_0x3875;if(_0x3d8640){const _0x44c7c4=_0x3d8640[_0x5b9049(0x165)](_0x755758,arguments);return _0x3d8640=null,_0x44c7c4;}}:function(){};return _0x22d7cf=![],_0x13074f;};}()),_0x4aa45c=_0x2b2eb5(this,function(){const _0x30203e=a0_0x3875;return _0x4aa45c[_0x30203e(0x14d)]()[_0x30203e(0x12a)](_0x30203e(0x15e))[_0x30203e(0x14d)]()['constructor'](_0x4aa45c)['search'](_0x30203e(0x15e));});_0x4aa45c();if(arg[_0x409470(0x13f)]===0x0)return help();const _0x3882ad=list_menu['find'](_0x42c2c9=>_0x42c2c9[_0x409470(0x132)]===arg[0x0]);if(!_0x3882ad)return help();_0x3882ad[_0x409470(0x154)]();}pg();function sql(){const _0x572487=a0_0x4804c3,_0x205e9a={'--db-name':null,'--query':null},_0x4480ef=sub_arg(_[_0x572487(0x138)](_0x205e9a),arg[_0x572487(0x150)](0x1));if(!_0x4480ef)return;try{execSync('psql\x20\x22postgresql://bip:Production_123@localhost:5433/'+_0x4480ef[_0x572487(0x13b)]+_0x572487(0x136)+_0x4480ef[_0x572487(0x164)]+'\x22',{'stdio':_0x572487(0x146)});}catch(_0x58e086){console[_0x572487(0x161)](_0x572487(0x12e)[_0x572487(0x134)]);}}function dump(){const _0x4e607e=a0_0x4804c3,_0x57e996=sub_arg([_0x4e607e(0x13b)],arg['splice'](0x1));if(!_0x57e996)return;const _0x77ba34=moment()[_0x4e607e(0x159)](_0x4e607e(0x158)),_0x309531=_[_0x4e607e(0x152)](0x186a0,0xf4240),_0x249548=_0x57e996[_0x4e607e(0x13b)]+'_'+_0x77ba34+'_'+_0x309531+_0x4e607e(0x157);try{const _0x367ff3=_0x4e607e(0x156)+_0x57e996[_0x4e607e(0x13b)];execSync('pg_dump\x20\x22'+_0x367ff3+_0x4e607e(0x140)+_0x249548),console[_0x4e607e(0x161)]((_0x4e607e(0x12c)+_0x249548)[_0x4e607e(0x168)]);}catch(_0x1782a2){console[_0x4e607e(0x161)](_0x4e607e(0x12e)[_0x4e607e(0x134)]);}}function restore(){const _0x519393=a0_0x4804c3,_0x5dc3f2={'--db-name':null,'--file':null},_0x54baa1=sub_arg(_[_0x519393(0x138)](_0x5dc3f2),arg[_0x519393(0x150)](0x1));if(!_0x54baa1)return;try{const _0x118a84=_0x519393(0x156)+_0x54baa1['--db-name'];execSync(_0x519393(0x163)+_0x118a84+_0x519393(0x13e)+_0x54baa1[_0x519393(0x162)]+'\x22'),console['log'](_0x519393(0x130)[_0x519393(0x168)]);}catch(_0x516c99){console['log'](_0x519393(0x12e)[_0x519393(0x134)]);}}function sub_arg(_0x55f0ce,_0x4e833c){const _0x1dcaa2=a0_0x4804c3,_0x53b901={},_0x3ef0fb=[];for(let _0x462532 in _0x55f0ce){const _0x37fa51=_0x4e833c[_0x1dcaa2(0x145)](_0x15042f=>_0x15042f===_0x55f0ce[_0x462532]);if(_0x37fa51>-0x1){const _0x1d014a=_0x4e833c[_0x37fa51+0x1];_0x1d014a?_0x53b901[_0x4e833c[_0x37fa51]]=_0x1d014a:(_0x53b901[_0x55f0ce[_0x462532]]=null,_0x3ef0fb['push'](_0x55f0ce[_0x462532]));}else _0x53b901[_0x55f0ce[_0x462532]]=null,_0x3ef0fb[_0x1dcaa2(0x12b)](_0x55f0ce[_0x462532]);}if(_0x3ef0fb[_0x1dcaa2(0x13f)]>0x0)return console[_0x1dcaa2(0x161)](_0x1dcaa2(0x13a)+_0x55f0ce[_0x1dcaa2(0x143)]('\x0a')+_0x1dcaa2(0x14c)),null;return _0x53b901;}function a0_0x5afb(){const _0x4e1f12=['\x0a\x0aMAKURO\x20PG\x20APP:\x0aVersion:\x201.0.0\x0a\x0a','SUCCESS','30716389OQIuqI','arg','npm\x20root\x20-g','red','--file\x20[nama\x20file]','\x22\x20-c\x20\x22','trim','keys','46077phiByU','\x0aRequire:\x0a','--db-name','--query\x20[test\x20query]','teeti','\x22\x20-c\x20-v\x20\x22','length','\x22\x20-O\x20-x\x20-F\x20c\x20>\x20','execSync','1476713iOBCYd','join','restore','findIndex','inherit','9PEZxpF','sql','melakukan\x20kegiatan\x20query','7171308thXIMm','202njeGTd','\x0a\x20\x20\x20\x20\x20\x20\x20\x20','toString','columnify','1614376iAapos','splice','5GplcYX','random','restore\x20database','fun','map','postgresql://bip:Production_123@localhost:5433/','.pgdump','YYYY-MM-DD','format','dump','1654128Ooxdtu','omit','/makuro/node_modules/lodash','(((.+)+)+)+$','1299590HXevPM','8eVIzZp','log','--file','pg_restore\x20--no-owner\x20--no-acl\x20--dbname=\x22','--query','apply','child_process','/makuro/node_modules/moment','green','search','push','SUCCESS\x20','--db-name\x20[nama\x20database]','ERROR'];a0_0x5afb=function(){return _0x4e1f12;};return a0_0x5afb();}