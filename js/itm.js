(function(n,w,d){w["itm_dl1_1013169"]=w["itm_dl1_1013169"]||[];var g={};g.cid=1013169;g.load_script=function(url){var e=d.createElement("script");e.type="text/javascript";e.referrerPolicy="no-referrer-when-downgrade";e.async=true;e.src=url;var st=d.getElementsByTagName("script")[0];st.parentNode.insertBefore(e,st);};g.load_gtm=function(gid,data,dl){w[dl].push({"itm.auto_cid":1013169,"itm.auto_im_api_token":"VXoW9wEaCAYxiIkb8Mzm7Q"});if(data){w[dl].push(data);}
w[dl].push({"gtm.start":new Date().getTime(),event:"gtm.js"});g.load_script("https://www.googletagmanager.com/gtm.js?id="+gid+((dl!="dataLayer")?("&l="+dl):""));};g.xhr_get=function(url,on_load,on_error,timeout){var xhr=new XMLHttpRequest();xhr.open("GET",url);xhr.withCredentials=true;xhr.onload=function(){try{var data=JSON.parse(xhr.responseText);on_load(data);}catch(e){if(on_error)on_error(e);}};if(on_error){xhr.onerror=on_error;xhr.ontimeout=on_error;}
if(timeout)xhr.timeout=timeout;xhr.send();};g.get_session=function(k){try{return sessionStorage.getItem(k);}catch(e){return null;}};g.set_session=function(k,v){try{sessionStorage.setItem(k,v);}catch(e){}};g.uid_endpoint="https://sync6.im-apps.net/"+g.cid+"/uid";var gp=n+".c"+g.cid;w[n]=w[n]||{};w[n]["c"+g.cid]=g;g.init=function(data){g.load_gtm("GTM-NM4NTK7",data,"itm_dl1_1013169");};g.uid_key="__itm_uid_"+g.cid;g.time_key="__im_uid_ses_"+g.cid;g.uid=g.get_session(g.uid_key);g.time=parseInt(g.get_session(g.time_key))||0;g.ttl_seconds=1800;g.expired=g.time+g.ttl_seconds*1000<=Date.now();g.xhr_get(g.uid_endpoint,function(data){if(g.expired||!g.uid){g.uid=data.uid;g.set_session(g.uid_key,g.uid);g.set_session(g.time_key,Date.now()+"");}
g.imid=data.imid;g.ehid=data.ehid;g.init({imuid:g.uid,imid:g.imid,ehid:g.ehid});},function(){g.init({});},3000);})("_itm_",window,document);