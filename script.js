// ===== Mobile Navigation Toggle =====
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        
        // Animate hamburger
        hamburger.classList.toggle('active');
    });

    // Close menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });
}

// ===== Smooth Scrolling =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offset = 80; // Height of navbar
            const targetPosition = target.offsetTop - offset;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ===== Navbar Background on Scroll =====
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    }
});

// ===== Intersection Observer for Animations =====
const animateOnScroll = () => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                
                // Animate skill bars when they come into view
                if (entry.target.classList.contains('skill-category')) {
                    animateSkillBars(entry.target);
                }
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    // Observe all elements with data-animate attribute
    document.querySelectorAll('[data-animate]').forEach(el => {
        observer.observe(el);
    });

    // Observe skill categories
    document.querySelectorAll('.skill-category').forEach(el => {
        observer.observe(el);
    });
};

// ===== Animate Skill Bars =====
const animateSkillBars = (category) => {
    const skillBars = category.querySelectorAll('.skill-progress-bar');
    skillBars.forEach(bar => {
        const progress = bar.getAttribute('data-progress');
        setTimeout(() => {
            bar.style.width = progress + '%';
        }, 100);
    });
};

// ===== Typing Effect for Hero Tagline =====
const typeWriter = () => {
    const tagline = document.querySelector('.hero-tagline');
    if (!tagline) return;
    
    const text = tagline.textContent;
    tagline.textContent = '';
    tagline.style.opacity = '1';
    
    let i = 0;
    const speed = 50;
    
    const type = () => {
        if (i < text.length) {
            tagline.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    };
    
    setTimeout(type, 1000);
};

// ===== Counter Animation for Highlights =====
const animateCounters = () => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counters = entry.target.querySelectorAll('.highlight-item h3, .result-number');
                counters.forEach(counter => {
                    const target = counter.textContent;
                    const isPercentage = target.includes('%');
                    const isMultiplier = target.includes('x');
                    const isPlus = target.includes('+');
                    
                    let numericValue;
                    if (isPercentage) {
                        numericValue = parseInt(target.replace('%', ''));
                    } else if (isMultiplier) {
                        numericValue = parseInt(target.replace('x', ''));
                    } else if (isPlus) {
                        numericValue = parseInt(target.replace('+', ''));
                    } else {
                        numericValue = parseInt(target);
                    }
                    
                    if (isNaN(numericValue)) return;
                    
                    let current = 0;
                    const increment = numericValue / 50;
                    const duration = 1500;
                    const stepTime = duration / 50;
                    
                    const timer = setInterval(() => {
                        current += increment;
                        if (current >= numericValue) {
                            current = numericValue;
                            clearInterval(timer);
                        }
                        
                        let displayValue = Math.floor(current);
                        if (isPercentage) {
                            counter.textContent = displayValue + '%';
                        } else if (isMultiplier) {
                            counter.textContent = displayValue + 'x';
                        } else if (isPlus) {
                            counter.textContent = displayValue + '+';
                        } else {
                            counter.textContent = displayValue;
                        }
                    }, stepTime);
                });
                
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.5
    });
    
    document.querySelectorAll('.highlights, .results-grid').forEach(el => {
        observer.observe(el);
    });
};

// ===== Parallax Effect for Hero Section =====
const parallaxEffect = () => {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero-content');
        if (hero && scrolled < window.innerHeight) {
            hero.style.transform = `translateY(${scrolled * 0.5}px)`;
            hero.style.opacity = 1 - (scrolled / 500);
        }
    });
};

// ===== Active Navigation Link =====
const setActiveNav = () => {
    const sections = document.querySelectorAll('section[id]');
    
    window.addEventListener('scroll', () => {
        const scrollY = window.pageYOffset;
        
        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');
            
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                document.querySelectorAll('.nav-link').forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });
};

// ===== Add Hover Effects to Timeline Items =====
const timelineHoverEffects = () => {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    timelineItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            item.style.transform = 'scale(1.02)';
        });
        
        item.addEventListener('mouseleave', () => {
            item.style.transform = 'scale(1)';
        });
    });
};

// ===== Project Card Flip Effect =====
const projectCardEffects = () => {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transition = 'all 0.3s ease';
        });
    });
};

// ===== Load More Content Animation =====
const staggerAnimation = () => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });
    
    // Apply stagger animation to skill tags
    document.querySelectorAll('.skill-tag').forEach(tag => {
        tag.style.opacity = '0';
        tag.style.transform = 'translateY(20px)';
        tag.style.transition = 'all 0.3s ease';
        observer.observe(tag);
    });
};

// ===== Form Validation (if contact form is added) =====
const initContactForm = () => {
    const form = document.querySelector('.contact-form');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            // Add form submission logic here
            alert('Terima kasih! Pesan Anda telah terkirim.');
        });
    }
};

// ===== Scroll Progress Indicator =====
const scrollProgress = () => {
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        height: 3px;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        z-index: 9999;
        transition: width 0.1s ease;
    `;
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', () => {
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (window.pageYOffset / windowHeight) * 100;
        progressBar.style.width = scrolled + '%';
    });
};

// ===== Copy Email to Clipboard =====
const copyEmailFeature = () => {
    const emailLinks = document.querySelectorAll('a[href^="mailto:"]');
    
    emailLinks.forEach(link => {
        const copyIcon = document.createElement('i');
        copyIcon.className = 'fas fa-copy';
        copyIcon.style.cssText = 'margin-left: 8px; cursor: pointer; opacity: 0.6; font-size: 0.9em;';
        copyIcon.title = 'Copy email';
        
        copyIcon.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            const email = link.getAttribute('href').replace('mailto:', '');
            
            navigator.clipboard.writeText(email).then(() => {
                copyIcon.className = 'fas fa-check';
                copyIcon.style.color = '#27ae60';
                
                setTimeout(() => {
                    copyIcon.className = 'fas fa-copy';
                    copyIcon.style.color = '';
                }, 2000);
            });
        });
        
        link.appendChild(copyIcon);
    });
};

// ===== Easter Egg: Konami Code =====
const konamiCode = () => {
    let konamiPattern = [];
    const code = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
    
    window.addEventListener('keydown', (e) => {
        konamiPattern.push(e.key);
        konamiPattern.splice(-code.length - 1, konamiPattern.length - code.length);
        
        if (konamiPattern.join('').includes(code.join(''))) {
            document.body.style.animation = 'rainbow 2s linear infinite';
            setTimeout(() => {
                document.body.style.animation = '';
            }, 5000);
        }
    });
};

// ===== Initialize Tooltips =====
const initTooltips = () => {
    const skillTags = document.querySelectorAll('.skill-tag');
    
    skillTags.forEach(tag => {
        tag.setAttribute('title', `Click untuk highlight ${tag.textContent}`);
        
        tag.addEventListener('click', () => {
            tag.style.transform = 'scale(1.1)';
            setTimeout(() => {
                tag.style.transform = '';
            }, 300);
        });
    });
};

// ===== Lazy Load Images =====
const lazyLoadImages = () => {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.getAttribute('data-src');
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
};

// ===== Print CV Function =====
const printCV = () => {
    const printBtn = document.createElement('button');
    printBtn.innerHTML = '<i class="fas fa-print"></i> Cetak CV';
    printBtn.className = 'btn btn-primary print-btn';
    printBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        z-index: 999;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
    `;
    
    printBtn.addEventListener('click', () => {
        window.print();
    });
    
    document.body.appendChild(printBtn);
};

// ===== Back to Top Button =====
const backToTop = () => {
    const btn = document.createElement('button');
    btn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    btn.className = 'back-to-top';
    btn.style.cssText = `
        position: fixed;
        bottom: 30px;
        left: 30px;
        width: 50px;
        height: 50px;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 999;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
    `;
    
    document.body.appendChild(btn);
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            btn.style.opacity = '1';
            btn.style.visibility = 'visible';
        } else {
            btn.style.opacity = '0';
            btn.style.visibility = 'hidden';
        }
    });
    
    btn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
};

// ===== Theme Toggle (Optional) =====
const themeToggle = () => {
    // This can be implemented if dark mode is desired
    // For now, keeping it simple with light theme only
};

// ===== Initialize All Functions =====
document.addEventListener('DOMContentLoaded', () => {
    // Core functionality
    animateOnScroll();
    typeWriter();
    animateCounters();
    setActiveNav();
    
    // Enhanced features
    parallaxEffect();
    timelineHoverEffects();
    projectCardEffects();
    staggerAnimation();
    initContactForm();
    scrollProgress();
    copyEmailFeature();
    initTooltips();
    lazyLoadImages();
    
    // UI enhancements
    printCV();
    backToTop();
    
    // Easter eggs
    konamiCode();
    
    // Log for debugging
    console.log('✨ CV Website Initialized Successfully!');
    console.log('💼 Sarah Putri - Digital Marketing Portfolio');
});

// ===== Page Load Animation =====
window.addEventListener('load', () => {
    document.body.style.opacity = '1';
    
    // Add fade-in animation
    const style = document.createElement('style');
    style.textContent = `
        body {
            opacity: 0;
            transition: opacity 0.5s ease;
        }
    `;
    document.head.appendChild(style);
});

// ===== Handle Print Styles =====
window.addEventListener('beforeprint', () => {
    document.querySelectorAll('.print-btn, .back-to-top').forEach(el => {
        el.style.display = 'none';
    });
});

window.addEventListener('afterprint', () => {
    document.querySelectorAll('.print-btn, .back-to-top').forEach(el => {
        el.style.display = '';
    });
});

// ===== Performance Optimization =====
// Debounce function for scroll events
const debounce = (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
};

// Apply debounce to scroll-heavy functions
const optimizedScroll = debounce(() => {
    // Scroll optimizations
}, 10);

window.addEventListener('scroll', optimizedScroll);
