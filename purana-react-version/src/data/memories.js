import {
  Sparkles,
  Flame,
  Mountain,
  Sunset,
  HandHeart,
  Infinity as InfinityIcon,
} from 'lucide-react'

// Photo slots for Sir Ashish & Alka (Bittu):
// drop "01.jpg" … "06.jpg" into public/photos/ and they appear automatically.
// Agar koi photo missing ho, elegant placeholder dikh jayega — kuch tootega nahi.
export const memories = [
  {
    id: 1,
    chapter: 'Chapter 01 · Pehla Saal',
    date: 'Saal ek · shuruaat',
    place: 'Jahan hamari kahani shuru hui',
    title: 'Pehli Mulaqat',
    icon: Sparkles,
    accent: '#f6cfae',
    photo: 'https://raw.githubusercontent.com/ashishkumar-net/Personal-photo/main/IMG-20261115-WA0000.jpg',
    placeholder: '/photos/placeholder-01.svg',
    text: 'Kuch mulaqatein itni dheere aati hain ki unka asli matlab saalon baad samajh aata hai. Us din koi toofan nahi aaya, koi ghanti nahi baji — bas ek chehra dekha, aur meri poori duniya ka markaz badal gaya. Ashish aur Bittu ki kahani ka pehla panna, bina kisi shor ke likha gaya.',
    quote: 'Us din kuch nahi hua… phir bhi sab kuch badal gaya.',
  },
  {
    id: 2,
    chapter: 'Chapter 02 · Teerth',
    date: 'Saal ek–do · Kashi',
    place: 'Varanasi · Kashi Vishwanath ke ghat',
    title: 'Kashi ke Ghat, Mandir ke Diye',
    icon: Flame,
    accent: '#e6b878',
    photo: 'https://raw.githubusercontent.com/ashishkumar-net/Personal-photo/main/IMG-20261115-WA0001.jpg',
    placeholder: '/photos/placeholder-02.svg',
    text: 'Kashi ki subah, ghat ki seedhiyan, aurte hui ganga par jalte diye — aur un sab ke beech tumhara haath mere haath mein. Mandir ki ghantiyon ke neeche hum dono ne chup-chaap aankhein band ki thi. Main aaj bhi maanta hoon ki us din jo dua maangi thi, usmein tumhara naam sabse pehle tha.',
    quote: 'Ghat ki seedhiyon par baith kar, maine duniya se zyada tumhe apna maana.',
  },
  {
    id: 3,
    chapter: 'Chapter 03 · Apne Shehar',
    date: 'Saal do · Sonbhadra',
    place: 'Sonbhadra · Obra · Robertsganj',
    title: 'Sonbhadra ki Mitti, Obra ki Hawa',
    icon: Mountain,
    accent: '#d98f7a',
    photo: 'https://raw.githubusercontent.com/ashishkumar-net/Personal-photo/main/IMG-20261115-WA0002.jpg',
    placeholder: '/photos/placeholder-03.svg',
    text: 'Obra ki galiyon mein chai, Robertsganj ke raste, aur Sonbhadra ki woh mitti jismein humne kitne hi shaam guzaare. Yahan koi bada monument nahi tha, koi khoobsurat backdrop nahi — sirf hum, aur hamari baatein. Phir bhi meri sabse mehngi yaadein yahi ki yahi hain.',
    quote: 'Badi jagahon ne kuch nahi diya; teri mitti ne sab kuch de diya.',
  },
  {
    id: 4,
    chapter: 'Chapter 04 · Pahadi Trip',
    date: 'Saal teen · Dala',
    place: 'Dala ki pahadiyan · sunset point',
    title: 'Dala ki Pahadiyon Par Sunset',
    icon: Sunset,
    accent: '#f0b98f',
    photo: 'https://raw.githubusercontent.com/ashishkumar-net/Personal-photo/main/IMG-20261115-WA0003.jpg',
    placeholder: '/photos/placeholder-04.svg',
    text: 'Dala ki pahadiyon par woh shaam, jab suraj dheere-dheere pahad ke peeche utar raha tha aur tumhara chehra sunehri ho raha tha. Hawa tez thi, tum thodi thand mein mere paas sarak aayi thi, aur maine socha — agar waqt yahin ruk jaye toh main kabhi shikayat nahi karunga. Us waqt maine tumse kaha tha ki main tumhe hamesha khush rakhunga.',
    quote: 'Pahad chhote lagne lage, jab teri ungliyon mein mera haath tha.',
  },
  {
    id: 5,
    chapter: 'Chapter 05 · Imtihaan',
    date: 'Saal teen · bimaari',
    place: 'Har mushkil mein, ek doosre ke saath',
    title: 'Bimaari Mein Bhi Saath',
    icon: HandHeart,
    accent: '#e0a48c',
    photo: 'https://raw.githubusercontent.com/ashishkumar-net/Personal-photo/main/IMG-20261115-WA0006.jpg',
    placeholder: '/photos/placeholder-05.svg',
    text: 'Jab tum bimaar thi, maine raat bhar aankh nahi band ki. Dawa ka waqt, paani ka glass, tumhara sarakna, aur woh chhoti si awaaz mein “main theek hoon” kehna — maine tab samjha tha ki pyaar bade shabdon mein nahi, in chhoti chhoti fikron mein hota hai. Us waqt maine tumse koi vaada nahi kiya tha; bas kiya.',
    quote: 'Teri tabiyat kharab thi, aur meri poori duniya ruk gayi thi.',
  },
  {
    id: 6,
    chapter: 'Chapter 06 · Aaj',
    date: 'Saal chaar · aaj',
    place: 'Yahan · abhi',
    title: 'Aaj Ka Sach',
    icon: InfinityIcon,
    accent: '#f6cfae',
    photo: 'https://raw.githubusercontent.com/ashishkumar-net/Personal-photo/main/IMG-20261115-WA0014.jpg',
    placeholder: '/photos/placeholder-06.svg',
    text: 'Aaj na koi gila hai, na koi hisaab. Sirf yeh sach hai ki chaar saal tak maine apni Bittu ko poore dil, poori wafadari aur poori izzat se chaha. Tumne mujhe woh diya jo kisi aur ne nahi diya — apna sach, apna waqt, apna ghar jaisa sukoon. Chahe tum aage kuch bhi chuno, meri har dua mein tumhari khushi hogi.',
    quote: 'Chaar saal mera sabse khoobsurat sach hain, koi galti nahi.',
  },
]

// Ankahe Waade — the things Ashish stands by, without asking anything in return.
export const promises = [
  {
    title: 'Izzat, hamesha',
    text: 'Tumhari izzat kabhi mere gusse, meri ego ya kisi teesre insaan ke aage nahi giregi. Chahe hum saath hon ya nahi — tumhare naam ke saath hamesha adab juda rahega.',
  },
  {
    title: 'Bimaari mein bhi saath',
    text: 'Woh raatein main bhoola nahi hoon jab tumhari tabiyat kharab thi. Agar kabhi zaroorat padi, toh dawa, paani aur chup-chaap paas baithna — teeno mere kaam hain, koi ehsaan nahi.',
  },
  {
    title: 'Sach, bina shikayat',
    text: 'Ab main tumse koi hisaab nahi maangunga, koi shikayat nahi karunga. Jo bhi tumne saha, uska bojh tum pe dobara nahi daalunga. Sirf sach kahunga — chahe woh mere haq mein na ho.',
  },
  {
    title: 'Tumhari khushi pehle',
    text: 'Agar tumhari khushi mujhse door hai, toh meri dua tumhare saath jayegi. Mera pyaar tumhari marzi pe shart nahi lagata. Tum khush raho — bas itna chahiye.',
  },
]
