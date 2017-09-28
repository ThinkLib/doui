"use strict";define(["lib/layer/base","css!./attach"],function(){function t(t,e){var a=new n(t.uploadUrl||ME.uploadUrl);ME.beforeUpload?ME.beforeUpload(Date.now().toString(16)+".jpg",function(s){a.field("file",e).field("token",s.token).field("key",s.key).onEnd(function(e){ME.insert(t.$editor,"![截图]("+s.url+")")}).start()}):a.field("file",e).onEnd(function(e){ME.insert(t.$editor,"![截图]("+e.data.url+")")}).start()}function e(t,e){for(var a,s=0;a=t[s++];)if("image"!==r||/\.(jpg|jpeg|png|gif|bmp|webp|ico)$/.test(a.name))if(a.size>ME.maxSize)e.uploadFile.push({name:a.name,progress:'<span class="red">0%(文件体积过大)</span>',url:""});else{var i=Date.now().toString(16)+a.name.slice(a.name.lastIndexOf(".")),l=e.uploadFile.length,o=new n(e.uploadUrl||ME.uploadUrl);e.uploadFile.push({name:a.name,progress:"0%",url:""}),o.field("file",a),ME.beforeUpload?ME.beforeUpload(i,function(t){o.field("token",t.token).field("key",t.key).onProgress(function(t){e.uploadFile[l].progress=t+"%"}).onEnd(function(a){e.uploadFile[l].url=t.url}).start()}):o.onProgress(function(t){e.uploadFile[l].progress=t+"%"}).onEnd(function(t){e.uploadFile[l].url=t.data.url}).start()}else e.uploadFile.push({name:a.name,progress:'<span class="red">0%(失败,不允许的文件类型)</span>',url:""})}function a(t,e){var a=new XMLHttpRequest,s=t.manageUrl||ME.manageUrl;/\?/.test(s)?s+="&type="+r:s+="?type="+r,s+="&t="+Math.random(),a.open("GET",s,!0),a.onreadystatechange=function(){if(4===this.readyState&&200===this.status&&""!==this.responseText){var t=this.responseText;try{t=JSON.parse(t)}catch(t){}e(t)}else 200!==this.status&&this.responseText&&console.error(this.responseText)},a.send()}function s(t,s){l=!0;var n=yua(t).offset(),i=layer.open({type:7,menubar:!1,shade:!1,fixed:!0,offset:[n.top+37-ME.doc.scrollTop()],tab:2,attach:"",attachAlt:"",uploadFile:[],attachList:[],$switch:function(t){var e=yua.vmodels[i];e.tab=t,3===t&&(e.attachList.clear(),o[r].length?e.attachList=o[r]:a(s,function(t){t&&(o[r]=t.data.list.map(function(t){return t.thumb="image"===r?'<img src="'+t.url+'"/>':'<em class="attac-icon">&#xe603;</em>',t}),e.attachList=t.data.list)}))},$select:yua.noop,$change:yua.noop,$insert:function(t){if(t.url){var e=("image"===r?"!":"")+"["+t.name+"]("+t.url+")";ME.insert(s.$editor,e)}},$confirm:function(){var t=yua.vmodels[i];if(!t.attach||!t.attachAlt)return layer.alert("描述和地址不能为空");var e="!["+t.attachAlt+"]("+t.attach+")";ME.insert(s.$editor,e),t.no()},success:function(t){var a=yua.vmodels[t],s=document.body.querySelector("#meditor-attch");a.no=function(){layer.close(t),l=!1},a.$select=function(){var t=document.createEvent("MouseEvent");t.initEvent("click",!1,!1),s.dispatchEvent(t)},a.$change=function(){e(this.files,a)}},content:c()})}var n=function(t){this.url=t||"",this.init()};n.prototype={init:function(){return this.xhr=new XMLHttpRequest,this.form=new FormData,this},field:function(t,e){if("object"==typeof t)for(var a in t)this.form.append(a,t[a]);else this.form.append(t,e);return this},start:function(){var t=this;this.xhr.open("POST",this.url,!0);Date.now();this.xhr.upload.addEventListener("progress",function(e){if(e.lengthComputable&&t.progress){var a=Math.round(100*e.loaded/e.total);t.progress(a)}},!1),this.xhr.onreadystatechange=function(){if(4===t.xhr.readyState)if(t.xhr.status>=200&&t.xhr.status<205){var e=t.xhr.responseText;try{e=JSON.parse(e)}catch(t){}t.end&&t.end(e)}else console.error(t.xhr)},this.xhr.send(this.form)},onProgress:function(t){return this.progress=t,this},onEnd:function(t){return this.end=t,this}};var i={image:["远程图片","图片管理","图片描述","图片地址"],file:["远程附件","附件管理","附件描述","附件地址"]},l=!1,r="image",o={image:[],file:[]},c=function(){return'<div class="do-meditor-attach meditor-font"><dl class="attach-wrap"><dt class="tab-box" :drag="do-layer" data-limit="window"><span class="item" :class="active:tab === 1" :click="$switch(1)">'+i[r][0]+'</span><span class="item" :class="active:tab === 2" :click="$switch(2)">本地上传</span><span class="item" :class="active:tab === 3" :click="$switch(3)">'+i[r][1]+'</span><a href="javascript:;" :click="no" class="action-close def-font"></a></dt><dt class="cont-box"><div class="remote" :visible="tab === 1"><section class="section"><span class="label">'+i[r][2]+'</span><input class="input" :duplex="attachAlt" /></section><section class="section"><span class="label">'+i[r][3]+'</span><input class="input" :duplex="attach" /></section><section class="section"><a href="javascript:;" class="submit" :click="$confirm">确定</a></section></div><div class="local" :visible="tab === 2"><div class="select-file"><input id="meditor-attch" multiple :change="$change" type="file" class="hide" /><span class="file" :click="$select">选择文件</span><span class="tips">(上传大小限制:单文件最大'+(ME.maxSize/1048576).toFixed(2)+'MB)</span></div><ul class="upload-box"><li class="tr thead"><span class="td name">文件名</span><span class="td progress">上传进度</span><span class="td option">操作</span></li><li class="tr" :repeat="uploadFile"><span class="td name" :text="el.name"></span><span class="td progress" :html="el.progress"></span><span class="td option"><a href="javascript:;" :click="$insert(el)">插入</a></span></li></ul></div><ul class="manager" :visible="tab === 3"><li class="item" :repeat="attachList" :click="$insert(el)"><span class="thumb" :html="el.thumb"></span><p class="name" :attr-title="el.name" :text="el.name"></p></li></ul></dt></dl></div>'};return ME.addon.image=function(t,e){l||(r="image",s(t,e))},ME.addon.file=function(t,e){l||(r="file",s(t,e))},function(e){e.uploadUrl||ME.uploadUrl||console.error("使用附件上传,必须先设置uploadUrl;\n可以给vm增加uploadUrl属性,也可以通过ME.uploadUrl设置"),e.manageUrl||ME.manageUrl||console.error("使用附件管理功能,必须先设置manageUrl;\n可以给vm增加manageUrl属性,也可以通过ME.manageUrl设置"),ME.maxSize||(ME.maxSize=4194304),e.$editor.addEventListener("paste",function(a){var s=a.clipboardData.getData("text/plain").trim(),n=a.clipboardData.getData("text/html").trim();if(!s&&!n){if(a.clipboardData.items){for(var i,l=a.clipboardData.items,r=(l.length,null),o=0;i=l[o++];)i.type.indexOf("image")>-1&&(r=i.getAsFile());if(null!==r){layer.msg("截图处理中...");var c=new FileReader;c.onload=function(){var a=document.createElement("img"),s=document.createElement("canvas");a.onload=function(){s.width=a.width,s.height=a.height;var n=s.getContext("2d");if(n.clearRect(0,0,s.width,s.height),n.drawImage(this,0,0,s.width,s.height),s.toBlob)s.toBlob(function(a){t(e,a)},"image/jpeg",.8);else{for(var i=s.toDataURL("image/jpeg",.8),l=atob(i.split(",")[1]),r=new ArrayBuffer(l.length),o=new Uint8Array(r),c=null,p=0;p<l.length;p++)o[p]=l.charCodeAt(p);c=new Blob([o],{type:"image/jpeg"}),t(e,c)}},a.src=this.result},c.readAsDataURL(r)}}a.preventDefault()}})}});