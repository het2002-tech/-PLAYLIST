let cur=-1, playing=false, fav=JSON.parse(localStorage.getItem('dwp-fav')||'[]'), rec=JSON.parse(localStorage.getItem('dwp-rec')||'[]');
const C=document.getElementById('content');
const esc=s=>s.replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const audio=new Audio(); audio.preload='metadata';

function card(s,i){return `<article class="card"><div class="art">🎙️<button onclick="play(${i})">▶</button></div><div class="info"><b>${esc(s.title)}</b><span>${esc(s.artist)} • ${s.era}</span><div><small>${s.duration}</small><button onclick="favorite(${i})">${fav.includes(i)?'♥':'♡'}</button></div></div></article>`}
function list(arr=songs,title='Popular Songs'){C.innerHTML=`<div class="title"><h2>${title}</h2><span>${arr.length} songs</span></div><div class="grid">${arr.map(s=>card(s,songs.indexOf(s))).join('')||'<div class="empty">No songs found.</div>'}</div>`}
function home(){C.innerHTML=`<div class="title"><h2>Browse by Decade</h2></div><div class="decades">${['60s','70s','80s','90s'].map(e=>`<button class="decade" onclick="list(songs.filter(s=>s.era==='${e}'),'${e} Classics')">${e}<small>Classic melodies</small><small>Browse songs →</small></button>`).join('')}</div><div class="title"><h2>Popular Songs</h2></div><div class="grid">${songs.slice(0,6).map((s,i)=>card(s,i)).join('')}</div>`}
function allSongs(){list(songs,'All Songs')} function decades(){home()} function singers(){list(songs,'Singers')}
function favorites(){list(songs.filter((_,i)=>fav.includes(i)),'My Favorites')}
function recent(){list(rec.map(i=>songs[i]).filter(Boolean),'Recently Played')}
function about(){C.innerHTML='<div class="empty"><h2>About दुकान वाला Playlist</h2><p>Retro music discovery with an in-site player. Only use audio you own, have licensed, or are otherwise authorized to stream.</p></div>'}

function play(i){
  cur=i; const s=songs[i];
  audio.src=s.audio; audio.play().then(()=>{playing=true; updatePlayer();}).catch(()=>{
    playing=false; updatePlayer();
    alert('This demo is ready for an in-site player. Add your authorized audio file at: '+s.audio);
  });
  document.getElementById('pt').textContent=s.title;
  document.getElementById('pa').textContent=s.artist;
  document.getElementById('now').innerHTML=`<div class="item"><div class="thumb">🎵</div><div><b>${esc(s.title)}</b><span>${esc(s.artist)}</span></div></div>`;
  rec=[i,...rec.filter(x=>x!==i)].slice(0,10); localStorage.setItem('dwp-rec',JSON.stringify(rec));
}
function updatePlayer(){
  document.querySelector('footer .play').textContent=playing?'Ⅱ':'▶';
}
function toggle(){
  if(cur<0){play(0);return}
  if(audio.paused){audio.play().then(()=>{playing=true;updatePlayer()})}
  else{audio.pause();playing=false;updatePlayer()}
}
function next(){play((cur+1)%songs.length)}
function prev(){play((cur-1+songs.length)%songs.length)}
function favorite(i){fav=fav.includes(i)?fav.filter(x=>x!==i):[...fav,i];localStorage.setItem('dwp-fav',JSON.stringify(fav));list()}
function theme(){document.body.classList.toggle('light')}
document.getElementById('search').oninput=e=>{let q=e.target.value.toLowerCase();list(songs.filter(s=>(s.title+' '+s.artist+' '+s.era).toLowerCase().includes(q)),'Search Results')}
audio.addEventListener('ended',next);
audio.addEventListener('timeupdate',()=>{
  if(!audio.duration)return;
  const p=(audio.currentTime/audio.duration)*100;
  const bar=document.getElementById('audioProgress');
  if(bar)bar.style.width=p+'%';
  const t=document.getElementById('audioTime');
  if(t)t.textContent=Math.floor(audio.currentTime/60).toString().padStart(2,'0')+':'+Math.floor(audio.currentTime%60).toString().padStart(2,'0');
});
home();
