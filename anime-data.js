// anime-data.js — SNAC ANIME Database (Hardcoded)

const DEFAULT_TELEGRAM = "https://t.me/SNAC_hindi_anime";

const animeList = [
  {
    id: "solo-leveling",
    title: "Solo Leveling",
    titleBn: "সোলো লেভেলিং",
    genre: ["Action", "Fantasy", "Adventure"],
    year: 2024,
    language: "Hindi Dubbed",
    status: "Ongoing",
    rating: 8.4,
    trending: true,
    latest: true,
    poster: "https://i.imgur.com/L3b5Q1y.jpg",
    description: "মানবজাতির সবচেয়ে দুর্বল হান্টার সান জিন-উ একটি রহস্যময় সিস্টেমের মাধ্যমে অসাধারণ শক্তি অর্জন করে ডেমনদের বিরুদ্ধে লড়াই করে।",
    telegramUrl: "https://t.me/SNAC_hindi_anime/7"
  },
  {
    id: "naruto-shippuden",
    title: "Naruto Shippuden",
    titleBn: "নারুতো শিপ্পুডেন",
    genre: ["Action", "Adventure", "Comedy"],
    year: 2007,
    language: "Hindi Dubbed",
    status: "Completed",
    rating: 8.7,
    trending: true,
    latest: false,
    poster: "https://i.imgur.com/8QO0m6q.jpg",
    description: "নারুতো উজুমাকি তার বন্ধু সাসুকেকে উদ্ধার এবং গ্রামকে রক্ষা করার জন্য একের পর এক শক্তিশালী শত্রুর বিরুদ্ধে লড়াই করে।",
    telegramUrl: "https://t.me/SNAC_hindi_anime/253"
  },
  {
    id: "demon-slayer",
    title: "Demon Slayer: Mugen Train",
    titleBn: "ডেমন স্লেয়ার: মুগেন ট্রেন",
    genre: ["Action", "Supernatural", "Fantasy"],
    year: 2020,
    language: "Hindi Dubbed",
    status: "Movie",
    rating: 8.5,
    trending: true,
    latest: true,
    poster: "https://i.imgur.com/L8k5W7b.jpg",
    description: "তানজিরো এবং তার বন্ধুরা একটি রহস্যময় ট্রেনে আক্রমণকারী ডেমনদের বিরুদ্ধে লড়াই করে।",
    telegramUrl: "https://t.me/SNAC_hindi_anime/100"
  },
  {
    id: "attack-on-titan",
    title: "Attack on Titan",
    titleBn: "অ্যাটাক অন টাইটান",
    genre: ["Action", "Drama", "Fantasy"],
    year: 2013,
    language: "Hindi Dubbed",
    status: "Completed",
    rating: 9.0,
    trending: false,
    latest: true,
    poster: "https://i.imgur.com/7X1wT5x.jpg",
    description: "এলেন ইয়েগার বিশাল দেওয়ালে ঘেরা শহরের মধ্যে মানুষের ওপর টাইটানদের নির্মম আক্রমণের প্রতিশোধ নিতে লড়াইয়ে নামে।",
    telegramUrl: "https://t.me/SNAC_hindi_anime/230"
  },
  {
    id: "jujutsu-kaisen",
    title: "Jujutsu Kaisen",
    titleBn: "জুজুৎসু কাইসেন",
    genre: ["Action", "Supernatural", "Fantasy"],
    year: 2020,
    language: "Hindi Dubbed",
    status: "Ongoing",
    rating: 8.6,
    trending: false,
    latest: true,
    poster: "https://i.imgur.com/9xY7Z2a.jpg",
    description: "ইউজি ইতাদোরি একটি অভিশাপগ্রস্ত বস্তু গিলে ফেলার পর নিজের শরীরে এক শক্তিশালী অভিশাপ ধারণ করে।",
    telegramUrl: "https://t.me/SNAC_hindi_anime/150"
  },
  {
    id: "one-piece",
    title: "One Piece",
    titleBn: "ওয়ান পিস",
    genre: ["Action", "Adventure", "Fantasy"],
    year: 1999,
    language: "Hindi Dubbed",
    status: "Ongoing",
    rating: 8.9,
    trending: true,
    latest: true,
    poster: "https://i.imgur.com/5Z8vX9b.jpg",
    description: "মনকি ডি. লুফি তার বন্ধুদের নিয়ে সমুদ্রে যাত্রা করে ওয়ার্ল্ডের সেরা পাইরেট এবং ওয়ান পিস খুঁজে বের করার স্বপ্ন দেখে।",
    telegramUrl: "https://t.me/SNAC_hindi_anime/1"
  }
];

if (typeof module !== "undefined" && module.exports) {
  module.exports = { animeList, DEFAULT_TELEGRAM };
}