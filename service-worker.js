"use strict";var precacheConfig=[["/super-approach/index.html","5bc3fb1d46ad3eb59af483fffef02de1"],["/super-approach/static/css/main.2e357bef.css","86e91a85b993c68086ccbf5e1481009d"],["/super-approach/static/js/main.3ea90c11.js","09c3b54afcfe14a23fb66b1ec89884db"],["/super-approach/static/media/bg.399cb835.png","399cb835b62fa6b4a40cecc39b015a36"],["/super-approach/static/media/camera.27a1e9cc.png","27a1e9cc8a62ca3b90d6ad0a740a796c"],["/super-approach/static/media/car_button.97b44818.svg","97b44818582b2cd826ee928f2b4507d9"],["/super-approach/static/media/car_icon.a13cdb53.svg","a13cdb530651dcca6f00930a98192f2f"],["/super-approach/static/media/dump_button.d56f68e7.svg","d56f68e7dd747a230b8fa02fbc1c9faf"],["/super-approach/static/media/dump_icon.caf0eba6.svg","caf0eba6776bf9a61ca83083c385e9ea"],["/super-approach/static/media/life_button.cb51141b.svg","cb51141b0c8604d92b16d40121e3cd83"],["/super-approach/static/media/life_icon.2809ebe1.svg","2809ebe1f3baf40193a94da9cd380cad"],["/super-approach/static/media/owl.9b3f4b27.svg","9b3f4b275551bc6aed027dfc768e4b8e"],["/super-approach/static/media/snow_button.b3f903d2.svg","b3f903d2e4b55e3c062cb30b975dac1a"],["/super-approach/static/media/snow_icon.142464ad.svg","142464adb0cef28c45b5f465c308bb64"],["/super-approach/static/media/splash.cd241900.gif","cd241900d1c0099c36a60a355d5d7f7e"],["/super-approach/static/media/traffic_button.5e3a4a78.svg","5e3a4a78cfe8f539b3c1a2838cb4e52c"],["/super-approach/static/media/traffic_icon.b0dbca7c.svg","b0dbca7cd5a938123cd48376c32c2964"],["/super-approach/static/media/tree_button.2412ed9c.svg","2412ed9c5f97e770fc30dc1c25dbd4f0"],["/super-approach/static/media/tree_icon.f4166ac5.svg","f4166ac53028805a3d3d9c90a5e4aac0"]],cacheName="sw-precache-v3-sw-precache-webpack-plugin-"+(self.registration?self.registration.scope:""),ignoreUrlParametersMatching=[/^utm_/],addDirectoryIndex=function(e,a){var t=new URL(e);return"/"===t.pathname.slice(-1)&&(t.pathname+=a),t.toString()},cleanResponse=function(e){return e.redirected?("body"in e?Promise.resolve(e.body):e.blob()).then(function(a){return new Response(a,{headers:e.headers,status:e.status,statusText:e.statusText})}):Promise.resolve(e)},createCacheKey=function(e,a,t,c){var r=new URL(e);return c&&r.pathname.match(c)||(r.search+=(r.search?"&":"")+encodeURIComponent(a)+"="+encodeURIComponent(t)),r.toString()},isPathWhitelisted=function(e,a){if(0===e.length)return!0;var t=new URL(a).pathname;return e.some(function(e){return t.match(e)})},stripIgnoredUrlParameters=function(e,a){var t=new URL(e);return t.hash="",t.search=t.search.slice(1).split("&").map(function(e){return e.split("=")}).filter(function(e){return a.every(function(a){return!a.test(e[0])})}).map(function(e){return e.join("=")}).join("&"),t.toString()},hashParamName="_sw-precache",urlsToCacheKeys=new Map(precacheConfig.map(function(e){var a=e[0],t=e[1],c=new URL(a,self.location),r=createCacheKey(c,hashParamName,t,/\.\w{8}\./);return[c.toString(),r]}));function setOfCachedUrls(e){return e.keys().then(function(e){return e.map(function(e){return e.url})}).then(function(e){return new Set(e)})}self.addEventListener("install",function(e){e.waitUntil(caches.open(cacheName).then(function(e){return setOfCachedUrls(e).then(function(a){return Promise.all(Array.from(urlsToCacheKeys.values()).map(function(t){if(!a.has(t)){var c=new Request(t,{credentials:"same-origin"});return fetch(c).then(function(a){if(!a.ok)throw new Error("Request for "+t+" returned a response with status "+a.status);return cleanResponse(a).then(function(a){return e.put(t,a)})})}}))})}).then(function(){return self.skipWaiting()}))}),self.addEventListener("activate",function(e){var a=new Set(urlsToCacheKeys.values());e.waitUntil(caches.open(cacheName).then(function(e){return e.keys().then(function(t){return Promise.all(t.map(function(t){if(!a.has(t.url))return e.delete(t)}))})}).then(function(){return self.clients.claim()}))}),self.addEventListener("fetch",function(e){if("GET"===e.request.method){var a,t=stripIgnoredUrlParameters(e.request.url,ignoreUrlParametersMatching),c="index.html";(a=urlsToCacheKeys.has(t))||(t=addDirectoryIndex(t,c),a=urlsToCacheKeys.has(t));var r="/super-approach/index.html";!a&&"navigate"===e.request.mode&&isPathWhitelisted(["^(?!\\/__).*"],e.request.url)&&(t=new URL(r,self.location).toString(),a=urlsToCacheKeys.has(t)),a&&e.respondWith(caches.open(cacheName).then(function(e){return e.match(urlsToCacheKeys.get(t)).then(function(e){if(e)return e;throw Error("The cached response that was expected is missing.")})}).catch(function(a){return console.warn('Couldn\'t serve response for "%s" from cache: %O',e.request.url,a),fetch(e.request)}))}});