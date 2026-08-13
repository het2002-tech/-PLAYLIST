let current=-1;let favorites=JSON.parse(localStorage.getItem("dwp-fav")||"[]");const C=document.getElementById("content");const esc=s=>s.replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
function yt(s){return "https://www.youtube.com/results?search_query="+encodeURIComponent(s.title+" "+s.artist)}
function sp(s){return "https://open.spotify.com/search/"+encodeURIComponent(s.title+" "+s.artist)}
function card(s,i){return `<article class="card"><div class="art">🎵</div><div class="info"><b>${esc(s.title)}</b><small>${esc(s.artist)} • ${s.era} • ${s.duration}</small><div class="links"><button class="yt" onclick="openSong(${i},'yt')">▶ YouTube</button><button class="sp" onclick="openSong(${i},'sp')">● Spotify</button><button class="heart" onclick="favorite(${i})">${favorites.includes(i)?"♥":"♡"}</button></div></div></article>`}
function list(arr,title){C.innerHTML=`<div class="title"><h2>${title}</h2><span>${arr.length} songs</span></div><div class="grid">${arr.map(s=>card(s,songs.indexOf(s))).join("")||'<div class="empty">Song नहीं मिला.</div>'}</div>`}
function home(){list(songs,"🎶 Popular Classics")}
function allSongs(){list(songs,"All Songs")}
function era(e){list(songs.filter(s=>s.era===e),e+" Classics")}
function favs(){list(songs.filter((_,i)=>favorites.includes(i)),"My Favorites")}
function openSong(i,type){current=i;document.getElementById("current").textContent=songs[i].title;document.getElementById("artist").textContent=songs[i].artist;window.open(type==="sp"?sp(songs[i]):yt(songs[i]),"_blank")}
function openCurrent(){if(current<0)allSongs();else openSong(current,"yt")}
function next(){current=current<0?0:(current+1)%songs.length;openSong(current,"yt")}
function prev(){current=current<0?0:(current-1+songs.length)%songs.length;openSong(current,"yt")}
function favorite(i){favorites=favorites.includes(i)?favorites.filter(x=>x!==i):[...favorites,i];localStorage.setItem("dwp-fav",JSON.stringify(favorites));home()}
document.getElementById("search").oninput=e=>{let q=e.target.value.toLowerCase().trim();list(q?songs.filter(s=>(s.title+" "+s.artist+" "+s.era).toLowerCase().includes(q)):songs,"Search Results")}
document.getElementById("quick").innerHTML=songs.slice(0,10).map((s,i)=>`<div class="q" onclick="openSong(${i},'yt')"><div class="qicon">🎵</div><div><b>${esc(s.title)}</b><small>${esc(s.artist)}</small></div></div>`).join("");home();
