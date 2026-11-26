/* Turnamen Catur KSL — prototype shared script: sample data, layout shell, guide, helpers.
   No backend: edits (results, players) are kept in this browser's localStorage only. */
(function(){
// ---------- icons (minimal stroke SVG) ----------
const P={
 crown:'<path d="M4 18h16M5 18 3 7l5 4 4-6 4 6 5-4-2 11"/>',
 home:'<path d="M3 10.5 12 3l9 7.5"/><path d="M5 9.5V21h14V9.5"/>',
 swap:'<path d="M7 4 3 8l4 4"/><path d="M3 8h14"/><path d="m17 20 4-4-4-4"/><path d="M21 16H7"/>',
 trophy:'<path d="M8 21h8M12 17v4M7 4h10v5a5 5 0 0 1-10 0z"/><path d="M17 5h3v2a3 3 0 0 1-3 3M7 5H4v2a3 3 0 0 0 3 3"/>',
 users:'<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20a6.5 6.5 0 0 1 13 0"/><path d="M16 4.6a3.5 3.5 0 0 1 0 6.8M18 14.2a6.5 6.5 0 0 1 3.5 5.8"/>',
 user:'<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>',
 grid:'<rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M3 15h18M9 3v18M15 3v18"/>',
 info:'<circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8h.01"/>',
 search:'<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>',
 qr:'<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><path d="M14 14h3v3h-3zM20 14v.01M14 20h.01M17 20h4v-3"/>',
 share:'<circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="m8.6 13.5 6.8 4M15.4 6.5l-6.8 4"/>',
 phone:'<rect x="6" y="2" width="12" height="20" rx="2"/><path d="M11 18h2"/>',
 laptop:'<rect x="4" y="4" width="16" height="11" rx="1.5"/><path d="M2 19h20"/>',
 guide:'<path d="m3 6 2 2 3-3M3 13l2 2 3-3M11 6h10M11 13h10M11 20h10"/>',
 plus:'<path d="M12 5v14M5 12h14"/>',
 upload:'<path d="M12 15V3M7 8l5-5 5 5"/><path d="M4 15v4a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-4"/>',
 edit:'<path d="M4 20h4L19 9l-4-4L4 16z"/>',
 flag:'<path d="M5 21V4M5 4h11l-2 4 2 4H5"/>',
 lock:'<rect x="4" y="11" width="16" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/>',
 left:'<path d="M19 12H5M11 6l-6 6 6 6"/>',
 right:'<path d="m9 6 6 6-6 6"/>',
 cal:'<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/>',
 pin:'<path d="M12 21s-7-6.2-7-12a7 7 0 0 1 14 0c0 5.8-7 12-7 12z"/><circle cx="12" cy="9" r="2.5"/>',
 clock:'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
 out:'<path d="M15 4h4v16h-4M10 8l-4 4 4 4M6 12h10"/>',
 org:'<rect x="4" y="3" width="16" height="18" rx="1"/><path d="M9 7h2M13 7h2M9 11h2M13 11h2M9 15h2M13 15h2"/>',
 check:'<path d="m5 12 5 5 9-10"/>',
 x:'<path d="M6 6l12 12M18 6 6 18"/>',
 msg:'<path d="M4 20l1.5-4A8 8 0 1 1 8 18.5z"/>',
 copy:'<rect x="8" y="8" width="12" height="12" rx="2"/><path d="M16 8V5a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h3"/>',
 list:'<path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01"/>',
 star:'<path d="m12 3 2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1-4.4-4.3 6.1-.9z"/>',
 dash:'<rect x="3" y="3" width="7" height="9" rx="1"/><rect x="14" y="3" width="7" height="5" rx="1"/><rect x="14" y="12" width="7" height="9" rx="1"/><path d="M3 16h7v5H3z"/>'
};
const AVC=["#e7efeb","#f6efe2","#e8eef6","#f3e8ee","#ececee","#eef3e2"];
const av=(n,c="")=>{const h=[...n].reduce((a,ch)=>a+ch.charCodeAt(0),0);return `<span class="av ${c}" style="background:${AVC[h%AVC.length]}">${n.split(/\s+/).map(w=>w[0]).join("").slice(0,2).toUpperCase()}</span>`};
const esc=t=>String(t).replace(/"/g,"&quot;");
const tip=(t,h="")=>`<span class="tip" role="button" tabindex="0" data-act="tip" data-h="${esc(h)}" data-t="${esc(t)}" aria-label="Penjelasan">?</span>`;
const icon=(n,c="")=>`<svg class="ic ${c}" viewBox="0 0 24 24" aria-hidden="true">${P[n]||""}</svg>`;

// ---------- sample data ----------
// clubs and one shared player database; every player has a unique ID (pid), names may repeat
const CLUBS=[
 {id:"ksl",name:"Klub Catur King Sang Long",city:"Pamekasan"},
 {id:"galis",name:"Komunitas Catur Galis",city:"Galis"},
 {id:"ruang",name:"Ruang Catur",city:"Pamekasan"},
 {id:"smpn2",name:"SMPN 2 Pamekasan",city:"Pamekasan"},
 {id:"sumenep",name:"Catur Sumenep",city:"Sumenep"}
];
const RAW=[
 ["Raihan",1652,"ksl",34],["Radit",1611,"ksl",41],["Fikri",1585,"galis",30],["Abdi",1560,"ksl",36],["Robet",1534,"ksl",22],["Navil",1510,"ruang",18],["Yoga",1497,"ksl",15],["Reza",1480,"sumenep",12],
 ["Alvin",1310,"ksl",9],["Dafa",1288,"ksl",11],["Fauzi",1260,"galis",8],["Hasan",1241,"ruang",14],["Jaka",1220,"ksl",6],["Leo",1198,"smpn2",5],["Sahrul",1175,"sumenep",7],["Yuda",1150,"ksl",4],
 ["Fikri",1402,"sumenep",10],["Hasbullah",1555,"galis",40],["Siti Aminah",1302,"ruang",12],["Ahmad Fauzan",1488,"galis",26],["Dimas",1370,"sumenep",8],["Nabila",1215,"smpn2",3]
];
const PLAYERS=RAW.map((x,i)=>({pid:"TC-"+String(1001+i).padStart(5,"0"),name:x[0],rtg:x[1],club:x[2],games:x[3]}));
const clubName=id=>(CLUBS.find(c=>c.id===id)||{name:id||"-"}).name;
const byPid=pid=>PLAYERS.find(p=>p.pid===pid);
// a class lists players by pid; fields copied so tables can read p.name / p.rtg / p.club
const mk=(pids,pay)=>pids.map((pid,i)=>{const p=byPid(pid);return {id:i,pid,name:p.name,rtg:p.rtg,games:p.games,club:clubName(p.club),pay:pay?pay(i):"lunas"}});
const PX=i=>PLAYERS[i].pid;
// round robin by circle method: n players -> n-1 rounds
// shortcut: not the official FIDE Berger table order, use Berger tables in the product
function rr(n){const a=[...Array(n).keys()],R=[];for(let r=0;r<n-1;r++){const g=[];for(let i=0;i<n/2;i++){let w=a[i],b=a[n-1-i];if((i===0&&r%2)||(i>0&&(i+r)%2))[w,b]=[b,w];g.push({w,b,res:null})}R.push(g);a.splice(1,0,a.pop())}return R}
let seed=7;const rnd=()=>(seed=(seed*9301+49297)%233280)/233280;
function play(c,n){c.rounds.forEach((g,ri)=>{if(ri>=n)return;g.forEach(x=>{const d=c.players[x.w].rtg-c.players[x.b].rtg+30,v=rnd()+d/400;x.res=v>.62?"1-0":v<.38?"0-1":"½-½"})})}
const TOURS=[
 {id:"ksl",name:"Turnamen Penggalangan Dana KSL",org:"ksl",place:"Rumah Raihan, Pamekasan",date:"Ahad, 12 Jul 2026",iso:"2026-07-12",time:"07.00 - 09.00 WIB",status:"live",sys:"Liga satu putaran",fee:5000,arb:["Mukhlish"],tb:"Pertemuan langsung, Jumlah menang, Sonneborn-Berger, Koya",
  classes:[{name:"Kelas A",players:mk([0,1,2,3,4,5,6,7].map(PX),i=>i===6?"belum":"lunas"),rounds:rr(8),pub:5},{name:"Kelas B",players:mk([8,9,10,11,12,13,14,15].map(PX),i=>i%4===3?"belum":"lunas"),rounds:rr(8),pub:5}]},
 {id:"mingguan",name:"Liga Mingguan Pamekasan",org:"ksl",place:"Balai Bugih, Pamekasan",date:"Sabtu, 14 Nov 2026",iso:"2026-11-14",time:"19.30 WIB",status:"live",sys:"Liga satu putaran",fee:0,arb:["Mukhlish","Radit"],tb:"Pertemuan langsung, Jumlah menang, Sonneborn-Berger, Koya",
  classes:[{name:"Kelas A",players:mk([17,19,2,16,20,18].map(PX),()=>"gratis"),rounds:rr(6),pub:3}]},
 {id:"pahlawan",name:"Turnamen Catur Hari Pahlawan 2026",org:"ksl",place:"Pamekasan",date:"10 Nov 2026",iso:"2026-11-10",status:"done",sys:"Liga satu putaran",fee:10000,arb:["Mukhlish"],tb:"Pertemuan langsung, Jumlah menang, Sonneborn-Berger, Koya",
  classes:[{name:"Kelas A",players:mk([0,1,2,3,17,19,4,5].map(PX)),rounds:rr(8),pub:7}]},
 {id:"galis",name:"Open Galis Cup",org:"galis",place:"Balai Desa Galis",date:"29 Nov 2026",time:"08.00 WIB",start:"2026-11-29T08:00:00+07:00",deadline:"2026-11-27T23:59:00+07:00",status:"soon",sys:"Swiss 5 babak",n:32,fee:10000,until:"27 Nov 2026",open:"Semua klub",
  reg:[[17,"lunas"],[0,"lunas"],[18,"belum"],[19,"lunas"],[6,"lunas"],[20,"belum"]].map(([i,pay])=>({pid:PX(i),pay}))},
 {id:"pelajar",name:"Rintisan Pelajar Pamekasan",org:"ksl",place:"SMPN 1 Pamekasan",date:"6 Des 2026",time:"07.30 WIB",start:"2026-12-06T07:30:00+07:00",deadline:"2026-12-04T23:59:00+07:00",status:"soon",sys:"Gugur",n:16,fee:0,until:"4 Des 2026",open:"Pelajar SD–SMA",
  reg:[8,21,13].map(i=>({pid:PX(i),pay:"gratis"}))}
];
TOURS.forEach(t=>(t.classes||[]).forEach(c=>play(c,t.status==="done"?99:c.pub-1)));
const rupiah=n=>n?"Rp "+n.toLocaleString("id-ID"):"Gratis";
const orgName=t=>clubName(t.org);
// the tournament being viewed (?t=...), defaults to the first one running
const Q=new URLSearchParams(location.search);
const qp=(k,d)=>Q.has(k)?Q.get(k):d;
const T=TOURS.find(t=>t.classes&&t.id===Q.get("t"))||TOURS.find(t=>t.status==="live");
// restore edits saved in this browser (per tournament)
const KEY="ksl-proto-v3",MKEY="ksl-meta";
try{const all=JSON.parse(localStorage.getItem(KEY)||"{}");TOURS.forEach(t=>{const s=all[t.id];if(!s||!t.classes)return;
  s.forEach((k,i)=>{const c=t.classes[i];if(!c)return;c.pub=k.pub;if(k.players)c.players=k.players;k.res.forEach((g,ri)=>g.forEach((r,bi)=>{const x=c.rounds[ri]&&c.rounds[ri][bi];if(!x)return;x.w=r[0];x.b=r[1];x.res=r[2]}))})})}catch(e){}
try{const meta=JSON.parse(localStorage.getItem(MKEY)||"{}");TOURS.forEach(t=>{const m=meta[t.id];if(!m)return;["name","iso","endIso","date","time","place"].forEach(k=>{if(m[k]!==undefined)t[k]=m[k]})})}catch(e){}
const MONTHS_ID=["Jan","Feb","Mar","Apr","Mei","Jun","Jul","Agu","Sep","Okt","Nov","Des"];
function fmtDateRange(startIso,endIso){
  if(!startIso)return"-";
  const p=s=>s.split("-").map(Number);
  const [y1,m1,d1]=p(startIso);
  if(!y1||!m1||!d1)return startIso;
  const mon1=MONTHS_ID[m1-1]||"";
  if(!endIso||endIso===startIso)return`${d1} ${mon1} ${y1}`;
  const [y2,m2,d2]=p(endIso);
  if(!y2||!m2||!d2)return`${d1} ${mon1} ${y1}`;
  const mon2=MONTHS_ID[m2-1]||"";
  if(y1===y2&&m1===m2)return`${d1}–${d2} ${mon1} ${y1}`;
  if(y1===y2)return`${d1} ${mon1}–${d2} ${mon2} ${y1}`;
  return`${d1} ${mon1} ${y1}–${d2} ${mon2} ${y2}`;
}
function save(t=T){try{const all=JSON.parse(localStorage.getItem(KEY)||"{}");all[t.id]=t.classes.map(c=>({pub:c.pub,players:c.players,res:c.rounds.map(g=>g.map(x=>[x.w,x.b,x.res]))}));localStorage.setItem(KEY,JSON.stringify(all))}catch(e){}}
function saveMeta(t=T){if(!t)return;try{const meta=JSON.parse(localStorage.getItem(MKEY)||"{}");meta[t.id]={name:t.name,iso:t.iso||"",endIso:t.endIso||"",date:t.date,time:t.time||"",place:t.place};localStorage.setItem(MKEY,JSON.stringify(meta))}catch(e){}}
function reset(){try{["ksl-proto-v2",KEY,MKEY,"ksl-pending","ksl-plan","ksl-orgs","ksl-trial","ksl-myclub","ksl-auth","ksl-feedback"].forEach(k=>localStorage.removeItem(k))}catch(e){}location.reload()}
const TITLES=["","GM","IM","FM","CM","WGM","WIM","WFM","WCM","NM"];
const titleBadge=t=>t?`<span class="pill acc" style="padding:1px 6px;font-size:10px;margin-right:4px">${t}</span>`:"";
const FKEY="ksl-feedback";
const feedback=()=>{try{return JSON.parse(localStorage.getItem(FKEY)||"[]")}catch(e){return[]}};
const setFeedback=a=>{try{localStorage.setItem(FKEY,JSON.stringify(a))}catch(e){}};
function openFeedback(ctx=""){
  const o=document.createElement("div");o.className="ovl";
  o.innerHTML=`<div class="popc" role="dialog" aria-modal="true" style="width:min(400px,100%)">
    <div class="row between"><b>Ajukan Koreksi Data</b><button class="btn alt sm" data-x>${icon("x")}</button></div>
    <div class="sm mute">Kirim pesan ke panitia jika ada salah ketik nama, gelar, atau klub. Tidak perlu login.</div>
    <form id="fbf">
      ${ctx?`<div class="sm mb">Terkait: <b>${ctx}</b></div>`:""}
      <div class="field"><label>Pesan koreksi</label><textarea name="msg" required placeholder="Contoh: Nama saya seharusnya Ahmad Fauzan, klub Galis" style="height:76px;padding:8px 12px;resize:vertical"></textarea></div>
      <div class="field"><label>Kontak (opsional)</label><input name="who" placeholder="No. WA / email jika ingin dikabari"></div>
      <div class="row"><button class="btn acc" style="flex:1" type="submit">${icon("msg")}Kirim ke panitia</button><button class="btn alt" type="button" data-x>Batal</button></div>
    </form>
  </div>`;
  o.onclick=e=>{if(e.target===o||e.target.closest("[data-x]"))o.remove()};
  o.querySelector("#fbf").onsubmit=e=>{
    e.preventDefault();const f=new FormData(e.target),msg=(f.get("msg")||"").trim();if(!msg)return;
    setFeedback(feedback().concat({t:T.id,ctx,msg,who:(f.get("who")||"").trim()||"Anonim",at:Date.now()}));
    o.remove();toast("Pesan koreksi dikirim ke panitia");
  };
  document.body.appendChild(o);
}
const loggedIn=()=>{try{return !!localStorage.getItem("ksl-auth")}catch(e){return false}};
const setAuth=v=>{try{v?localStorage.setItem("ksl-auth",v):localStorage.removeItem("ksl-auth")}catch(e){}};

// ---------- plan (free / premium), simulated in this browser ----------
const plan=()=>{try{return localStorage.getItem("ksl-plan")||"free"}catch(e){return"free"}};
const trialLeft=()=>{try{const u=+localStorage.getItem("ksl-trial");return u?Math.max(0,Math.ceil((u-Date.now())/864e5)):null}catch(e){return null}};
const startTrial=()=>{try{localStorage.setItem("ksl-trial",String(Date.now()+14*864e5))}catch(e){}};
const setPlan=v=>{try{localStorage.setItem("ksl-plan",v)}catch(e){}};
const pro=()=>plan()!=="free"||trialLeft()>0;

// ---------- glossary & tie-break presets ----------
const TERMS={
 "Pertemuan langsung":"Siapa yang menang saat dua pemain dengan poin sama saling bertemu.",
 "Jumlah menang":"Pemain dengan kemenangan lebih banyak diunggulkan.",
 "Sonneborn-Berger":"Poin lawan yang dikalahkan + setengah poin lawan yang seri. Menang dari lawan kuat bernilai lebih.",
 "Koya":"Poin yang diraih melawan pemain yang mendapat minimal setengah poin maksimal.",
 "Buchholz":"Jumlah poin semua lawan. Makin berat lawan yang dihadapi, makin tinggi.",
 "Buchholz Cut-1":"Buchholz tanpa lawan dengan poin terendah, supaya satu lawan lemah tidak merugikan.",
 "Rata-rata rating lawan":"Rata-rata rating semua lawan yang dihadapi.",
 "Menang dengan hitam":"Jumlah kemenangan saat bermain dengan buah hitam.",
 "Bye":"Tidak dapat lawan di babak itu karena jumlah pemain ganjil. Biasanya dapat 1 poin.",
 "WO":"Menang tanpa main karena lawan tidak hadir, ditulis +/− (bukan 1-0). Pemenang dapat 1 poin, tapi partai ini tidak dihitung untuk rating."
};
const TB={
 rr:["Pertemuan langsung","Jumlah menang","Sonneborn-Berger","Koya","Menang dengan hitam"],
 swiss:["Buchholz Cut-1","Buchholz","Pertemuan langsung","Jumlah menang","Sonneborn-Berger","Rata-rata rating lawan","Menang dengan hitam"],
 ko:[]
};

// ---------- chess helpers ----------
const score=r=>r==="1-0"||r==="+/-"?[1,0]:r==="0-1"||r==="-/+"?[0,1]:r==="½-½"?[.5,.5]:r==="-/-"?[0,0]:null;
const forfeit=r=>r==="+/-"||r==="-/+"||r==="-/-";
const resLabel=r=>({"+/-":"+/−","-/+":"−/+","-/-":"−/−"})[r]||r;
function standings(c){
  const s=c.players.map(p=>({...p,pts:0,w:0,d:0,l:0,g:0,opp:[]}));
  c.rounds.forEach(g=>g.forEach(x=>{const p=score(x.res);if(!p)return;[[x.w,x.b,p[0]],[x.b,x.w,p[1]]].forEach(([me,op,v])=>{const m=s[me];m.pts+=v;m.g++;v===1?m.w++:v===0?m.l++:m.d++;m.opp.push([op,v])})}));
  s.forEach(p=>{
    p.sb=p.opp.reduce((a,[o,v])=>a+v*s[o].pts,0);          // Sonneborn-Berger
    p.bh=p.opp.reduce((a,[o])=>a+s[o].pts,0);              // Buchholz
    p.koya=p.opp.reduce((a,[o,v])=>a+(s[o].pts>=s[o].g/2?v:0),0); // Koya: vs opponents on >= 50%
  });
  // round-robin order: points, direct encounter, wins, Sonneborn-Berger, rating
  const h2h=(a,b)=>{const m=a.opp.find(([o])=>o===b.id);return m?(m[1]===1?-1:m[1]===0?1:0):0};
  return s.slice().sort((a,b)=>b.pts-a.pts||h2h(a,b)||b.w-a.w||b.sb-a.sb||b.koya-a.koya||b.rtg-a.rtg);
}
// tournament statistics for one class (played games only; forfeits counted apart)
function stats(c){
  const o={games:0,white:0,draw:0,black:0,wo:0,upsets:0,clubs:{},avg:0};
  c.players.forEach(p=>o.clubs[p.club]=(o.clubs[p.club]||0)+1);
  o.avg=Math.round(c.players.reduce((a,p)=>a+(p.rtg||0),0)/(c.players.length||1));
  c.rounds.forEach(g=>g.forEach(x=>{if(!x.res)return;if(forfeit(x.res)){o.wo++;return}o.games++;
    const w=c.players[x.w].rtg,b=c.players[x.b].rtg;
    if(x.res==="1-0"){o.white++;if(w+100<=b)o.upsets++}else if(x.res==="0-1"){o.black++;if(b+100<=w)o.upsets++}else o.draw++}));
  return o;
}
// Club rating (Elo) updated after every round, same method FIDE uses for its own list:
// expected E = 1/(1+10^(-D/400)) with D capped at 400; change = K*(score-E);
// K 40 for new players (<30 games), 20 below 2400, 10 from 2400; forfeits/byes not rated.
// shortcut: logistic formula instead of FIDE table 8.1.2, and games-played is estimated from rating; use the table and real history in the product
const kOf=p=>p.rtg>=2400?10:(p.games??(p.rtg>=1550?30:0))>=30?20:40;
function ratingTrack(c){
  const cur=c.players.map(p=>p.rtg),hist=c.players.map(p=>[p.rtg]);
  c.rounds.forEach(g=>{const d=c.players.map(()=>0),played=g.some(x=>x.res);if(!played)return;
    g.forEach(x=>{const sc=score(x.res);if(!sc||forfeit(x.res))return;
      [[x.w,x.b,sc[0]],[x.b,x.w,sc[1]]].forEach(([me,op,v])=>{const D=Math.max(-400,Math.min(400,cur[me]-cur[op]));d[me]+=kOf(c.players[me])*(v-1/(1+Math.pow(10,-D/400)))})});
    d.forEach((v,i)=>{cur[i]=Math.round(cur[i]+v);hist[i].push(cur[i])})});
  return {cur,hist};
}
// rating history of one player across tournaments, oldest first: {date,t,cls,round,before,after}
// shortcut: each tournament starts from the player's stored rating, not chained from the previous event
function ratingLog(pid){
  const out=[];
  TOURS.filter(t=>t.classes).sort((a,b)=>a.iso<b.iso?-1:1).forEach(t=>t.classes.forEach(c=>{const p=c.players.find(x=>x.pid===pid);if(!p)return;
    const h=ratingTrack(c).hist[p.id];for(let r=1;r<h.length;r++){const d=new Date(t.iso);if(t.id==="mingguan")d.setDate(d.getDate()-7*(h.length-1-r));
      out.push({date:d.toLocaleDateString("id-ID",{day:"numeric",month:"short",year:"numeric"}),t,cls:c.name,round:r,before:h[r-1],after:h[r]})}}));
  return out;
}
const ratingNow=pid=>{const l=ratingLog(pid);return l.length?l[l.length-1].after:(byPid(pid)||{}).rtg};
// tie-break values can be quarters, so show 2 decimals when not whole
const num=v=>Number.isInteger(v)?String(v):v.toFixed(2);
// why tied players are ordered: first tie-break that separates them
function tieNotes(s){
  const out=[];
  for(let i=0;i<s.length-1;i++){const a=s[i],b=s[i+1];if(a.pts!==b.pts)continue;
    const m=a.opp.find(([o])=>o===b.id);let why;
    if(m&&m[1]!==0.5)why=["Pertemuan langsung",a.name+" menang saat bertemu"];
    else if(a.w!==b.w)why=["Jumlah menang",a.w+" vs "+b.w];
    else if(a.sb!==b.sb)why=["Sonneborn-Berger",num(a.sb)+" vs "+num(b.sb)];
    else if(a.koya!==b.koya)why=["Koya",num(a.koya)+" vs "+num(b.koya)];
    else why=["Rating awal",a.rtg+" vs "+b.rtg];
    out.push({a,b,ra:i+1,rb:i+2,why})}
  return out;
}
// "14 hari 03 jam 12 menit" style countdown
function until(iso){const ms=new Date(iso)-Date.now();if(ms<=0)return null;const d=Math.floor(ms/864e5),h=Math.floor(ms%864e5/36e5),m=Math.floor(ms%36e5/6e4),s=Math.floor(ms%6e4/1e3);return {d,h,m,s}}
const curRound=c=>{const i=c.rounds.findIndex(g=>g.some(x=>!x.res));return i<0?c.rounds.length:i+1};
const doneRounds=c=>c.rounds.filter(g=>g.every(x=>x.res)).length;
const fmt=n=>n===0?"0":n<1?"½":(n%1?Math.floor(n)+"½":String(n));
const pill=s=>s==="live"?'<span class="pill live">Berlangsung</span>':s==="done"?'<span class="pill ok">Selesai</span>':'<span class="pill">Segera</span>';

// ---------- share & self-registration ----------
const shareUrl=()=>location.href.replace(/[^/]*$/,"turnamen.html?t="+T.id);
function copyLink(){const u=shareUrl();(navigator.clipboard?navigator.clipboard.writeText(u):Promise.reject()).then(()=>toast("Link disalin"),()=>{prompt("Salin link ini:",u)})}
const waHref=()=>"https://wa.me/?text="+encodeURIComponent("Pairing & klasemen "+T.name+": "+shareUrl());
const PKEY="ksl-pending";
const pending=()=>{try{return JSON.parse(localStorage.getItem(PKEY)||"[]")}catch(e){return[]}};
const setPending=a=>{try{localStorage.setItem(PKEY,JSON.stringify(a))}catch(e){}};

// ---------- url params ----------
const kelas=()=>Math.min(+qp("kelas",0)||0,T.classes.length-1);
// link that keeps the selected class and search
function link(page,extra={}){const u=new URLSearchParams();u.set("t",T.id);u.set("kelas",kelas());if(Q.get("cari"))u.set("cari",Q.get("cari"));for(const k in extra)extra[k]==null?u.delete(k):u.set(k,extra[k]);return page+"?"+u}
function setParam(k,v){v?Q.set(k,v):Q.delete(k);history.replaceState(null,"",location.pathname+"?"+Q)}

// ---------- shell ----------
const page=document.body.dataset.page, area=document.body.dataset.area||"publik";
const GUIDE=[
 ["Penonton & pemain",[
  ["index","Beranda","Pilih turnamen dari daftar: berlangsung, akan datang, arsip."],
  ["turnamen","Ringkasan turnamen","Info, kelas, statistik, link turnamen."],
  ["pairing","Pairing per babak","Lawan, meja, dan warna. Pilih kelas dan babak."],
  ["klasemen","Klasemen","Poin dan tie-break otomatis, termasuk alasan bila poin sama."],
  ["peserta","Peserta","Pemain per kelas dengan ID, klub, dan rating."],
  ["cari","Klub & pemain","Cari klub terdaftar dan pemain berdasarkan nama atau ID."],
  ["segera","Turnamen akan datang","Kapan, di mana, hitung mundur, pendaftar."],
  ["daftar-peserta","Daftar jadi peserta","Daftar sendiri tanpa membuat profil ganda."],
  ["pemain","Profil pemain","ID unik, riwayat turnamen dan rating bertanggal."]]],
 ["Panitia / wasit",[
  ["masuk","Masuk","Email atau nomor HP + kata sandi."],
  ["daftar","Daftar klub","Satu formulir singkat."],
  ["panel","Dashboard","Turnamen berjalan dan yang perlu tindakan."],
  ["panel-turnamen","Kelola turnamen","Ringkasan, edit info, dan akses cepat babak & peserta."],
  ["panel-buat","Buat turnamen","Info, kelas & sistem, wasit, lalu terbitkan."],
  ["panel-pemain","Peserta","Pilih dari database atau tambah baru, konfirmasi WA."],
  ["panel-babak","Babak dan hasil","Isi hasil, WO, lalu pairing babak berikutnya."],
  ["panel-klub","Klub saya","Ubah data klub."],
  ["panel-penyelenggara","Penyelenggara (admin)","Setujui klub lain yang mendaftar."],
  ["paket","Paket Gratis / Premium","Fitur inti gratis. Premium untuk fitur tambahan."]]],
];
const file=id=>(id==="index"?"index":id)+".html";
let done={};try{done=JSON.parse(localStorage.getItem("ksl-guide")||"{}")}catch(e){}

function shell(){
  const app=document.getElementById("app");
  const isPanel=area==="panel", ph=document.body.classList.contains("phone");
  document.body.classList.toggle("area-panel",isPanel);
  const brand=`<a href="index.html" class="logo"><img class="ksl-logo" src="assets/ksl-logo.png" alt="Logo KSL"><span class="wm">King Sang Long</span></a>`;
  const head=`<header><div class="hbar">
    ${brand}
    <span class="sp"></span>
    <div class="toolbar">
      ${isPanel?"":`<a class="tb dsk" href="cari.html">${icon("search")}Klub & Pemain</a><span class="div dsk"></span>`}
      <button class="tb" data-act="device" title="Ganti tampilan laptop / HP">${icon(ph?"laptop":"phone")}<span class="dsk">${ph?"Laptop":"Tampilan HP"}</span></button>
      <span class="div"></span>
      <button class="tb" data-act="guide" aria-label="Panduan">${icon("guide")}<span class="dsk">Panduan</span> <span class="count" id="gCount"></span></button>
      <span class="div"></span>
      ${isPanel?`<button class="tb" data-act="logout">${icon("out")}<span class="dsk">Keluar</span></button>`:loggedIn()?`<a class="tb" href="panel.html">${icon("dash")}<span class="dsk">Panel Klub</span></a>`:`<a class="tb" href="masuk.html">${icon("lock")}Masuk</a>`}
    </div>
  </div></header>`;
  const railItems=[["panel","dash","Dashboard"],["panel-turnamen","trophy","Kelola Turnamen"],["panel-babak","flag","Babak & Hasil"],["panel-pemain","users","Peserta"],["panel-buat","plus","Buat Turnamen"],["panel-klub","org","Klub Saya"],["panel-penyelenggara","list","Penyelenggara"],["paket","star","Paket"],0,["index","home","Halaman Publik"]];
  const href=x=>file(x[0])+(isPanel&&["panel-babak","panel-pemain"].includes(x[0])?"?t="+T.id:"");
  const rail=isPanel
    ?`<nav class="rail wide">${brand}${railItems.map(x=>x?`<a class="it ${page===x[0]?"on":""}" href="${href(x)}">${icon(x[1],"lg")}${x[2]}</a>`:"<hr>").join("")}<div class="me">${av("Mukhlish")}<div><b>Mukhlish</b><span class="mute">${clubName("ksl")} · ${plan()!=="free"?"Premium":trialLeft()>0?"Trial "+trialLeft()+" hari":"Gratis"}</span></div></div></nav>`
    :"";
  const tabs=isPanel
    ?[["panel","dash","Dashboard"],["panel-turnamen","trophy","Turnamen"],["panel-buat","plus","Buat"],["panel-klub","org","Klub"],["paket","star","Paket"]]
    :[["index","home","Turnamen"],["cari","search","Klub & Pemain"],loggedIn()?["panel","dash","Panel Klub"]:["masuk","lock","Masuk"]];
  const bnav=`<nav class="bnav">${tabs.map(([p,i,l])=>`<a href="${href([p])}" class="${page===p||(p==="panel-turnamen"&&["panel-babak","panel-pemain"].includes(page))||(p==="index"&&!isPanel&&["turnamen","pairing","klasemen","peserta","tabel-silang","segera","daftar-peserta"].includes(page))?"on":""}">${icon(i,"lg")}${l}</a>`).join("")}</nav>`;
  app.insertAdjacentHTML("afterbegin",rail+head);
  app.insertAdjacentHTML("beforeend",bnav);
  document.body.insertAdjacentHTML("beforeend",`<aside id="guide"><div class="gh"><b>Guide</b><div class="bar"><i id="gBar"></i></div><button class="btn alt sm" data-act="guide-close">${icon("x")}Tutup</button></div><ol id="gList"></ol><div class="pad bt sm mute">Centang fitur yang sudah dicoba. <button class="lnk" data-act="reset">Reset data contoh</button></div></aside><div id="shade" data-act="guide-close"></div><div id="toast"></div><div id="cfm"><div class="popc" role="alertdialog" aria-modal="true"><div class="row nowrap" style="gap:8px">${icon("info","lg")}<b></b></div><p></p><div class="row nowrap"><button class="btn alt" style="flex:1" data-c="0">Batal</button><button class="btn" style="flex:1" data-c="1">Ya</button></div></div></div><div id="pop" data-act="pop-close"><div class="popc" data-act="pop-stay" role="dialog" aria-modal="true"><div class="row nowrap" style="gap:8px">${icon("info","lg")}<b></b></div><p></p><button class="btn block" data-act="pop-close">Mengerti</button></div></div>`);
  renderGuide();
}
function renderGuide(){
  let n=0,tot=0,h="";
  GUIDE.forEach(([grp,items])=>{h+=`<div class="grp">${grp}</div>`;items.forEach(([p,t,d])=>{tot++;if(done[p])n++;h+=`<li class="${p===page?"here":""}"><input type="checkbox" data-guide="${p}" ${done[p]?"checked":""} aria-label="Sudah dicoba"><div><b>${t}</b><span class="mute sm">${d}</span> ${p===page?'<span class="pill acc">halaman ini</span>':`<a class="lnk sm" href="${file(p)}">Buka</a>`}</div></li>`})});
  document.getElementById("gList").innerHTML=h;
  const gc=document.getElementById("gCount");if(gc)gc.textContent=n+"/"+tot;
  document.getElementById("gBar").style.width=(n/tot*100)+"%";
}
// popup for "?" help: title (or first words before ":"), short text, one close button
function openPop(h,t){
  if(!h){const i=t.indexOf(": ");if(i>0&&i<40){h=t.slice(0,i);t=t.slice(i+2)}else h="Info"}
  const p=document.getElementById("pop");p.querySelector("b").textContent=h;p.querySelector("p").textContent=t;p.classList.add("open");p.querySelector("button").focus();
}
function closePop(){document.getElementById("pop").classList.remove("open")}
// ask before anything that deletes data or is hard to undo; resolves true/false
function confirm2(title,text,ok="Ya, lanjutkan",danger=true){
  return new Promise(res=>{const d=document.getElementById("cfm");d.querySelector("b").textContent=title;d.querySelector("p").textContent=text;
    const y=d.querySelector('[data-c="1"]'),n=d.querySelector('[data-c="0"]');y.textContent=ok;y.className="btn "+(danger?"danger":"");d.classList.add("open");n.focus();
    const done=v=>{d.classList.remove("open");y.onclick=n.onclick=null;res(v)};y.onclick=()=>done(true);n.onclick=()=>done(false)})}
document.addEventListener("keydown",e=>{if(e.key==="Escape"){closePop();const d=document.getElementById("cfm");if(d.classList.contains("open"))d.querySelector('[data-c="0"]').click()}if((e.key==="Enter"||e.key===" ")&&e.target.classList&&e.target.classList.contains("tip")){e.preventDefault();e.target.click()}});
function toast(t,ic="check",ms=1900){const e=document.getElementById("toast");e.innerHTML=icon(ic)+"<span>"+t+"</span>";e.classList.add("on");clearTimeout(e._t);e._t=setTimeout(()=>e.classList.remove("on"),ms)}

// ---------- shared blocks ----------
function tourHead(active){
  const k=kelas();
  const tabs=[["turnamen","info","Ringkasan"],["pairing","swap","Pairing"],["klasemen","trophy","Klasemen"],["tabel-silang","grid","Tabel Silang","Silang"],["peserta","users","Peserta"]];
  return `<a class="back" href="index.html">${icon("left")}Semua turnamen</a>
  <div class="card mb">
    <div class="pad">
      <div class="row between nowrap"><h1>${T.name}</h1><div class="row nowrap" style="gap:6px">${pill(T.status)}<button class="btn alt sm" data-act="share">${icon("share")}Bagikan</button></div></div>
      <div class="meta mt2"><span>${icon("cal")}${T.date}</span><span>${icon("pin")}${T.place}</span><span>${icon("list")}${T.sys}</span><span>${icon("org")}${orgName(T)}</span></div>
      <div class="row mt">
        ${T.classes.length>1?`<div class="seg">${T.classes.map((c,i)=>`<a class="${i===k?"on":""}" href="${link(file(active),{kelas:i,babak:null})}">${c.name}</a>`).join("")}</div>`:`<span class="pill acc">${T.classes[0].name}</span>`}
        <div class="input-ic" style="flex:1;max-width:240px;min-width:150px">${icon("search")}<input id="cari" placeholder="Cari nama saya" value="${Q.get("cari")||""}"></div>
      </div>
    </div>
    <nav class="tabs bt">${tabs.map(([p,i,l,s])=>`<a class="${p===active?"on":""}" href="${link(file(p))}">${icon(i)}<span class="dsk">${l}</span><span class="mob">${s||l}</span></a>`).join("")}</nav>
  </div>`;
}
const hit=p=>{const q=(Q.get("cari")||"").toLowerCase();return q&&p.name.toLowerCase().includes(q)};
const pLink=(id,name,withAv)=>{const pl=T.classes[kelas()].players[id],a=`<a class="nm" href="${link("pemain.html",{pid:pl?pl.pid:null,id:null})}">${name}</a>`;return withAv?`<span class="who">${av(name)}${a}</span>`:a};

function openShare(t=T){
  const u=location.href.replace(/[^/]*$/,"")+(t.classes?"turnamen.html?t=":"segera.html?t=")+t.id;
  const o=document.createElement("div");o.className="ovl";
  o.innerHTML=`<div class="popc" role="dialog" aria-modal="true" style="width:min(380px,100%)">
    <div class="row between"><b>Bagikan ${t.name}</b><button class="btn alt sm" data-x>${icon("x")}</button></div>
    <div class="sm mute">Siapa pun bisa membuka link ini tanpa login.</div>
    <input readonly value="${u}" onclick="this.select()" aria-label="Link turnamen">
    <div class="row"><button class="btn acc" style="flex:1" data-cp>${icon("copy")}Salin link</button><a class="btn alt" style="flex:1" href="https://wa.me/?text=${encodeURIComponent("Pairing & klasemen "+t.name+": "+u)}" target="_blank" rel="noopener">${icon("msg")}Kirim ke WA</a></div>
  </div>`;
  o.onclick=e=>{if(e.target===o||e.target.closest("[data-x]"))o.remove();else if(e.target.closest("[data-cp]")){(navigator.clipboard?navigator.clipboard.writeText(u):Promise.reject()).then(()=>toast("Link disalin"),()=>toast("Salin manual dari kolom link","x"));o.remove()}};
  document.body.appendChild(o);
}
function panelTourHead(active,t=T,subTab=""){
  const tabs=[
    ["panel-turnamen","dash","Ringkasan","panel-turnamen.html?t="+t.id],
    ["panel-pemain","users","Peserta","panel-pemain.html?t="+t.id],
    ["panel-babak","flag","Babak & Hasil","panel-babak.html?t="+t.id],
    ["panel-klasemen","trophy","Klasemen","panel-turnamen.html?t="+t.id+"&tab=klasemen"]
  ];
  const cur=subTab==="klasemen"?"panel-klasemen":active;
  return `<div class="card mb">
    <div class="pad row between" style="gap:8px">
      <div class="page-head">
        ${t.classes?(tourPicker(active+".html")||`<b>${t.name}</b>`):`<b>${t.name}</b>`}
        ${pill(t.status)}
      </div>
      <div class="row" style="gap:6px">
        <button class="btn alt sm" data-act="share">${icon("share")}Bagikan</button>
      </div>
    </div>
    <nav class="tabs bt">${tabs.map(([p,i,l,u])=>`<a class="${p===cur?"on":""}" href="${u}">${icon(i)}<span>${l}</span></a>`).join("")}</nav>
  </div>`;
}
// organiser pages: which of my running tournaments am I working on (several can run at once)
function tourPicker(pg){const mine=TOURS.filter(t=>t.classes&&t.org==="ksl"&&t.status!=="done");if(mine.length<2)return "";
  return `<select class="tsel" aria-label="Pilih turnamen" onchange="location.href='${pg}?t='+this.value">${mine.map(t=>`<option value="${t.id}" ${t.id===T.id?"selected":""}>${t.name}</option>`).join("")}</select>`}

// ---------- render loop & events ----------
let renderFn=()=>"";
function render(){document.getElementById("view").innerHTML=renderFn()}
const acts={};
document.addEventListener("click",e=>{
  const el=e.target.closest("[data-act],[data-guide]");if(!el)return;
  if(el.dataset.guide){done[el.dataset.guide]=el.checked;try{localStorage.setItem("ksl-guide",JSON.stringify(done))}catch(_){}renderGuide();return}
  const a=el.dataset.act;
  if(a==="guide")document.getElementById("guide").classList.add("open");
  else if(a==="guide-close")document.getElementById("guide").classList.remove("open");
  else if(a==="device"){const on=document.body.classList.toggle("phone");try{localStorage.setItem("ksl-phone",on?"1":"")}catch(_){}document.querySelectorAll("header,.rail,.bnav,#guide,#shade,#toast,#cfm,#pop").forEach(x=>x.remove());shell()}
  else if(a==="reset")confirm2("Reset data contoh?","Semua hasil, peserta, dan perubahan yang kamu buat di prototype ini akan kembali ke awal. Tidak bisa dibatalkan.","Reset").then(v=>v&&reset());
  else if(a==="logout"){setAuth("");location.href="masuk.html"}
  else if(a==="share"){openShare()}
  else if(a==="tip"){e.preventDefault();openPop(el.dataset.h,el.dataset.t)}
  else if(a==="pop-close")closePop();
  else if(acts[a]){e.preventDefault();acts[a](el);render()}
});
document.addEventListener("input",e=>{if(e.target.id!=="cari")return;const pos=e.target.selectionStart;setParam("cari",e.target.value);render();const f=document.getElementById("cari");f.focus();f.setSelectionRange(pos,pos)});

try{if(localStorage.getItem("ksl-phone"))document.body.classList.add("phone")}catch(e){}
shell();

window.KSL={TITLES,titleBadge,feedback,setFeedback,openFeedback,loggedIn,setAuth,panelTourHead,plan,setPlan,trialLeft,startTrial,pro,tourPicker,resLabel,ratingLog,ratingNow,CLUBS,PLAYERS,clubName,byPid,rupiah,orgName,confirm:confirm2,num,ratingTrack,tieNotes,until,stats,forfeit,tip,copyLink,waHref,pending,setPending,TERMS,TB,av,T,TOURS,icon,standings,curRound,doneRounds,fmt,pill,kelas,qp,link,setParam,tourHead,panelShell:(_,i)=>i,hit,pLink,toast,save,saveMeta,fmtDateRange,score,
  page(fn,actions={}){renderFn=fn;Object.assign(acts,actions);render()},render};
})();
