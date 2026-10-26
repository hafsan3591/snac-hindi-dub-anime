// anime-data.js — SNAC ANIME Database (Hardcoded)

const DEFAULT_TELEGRAM = "https://t.me/SNAC_hindi_anime";

const animeList = [
  // টেলিগ্রাম বটের মাধ্যমে নতুন অ্যানিমি এখানে স্বয়ংক্রিয়ভাবে যুক্ত হবে
];

if (typeof module !== "undefined" && module.exports) {
  module.exports = { animeList, DEFAULT_TELEGRAM };
}