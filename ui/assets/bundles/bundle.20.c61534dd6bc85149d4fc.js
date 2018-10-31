(window.webpackJsonp=window.webpackJsonp||[]).push([[20],{132:function(t,s,e){"use strict";e.r(s);var a=e(802),n=e(256);for(var i in n)"default"!==i&&function(t){e.d(s,t,function(){return n[t]})}(i);e(720);var o=e(3),r=Object(o.a)(n.default,a.a,a.b,!1,null,"160cd59d",null);r.options.__file="company.vue",s.default=r.exports},144:function(t,s,e){"use strict";e.r(s);var a=e(145),n=e.n(a);for(var i in a)"default"!==i&&function(t){e.d(s,t,function(){return a[t]})}(i);s.default=n.a},145:function(t,s,e){"use strict";Object.defineProperty(s,"__esModule",{value:!0});var a=function(t){return t&&t.__esModule?t:{default:t}}(e(153));s.default={components:{notifications:a.default},computed:{game:function(){return this.$store.state.game.name}},watch:{$route:function(t,s){this.$store.commit("setActiveGame",t.fullPath.split("/")[1])}},beforeCreate:function(){this.$store.commit("setActiveGame",this.$route.fullPath.split("/")[1])},storeModule:{name:"game",state:{name:""},mutations:{setActiveGame:function(t,s){t.name=s}}}}},146:function(t,s,e){},154:function(t,s,e){"use strict";e.r(s);var a=e(168),n=e(144);for(var i in n)"default"!==i&&function(t){e.d(s,t,function(){return n[t]})}(i);e(155);var o=e(3),r=Object(o.a)(n.default,a.a,a.b,!1,null,"18614b12",null);r.options.__file="general.vue",s.default=r.exports},155:function(t,s,e){"use strict";var a=e(146);e.n(a).a},168:function(t,s,e){"use strict";var a=function(){var t=this.$createElement,s=this._self._c||t;return s("nav",{staticClass:"row"},[s("div",{staticClass:"nav-l"},[s("router-link",{attrs:{to:"/warframe",exact:""}},[s("img",{staticClass:"logo ico-h-20",attrs:{src:"/img/brand/nexushub-logo-typeface.svg",alt:"Nexushub Logo"}})])],1),this._v(" "),s("div",{staticClass:"nav-r"},[s("notifications")],1)])},n=[];e.d(s,"a",function(){return a}),e.d(s,"b",function(){return n})},256:function(t,s,e){"use strict";e.r(s);var a=e(257),n=e.n(a);for(var i in a)"default"!==i&&function(t){e.d(s,t,function(){return a[t]})}(i);s.default=n.a},257:function(t,s,e){"use strict";Object.defineProperty(s,"__esModule",{value:!0});var a=l(e(44)),n=l(e(31)),i=l(e(45)),o=l(e(154)),r=l(e(152)),u=l(e(150)),c=l(e(151));function l(t){return t&&t.__esModule?t:{default:t}}var v=function(t){return(1e3*Math.round(t/1e3)).toString().replace(/\B(?=(\d{3})+(?!\d))/g,",")};s.default={components:{navigation:o.default,appContent:r.default,sidebar:u.default,sidebarSearch:c.default},computed:{users:function(){return v(this.$store.state.analytics.users)},views:function(){return v(this.$store.state.analytics.views)},offers:function(){return v(this.$store.state.analytics.offers)}},asyncData:function(){var t=(0,i.default)(a.default.mark(function t(){var s,e,i;return a.default.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return s=void 0,e=void 0,i=void 0,t.next=3,n.default.all([this.$cubic.get("/analytics/v1/ga/users").then(function(t){s=t}),this.$cubic.get("/analytics/v1/ga/views").then(function(t){e=t}),this.$cubic.get("/warframe/v1/analytics/orders").then(function(t){i=t})]);case 3:this.$store.commit("setAnalyticsUsers",s),this.$store.commit("setAnalyticsViews",e),this.$store.commit("setAnalyticsOffers",i);case 6:case"end":return t.stop()}},t,this)}));return function(){return t.apply(this,arguments)}}(),storeModule:{name:"analytics",state:{users:null,views:null},mutations:{setAnalyticsUsers:function(t,s){t.users=s},setAnalyticsViews:function(t,s){t.views=s},setAnalyticsOffers:function(t,s){t.offers=s}}}}},258:function(t,s,e){},720:function(t,s,e){"use strict";var a=e(258);e.n(a).a},802:function(t,s,e){"use strict";var a=function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("div",[e("navigation"),t._v(" "),e("sidebar",[e("sidebar-search")],1),t._v(" "),e("app-content",[e("div",{staticClass:"company"},[e("div",{staticClass:"container"},[e("img",{staticClass:"header-blobs",attrs:{src:"/img/company/header-blobs.svg"}}),t._v(" "),e("div",{staticClass:"box-top"},[e("h1",[t._v("Making Games more transparent with NexusHub.")])]),t._v(" "),e("div",{staticClass:"box-top-sub"}),t._v(" "),e("div",{staticClass:"box-sub"},[e("h2",[t._v("The best decisions in gaming are made on data")]),t._v(" "),e("p",[t._v("\n            Whether it's about buying\n            that item we always wanted, or finding ways to improve our playstyle.\n            NexusHub is about bringing that data to you, regardless if you're a\n            mighty pro gamer or a casual in it for the fun.\n          ")])])])]),t._v(" "),e("div",{staticClass:"who-we-are-container container"},[e("section",{staticClass:"who-we-are"},[e("div",[e("h2",[t._v("Who we are")]),t._v(" "),e("p",[t._v("\n            We're a small group of gamers from all over the world,\n            building NexusHub in our spare time. Starting out as\n            casual players who made a bot to monitor\n            Warframe's trade chat, we have grown into a diverse community of open source\n            developers, persisting in our mission to simply make games more\n            accessible for everyone.\n          ")])])])]),t._v(" "),e("div",{staticClass:"stats-container"},[e("section",[e("div",{staticClass:"stats container"},[e("h2",[t._v("People ❤️ NexusHub")]),t._v(" "),e("p",[t._v("\n            Our platform has been growing continously since day one, so it seems we're doing\n            things right.\n          ")]),t._v(" "),e("div",{staticClass:"row"},[e("div",{staticClass:"col-b"},[e("div",{staticClass:"number"},[t._v("\n                "+t._s(t.users)+"\n              ")]),t._v(" "),e("div",{staticClass:"label"},[t._v("\n                Monthly Users\n              ")])]),t._v(" "),e("div",{staticClass:"col-b"},[e("div",{staticClass:"number"},[t._v("\n                "+t._s(t.views)+"\n              ")]),t._v(" "),e("div",{staticClass:"label"},[t._v("\n                Monthly Page Views\n              ")])]),t._v(" "),e("div",{staticClass:"col-b"},[e("div",{staticClass:"number"},[t._v("\n                "+t._s(t.offers)+"\n              ")]),t._v(" "),e("div",{staticClass:"label"},[t._v("\n                Processed orders each month\n              ")])])])])])]),t._v(" "),e("section",{staticClass:"join"},[e("div",{staticClass:"container"},[e("h2",[t._v("Wanna help us build NexusHub?")]),t._v(" "),e("p",[t._v("\n          NexusHub is entirely developed by community members of the games\n          we support, so if you wanna make some awesome feature for the\n          platform, we'd happily have you join our team.\n        ")]),t._v(" "),e("span",[t._v("Sounds fun to you? Hit us up on Discord!")]),t._v(" "),e("br"),t._v(" "),e("a",{staticClass:"btn",attrs:{href:"https://discord.gg/TCxe6P4",target:"_blank"}},[t._v("Join us on Discord")])])]),t._v(" "),e("div",{staticClass:"cute-fluff"},[e("img",{staticClass:"bottom-blob",attrs:{src:"/img/ui/header-blobs.svg"}}),t._v(" "),e("img",{staticClass:"blobot",attrs:{src:"/img/company/blobot.svg",alt:"Blobot"}})])])],1)},n=[];e.d(s,"a",function(){return a}),e.d(s,"b",function(){return n})}}]);