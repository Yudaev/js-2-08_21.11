!function(t){var e={};function n(o){if(e[o])return e[o].exports;var r=e[o]={i:o,l:!1,exports:{}};return t[o].call(r.exports,r,r.exports,n),r.l=!0,r.exports}n.m=t,n.c=e,n.d=function(t,e,o){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:o})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var o=Object.create(null);if(n.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var r in t)n.d(o,r,function(e){return t[e]}.bind(null,r));return o},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="",n(n.s=2)}([function(t,e){t.exports=require("fs")},function(t,e){t.exports=require("moment")},function(t,e,n){var o=n(0),r=n(1),c=n(3),i=n(4),u=n(5),a=u();n(6);a.use(u.json()),a.use("/",u.static("./public")),a.get(c.query.catalog,(function(t,e){o.readFile("".concat(i.root,"/").concat(i.fname.catalog),"utf-8",(function(t,n){t?(console.log("err "+i.root+"/"+i.fname.catalog),e.sendStatus(404,JSON.stringify({result:0}))):e.send(n)}))}));var s="".concat(i.root,"/").concat(i.fname.basket);a.get(c.query.basket.get,(function(t,e){o.readFile(s,"utf-8",(function(t,n){t?e.sendStatus(404,JSON.stringify({result:0})):e.send(n)}))})),a.post(c.query.basket.add,(function(t,e){o.readFile(s,"utf-8",(function(n,r){if(n)e.sendStatus(404,JSON.stringify({result:0}));else{var c=JSON.parse(r);c.contents.push(t.body),c.countGoods++,c.amount+=t.body.price,o.writeFile(s,JSON.stringify(c,null,2),(function(n){if(n)e.sendStatus(404,JSON.stringify({result:0}));else{var o=i.logEntry(i.logAction.add,t.body.product_name);console.log("-> ".concat(o.time," POST ").concat(o.action," ").concat(o.product_name)),i.logSave(o),e.send({result:1})}}))}}))})),a.delete(c.query.basket.remove,(function(t,e){o.readFile(s,"utf-8",(function(n,r){if(n)e.sendStatus(404,JSON.stringify({result:0}));else{var c=JSON.parse(r);c.contents.splice(c.contents.findIndex((function(e){return e.id_product===t.body.id_product})),1),c.countGoods--,c.amount-=t.body.price,o.writeFile(s,JSON.stringify(c,null,2),(function(n){if(n)e.sendStatus(404,JSON.stringify({result:0}));else{var o=i.logEntry(i.logAction.remove,t.body.product_name);console.log("<- ".concat(o.time," DELETE ").concat(o.action," ").concat(o.product_name)),i.logSave(o),e.send({result:1})}}))}}))})),a.put(c.query.basket.add,(function(t,e){o.readFile(s,"utf-8",(function(n,r){if(n)e.sendStatus(404,JSON.stringify({result:0}));else{var c=JSON.parse(r),u=c.contents.find((function(e){return e.id_product===t.body.id}));u.quantity+=t.body.quantity,c.countGoods+=t.body.quantity,c.amount+=t.body.quantity*u.price,o.writeFile(s,JSON.stringify(c,null,2),(function(t){if(t)e.sendStatus(404,JSON.stringify({result:0}));else{var n=i.logEntry(i.logAction.add,u.product_name);console.log("++-> ".concat(n.time," PUT ").concat(n.action," ").concat(n.product_name)),i.logSave(n),e.send({result:1})}}))}}))})),a.put(c.query.basket.remove,(function(t,e){o.readFile(s,"utf-8",(function(n,r){if(n)e.sendStatus(404,JSON.stringify({result:0}));else{var c=JSON.parse(r),u=c.contents.find((function(e){return e.id_product===t.body.id}));u.quantity-=t.body.quantity,c.countGoods-=t.body.quantity,c.amount-=t.body.quantity*u.price,o.writeFile(s,JSON.stringify(c,null,2),(function(t){if(t)e.sendStatus(404,JSON.stringify({result:0}));else{var n=i.logEntry(i.logAction.remove,u.product_name);console.log("<--- ".concat(n.time," PUT ").concat(n.action," ").concat(n.product_name)),i.logSave(n),e.send({result:1})}}))}}))})),a.listen(c.server.port,(function(){return console.log("[".concat(r().format("DD-MM-YYYY HH:mm:ss"),"] SERVE listening on ").concat(c.server.port," port..."))}))},function(t,e,n){"use strict";n.r(e),n.d(e,"server",(function(){return o})),n.d(e,"query",(function(){return r}));var o={port:3030,url:"http://localhost"},r={catalog:"/catalog",basket:{get:"/basket",add:"/addToBasket",remove:"/removeFromBasket"}}},function(t,e,n){var o=n(0),r=n(1),c="./server/db",i={catalog:"catalog.json",basket:"basket.json",logs:"stats.json"};t.exports={root:c,fname:i,logAction:{add:"add",remove:"remove"},logEntry:function(t,e){return{time:r().format("DD-MM-YYYY HH:mm:ss"),action:t,product_name:e}},logSave:function(t){o.readFile("".concat(c,"/").concat(i.logs),"utf-8",(function(e,n){if(e)console.log("-!!!- log file [".concat(c,"/").concat(i.logs,"] not founded -!!!-"));else{var r=JSON.parse(n);r.push(t),o.writeFile("".concat(c,"/").concat(i.logs),JSON.stringify(r,null,2),(function(t){t&&console.log("-!!!- can't save log file [".concat(c,"/").concat(i.logs,"] -!!!-"))}))}}))}}},function(t,e){t.exports=require("express")},function(t,e){t.exports=require("path")}]);