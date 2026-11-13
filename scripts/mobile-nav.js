 // Homepage project filters

document.addEventListener('DOMContentLoaded', function () {
  let buttons = document.querySelectorAll('.category-btn');
  let cards = document.querySelectorAll('.project-card');
  let marquees = document.querySelectorAll('[data-marquee]');
  let autoplayVideos = document.querySelectorAll('[data-autoplay-video]');
  let navs = document.querySelectorAll('.nav');

  function applyFilter(filter) {
    cards.forEach(function (card) {
      card.hidden = !(filter === 'all' || card.classList.contains(filter));
    });
  }

  buttons.forEach(function (button) {
    button.setAttribute('aria-pressed', String(button.classList.contains('active-btn')));

    button.addEventListener('click', function () {

      let filter = button.dataset.filter;

      buttons.forEach(function (item) {
        item.classList.remove('active-btn');
        item.setAttribute('aria-pressed', 'false');
      });

      button.classList.add('active-btn');
      button.setAttribute('aria-pressed', 'true');
      applyFilter(filter);

    });

  });

  applyFilter('all');

  // Marquee animation
  marquees.forEach(function (container) {
    let track = container.querySelector('[data-marquee-track]');
    let originalItems = track ? Array.from(track.children) : [];

    if (!track || originalItems.length === 0) {
      return;
    }

    let fillWidth = function () {
      let minimumWidth = container.offsetWidth + 160;

      while (track.scrollWidth < minimumWidth) {
        originalItems.forEach(function (item) {
          let clone = item.cloneNode(true);
          track.appendChild(clone);
        });
      }
    };

    let duplicateTrack = function () {
      let firstSetItems = Array.from(track.children);

      firstSetItems.forEach(function (item) {
        let clone = item.cloneNode(true);
        clone.setAttribute('aria-hidden', 'true');
        track.appendChild(clone);
      });
    };

    fillWidth();
    duplicateTrack();

    let offset = 0;
    let speed = Number(container.dataset.marqueeSpeed) || 0.35;
    let loopWidth = track.scrollWidth / 2;

    let updateLoopWidth = function () {
      loopWidth = track.scrollWidth / 2;

      if (Math.abs(offset) >= loopWidth) {
        offset = 0;
      }
    };

    let animate = function () {
      offset -= speed;

      if (Math.abs(offset) >= loopWidth) {
        offset = 0;
      }

      track.style.transform = 'translate3d(' + offset + 'px, 0, 0)';

      window.requestAnimationFrame(animate);
    };

    window.addEventListener('resize', updateLoopWidth);
    updateLoopWidth();
    window.requestAnimationFrame(animate);
  });

  // Media that should start playing when loaded
  autoplayVideos.forEach(function (video) {
    video.muted = true;

    let playAttempt = video.play();

    if (playAttempt && typeof playAttempt.catch === 'function') {
      playAttempt.catch(function () {
        video.setAttribute('autoplay', '');
      });
    }
  });

  // Mobile navigation
  navs.forEach(function (nav) {
    let navToggle = nav.querySelector('.nav-toggle');
    let navPanel = nav.querySelector('.nav-mobile-panel');

    if (!navToggle || !navPanel) {
      return;
    }

    let navLinkItems = navPanel.querySelectorAll('a');

    function setNavState(isOpen) {
      nav.classList.toggle('nav-open', isOpen);
      navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      navToggle.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
      navPanel.setAttribute('aria-hidden', isOpen ? 'false' : 'true');
      document.body.classList.toggle('nav-menu-open', isOpen);
      document.body.classList.toggle('nav-open', isOpen);
    }

    setNavState(false);

    navToggle.addEventListener('click', function () {
      let isOpen = navToggle.getAttribute('aria-expanded') === 'true';
      setNavState(!isOpen);
    });

    navLinkItems.forEach(function (link) {
      link.addEventListener('click', function () {
        setNavState(false);
      });
    });

    document.addEventListener('click', function (event) {
      let isOpen = navToggle.getAttribute('aria-expanded') === 'true';

      if (isOpen && !nav.contains(event.target)) {
        setNavState(false);
      }
    });

    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape') {
        setNavState(false);
      }
    });

    window.addEventListener('resize', function () {
      if (window.innerWidth > 600) {
        setNavState(false);
      }
    });
  });

});
