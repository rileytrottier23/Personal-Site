// Reader settings: a light/dark switch and an optional "motion mode".
// Both are remembered in this browser only. Motion never runs for people whose device asks for reduced motion.
(() => {
  const root = document.documentElement;
  const store = {
    get: (k) => { try { return localStorage.getItem(k); } catch { return null; } },
    set: (k, v) => { try { v ? localStorage.setItem(k, v) : localStorage.removeItem(k); } catch {} },
  };
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  const darkOS = window.matchMedia('(prefers-color-scheme: dark)');

  // Theme: flips between light and dark. Matching the device setting is stored as "follow the device".
  const themeBtn = document.querySelector('[data-pref="theme"]');
  const look = () => root.dataset.theme || (darkOS.matches ? 'dark' : 'light');
  const themeLabel = () => {
    const l = look();
    themeBtn.textContent = l === 'dark' ? 'Dark' : 'Light';
    themeBtn.setAttribute('aria-label', `Switch to ${l === 'dark' ? 'light' : 'dark'} theme`);
  };
  if (themeBtn) {
    themeLabel();
    themeBtn.hidden = false;
    themeBtn.addEventListener('click', () => {
      const next = look() === 'dark' ? 'light' : 'dark';
      const os = darkOS.matches ? 'dark' : 'light';
      if (next === os) delete root.dataset.theme; else root.dataset.theme = next;
      store.set('theme', next === os ? '' : next);
      themeLabel();
    });
    darkOS.addEventListener?.('change', themeLabel);
  }

  // Motion mode
  const motionBtn = document.querySelector('[data-pref="motion"]');
  const motionOn = () => root.dataset.motion === 'on' && !reduced.matches;
  if (motionBtn) {
    const sync = () => motionBtn.setAttribute('aria-pressed', String(root.dataset.motion === 'on'));
    sync();
    motionBtn.hidden = reduced.matches;
    motionBtn.addEventListener('click', () => {
      const on = root.dataset.motion !== 'on';
      if (on) root.dataset.motion = 'on'; else delete root.dataset.motion;
      store.set('motion', on ? 'on' : '');
      sync();
      if (on) play(true); else root.classList.remove('motion-ready');
    });
  }

  // Split headlines into words so they can set in one at a time.
  const splitWords = (el) => {
    if (!el || el.dataset.split) return;
    el.dataset.split = '1';
    const walk = (node, i) => {
      for (const child of [...node.childNodes]) {
        if (child.nodeType === 3) {
          const frag = document.createDocumentFragment();
          for (const part of child.textContent.split(/(\s+)/)) {
            if (!part) continue;
            if (/^\s+$/.test(part)) { frag.append(part); continue; }
            const s = document.createElement('span');
            s.className = 'w';
            s.style.setProperty('--i', i.n++);
            s.textContent = part;
            frag.append(s);
          }
          child.replaceWith(frag);
        } else if (child.nodeType === 1) walk(child, i);
      }
    };
    walk(el, { n: 0 });
  };

  let io;
  function play(fresh) {
    if (!motionOn()) return;
    document.querySelectorAll('.lead h1, .intro p').forEach(splitWords);
    if (fresh) {
      // Replay the opening when motion is switched on mid-page.
      root.classList.remove('motion-ready');
      void root.offsetWidth;
    }
    root.classList.add('motion-ready');
    const items = document.querySelectorAll('.article > p, .article > ul, .article > ol, .article > h2, .article > blockquote, .article figure, .entry, .project, .about p, .about h2, .index h2');
    if (!('IntersectionObserver' in window)) { items.forEach((el) => el.classList.add('in')); return; }
    io = io || new IntersectionObserver((entries) => {
      for (const e of entries) if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.12 });
    items.forEach((el) => { el.classList.add('reveal'); if (!el.classList.contains('in')) io.observe(el); });
  }
  play(false);
})();
