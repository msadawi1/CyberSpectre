// ============================================
// CyberSpectre — Interactive Behaviors
// ============================================

(() => {
    'use strict';

    // ====================================================
    // BOOT SEQUENCE — first-visit-only typing animation
    // ====================================================
    const runBootSequence = () => {
        if (sessionStorage.getItem('cs_booted')) return;
        if (document.body.dataset.skipBoot === '1') return;

        const overlay = document.createElement('div');
        overlay.className = 'boot-overlay';
        overlay.style.pointerEvents = 'auto';
        overlay.innerHTML = `
            <div class="boot-inner">
                <img src="assets/logo.png" class="boot-logo" alt="">
                <div class="boot-line">[ <span class="ok">OK</span> ] kali-rolling 2026.1 // ghost-protocol loaded</div>
                <div class="boot-line">[ <span class="ok">OK</span> ] mounting <span class="info">/shadow</span> ... ok</div>
                <div class="boot-line">[ <span class="ok">OK</span> ] starting recruitment.service ...</div>
                <div class="boot-line">[ <span class="ok">OK</span> ] cyberspectre@mmu — <span class="info">120+</span> nodes online</div>
                <div class="boot-line"><span class="dim">welcome, traveler. <em style="font-style:normal;color:var(--text-4);font-size:0.75rem">(click anywhere or press any key to skip)</em></span></div>
                <div class="boot-progress"><div class="boot-progress-fill"></div></div>
            </div>
        `;
        document.body.appendChild(overlay);

        const lines = overlay.querySelectorAll('.boot-line');
        const fill = overlay.querySelector('.boot-progress-fill');

        let dismissed = false;
        const dismiss = () => {
            if (dismissed) return;
            dismissed = true;
            overlay.classList.add('gone');
            setTimeout(() => overlay.remove(), 500);
        };

        overlay.addEventListener('click', dismiss);
        const keyHandler = () => { dismiss(); document.removeEventListener('keydown', keyHandler); };
        document.addEventListener('keydown', keyHandler);

        let i = 0;
        const showNext = () => {
            if (dismissed) return;
            if (i >= lines.length) {
                fill.style.width = '100%';
                setTimeout(dismiss, 700);
                return;
            }
            lines[i].classList.add('shown');
            i++;
            setTimeout(showNext, 280);
        };

        sessionStorage.setItem('cs_booted', '1');
        setTimeout(showNext, 100);
    };
    runBootSequence();

    // ====================================================
    // PAGE TRANSITION — glitch wipe between internal links
    // ====================================================
    const transition = document.createElement('div');
    transition.className = 'page-transition';
    transition.innerHTML = '<img src="assets/logo.png" class="pt-mark" alt="">';
    document.body.appendChild(transition);

    document.addEventListener('click', (e) => {
        const a = e.target.closest('a');
        if (!a) return;
        const href = a.getAttribute('href');
        if (!href || href.startsWith('#') || href.startsWith('mailto:') ||
            href.startsWith('tel:') || href.startsWith('javascript:') ||
            a.target === '_blank' || href.startsWith('http') || href.startsWith('//')) return;
        if (a.hasAttribute('download')) return;

        // Only intercept .html navigations within the same site
        if (!href.endsWith('.html') && !href.includes('.html#')) return;

        // Skip transition if navigating to the SAME page
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        const targetPage = href.split('#')[0] || currentPage;
        if (targetPage === currentPage) return;

        e.preventDefault();
        transition.classList.add('active');
        const failsafe = setTimeout(() => transition.classList.remove('active'), 1500);
        setTimeout(() => {
            clearTimeout(failsafe);
            window.location.href = href;
        }, 280);
    });

    window.addEventListener('pageshow', () => {
        transition.classList.remove('active');
    });

    // Mobile menu toggle (with aria-expanded sync)
    const menuToggle = document.getElementById('menu-toggle');
    const topnav = document.querySelector('.topnav');
    if (menuToggle && topnav) {
        const setOpen = (open) => {
            menuToggle.classList.toggle('active', open);
            topnav.classList.toggle('open', open);
            menuToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
        };
        menuToggle.addEventListener('click', () => {
            setOpen(!topnav.classList.contains('open'));
        });
        topnav.querySelectorAll('a').forEach(a => {
            a.addEventListener('click', () => setOpen(false));
        });
        // Close on Escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && topnav.classList.contains('open')) setOpen(false);
        });
    }

    // Smooth scroll for anchors
    document.querySelectorAll('a[href^="#"]').forEach(a => {
        a.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#' || href.length < 2) return;
            const target = document.querySelector(href);
            if (!target) return;
            e.preventDefault();
            const top = target.getBoundingClientRect().top + window.pageYOffset - 90;
            window.scrollTo({ top, behavior: 'smooth' });
        });
    });

    // Counter animation
    const animateCounter = (el, target, duration = 1600) => {
        const start = performance.now();
        const update = (now) => {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            const value = Math.floor(target * eased);
            el.textContent = value;
            if (progress < 1) requestAnimationFrame(update);
            else el.textContent = target;
        };
        requestAnimationFrame(update);
    };

    // Intersection observer for reveal + counters + bars
    const revealTargets = document.querySelectorAll(
        '.section-head, .pillar, .track, .rm-step, .init-row, .pcard, .bench, ' +
        '.diff-row, .big-stat, .survey-bars, .cta-frame, .hero-inner, .hero-stats-mini, ' +
        '.acronym-row, .manifesto-quote, .manifesto-intro, .vision-body, .targets, ' +
        '.quick-card, .ops-panel'
    );
    revealTargets.forEach(el => el.classList.add('reveal'));

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, i) => {
            if (!entry.isIntersecting) return;
            const el = entry.target;

            setTimeout(() => el.classList.add('in'), i * 50);

            // Animate hero counters once visible
            el.querySelectorAll('[data-count]').forEach(c => {
                const t = parseInt(c.dataset.count, 10);
                if (!isNaN(t)) animateCounter(c, t, 1500);
            });

            // Animate progress bars
            el.querySelectorAll('.bs-fill, .sb-fill').forEach(bar => {
                const w = bar.dataset.width;
                if (w) setTimeout(() => bar.style.width = w + '%', 200);
            });

            observer.unobserve(el);
        });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    revealTargets.forEach(el => observer.observe(el));

    // Active nav highlighting
    const sections = document.querySelectorAll('section[id]');
    const navItems = document.querySelectorAll('.topnav a');
    const updateActiveNav = () => {
        const scrollPos = window.scrollY + 140;
        sections.forEach(s => {
            const top = s.offsetTop;
            const height = s.offsetHeight;
            const id = s.getAttribute('id');
            if (scrollPos >= top && scrollPos < top + height) {
                navItems.forEach(item => {
                    item.classList.toggle('active', item.getAttribute('href') === '#' + id);
                });
            }
        });
    };
    window.addEventListener('scroll', updateActiveNav, { passive: true });

    // ====================================================
    // Contact form (Formspree-compatible)
    // ====================================================
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        const submitBtn = document.getElementById('cf-submit');
        const statusEl = document.getElementById('cf-status');

        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const action = contactForm.getAttribute('action') || '';

            // If form ID hasn't been swapped in, fall back to mailto
            if (action.includes('YOUR_FORM_ID')) {
                statusEl.className = 'cf-status error';
                statusEl.textContent = 'Form not configured yet — emailing cyberspectre@mmu.edu.my instead.';
                setTimeout(() => {
                    window.location.href = 'mailto:cyberspectre@mmu.edu.my' +
                        '?subject=' + encodeURIComponent('CyberSpectre application — ' + (contactForm.name?.value || '')) +
                        '&body=' + encodeURIComponent(contactForm.message?.value || '');
                }, 600);
                return;
            }

            const origLabel = submitBtn.innerHTML;
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<span>Sending…</span>';
            statusEl.className = 'cf-status';
            statusEl.textContent = '';

            try {
                const formData = new FormData(contactForm);
                const resp = await fetch(action, {
                    method: 'POST',
                    body: formData,
                    headers: { 'Accept': 'application/json' }
                });
                if (resp.ok) {
                    statusEl.className = 'cf-status success';
                    statusEl.textContent = '[+] Message received. We respond within 48h.';
                    contactForm.reset();
                    submitBtn.innerHTML = '<span>Sent ✓</span>';
                    setTimeout(() => {
                        submitBtn.disabled = false;
                        submitBtn.innerHTML = origLabel;
                    }, 3000);
                } else {
                    throw new Error('Submission failed');
                }
            } catch (err) {
                statusEl.className = 'cf-status error';
                statusEl.textContent = '[!] Something went wrong. Email cyberspectre@mmu.edu.my directly.';
                submitBtn.disabled = false;
                submitBtn.innerHTML = origLabel;
            }
        });
    }

    // Discord invite placeholder
    const discordInvite = document.getElementById('discord-invite');
    if (discordInvite) {
        discordInvite.addEventListener('click', (e) => {
            const href = discordInvite.getAttribute('href') || '#';
            if (href === '#') {
                e.preventDefault();
                const orig = discordInvite.innerHTML;
                discordInvite.innerHTML = '<span>Server forming — coming soon</span>';
                setTimeout(() => discordInvite.innerHTML = orig, 2200);
            }
        });
    }

    // Discord button placeholder
    const discordBtn = document.getElementById('discord-btn');
    if (discordBtn) {
        discordBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const orig = discordBtn.innerHTML;
            discordBtn.innerHTML = '<span>Coming soon — stay covert.</span>';
            setTimeout(() => discordBtn.innerHTML = orig, 2200);
        });
    }

    // ====================================================
    // VORTEX — canvas fallback (only runs if a canvas exists,
    // current hero uses a static Blender render instead)
    // ====================================================
    const vortexInit = () => {
        const canvas = document.getElementById('vortex-canvas');
        if (!canvas) return;
        const ctx = canvas.getContext('2d', { alpha: true });

        let w = 0, h = 0, dpr = 1;
        const NUM_STRANDS = 36;
        const POINTS_PER = 70;
        const PARTICLES_PER = 4;

        // Strand & particle data
        const strands = [];
        for (let i = 0; i < NUM_STRANDS; i++) {
            strands.push({
                phase: (i / NUM_STRANDS) * Math.PI * 2,
                twist: 1.2 + Math.random() * 0.8,
                wobble: 0.04 + Math.random() * 0.06,
                wobbleFreq: 0.5 + Math.random() * 1.2,
                hueShift: Math.random() * 0.15,
                width: 0.7 + Math.random() * 0.7,
                alpha: 0.18 + Math.random() * 0.22
            });
        }
        const particles = [];
        for (const s of strands) {
            for (let p = 0; p < PARTICLES_PER; p++) {
                particles.push({
                    strand: s,
                    t: Math.random() * 2 - 1,
                    speed: 0.0005 + Math.random() * 0.0009,
                    size: 0.7 + Math.random() * 1.4,
                    bright: 0.6 + Math.random() * 0.4
                });
            }
        }

        const FOCAL = 620;
        const CAM_Z = 760;
        const TILT_X = -0.18; // tilt camera down a bit

        const project = (x, y, z) => {
            // Tilt: rotate around X
            const cosT = Math.cos(TILT_X);
            const sinT = Math.sin(TILT_X);
            const y2 = y * cosT - z * sinT;
            const z2 = y * sinT + z * cosT;
            const zCam = CAM_Z + z2;
            const scale = FOCAL / zCam;
            return {
                x: w / 2 + x * scale,
                y: h / 2 + 8 + y2 * scale,
                z: zCam,
                scale
            };
        };

        const strandPoint = (strand, t, time) => {
            // t from -1 (top) to 1 (bottom). r is small at center, large at ends.
            const a = Math.abs(t);
            const r = (Math.pow(a, 0.62) * 360) + 6;
            const wob = Math.sin(t * Math.PI * strand.wobbleFreq + time * 0.0006) * strand.wobble;
            const theta = strand.phase + time * 0.00018 + t * strand.twist * Math.PI * 0.55 + wob;
            return {
                x: Math.sin(theta) * r,
                y: t * 320,
                z: Math.cos(theta) * r
            };
        };

        const resize = () => {
            dpr = Math.min(window.devicePixelRatio || 1, 2);
            const r = canvas.getBoundingClientRect();
            w = r.width;
            h = r.height;
            canvas.width = Math.max(1, Math.floor(w * dpr));
            canvas.height = Math.max(1, Math.floor(h * dpr));
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        };
        resize();
        window.addEventListener('resize', resize);

        let running = true;
        const stop = () => { running = false; };

        const loop = () => {
            if (!running) return;
            const time = performance.now();

            // Trail decay (semi-transparent navy bg over previous frame)
            ctx.globalCompositeOperation = 'source-over';
            ctx.fillStyle = 'rgba(10, 19, 48, 0.18)';
            ctx.fillRect(0, 0, w, h);

            // Additive blending for emissive look
            ctx.globalCompositeOperation = 'lighter';

            // Draw strands
            for (const s of strands) {
                ctx.beginPath();
                let started = false;
                let lastDepth = 0;
                for (let i = 0; i <= POINTS_PER; i++) {
                    const t = (i / POINTS_PER) * 2 - 1;
                    const p3 = strandPoint(s, t, time);
                    const p2 = project(p3.x, p3.y, p3.z);
                    if (!started) { ctx.moveTo(p2.x, p2.y); started = true; }
                    else ctx.lineTo(p2.x, p2.y);
                    lastDepth = p2.z;
                }
                const fade = Math.max(0, Math.min(1, 1 - (lastDepth - CAM_Z + 200) / 600));
                ctx.strokeStyle = `rgba(82, 130, 255, ${s.alpha * (0.5 + fade * 0.5)})`;
                ctx.lineWidth = s.width;
                ctx.stroke();
            }

            // Draw flowing particle pulses on strands
            for (const p of particles) {
                p.t += p.speed;
                if (p.t > 1) p.t = -1;
                const p3 = strandPoint(p.strand, p.t, time);
                const p2 = project(p3.x, p3.y, p3.z);
                const depthFade = Math.max(0.15, Math.min(1, FOCAL / p2.z * 0.9));
                const radius = p.size * p2.scale * 1.4;

                // Outer glow
                const glowGrad = ctx.createRadialGradient(p2.x, p2.y, 0, p2.x, p2.y, radius * 6);
                glowGrad.addColorStop(0, `rgba(122, 165, 255, ${0.45 * p.bright * depthFade})`);
                glowGrad.addColorStop(0.4, `rgba(61, 107, 255, ${0.18 * p.bright * depthFade})`);
                glowGrad.addColorStop(1, 'rgba(30, 64, 175, 0)');
                ctx.fillStyle = glowGrad;
                ctx.beginPath();
                ctx.arc(p2.x, p2.y, radius * 6, 0, Math.PI * 2);
                ctx.fill();

                // Bright core
                ctx.fillStyle = `rgba(220, 235, 255, ${0.95 * p.bright * depthFade})`;
                ctx.beginPath();
                ctx.arc(p2.x, p2.y, Math.max(0.6, radius), 0, Math.PI * 2);
                ctx.fill();
            }

            ctx.globalCompositeOperation = 'source-over';
            requestAnimationFrame(loop);
        };

        // Pause when off-screen
        const visObs = new IntersectionObserver(entries => {
            entries.forEach(e => {
                if (e.isIntersecting && !running) {
                    running = true;
                    requestAnimationFrame(loop);
                } else if (!e.isIntersecting) {
                    running = false;
                }
            });
        }, { threshold: 0 });
        visObs.observe(canvas);

        loop();
    };
    vortexInit();

    // Kali terminal typing animation
    const animateKaliTerminal = () => {
        const body = document.getElementById('kali-body');
        if (!body) return;

        const lines = Array.from(body.querySelectorAll('.kali-row'));
        if (!lines.length) return;

        // Stash command text and hide everything
        body.classList.add('animating');
        const commandTexts = new Map();
        lines.forEach(line => {
            const cmd = line.querySelector('.kcmd');
            if (cmd && cmd.textContent.trim()) {
                commandTexts.set(line, cmd.textContent);
                cmd.textContent = '';
            }
        });

        let i = 0;
        const reveal = (line) => line.classList.add('shown');

        const next = () => {
            if (i >= lines.length) {
                body.classList.remove('animating');
                return;
            }
            const line = lines[i];
            i++;

            // If it's a command line, show it then type the command
            if (commandTexts.has(line)) {
                reveal(line);
                const cmd = line.querySelector('.kcmd');
                const text = commandTexts.get(line);
                let c = 0;
                const typer = setInterval(() => {
                    cmd.textContent = text.slice(0, ++c);
                    if (c >= text.length) {
                        clearInterval(typer);
                        setTimeout(next, 320);
                    }
                }, 22);
                return;
            }

            reveal(line);

            let delay;
            if (line.classList.contains('boot')) delay = 220;
            else if (line.classList.contains('prompt-row')) delay = 250;
            else if (line.classList.contains('hi')) delay = 380;
            else if (line.classList.contains('neo-wrap')) delay = 500;
            else if (line.classList.contains('out-row')) delay = 80;
            else delay = 150;

            setTimeout(next, delay);
        };

        setTimeout(next, 500);
    };

    const kaliEl = document.querySelector('.kali-terminal');
    if (kaliEl) {
        const kaliObs = new IntersectionObserver(entries => {
            entries.forEach(e => {
                if (e.isIntersecting) {
                    animateKaliTerminal();
                    kaliObs.disconnect();
                }
            });
        }, { threshold: 0.25 });
        kaliObs.observe(kaliEl);
    }

    // ====================================================
    // INTAKE COUNTDOWN — to next intake close date
    // ====================================================
    const countdownEls = document.querySelectorAll('[data-countdown]');
    if (countdownEls.length) {
        // Default: 14 days from now (rolling). Override via data-target attribute.
        const computeTarget = (el) => {
            const explicit = el.dataset.target;
            if (explicit) return new Date(explicit).getTime();
            const stored = localStorage.getItem('cs_intake_target');
            if (stored) return parseInt(stored, 10);
            const t = Date.now() + 14 * 86400000;
            localStorage.setItem('cs_intake_target', String(t));
            return t;
        };

        const update = () => {
            countdownEls.forEach(el => {
                const target = computeTarget(el);
                const diff = target - Date.now();
                const days = Math.max(0, Math.floor(diff / 86400000));
                const hours = Math.max(0, Math.floor((diff % 86400000) / 3600000));
                const mins = Math.max(0, Math.floor((diff % 3600000) / 60000));
                el.querySelector('[data-cd-days]').textContent = String(days).padStart(2, '0');
                el.querySelector('[data-cd-hours]').textContent = String(hours).padStart(2, '0');
                el.querySelector('[data-cd-mins]').textContent = String(mins).padStart(2, '0');
            });
        };
        update();
        setInterval(update, 30000);
    }

    // Easter egg console
    const purple = 'color:#7F77DD;font-family:monospace;font-size:13px;font-weight:600;';
    const ghost = 'color:#AFA9EC;font-family:monospace;font-size:12px;';
    console.log('%c┌────────────────────────────────────────────┐', purple);
    console.log('%c│   CYBERSPECTRE  ·  MMU CYBERSECURITY       │', purple);
    console.log('%c│   Present everywhere. Seen nowhere.        │', purple);
    console.log('%c└────────────────────────────────────────────┘', purple);
    console.log('%c[+] You found the source. Good recon.', ghost);
    console.log('%c[+] Join us — /join.html', ghost);
    console.log('%c[+] @C_Spectre · cyberspectre@mmu.edu.my', ghost);
    console.log('%c[+] flag{console_logs_reveal_secrets}', 'color:#4ADE80;font-family:monospace;font-size:13px;font-weight:700;');
    console.log('%c[+] Press / anywhere to open the command palette.', ghost);

    // ====================================================
    // ENLIST CONSOLE — multi-stage operative intake (enlist.html)
    // ====================================================
    if (document.getElementById('enlist-console')) initEnlistConsole();

    function initEnlistConsole() {
        const data = JSON.parse(localStorage.getItem('cs_enlist_data') || '{}');
        const save = () => localStorage.setItem('cs_enlist_data', JSON.stringify(data));

        const stages = document.querySelectorAll('.enlist-stage');
        const progressFill = document.getElementById('enlist-progress-fill');
        const progressStages = document.querySelectorAll('#enlist-progress-stages span');
        const TOTAL = stages.length;
        let currentStage = 1;

        const setStage = (n, opts = {}) => {
            currentStage = n;
            stages.forEach(s => s.classList.toggle('active', parseInt(s.dataset.stage) === n));
            progressFill.style.width = ((n - 1) / (TOTAL - 1) * 100) + '%';
            progressStages.forEach(p => {
                const stage = parseInt(p.dataset.stage);
                p.classList.toggle('done', stage < n);
                p.classList.toggle('current', stage === n);
            });
            if (!opts.silent) {
                window.scrollTo({ top: document.querySelector('.enlist-console').offsetTop - 100, behavior: 'smooth' });
            }
            // Trigger stage-specific animations
            if (n === 5) animateOath();
            if (n === 6) finalizeEnlistment();
        };

        // ── Validation per stage ─────────────────────────────
        const validate = (from) => {
            if (from === 1) {
                const name = document.getElementById('f-name').value.trim();
                const email = document.getElementById('f-email').value.trim();
                const faculty = document.getElementById('f-faculty').value;
                const year = document.getElementById('f-year').value;
                if (!name) { alert('Please enter your full name.'); return false; }
                if (!email || !email.includes('@')) { alert('Please enter a valid email.'); return false; }
                if (!faculty) { alert('Please select your faculty.'); return false; }
                if (!year) { alert('Please select your year of study.'); return false; }
                data.name = name; data.email = email; data.faculty = faculty; data.year = year;
            } else if (from === 2) {
                const handle = document.getElementById('f-handle').value.trim().toLowerCase();
                if (!handle || !/^[a-z0-9_]{3,20}$/.test(handle)) { alert('Handle must be 3–20 chars, lowercase letters/numbers/underscores only.'); return false; }
                data.handle = handle;
            } else if (from === 3) {
                const checked = document.querySelector('input[name="track"]:checked');
                if (!checked) { alert('Pick a specialty track.'); return false; }
                data.track = checked.value;
            } else if (from === 4) {
                const q1 = document.querySelector('input[name="q1"]:checked');
                const q2 = document.querySelector('input[name="q2"]:checked');
                const q3 = document.querySelector('input[name="q3"]:checked');
                if (!q1 || !q2 || !q3) { alert('Please answer all three questions.'); return false; }
                data.skill = parseInt(q1.value) + parseInt(q2.value) + parseInt(q3.value);
            } else if (from === 5) {
                if (!document.getElementById('f-oath').checked) { alert('Please check the oath box to confirm.'); return false; }
                data.oath = true;
            }
            save();
            return true;
        };

        // ── Wire next/back buttons ─────────────────────────────
        document.querySelectorAll('.stage-next').forEach(btn => {
            btn.addEventListener('click', () => {
                const from = parseInt(btn.dataset.from);
                const to = parseInt(btn.dataset.to);
                if (validate(from)) setStage(to);
            });
        });
        document.querySelectorAll('.stage-back').forEach(btn => {
            btn.addEventListener('click', () => setStage(parseInt(btn.dataset.to)));
        });

        // ── Handle generator ─────────────────────────────
        const adjectives = ['ghost', 'shadow', 'phantom', 'silent', 'cyber', 'neon', 'midnight', 'rogue', 'binary', 'crypto', 'null', 'void', 'echo', 'wraith', 'specter', 'glitch', 'zero', 'cipher', 'recon', 'nyx'];
        const nouns = ['byte', 'bit', 'shell', 'packet', 'hash', 'flag', 'proxy', 'daemon', 'kernel', 'agent', 'fox', 'hawk', 'wolf', 'raven', 'snake', 'tiger', 'cobra', 'lynx', 'orbit', 'spectre'];
        const generateHandle = () => {
            const adj = adjectives[Math.floor(Math.random() * adjectives.length)];
            const noun = nouns[Math.floor(Math.random() * nouns.length)];
            const num = Math.random() > 0.5 ? '_' + Math.floor(Math.random() * 99) : '';
            return adj + '_' + noun + num;
        };

        const handleInput = document.getElementById('f-handle');
        const handleDisplay = document.getElementById('cs-handle-text');
        const updateHandleDisplay = () => {
            const v = handleInput.value.trim().toLowerCase();
            handleDisplay.textContent = v || 'choose_a_handle';
            const valid = /^[a-z0-9_]{3,20}$/.test(v);
            handleDisplay.classList.toggle('valid', valid);
        };
        handleInput.addEventListener('input', () => {
            handleInput.value = handleInput.value.toLowerCase().replace(/[^a-z0-9_]/g, '');
            updateHandleDisplay();
        });
        document.getElementById('btn-generate-handle').addEventListener('click', () => {
            handleInput.value = generateHandle();
            updateHandleDisplay();
            handleInput.focus();
        });

        // ── Track card visual selection ─────────────────────────────
        document.querySelectorAll('.track-card input[type=radio]').forEach(r => {
            r.addEventListener('change', () => {
                document.querySelectorAll('.track-card').forEach(c => c.classList.toggle('selected', c.querySelector('input').checked));
            });
        });

        // ── Stage 5: oath text typewriter ─────────────────────────────
        const OATH = `I, the operative, do solemnly swear:

  ▸ to use my skills with intent — never causing harm,
    never crossing into systems I have no permission to touch.

  ▸ to share what I learn — every senior member was once a beginner,
    and the next one needs me.

  ▸ to operate ethically, even when nobody is watching —
    especially when nobody is watching.

  ▸ to protect, not exploit — the people behind every screen
    are real, and they trust us.

  ▸ to stay curious, stay humble, stay learning —
    confusion is the feeling of growing.

So shall I serve the collective. So shall I represent MMU.
Present everywhere. Seen nowhere.`;

        let oathAnimated = false;
        function animateOath() {
            if (oathAnimated) return;
            oathAnimated = true;
            const target = document.getElementById('oath-text');
            let i = 0;
            const step = () => {
                target.textContent = OATH.slice(0, i);
                if (i < OATH.length) { i += Math.max(1, Math.floor(OATH.length / 200)); requestAnimationFrame(step); }
                else target.textContent = OATH;
            };
            target.textContent = '';
            requestAnimationFrame(step);
        }

        document.getElementById('f-oath').addEventListener('change', (e) => {
            document.getElementById('finalize-btn').disabled = !e.target.checked;
        });

        // ── Stage 6: ID card generation ─────────────────────────────
        const TRACK_LABELS = {
            web: 'WEB SECURITY',
            crypto: 'CRYPTOGRAPHY',
            pwn: 'PWN / REVERSE',
            forensics: 'FORENSICS / OSINT',
            redteam: 'RED TEAM',
            general: 'GENERALIST',
        };
        const TRACK_EMOJI = { web: '🌐', crypto: '🔐', pwn: '💣', forensics: '🔬', redteam: '🎯', general: '🧭' };

        const clearanceLevel = (skill) => {
            // skill 0-6 from 3 questions (0-2 each)
            if (skill <= 1) return 'LEVEL 1 · INITIATE';
            if (skill <= 3) return 'LEVEL 2 · CADET';
            if (skill <= 5) return 'LEVEL 3 · OPERATIVE';
            return 'LEVEL 4 · WRAITH';
        };

        const randomUID = () => {
            const hex = '0123456789ABCDEF';
            const part = (n) => Array.from({length: n}, () => hex[Math.floor(Math.random() * 16)]).join('');
            return `CS-${part(4)}-${part(4)}-${part(4)}`;
        };

        const drawBarcode = (el, seed) => {
            // Generate a deterministic-looking barcode pattern from a seed string
            let h = 0;
            for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) >>> 0;
            const bars = [];
            for (let i = 0; i < 60; i++) {
                h = (h * 1103515245 + 12345) >>> 0;
                const w = (h % 4) + 1;
                const dark = (h % 3) !== 0;
                bars.push(`<span class="bar-${dark ? 'd' : 'l'}" style="width:${w}px"></span>`);
            }
            el.innerHTML = bars.join('');
        };

        function finalizeEnlistment() {
            // Animate the compile lines
            const lines = document.querySelectorAll('.compile-line');
            lines.forEach((l, i) => { l.style.opacity = '0'; setTimeout(() => l.style.opacity = '1', 180 * i); });

            // Reveal card after compile animation
            setTimeout(() => {
                document.getElementById('welcome-title').style.opacity = '1';
                document.getElementById('id-card').classList.add('revealed');
                document.getElementById('next-steps').classList.add('revealed');
            }, 1500);

            // Populate the ID card
            document.getElementById('id-callsign').textContent = '@' + (data.handle || 'operative');
            document.getElementById('id-clearance').textContent = clearanceLevel(data.skill || 0);
            const trackKey = data.track || 'general';
            document.getElementById('id-track').textContent = `${TRACK_EMOJI[trackKey]} ${TRACK_LABELS[trackKey]}`;
            document.getElementById('id-faculty').textContent = (data.faculty || '—').split(' — ')[0];
            document.getElementById('id-date').textContent = new Date().toISOString().slice(0, 10) + ' · 2026 COHORT';

            const uid = data.uid || randomUID();
            data.uid = uid; save();
            document.getElementById('id-uid').textContent = uid;

            drawBarcode(document.getElementById('id-barcode'), uid + (data.handle || ''));

            // Mask emoji based on track
            document.getElementById('id-mask').textContent = TRACK_EMOJI[trackKey] || '👻';
        }

        // ── Stage 6 button actions ─────────────────────────────
        document.getElementById('restart-btn')?.addEventListener('click', () => {
            if (confirm('Reset and start enlistment over? Your saved data will be cleared.')) {
                localStorage.removeItem('cs_enlist_data');
                location.reload();
            }
        });

        document.getElementById('download-id-btn')?.addEventListener('click', () => {
            // Render the ID card to a canvas image and download
            const card = document.getElementById('id-card');
            // Use browser printing as fallback if html2canvas isn't loaded
            const dataText = `CYBERSPECTRE · OPERATIVE ID CARD
─────────────────────────────────
Callsign:   @${data.handle}
Clearance:  ${clearanceLevel(data.skill || 0)}
Track:      ${TRACK_LABELS[data.track || 'general']}
Faculty:    ${(data.faculty || '—').split(' — ')[0]}
Enlisted:   ${new Date().toISOString().slice(0,10)} · 2026 COHORT
Card ID:    ${data.uid}

// PRESENT EVERYWHERE · SEEN NOWHERE
`;
            const blob = new Blob([dataText], { type: 'text/plain' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `cyberspectre-id-${data.handle || 'recruit'}.txt`;
            a.click();
            URL.revokeObjectURL(url);
        });

        // ── Restore previous progress on page load ─────────────────────────────
        if (data.name) document.getElementById('f-name').value = data.name;
        if (data.email) document.getElementById('f-email').value = data.email;
        if (data.faculty) document.getElementById('f-faculty').value = data.faculty;
        if (data.year) document.getElementById('f-year').value = data.year;
        if (data.handle) { handleInput.value = data.handle; updateHandleDisplay(); }
        if (data.track) {
            const r = document.querySelector(`input[name="track"][value="${data.track}"]`);
            if (r) { r.checked = true; r.dispatchEvent(new Event('change')); }
        }

        setStage(1, { silent: true });
    }

    // ====================================================
    // INTERACTIVE KALI SHELL (home page hero terminal)
    // ====================================================
    const kaliInput = document.getElementById('kali-input');
    if (kaliInput) initKaliShell();

    function initKaliShell() {
        const output = document.getElementById('kali-shell-output');
        const livePrompt = document.getElementById('kali-live-prompt');
        const livePromptCwd = document.getElementById('kali-live-cwd');
        const inputRow = kaliInput.closest('.kali-input-row');
        const body = document.getElementById('kali-body');

        // ─── Mock filesystem ─────────────────────────────────
        const fs = {
            '/': { type: 'dir', kids: ['home', 'etc', 'usr', 'tmp', 'var', 'opt', 'root', 'bin'] },
            '/home': { type: 'dir', kids: ['kali'] },
            '/home/kali': { type: 'dir', kids: ['Desktop', 'Documents', 'Downloads', 'tools', 'wordlists', 'README.txt', 'flag.txt', '.bashrc', '.zsh_history'] },
            '/home/kali/Desktop': { type: 'dir', kids: ['ctf-targets.txt', 'mmu-recon.md'] },
            '/home/kali/Documents': { type: 'dir', kids: ['notes.md', 'cyberspectre.txt'] },
            '/home/kali/Downloads': { type: 'dir', kids: [] },
            '/home/kali/tools': { type: 'dir', kids: ['nmap-scripts', 'exploits', 'payloads.txt'] },
            '/home/kali/tools/nmap-scripts': { type: 'dir', kids: ['vuln-scan.nse', 'http-enum.nse'] },
            '/home/kali/tools/exploits': { type: 'dir', kids: ['CVE-2024-XXXX.py', 'shell.php'] },
            '/home/kali/tools/payloads.txt': { type: 'file', content: 'common-passwords.txt\nrockyou.txt → /usr/share/wordlists/\nseclists → /usr/share/seclists/' },
            '/home/kali/wordlists': { type: 'dir', kids: ['rockyou.txt'] },
            '/home/kali/wordlists/rockyou.txt': { type: 'file', content: '<14M passwords. truncated.>\n123456\npassword\nadmin\n... [14,344,388 lines]' },
            '/home/kali/README.txt': { type: 'file', content: 'Welcome to the CyberSpectre Kali sandbox.\n\nThis is a fully interactive in-browser shell. Try:\n  • help                   — show all commands\n  • ls -la                 — list files\n  • nmap 10.10.10.10       — fake nmap scan\n  • cat flag.txt           — try it\n  • hack the_planet        — fun easter egg\n\nNo real systems are accessed. Everything is sandboxed in your browser.' },
            '/home/kali/flag.txt': { type: 'file', content: 'flag{interactive_shell_unlocked}\n\nNice — you found another flag.\nSubmit it on /flags.html for points.' },
            '/home/kali/.bashrc': { type: 'file', content: '# Kali default bashrc (truncated)\nexport PS1="┌──(\\u@\\h)-[\\w]\\n└─\\$ "\nalias ll="ls -alh"\nalias gimme="sudo apt install -y"' },
            '/home/kali/.zsh_history': { type: 'file', content: 'whoami\nls\nnmap -sV scanme.nmap.org\nsudo apt update\nsearchsploit apache\nbinwalk firmware.bin' },
            '/home/kali/Desktop/ctf-targets.txt': { type: 'file', content: '# upcoming targets\n[ ] picoCTF practice\n[ ] HTB easy boxes\n[ ] Wargames.MY 2026\n[ ] CSPECTRE OPEN flagship CTF' },
            '/home/kali/Desktop/mmu-recon.md': { type: 'file', content: '# MMU Recon Notes\n## In-scope\n- mmu.edu.my (public pages only)\n## Out-of-scope\n- ANY active testing without written authorization\n## Note\nWe are an ETHICAL hacking club. Always get permission first.' },
            '/home/kali/Documents/notes.md': { type: 'file', content: '# Year 1 Plan\nFoundations → First Tools → First Vulnerabilities.\nSee Confluence for full plan.' },
            '/home/kali/Documents/cyberspectre.txt': { type: 'file', content: 'Present everywhere. Seen nowhere.\n— CyberSpectre, MMU Cybersecurity Club' },
            '/etc': { type: 'dir', kids: ['passwd', 'shadow', 'hosts', 'os-release'] },
            '/etc/passwd': { type: 'file', content: 'root:x:0:0:root:/root:/bin/bash\nkali:x:1000:1000:Kali Live user,,,:/home/kali:/bin/zsh\n# (truncated for the demo)' },
            '/etc/shadow': { type: 'file', content: 'permission denied (try sudo, or don\'t — this is a sandbox)' },
            '/etc/hosts': { type: 'file', content: '127.0.0.1 localhost\n127.0.1.1 cyberspectre\n10.10.10.10 target.local\n# flag{etc_hosts_holds_the_keys}' },
            '/etc/os-release': { type: 'file', content: 'PRETTY_NAME="Kali GNU/Linux Rolling"\nNAME="Kali GNU/Linux"\nVERSION="2026.1"\nID=kali\nID_LIKE=debian\nHOME_URL="https://www.kali.org/"' },
            '/usr': { type: 'dir', kids: ['share', 'bin', 'local'] },
            '/usr/share': { type: 'dir', kids: ['wordlists', 'seclists', 'metasploit-framework'] },
            '/usr/share/wordlists': { type: 'dir', kids: ['rockyou.txt.gz', 'dirb', 'dirbuster'] },
            '/tmp': { type: 'dir', kids: [] },
            '/var': { type: 'dir', kids: ['log', 'www'] },
            '/var/log': { type: 'dir', kids: ['auth.log'] },
            '/var/log/auth.log': { type: 'file', content: 'May  8 02:41:01 cyberspectre CRON[1337]: nothing suspicious here\nMay  8 02:41:01 cyberspectre sshd[1338]: Accepted publickey for kali\n# logs cleaned. nice try.' },
            '/opt': { type: 'dir', kids: [] },
            '/root': { type: 'dir', kids: ['flag.txt'] },
            '/root/flag.txt': { type: 'file', content: 'flag{i_am_root_in_a_sandbox}\nyou\'ll find more by exploring /etc/hosts and the source.' },
            '/bin': { type: 'dir', kids: ['ls', 'cat', 'cd', 'echo', 'pwd', 'rm', 'mv', 'cp', 'mkdir', 'touch', 'grep', 'find', 'whoami', 'id'] },
        };

        // ─── State ─────────────────────────────────
        let cwd = '/home/kali';
        let history = JSON.parse(localStorage.getItem('cs_kali_history') || '[]');
        let histIdx = -1;
        let draft = '';

        // ─── Path helpers ─────────────────────────────────
        const norm = (path) => {
            if (!path) path = cwd;
            if (path === '~') path = '/home/kali';
            else if (path.startsWith('~/')) path = '/home/kali/' + path.slice(2);
            else if (!path.startsWith('/')) path = cwd + '/' + path;
            const parts = path.split('/').filter(Boolean);
            const stack = [];
            for (const p of parts) {
                if (p === '..') stack.pop();
                else if (p !== '.') stack.push(p);
            }
            return '/' + stack.join('/');
        };

        const exists = (p) => fs[norm(p)] !== undefined;
        const node = (p) => fs[norm(p)];
        const displayCwd = () => cwd === '/home/kali' ? '~' : cwd.replace('/home/kali', '~');

        // ─── Output helpers ─────────────────────────────────
        const printPromptLine = (cmdText) => {
            const promptDiv = document.createElement('div');
            promptDiv.className = 'kali-row prompt-row';
            promptDiv.innerHTML = `<span class="kb">┌──(</span><span class="ku">kali</span><span class="ka">㉿</span><span class="kh">cyberspectre</span><span class="kb">)-[</span><span class="kp">${displayCwd()}</span><span class="kb">]</span>`;
            output.appendChild(promptDiv);

            const cmdDiv = document.createElement('div');
            cmdDiv.className = 'kali-row cmd-row';
            cmdDiv.innerHTML = `<span class="kb">└─</span><span class="kd">$</span> <span class="kcmd"></span>`;
            cmdDiv.querySelector('.kcmd').textContent = cmdText;
            output.appendChild(cmdDiv);
        };

        const print = (text, cls) => {
            if (text === undefined || text === null) return;
            String(text).split('\n').forEach(line => {
                const div = document.createElement('div');
                div.className = 'kali-row out-row ' + (cls || '');
                div.textContent = line;
                output.appendChild(div);
            });
        };

        const printHTML = (html, cls) => {
            const div = document.createElement('div');
            div.className = 'kali-row out-row ' + (cls || '');
            div.innerHTML = html;
            output.appendChild(div);
        };

        const scroll = () => { body.scrollTop = body.scrollHeight; };

        // ─── Commands ─────────────────────────────────
        const cmds = {};

        cmds.help = () => {
            printHTML('<span style="color:#7AA2F7">Available commands:</span>');
            const groups = {
                'Filesystem': ['ls', 'cd', 'pwd', 'cat', 'tree', 'find', 'grep', 'head', 'tail', 'wc', 'touch', 'mkdir', 'echo', 'stat', 'file'],
                'System':     ['whoami', 'id', 'uname', 'uptime', 'date', 'history', 'clear', 'man', 'which', 'sudo', 'ps', 'top', 'df', 'free', 'env', 'export'],
                'Network':    ['ping', 'curl', 'wget', 'whois', 'dig', 'nslookup', 'traceroute', 'ifconfig', 'ip', 'netstat', 'ss'],
                'Kali Tools': ['nmap', 'nikto', 'gobuster', 'hydra', 'sqlmap', 'john', 'hashcat', 'searchsploit', 'msfconsole', 'metasploit', 'aircrack-ng', 'burpsuite', 'wireshark', 'binwalk', 'strings', 'exiftool'],
                'Fun':        ['neofetch', 'cowsay', 'figlet', 'fortune', 'sl', 'matrix', 'hack', 'exit'],
            };
            for (const [g, list] of Object.entries(groups)) {
                printHTML(`  <span style="color:#BB9AF7">${g}:</span>  <span style="color:#9ECE6A">${list.join(', ')}</span>`);
            }
            print('');
            print('Tab to autocomplete · ↑↓ history · Ctrl+L to clear · type any command name to try it.', 'dim');
        };

        cmds.ls = (args) => {
            const flags = args.filter(a => a.startsWith('-')).join('');
            const targets = args.filter(a => !a.startsWith('-'));
            const target = targets[0] || cwd;
            const full = norm(target);
            const n = fs[full];
            if (!n) { print(`ls: cannot access '${target}': No such file or directory`); return; }
            if (n.type === 'file') { print(target); return; }
            const showHidden = flags.includes('a');
            const long = flags.includes('l');
            const kids = n.kids.filter(k => showHidden || !k.startsWith('.'));
            if (long) {
                kids.forEach(k => {
                    const child = fs[full === '/' ? '/' + k : full + '/' + k];
                    const isDir = child && child.type === 'dir';
                    const perms = isDir ? 'drwxr-xr-x' : '-rw-r--r--';
                    const size = isDir ? '4096' : (child?.content?.length || 0).toString().padStart(5, ' ');
                    const date = 'May  8 21:00';
                    const color = isDir ? '#7AA2F7' : (k.endsWith('.txt') || k.endsWith('.md') ? '#C0CAF5' : '#9ECE6A');
                    printHTML(`<span style="color:#80849A">${perms}  kali kali  ${size}  ${date}</span>  <span style="color:${color}">${k}${isDir ? '/' : ''}</span>`);
                });
            } else {
                const colored = kids.map(k => {
                    const child = fs[full === '/' ? '/' + k : full + '/' + k];
                    const isDir = child && child.type === 'dir';
                    const color = isDir ? '#7AA2F7' : (k.endsWith('.sh') || k.endsWith('.py') ? '#9ECE6A' : '#C0CAF5');
                    return `<span style="color:${color}">${k}${isDir ? '/' : ''}</span>`;
                }).join('  ');
                printHTML(colored || '<span class="dim">(empty)</span>');
            }
        };

        cmds.cd = (args) => {
            const target = args[0] || '~';
            const full = norm(target);
            if (!fs[full]) { print(`cd: no such file or directory: ${target}`); return; }
            if (fs[full].type !== 'dir') { print(`cd: not a directory: ${target}`); return; }
            cwd = full;
            livePromptCwd.textContent = displayCwd();
        };

        cmds.pwd = () => print(cwd);

        cmds.cat = (args) => {
            if (!args.length) { print('cat: missing file operand'); return; }
            for (const f of args) {
                const n = node(f);
                if (!n) { print(`cat: ${f}: No such file or directory`); continue; }
                if (n.type === 'dir') { print(`cat: ${f}: Is a directory`); continue; }
                print(n.content);
            }
        };

        cmds.tree = () => {
            const draw = (path, prefix) => {
                const n = fs[path];
                if (!n || n.type !== 'dir') return;
                n.kids.forEach((k, i) => {
                    const last = i === n.kids.length - 1;
                    const childPath = path === '/' ? '/' + k : path + '/' + k;
                    const child = fs[childPath];
                    const isDir = child && child.type === 'dir';
                    printHTML(`${prefix}${last ? '└── ' : '├── '}<span style="color:${isDir ? '#7AA2F7' : '#C0CAF5'}">${k}${isDir ? '/' : ''}</span>`);
                    if (isDir) draw(childPath, prefix + (last ? '    ' : '│   '));
                });
            };
            print(cwd, 'dim');
            draw(cwd, '');
        };

        cmds.find = (args) => {
            const start = args[0] || cwd;
            const target = norm(start);
            const walk = (p) => {
                print(p);
                const n = fs[p];
                if (n && n.type === 'dir') n.kids.forEach(k => walk(p === '/' ? '/' + k : p + '/' + k));
            };
            if (!fs[target]) { print(`find: '${start}': No such file or directory`); return; }
            walk(target);
        };

        cmds.grep = (args) => {
            if (args.length < 2) { print('grep: usage: grep <pattern> <file>'); return; }
            const pattern = args[0], file = args[1];
            const n = node(file);
            if (!n || n.type !== 'file') { print(`grep: ${file}: No such file`); return; }
            const re = new RegExp(pattern, 'i');
            n.content.split('\n').forEach(line => { if (re.test(line)) printHTML(line.replace(re, m => `<span style="color:#F7768E;font-weight:700">${m}</span>`)); });
        };

        cmds.head = (args) => { const n = node(args[0]); if (!n || n.type !== 'file') { print(`head: ${args[0]}: No such file`); return; } n.content.split('\n').slice(0, 10).forEach(l => print(l)); };
        cmds.tail = (args) => { const n = node(args[0]); if (!n || n.type !== 'file') { print(`tail: ${args[0]}: No such file`); return; } n.content.split('\n').slice(-10).forEach(l => print(l)); };
        cmds.wc = (args) => { const n = node(args[0]); if (!n || n.type !== 'file') { print(`wc: ${args[0]}: No such file`); return; } const c = n.content; print(`${c.split('\n').length} ${c.split(/\s+/).length} ${c.length} ${args[0]}`); };
        cmds.echo = (args) => print(args.join(' '));
        cmds.touch = (args) => { if (args[0]) print(''); /* fake */ };
        cmds.mkdir = (args) => { if (args[0]) print(''); /* fake */ };
        cmds.stat = (args) => { const n = node(args[0]); if (!n) { print(`stat: cannot stat '${args[0]}': No such file`); return; } print(`  File: ${args[0]}\n  Size: ${n.content?.length || 4096}\n  Type: ${n.type}\n  Owner: kali`); };
        cmds.file = (args) => { const n = node(args[0]); if (!n) { print(`file: cannot open '${args[0]}'`); return; } print(`${args[0]}: ${n.type === 'dir' ? 'directory' : 'ASCII text'}`); };

        cmds.whoami = () => print('kali');
        cmds.id = () => print('uid=1000(kali) gid=1000(kali) groups=1000(kali),27(sudo)');
        cmds.uname = (args) => { if (args.includes('-a')) print('Linux cyberspectre 6.5.0-spectre #1 SMP PREEMPT_DYNAMIC Kali x86_64 GNU/Linux'); else print('Linux'); };
        cmds.uptime = () => print(' ' + new Date().toTimeString().slice(0,8) + '  up ∞ days,  always watching,  load average: 0.13, 0.07, 0.04');
        cmds.date = () => print(new Date().toString());
        cmds.history = () => history.forEach((c, i) => print(`  ${(i+1).toString().padStart(4)}  ${c}`));
        cmds.clear = () => { output.innerHTML = ''; };
        cmds.man = (args) => print(args[0] ? `No manual entry for ${args[0]} (this is a sandbox).\n\nTry: ${args[0]} --help` : 'What manual page do you want?');
        cmds.which = (args) => { const c = args[0]; if (cmds[c]) print(`/usr/bin/${c}`); else print(`${c} not found`); };
        cmds.sudo = (args) => { if (!args.length) { print('usage: sudo command'); return; } const sub = args[0]; if (cmds[sub]) cmds[sub](args.slice(1)); else print(`sudo: ${sub}: command not found`); };
        cmds.ps = () => { print('  PID TTY          TIME CMD'); print(' 1337 pts/0    00:00:01 zsh'); print(' 1338 pts/0    00:00:00 ps'); };
        cmds.top = () => { print('top - ' + new Date().toTimeString().slice(0,8) + ' up ∞ days,  1 user,  load average: 0.13'); print('Tasks: 137 total,   1 running, 136 sleeping'); print('  PID USER  %CPU %MEM   TIME+  COMMAND'); print(' 1337 kali   0.3  0.4   0:00.42 zsh'); print(' 1338 kali   0.1  0.2   0:00.01 nmap'); print('press q to quit (joke — already quit)'); };
        cmds.df = () => { print('Filesystem     1K-blocks    Used Available Use% Mounted on'); print('/dev/sda1       40960000 8192000  32768000  20% /'); };
        cmds.free = () => { print('               total        used        free      shared'); print('Mem:        16384000     4096000    12288000           0'); };
        cmds.env = () => { print('SHELL=/bin/zsh\nUSER=kali\nHOME=/home/kali\nPATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin\nPWD=' + cwd); };
        cmds.export = () => print('');

        // ─── Network commands (simulated) ─────────────────────────────────
        cmds.ping = (args) => {
            const host = args[0] || 'google.com';
            print(`PING ${host} (142.250.4.${Math.floor(Math.random()*255)}) 56(84) bytes of data.`);
            for (let i = 0; i < 4; i++) {
                const t = (10 + Math.random() * 30).toFixed(1);
                print(`64 bytes from ${host}: icmp_seq=${i+1} ttl=64 time=${t} ms`);
            }
            print('');
            print(`--- ${host} ping statistics ---`);
            print('4 packets transmitted, 4 received, 0% packet loss');
        };

        cmds.curl = (args) => {
            const url = args[args.length-1];
            if (!url) { print('curl: try \'curl --help\' for more information'); return; }
            print(`<!DOCTYPE html>\n<html>\n<head><title>${url}</title></head>\n<body>\n<h1>It works!</h1>\n<!-- this is a fake response. real curl would actually fetch ${url} -->\n</body>\n</html>`);
        };

        cmds.wget = (args) => { print(`--${new Date().toISOString()}--  ${args[0] || ''}\nResolving... 142.250.4.99\nConnecting... connected.\nHTTP request sent, awaiting response... 200 OK\nLength: unspecified [text/html]\n\nfile saved [4096 bytes]`); };

        cmds.whois = (args) => {
            const d = args[0] || 'mmu.edu.my';
            print(`Domain Name: ${d.toUpperCase()}\nRegistrar: MYNIC Berhad\nUpdated: 2025-01-01\nCreated: 1994-09-21\nName Server: ns1.${d}\nName Server: ns2.${d}\nStatus: clientTransferProhibited\n# (truncated demo output)`);
        };

        cmds.dig = (args) => {
            const d = args[0] || 'mmu.edu.my';
            print(`; <<>> DiG 9.18 <<>> ${d}\n;; ANSWER SECTION:\n${d}.   3600   IN   A   103.106.${Math.floor(Math.random()*255)}.${Math.floor(Math.random()*255)}\n;; Query time: 23 msec\n;; SERVER: 1.1.1.1#53(1.1.1.1)`);
        };
        cmds.nslookup = cmds.dig;

        cmds.traceroute = (args) => {
            const d = args[0] || 'google.com';
            print(`traceroute to ${d}, 30 hops max, 60 byte packets`);
            ['10.0.0.1', '192.168.1.1', '203.106.1.1', '142.250.4.1'].forEach((h, i) => print(` ${i+1}  ${h}  ${(2+i*5+Math.random()*3).toFixed(1)} ms`));
        };

        cmds.ifconfig = () => print('eth0: flags=4163<UP,BROADCAST,RUNNING,MULTICAST>  mtu 1500\n        inet 10.0.0.4  netmask 255.255.255.0  broadcast 10.0.0.255\n        ether 00:1a:2b:3c:4d:5e\nlo: flags=73<UP,LOOPBACK,RUNNING>  mtu 65536\n        inet 127.0.0.1  netmask 255.0.0.0');
        cmds.ip = (args) => { if (args[0] === 'a' || args[0] === 'addr') cmds.ifconfig(); else print('Usage: ip { a | addr | route | link } '); };
        cmds.netstat = () => { print('Active connections:'); print('Proto  Local           Foreign         State'); print('tcp    127.0.0.1:8080   0.0.0.0:*       LISTEN'); print('tcp    10.0.0.4:55432  142.250.4.99:443 ESTABLISHED'); };
        cmds.ss = cmds.netstat;

        // ─── Kali tools (simulated) ─────────────────────────────────
        cmds.nmap = (args) => {
            const target = args[args.length-1] || 'scanme.nmap.org';
            print(`Starting Nmap 7.94 ( https://nmap.org )`);
            print(`Nmap scan report for ${target} (10.10.10.${Math.floor(Math.random()*254)+1})`);
            print(`Host is up (0.${Math.floor(Math.random()*99)}s latency).`);
            print('Not shown: 996 closed ports');
            print('PORT      STATE  SERVICE      VERSION');
            print('22/tcp    open   ssh          OpenSSH 8.2');
            print('80/tcp    open   http         Apache 2.4.41');
            print('443/tcp   open   https        Apache 2.4.41 (TLS 1.3)');
            print('3306/tcp  open   mysql        MySQL 8.0.32');
            print('');
            print(`Nmap done: 1 IP address (1 host up) scanned in ${(2+Math.random()*4).toFixed(2)} seconds`);
        };

        cmds.nikto = (args) => {
            const t = args[args.indexOf('-h')+1] || args[args.length-1] || 'target';
            print(`- Nikto v2.5.0`);
            print(`+ Target IP:   10.10.10.42`);
            print(`+ Target Host: ${t}`);
            print(`+ Server: Apache/2.4.41`);
            print(`+ /admin/: This might be interesting...`);
            print(`+ /robots.txt: contains 4 entries`);
            print(`+ /backup/: Directory indexing found.`);
            print(`+ ${10 + Math.floor(Math.random()*20)} item(s) reported`);
        };

        cmds.gobuster = (args) => {
            print('===============================================================');
            print('Gobuster v3.6');
            print('===============================================================');
            ['admin', 'api', 'backup', 'config', 'login', 'uploads', 'wp-admin'].forEach(d => print(`/${d}                  (Status: 200) [Size: ${500+Math.floor(Math.random()*5000)}]`));
            print('===============================================================');
        };

        cmds.hydra = () => { print('Hydra v9.5 — login brute force tool'); print('[ATTEMPT] target target.local - login "admin" - pass "password"'); print('[ATTEMPT] target target.local - login "admin" - pass "admin"'); print('[80][http-post-form] host: target.local   login: admin   password: <demo>'); print(''); print('# Reminder: only run against systems you have permission to test.'); };

        cmds.sqlmap = () => { print('         __H__'); print('   ___ ___[(]_____ ___ ___  {1.7.10#stable}'); print('  |_ -| . [\']     | .\'| . |'); print('  |___|_  ["]_|_|_|__,|  _|'); print('        |_|V...       |_|   https://sqlmap.org'); print(''); print('[*] starting @ ' + new Date().toTimeString().slice(0,8)); print('[INFO] testing connection to the target URL'); print('[INFO] target appears to be vulnerable. (demo)'); };

        cmds.john = () => { print('John the Ripper 1.9.0-jumbo-1'); print('Loaded 1 password hash (sha256crypt)'); print('Will run 8 OpenMP threads'); print('Press \'q\' or Ctrl-C to abort, almost any other key for status'); print('demo123          (kali)'); print('1g 0:00:00:01 DONE'); };

        cmds.hashcat = () => { print('hashcat (v6.2.6) starting'); print('Cracking SHA-256 hashes...'); print('GPU: utilization 92%'); print('demo:5e884898da280471...'); print('Status: Cracked'); print('Time.Estimated: 0 secs'); };

        cmds.searchsploit = (args) => {
            const term = args.join(' ') || 'apache';
            print('-----------------------------------------------------------------------------------------');
            print(' Exploit Title                                          |  Path');
            print('-----------------------------------------------------------------------------------------');
            print(` ${term} 2.4.49 - Path Traversal & RCE                    | linux/webapps/50383.py`);
            print(` ${term} 2.4.50 - Path Traversal & RCE                    | linux/webapps/50406.py`);
            print(` ${term} mod_proxy - Buffer Overflow                      | linux/remote/2237.c`);
            print('-----------------------------------------------------------------------------------------');
        };

        cmds.msfconsole = () => { print('       =[ metasploit v6.3.42-dev                          ]'); print('+ -- --=[ 2378 exploits - 1234 auxiliary - 412 post       ]'); print('+ -- --=[ 968 payloads - 45 encoders - 11 nops             ]'); print(''); print('msf6 > # this is a sandbox — try `searchsploit apache` instead'); };
        cmds.metasploit = cmds.msfconsole;

        cmds['aircrack-ng'] = () => { print('Aircrack-ng 1.7'); print('Reading captured packets...'); print('  KEY FOUND! [ DEM0_W1F1_K3Y ]'); print('  Master Key: 11:22:33:44:55:66:77:88:99:00'); };
        cmds.burpsuite = () => { print('Burp Suite Community Edition...'); print('(opens in real life — not in this sandbox)'); print('Configure browser proxy: 127.0.0.1:8080'); };
        cmds.wireshark = () => { print('Wireshark 4.0.10'); print('(requires GUI — try `tshark -i eth0` instead)'); };
        cmds.binwalk = (args) => { print(`Scanning ${args[0] || 'firmware.bin'}...`); print('DECIMAL    HEX        DESCRIPTION'); print('-----------------------------------------------'); print('0          0x0        uImage header, header size: 64 bytes'); print('64         0x40       LZMA compressed data'); print('1056784    0x101F50   Squashfs filesystem, little endian'); };
        cmds.strings = (args) => { const f = node(args[0]); if (f && f.type === 'file') f.content.split(/[^\x20-\x7e]+/).filter(s => s.length >= 4).forEach(s => print(s)); else print(`strings: ${args[0]}: No such file`); };
        cmds.exiftool = () => { print('ExifTool Version Number         : 12.70'); print('File Name                       : photo.jpg'); print('GPS Latitude                    : 3 deg 4\' 19" N'); print('GPS Longitude                   : 101 deg 41\' 51" E'); };

        // ─── Fun ─────────────────────────────────
        cmds.neofetch = () => {
            const lines = [
                '       <span style="color:#7AA2F7">,;:::;,</span>                kali@cyberspectre',
                '     <span style="color:#7AA2F7">..,XCO0OOXc,.</span>            ─────────────────',
                '   <span style="color:#7AA2F7">,oxx00OkkkkkOXNk,</span>          OS: Kali GNU/Linux Rolling',
                '  <span style="color:#7AA2F7">cxOO0kxxxxxxxxkOOO0c</span>        Host: cyberspectre@mmu',
                ' <span style="color:#7AA2F7">cOOkxxxxxxxxxxxxxxxOOc</span>       Kernel: 6.5.0-spectre',
                '<span style="color:#7AA2F7">.OOxxxxxxxxxxxxxxxxxxOO.</span>      Uptime: ∞ (always watching)',
                '<span style="color:#7AA2F7">cOxxxxxxxxxxxxxxxxxxxxOc</span>      Shell: zsh — but spookier',
                '<span style="color:#7AA2F7">.OOxxxxxxxxxxxxxxxxxxOO.</span>      Members: 120+',
                ' <span style="color:#7AA2F7">cOOxxxxxxxxxxxxxxxxOOc</span>       CTFs: 12 / 68% wins',
                '  <span style="color:#7AA2F7">cOOOxxxxxxxxxxxxOOOc</span>        Tagline: present everywhere · seen nowhere',
            ];
            lines.forEach(l => printHTML(l, 'mono'));
        };

        cmds.cowsay = (args) => {
            const text = args.join(' ') || 'moo!';
            const top = ' ' + '_'.repeat(text.length + 2);
            const bot = ' ' + '-'.repeat(text.length + 2);
            print(top); print('< ' + text + ' >'); print(bot);
            print('        \\   ^__^');
            print('         \\  (oo)\\_______');
            print('            (__)\\       )\\/\\');
            print('                ||----w |');
            print('                ||     ||');
        };

        cmds.figlet = (args) => {
            const t = (args.join(' ') || 'CYBERSPECTRE').toUpperCase();
            print('  _____  _   _  ____   _____  ____   ____');
            print(' |     || | | |/ __ \\ /  _  \\/ __ \\ / __ \\');
            print(' |  ' + t.slice(0, 4) + '  | | | |');
            print(' (truncated — figlet is fake here, sorry)');
        };

        cmds.fortune = () => {
            const quotes = [
                'The quieter you become, the more you can hear.   — Kali motto',
                'There is no such thing as a stupid question. Only stupid systems.',
                'Hack the planet — but always with permission.',
                'Recon before exploit. Always.',
                'flag{fortune_favors_the_curious}',
                'A perfect knowledge of the rules of engagement is half the battle.',
            ];
            print(quotes[Math.floor(Math.random() * quotes.length)]);
        };

        cmds.sl = () => { print('       (  ) (@@) ( )  (@)  ()    @@    O     @     O     @      O'); print('  (@@@@) ___          /-_____'); print('             (((    (___) ()))_______________)))'); print('(joke — sl prints a steam locomotive when you mistype `ls`)'); };

        cmds.matrix = () => { print('Entering SPECTRE MODE...'); setTimeout(() => triggerMatrixRain(), 400); };

        cmds.hack = (args) => {
            const target = args.join(' ') || 'the_planet';
            const steps = [
                `[*] Scanning ${target}...`,
                `[+] Found 3 open ports`,
                `[*] Fingerprinting...`,
                `[+] Apache 2.4.41 detected`,
                `[*] Searching exploit-db...`,
                `[+] CVE-2021-41773 looks promising`,
                `[*] Crafting payload...`,
                `[+] Payload ready`,
                `[*] Sending request...`,
                `[+] Got shell!`,
                `[+] flag{hollywood_hacking_at_its_finest}`,
                ``,
                `// jk this is a sandbox. real hacking takes way longer and only on systems you own.`,
            ];
            let i = 0;
            const tick = () => {
                if (i >= steps.length) return;
                print(steps[i], i === 10 ? 'ok' : '');
                scroll();
                i++;
                setTimeout(tick, 200);
            };
            tick();
        };

        cmds.exit = () => { print('logout'); print('// terminal closed (just refresh the page to bring it back)'); kaliInput.disabled = true; inputRow.style.opacity = '0.4'; };
        cmds.logout = cmds.exit;

        // ─── Aliases ─────────────────────────────────
        cmds.ll = (a) => cmds.ls(['-la', ...a]);
        cmds.la = (a) => cmds.ls(['-a', ...a]);
        cmds.dir = cmds.ls;

        // ─── Tab completion ─────────────────────────────────
        const allCommands = Object.keys(cmds).sort();

        const complete = () => {
            const val = kaliInput.value;
            const cursor = kaliInput.selectionStart;
            const before = val.slice(0, cursor);
            const tokens = before.split(/\s+/);
            const isFirst = tokens.length === 1;
            const last = tokens[tokens.length - 1];

            let candidates = [];
            if (isFirst) {
                candidates = allCommands.filter(c => c.startsWith(last));
            } else {
                // Path completion
                const slash = last.lastIndexOf('/');
                const dir = slash >= 0 ? norm(last.slice(0, slash) || '/') : cwd;
                const prefix = slash >= 0 ? last.slice(slash + 1) : last;
                const dirNode = fs[dir];
                if (dirNode && dirNode.type === 'dir') {
                    candidates = dirNode.kids.filter(k => k.startsWith(prefix)).map(k => {
                        const childPath = dir === '/' ? '/' + k : dir + '/' + k;
                        const isDir = fs[childPath]?.type === 'dir';
                        return (slash >= 0 ? last.slice(0, slash + 1) : '') + k + (isDir ? '/' : '');
                    });
                }
            }

            if (candidates.length === 0) return;
            if (candidates.length === 1) {
                const completed = candidates[0] + (isFirst ? ' ' : '');
                kaliInput.value = before.slice(0, before.length - last.length) + completed + val.slice(cursor);
                kaliInput.setSelectionRange(before.length - last.length + completed.length, before.length - last.length + completed.length);
            } else {
                printPromptLine(val);
                printHTML(candidates.map(c => `<span style="color:#9ECE6A">${c}</span>`).join('  '));
                scroll();
                // common prefix
                const common = candidates.reduce((a, b) => { let i = 0; while (i < a.length && a[i] === b[i]) i++; return a.slice(0, i); });
                if (common.length > last.length) {
                    kaliInput.value = before.slice(0, before.length - last.length) + common + val.slice(cursor);
                }
            }
        };

        // ─── Run command ─────────────────────────────────
        const run = (line) => {
            const trimmed = line.trim();
            printPromptLine(line);
            if (trimmed) {
                history.push(trimmed);
                if (history.length > 200) history = history.slice(-200);
                localStorage.setItem('cs_kali_history', JSON.stringify(history));
                const tokens = trimmed.split(/\s+/);
                const cmd = tokens[0];
                const args = tokens.slice(1);
                if (cmds[cmd]) {
                    try { cmds[cmd](args); }
                    catch (e) { print(`error: ${e.message}`); }
                } else if (cmd.includes('=')) {
                    // env assignment, ignore
                } else {
                    print(`zsh: command not found: ${cmd}`);
                    print(`  did you mean: ${allCommands.filter(c => Math.abs(c.length - cmd.length) <= 2 && c.includes(cmd[0] || '')).slice(0, 4).join(', ') || 'help'}?`, 'dim');
                }
            }
            histIdx = -1;
            draft = '';
            scroll();
        };

        // ─── Input handling ─────────────────────────────────
        kaliInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                const line = kaliInput.value;
                kaliInput.value = '';
                run(line);
            } else if (e.key === 'Tab') {
                e.preventDefault();
                complete();
            } else if (e.key === 'ArrowUp') {
                e.preventDefault();
                if (histIdx === -1) draft = kaliInput.value;
                if (histIdx < history.length - 1) {
                    histIdx++;
                    kaliInput.value = history[history.length - 1 - histIdx];
                    setTimeout(() => kaliInput.setSelectionRange(kaliInput.value.length, kaliInput.value.length), 0);
                }
            } else if (e.key === 'ArrowDown') {
                e.preventDefault();
                if (histIdx > 0) { histIdx--; kaliInput.value = history[history.length - 1 - histIdx]; }
                else if (histIdx === 0) { histIdx = -1; kaliInput.value = draft; }
            } else if ((e.ctrlKey || e.metaKey) && e.key === 'l') {
                e.preventDefault();
                cmds.clear();
            } else if ((e.ctrlKey || e.metaKey) && e.key === 'c') {
                e.preventDefault();
                printPromptLine(kaliInput.value + '^C');
                kaliInput.value = '';
                histIdx = -1;
            }
        });

        // Click anywhere on the body to focus the input
        body.addEventListener('click', (e) => {
            if (window.getSelection().toString()) return; // don't steal focus when selecting text
            kaliInput.focus();
        });

        // Welcome message
        setTimeout(() => {
            print('', 'dim');
            print('Interactive shell ready. Type `help` to see all commands.', 'dim');
            print('Try: ls, cat README.txt, nmap 10.10.10.10, hack the_planet', 'dim');
            scroll();
        }, 200);
    }

    // ====================================================
    // HACKER TOOLS HUB — tools.html interactive logic
    // ====================================================
    if (document.querySelector('.tools-grid')) {
        const $ = (id) => document.getElementById(id);
        const setOut = (id, val) => { const el = $(id); if (el) el.textContent = val; };

        // Caesar shift slider
        const caesarSlider = $('caesar-shift');
        const caesarVal = $('caesar-shift-value');
        if (caesarSlider) caesarSlider.addEventListener('input', () => caesarVal.textContent = caesarSlider.value);

        const caesar = (text, shift) => text.replace(/[a-zA-Z]/g, c => {
            const base = c <= 'Z' ? 65 : 97;
            return String.fromCharCode((c.charCodeAt(0) - base + shift + 26) % 26 + base);
        });

        const sha256 = async (text) => {
            const buf = new TextEncoder().encode(text);
            const hash = await crypto.subtle.digest('SHA-256', buf);
            return Array.from(new Uint8Array(hash)).map(b => b.toString(16).padStart(2, '0')).join('');
        };

        const copy = (text) => navigator.clipboard?.writeText(text);

        const actions = {
            'b64-encode': () => { try { setOut('b64-output', btoa($('b64-input').value)); } catch(e) { setOut('b64-output', '⚠ contains non-Latin1 characters'); } },
            'b64-decode': () => { try { setOut('b64-output', atob($('b64-input').value.trim())); } catch(e) { setOut('b64-output', '⚠ invalid Base64'); } },
            'b64-copy':   () => copy($('b64-output').textContent),

            'caesar-shift': () => setOut('caesar-output', caesar($('caesar-input').value, parseInt(caesarSlider.value))),
            'caesar-bruteforce': () => {
                const text = $('caesar-input').value;
                const out = Array.from({length: 25}, (_, i) => `[${(i+1).toString().padStart(2,'0')}] ${caesar(text, i+1)}`).join('\n');
                setOut('caesar-output', out);
            },
            'caesar-copy': () => copy($('caesar-output').textContent),

            'rot13-go':   () => setOut('rot13-output', caesar($('rot13-input').value, 13)),
            'rot13-copy': () => copy($('rot13-output').textContent),

            'hex-encode': () => setOut('hex-output', Array.from($('hex-input').value).map(c => c.charCodeAt(0).toString(16).padStart(2, '0')).join(' ')),
            'hex-decode': () => {
                try {
                    const cleaned = $('hex-input').value.replace(/\s+/g, '').replace(/^0x/i, '');
                    if (!/^[0-9a-fA-F]+$/.test(cleaned) || cleaned.length % 2 !== 0) { setOut('hex-output', '⚠ invalid hex'); return; }
                    setOut('hex-output', cleaned.match(/.{2}/g).map(b => String.fromCharCode(parseInt(b, 16))).join(''));
                } catch(e) { setOut('hex-output', '⚠ invalid hex'); }
            },
            'hex-copy':   () => copy($('hex-output').textContent),

            'url-encode': () => setOut('url-output', encodeURIComponent($('url-input').value)),
            'url-decode': () => { try { setOut('url-output', decodeURIComponent($('url-input').value)); } catch(e) { setOut('url-output', '⚠ invalid URL encoding'); } },
            'url-copy':   () => copy($('url-output').textContent),

            'hash-go':    async () => setOut('hash-output', await sha256($('hash-input').value)),
            'hash-copy':  () => copy($('hash-output').textContent),

            'bin-encode': () => setOut('bin-output', Array.from($('bin-input').value).map(c => c.charCodeAt(0).toString(2).padStart(8, '0')).join(' ')),
            'bin-decode': () => {
                try {
                    const cleaned = $('bin-input').value.replace(/\s+/g, '');
                    if (!/^[01]+$/.test(cleaned) || cleaned.length % 8 !== 0) { setOut('bin-output', '⚠ invalid binary (must be groups of 8 bits)'); return; }
                    setOut('bin-output', cleaned.match(/.{8}/g).map(b => String.fromCharCode(parseInt(b, 2))).join(''));
                } catch(e) { setOut('bin-output', '⚠ invalid binary'); }
            },
            'bin-copy':   () => copy($('bin-output').textContent),

            'rev-go':     () => setOut('rev-output', Array.from($('rev-input').value).reverse().join('')),
            'rev-copy':   () => copy($('rev-output').textContent),
        };

        document.querySelectorAll('[data-action]').forEach(btn => {
            btn.addEventListener('click', () => {
                const action = btn.dataset.action;
                if (actions[action]) actions[action]();
            });
        });
    }

    // ====================================================
    // FLAG HUNT — flags.html submission + persistence
    // ====================================================
    const VALID_FLAGS = {
        'flag{welcome_to_the_machine}':       { mission: 1, points: 10, label: 'Welcome Mat' },
        'flag{about_the_about_page}':          { mission: 2, points: 10, label: 'About Face' },
        'flag{programs_have_secrets_too}':     { mission: 3, points: 10, label: 'Programs Whisper' },
        'flag{recon_pays_off_check_tools}':    { mission: 4, points: 10, label: 'Tools Don\'t Lie' },
        'flag{sharp_eyes_open}':               { mission: 5, points: 15, label: 'Tool\'s Microchallenge' },
        'flag{console_logs_reveal_secrets}':   { mission: 6, points: 10, label: 'Console Logs' },
        'flag{up_up_down_down_left_right}':    { mission: 7, points: 15, label: 'Konami\'s Honor' },
        'flag{slash_unlocks_the_terminal}':    { mission: 8, points: 15, label: 'The Slash' },
        'flag{robots_dot_txt_is_open_intel}':  { mission: 9, points: 10, label: 'Robot Overlords' },
        'flag{display_none_isnt_security}':    { mission: 10, points: 20, label: 'Final Boss' },
    };
    const TOTAL_FLAGS = Object.keys(VALID_FLAGS).length;
    const TOTAL_POINTS = Object.values(VALID_FLAGS).reduce((s, f) => s + f.points, 0);

    const getFoundFlags = () => JSON.parse(localStorage.getItem('cs_found_flags') || '[]');
    const saveFoundFlags = (arr) => localStorage.setItem('cs_found_flags', JSON.stringify(arr));

    const rankFor = (n) => {
        if (n === 0) return 'ROOKIE 🌱';
        if (n <= 2) return 'CADET 🟢';
        if (n <= 4) return 'AGENT 🟡';
        if (n <= 6) return 'OPERATIVE 🟠';
        if (n <= 8) return 'SHADOW 🔴';
        if (n < TOTAL_FLAGS) return 'SPECTRE 🟣';
        return 'GHOST 👻 — ALL FLAGS FOUND';
    };

    const huntForm = document.getElementById('hunt-form');
    if (huntForm) {
        const updateHuntUI = () => {
            const found = getFoundFlags();
            const points = found.reduce((s, f) => s + (VALID_FLAGS[f]?.points || 0), 0);
            document.getElementById('hunt-found').textContent = found.length;
            document.getElementById('hunt-total').textContent = TOTAL_FLAGS;
            document.getElementById('hunt-rank').textContent = `Rank: ${rankFor(found.length)} · ${points}/${TOTAL_POINTS} pts`;
            document.getElementById('hunt-progress-fill').style.width = (found.length / TOTAL_FLAGS * 100) + '%';
            document.querySelectorAll('.mission-card').forEach(card => {
                const num = parseInt(card.dataset.mission);
                const isFound = found.some(f => VALID_FLAGS[f]?.mission === num);
                card.classList.toggle('found', isFound);
                const tick = card.querySelector('.mission-tick');
                if (tick) tick.textContent = isFound ? '✅' : '⬜';
            });
        };

        huntForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const input = document.getElementById('hunt-input');
            const feedback = document.getElementById('hunt-feedback');
            const raw = input.value.trim().toLowerCase();
            const found = getFoundFlags();

            if (VALID_FLAGS[raw]) {
                if (found.includes(raw)) {
                    feedback.className = 'hunt-feedback warn';
                    feedback.textContent = `🟡 Already submitted: ${VALID_FLAGS[raw].label}`;
                } else {
                    found.push(raw);
                    saveFoundFlags(found);
                    feedback.className = 'hunt-feedback success';
                    feedback.textContent = `✅ FLAG ACCEPTED · ${VALID_FLAGS[raw].label} · +${VALID_FLAGS[raw].points} pts`;
                    updateHuntUI();
                    input.value = '';
                    if (found.length === TOTAL_FLAGS) {
                        setTimeout(() => alert('🎉 ALL 10 FLAGS FOUND!\n\nYou are now a CyberSpectre GHOST. Screenshot this and post it in Discord — you\'ve earned a place in the Hall of Fame.'), 300);
                    }
                }
            } else {
                feedback.className = 'hunt-feedback fail';
                feedback.textContent = '❌ Not a valid flag. Keep hunting.';
            }
        });

        document.getElementById('hunt-reset').addEventListener('click', () => {
            if (confirm('Reset all your flag-hunt progress?')) {
                localStorage.removeItem('cs_found_flags');
                updateHuntUI();
                document.getElementById('hunt-feedback').textContent = '';
            }
        });

        updateHuntUI();
    }

    // ====================================================
    // KONAMI CODE → MATRIX RAIN
    // ====================================================
    const KONAMI = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a'];
    let konamiBuf = [];
    document.addEventListener('keydown', (e) => {
        konamiBuf.push(e.key.length === 1 ? e.key.toLowerCase() : e.key);
        if (konamiBuf.length > KONAMI.length) konamiBuf.shift();
        if (konamiBuf.length === KONAMI.length && konamiBuf.every((k, i) => k === KONAMI[i])) {
            triggerMatrixRain();
            konamiBuf = [];
        }
    });

    function triggerMatrixRain() {
        if (document.getElementById('matrix-rain-canvas')) return;
        const canvas = document.createElement('canvas');
        canvas.id = 'matrix-rain-canvas';
        canvas.style.cssText = 'position:fixed;inset:0;width:100vw;height:100vh;z-index:9999;background:rgba(0,0,0,0.95);pointer-events:none;';
        document.body.appendChild(canvas);

        const banner = document.createElement('div');
        banner.style.cssText = 'position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);z-index:10000;color:#4ADE80;font-family:monospace;text-align:center;text-shadow:0 0 20px #4ADE80;animation:fadeOut 5s forwards;';
        banner.innerHTML = '<div style="font-size:3rem;font-weight:700;letter-spacing:0.4em;">SPECTRE MODE</div><div style="margin-top:1rem;font-size:1rem;opacity:0.7;">flag{up_up_down_down_left_right}</div><div style="margin-top:1.5rem;font-size:0.75rem;opacity:0.5;">submit it on /flags.html · press ESC to exit</div>';
        document.body.appendChild(banner);
        const fadeStyle = document.createElement('style');
        fadeStyle.textContent = '@keyframes fadeOut{0%,40%{opacity:1}100%{opacity:0;visibility:hidden}}';
        document.head.appendChild(fadeStyle);

        const ctx = canvas.getContext('2d');
        const resize = () => { canvas.width = innerWidth; canvas.height = innerHeight; };
        resize();
        window.addEventListener('resize', resize);

        const chars = '01ABCDEFFLAGCYBERSPECTRE@#$%MMU{}[]'.split('');
        const fontSize = 16;
        const columns = Math.floor(canvas.width / fontSize);
        const drops = Array(columns).fill(1);

        let raf;
        const draw = () => {
            ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = '#4ADE80';
            ctx.font = `${fontSize}px monospace`;
            for (let i = 0; i < drops.length; i++) {
                const text = chars[Math.floor(Math.random() * chars.length)];
                ctx.fillText(text, i * fontSize, drops[i] * fontSize);
                if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) drops[i] = 0;
                drops[i]++;
            }
            raf = requestAnimationFrame(draw);
        };
        draw();

        const exit = (e) => {
            if (e.key === 'Escape') {
                cancelAnimationFrame(raf);
                canvas.remove();
                banner.remove();
                document.removeEventListener('keydown', exit);
            }
        };
        document.addEventListener('keydown', exit);
    }

    // ====================================================
    // COMMAND PALETTE — press "/" anywhere to open
    // ====================================================
    document.addEventListener('keydown', (e) => {
        const tag = (e.target.tagName || '').toUpperCase();
        if (tag === 'INPUT' || tag === 'TEXTAREA') return;
        if (e.key === '/' && !document.getElementById('cmd-palette')) {
            e.preventDefault();
            openCommandPalette();
        }
    });

    function openCommandPalette() {
        const overlay = document.createElement('div');
        overlay.id = 'cmd-palette';
        overlay.innerHTML = `
            <div class="cmd-modal">
                <div class="cmd-prompt">cyberspectre@mmu:~$ <input type="text" id="cmd-input" autofocus placeholder="type 'help' and press Enter..." autocomplete="off"></div>
                <div class="cmd-output" id="cmd-output"></div>
                <div class="cmd-hint">esc to close · ↑↓ history</div>
            </div>
        `;
        document.body.appendChild(overlay);

        const input = document.getElementById('cmd-input');
        const output = document.getElementById('cmd-output');
        const history = [];
        let histIdx = -1;

        const print = (text, cls) => {
            const line = document.createElement('div');
            line.className = 'cmd-line ' + (cls || '');
            line.textContent = text;
            output.appendChild(line);
            output.scrollTop = output.scrollHeight;
        };

        const commands = {
            help: () => {
                print('Available commands:', 'cmd-info');
                print('  goto <page>    — navigate (home, about, programs, events, tools, flags, join, faq, scoreboard, quiz, recon, partners)');
                print('  whoami         — display current identity');
                print('  ls             — list pages');
                print('  cat <page>     — show page summary');
                print('  date           — current date');
                print('  flag           — drop a flag for the curious 🚩');
                print('  matrix         — enter SPECTRE MODE');
                print('  clear          — clear screen');
                print('  exit           — close palette');
            },
            ls: () => print('home  about  programs  events  tools  flags  join  faq  scoreboard  quiz  recon  partners', 'cmd-info'),
            whoami: () => print('guest@cyberspectre · join us at /join.html', 'cmd-info'),
            date: () => print(new Date().toString(), 'cmd-info'),
            flag: () => print('flag{slash_unlocks_the_terminal}', 'cmd-flag'),
            clear: () => { output.innerHTML = ''; },
            exit: () => overlay.remove(),
            matrix: () => { overlay.remove(); triggerMatrixRain(); },
        };

        const goto = (page) => {
            const map = {home:'index.html',about:'about.html',programs:'programs.html',events:'events.html',tools:'tools.html',flags:'flags.html',join:'join.html',faq:'faq.html',scoreboard:'scoreboard.html',quiz:'quiz.html',recon:'recon.html',partners:'partners.html'};
            if (map[page]) { window.location.href = map[page]; return true; }
            return false;
        };

        const summaries = {
            home: 'CyberSpectre — MMU\'s elite cybersecurity collective.',
            about: 'The mission, manifesto, and what makes us different.',
            programs: 'Five tracks. From beginner to elite.',
            events: 'CTFs, workshops, and talks.',
            tools: 'Hacker toolkit — Base64, Caesar, ROT13, Hex, URL, SHA-256, Binary, Reverse.',
            flags: 'Find 10 hidden flags across the site. Earn your rank.',
            join: 'Survey demand, what\'s open, how to enlist.',
            faq: 'Common questions before joining.',
            scoreboard: 'Top operators this month.',
        };

        const run = (cmd) => {
            const trimmed = cmd.trim();
            if (!trimmed) return;
            print('cyberspectre@mmu:~$ ' + trimmed, 'cmd-prompt-line');
            history.unshift(trimmed);
            histIdx = -1;
            const [base, ...args] = trimmed.split(/\s+/);
            if (commands[base]) { commands[base](...args); return; }
            if (base === 'goto' && args[0]) {
                if (!goto(args[0])) print(`goto: unknown page '${args[0]}'`, 'cmd-error');
                return;
            }
            if (base === 'cat' && args[0]) {
                print(summaries[args[0]] || `cat: ${args[0]}: No such page`, summaries[args[0]] ? 'cmd-info' : 'cmd-error');
                return;
            }
            print(`command not found: ${base}. type 'help' for a list.`, 'cmd-error');
        };

        input.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') { run(input.value); input.value = ''; }
            else if (e.key === 'Escape') overlay.remove();
            else if (e.key === 'ArrowUp') { if (histIdx < history.length - 1) input.value = history[++histIdx]; e.preventDefault(); }
            else if (e.key === 'ArrowDown') { if (histIdx > 0) input.value = history[--histIdx]; else { histIdx = -1; input.value = ''; } e.preventDefault(); }
        });

        overlay.addEventListener('click', (e) => { if (e.target === overlay) overlay.remove(); });

        // Welcome banner
        print('CyberSpectre Command Palette · v1.0', 'cmd-info');
        print('type "help" for commands, "exit" to close', 'cmd-info');
    }
})();
