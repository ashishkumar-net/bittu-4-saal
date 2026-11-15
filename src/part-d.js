/* ------------------------------------------------------------------
   APP — Sir Ashish & Alka (Bittu)
   ------------------------------------------------------------------ */
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
const WA = "917800291241";
const wa = (text) => `https://wa.me/${WA}?text=${encodeURIComponent(text)}`;
const store = {
  get(k, f) { try { const v = localStorage.getItem("bittu:" + k); return v ? JSON.parse(v) : f; } catch { return f; } },
  set(k, v) { try { localStorage.setItem("bittu:" + k, JSON.stringify(v)); } catch {} },
};
let toastTimer;
function toast(msg) {
  const t = $("#toast");
  t.textContent = msg;
  t.classList.add("on");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.remove("on"), 2200);
}

/* ---------- THEME ---------- */
const themeBtns = $$(".dot");
function setTheme(t) {
  document.documentElement.dataset.theme = t;
  store.set("theme", t);
  themeBtns.forEach((b) => b.classList.toggle("on", b.dataset.t === t));
  const meta = $('meta[name="theme-color"]');
  if (meta) meta.content = t === "velvet" ? "#1a0b10" : t === "aurora" ? "#07131c" : "#0b1226";
}
themeBtns.forEach((b) => b.addEventListener("click", () => setTheme(b.dataset.t)));
setTheme(store.get("theme", "midnight"));

/* ---------- AMBIENT CANVAS + SPARKLES ---------- */
(function ambientCanvas() {
  const c = $("#fx"), ctx = c.getContext("2d");
  let w = 0, h = 0, dpr = 1, parts = [], raf = 0;
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const palette = () => {
    const t = document.documentElement.dataset.theme;
    return t === "aurora" ? ["#a8e6cf", "#e6a8c4", "#eef7f7"] : t === "velvet" ? ["#f6cfae", "#e6b878", "#e39a86"] : ["#f3c9c1", "#e79b95", "#e6c08a"];
  };
  const heart = (x, y, s, rot) => {
    ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.beginPath();
    for (let t = 0; t <= Math.PI * 2 + 0.1; t += 0.12) {
      const px = 16 * Math.pow(Math.sin(t), 3);
      const py = -(13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t));
      t === 0 ? ctx.moveTo(px * s / 32, py * s / 32) : ctx.lineTo(px * s / 32, py * s / 32);
    }
    ctx.closePath(); ctx.fill(); ctx.restore();
  };
  function resize() {
    dpr = Math.min(devicePixelRatio || 1, 2); w = innerWidth; h = innerHeight;
    c.width = w * dpr; c.height = h * dpr; c.style.width = w + "px"; c.style.height = h + "px";
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const n = reduce ? 10 : w < 640 ? 22 : 44;
    if (!parts.length) parts = Array.from({ length: n }, () => spawn(true));
  }
  function spawn(seed) {
    const isHeart = Math.random() < 0.35;
    return {
      x: Math.random() * w, y: seed ? Math.random() * h : h + 20,
      r: isHeart ? 4 + Math.random() * 8 : 0.8 + Math.random() * 2,
      vy: -(0.1 + Math.random() * 0.3), vx: (Math.random() - 0.5) * 0.2,
      a: 0.15 + Math.random() * 0.45, ph: Math.random() * 6, heart: isHeart,
      rot: Math.random() * 6, col: palette()[Math.floor(Math.random() * 3)],
    };
  }
  function draw() {
    ctx.clearRect(0, 0, w, h);
    parts.forEach((p) => {
      p.ph += 0.01; const a = p.a * (0.6 + Math.sin(p.ph) * 0.4);
      ctx.globalAlpha = a; ctx.fillStyle = p.col;
      ctx.shadowColor = p.col; ctx.shadowBlur = 12;
      if (p.heart) heart(p.x, p.y, p.r * 2.2, p.rot);
      else { ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fill(); }
    });
    ctx.globalAlpha = 1;
  }
  function step() {
    parts.forEach((p) => {
      p.x += p.vx + Math.sin(p.ph) * 0.15; p.y += p.vy; p.rot += 0.003;
      if (p.y < -30) { p.y = h + 20; p.x = Math.random() * w; p.col = palette()[Math.floor(Math.random() * 3)]; }
    });
    draw(); raf = requestAnimationFrame(step);
  }
  resize(); addEventListener("resize", resize);
  if (reduce) draw(); else step();
})();

(function sparkles() {
  const layer = $("#sparkles");
  let last = 0;
  function pop(x, y) {
    const s = document.createElement("i");
    s.className = "spark";
    s.style.left = x + "px"; s.style.top = y + "px";
    s.style.width = s.style.height = 3 + Math.random() * 4 + "px";
    layer.appendChild(s);
    setTimeout(() => s.remove(), 900);
  }
  function onMove(e) {
    const now = performance.now(); if (now - last < 55) return; last = now;
    pop(e.clientX, e.clientY);
  }
  addEventListener("pointermove", onMove, { passive: true });
  addEventListener("touchmove", (e) => { const t = e.touches[0]; if (t) onMove({ clientX: t.clientX, clientY: t.clientY }); }, { passive: true });
})();

/* ---------- SCROLL PROGRESS ---------- */
addEventListener("scroll", () => {
  const max = document.documentElement.scrollHeight - innerHeight;
  $("#progress").style.width = Math.min(100, (scrollY / Math.max(1, max)) * 100) + "%";
}, { passive: true });

/* ---------- TOGETHER COUNTER ---------- */
(function counter() {
  const now = new Date();
  const start = new Date(now.getFullYear() - 4, now.getMonth(), now.getDate(), 21, 0, 0);
  $("#sinceDate").textContent = start.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
  const pad = (n) => String(n).padStart(2, "0");
  function tick() {
    const ms = Math.max(0, Date.now() - start.getTime());
    const d = Math.floor(ms / 864e5), hh = Math.floor(ms / 36e5) % 24, mm = Math.floor(ms / 6e4) % 60, ss = Math.floor(ms / 1e3) % 60;
    $("#cD").textContent = d.toLocaleString("en-IN"); $("#cH").textContent = pad(hh);
    $("#cM").textContent = pad(mm); $("#cS").textContent = pad(ss);
  }
  tick(); setInterval(tick, 1000);
})();

/* ---------- AUDIO ENGINE ---------- */
const audio = new Audio();
audio.preload = "auto";
let previewCache = store.get("itunes", {});
let currentIndex = 0;
let audioMode = "audio"; // audio | ambient | idle
let audioSource = ""; // full | preview | ambient
let muted = false;
let token = 0;
let ambient = null;
let loadingTrack = false;
const localCache = {};

/* ---------- YOUTUBE IFRAME PLAYER ---------- */
const YTP = { player: null, ready: false, errored: false };
function ytLoadAPI() {
  return new Promise((resolve) => {
    if (window.YT && window.YT.Player) return resolve(true);
    const prev = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => { if (typeof prev === "function") prev(); resolve(true); };
    if (!document.querySelector('script[src*="iframe_api"]')) {
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      tag.async = true;
      document.head.appendChild(tag);
    }
    setTimeout(() => resolve(false), 8000);
  });
}
async function ytEnsure() {
  if (YTP.player && YTP.ready) return true;
  await ytLoadAPI();
  if (!(window.YT && window.YT.Player)) return false;
  if (!YTP.player) {
    try {
      YTP.player = new window.YT.Player("ytPlayer", {
        height: "2", width: "2",
        playerVars: { autoplay: 0, controls: 0, disablekb: 1, fs: 0, modestbranding: 1, playsinline: 1, rel: 0, iv_load_policy: 3, origin: location.origin },
        events: {
          onReady: () => { YTP.ready = true; },
          onStateChange: (e) => {
            if (e.data === 0 && audioSource === "youtube") { next(); return; }
            if (e.data === 1) { setBars(true); setStatus("YouTube · " + PHOTOS[currentIndex].song); }
            if (e.data === 2) { setBars(false); setStatus("paused"); }
          },
          onError: () => {
            YTP.errored = true;
            if (audioSource === "youtube") {
              audioSource = "";
              setStatus("YouTube ne mana kiya — preview try kar rahe hain");
              playFallback(PHOTOS[currentIndex], token);
            }
          },
        },
      });
    } catch { return false; }
  }
  const t0 = Date.now();
  while (!YTP.ready && Date.now() - t0 < 6000) await new Promise((r) => setTimeout(r, 120));
  return YTP.ready;
}
function ytState() {
  try { return YTP.player && YTP.ready ? YTP.player.getPlayerState() : -1; } catch { return -1; }
}
async function tryYouTube(item, my) {
  const up = await ytEnsure();
  if (!up || my !== token) return false;
  YTP.errored = false;
  try {
    YTP.player.loadVideoById(item.yt);
    YTP.player.setVolume(muted ? 0 : 75);
    if (muted) YTP.player.mute(); else YTP.player.unMute();
    YTP.player.playVideo();
  } catch { return false; }
  // autoplay block ya dead video — chal pada ya nahi, check karo
  for (let k = 0; k < 16; k++) {
    await new Promise((r) => setTimeout(r, 200));
    if (my !== token) return false;
    if (YTP.errored) return false;
    const st = ytState();
    if (st === 1) {
      // chalu hai — thoda aur dekho ki turant error na aaye
      await new Promise((r) => setTimeout(r, 1200));
      if (YTP.errored) return false;
      return true;
    }
    if (st === 2 || st === 5) return false;
  }
  return false;
}
function ytStop() {
  try { if (YTP.player && YTP.ready) YTP.player.stopVideo(); } catch {}
}
function isPlaying() {
  if (audioSource === "youtube") return ytState() === 1;
  if (audioSource === "ambient") return ambient ? ambient.ctx.state === "running" && ambient.master.gain.value > 0.01 : false;
  return audioMode === "audio" && !audio.paused;
}

/* ---------- FAST PHOTOS (thumbs/01.webp … 71.webp, thumbs/s/…) ---------- */
let thumbMode = false;
const pad2 = (n) => String(n).padStart(2, "0");
const thumbReady = (async () => {
  try {
    const res = await fetch("thumbs/01.webp", { method: "HEAD", cache: "no-store" });
    const type = (res.headers.get("content-type") || "").toLowerCase();
    thumbMode = res.ok && !type.includes("text/html");
  } catch { thumbMode = false; }
})();
function stageSrc(p) { return thumbMode ? `thumbs/${pad2(p.i + 1)}.webp` : p.photo; }
function smallSrc(p) { return thumbMode ? `thumbs/s/${pad2(p.i + 1)}.webp` : p.photo; }
function setPhoto(img, p, kind) {
  img.onerror = () => {
    img.onerror = () => { img.onerror = null; img.src = p.fallback; };
    img.src = p.photo;
  };
  img.loading = kind === "stage" ? "eager" : "lazy";
  img.decoding = "async";
  try { img.fetchPriority = kind === "stage" ? "high" : "low"; } catch {}
  img.src = kind === "small" ? smallSrc(p) : kind === "stage" ? stageSrc(p) : p.photo;
  return img;
}
function preloadNeighbours() {
  [1, -1, 2].forEach((d) => {
    const p = PHOTOS[(currentIndex + d + PHOTOS.length) % PHOTOS.length];
    if (!p) return;
    const im = new Image();
    im.decoding = "async";
    im.src = stageSrc(p);
  });
}

function setBars(on) {
  $("#gBars").classList.toggle("on", on);
  $("#barBars").classList.toggle("on", on);
}
function setStatus(text) { $("#gStatus").textContent = text; }
function updateBarSub() {
  const tag = audioSource === "youtube" ? " · YouTube" : audioSource === "full" ? " · full song" : audioSource === "preview" ? " · 30s preview" : audioSource === "ambient" ? " · piano" : "";
  $("#barSub").textContent = `track ${String(currentIndex + 1).padStart(2, "0")} / ${PHOTOS.length}${tag}`;
}

/* ---------- local full songs (mp3/01.mp3 … mp3/71.mp3) ---------- */
function localNames(item) {
  const n = item.i + 1;
  const names = [];
  if (SONG_FILES[n]) names.push(SONG_FILES[n]);
  names.push(`${String(n).padStart(2, "0")}.mp3`);
  return names;
}
async function findLocal(item) {
  const n = item.i + 1;
  if (n in localCache) return localCache[n];
  for (const name of localNames(item)) {
    const url = "mp3/" + encodeURIComponent(name);
    try {
      const res = await fetch(url, { method: "HEAD", cache: "no-store" });
      const type = (res.headers.get("content-type") || "").toLowerCase();
      if (res.ok && !type.includes("text/html")) { localCache[n] = url; return url; }
    } catch {}
  }
  localCache[n] = null;
  return null;
}

async function tryPlayAudio(src, label) {
  stopAmbient();
  audio.src = src;
  audio.volume = muted ? 0 : 0.9;
  try {
    await audio.play();
    audioMode = "audio"; setBars(true); setStatus(label);
    return true;
  } catch {
    // browser blocked sound -> retry muted, else give up
    try {
      audio.muted = true;
      await audio.play();
      muted = true; updateMuteUI();
      audioMode = "audio"; setBars(true); setStatus(label + " · sound off");
      return true;
    } catch { return false; }
  }
}

async function findPreview(query) {
  const key = query.toLowerCase();
  if (key in previewCache) return previewCache[key];
  const url = `https://itunes.apple.com/search?term=${encodeURIComponent(query)}&entity=song&limit=1&country=IN`;
  try {
    const ctl = new AbortController();
    const t = setTimeout(() => ctl.abort(), 7000);
    const res = await fetch(url, { signal: ctl.signal });
    clearTimeout(t);
    const data = await res.json();
    const p = data && data.results && data.results[0] ? data.results[0].previewUrl : null;
    previewCache[key] = p;
    store.set("itunes", previewCache);
    return p;
  } catch {
    previewCache[key] = null;
    return null;
  }
}

/* soft piano / pad fallback via Web Audio API */
function startAmbient() {
  try {
    if (!ambient) {
      const Ctx = window.AudioContext || window.webkitAudioContext;
      if (!Ctx) return false;
      const ctx = new Ctx();
      const master = ctx.createGain();
      master.gain.value = 0.0001;
      master.connect(ctx.destination);
      const filter = ctx.createBiquadFilter();
      filter.type = "lowpass"; filter.frequency.value = 1400;
      filter.connect(master);
      const notes = [261.63, 329.63, 392.0, 493.88, 587.33];
      const voices = notes.map((f, i) => {
        const o = ctx.createOscillator();
        o.type = i % 2 ? "sine" : "triangle";
        o.frequency.value = f;
        const g = ctx.createGain(); g.gain.value = 0.12 / (i + 1);
        o.connect(g); g.connect(filter); o.start();
        return { o, g, f };
      });
      ambient = { ctx, master, voices, timer: 0, step: 0 };
      const chords = [[0, 2, 4], [1, 3, 0], [2, 4, 1], [0, 3, 4]];
      ambient.timer = setInterval(() => {
        ambient.step = (ambient.step + 1) % chords.length;
        const chord = chords[ambient.step];
        ambient.voices.forEach((v, i) => {
          const on = chord.includes(i);
          v.g.gain.setTargetAtTime(on ? 0.11 / (i + 1) : 0.01, ambient.ctx.currentTime, 0.8);
        });
      }, 5200);
    }
    if (ambient.ctx.state === "suspended") ambient.ctx.resume();
    ambient.master.gain.setTargetAtTime(muted ? 0.0001 : 0.22, ambient.ctx.currentTime, 1.2);
    audioMode = "ambient";
    setBars(true);
    setStatus("soft instrumental · piano");
    return true;
  } catch { return false; }
}
function stopAmbient() {
  if (!ambient) return;
  try { ambient.master.gain.setTargetAtTime(0.0001, ambient.ctx.currentTime, 0.4); } catch {}
}

async function playPhoto(i, { user = false } = {}) {
  currentIndex = ((i % PHOTOS.length) + PHOTOS.length) % PHOTOS.length;
  const item = PHOTOS[currentIndex];
  await thumbReady;
  renderGallery();
  const my = ++token;
  setStatus("gaana dhoond raha hoon…");
  setBars(false);
  stopAmbient();
  loadingTrack = true;
  try { audio.pause(); } catch {}

  // 1) YouTube (is photo ka apna gaana), 2) apna mp3 folder,
  // 3) iTunes 30s preview, 4) soft piano
  if (item.yt) {
    const okYT = await tryYouTube(item, my);
    if (my !== token) return;
    if (okYT) { loadingTrack = false; audioSource = "youtube"; updateBarSub(); return; }
    ytStop();
  }
  await playFallback(item, my);
}

async function playFallback(item, my) {
  const local = await findLocal(item);
  if (my !== token) return;
  if (local && (await tryPlayAudio(local, "poora gaana · full track"))) {
    if (my !== token) return;
    loadingTrack = false;
    audioSource = "full"; updateBarSub();
    return;
  }
  if (my !== token) return;

  const src = await findPreview(item.query);
  if (my !== token) return;
  if (!src) {
    loadingTrack = false;
    audioSource = "ambient"; updateBarSub();
    startAmbient();
    return;
  }
  if (await tryPlayAudio(src, "30s preview · iTunes")) {
    if (my !== token) return;
    loadingTrack = false;
    audioSource = "preview"; updateBarSub();
    return;
  }
  if (my !== token) return;
  loadingTrack = false;
  audioSource = "ambient"; updateBarSub();
  startAmbient();
}
audio.addEventListener("ended", () => {
  loadingTrack = false;
  if (audioSource === "full") { next(); return; } // poora gaana khatam -> agla gaana
  startAmbient();
});
audio.addEventListener("error", () => { if (audio.src && !loadingTrack) startAmbient(); });

function togglePlay() {
  if (audioSource === "youtube" && YTP.player && YTP.ready) {
    const st = ytState();
    if (st === 1) { YTP.player.pauseVideo(); setBars(false); setStatus("paused"); }
    else { YTP.player.playVideo(); setBars(true); setStatus("YouTube · " + PHOTOS[currentIndex].song); }
    renderGallery();
    return;
  }
  if (audioMode === "audio" && audio.src) {
    if (audio.paused) { audio.play().then(() => { setBars(true); setStatus("abhi baj raha hai"); }).catch(() => startAmbient()); }
    else { audio.pause(); setBars(false); setStatus("paused"); }
    return;
  }
  if (audioMode === "ambient") {
    if (ambient && ambient.ctx.state === "running" && ambient.master.gain.value > 0.01) {
      ambient.master.gain.setTargetAtTime(0.0001, ambient.ctx.currentTime, 0.3);
      setBars(false); setStatus("paused");
    } else { startAmbient(); }
    return;
  }
  playPhoto(currentIndex);
}
function prev() { playPhoto(currentIndex - 1); }
function next() { playPhoto(currentIndex + 1); }
function updateMuteUI() {
  const icon = muted ? "🔇" : "🔊";
  $("#gMute").textContent = icon; $("#barMute").textContent = icon;
  audio.volume = muted ? 0 : 0.85;
  audio.muted = muted;
  if (ambient) { try { ambient.master.gain.setTargetAtTime(muted ? 0.0001 : 0.22, ambient.ctx.currentTime, 0.3); } catch {} }
  if (YTP.player && YTP.ready) { try { muted ? YTP.player.mute() : YTP.player.unMute(); } catch {} }
}
function toggleMute() { muted = !muted; updateMuteUI(); }

/* ---------- GALLERY ---------- */
const favs = new Set(store.get("favs", []));
let favOnly = false;

function photoSet() {
  return favOnly ? PHOTOS.filter((p) => favs.has(p.file)) : PHOTOS;
}
function renderGallery() {
  const item = PHOTOS[currentIndex];
  const img = $("#gImg");
  setPhoto(img, item, "stage");
  img.alt = `${item.label} — ${item.song}`;
  $("#gCount").textContent = `${item.label} · ${currentIndex + 1}/${PHOTOS.length}`;
  $("#gSong").textContent = item.song;
  $("#gTrack").textContent = `Track ${String(currentIndex + 1).padStart(2, "0")} / ${PHOTOS.length} · ${item.artist}`;
  $("#gCaption").textContent = CAPTIONS[currentIndex] ? "“" + CAPTIONS[currentIndex] + "”" : "";
  $("#gFav").textContent = favs.has(item.file) ? "♥" : "♡";
  $("#gFav").style.color = favs.has(item.file) ? "var(--rose)" : "";
  $("#barTitle").textContent = item.song;
  updateBarSub();
  const playing = isPlaying();
  $("#barPlay").textContent = playing ? "❚❚" : "▶";
  $("#gPlay").textContent = playing ? "❚❚" : "▶";
  renderStrip();
  preloadNeighbours();
}
function renderStrip() {
  const strip = $("#strip");
  const start = Math.max(0, currentIndex - 3);
  const list = PHOTOS.slice(start, start + 9);
  strip.innerHTML = "";
  list.forEach((p) => {
    const b = document.createElement("button");
    b.className = p.i === currentIndex ? "on" : "";
    b.setAttribute("aria-label", `${p.label} — ${p.song}`);
    const im = setPhoto(document.createElement("img"), p, "small");
    im.alt = "";
    b.appendChild(im);
    b.onclick = () => playPhoto(p.i);
    strip.appendChild(b);
  });
}

/* grid modal */
let gridBuilt = false;
function buildGrid() {
  if (gridBuilt) return;
  gridBuilt = true;
  const g = $("#grid");
  const frag = document.createDocumentFragment();
  PHOTOS.forEach((p) => {
    const b = document.createElement("button");
    b.dataset.i = p.i;
    b.innerHTML = `<span class="num">${String(p.i + 1).padStart(2, "0")}</span>`;
    const im = setPhoto(document.createElement("img"), p, "small");
    im.alt = p.label;
    b.prepend(im);
    b.onclick = () => { closeModals(); playPhoto(p.i); };
    frag.appendChild(b);
  });
  g.appendChild(frag);
  $("#gridCount").textContent = PHOTOS.length;
  $("#gridCount2").textContent = PHOTOS.length;
  markGrid();
}
function markGrid() {
  $$("#grid button").forEach((b) => b.classList.toggle("on", Number(b.dataset.i) === currentIndex));
}
function openGrid() { buildGrid(); markGrid(); $("#gridModal").classList.add("open"); document.body.style.overflow = "hidden"; }
function closeModals() {
  ["#gridModal", "#lightbox", "#movie", "#envModal"].forEach((s) => $(s).classList.remove("open"));
  document.body.style.overflow = "";
}

/* ---------- LIGHTBOX ---------- */
function openLightbox() {
  const p = PHOTOS[currentIndex];
  const img = $("#lbImg");
  img.onerror = () => { img.onerror = null; img.src = p.fallback; };
  img.src = p.photo;
  img.classList.remove("zoom");
  $("#lbTrack").textContent = `${p.label} · ${currentIndex + 1}/${PHOTOS.length}`;
  $("#lbSong").textContent = p.song;
  $("#lbCaption").textContent = CAPTIONS[currentIndex] ? "“" + CAPTIONS[currentIndex] + "”" : `${p.song} — ${p.artist}`;
  $("#lightbox").classList.add("open");
  document.body.style.overflow = "hidden";
}
$("#lbImg").addEventListener("click", (e) => e.currentTarget.classList.toggle("zoom"));

/* ---------- MOVIE MODE ---------- */
let movieTimer = 0;
let movieIndex = 0;
function openMovie() {
  movieIndex = currentIndex;
  $("#movie").classList.add("open");
  document.body.style.overflow = "hidden";
  movieStep();
  clearInterval(movieTimer);
  movieTimer = setInterval(movieStep, 9000);
}
function movieStep() {
  const i = movieIndex % PHOTOS.length;
  const p = PHOTOS[i];
  const img = $("#movieImg");
  img.onerror = () => {
    img.onerror = () => { img.onerror = null; img.src = p.fallback; };
    img.src = p.photo;
  };
  img.src = stageSrc(p);
  img.style.animation = "none"; void img.offsetWidth; img.style.animation = "ken 9s ease-in-out both";
  $("#movieSong").textContent = p.song;
  $("#movieMeta").textContent = `${p.label} · ${i + 1} / ${PHOTOS.length} · ${p.artist}`;
  playPhoto(i);
  movieIndex = (i + 1) % PHOTOS.length;
}
function closeMovie() { clearInterval(movieTimer); $("#movie").classList.remove("open"); document.body.style.overflow = ""; }

/* ---------- TIMELINE / PLACES / FIRSTS / QUIZ ---------- */
(function renderStatic() {
  $("#timeline").innerHTML = TIMELINE.map(([n, t, w, d]) => `
    <div class="tl-item"><div class="tl-dot">${n}</div>
      <div class="glass tl-body"><span class="when">${w}</span><h4>${t}</h4><p>${d}</p></div></div>`).join("");
  $("#firsts").innerHTML = FIRSTS.map(([t, d]) => `
    <div class="glass mini"><span class="tag">pehli baar</span><h4>${t}</h4><p>${d}</p></div>`).join("");
  $("#vows").innerHTML = VOWS.map(([t, d], i) => `
    <p class="check" style="display:block"><b style="color:var(--gold);font-family:var(--serif);font-size:15px">${i + 1}. ${t}</b><br><span style="font-size:12.5px;color:var(--ink-dim)">${d}</span></p>`).join("");
  $("#bucket").innerHTML = BUCKET.map((b, i) => `
    <label class="check"><input type="checkbox" data-b=${i} ${store.get("bucket", {})[i] ? "checked" : ""}><span>${b}</span></label>`).join("");
  $$("#bucket input").forEach((cb) => cb.addEventListener("change", () => {
    const s = store.get("bucket", {}); s[cb.dataset.b] = cb.checked; store.set("bucket", s);
    if (cb.checked) toast("ek aur sapna list mein ✦");
  }));
  $("#moods").innerHTML = MOODS.map((m, i) => `<button class="mood" data-m="${i}">${m}</button>`).join("");
  $$(".mood").forEach((b) => b.addEventListener("click", () => {
    $$(".mood").forEach((x) => x.classList.remove("on")); b.classList.add("on");
    $("#moodNote").textContent = "noted. jo bhi ho, main samajhta hoon. 🤍";
    toast("mood save ho gaya");
  }));
  $("#envGrid").innerHTML = ENVELOPES.map(([title], i) => `
    <button class="env" data-e="${i}"><span class="seal">✦</span><h4>${title}</h4><p>tap to open</p></button>`).join("");
  $$(".env").forEach((b) => b.addEventListener("click", () => {
    const [title, body] = ENVELOPES[Number(b.dataset.e)];
    $("#envTitle").textContent = title; $("#envBody").textContent = body;
    $("#envModal").classList.add("open"); document.body.style.overflow = "hidden";
  }));
  $$(".pin").forEach((pin) => pin.addEventListener("click", () => {
    const [t, d] = PLACES[Number(pin.dataset.place)];
    $("#placeNote").innerHTML = `<h4>${t}</h4><p>${d}</p>`;
    $$(".pin").forEach((p) => p.classList.remove("on")); pin.classList.add("on");
  }));
})();

/* quiz */
(function quiz() {
  const root = $("#quiz");
  root.innerHTML = QUIZ.map(([q, opts], qi) => `
    <div class="q"><h4>${qi + 1}. ${q}</h4><div class="opts">${opts.map((o, oi) => `
      <button class="opt" data-q="${qi}" data-o="${oi}">${o}</button>`).join("")}</div></div>`).join("") +
    `<p class="quiz-result" id="quizResult">0 / ${QUIZ.length} sahi — par pyaar mein score nahi hota. 🤍</p>`;
  const score = new Array(QUIZ.length).fill(null);
  $$(".opt", root).forEach((b) => b.addEventListener("click", () => {
    const qi = Number(b.dataset.q), oi = Number(b.dataset.o);
    const right = QUIZ[qi][2];
    score[qi] = oi === right;
    $$(`.opt[data-q="${qi}"]`, root).forEach((x) => x.classList.remove("ok", "no"));
    b.classList.add(oi === right ? "ok" : "no");
    if (oi !== right) $(`.opt[data-q="${qi}"][data-o="${right}"]`, root).classList.add("ok");
    const got = score.filter(Boolean).length;
    $("#quizResult").textContent = `${got} / ${QUIZ.length} sahi — par pyaar mein score nahi hota. 🤍`;
  }));
})();

/* letter typewriter */
const LETTER = `Aaj jab peeche mud kar dekhta hoon, toh lagta hai jaise kal hi ki baat ho jab hamara ye safar shuru hua tha. In chaar saalon mein humne kitne hi mausam dekhe, kitni hi baatein ki, aur kitne hi pal bitaye jo meri zindagi ki sabse keemti daulat hain.

Chahe woh mandir ki shanti mein saath baithna ho, ya pahadiyon ki hawa mein ghanton baatein karna, ya phir har mushkil waqt mein ek doosre ki fikar karna — mere liye har ek lamha bilkul saccha aur pavitr tha.

Maine jab bhi tumhari fikar ki, jab bhi tumhari safety aur khushi ke liye socha, woh sirf isliye kyunki tum mere liye sirf ek insaan nahi, meri poori duniya thi. Maine hamesha yahi chaha ki tumhare chehre par kabhi koi udasi na aaye.

Aur agar kabhi meri baaton se, mere gusse se ya meri zid se tumhe dukh pahuncha — toh uske liye main sach mein maafi maangta hoon. Koi bahana nahi, koi shart nahi. Bas itna ki tumhare hisse mein sirf sukoon aaye.

Waqt aur halaat chahe jahan bhi le jayein, ek baat hamesha sach rahegi — Ashish ne apni poori wafadari, izzat aur sachhe dil se sirf apni Bittu ko chaaha tha.`;
(function letter() {
  const el = $("#letterBody");
  el.textContent = LETTER;
  let timer = 0;
  $("#typeBtn").addEventListener("click", () => {
    clearInterval(timer);
    const full = LETTER; let i = 0;
    el.textContent = "";
    timer = setInterval(() => {
      i += 3; el.textContent = full.slice(0, i);
      if (i >= full.length) { clearInterval(timer); el.textContent = full; }
    }, 16);
  });
})();

/* reasons jar */
(function reasons() {
  let last = -1;
  const show = () => {
    let n = Math.floor(Math.random() * REASONS.length);
    if (n === last) n = (n + 1) % REASONS.length;
    last = n;
    const el = $("#reasonText");
    el.style.opacity = 0;
    setTimeout(() => { el.textContent = "“" + REASONS[n] + "”"; el.style.transition = "opacity .4s"; el.style.opacity = 1; }, 120);
  };
  $("#reasonBtn").addEventListener("click", show);
})();

/* ---------- SHAYARI VAULT ---------- */
let shFilter = "all", shQuery = "", shList = [], shIndex = 0;
const shFavs = new Set(store.get("shFavs", []));
function buildShayariCats() {
  $("#shayariCats").innerHTML = SHAYARI_CATS.map((c) => `
    <button class="chip ${c.key === "all" ? "on" : ""}" data-c="${c.key}">${c.icon} ${c.label}</button>`).join("");
  $$("#shayariCats .chip").forEach((b) => b.addEventListener("click", () => {
    shFilter = b.dataset.c;
    $$("#shayariCats .chip").forEach((x) => x.classList.toggle("on", x === b));
    refilter();
  }));
}
function refilter() {
  const q = shQuery.trim().toLowerCase();
  shList = SHAYARIS.filter((s) => (shFilter === "all" || s.c === shFilter) && (!q || s.v.toLowerCase().includes(q)));
  shIndex = 0;
  renderShayari();
}
function renderShayari() {
  if (!shList.length) {
    $("#shVerse").textContent = "Is filter mein kuch nahi mila — koi baat nahi, dil ki baat filter mein nahi aati.";
    $("#shNum").textContent = "0 / 0"; $("#shBack").textContent = "";
    return;
  }
  const s = shList[shIndex];
  const cat = SHAYARI_CATS.find((c) => c.key === s.c);
  $("#shCat").textContent = `${cat.icon} ${cat.label}`;
  $("#shNum").textContent = `${String(shIndex + 1).padStart(2, "0")} / ${String(shList.length).padStart(2, "0")}`;
  $("#shVerse").textContent = s.v;
  $("#shBack").textContent = "Yeh shayari shikayat nahi, izzat hai. Tumhara faisla tumhara — meri dua meri.";
  $("#shMeta").textContent = `${shList.length} shayari ${shFilter === "all" ? "" : "· " + cat.label}`;
  $("#shFav").textContent = shFavs.has(s.v) ? "♥ Saved" : "♡ Save";
  $("#shWa").href = wa(s.v + "\n\n— Sir Ashish");
  $("#flip").classList.remove("flipped");
}
buildShayariCats(); refilter();
$("#shayariSearch").addEventListener("input", (e) => { shQuery = e.target.value; refilter(); });
$("#shNext").addEventListener("click", () => { if (!shList.length) return; shIndex = (shIndex + 1) % shList.length; renderShayari(); });
$("#shPrev").addEventListener("click", () => { if (!shList.length) return; shIndex = (shIndex - 1 + shList.length) % shList.length; renderShayari(); });
$("#flip").addEventListener("click", () => $("#flip").classList.toggle("flipped"));
$("#shCopy").addEventListener("click", async () => {
  if (!shList.length) return;
  const text = shList[shIndex].v + "\n\n— Sir Ashish";
  try { await navigator.clipboard.writeText(text); toast("shayari copy ho gayi 🤍"); }
  catch { toast("copy nahi hua — select karke copy karo"); }
});
$("#shFav").addEventListener("click", () => {
  if (!shList.length) return;
  const v = shList[shIndex].v;
  if (shFavs.has(v)) shFavs.delete(v); else shFavs.add(v);
  store.set("shFavs", Array.from(shFavs));
  renderShayari();
});

/* ---------- HOLD TO UNLOCK ---------- */
(function hold() {
  const btn = $("#holdBtn"), ring = $("#holdRing"), card = $("#proposalCard");
  const LEN = 2 * Math.PI * 72;
  ring.style.strokeDasharray = LEN;
  let start = 0, raf = 0, holding = false;
  function frame() {
    const p = Math.min(1, (performance.now() - start) / 3000);
    ring.style.strokeDashoffset = String(LEN * (1 - p));
    if (p >= 1) { finish(); return; }
    raf = requestAnimationFrame(frame);
  }
  function finish() {
    holding = false; cancelAnimationFrame(raf);
    ring.style.strokeDashoffset = "0";
    btn.classList.add("done");
    $("#holdHint").textContent = "haath pakad liya 🤝 — ab neeche padho";
    card.classList.add("open");
    burst(window.innerWidth / 2, window.innerHeight * 0.55, 60);
    card.scrollIntoView({ behavior: "smooth", block: "center" });
    setTimeout(() => { ring.style.strokeDashoffset = String(LEN); btn.classList.remove("done"); }, 2600);
  }
  function cancel() {
    if (!holding) return;
    holding = false; cancelAnimationFrame(raf);
    ring.style.strokeDashoffset = String(LEN);
    $("#holdHint").textContent = "tap & hold karo";
  }
  const down = (e) => {
    e.preventDefault(); holding = true; start = performance.now();
    $("#holdHint").textContent = "pakde raho… 3 second";
    raf = requestAnimationFrame(frame);
  };
  btn.addEventListener("pointerdown", down);
  ["pointerup", "pointerleave", "pointercancel"].forEach((ev) => btn.addEventListener(ev, cancel));
  btn.addEventListener("keydown", (e) => { if (e.key === " " || e.key === "Enter") down(e); });
  btn.addEventListener("keyup", cancel);
})();

/* yes / talk / time */
$("#yesBtn").addEventListener("click", () => {
  burst(window.innerWidth / 2, window.innerHeight * 0.6, 140);
  setTimeout(() => burst(window.innerWidth * 0.2, window.innerHeight * 0.7, 80), 350);
  setTimeout(() => burst(window.innerWidth * 0.8, window.innerHeight * 0.7, 80), 700);
  toast("WhatsApp khul raha hai… 🤍");
});
$("#timeBtn").addEventListener("click", () => {
  $("#reassure").classList.toggle("on");
});
$("#sendHeart").addEventListener("click", () => {
  const text = $("#heartText").value.trim();
  if (!text) { toast("pehle kuch likho, Bittu 🤍"); $("#heartText").focus(); return; }
  window.open(wa(text + "\n\n— Alka"), "_blank", "noopener");
});

/* ---------- CONFETTI ---------- */
const confetti = $("#confetti");
const cctx = confetti.getContext("2d");
let cparts = [], craf = 0;
function sizeConfetti() {
  const dpr = Math.min(devicePixelRatio || 1, 2);
  confetti.width = innerWidth * dpr; confetti.height = innerHeight * dpr;
  confetti.style.width = innerWidth + "px"; confetti.style.height = innerHeight + "px";
  cctx.setTransform(dpr, 0, 0, dpr, 0, 0);
}
function burst(x, y, n) {
  confetti.classList.add("on");
  sizeConfetti();
  const colors = ["#f3c9c1", "#e79b95", "#e6c08a", "#f6eee6", "#a8e6cf"];
  for (let i = 0; i < n; i++) {
    const a = -Math.PI / 2 + (Math.random() - 0.5) * 1.9;
    const sp = 6 + Math.random() * 9;
    cparts.push({ x, y, vx: Math.cos(a) * sp, vy: Math.sin(a) * sp, g: 0.16, life: 1, s: 5 + Math.random() * 9, c: colors[i % colors.length], rot: Math.random() * 6, vr: (Math.random() - 0.5) * 0.3, heart: Math.random() < 0.35 });
  }
  if (!craf) craf = requestAnimationFrame(stepConfetti);
}
function stepConfetti() {
  cctx.clearRect(0, 0, innerWidth, innerHeight);
  cparts = cparts.filter((p) => p.life > 0);
  cparts.forEach((p) => {
    p.vy += p.g; p.x += p.vx; p.y += p.vy; p.rot += p.vr; p.life -= 0.006;
    cctx.save(); cctx.translate(p.x, p.y); cctx.rotate(p.rot); cctx.globalAlpha = Math.max(0, p.life);
    cctx.fillStyle = p.c;
    if (p.heart) {
      cctx.beginPath();
      for (let t = 0; t <= Math.PI * 2 + 0.1; t += 0.15) {
        const px = 16 * Math.pow(Math.sin(t), 3);
        const py = -(13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t));
        t === 0 ? cctx.moveTo(px * p.s / 32, py * p.s / 32) : cctx.lineTo(px * p.s / 32, py * p.s / 32);
      }
      cctx.fill();
    } else {
      cctx.fillRect(-p.s / 2, -p.s / 4, p.s, p.s / 2);
    }
    cctx.restore();
  });
  if (cparts.length) craf = requestAnimationFrame(stepConfetti);
  else { craf = 0; confetti.classList.remove("on"); cctx.clearRect(0, 0, innerWidth, innerHeight); }
}

/* ---------- THEN vs NOW ---------- */
(function compare() {
  const a = PHOTOS[0], b = PHOTOS[PHOTOS.length - 1];
  const ta = $("#thenImg"), nb = $("#nowImg");
  ta.onerror = () => { ta.onerror = null; ta.src = a.fallback; }; ta.src = a.photo;
  nb.onerror = () => { nb.onerror = null; nb.src = b.fallback; }; nb.src = b.photo;
  const now = $(".compare .now"), handle = $(".compare .handle");
  $("#compareRange").addEventListener("input", (e) => {
    const v = Number(e.target.value);
    now.style.clipPath = `inset(0 0 0 ${v}%)`;
    handle.style.left = v + "%";
  });
})();

/* ---------- FAVOURITES ---------- */
$("#gFav").addEventListener("click", () => {
  const f = PHOTOS[currentIndex].file;
  if (favs.has(f)) favs.delete(f); else favs.add(f);
  store.set("favs", Array.from(favs));
  renderGallery();
  toast(favs.has(f) ? "favourite mein add ho gayi ♥" : "favourite se hata diya");
});
$("#favFilterBtn").addEventListener("click", () => {
  favOnly = !favOnly;
  $("#favFilterBtn").textContent = favOnly ? "♡ Sab dekho" : "♡ Favourites";
  if (favOnly && !favs.size) { favOnly = false; $("#favFilterBtn").textContent = "♡ Favourites"; toast("abhi koi favourite nahi — ♡ dabao"); return; }
  if (favOnly) {
    const first = PHOTOS.findIndex((p) => favs.has(p.file));
    if (first >= 0) playPhoto(first);
    toast(`${favs.size} favourite yaadein`);
  }
});

/* ---------- WIRING ---------- */
$("#gPlay").addEventListener("click", togglePlay);
$("#barPlay").addEventListener("click", togglePlay);
$("#gPrev").addEventListener("click", prev);
$("#barPrev").addEventListener("click", prev);
$("#gNext").addEventListener("click", next);
$("#barNext").addEventListener("click", next);
$("#gMute").addEventListener("click", toggleMute);
$("#barMute").addEventListener("click", toggleMute);
$("#gImg").addEventListener("click", openLightbox);
$("#lbClose").addEventListener("click", closeModals);
$("#lbPrev").addEventListener("click", () => { prev(); openLightbox(); });
$("#lbNext").addEventListener("click", () => { next(); openLightbox(); });
$("#gridBtn2").addEventListener("click", openGrid);
$("#gGridBtn").addEventListener("click", openGrid);
$("#gridClose").addEventListener("click", closeModals);
$("#movieBtn").addEventListener("click", openMovie);
$("#movieClose").addEventListener("click", closeMovie);
$("#randomBtn").addEventListener("click", () => { playPhoto(Math.floor(Math.random() * PHOTOS.length)); toast("ek random yaad 🎲"); });
$("#envClose").addEventListener("click", closeModals);
$$(".grid-modal, .lightbox, .modal").forEach((m) => m.addEventListener("click", (e) => { if (e.target === m) closeModals(); }));
addEventListener("keydown", (e) => {
  if (e.key === "Escape") { closeModals(); closeMovie(); }
  if ($("#gridModal").classList.contains("open") || $("#lightbox").classList.contains("open")) {
    if (e.key === "ArrowRight") { next(); if ($("#lightbox").classList.contains("open")) openLightbox(); markGrid(); }
    if (e.key === "ArrowLeft") { prev(); if ($("#lightbox").classList.contains("open")) openLightbox(); markGrid(); }
  }
});
$("#easterBtn").addEventListener("click", () => $("#easterNote").classList.toggle("on"));

/* ---------- SONG SEARCH (jump to any of the 71) ---------- */
const songSearch = $("#songSearch");
const songResults = $("#songResults");
let sjHits = [];
let sjActive = -1;

const norm = (s) => s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

function searchSongs(q) {
  const nq = norm(q.trim());
  if (!nq) return [];
  const head = [], rest = [];
  PHOTOS.forEach((p) => {
    const song = norm(p.song), hay = `${song} ${norm(p.artist)} ${norm(p.label)} ${pad2(p.i + 1)}`;
    if (song.startsWith(nq)) head.push(p);
    else if (hay.includes(nq)) rest.push(p);
  });
  return head.concat(rest).slice(0, 8);
}

function renderSongResults() {
  const q = songSearch.value;
  sjHits = searchSongs(q);
  sjActive = -1;
  songResults.innerHTML = "";
  if (!q.trim()) { songResults.hidden = true; $("#songClear").hidden = true; return; }
  $("#songClear").hidden = false;
  if (!sjHits.length) {
    songResults.innerHTML = '<div class="sj-empty">koi gaana nahi mila — spelling check karo</div>';
    songResults.hidden = false;
    return;
  }
  sjHits.forEach((p) => {
    const b = document.createElement("button");
    b.type = "button";
    b.innerHTML = `<span class="n">${pad2(p.i + 1)}</span><span>${p.song} <span class="a">· ${p.artist}</span></span>`;
    b.addEventListener("click", () => jumpToSong(p));
    songResults.appendChild(b);
  });
  songResults.hidden = false;
}

function jumpToSong(p) {
  songResults.hidden = true;
  songSearch.value = "";
  $("#songClear").hidden = true;
  songSearch.blur();
  playPhoto(p.i, { user: true });
  toast(`${p.label} · ${p.song}`);
}

songSearch.addEventListener("input", renderSongResults);
songSearch.addEventListener("focus", () => { if (songSearch.value.trim()) renderSongResults(); });
songSearch.addEventListener("keydown", (e) => {
  const btns = Array.from(songResults.querySelectorAll("button"));
  if (e.key === "ArrowDown" || e.key === "ArrowUp") {
    if (!sjHits.length) return;
    e.preventDefault();
    sjActive = (sjActive + (e.key === "ArrowDown" ? 1 : -1) + sjHits.length) % sjHits.length;
    btns.forEach((b, k) => b.classList.toggle("on", k === sjActive));
    if (btns[sjActive]) btns[sjActive].scrollIntoView({ block: "nearest" });
  } else if (e.key === "Enter") {
    if (!sjHits.length) return;
    e.preventDefault();
    jumpToSong(sjHits[sjActive >= 0 ? sjActive : 0]);
  } else if (e.key === "Escape") {
    songResults.hidden = true;
    songSearch.blur();
  }
});
$("#songClear").addEventListener("click", () => {
  songSearch.value = "";
  songResults.hidden = true;
  $("#songClear").hidden = true;
  songSearch.focus();
});
document.addEventListener("click", (e) => {
  if (!e.target.closest(".song-jump")) songResults.hidden = true;
});

/* ---------- ENTRY ---------- */
$("#enterBtn").addEventListener("click", async () => {
  $("#enter").classList.add("gone");
  document.body.style.overflow = "";
  $("#audiobar").classList.add("on");
  await playPhoto(0, { user: true });
  setTimeout(() => { if (audioMode === "audio" && audio.paused) startAmbient(); }, 2500);
});
$("#enter").addEventListener("click", (e) => { if (e.target.id === "enter") $("#enterBtn").click(); });
document.body.style.overflow = "hidden";

thumbReady.then(() => { renderGallery(); preloadNeighbours(); });
updateMuteUI();
setTimeout(() => { $("#gPlay").textContent = "▶"; }, 0);
