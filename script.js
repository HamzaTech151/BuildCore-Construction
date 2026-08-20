const menuToggle = document.getElementById("menuToggle");
const navWrapper = document.getElementById("navWrapper");
const navLinks = document.querySelectorAll(".nav-link");
const counters = document.querySelectorAll(".counter");
const filterButtons = document.querySelectorAll(".filter-btn");
const projectCards = document.querySelectorAll(".project-card");
const faqItems = document.querySelectorAll(".faq-item");
const contactForm = document.getElementById("contactForm");
const toast = document.getElementById("toast");
const backToTop = document.getElementById("backToTop");
const scrollRing = document.getElementById("scrollRing");
const ringProgress = document.getElementById("ringProgress");

// =========================================================
// PAGE LOADER
// =========================================================

window.addEventListener('load', function() {
    const loader = document.getElementById('pageLoader');
    setTimeout(function() {
        loader.classList.add('hidden');
    }, 600);
});

// =========================================================
// SCROLL RING PROGRESS
// =========================================================

const circumference = 125.6;

window.addEventListener('scroll', function() {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = scrollTop / docHeight;
    
    if (ringProgress) {
        const offset = circumference - (progress * circumference);
        ringProgress.style.strokeDashoffset = offset;
    }
    
    if (scrollRing) {
        if (scrollTop > 500) {
            scrollRing.classList.add('show');
        } else {
            scrollRing.classList.remove('show');
        }
    }

    // Original back to top
    if (backToTop) {
        if (scrollTop > 500) {
            backToTop.classList.add('show');
        } else {
            backToTop.classList.remove('show');
        }
    }
});

if (scrollRing) {
    scrollRing.addEventListener('click', function() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// =========================================================
// MOBILE MENU
// =========================================================

menuToggle.addEventListener("click", function() {
    navWrapper.classList.toggle("show");
});

navLinks.forEach(function(link) {
    link.addEventListener("click", function() {
        navWrapper.classList.remove("show");
    });
});

// =========================================================
// ACTIVE NAV LINK ON SCROLL
// =========================================================

window.addEventListener("scroll", function() {
    const currentPosition = window.scrollY + 150;

    navLinks.forEach(function(link) {
        const section = document.querySelector(link.getAttribute("href"));

        if (!section) {
            return;
        }

        if (
            currentPosition >= section.offsetTop &&
            currentPosition < section.offsetTop + section.offsetHeight
        ) {
            navLinks.forEach(function(item) {
                item.classList.remove("active");
            });

            link.classList.add("active");
        }
    });
});

// =========================================================
// COUNTER ANIMATION
// =========================================================

function animateCounter(counter) {
    const target = Number(counter.dataset.target);
    let current = 0;
    const increment = Math.max(1, Math.ceil(target / 70));

    function update() {
        current += increment;

        if (current >= target) {
            counter.textContent = target;
            return;
        }

        counter.textContent = current;
        requestAnimationFrame(update);
    }

    update();
}

const counterObserver = new IntersectionObserver(function(entries, observer) {
    entries.forEach(function(entry) {
        if (entry.isIntersecting) {
            animateCounter(entry.target);
            observer.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.5
});

counters.forEach(function(counter) {
    counterObserver.observe(counter);
});

// =========================================================
// PROJECT FILTERS
// =========================================================

filterButtons.forEach(function(button) {
    button.addEventListener("click", function() {
        const filter = button.dataset.filter;

        filterButtons.forEach(function(item) {
            item.classList.remove("active");
        });

        button.classList.add("active");

        projectCards.forEach(function(card) {
            const category = card.dataset.category;

            if (filter === "all" || category === filter) {
                card.classList.remove("hidden");
            } else {
                card.classList.add("hidden");
            }
        });
    });
});

// =========================================================
// FAQ ACCORDION
// =========================================================

faqItems.forEach(function(item) {
    const question = item.querySelector(".faq-question");

    question.addEventListener("click", function() {
        const isOpen = item.classList.contains("open");

        faqItems.forEach(function(faq) {
            faq.classList.remove("open");

            const icon = faq.querySelector(".faq-question span");

            if (icon) {
                icon.textContent = "+";
            }
        });

        if (!isOpen) {
            item.classList.add("open");

            const icon = item.querySelector(".faq-question span");

            if (icon) {
                icon.textContent = "−";
            }
        }
    });
});

// =========================================================
// TESTIMONIALS
// =========================================================

const testimonials = [{
    text: "BuildCore handled our project professionally from planning through completion. Communication was clear and the final result exceeded our expectations.",
    name: "Ahmed R.",
    role: "Residential Client"
}, {
    text: "The team maintained excellent communication throughout the construction process and delivered the project with impressive attention to detail.",
    name: "Sarah K.",
    role: "Commercial Client"
}, {
    text: "Our renovation was completed with a very professional approach. The team understood our requirements and transformed the space beautifully.",
    name: "Usman A.",
    role: "Renovation Client"
}];

let testimonialIndex = 0;

const testimonialText = document.getElementById("testimonialText");
const testimonialName = document.getElementById("testimonialName");
const testimonialRole = document.getElementById("testimonialRole");

function updateTestimonial() {
    const testimonial = testimonials[testimonialIndex];

    testimonialText.textContent = testimonial.text;
    testimonialName.textContent = testimonial.name;
    testimonialRole.textContent = testimonial.role;
}

document.getElementById("nextTestimonial").addEventListener("click", function() {
    testimonialIndex++;

    if (testimonialIndex >= testimonials.length) {
        testimonialIndex = 0;
    }

    updateTestimonial();
});

document.getElementById("prevTestimonial").addEventListener("click", function() {
    testimonialIndex--;

    if (testimonialIndex < 0) {
        testimonialIndex = testimonials.length - 1;
    }

    updateTestimonial();
});

// =========================================================
// CONTACT FORM
// =========================================================

contactForm.addEventListener("submit", function(event) {
    event.preventDefault();

    toast.classList.add("show");

    contactForm.reset();

    setTimeout(function() {
        toast.classList.remove("show");
    }, 3500);
});

// =========================================================
// QUOTE FORM HANDLER
// =========================================================

const quoteForm = document.getElementById('quoteForm');

if (quoteForm) {
    quoteForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const name = document.getElementById('quoteName')?.value.trim() || '';
        const email = document.getElementById('quoteEmail')?.value.trim() || '';
        const phone = document.getElementById('quotePhone')?.value.trim() || '';
        const location = document.getElementById('quoteLocation')?.value.trim() || '';
        const projectType = document.getElementById('quoteType')?.value || '';
        const budget = document.getElementById('quoteBudget')?.value || '';
        const timeline = document.getElementById('quoteTimeline')?.value || '';
        const message = document.getElementById('quoteMessage')?.value.trim() || '';

        if (!name || !email || !phone || !projectType || !message) {
            toast.textContent = "Please fill in all required fields.";
            toast.classList.add("show");
            setTimeout(function() {
                toast.classList.remove("show");
            }, 3500);
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            toast.textContent = "Please enter a valid email address.";
            toast.classList.add("show");
            setTimeout(function() {
                toast.classList.remove("show");
            }, 3500);
            return;
        }

        toast.textContent = "✅ Your quote request has been submitted! We'll get back to you within 24 hours.";
        toast.classList.add("show");
        quoteForm.reset();

        setTimeout(function() {
            toast.classList.remove("show");
        }, 5000);
    });
}

// =========================================================
// BACK TO TOP - Original
// =========================================================

backToTop.addEventListener("click", function() {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});

// =========================================================
// MODAL SYSTEM
// =========================================================

function createModal(id, content) {
    const existing = document.getElementById(id);

    if (existing) {
        existing.remove();
    }

    const modal = document.createElement("div");

    modal.className = "buildcore-modal";
    modal.id = id;

    modal.innerHTML = `
        <div class="modal-box">
            <button class="modal-close" aria-label="Close modal">×</button>
            ${content}
        </div>
    `;

    document.body.appendChild(modal);

    requestAnimationFrame(function() {
        modal.classList.add("show");
    });

    const closeButton = modal.querySelector(".modal-close");

    closeButton.addEventListener("click", function() {
        closeModal(modal);
    });

    modal.addEventListener("click", function(event) {
        if (event.target === modal) {
            closeModal(modal);
        }
    });

    return modal;
}

function closeModal(modal) {
    modal.classList.remove("show");

    setTimeout(function() {
        modal.remove();
    }, 300);
}

document.addEventListener("keydown", function(event) {
    if (event.key === "Escape") {
        const modal = document.querySelector(".buildcore-modal.show");

        if (modal) {
            closeModal(modal);
        }
    }
});

// =========================================================
// PROJECT TYPE MODAL
// =========================================================

function openProjectTypeModal() {
    const content = `
        <div class="modal-content">
            <span class="modal-label">START YOUR PROJECT</span>

            <h2>What are you planning to build?</h2>

            <p>
                Choose your project type below and we'll guide you through
                the right construction solution for your needs.
            </p>

            <div class="project-start-options">

                <button class="start-option" data-project="Residential Construction">
                    <strong>🏠 Residential</strong>
                    <span>Homes, villas and private residences</span>
                </button>

                <button class="start-option" data-project="Commercial Construction">
                    <strong>🏢 Commercial</strong>
                    <span>Offices, plazas and retail developments</span>
                </button>

                <button class="start-option" data-project="Industrial Construction">
                    <strong>🏭 Industrial</strong>
                    <span>Factories, warehouses and facilities</span>
                </button>

                <button class="start-option" data-project="Renovation">
                    <strong>🔨 Renovation</strong>
                    <span>Modernizing and transforming existing spaces</span>
                </button>

            </div>

            <div class="modal-actions">
                <button class="btn btn-dark modal-contact-button" style="min-width:200px;">
                    Request a Consultation →
                </button>
            </div>
        </div>
    `;

    const modal = createModal("projectTypeModal", content);

    modal.querySelectorAll(".start-option").forEach(function(option) {
        option.addEventListener("click", function() {
            const selectedProject = option.dataset.project;
            const projectSelect = document.getElementById("quoteType");
            
            if (projectSelect) {
                projectSelect.value = selectedProject;
            }

            closeModal(modal);

            setTimeout(function() {
                document.getElementById("quote").scrollIntoView({
                    behavior: "smooth"
                });
                const form = document.querySelector('.quote-form');
                if (form) {
                    form.style.boxShadow = '0 0 0 3px #c49a3a';
                    setTimeout(() => {
                        form.style.boxShadow = 'none';
                    }, 2000);
                }
            }, 400);
        });
    });

    modal.querySelector(".modal-contact-button").addEventListener("click", function() {
        closeModal(modal);
        setTimeout(function() {
            document.getElementById("quote").scrollIntoView({
                behavior: "smooth"
            });
        }, 400);
    });
}

// =========================================================
// HERO "Start a Project" - Opens Project Type Modal
// =========================================================

document.querySelector('.hero-actions .btn-outline')?.addEventListener('click', function(e) {
    e.preventDefault();
    openProjectTypeModal();
});

// =========================================================
// SERVICE DETAILS
// =========================================================

const serviceDetails = {
    "Residential Construction": {
        label: "RESIDENTIAL CONSTRUCTION",
        description: "We create comfortable, durable and thoughtfully planned residential spaces designed around the needs of modern families.",
        features: [
            "Custom home construction",
            "Villa and luxury residence development",
            "Structural and finishing works",
            "Interior and exterior coordination"
        ]
    },

    "Commercial Construction": {
        label: "COMMERCIAL CONSTRUCTION",
        description: "We deliver professional commercial environments designed to support business operations, customer experience and long-term value.",
        features: [
            "Office buildings",
            "Retail and shopping developments",
            "Business plazas",
            "Commercial fit-outs and finishing"
        ]
    },

    "Renovation & Remodeling": {
        label: "RENOVATION & REMODELING",
        description: "We transform existing properties into modern, functional and visually appealing spaces while respecting the original structure.",
        features: [
            "Complete property renovation",
            "Interior remodeling",
            "Space optimization",
            "Modern finishing and upgrades"
        ]
    },

    "Project Management": {
        label: "PROJECT MANAGEMENT",
        description: "Our project management approach keeps planning, coordination, budgets, schedules and construction activities organized from start to completion.",
        features: [
            "Project planning",
            "Schedule coordination",
            "Contractor coordination",
            "Quality and progress monitoring"
        ]
    }
};

// =========================================================
// SERVICE MODAL
// =========================================================

document.querySelectorAll(".service-card a").forEach(function(link) {
    link.addEventListener("click", function(event) {
        event.preventDefault();

        const card = link.closest(".service-card");
        const title = card.querySelector("h3").textContent.trim();
        const service = serviceDetails[title];

        if (!service) return;

        const content = `
            <div class="modal-content">
                <span class="modal-label">${service.label}</span>
                <h2>${title}</h2>
                <p>${service.description}</p>

                <div class="modal-section">
                    <h3>What we provide</h3>
                    <ul class="modal-list">
                        ${service.features.map(f => `<li>${f}</li>`).join("")}
                    </ul>
                </div>

                <div class="modal-actions">
                    <button class="btn btn-dark modal-contact-button" style="min-width:180px;">
                        Get a Free Quote →
                    </button>
                    <button class="btn btn-outline modal-gallery-button" style="border-color:#d8d5cd; color:#1b1b19;">
                        View Portfolio
                    </button>
                </div>
            </div>
        `;

        const modal = createModal("serviceModal", content);

        modal.querySelector(".modal-contact-button").addEventListener("click", function() {
            closeModal(modal);
            setTimeout(function() {
                const quoteType = document.getElementById("quoteType");
                if (quoteType) {
                    quoteType.value = title;
                }
                document.getElementById("quote").scrollIntoView({
                    behavior: "smooth"
                });
                const form = document.querySelector('.quote-form');
                if (form) {
                    form.style.boxShadow = '0 0 0 3px #c49a3a';
                    setTimeout(() => {
                        form.style.boxShadow = 'none';
                    }, 2000);
                }
            }, 400);
        });

        modal.querySelector(".modal-gallery-button").addEventListener("click", function() {
            closeModal(modal);
            setTimeout(function() {
                document.getElementById("projects").scrollIntoView({
                    behavior: "smooth"
                });
            }, 400);
        });
    });
});

// =========================================================
// PROJECT DATA
// =========================================================

const projectData = {
    "Modern Family Residence": {
        category: "Residential",
        location: "Islamabad, Pakistan",
        year: "2025",
        status: "Completed",
        scope: "Residential construction",
        overview: "A contemporary family residence combining practical living spaces, modern architecture and durable construction materials.",
        features: [
            "Modern residential design",
            "Functional floor planning",
            "Premium finishing",
            "Family-focused spaces"
        ]
    },

    "Luxury Garden Villa": {
        category: "Residential",
        location: "Lahore, Pakistan",
        year: "2024",
        status: "Completed",
        scope: "Luxury residential construction",
        overview: "A premium villa developed with a strong focus on architectural detail, spacious interiors and high-quality finishing.",
        features: [
            "Luxury architectural design",
            "Spacious interiors",
            "Premium finishes",
            "Outdoor living areas"
        ]
    },

    "Contemporary House": {
        category: "Residential",
        location: "Rawalpindi, Pakistan",
        year: "2024",
        status: "Completed",
        scope: "Residential construction",
        overview: "A clean contemporary residence designed to maximize comfort, natural light and efficient use of space.",
        features: [
            "Contemporary design",
            "Natural lighting",
            "Efficient floor plan",
            "Modern finishing"
        ]
    },

    "Central Business Tower": {
        category: "Commercial",
        location: "Islamabad, Pakistan",
        year: "2025",
        status: "Completed",
        scope: "Commercial development",
        overview: "A modern commercial tower designed to support professional businesses with flexible office environments, quality finishes and efficient building systems.",
        features: [
            "Modern commercial architecture",
            "Professional office spaces",
            "Quality interior finishing",
            "Efficient space planning"
        ]
    },

    "Corporate Office Complex": {
        category: "Commercial",
        location: "Karachi, Pakistan",
        year: "2025",
        status: "Completed",
        scope: "Corporate development",
        overview: "A multi-level corporate office complex developed to provide a modern and productive working environment for growing organizations.",
        features: [
            "Multi-level office planning",
            "Modern workspace design",
            "Professional finishing",
            "Business-focused layout"
        ]
    },

    "Retail & Shopping Center": {
        category: "Commercial",
        location: "Faisalabad, Pakistan",
        year: "2024",
        status: "Completed",
        scope: "Retail development",
        overview: "A contemporary retail destination designed around customer movement, flexible commercial units and an attractive modern appearance.",
        features: [
            "Retail units",
            "Customer circulation planning",
            "Modern exterior design",
            "Commercial finishing"
        ]
    },

    "Manufacturing Facility": {
        category: "Industrial",
        location: "Taxila, Pakistan",
        year: "2025",
        status: "Completed",
        scope: "Industrial construction",
        overview: "A purpose-built industrial facility developed for efficient production operations, durable performance and safe working conditions.",
        features: [
            "Industrial structural works",
            "Production floor planning",
            "Durable construction",
            "Operational efficiency"
        ]
    },

    "Warehouse Complex": {
        category: "Industrial",
        location: "Gujranwala, Pakistan",
        year: "2025",
        status: "Completed",
        scope: "Warehouse development",
        overview: "A large-scale warehouse facility designed to support storage, logistics and efficient material handling operations.",
        features: [
            "Large storage areas",
            "Logistics planning",
            "Material handling spaces",
            "Durable industrial structure"
        ]
    },

    "Industrial Processing Unit": {
        category: "Industrial",
        location: "Multan, Pakistan",
        year: "2024",
        status: "Completed",
        scope: "Industrial development",
        overview: "A specialized industrial facility developed around operational efficiency, durability and practical workflow requirements.",
        features: [
            "Industrial processing areas",
            "Operational workflow planning",
            "Safety-focused design",
            "Durable construction"
        ]
    },

    "Urban Road Development": {
        category: "Infrastructure",
        location: "Islamabad, Pakistan",
        year: "2024",
        status: "Completed",
        scope: "Infrastructure development",
        overview: "A major infrastructure improvement project focused on connectivity, traffic flow and accessibility.",
        features: [
            "Road construction",
            "Traffic flow optimization",
            "Accessibility improvements",
            "Durable materials"
        ]
    },

    "Highway Bridge Project": {
        category: "Infrastructure",
        location: "Murree, Pakistan",
        year: "2025",
        status: "Completed",
        scope: "Bridge construction",
        overview: "A structural infrastructure project designed to improve safe and reliable regional transportation.",
        features: [
            "Bridge structural works",
            "Safety-focused design",
            "Regional connectivity",
            "Durable construction"
        ]
    },

    "Community Infrastructure": {
        category: "Infrastructure",
        location: "Rawalpindi, Pakistan",
        year: "2024",
        status: "Completed",
        scope: "Community development",
        overview: "A community-focused development covering essential access, public spaces and supporting infrastructure.",
        features: [
            "Community access roads",
            "Public spaces",
            "Supporting infrastructure",
            "Sustainable design"
        ]
    }
};

// =========================================================
// GET PROJECT IMAGE
// =========================================================

function getProjectImage(card) {
    const image = card.querySelector(".project-image img");

    if (!image) {
        return "";
    }

    return image.src;
}

// =========================================================
// PROJECT BUTTON
// =========================================================

document.querySelectorAll('.project-btn').forEach(function(btn) {
    btn.addEventListener('click', function(event) {
        event.preventDefault();

        const card = btn.closest('.project-card');
        if (!card) return;

        const titleElement = card.querySelector('.project-info h3');
        if (!titleElement) return;

        const title = titleElement.textContent.trim();
        const project = projectData[title];
        if (!project) return;

        const image = getProjectImage(card);

        const content = `
            <img class="modal-image" src="${image}" alt="${title}" loading="lazy">

            <div class="modal-content">
                <span class="modal-label">${project.category} PROJECT</span>
                <h2>${title}</h2>
                <p>${project.overview}</p>

                <div class="modal-details">
                    <div class="modal-detail">
                        <span>Location</span>
                        <strong>${project.location}</strong>
                    </div>
                    <div class="modal-detail">
                        <span>Completion</span>
                        <strong>${project.year}</strong>
                    </div>
                    <div class="modal-detail">
                        <span>Project Type</span>
                        <strong>${project.scope}</strong>
                    </div>
                    <div class="modal-detail">
                        <span>Status</span>
                        <strong>${project.status}</strong>
                    </div>
                </div>

                <div class="modal-section">
                    <h3>Key Features</h3>
                    <ul class="modal-list">
                        ${project.features.map(f => `<li>${f}</li>`).join("")}
                    </ul>
                </div>

                <div class="modal-actions">
                    <button class="btn btn-dark modal-contact-button" style="min-width:180px;">
                        Get a Quote →
                    </button>
                    <button class="btn btn-outline modal-portfolio-button" style="border-color:#d8d5cd; color:#1b1b19;">
                        View More Projects
                    </button>
                </div>
            </div>
        `;

        const modal = createModal('projectModal', content);

        modal.querySelector('.modal-contact-button').addEventListener('click', function() {
            closeModal(modal);
            setTimeout(function() {
                const quoteType = document.getElementById('quoteType');
                if (quoteType) {
                    quoteType.value = project.category + ' Construction';
                }
                document.getElementById('quote').scrollIntoView({
                    behavior: 'smooth'
                });
                const form = document.querySelector('.quote-form');
                if (form) {
                    form.style.boxShadow = '0 0 0 3px #c49a3a';
                    setTimeout(() => {
                        form.style.boxShadow = 'none';
                    }, 2000);
                }
            }, 400);
        });

        modal.querySelector('.modal-portfolio-button').addEventListener('click', function() {
            closeModal(modal);
            setTimeout(function() {
                document.getElementById('projects').scrollIntoView({
                    behavior: 'smooth'
                });
            }, 400);
        });
    });
});

// =========================================================
// IMAGE FALLBACK
// =========================================================

const fallbackImages = {
    residential: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=85",
    commercial: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=85",
    renovation: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=85",
    industrial: "https://images.unsplash.com/photo-1565793298595-6a879b1d9492?auto=format&fit=crop&w=1200&q=85"
};

document.querySelectorAll(".project-card").forEach(function(card) {
    const image = card.querySelector(".project-image img");

    if (!image) {
        return;
    }

    image.addEventListener("error", function() {
        const category = card.dataset.category || "commercial";

        if (image.dataset.fallbackUsed === "true") {
            return;
        }

        image.dataset.fallbackUsed = "true";
        image.src = fallbackImages[category] || fallbackImages.commercial;
    });
});

// =========================================================
// REVEAL ANIMATIONS
// =========================================================

const revealElements = document.querySelectorAll(
    ".intro-content, .intro-image, .service-card, .project-card, .why-content, .why-item, .process-step, .testimonial-card, .faq-item, .contact-details, .contact-form, .quote-feature"
);

revealElements.forEach(function(element) {
    element.classList.add("reveal");
});

const revealObserver = new IntersectionObserver(function(entries, observer) {
    entries.forEach(function(entry) {
        if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.12
});

revealElements.forEach(function(element) {
    revealObserver.observe(element);
});

// =========================================================
// WORK WITH US MODAL
// =========================================================

const workWithUsBtn = document.getElementById("workWithUsBtn");
const workModal = document.getElementById("workModal");
const closeWorkModal = document.getElementById("closeWorkModal");
const workModalOverlay = document.querySelector(".work-modal-overlay");
const modalConsultationBtn = document.getElementById("modalConsultationBtn");
const modalProcessBtn = document.getElementById("modalProcessBtn");

function openWorkModal() {
    if (!workModal) {
        return;
    }
    workModal.classList.add("show");
    document.body.classList.add("modal-open");
}

function closeWorkModalFunction() {
    if (!workModal) {
        return;
    }
    workModal.classList.remove("show");
    document.body.classList.remove("modal-open");
}

if (workWithUsBtn) {
    workWithUsBtn.addEventListener("click", function() {
        openWorkModal();
    });
}

if (closeWorkModal) {
    closeWorkModal.addEventListener("click", function() {
        closeWorkModalFunction();
    });
}

if (workModalOverlay) {
    workModalOverlay.addEventListener("click", function() {
        closeWorkModalFunction();
    });
}

if (modalConsultationBtn) {
    modalConsultationBtn.addEventListener("click", function() {
        closeWorkModalFunction();
        setTimeout(function() {
            document.getElementById("quote").scrollIntoView({
                behavior: "smooth"
            });
        }, 400);
    });
}

if (modalProcessBtn) {
    modalProcessBtn.addEventListener("click", function() {
        closeWorkModalFunction();
        setTimeout(function() {
            document.getElementById("process").scrollIntoView({
                behavior: "smooth"
            });
        }, 400);
    });
}

document.addEventListener("keydown", function(event) {
    if (event.key === "Escape" && workModal && workModal.classList.contains("show")) {
        closeWorkModalFunction();
    }
});