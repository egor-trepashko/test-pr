(function(t){function e(e){for(var s,i,o=e[0],r=e[1],c=e[2],d=0,p=[];d<o.length;d++)i=o[d],Object.prototype.hasOwnProperty.call(n,i)&&n[i]&&p.push(n[i][0]),n[i]=0;for(s in r)Object.prototype.hasOwnProperty.call(r,s)&&(t[s]=r[s]);u&&u(e);while(p.length)p.shift()();return l.push.apply(l,c||[]),a()}function a(){for(var t,e=0;e<l.length;e++){for(var a=l[e],s=!0,o=1;o<a.length;o++){var r=a[o];0!==n[r]&&(s=!1)}s&&(l.splice(e--,1),t=i(i.s=a[0]))}return t}var s={},n={app:0},l=[];function i(e){if(s[e])return s[e].exports;var a=s[e]={i:e,l:!1,exports:{}};return t[e].call(a.exports,a,a.exports,i),a.l=!0,a.exports}i.m=t,i.c=s,i.d=function(t,e,a){i.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:a})},i.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},i.t=function(t,e){if(1&e&&(t=i(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var a=Object.create(null);if(i.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var s in t)i.d(a,s,function(e){return t[e]}.bind(null,s));return a},i.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return i.d(e,"a",e),e},i.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},i.p="";var o=window["webpackJsonp"]=window["webpackJsonp"]||[],r=o.push.bind(o);o.push=e,o=o.slice();for(var c=0;c<o.length;c++)e(o[c]);var u=r;l.push([0,"chunk-vendors"]),a()})({0:function(t,e,a){t.exports=a("56d7")},"0c97":function(t,e,a){},1150:function(t,e,a){},"22ad":function(t,e,a){"use strict";a("9afa")},"2d53":function(t,e,a){"use strict";a("0c97")},"56d7":function(t,e,a){"use strict";a.r(e);var s=a("2b0e"),n=function(){var t=this,e=t._self._c;return e("div",{attrs:{id:"app"}},[e("test-component"),e("test-component-vuex")],1)},l=[],i=function(){var t=this,e=t._self._c;return e("div",{staticClass:"wrapper"},[e("div",{staticClass:"container"},[e("div",{staticClass:"row"},[e("label",{staticClass:"column-4"},[e("span",[t._v("цена")]),e("input",{domProps:{value:t.fields.price},on:{input:function(e){return t.handlerInput(e,"price")}}})]),e("label",{staticClass:"column-4"},[e("span",[t._v("кол-во")]),e("input",{domProps:{value:t.fields.amount},on:{input:function(e){return t.handlerInput(e,"amount")}}})]),e("label",{staticClass:"column-4"},[e("span",[t._v("сумма")]),e("input",{domProps:{value:t.fields.qty},on:{input:function(e){return t.handlerInput(e,"qty")}}})]),e("button",{on:{click:t.sendMessage}},[t._v("Send")])]),e("div",{staticClass:"row label-row"},[e("span",{staticClass:"column-4"},[t._v("цена: "+t._s(t.fields.price))]),e("span",{staticClass:"column-4"},[t._v("кол-во: "+t._s(t.fields.amount))]),e("span",{staticClass:"column-4"},[t._v("сумма: "+t._s(t.fields.qty))]),e("span",{staticClass:"column-4"},[t._v("LocalStorage "+t._s(t.DataLocalStorage))])]),e("div",[t._v(" EVENTS "),e("br"),e("div",{staticClass:"log-list"},t._l(t.arrayEventReverse,(function(a,s){return e("div",{key:a+s,staticClass:"log"},[e("span",[t._v(t._s(a))])])})),0)])])])},o=[];a("14d9");function r(t,e){let a=!1;var s;return function(n){function l(e){t(e),a=!0}a?(clearTimeout(s),s=setTimeout(()=>{a=!1,l(n)},e)):(l(n),s=setTimeout(()=>{a=!1},e))}}var c={data(){return{fields:{price:null,amount:null,qty:null},nonce:0,listChangeField:[],actions:{},arrayEvents:[],DataLocalStorage:{}}},computed:{arrayEventReverse(){return[...this.arrayEvents].reverse()}},methods:{calculate(t){let{qty:e,amount:a,price:s}=this.fields,n={price:()=>e/a,amount:()=>e/s,qty:()=>a*s};this.fields[t]=n[t]()},changeInput(t,e){if(this.addEventList("input",e,`Поле ${e} изменено: ${t.target.value}`),this.fields[e]=t.target.value,this.listChangeField=[e,...this.listChangeField.filter(t=>t!==e)],2==this.listChangeField.length){let t=Object.keys(this.fields).find(t=>!this.listChangeField.includes(t));this.calculate(t)}else 3==this.listChangeField.length&&this.calculate(this.listChangeField[2])},handlerInput(t,e){this.actions[e](t,e)},addEventList(t,e,a){this.arrayEvents.push({type:t,key:e,label:a})},async sendLocalStorage(){function t(t){return new Promise(e=>setTimeout(()=>{let a=JSON.stringify(t);t.amount%2==0?(localStorage.setItem("fieldsCalculate",JSON.stringify(a)),e({success:!0})):e({success:!1})},1e3))}this.nonce++;let e={...this.fields,nonce:this.nonce},a=await t(e);this.DataLocalStorage=localStorage.getItem("fieldsCalculate"),this.addEventList("button","save",{sendValue:e,localStorage:this.DataLocalStorage,response:a})},sendMessage(){this.addEventList("button","send",localStorage.getItem("fieldsCalculate")),this.sendLocalStorage()}},mounted(){Object.keys(this.fields).forEach(t=>{this.actions[t]=r(e=>{this.changeInput(e,t)},300)}),this.DataLocalStorage=localStorage.getItem("fieldsCalculate")}},u=c,d=(a("9c5c"),a("2877")),p=Object(d["a"])(u,i,o,!1,null,"5851bc6a",null),f=p.exports,h=function(){var t=this,e=t._self._c;return e("div",{staticClass:"wrapper"},[e("div",{staticClass:"container"},[t._v(" 0 "),e("form-calculate"),t._v(" 1 "),e("form-events")],1)])},v=[],g=function(){var t=this,e=t._self._c;return e("div",[t._v(" 111111111 "),e("div",{staticClass:"row"},[e("label",{staticClass:"column-4"},[e("span",[t._v("цена")]),e("input",{domProps:{value:t.fields.price},on:{input:function(e){return t.handlerInput(e,"price")}}})]),e("label",{staticClass:"column-4"},[e("span",[t._v("кол-во")]),e("input",{domProps:{value:t.fields.amount},on:{input:function(e){return t.handlerInput(e,"amount")}}})]),e("label",{staticClass:"column-4"},[e("span",[t._v("сумма")]),e("input",{domProps:{value:t.fields.qty},on:{input:function(e){return t.handlerInput(e,"qty")}}})]),e("button",{on:{click:t.sendMessage}},[t._v("Send")])]),e("div",{staticClass:"row label-row"},[e("span",{staticClass:"column-4"},[t._v("цена: "+t._s(t.fields.price))]),e("span",{staticClass:"column-4"},[t._v("кол-во: "+t._s(t.fields.amount))]),e("span",{staticClass:"column-4"},[t._v("сумма: "+t._s(t.fields.qty))]),e("span",{staticClass:"column-4"},[t._v("LocalStorage "+t._s(t.DataLocalStorage))])])])},m=[],y=a("2f62");function C(t,e){let a=!1;var s;return function(n){function l(e){t(e),a=!0}a?(clearTimeout(s),s=setTimeout(()=>{a=!1,l(n)},e)):(l(n),s=setTimeout(()=>{a=!1},e))}}var b={data(){return{listChangeField:[],actions:{}}},computed:{...Object(y["b"])(["arrayEventReverse"]),fields(){return this.$store.state.fields},price(){return this.$store.state.fields.price},amount(){return this.$store.state.fields.amount},qty(){return this.$store.state.fields.qty},DataLocalStorage(){return this.$store.state.DataLocalStorage}},methods:{calculate(t){let{qty:e,amount:a,price:s}=this.fields,n={price:()=>e/a,amount:()=>e/s,qty:()=>a*s};this.$store.dispatch("changeFieldCalculate",{field:t,value:n[t]()})},changeInput(t,e){if(this.addEventList("input",e,`Поле ${e} изменено: ${t.target.value}`),this.$store.dispatch("changeFieldCalculate",{field:e,value:t.target.value}),this.listChangeField=[e,...this.listChangeField.filter(t=>t!==e)],2==this.listChangeField.length){let t=Object.keys(this.fields).find(t=>!this.listChangeField.includes(t));this.calculate(t)}else 3==this.listChangeField.length&&this.calculate(this.listChangeField[2])},handlerInput(t,e){this.actions[e](t,e)},addEventList(t,e,a){this.$store.dispatch("addEvents",{type:t,key:e,label:a})},sendMessage(){this.addEventList("button","send",localStorage.getItem("fieldsCalculate")),this.$store.dispatch("sendLocalStorage")}},mounted(){Object.keys(this.fields).forEach(t=>{this.actions[t]=C(e=>{this.changeInput(e,t)},300)}),this.$store.dispatch("getLocalStorage")}},_=b,S=(a("2d53"),Object(d["a"])(_,g,m,!1,null,"c3add720",null)),E=S.exports,L=function(){var t=this,e=t._self._c;return e("div",[t._v(" EVENTS "),e("br"),e("div",{staticClass:"log-list"},t._l(t.arrayEventReverse,(function(a,s){return e("div",{key:a+s,staticClass:"log"},[e("span",[t._v(t._s(a))])])})),0)])},O=[],w={computed:{...Object(y["b"])(["arrayEventReverse"])}},F=w,j=(a("f154"),Object(d["a"])(F,L,O,!1,null,"35594d99",null)),I=j.exports,P={components:{FormCalculate:E,FormEvents:I}},T=P,$=(a("22ad"),Object(d["a"])(T,h,v,!1,null,"2b037a65",null)),k=$.exports,q={name:"App",components:{TestComponent:f,TestComponentVuex:k}},x=q,D=(a("92f1"),Object(d["a"])(x,n,l,!1,null,null,null)),M=D.exports;s["a"].use(y["a"]);var N=new y["a"].Store({state:{fields:{price:null,amount:null,qty:null},arrayEvents:[],nonce:0,dataLocalStorage:""},getters:{arrayEventReverse(t){return[...t.arrayEvents].reverse()}},mutations:{addEvents(t,e){t.arrayEvents.push(e)},changeFieldCalculate(t,{value:e,field:a}){t.fields[a]=e},changeNonce(t,e){t.nonce=e},saveLocalStorage(t,e){t.dataLocalStorage=e}},actions:{changeFieldCalculate({commit:t},{value:e,field:a}){t("changeFieldCalculate",{value:e,field:a})},addEvents({commit:t},e){t("addEvents",e)},getLocalStorage({commit:t}){t("saveLocalStorage",localStorage.getItem("fieldsCalculate"))},async sendLocalStorage({state:t,commit:e,dispatch:a}){function s(t){return new Promise(e=>setTimeout(()=>{let a=JSON.stringify(t);t.amount%2==0?(localStorage.setItem("fieldsCalculate",JSON.stringify(a)),e({success:!0})):e({success:!1})},1e3))}e("changeNonce",t.nonce+1);let n={...this.fields,nonce:this.nonce},l=await s(n);a("getLocalStorage"),a("addEvents",{type:"button",key:"save",label:{sendValue:n,localStorage:this.DataLocalStorage,response:l}})}},modules:{}});s["a"].config.productionTip=!1,new s["a"]({store:N,render:t=>t(M)}).$mount("#app")},"92f1":function(t,e,a){"use strict";a("ef74")},"9afa":function(t,e,a){},"9c5c":function(t,e,a){"use strict";a("1150")},c017:function(t,e,a){},ef74:function(t,e,a){},f154:function(t,e,a){"use strict";a("c017")}});
//# sourceMappingURL=app.7b1e4f81.js.map