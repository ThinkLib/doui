"use strict";define(["yua","lib/drag","css!./skin/def"],function(t){function i(){return"layer-"+ ++c}function e(i){if("string"!=typeof i&&"number"!=typeof i)return console.error(new Error("要关闭的layer实例不存在"));if(/^\$wrap\-/.test(i)||r["$wrap-"+i])try{if(i=(r["$wrap-"+i]?"$wrap-":"")+i,!r[i].show)return;r[i].parentElem.replaceChild(r[i].wrap,s[i][1]),r[i].show=!1}catch(e){}else{try{document.body.removeChild(s[i][1]),document.body.removeChild(s[i][0]),a=null}catch(e){}delete s[i],delete t.vmodels[i]}}function n(t,i){for(var e=0,n="";i>e;)n+=t,e++;return n}function o(t){return t||0===t?t:"auto"}if(window.layer)return window.layer;var s={},r={},a=null,c=0,l={type:1,skin:"def",icon:1,background:"#fff",shade:!0,shadeClose:!1,radius:"0px",area:["auto","auto"],title:"",menubar:!0,content:"",fixed:!1,offset:null,btns:["确定","取消"],yes:e,no:e,success:null},d=function(t){t&&this.ready(t).append().show()},u={alert:function(t,i){return i="function"==typeof i?{yes:i,no:i}:"object"==typeof i?i:{},i.icon=6,i.content=t,u.open(i)},confirm:function(t,i){return i="function"==typeof i?{yes:i}:"object"==typeof i?i:{},i.type=2,i.icon=8,i.content=t,u.open(i)},msg:function(t,i){if("object"!=typeof i){var e=i;i={timeout:2500},"number"==typeof e&&(i.icon=e)}return i.hasOwnProperty("timeout")||(i.timeout=2500),i.specialMode=!0,i.content='<p class="msg-box">'+t+"</p>",i.type=7,i.fixed=!0,i.shade=!1,i.menubar=!1,i.radius="5px",u.open(i)},loading:function(i,e,n){return i>>>=0,"function"==typeof e?(n=e,e=0):(e>>>=0,"function"!=typeof n&&(n=t.noop)),u.open({type:6,load:i,yes:n,timeout:e,menubar:!1,background:"none",fixed:!0})},tips:function(t,i,e){if(!(i instanceof HTMLElement))return console.error(new Error("tips类型必须指定一个目标容器"));if("object"!=typeof e){var n=e;e={timeout:2500},"number"==typeof n&&(e.icon=n)}return e.hasOwnProperty("timeout")||(e.timeout=2500),e.background||(e.background="rgba(0,0,0,.5)"),e.color||(e.color="#fff"),e.$elem=i,e.content=t,e.type=5,e.icon=0,e.fixed=!0,e.shade=!1,e.menubar=!1,u.open(e)},prompt:function(i,e){if("function"!=typeof e)return console.error("argument [callback] requires a function, but "+typeof e+" given");var n={type:3,icon:7,prompt:"",title:i,content:'<input class="prompt-value" :duplex="prompt" />',yes:function(i){e(i,t.vmodels[i].prompt)}};return u.open(n)},use:function(t,i){require(["css!./skin/"+t],i)},close:e,open:function(i){if("string"==typeof i){if(i="$wrap-"+i,r[i])return r[i].show?i:(r[i].show=!0,t.vmodels[i]||t(r[i].obj.init),t.scan(s[i][1]),r[i].obj.show(),r[i].parentElem.appendChild(s[i][1]),r[i].parentElem.replaceChild(s[i][1],r[i].wrap),i);throw new Error("layer实例不存在")}return new d(i).init.$id},version:"0.0.2-base"};return t.ui.layer="0.0.2-base",d.prototype={dot:{0:4,1:9,2:2,3:3,4:2,5:5,6:5,7:5},timeout:null,create:function(){var t=document.createElement("div"),i=document.createElement("div");i.className="do-layer-cover type-"+this.init.type,this.init.shadeClose&&(i.setAttribute(":controller",this.cInit.$id),i.setAttribute(":click","close('"+this.init.$id+"')")),t.className="do-layer skin-"+this.init.skin+(5===this.init.type&&" active"||"")+" type-"+(this.init.specialMode||7!==this.init.type?this.init.type:"unspecial"),t.style.visibility="hidden",t.style.borderRadius=this.init.radius,t.setAttribute(":controller",this.init.$id),this.init.menubar||this.init.fixed||(t.setAttribute(":drag",""),t.setAttribute("data-limit","window"));var e="";return"auto"!==this.init.area[0]&&(e+="width: "+this.init.area[0]+";"),"auto"!==this.init.area[1]&&(e+="height: "+this.init.area[1]+";"),t.innerHTML=this.getMenubar()+'<div class="layer-content do-fn-cl '+(0===this.init.icon&&"none-icon"||"")+'" style="'+e+'">'+this.getCont()+"</div>"+this.getBtns()+(5===this.init.type&&'<i class="arrow" style="border-top-color: '+this.init.background+'"></i>'||""),[this.init.shade?i:null,t]},getCont:function(){return 6===this.init.type?this.getLoading(this.init.load):this.getIcon()+'<div class="detail" :html="content"></div>'},getLoading:function(t){return'<div class="do-ui-load load-style-'+t+'"><span class="dot-box">'+n("<i></i>",this.dot[t])+"</span></div>"},getMenubar:function(){var t="";return this.init.menubar&&(t+='<div class="layer-title do-fn-noselect" ',this.init.fixed||(t+=':drag="do-layer" data-limit="window" '),t+='>{{title}}<a class="action-close deficon" :click="no(\''+this.init.$id+"')\"></a></div>"),t},getIcon:function(){return 0===this.init.icon?"":this.init.type<4||5===this.init.type||this.init.specialMode?'<span class="deficon icon-'+this.init.icon+'"></span>':""},getBtns:function(){if(this.init.type>3)return"";var t='<div class="layer-btns do-fn-noselect">';return t+=this.init.type>1?'<a href="javascript:;" class="action-no" :click="no(\''+this.init.$id+'\')" :text="btns[1]"></a><a href="javascript:;" class="action-yes" :click="yes(\''+this.init.$id+'\')" :text="btns[0]"></a>':'<a href="javascript:;" class="action-yes" :click="yes(\''+this.init.$id+'\')" :text="btns[0]"></a>',t+="</div>"},append:function(){return a&&u.close(a),this.init.type<4&&(a=this.init.$id),s[this.init.$id]=this.create(),s[this.init.$id][0]&&(document.body.appendChild(s[this.init.$id][0]),this.init.shadeClose&&(t(this.cInit),t.scan(s[this.init.$id][0]))),document.body.appendChild(s[this.init.$id][1]),t(this.init),t.scan(s[this.init.$id][1]),this},show:function(){var i=this;setTimeout(function(){var e={visibility:"",background:i.init.background},n=getComputedStyle(s[i.init.$id][1]);if(5===i.init.type){e.color=i.init.color;var r=t(i.init.$elem),a=r.innerWidth(),c=r.offset().left-document.body.scrollLeft,l=r.offset().top-document.body.scrollTop;e.left=c+.7*a,e.top=l-parseInt(n.height)-8}else i.init.offset?(e.top=o(i.init.offset[0]),e.right=o(i.init.offset[1]),e.bottom=o(i.init.offset[2]),e.left=o(i.init.offset[3])):e=t.mix(e,{marginLeft:-parseInt(n.width)/2,marginTop:-parseInt(n.height)/2});t(s[i.init.$id][1]).css(e)},4),this.init.success&&"function"==typeof this.init.success&&this.init.success(this.init.$id),this.init.type>3&&(this.init.timeout>0?(clearTimeout(this.timeout),this.timeout=setTimeout(function(){clearTimeout(i.timeout),u.close(i.init.$id),6===i.init.type&&i.init.yes(i.init.$id)},this.init.timeout)):6===this.init.type&&this.init.yes(this.init.$id))},ready:function(n){return this.init=t.mix({},l,n),this.init.$id||(this.init.$id=i()),this.init.icon>17&&(this.icon.icon=17),4===this.init.type&&(this.icon.type=7),this.cInit={$id:this.init.$id+"-c",close:this.init.shadeClose?e:t.noop},this}},t.directive("layer",{priority:1400,init:function(t){t.param&&"tips"===t.param||(t.param="",t.element.removeAttribute(t.name),t.element.style.display="none")},update:function(i){if(!i)return console.error(new Error(":layer指令格式不正确或无效属性. ["+this.name+'="'+this.expr)+'"]');var e=this,n=Object.assign({},this.element.dataset);if(n.hasOwnProperty("area")&&(n.area=n.area.split(",")),n.hasOwnProperty("offset")&&(n.offset=n.offset.split(",")),n.hasOwnProperty("btns")&&(n.btns=n.btns.split(",")),this.param){if("tips"===this.param){var o=t(this.element),a=o.innerWidth(),c=o.offset().left-document.body.scrollLeft,l=o.offset().top-document.body.scrollTop,u=document.createElement("div"),p=document.createElement("i"),h=document.createElement("div");u.className="do-layer skin-def type-5",u.style.left=c+.7*a+"px",n.background&&(u.style.background=n.background,p.style.borderTopColor=n.background),n.color&&(u.style.color=n.color),h.className="layer-content",h.textContent=i,p.className="arrow",u.appendChild(h),u.appendChild(p),t(document).bind("scroll",function(){c=o.offset().left-document.body.scrollLeft,l=o.offset().top-document.body.scrollTop,u.style.left=c+.7*a+"px",u.style.top=l-u.offsetHeight-8+"px"}),o.bind("mouseenter",function(){e.element.parentNode.appendChild(u),clearTimeout(e.showTime),clearTimeout(e.hideTime),e.showTime=setTimeout(function(){u.style.top=l-u.offsetHeight-8+"px",u.classList.add("active")},4)}),o.bind("mouseleave",function(){e.hideTime=setTimeout(function(){clearTimeout(e.hideTime);try{e.element.parentNode.removeChild(u)}catch(t){}},150)})}}else{n.type=7,n.$id="$wrap-"+i,n.hasOwnProperty("menubar")||(n.menubar=!1);var f=(new d).ready(n),y=this.element.cloneNode(!0);y.style.display="",f.init.content=y.outerHTML,r[f.init.$id]={obj:f,parentElem:this.element.parentNode,wrap:this.element,show:!1},s[f.init.$id]=f.create()}}}),window.layer=u,u});