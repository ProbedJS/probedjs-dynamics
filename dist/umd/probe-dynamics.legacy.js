/**
 * Copyright 2021 Francois Chabot
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

!function(n,t){"object"==typeof exports&&"undefined"!=typeof module?t(exports):"function"==typeof define&&define.amd?define(["exports"],t):t((n="undefined"!=typeof globalThis?globalThis:n||self).probeCore={})}(this,(function(n){"use strict";var t=function(n,i){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(n,t){n.__proto__=t}||function(n,t){for(var i in t)Object.prototype.hasOwnProperty.call(t,i)&&(n[i]=t[i])})(n,i)};function i(n,i){if("function"!=typeof i&&null!==i)throw new TypeError("Class extends value "+String(i)+" is not a constructor or null");function u(){this.constructor=n}t(n,i),n.prototype=null===i?Object.create(i):(u.prototype=i.prototype,new u)}var u=function(){},r=function(){function n(n){this.t=[],this.i=n}return Object.defineProperty(n.prototype,"current",{get:function(){return this.i},enumerable:!1,configurable:!0}),n.prototype.set=function(n){var t=this.i!==n;this.i=n,t&&this.notify()},n.prototype.toString=function(){return""+this.i},n.prototype.addListener=function(n){var t=this;this.t.push(n),u((function(){t.removeListener(n)}))},n.prototype.removeListener=function(n){this.t.splice(this.t.indexOf(n),1)},n.prototype.notify=function(){for(var n=this.t.length;n--;)this.t[n](this.i)},n}();r.prototype.u=1;var e=function(n){function t(){return null!==n&&n.apply(this,arguments)||this}return i(t,n),t.prototype.push=function(n){this.i.push(n),this.notify()},t.prototype.map=function(n){var i=function(t){for(var i=[],u=t.length,r=0;r<u;++r)i.push(n(t[r],r,t));return i},u=new t(i(this.current));return this.addListener((function(n){u.i=i(n)})),u},t}(r),o=function(n){function t(){return null!==n&&n.apply(this,arguments)||this}return i(t,n),t.prototype.valueOf=function(){return this.i},t}(r);function f(n){return Array.isArray(n)?new e(n):new o(n)}function c(n){return null!==n&&"object"==typeof n&&!!n.u}n.dynamic=f,n.isDynamic=c,n.listen=function(n,t){c(n)&&n.addListener(t)},n.setContextualCleanupHandler=function(n){u=n},n.transform=function(n,t){if(c(t)){var i=f(n(t.current));return t.addListener((function(t){return i.set(n(t))})),i}return n(t)},n.valType=function(n){return c(n)?typeof n.current:typeof n},Object.defineProperty(n,"__esModule",{value:!0})}));
