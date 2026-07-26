document.addEventListener('DOMContentLoaded', () => {
    // Register Plugins
    gsap.registerPlugin(ScrollTrigger);

    // Custom Cursor
    const cursor = document.querySelector('.custom-cursor');
    const xTo = gsap.quickTo(cursor, "x", {duration: 0.1, ease: "power3"});
    const yTo = gsap.quickTo(cursor, "y", {duration: 0.1, ease: "power3"});

    window.addEventListener("mousemove", e => {
        xTo(e.clientX - 10);
        yTo(e.clientY - 10);
    });

    // Mesh Movement Effect
    const mesh = document.getElementById('mesh-container');
    window.addEventListener('mousemove', (e) => {
        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;
        
        gsap.to(mesh, {
            background: `
                radial-gradient(circle at ${x * 100}% ${y * 100}%, rgba(255, 62, 0, 0.1) 0%, transparent 50%),
                radial-gradient(circle at ${100 - x * 100}% ${100 - y * 100}%, rgba(0, 255, 204, 0.1) 0%, transparent 40%)
            `,
            duration: 2
        });
    });

    // Page Entrance
    const tl = gsap.timeline();
    
    tl.from('.hero-top-text', {
        y: 20,
        opacity: 0,
        duration: 1,
        ease: "power4.out"
    })
    .from('.main-title .line', {
        y: 100,
        opacity: 0,
        stagger: 0.2,
        duration: 1.5,
        ease: "expo.out"
    }, "-=0.5")
    .from('.hero-bottom', {
        y: 20,
        opacity: 0,
        duration: 1,
        ease: "power4.out"
    }, "-=1")
    .from('.floating-img', {
        scale: 0.8,
        opacity: 0,
        duration: 2,
        ease: "power2.out"
    }, "-=1.5");

    // Bento Grid Animation
    gsap.from('.bento-item', {
        scrollTrigger: {
            trigger: '.bento-grid',
            start: "top 80%",
        },
        y: 50,
        opacity: 0,
        stagger: 0.1,
        duration: 1,
        ease: "power3.out"
    });

    // Interactive Floating Image
    window.addEventListener('mousemove', (e) => {
        const moveX = (e.clientX - window.innerWidth / 2) * 0.02;
        const moveY = (e.clientY - window.innerHeight / 2) * 0.02;
        
        gsap.to('.floating-img', {
            x: moveX,
            y: moveY,
            rotation: moveX * 0.1,
            duration: 1.5,
            ease: "power2.out"
        });
    });

    // Hover Distortions for Bento
    const items = document.querySelectorAll('.bento-item');
    items.forEach(item => {
        item.addEventListener('mouseenter', () => {
            gsap.to(item, { scale: 1.02, duration: 0.4 });
        });
        item.addEventListener('mouseleave', () => {
            gsap.to(item, { scale: 1, duration: 0.4 });
        });
    });
});
