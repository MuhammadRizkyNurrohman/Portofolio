/**
 * JEPANG-IN OFFICIAL WEBSITE
 * Interactive Behavior, Audio Simulation, Level Switcher, and Mobile Nav
 */

document.addEventListener("DOMContentLoaded", () => {
  // 1. Mobile Menu Toggle
  const menuBtn = document.querySelector(".menu-btn");
  const navLinks = document.querySelector(".links");

  if (menuBtn && navLinks) {
    menuBtn.addEventListener("click", () => {
      navLinks.classList.toggle("open");
      menuBtn.classList.toggle("active");
    });

    document.querySelectorAll(".links a").forEach((link) => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("open");
        menuBtn.classList.remove("active");
      });
    });
  }

  // 2. Dynamic Year
  const yearEl = document.getElementById("currentYear");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // 3. Interactive Roadmap Level Selector Data
  const levelData = {
    N5: {
      title: "Unit Fondasi 1: Sistem Huruf & Pelafalan",
      desc: "Kenali 3 aksara utama & 5 vokal dasar Jepang",
      badge: "3 Modul",
      nodes: [
        { letter: "あ", title: "3 Jenis Huruf & Romaji", xp: 20, desc: "Pahami peran Hiragana, Katakana, dan Kanji yang berpadu dalam kalimat.", mascot: "assets/images/maskot/Senang.png" },
        { letter: "い", title: "5 Bunyi Vokal A-I-U-E-O", xp: 20, desc: "Kunci pelafalan jernih, bentuk bibir rileks, dan ketukan vokal panjang (chouon).", mascot: "assets/images/maskot/Fokus.png" },
        { letter: "🎁", title: "Peti Harta Karun Fondasi", xp: 50, desc: "Selamat! Kamu menyelesaikan modul awal, klaim bonus 50 EXP pertamamu!", mascot: "assets/images/maskot/Tertawa.png", isChest: true },
      ],
    },
    N4: {
      title: "Unit 1: Pola Pengandaian (~Tara, ~Nara)",
      desc: "Kuasai ragam kalimat sebab-akibat dan pengandaian N4",
      badge: "4 Modul",
      nodes: [
        { letter: "た", title: "Pengandaian Bentuk ~Tara", xp: 25, desc: "Menyatakan kondisi jika/bila suatu hal terjadi di masa mendatang.", mascot: "assets/images/maskot/Semangat.png" },
        { letter: "な", title: "Pengandaian Topik ~Nara", xp: 25, desc: "Memberikan saran atau tanggapan sesuai konteks lawan bicara.", mascot: "assets/images/maskot/Fokus.png" },
        { letter: "🎁", title: "Peti Harta Karun N4", xp: 50, desc: "Klaim reward +50 EXP penyelesaian unit pengandaian N4!", mascot: "assets/images/maskot/Tertawa.png", isChest: true },
      ],
    },
    N3: {
      title: "Unit 1: Percakapan Bahasa Bisnis & Nuansa",
      desc: "Memahami ekspresi nuansa perasaan dan argumen logis",
      badge: "4 Modul",
      nodes: [
        { letter: "わ", title: "Pola Kalimat ~Wake da / ~Wake dewa nai", xp: 30, desc: "Menjelaskan kesimpulan logis atau menyanggah asumsi secara halus.", mascot: "assets/images/maskot/Determinasi.png" },
        { letter: "ほ", title: "Bentuk Keharusan ~Hazu da", xp: 30, desc: "Memprediksi kejadian berdasarkan fakta kuat dan keyakinan tinggi.", mascot: "assets/images/maskot/Fokus.png" },
        { letter: "🎁", title: "Peti Harta Karun N3", xp: 50, desc: "Klaim +50 EXP level Intermediate!", mascot: "assets/images/maskot/Tertawa.png", isChest: true },
      ],
    },
    N2: {
      title: "Unit 1: Bahasa Formal & Berita Tajuk Rencana",
      desc: "Menelaah artikel opini dan kosakata profesional",
      badge: "5 Modul",
      nodes: [
        { letter: "に", title: "Tata Bahasa ~Ni kagitte", xp: 35, desc: "Pengecualian khusus atau ironi nasib dalam situasi tertentu.", mascot: "assets/images/maskot/Fokus.png" },
        { letter: "か", title: "Ekspresi ~Kagiri wa", xp: 35, desc: "Sepanjang batasan kondisi terpenuhi secara konsisten.", mascot: "assets/images/maskot/Determinasi.png" },
        { letter: "🎁", title: "Peti Harta Karun N2", xp: 50, desc: "Hebat! Kamu melangkah ke level profesional +50 EXP!", mascot: "assets/images/maskot/Tertawa.png", isChest: true },
      ],
    },
    N1: {
      title: "Unit 1: Keigo Tingkat Tinggi & Bahasa Legal",
      desc: "Tingkatan bahasa penghormatan mutlak dan teks sastra",
      badge: "5 Modul",
      nodes: [
        { letter: "極", title: "Tingkat Teratas: Keigo Resmi", xp: 40, desc: "Ungkapan penghormatan tertinggi untuk tamu VIP dan direksi.", mascot: "assets/images/maskot/Determinasi.png" },
        { letter: "至", title: "Ekspresi Klasik ~Itari", xp: 40, desc: "Puncak rasa syukur, kehormatan, atau penyesalan mendalam.", mascot: "assets/images/maskot/Semangat.png" },
        { letter: "🎁", title: "Peti Harta Karun Master N1", xp: 50, desc: "Selamat! Pencapaian tertinggi Master Bahasa Jepang +50 EXP!", mascot: "assets/images/maskot/Tertawa.png", isChest: true },
      ],
    },
  };

  const lvlButtons = document.querySelectorAll(".lvl-btn");
  const bannerTitle = document.getElementById("bannerTitle");
  const bannerDesc = document.getElementById("bannerDesc");
  const interactiveTree = document.getElementById("interactiveTree");
  const feedbackTitle = document.getElementById("feedbackTitle");
  const feedbackXp = document.getElementById("feedbackXp");
  const feedbackDesc = document.getElementById("feedbackDesc");
  const feedbackMascot = document.getElementById("feedbackMascot");

  function renderTree(lvlKey) {
    const data = levelData[lvlKey];
    if (!data) return;

    if (bannerTitle) bannerTitle.textContent = data.title;
    if (bannerDesc) bannerDesc.textContent = data.desc;

    if (interactiveTree) {
      interactiveTree.innerHTML = "";

      data.nodes.forEach((node, idx) => {
        const nodeEl = document.createElement("div");
        nodeEl.className = `demo-node ${node.isChest ? "chest-node" : "active-node"} ${idx === 1 ? "current-node" : ""}`;
        nodeEl.setAttribute("data-title", node.title);
        nodeEl.setAttribute("data-xp", node.xp);
        nodeEl.setAttribute("data-desc", node.desc);
        nodeEl.setAttribute("data-mascot", node.mascot);

        const letterSpan = document.createElement("span");
        letterSpan.className = "node-letter";
        letterSpan.textContent = node.letter;

        const badgeSpan = document.createElement("span");
        badgeSpan.className = `node-badge ${node.isChest ? "gold" : idx === 1 ? "pulse" : ""}`;
        badgeSpan.textContent = node.isChest ? "Klaim +50 EXP" : idx === 0 ? "Selesai ✓" : "Aktif • Coba!";

        nodeEl.appendChild(letterSpan);
        nodeEl.appendChild(badgeSpan);
        interactiveTree.appendChild(nodeEl);

        if (idx < data.nodes.length - 1) {
          const dash = document.createElement("div");
          dash.className = "tree-dash-line";
          interactiveTree.appendChild(dash);
        }

        // Attach Click Handler
        nodeEl.addEventListener("click", () => {
          document.querySelectorAll(".demo-node").forEach((n) => n.classList.remove("current-node"));
          nodeEl.classList.add("current-node");

          if (feedbackTitle) feedbackTitle.textContent = node.title;
          if (feedbackXp) feedbackXp.textContent = `+${node.xp} EXP Reward`;
          if (feedbackDesc) feedbackDesc.textContent = node.desc;
          if (feedbackMascot) feedbackMascot.src = node.mascot;
        });
      });

      // Default select node 1
      const defaultNode = data.nodes[1] || data.nodes[0];
      if (feedbackTitle) feedbackTitle.textContent = defaultNode.title;
      if (feedbackXp) feedbackXp.textContent = `+${defaultNode.xp} EXP Reward`;
      if (feedbackDesc) feedbackDesc.textContent = defaultNode.desc;
      if (feedbackMascot) feedbackMascot.src = defaultNode.mascot;
    }
  }

  lvlButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      lvlButtons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      const lvl = btn.getAttribute("data-level");
      renderTree(lvl);
    });
  });

  // 4. Mascot Emotion Interactive Clicker
  const emotionItems = document.querySelectorAll(".emotion-item");
  const speechBubble = document.getElementById("mascotSpeech");
  const heroMascot = document.getElementById("mascotHeroImg");
  const mascotStatusText = document.getElementById("mascotStatusText");

  const emotionData = {
    Senang: {
      msg: "Konnichiwa! Belajar bersama Jepang-In setiap hari bikin hati senang dan penuh senyum! 😊",
      status: "Mode: Senang (Ureshiki)",
    },
    Tekad: {
      msg: "Jangan mudah menyerah! Ribuan kanji bisa kamu taklukkan satu demi satu dengan tekad membaja! 🦊🔥",
      status: "Mode: Tekad Kuat (Determinasi)",
    },
    Fokus: {
      msg: "Tarik napas dalam-dalam, perhatikan urutan goresan kanji dan dengarkan audio lafalnya dengan teliti! 🎯",
      status: "Mode: Fokus Penuh (Shuuchuu)",
    },
    Gembira: {
      msg: "Yatta! Kamu berhasil menyelesaikan kuis tanpa kehilangan hati! Hebat sekali! 🎉",
      status: "Mode: Gembira (Waratte)",
    },
    Membara: {
      msg: "Ikimashou! Energi penuh untuk menembus ujian JLPT dan meraih karir impian di Jepang! ⚡",
      status: "Mode: Semangat Membara (Moeru)",
    },
  };

  emotionItems.forEach((item) => {
    item.addEventListener("click", () => {
      // Set active button
      emotionItems.forEach((btn) => btn.classList.remove("active"));
      item.classList.add("active");

      const emotion = item.getAttribute("data-emotion");
      const newSrc = item.getAttribute("data-src");

      // Switch main mascot image
      if (heroMascot && newSrc) {
        heroMascot.classList.add("pop");
        heroMascot.src = newSrc;
        setTimeout(() => {
          heroMascot.classList.remove("pop");
        }, 250);
      }

      // Update dialog text & status
      if (emotionData[emotion]) {
        if (speechBubble) {
          speechBubble.textContent = `"${emotionData[emotion].msg}"`;
          speechBubble.style.borderColor = "#E53935";
          setTimeout(() => {
            speechBubble.style.borderColor = "#FFB300";
          }, 600);
        }
        if (mascotStatusText) {
          mascotStatusText.textContent = emotionData[emotion].status;
        }
      }
    });
  });

  // 5. FAQ Accordion Single Open Behavior
  const detailsList = document.querySelectorAll(".faq-item");
  detailsList.forEach((detail) => {
    detail.addEventListener("toggle", () => {
      if (detail.open) {
        detailsList.forEach((other) => {
          if (other !== detail) other.open = false;
        });
      }
    });
  });
});
