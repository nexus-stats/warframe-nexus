(window.webpackJsonp=window.webpackJsonp||[]).push([[17],{138:function(t,e,n){"use strict";n.r(e);var a=n(795),i=n(276);for(var r in i)"default"!==r&&function(t){n.d(e,t,function(){return i[t]})}(r);n(726);var s=n(3),u=Object(s.a)(i.default,a.a,a.b,!1,null,"736e0d05",null);u.options.__file="imprint.vue",e.default=u.exports},144:function(t,e,n){"use strict";n.r(e);var a=n(145),i=n.n(a);for(var r in a)"default"!==r&&function(t){n.d(e,t,function(){return a[t]})}(r);e.default=i.a},145:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=function(t){return t&&t.__esModule?t:{default:t}}(n(153));e.default={components:{notifications:a.default},computed:{game:function(){return this.$store.state.game.name}},watch:{$route:function(t,e){this.$store.commit("setActiveGame",t.fullPath.split("/")[1])}},beforeCreate:function(){this.$store.commit("setActiveGame",this.$route.fullPath.split("/")[1])},storeModule:{name:"game",state:{name:""},mutations:{setActiveGame:function(t,e){t.name=e}}}}},146:function(t,e,n){},147:function(t,e,n){},154:function(t,e,n){"use strict";n.r(e);var a=n(168),i=n(144);for(var r in i)"default"!==r&&function(t){n.d(e,t,function(){return i[t]})}(r);n(155);var s=n(3),u=Object(s.a)(i.default,a.a,a.b,!1,null,"18614b12",null);u.options.__file="general.vue",e.default=u.exports},155:function(t,e,n){"use strict";var a=n(146);n.n(a).a},168:function(t,e,n){"use strict";var a=function(){var t=this.$createElement,e=this._self._c||t;return e("nav",{staticClass:"row"},[e("div",{staticClass:"nav-l"},[e("router-link",{attrs:{to:"/warframe",exact:""}},[e("img",{staticClass:"logo ico-h-20",attrs:{src:"/img/brand/nexushub-logo-typeface.svg",alt:"Nexushub Logo"}})])],1),this._v(" "),e("div",{staticClass:"nav-r"},[e("notifications")],1)])},i=[];n.d(e,"a",function(){return a}),n.d(e,"b",function(){return i})},170:function(t,e,n){"use strict";var a=n(147);n.n(a).a},171:function(t,e,n){"use strict";n.r(e);n(170);var a=n(3),i=Object(a.a)({},function(){var t=this.$createElement,e=this._self._c||t;return e("header",[e("img",{staticClass:"blobs",attrs:{src:"/img/ui/header-blobs-outline.svg"}}),this._v(" "),this._m(0),this._v(" "),e("div",{staticClass:"container"},[this._t("default")],2),this._v(" "),this._t("sub")],2)},[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"background-container"},[e("div",{staticClass:"background"})])}],!1,null,"2eba4017",null);i.options.__file="header.vue";e.default=i.exports},276:function(t,e,n){"use strict";n.r(e);var a=n(277),i=n.n(a);for(var r in a)"default"!==r&&function(t){n.d(e,t,function(){return a[t]})}(r);e.default=i.a},277:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=o(n(154)),i=o(n(152)),r=o(n(150)),s=o(n(151)),u=o(n(171));function o(t){return t&&t.__esModule?t:{default:t}}e.default={components:{navigation:a.default,appContent:i.default,sidebar:r.default,sidebarSearch:s.default,uiHeader:u.default}}},278:function(t,e,n){},726:function(t,e,n){"use strict";var a=n(278);n.n(a).a},795:function(t,e,n){"use strict";var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("navigation"),t._v(" "),n("sidebar",[n("sidebar-search")],1),t._v(" "),n("app-content",[n("ui-header",[n("h1",[t._v("Imprint")]),t._v(" "),n("p",[t._v("\n        Huge shoutouts to the German government for legally requiring me to dox myself!"),n("br"),t._v("\n        Seriously, what is wrong with you Germany?\n      ")])]),t._v(" "),n("div",{staticClass:"container"},[n("section",[n("h2",[t._v("NexusHub")]),t._v(" "),n("p",{staticClass:"data"},[t._v("\n          Kilian Volb "),n("br"),t._v("\n          Schillerstr. 13 "),n("br"),t._v("\n          66497, Contwig "),n("br"),t._v("\n          Germany\n        ")]),t._v(" "),n("p",[t._v("I'd appreciate if you don't send me poop to this address. Thank you.")]),t._v(" "),n("router-link",{attrs:{to:"/contact"}},[n("button",[t._v("Contact")])])],1)])],1)],1)},i=[];n.d(e,"a",function(){return a}),n.d(e,"b",function(){return i})}}]);