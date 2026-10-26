// script.js — SNAC ANIME Core Logic
(function () {
  "use strict";

  const state = { search: "", genre: "all" };
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => Array.from(c.querySelectorAll(s));

  const escapeHtml = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const initials = (t) => t.split(/\s+/).filter(Boolean).slice(0, 3).map((w) => w[0].toUpperCase()).join("");
  const safeTelegram = (url) => typeof url === "string" && /^https?:\/\/t\.me\//i.test(url) ? url : "https://t.me/SNAC_hindi_anime";

  function getAllAnime() {
    return typeof animeList !== "undefined" ? animeList : [];
  }

  function buildPoster(a) {
    const wrapper = document.createElement("div");
    wrapper.className = "poster";
    const badges = document.createElement("div");
    badges.className = "poster-badges";
    if (a.language) { const p = document.createElement("span"); p.className = "pill pill-lang"; p.textContent = a.language; badges.appendChild(p); }
    if (a.status) { const p = document.createElement("span"); p.className = "pill pill-status"; p.textContent = a.status; badges.appendChild(p); }
    wrapper.appendChild(badges);
    if (a.rating) {
      const r = document.createElement("span");
      r.className = "pill pill-rating";
      r.textContent = "★ " + a.rating;
      wrapper.appendChild(r);
    }
    const poster = (a.poster || "").trim();
    if (poster && /^https?:\/\//i.test(poster)) {
      const img = document.createElement("img");
      img.alt = a.title; img.loading = "lazy"; img.src = poster;
      img.addEventListener("load", () => img.classList.add("loaded"));
      img.addEventListener("error", () => { img.remove(); wrapper.appendChild(fallback(a)); });
      wrapper.appendChild(img);
    } else {
      wrapper.appendChild(fallback(a));
    }
    return wrapper;
  }

  function fallback(a) {
    const fb = document.createElement("div");
    fb.className = "poster-fallback";
    fb.innerHTML = `<div class="initials">${initials(a.title)}</div><div class="sub">${a.year || ""}</div>`;
    return fb;
  }

  function buildCard(a, idx) {
    const card = document.createElement("article");
    card.className = "anime-card";
    card.style.animationDelay = Math.min(idx * 20, 300) + "ms";
    card.appendChild(buildPoster(a));
    const body = document.createElement("div");
    body.className = "card-body";
    body.innerHTML = `
      <h3 class="card-title">${escapeHtml(a.title)}</h3>
      <div class="card-meta">
        <span class="genre">${(a.genre || []).join(" • ")}</span>
        ${a.year ? `<span>• ${a.year}</span>` : ""}
      </div>
      <div class="card-actions">
        <button class="btn btn-details" type="button" onclick="window.SNAC.openModal('${a.id}')">Details</button>
        <a class="btn btn-tg" href="${safeTelegram(a.telegramUrl)}" target="_blank" rel="noopener noreferrer">Telegram</a>
      </div>
    `;
    card.appendChild(body);
    return card;
  }

  function filteredList() {
    let list = getAllAnime();
    if (state.search.trim()) {
      const q = state.search.trim().toLowerCase();
      list = list.filter((a) => a.title.toLowerCase().includes(q) || (a.titleBn || "").toLowerCase().includes(q) || (a.genre || []).some(g => g.toLowerCase().includes(q)));
    }
    if (state.genre !== "all") list = list.filter((a) => (a.genre || []).includes(state.genre));
    return list;
  }

  function renderAll() {
    const el = document.getElementById("allGrid");
    if (!el) return;
    el.innerHTML = "";
    const list = filteredList();
    
    // Update Count
    const countEl = document.getElementById("filterCount");
    if (countEl) countEl.textContent = `মোট ${list.length} টি Anime`;

    if (!list.length) {
      el.innerHTML = `<div class="empty-state" style="grid-column:1/-1"><div class="emoji">🔍</div><h3>কিছু পাওয়া যায়নি</h3><p>অন্য কিছু লিখে আবার চেষ্টা করুন।</p></div>`;
      return;
    }
    const frag = document.createDocumentFragment();
    list.forEach((a, i) => frag.appendChild(buildCard(a, i)));
    el.appendChild(frag);
  }

  function openModal(id) {
    const a = getAllAnime().find((x) => x.id === id);
    if (!a) return;
    const overlay = document.getElementById("modalOverlay");
    overlay.innerHTML = "";
    const modal = document.createElement("div");
    modal.className = "modal";
    
    modal.innerHTML = `
      <button class="modal-close" onclick="window.SNAC.closeModal()">✕</button>
      <div class="modal-poster">${buildPoster(a).outerHTML}</div>
      <div class="modal-body">
        <h2>${escapeHtml(a.title)}</h2>
        ${a.titleBn ? `<div class="sub-title">${escapeHtml(a.titleBn)}</div>` : ""}
        <div class="modal-tags">
          ${(a.genre || []).map((g) => `<span class="tag">${escapeHtml(g)}</span>`).join("")}
          ${a.year ? `<span class="tag">${a.year}</span>` : ""}
          ${a.rating ? `<span class="tag">★ ${a.rating}</span>` : ""}
        </div>
        <p class="desc">${escapeHtml(a.description || "")}</p>
        <a class="btn btn-tg" href="${safeTelegram(a.telegramUrl)}" target="_blank" rel="noopener noreferrer">✈️ Telegram-এ দেখুন</a>
      </div>
    `;
    overlay.appendChild(modal);
    overlay.classList.add("open");
    document.body.style.overflow = "hidden";
  }

  function closeModal() {
    const overlay = document.getElementById("modalOverlay");
    if (!overlay) return;
    overlay.classList.remove("open");
    overlay.innerHTML = "";
    document.body.style.overflow = "";
  }

  // Setup Grid Customizer
  function setupGrid() {
    const grid = document.getElementById("allGrid");
    const btns = $$(".gc-btn");
    
    // Load saved preference
    const savedCols = localStorage.getItem("snac_grid_cols") || "5";
    grid.className = `anime-grid grid-cols-${savedCols}`;
    btns.forEach(b => {
      b.classList.toggle("active", b.dataset.cols === savedCols);
      b.addEventListener("click", () => {
        btns.forEach(x => x.classList.remove("active"));
        b.classList.add("active");
        const cols = b.dataset.cols;
        grid.className = `anime-grid grid-cols-${cols}`;
        localStorage.setItem("snac_grid_cols", cols);
      });
    });
  }

  // Setup Filters
  function setupFilters() {
    const search = document.getElementById("filterSearch");
    if (search) {
      let tm;
      search.addEventListener("input", (e) => {
        clearTimeout(tm);
        tm = setTimeout(() => { state.search = e.target.value; renderAll(); }, 150);
      });
    }
    const genre = document.getElementById("genreSelect");
    if (genre) genre.addEventListener("change", (e) => { state.genre = e.target.value; renderAll(); });

    const navSearch = document.getElementById("navSearch");
    if (navSearch) {
      navSearch.addEventListener("input", (e) => {
        if (search) search.value = e.target.value;
        state.search = e.target.value;
        renderAll();
        document.getElementById("all-section").scrollIntoView({ behavior: "smooth" });
      });
    }
    
    const clearBtn = document.getElementById("clearFilters");
    if (clearBtn) {
      clearBtn.addEventListener("click", () => {
        state.search = ""; state.genre = "all";
        if (search) search.value = "";
        if (genre) genre.value = "all";
        if (navSearch) navSearch.value = "";
        renderAll();
      });
    }
  }

  // Mobile Menu
  function setupMobileMenu() {
    const btn = document.getElementById("hamburger");
    const menu = document.getElementById("mobileMenu");
    if (!btn || !menu) return;
    menu.style.display = "none";
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      menu.style.display = menu.style.display === "none" ? "flex" : "none";
    });
  }

  document.addEventListener("DOMContentLoaded", () => {
    renderAll();
    setupGrid();
    setupFilters();
    setupMobileMenu();
    
    document.getElementById("modalOverlay")?.addEventListener("click", (e) => { if(e.target.id === 'modalOverlay') closeModal(); });
    document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeModal(); });
    
    const toTop = document.getElementById("toTop");
    if (toTop) {
      window.addEventListener("scroll", () => toTop.classList.toggle("show", window.scrollY > 500));
      toTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
    }
  });

  window.SNAC = { openModal, closeModal, renderAll };
})();