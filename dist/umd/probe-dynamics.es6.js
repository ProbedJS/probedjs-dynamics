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

!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?e(exports):"function"==typeof define&&define.amd?define(["exports"],e):e((t="undefined"!=typeof globalThis?globalThis:t||self).probeCore={})}(this,(function(t){"use strict";let e=()=>{};class n{constructor(t){this.t=[],this.i=t}get current(){return this.i}set(t){const e=this.i!==t;this.i=t,e&&this.notify()}toString(){return`${this.i}`}addListener(t){this.t.push(t),e((()=>{this.removeListener(t)}))}removeListener(t){this.t.splice(this.t.indexOf(t),1)}notify(){let t=this.t.length;for(;t--;)this.t[t](this.i)}}n.prototype.o=1;class s extends n{push(t){this.i.push(t),this.notify()}map(t){const e=e=>{const n=[],s=e.length;for(let i=0;i<s;++i)n.push(t(e[i],i,e));return n},n=new s(e(this.current));return this.addListener((t=>{n.i=e(t)})),n}}class i extends n{valueOf(){return this.i}}function r(t){return Array.isArray(t)?new s(t):new i(t)}function o(t){return null!==t&&"object"==typeof t&&!!t.o}t.dynamic=r,t.isDynamic=o,t.listen=function(t,e){o(t)&&t.addListener(e)},t.setContextualCleanupHandler=t=>{e=t},t.transform=function(t,e){if(o(e)){const n=r(t(e.current));return e.addListener((e=>n.set(t(e)))),n}return t(e)},t.valType=function(t){return o(t)?typeof t.current:typeof t},Object.defineProperty(t,"__esModule",{value:!0})}));
