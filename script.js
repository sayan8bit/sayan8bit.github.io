document.addEventListener('DOMContentLoaded', () => {

    /* ─── 1. CUSTOM CURSOR ─── */
    const cursor = document.getElementById('cursor');
    const follower = document.getElementById('cursorFollower');
    let mx = -100, my = -100, fx = -100, fy = -100;

    document.addEventListener('mousemove', e => {
        mx = e.clientX; my = e.clientY;
        cursor.style.left = mx + 'px';
        cursor.style.top = my + 'px';
    });

    // Smooth follower
    (function animateFollower() {
        fx += (mx - fx) * 0.12;
        fy += (my - fy) * 0.12;
        follower.style.left = fx + 'px';
        follower.style.top = fy + 'px';
        requestAnimationFrame(animateFollower);
    })();

    // Expand cursor on links / buttons
    document.querySelectorAll('a, button, .work-item').forEach(el => {
        el.addEventListener('mouseenter', () => {
            follower.style.width = '60px';
            follower.style.height = '60px';
        });
        el.addEventListener('mouseleave', () => {
            follower.style.width = '36px';
            follower.style.height = '36px';
        });
    });


    /* ─── 2. TYPEWRITER ─── */
    const roles = [
        'Software Engineer',
        'UI/UX Designer',
        'Creative Developer',
        'Problem Solver',
        'Full-Stack Builder'
    ];
    let ri = 0, ci = 0, deleting = false;
    const tw = document.getElementById('typewriter');

    function type() {
        if (!tw) return;
        const word = roles[ri];
        tw.textContent = deleting
            ? word.substring(0, ci - 1)
            : word.substring(0, ci + 1);
        deleting ? ci-- : ci++;

        let delay = deleting ? 45 : 100;

        if (!deleting && ci === word.length) {
            delay = 2000;
            deleting = true;
        } else if (deleting && ci === 0) {
            deleting = false;
            ri = (ri + 1) % roles.length;
            delay = 400;
        }
        setTimeout(type, delay);
    }
    if (tw) setTimeout(type, 800);


    /* ─── 3. YEAR ─── */
    const yearEl = document.getElementById('year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();


    /* ─── 4. NAVBAR SCROLL ─── */
    const navbar = document.getElementById('navbar');
    const onScroll = () => {
        navbar.classList.toggle('scrolled', window.scrollY > 60);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();


    /* ─── 5. MOBILE MENU ─── */
    const burger = document.getElementById('burger');
    const mobileNav = document.getElementById('mobileNav');

    burger.addEventListener('click', () => {
        burger.classList.toggle('open');
        mobileNav.classList.toggle('open');
        document.body.style.overflow = mobileNav.classList.contains('open') ? 'hidden' : '';
    });

    document.querySelectorAll('.m-link').forEach(link => {
        link.addEventListener('click', () => {
            burger.classList.remove('open');
            mobileNav.classList.remove('open');
            document.body.style.overflow = '';
        });
    });


    /* ─── 6. SCROLL-REVEAL ─── */
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.08, rootMargin: '0px 0px -60px 0px' });

    document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));


    /* ─── 7. SMOOTH SCROLL ─── */
    document.querySelectorAll('a[href^="#"]').forEach(a => {
        a.addEventListener('click', e => {
            const id = a.getAttribute('href');
            if (id === '#') return;
            const target = document.querySelector(id);
            if (!target) return;
            e.preventDefault();
            const offset = target.getBoundingClientRect().top + window.pageYOffset - 80;
            window.scrollTo({ top: offset, behavior: 'smooth' });
        });
    });


    /* ─── 8. CONTACT FORM ─── */
    const form = document.getElementById('contactForm');
    const btn = document.getElementById('submitBtn');

    if (form && btn) {
        form.addEventListener('submit', e => {
            e.preventDefault();
            const orig = btn.innerHTML;
            btn.innerHTML = 'Sending… <i class="fas fa-spinner fa-spin"></i>';
            btn.style.opacity = '0.7';
            btn.disabled = true;

            setTimeout(() => {
                btn.innerHTML = 'Message sent! <i class="fas fa-check"></i>';
                btn.style.background = '#10b981';
                btn.style.opacity = '1';
                form.reset();

                setTimeout(() => {
                    btn.innerHTML = orig;
                    btn.style.background = '';
                    btn.disabled = false;
                }, 3500);
            }, 1600);
        });
    }


    /* ─── 9. WORK ITEM TILT ─── */
    document.querySelectorAll('.work-item').forEach(item => {
        item.addEventListener('mousemove', e => {
            const thumb = item.querySelector('.work-thumb');
            if (!thumb) return;
            const r = thumb.getBoundingClientRect();
            const x = (e.clientX - r.left) / r.width - 0.5;
            const y = (e.clientY - r.top) / r.height - 0.5;
            thumb.style.transform = `perspective(800px) rotateY(${x * 5}deg) rotateX(${-y * 4}deg) scale(1.02)`;
        });
        item.addEventListener('mouseleave', () => {
            const thumb = item.querySelector('.work-thumb');
            if (thumb) thumb.style.transform = '';
        });
    });

});
