document.addEventListener('DOMContentLoaded', function () {
    AOS.init({
        duration: 800,
        easing: 'ease-out-cubic',
        once: true,
        offset: 80
    });

    initNavbarScroll();
    initSmoothScroll();
});

/* =============================================
   NAVBAR SCROLL EFFECT
   ============================================= */

function initNavbarScroll() {
    const nav = document.getElementById('mainNav');
    let lastScroll = 0;

    function checkScroll() {
        const scrollY = window.scrollY;
        if (scrollY > 80) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
        lastScroll = scrollY;
    }

    checkScroll();
    window.addEventListener('scroll', checkScroll, { passive: true });
}

/* =============================================
   SMOOTH SCROLL FOR NAV LINKS
   ============================================= */

function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(function (link) {
        link.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const target = document.querySelector(targetId);
            if (!target) return;

            e.preventDefault();

            const navCollapse = document.querySelector('.navbar-collapse');
            if (navCollapse && navCollapse.classList.contains('show')) {
                const bsCollapse = bootstrap.Collapse.getInstance(navCollapse);
                if (bsCollapse) bsCollapse.hide();
            }

            target.scrollIntoView({ behavior: 'smooth' });
        });
    });
}

/* =============================================
   COPY PIX
   ============================================= */

function copyPix() {
    const pixKey = document.getElementById('pixKey').textContent.trim();
    const feedback = document.getElementById('copyFeedback');
    const btn = document.getElementById('copyPixBtn');

    navigator.clipboard.writeText(pixKey).then(function () {
        feedback.classList.add('show');
        btn.innerHTML = '<i class="fas fa-check me-2"></i>Copiado!';

        setTimeout(function () {
            feedback.classList.remove('show');
            btn.innerHTML = '<i class="fas fa-copy me-2"></i>Copiar Chave PIX';
        }, 3000);
    }).catch(function () {
        const textArea = document.createElement('textarea');
        textArea.value = pixKey;
        textArea.style.position = 'fixed';
        textArea.style.left = '-9999px';
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);

        feedback.classList.add('show');
        btn.innerHTML = '<i class="fas fa-check me-2"></i>Copiado!';

        setTimeout(function () {
            feedback.classList.remove('show');
            btn.innerHTML = '<i class="fas fa-copy me-2"></i>Copiar Chave PIX';
        }, 3000);
    });
}
