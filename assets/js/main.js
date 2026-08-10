/* Portfólio — troca de idioma, entrada por scroll e utilidades da página de suporte. */
(() => {
  'use strict';

  const STORE = 'gql.lang';
  const root = document.documentElement;

  /* ------------------------------------------------------------ idioma */
  // O <head> já aplicou o idioma salvo antes da primeira pintura; aqui só
  // sincronizamos os controles e passamos a reagir aos cliques.
  const current = () => (root.lang.startsWith('en') ? 'en' : 'pt');

  function applyLang(lang) {
    root.lang = lang === 'en' ? 'en' : 'pt-BR';

    document.querySelectorAll('.lang button').forEach((b) => {
      b.setAttribute('aria-pressed', String(b.dataset.setLang === lang));
    });

    // textos que vivem em atributos, não em nós de texto
    document.querySelectorAll('[data-alt-pt]').forEach((el) => {
      el.alt = lang === 'en' ? el.dataset.altEn : el.dataset.altPt;
    });
    document.querySelectorAll('[data-label-pt]').forEach((el) => {
      el.setAttribute('aria-label', lang === 'en' ? el.dataset.labelEn : el.dataset.labelPt);
    });

    const t = document.querySelector(`[data-title-${lang}]`);
    if (t) document.title = t.getAttribute(`data-title-${lang}`);

    try { localStorage.setItem(STORE, lang); } catch (_) { /* modo privado */ }
  }

  document.querySelectorAll('.lang button').forEach((b) => {
    b.addEventListener('click', () => applyLang(b.dataset.setLang));
  });

  applyLang(current());

  /* --------------------------------------------------- entrada por scroll */
  const targets = document.querySelectorAll('.reveal');
  const still = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (still || !('IntersectionObserver' in window)) {
    targets.forEach((el) => el.classList.add('in'));
  } else {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          e.target.classList.add('in');
          io.unobserve(e.target);
        });
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.06 }
    );
    targets.forEach((el) => io.observe(el));
  }

  /* ------------------------------------------------------ copiar e-mail */
  document.querySelectorAll('[data-copy]').forEach((btn) => {
    btn.addEventListener('click', async () => {
      const keep = btn.innerHTML;
      try {
        await navigator.clipboard.writeText(btn.dataset.copy);
        btn.innerHTML = current() === 'en' ? 'Copied' : 'Copiado';
        setTimeout(() => { btn.innerHTML = keep; }, 1800);
      } catch (_) {
        // clipboard bloqueado (http, permissão negada): seleciona para copiar à mão
        const mail = document.querySelector('.mailbox__mail');
        if (!mail) return;
        const r = document.createRange();
        r.selectNodeContents(mail);
        const sel = getSelection();
        sel.removeAllRanges();
        sel.addRange(r);
      }
    });
  });

  /* ---------------------------------------------------------- ano no pé */
  document.querySelectorAll('[data-year]').forEach((el) => {
    el.textContent = String(new Date().getFullYear());
  });
})();
