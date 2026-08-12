let cur=-1, fav=JSON.parse(localStorage.getItem('dwp-fav')||'[]');
const audio=document.getElementById('audio'), C=document.getElementById('content');
const esc=s=>s.replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
function card(s,i){return `<article class="card"><div class="art">🎵<button onclick="play(${i})">▶</button></div><div class="info"><b>${esc(s.title)}</b><span>${esc(s.artist)} • ${s.era}</span><div><small>${s.duration}</small><button onclick="favorite(${i})">${fav.includes(i)?'♥':'♡'}</button></div></div></article>`}
function list(arr,title){C.innerHTML=`<div class="title"><h2>${title}</h2><span>${arr.length} tracks</span></div><div class="grid">${arr.map(s=>card(s,songs.indexOf(s))).join('')||'<div class="empty">कुछ नहीं मिला।</div>'}</div>`}
function home(){list(songs,'🎶 Retro Originals')}
function allSongs(){list(songs,'All Songs')}
function filter(e){list(songs.filter(s=>s.era===e),e+' Classics')}
function favorites(){list(songs.filter((_,i)=>fav.includes(i)),'My Favorites')}
function play(i){cur=i;const s=songs[i];audio.src=s.audio;document.getElementById('pt').textContent=s.title;document.getElementById('pa').textContent=s.artist;audio.play()}
function toggle(){if(cur<0)play(0);else if(audio.paused)audio.play();else audio.pause()}
function next(){play((cur+1)%songs.length)} function prev(){play((cur-1+songs.length)%songs.length)}
function favorite(i){fav=fav.includes(i)?fav.filter(x=>x!==i):[...fav,i];localStorage.setItem('dwp-fav',JSON.stringify(fav));home()}
audio.addEventListener('ended',next);audio.addEventListener('timeupdate',()=>{if(audio.duration)document.getElementById('prog').style.width=(audio.currentTime/audio.duration*100)+'%'});
document.getElementById('search').oninput=e=>{const q=e.target.value.toLowerCase();list(songs.filter(s=>(s.title+' '+s.artist+' '+s.era).toLowerCase().includes(q)),'Search Results')};
home();
