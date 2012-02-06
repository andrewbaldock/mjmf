function DevSlide(a,c,b,d){Sfdc.Perf.mark("DevSlide");this.slide=document.createElement("DIV");this.slide.id="devSlide";document.body.appendChild(this.slide);var e=document.createElement("DIV");e.className="handle";this.slide.appendChild(e);e.innerHTML=a;a=document.createElement("DIV");a.className="slideContainer";this.slide.appendChild(a);var f=document.createElement("DIV");f.className="header";var g=document.createElement("A");g.href=d;g.title=LC.getLabel("Tab_Home","setup");document.createElement("A");
f.appendChild(g);a.appendChild(f);g.innerHTML=c;f.innerHTML+=b;this.slideBody=document.createElement("DIV");this.slideBody.className="slideBody";a.appendChild(this.slideBody);this.shim=new iframeShim(this.slideBody);b=document.createElement("DIV");b.className="footer";a.appendChild(b);c=document.createElement("A");c.href="#";c.appendChild(document.createTextNode(LC.getLabel("devContextMenu","turnOff")));b.appendChild(c);this.toolList=[];for(b=0;b<DevSlide.tools.length;b++)this.toolList[b]=this.addSection(b>
0);this.hidden=true;for(b=0;b<DevSlide.tools.length;b++)for(d=0;d<DevSlide.tools[b].length;d++)this.addTool(b,DevSlide.tools[b][d]);Sfdc.on(e,"click",this.toggleMenu,this);this.shown=false;Sfdc.on(this.slideBody,"mouseover",this.onSlideOver,this);Sfdc.on(this.slideBody,"mouseout",this.onSlideOut,this);Sfdc.on(document,"keydown",this.onDocKeydown,this);Sfdc.on(c,"click",this.confirmTurnOff,this);DevSlide.instance=this;Sfdc.Perf.measure("init","DevSlide")}DevSlide.tools=[];
DevSlide.addTool=function(a,c,b,d,e,f,g,h){DevSlide.addToolObject(a,{title:c,url:d,newUrl:e,newWindow:g,hoverText:b,newLinkHover:f,newInNewWindow:h})};DevSlide.addToolObject=function(a,c){var b;b=typeof c=="number"?c:typeof a.section=="number"?a.section:0;DevSlide.instance&&DevSlide.instance.addTool(b,a);DevSlide.tools[b]||(DevSlide.tools[b]=[]);DevSlide.tools[b].push(a)};DevSlide.addTools=function(a){for(var c=0;c<a.length;c++)DevSlide.addToolObject(a[c])};
DevSlide.prototype={addTool:function(a,c){this.toolList[a]||(this.toolList[a]=this.addSection(a>0));this.toolList[a].appendChild(this.createToolItem(c));this.show()},addSection:function(a){if(a){a=document.createElement("HR");a.className="divider";this.slideBody.appendChild(a)}a=document.createElement("UL");a.className="slideList";this.slideBody.appendChild(a);return a},createToolItem:function(a){var c=document.createElement("LI"),b=document.createElement("A");b.appendChild(document.createTextNode(a.title));
b.className="toolLink";b.href=a.url;b.title=a.hoverText;if(a.newWindow)b.target="_blank";c.appendChild(b);if(a.newUrl){b=document.createElement("A");var d=document.createElement("IMG");d.src="/img/dcm/add_icon.png";d.width=16;d.height=16;d.alt=LC.getLabel("Buttons","new");b.appendChild(d);b.appendChild(document.createTextNode(LC.getLabel("Buttons","new")));b.className="toolNewLink";b.href=a.newUrl;b.title=a.newLinkHover;if(a.newInNewWindow)b.target="_blank";c.appendChild(b)}a=document.createElement("DIV");
a.className="clearingBox";c.appendChild(a);return c},toggleMenu:function(){this.shown?this.hideMenu():this.showMenu()},showMenu:function(){var a=Sfdc.Dom.getStyle(this.slide,"direction")=="rtl";Sfdc.Dom.setStyle(this.slide,a?"left":"right","-2px");Sfdc.Dom.addClass(this.slide,"expanded");this.shim.refresh();this.shown=true},hideMenu:function(){var a=Sfdc.Dom.getStyle(this.slide,"direction")=="rtl";Sfdc.Dom.setStyle(this.slide,a?"left":"right","-232px");Sfdc.Dom.removeClass(this.slide,"expanded");
this.shim.refresh();this.shown=false},show:function(){if(this.hidden){Sfdc.Dom.setStyle(this.slide,"display","block");this.shim.refresh();this.hidden=false}},onSlideOver:function(a){for(a=Sfdc.Event.getEventTarget(Sfdc.Event.getEvent(a));a!=this.slideBody&&a!=document.body;){if(a.nodeName=="LI"){Sfdc.Dom.addClass(a,"hover");break}a=a.parentNode}},onSlideOut:function(a){a=Sfdc.Event.getEvent(a);for(var c=Sfdc.Event.getEventTarget(a);c!=this.slideBody&&c!=document.body;){if(c.nodeName=="LI"&&Sfdc.Event.mouseExited(a,
c)){Sfdc.Dom.removeClass(c,"hover");break}c=c.parentNode}},onDocKeydown:function(a){a=Sfdc.Event.getEvent(a);a.altKey&&Sfdc.Event.isKeyAction(a,Sfdc.Event.keyCode.SEMICOLON)&&this.toggleMenu()},confirmTurnOff:function(){var a=this;Dialogs.createCheckboxConfirmationDialog(LC.getLabel("devContextMenu","confirmTurnOffTitle"),LC.getLabel("devContextMenu","confirmTurnOffText"),null,LC.getLabel("devContextMenu","turnOff"),LC.getLabel("Buttons","cancel"),function(){Sfdc.UserContext.userPreferences.setBoolean("ShowDevContextMenu",
false);a.hide()},function(){}).show()},hide:function(){this.slide.style.display="none";this.shim.refresh()}};
