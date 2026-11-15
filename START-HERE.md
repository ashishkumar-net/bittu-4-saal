# Sir Ashish & Alka (Bittu) — 4 Saal, Ek Pavitr Bandhan
### Poora project, ek hi jagah. Kuch bhi missing nahi.

Yeh folder aapki website ka **complete package** hai — website ka file, uska source code,
71 photos ke thumbnails, gaane ki poori list, screenshots, aur purana version bhi.

---

## 1. Is folder mein kya-kya hai

| Folder / file | Kya hai |
|---|---|
| `index.html` | **Aapki poori website** — ek hi file mein sab kuch (113 KB). Yahi GitHub par daalni hai. |
| `START-HERE.md` | Yahi guide. |
| `build.sh` | `index.html` ko dobara banane ki script (source parts se). |
| `src/` | Website ka **source code** 4 hisson mein — `part-a.html` (design/CSS), `part-b.html` (page ka dhancha), `part-c.js` (data: photos, gaane, shayari, khat), `part-d.js` (saara logic: player, gallery, proposal). |
| `thumbs/` | 71 photos ke chhote versions — isse gallery phone par **bahut fast** khulti hai. (`thumbs/` = badi photo, `thumbs/s/` = grid ke liye chhoti). |
| `mp3/GAANE-KI-LIST.md` | 71 tracks ki list — kaunsa number kaunsa gaana hai. Purane gaane `mp3/01.mp3` … `71.mp3` naam se rakhne ke liye. |
| `data/photo-song-list.csv` | Poori table: number, photo ka naam, gaana, singer, YouTube ID, aur kaise bajega. Excel/Sheets mein khul jayegi. |
| `screenshots/` | Website ke screenshots. |
| `purana-react-version/` | Pehla version (React + Vite). Website ko iski zaroorat nahi — sirf record ke liye. |

---

## 2. Website ko apne computer par kholna (30 second)

1. Folder ko computer par extract karo (right click → Extract All).
2. `index.html` par **double click** karo — browser mein website khul jayegi.
3. Pehli screen par "Enter our world ❤️" dabao — photo aur gaana shuru ho jayega.

> Note: internet chalu hona chahiye, kyunki photos aur gaane online se aate hain.

---

## 3. GitHub Pages par live karna (step by step)

Agar aapki site pehle se GitHub par hai, sirf **step 4 aur 5** karo (file replace + thumbs upload).

1. GitHub par apna repository kholo (`Personal-photo` ya jahan `index.html` rakha hai).
2. **Add file → Upload files** dabao.
3. `index.html` ko drag karo → neeche **Commit changes**.
4. **Settings → Pages** kholo:
   - Source: **Deploy from a branch**
   - Branch: **main**, folder: **/ (root)** → **Save**
   - 1-2 minute baad upar green box mein link milega: `https://<username>.github.io/<repo>/`
5. Link kholo — website live hai. 🎉

### Thumbs (fast loading) upload karna — zaroori nahi, par bahut fayda

1. `thumbs` folder ko **jaisa hai waisa hi** drag karke repo ke root mein upload karo
   (andar `01.webp` … `71.webp` aur ek `s` folder hona chahiye).
2. **Commit changes**.
3. Website khud-ba-khud fast mode use karne lagegi. Agar thumbs upload nahi bhi karo,
   site chalti rahegi — bas photos thodi dheere khulengi.

---

## 4. Photos aur gaane kaise kaam karte hain

- Saari **71 photos** aapke GitHub se aati hain:
  `https://raw.githubusercontent.com/ashishkumar-net/Personal-photo/main/<FILENAME>`
- Har photo ka apna gaana hai. Photo badalte hi gaana badal jaata hai.
- Gaana chalane ka order:
  1. **YouTube** (jis photo ka sahi video ID hai) — bar par `· YouTube` likha aayega
  2. **Aapke mp3** (agar `mp3/01.mp3` jaisi file mil jaye) — `· full song`
  3. **30 second iTunes preview** — `· 30s preview`
  4. **Soft piano** — `· piano`
- Bar ke buttons: Play/Pause, Prev, Next, Mute. Sab YouTube aur local audio dono par kaam karte hain.

### YouTube IDs ki sachchai (zaroor padho)

Aapki di hui list ke 72 IDs maine YouTube se check kiye:

- **40 sahi hain** aur chal rahe hain.
- **26 IDs dead hain** (video hi nahi hai) — un photos par 30s preview bajta hai.
- **5 IDs galat gaane ke hain** (Raanjhanaa → VIKRAM title track, Sab Tera → Illegal Weapon,
  Itni Si Baat Hain → Galti Se Mistake, Ik Vaari Aa → Suno Na Sangemarmar,
  Tujhe Bhula Diya → Rick Astley 😅). Maine ye jaan-boojh kar band rakhe hain —
  galat gaana bajne se behtar hai sahi gaana ka 30s preview.
- Poori list `data/photo-song-list.csv` mein hai: kaunsi photo par kya bajega.

Sahi IDs mil jayein to `src/part-c.js` mein us line ka chautha hissa badal do:
```js
["IMG-20261114-WA0011.jpg","Tum Hi Aana","Arijit Singh","tLqTNckaEUs"],
                                                       ^ yahan naya ID
```
phir `bash build.sh` chalao — naya `index.html` ban jayega.

---

## 5. Apne poore gaane lagana (optional, best quality)

1. Gaane download karo, naam **01.mp3, 02.mp3, … 71.mp3** rakho
   (kaunsa number kaunsa gaana — `mp3/GAANE-KI-LIST.md` dekho).
2. Repo mein `mp3` naam ka folder banao aur saari files upload kar do.
3. Ab jis track ki mp3 milegi, wahan YouTube ki jagah aapka poora gaana bajega.
   (GitHub ki limit: ek file max 100 MB, aur repo public hoga to gaane bhi public honge.)

---

## 6. Code mein badlav karna

Sab data `src/part-c.js` mein hai — photos, gaane, 100 shayari, khat, timeline, reasons.
Design `src/part-a.html` (CSS), dhancha `src/part-b.html`, logic `src/part-d.js`.

Badlav ke baad:
```bash
bash build.sh      # naya index.html ban jayega
```
(Mac/Linux par Terminal, Windows par Git Bash. Ya phir 4 files ko order mein jod do:
`part-a.html + part-b.html + part-c.js + part-d.js`, aur aakhir mein
`</script></body></html>` likh do.)

---

## 7. Screenshots

`screenshots/01-gallery-with-song.png` — gallery, real photo aur neeche music bar
`screenshots/02-hero.png` — homepage ka pehla screen (hero)

---

## 8. Chhoti-chhoti baatein (FAQ)

**Photos nahi dikh rahi?** Internet check karo; aapka photo repo public hona chahiye.
Bahar nikaalo to rose-gold "yaad" placeholder dikhta hai — site kabhi tooti nahi lagti.

**YouTube gaana nahi chala?** Kuch videos par owner ne embedding band rakhi hoti hai.
Site turant 30s preview par chali jaati hai — koi error nahi aata.

**Phone par gaana apne aap nahi bajta?** Browsers pehli tap ke bina awaaz allow nahi karte.
Ek baar "Enter our world" dabao — uske baad sab chalta hai.

**Gallery dheere khulti hai?** `thumbs` folder upload karo (section 3).

**Kuch aur badalna hai?** Mujhe bolo — main code update kar dunga.
