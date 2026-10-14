(() => {
'use strict';
const $ = id => document.getElementById(id);
const data = window.ARCHIVE || [];
const all = data.flatMap(cat => cat.posts.map(post => ({cat,post})));
const esc = s => String(s).replace(/[&<>"']/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
const url = (cat,post) => '#/post/'+encodeURIComponent(cat.id)+'/'+encodeURIComponent(post.slug);
const path = () => decodeURIComponent(location.hash.replace(/^#\/?/,'')).split('/').filter(Boolean);
const nav = $('category-nav'), page = $('content-page'), home = $('home-page'), output = $('terminal-output');
let currentCat = null, history = [], historyIndex = 0;
const open = hash => { location.hash = hash; if(location.hash === hash) render(); };
function link(label,href,cls='') {return `<a class="${cls}" href="${href}">${esc(label)}</a>`;}
function renderNav() {nav.innerHTML = data.map((c,i)=>`<a href="#/category/${c.id}" data-cat="${c.id}">[ ${String(i+1).padStart(2,'0')} ] ${esc(c.name)}</a>`).join('');}
function render(){const [type,id,slug] = path();currentCat=data.find(c=>c.id===id)||null;const showHome=!type;home.hidden=!showHome;page.hidden=showHome;
nav.querySelectorAll('a').forEach(a=>a.classList.toggle('active',a.dataset.cat===id));
$('prompt').textContent='C:\\StudyArchive'+(currentCat?'\\'+currentCat.id:'')+'>';
if(showHome){drawStar();return;}
let html='';
if(type==='category' && currentCat){html=`<section class="panel"><div class="crumb">C:\\StudyArchive\\${esc(currentCat.id)}&gt; ls</div><h1>${esc(currentCat.name)}</h1><p class="intro">${esc(currentCat.subtitle)} / ${currentCat.posts.length} FILE(S) FOUND</p><div class="file-list">${currentCat.posts.map(p=>`<a href="${url(currentCat,p)}"><span>${esc(p.title)}.html</span><small>${esc(p.summary)}</small></a>`).join('')}</div>${link('← BACK TO HOME','#/','back')}</section>`;}
else if(type==='post' && currentCat){const p=currentCat.posts.find(x=>x.slug===slug);if(!p){html=notFound();}else{html=`<article class="panel"><div class="crumb">C:\\StudyArchive\\${esc(currentCat.id)}&gt; cat ${esc(p.slug)}.html</div><h1>${esc(p.title)}</h1><p class="intro">${esc(p.summary)}</p><div class="meta">UPDATED ${esc(p.date)} / ${esc(currentCat.name)}</div><div class="article-body">${p.body}</div><div>${p.tags.map(t=>`<span class="tag">#${esc(t)}</span>`).join('')}</div>${link('← '+currentCat.name,'#/category/'+currentCat.id,'back')}</article>`;}}
else if(type==='notes'||type==='search'){const q=type==='search'?(new URLSearchParams(location.hash.split('?')[1]||'')).get('q')||'':'';const matches=search(q);html=`<section class="panel"><div class="crumb">C:\\StudyArchive&gt; ${type==='search'?'search '+esc(q):'ls /all'}</div><h1>${type==='search'?'SEARCH RESULTS':'ALL NOTES'}</h1><p class="intro">${matches.length} FILE(S) FOUND</p>${matches.length?`<div class="file-list">${matches.map(x=>`<a href="${url(x.cat,x.post)}"><span>${esc(x.post.title)}</span><small>${esc(x.cat.name)} / ${esc(x.post.summary)}</small></a>`).join('')}</div>`:'<p class="empty">No matching notes.</p>'}${link('← HOME','#/','back')}</section>`;}
else if(type==='random'){const x=all[Math.floor(Math.random()*all.length)];open(url(x.cat,x.post));return;}
else if(type==='about'){html=`<section class="panel"><div class="crumb">C:\\StudyArchive&gt; about</div><h1>ABOUT THIS ARCHIVE</h1><p>손글씨와 코드, 수학과 아이디어를 모으는 개인 공부 기록 공간입니다.</p><p>상단 터미널에서 <code>help</code>를 입력하거나 카테고리를 클릭해 이동할 수 있습니다.</p>${link('← HOME','#/','back')}</section>`;}
else if(type==='projects'){html=`<section class="panel"><div class="crumb">C:\\StudyArchive&gt; projects</div><h1>PROJECTS</h1><p>프로젝트를 추가할 공간입니다. js/data.js에 카테고리와 글을 추가하거나 이 페이지를 수정하세요.</p>${link('← HOME','#/','back')}</section>`;}
else html=notFound();
page.innerHTML=html;
window.scrollTo({top:0,behavior:'instant'});
}
function notFound(){return `<section class="panel"><h1>404 / NOT FOUND</h1><p>해당 페이지가 없습니다.</p>${link('← HOME','#/','back')}</section>`;}
function search(query){const q=query.trim().toLowerCase();return all.filter(x=>!q||[x.cat.name,x.cat.subtitle,x.post.slug,x.post.title,x.post.summary,...x.post.tags].some(t=>t.toLowerCase().includes(q)));}
function goSearch(q){open('#/search?q='+encodeURIComponent(q.trim()));}
function showSuggestions(){const q=$('search-input').value;const matches=search(q).slice(0,6);$('search-suggestions').innerHTML=matches.map(x=>`<button type="button" data-href="${url(x.cat,x.post)}">how to ${esc(x.post.title.toLowerCase())}</button>`).join('')||'<div class="empty">No suggestions found.</div>';}
$('search-suggestions').addEventListener('click',e=>{const b=e.target.closest('[data-href]');if(b)open(b.dataset.href);});
$('search-input').addEventListener('input',showSuggestions);
$('search-form').addEventListener('submit',e=>{e.preventDefault();goSearch($('search-input').value);});
$('search-button').addEventListener('click',()=>goSearch($('search-input').value));
$('random-button').addEventListener('click',()=>open('#/random'));
$('search-clear').addEventListener('click',()=>{$('search-input').value='';showSuggestions();$('search-input').focus();});
function print(cmd,message){output.hidden=false;$('toggle-terminal').textContent='[ − ]';$('toggle-terminal').setAttribute('aria-expanded','true');const p=document.createElement('p');p.textContent='> '+cmd+'\n'+message;output.appendChild(p);output.scrollTop=output.scrollHeight;}
function run(raw){const cmd=raw.trim();if(!cmd)return;history.push(cmd);historyIndex=history.length;const [op,...args]=cmd.split(/\s+/);const arg=args.join(' ').trim();const key=op.toLowerCase();let response='';
if(key==='help')response='help | ls | pwd | cd <folder> | cd .. | cat <file> | search <term> | home | clear | random';
else if(key==='pwd')response='C:\\StudyArchive'+(currentCat?'\\'+currentCat.id:'');
else if(key==='ls')response=(currentCat?currentCat.posts.map(p=>p.slug+'.html'):data.map(c=>c.id+'/')).join('    ');
else if(key==='home'){open('#/');response='Home opened.';}
else if(key==='clear'){output.replaceChildren();output.hidden=true;$('toggle-terminal').textContent='[ + ]';$('toggle-terminal').setAttribute('aria-expanded','false');return;}
else if(key==='random'){open('#/random');response='Opening a random note...';}
else if(key==='cd'){if(!arg||arg==='..'||arg==='/'||arg==='\\'){open('#/');response='C:\\StudyArchive';}else{const f=data.find(c=>[c.id,c.name,c.subtitle].some(n=>n.toLowerCase()===arg.toLowerCase()));if(f){open('#/category/'+f.id);response='C:\\StudyArchive\\'+f.id;}else response='Directory not found: '+arg;}}
else if(key==='cat'){const name=arg.replace(/\.html$/i,'').toLowerCase();const match=all.find(x=>x.post.slug.toLowerCase()===name && (!currentCat||x.cat.id===currentCat.id))||all.find(x=>x.post.title.toLowerCase()===name);if(match){open(url(match.cat,match.post));response='Opened '+match.post.title;}else response='File not found: '+arg;}
else if(key==='search'){goSearch(arg);response='Searching: '+(arg||'all notes');}
else response='Unknown command: '+op+'\nType help for available commands.';
print(cmd,response);}
$('terminal-form').addEventListener('submit',e=>{e.preventDefault();run($('terminal-input').value);$('terminal-input').value='';});
$('terminal-input').addEventListener('keydown',e=>{if(e.key==='ArrowUp'){e.preventDefault();historyIndex=Math.max(0,historyIndex-1);$('terminal-input').value=history[historyIndex]||'';}if(e.key==='ArrowDown'){e.preventDefault();historyIndex=Math.min(history.length,historyIndex+1);$('terminal-input').value=history[historyIndex]||'';}});
$('toggle-terminal').addEventListener('click',()=>{output.hidden=!output.hidden;$('toggle-terminal').textContent=output.hidden?'[ + ]':'[ − ]';$('toggle-terminal').setAttribute('aria-expanded',String(!output.hidden));});
function drawStar(){const canvas=$('binary-star');if(home.hidden)return;const rect=canvas.getBoundingClientRect();if(!rect.width)return;const w=rect.width,h=rect.height,dpr=Math.min(devicePixelRatio||1,2);canvas.width=Math.round(w*dpr);canvas.height=Math.round(h*dpr);const ctx=canvas.getContext('2d');ctx.scale(dpr,dpr);ctx.clearRect(0,0);const cx=w*.5,cy=h*.55,R=Math.min(w*.36,h*.45),r=R*.43;const points=[];for(let i=0;i<10;i++){const a=-Math.PI/2+i*Math.PI/5,rad=i%2?r:R;points.push([cx+Math.cos(a)*rad,cy+Math.sin(a)*rad]);}ctx.beginPath();points.forEach(([x,y],i)=>i?ctx.lineTo(x,y):ctx.moveTo(x,y));ctx.closePath();ctx.save();ctx.clip();const size=Math.max(9,Math.min(13,w/58));ctx.font=size+'px monospace';ctx.fillStyle='#329fff';for(let row=0,y=cy-R; y<cy+R;row++,y+=size*1.18){for(let col=0,x=cx-R;x<cx+R;col++,x+=size*.65){const hash=(row*97+col*31+row*col*7)%17;ctx.globalAlpha=.45+(hash/17)*.55;ctx.fillText(hash%2?'1':'0',x,y);}}ctx.restore();ctx.strokeStyle='#278cda';ctx.lineWidth=1;ctx.setLineDash([2,4]);for(let k=0;k<3;k++){ctx.save();ctx.translate(cx,cy);ctx.rotate(-.45+k*.46);ctx.beginPath();ctx.ellipse(0,0,R*1.35,R*.43,0,0,Math.PI*2);ctx.stroke();ctx.restore();}ctx.setLineDash([]);for(let i=0;i<55;i++){const x=(i*137.23+23)%w,y=(i*79.57+17)%h;if(Math.hypot(x-cx,y-cy)<R*.25)continue;ctx.globalAlpha=.3+(i%4)*.15;ctx.fillStyle='#329fff';ctx.fillRect(x,y,i%8===0?2:1,i%8===0?2:1);}ctx.globalAlpha=1;}
let rt;addEventListener('resize',()=>{clearTimeout(rt);rt=setTimeout(drawStar,120)});addEventListener('hashchange',render);
renderNav();showSuggestions();render();
})();
