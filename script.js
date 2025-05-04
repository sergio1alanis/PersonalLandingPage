<<<<<<< HEAD
// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
    // Variables
    const header = document.querySelector('.header');
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-menu a');
    const filterBtns = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    const contactForm = document.getElementById('contactForm');
    const newsletterForm = document.getElementById('newsletterForm');

    // Función para cambiar el estilo del header al hacer scroll
    function scrollHeader() {
        if (window.scrollY > 100) {
            header.style.padding = '10px 0';
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.padding = '15px 0';
            header.style.boxShadow = 'none';
        }
    }

    // Añadir evento scroll
    window.addEventListener('scroll', scrollHeader);

    // Toggle menu en dispositivos móviles
    menuToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        this.querySelector('i').classList.toggle('fa-bars');
        this.querySelector('i').classList.toggle('fa-times');
    });

    // Cerrar menú al hacer clic en un enlace
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            menuToggle.querySelector('i').classList.add('fa-bars');
            menuToggle.querySelector('i').classList.remove('fa-times');
        });
    });

    // Agregar clase activa al enlace de navegación según la sección visible
    function activeLink() {
        const sections = document.querySelectorAll('section[id]');
        const scrollY = window.pageYOffset;

        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 100;
            const sectionId = current.getAttribute('id');

            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                document.querySelector('.nav-menu a[href*=' + sectionId + ']').classList.add('active');
            } else {
                document.querySelector('.nav-menu a[href*=' + sectionId + ']').classList.remove('active');
            }
        });
    }

    window.addEventListener('scroll', activeLink);

    // Filtrar elementos del portfolio
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remover clase active de todos los botones
            filterBtns.forEach(btn => btn.classList.remove('active'));
            // Añadir clase active al botón clickeado
            this.classList.add('active');

            const filterValue = this.dataset.filter;

            portfolioItems.forEach(item => {
                if (filterValue === 'all' || item.classList.contains(filterValue)) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 200);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });

    // Manejar envío del formulario de contacto
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Recoger los datos del formulario
            const formData = {
                name: this.elements.name.value,
                email: this.elements.email.value,
                subject: this.elements.subject.value,
                message: this.elements.message.value
            };

            // Simulación de envío (aquí irían las llamadas AJAX reales)
            console.log('Enviando datos de contacto:', formData);

            // Mostrar mensaje de éxito
            alert('¡Gracias por tu mensaje! Nos pondremos en contacto contigo pronto.');

            // Limpiar formulario
            this.reset();
        });
    }

    // Manejar envío del formulario de newsletter
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Recoger email
            const email = this.querySelector('input[type="email"]').value;
            
            // Simulación de envío
            console.log('Suscribiendo email:', email);
            
            // Mostrar mensaje de éxito
            alert('¡Gracias por suscribirte a nuestro newsletter!');
            
            // Limpiar formulario
            this.reset();
        });
    }

    // Animación al hacer scroll
    function revealElements() {
        const elements = document.querySelectorAll('.services-grid, .about-content, .portfolio-grid, .testimonials-slider, .contact-content');
        
        elements.forEach(element => {
            const windowHeight = window.innerHeight;
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < windowHeight - elementVisible) {
                element.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', revealElements);

    // Inicializar animaciones al cargar la página
    setTimeout(revealElements, 300);

    // Animación para testimonios
    // Este es un carrusel simple, para un proyecto real se podría 
    // implementar una librería de carrusel como Swiper o Slick
    function setupTestimonialSlider() {
        const testimonials = document.querySelectorAll('.testimonial-item');
        let currentIndex = 0;
        
        // Solo aplicar si hay más de un testimonio y estamos en móvil
        if (testimonials.length > 1 && window.innerWidth < 768) {
            // Ocultar todos excepto el primero
            testimonials.forEach((item, index) => {
                if (index > 0) {
                    item.style.display = 'none';
                }
            });
            
            // Función para mostrar el siguiente testimonio
            function showNextTestimonial() {
                testimonials[currentIndex].style.display = 'none';
                currentIndex = (currentIndex + 1) % testimonials.length;
                testimonials[currentIndex].style.display = 'block';
            }
            
            // Cambiar cada 5 segundos
            setInterval(showNextTestimonial, 5000);
        }
    }
    
    setupTestimonialSlider();
    window.addEventListener('resize', setupTestimonialSlider);

    // Animación suave al hacer scroll a las secciones
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop - 70,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Añadir CSS para animaciones de scroll
    const style = document.createElement('style');
    style.innerHTML = `
        .services-grid, .about-content, .portfolio-grid, .testimonials-slider, .contact-content {
            opacity: 0;
            transform: translateY(30px);
            transition: all 0.8s ease;
        }
        
        .services-grid.active, .about-content.active, .portfolio-grid.active, 
        .testimonials-slider.active, .contact-content.active {
            opacity: 1;
            transform: translateY(0);
        }
    `;
    document.head.appendChild(style);
=======
// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
    // Variables
    const header = document.querySelector('.header');
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-menu a');
    const filterBtns = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    const contactForm = document.getElementById('contactForm');
    const newsletterForm = document.getElementById('newsletterForm');

    // Función para cambiar el estilo del header al hacer scroll
    function scrollHeader() {
        if (window.scrollY > 100) {
            header.style.padding = '10px 0';
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.padding = '15px 0';
            header.style.boxShadow = 'none';
        }
    }

    // Añadir evento scroll
    window.addEventListener('scroll', scrollHeader);

    // Toggle menu en dispositivos móviles
    menuToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        this.querySelector('i').classList.toggle('fa-bars');
        this.querySelector('i').classList.toggle('fa-times');
    });

    // Cerrar menú al hacer clic en un enlace
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            menuToggle.querySelector('i').classList.add('fa-bars');
            menuToggle.querySelector('i').classList.remove('fa-times');
        });
    });

    // Agregar clase activa al enlace de navegación según la sección visible
    function activeLink() {
        const sections = document.querySelectorAll('section[id]');
        const scrollY = window.pageYOffset;

        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 100;
            const sectionId = current.getAttribute('id');

            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                document.querySelector('.nav-menu a[href*=' + sectionId + ']').classList.add('active');
            } else {
                document.querySelector('.nav-menu a[href*=' + sectionId + ']').classList.remove('active');
            }
        });
    }

    window.addEventListener('scroll', activeLink);

    // Filtrar elementos del portfolio
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remover clase active de todos los botones
            filterBtns.forEach(btn => btn.classList.remove('active'));
            // Añadir clase active al botón clickeado
            this.classList.add('active');

            const filterValue = this.dataset.filter;

            portfolioItems.forEach(item => {
                if (filterValue === 'all' || item.classList.contains(filterValue)) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 200);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });

    // Manejar envío del formulario de contacto
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Recoger los datos del formulario
            const formData = {
                name: this.elements.name.value,
                email: this.elements.email.value,
                subject: this.elements.subject.value,
                message: this.elements.message.value
            };

            // Simulación de envío (aquí irían las llamadas AJAX reales)
            console.log('Enviando datos de contacto:', formData);

            // Mostrar mensaje de éxito
            alert('¡Gracias por tu mensaje! Nos pondremos en contacto contigo pronto.');

            // Limpiar formulario
            this.reset();
        });
    }

    // Manejar envío del formulario de newsletter
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Recoger email
            const email = this.querySelector('input[type="email"]').value;
            
            // Simulación de envío
            console.log('Suscribiendo email:', email);
            
            // Mostrar mensaje de éxito
            alert('¡Gracias por suscribirte a nuestro newsletter!');
            
            // Limpiar formulario
            this.reset();
        });
    }

    // Animación al hacer scroll
    function revealElements() {
        const elements = document.querySelectorAll('.services-grid, .about-content, .portfolio-grid, .testimonials-slider, .contact-content');
        
        elements.forEach(element => {
            const windowHeight = window.innerHeight;
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < windowHeight - elementVisible) {
                element.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', revealElements);

    // Inicializar animaciones al cargar la página
    setTimeout(revealElements, 300);

    // Animación para testimonios
    // Este es un carrusel simple, para un proyecto real se podría 
    // implementar una librería de carrusel como Swiper o Slick
    function setupTestimonialSlider() {
        const testimonials = document.querySelectorAll('.testimonial-item');
        let currentIndex = 0;
        
        // Solo aplicar si hay más de un testimonio y estamos en móvil
        if (testimonials.length > 1 && window.innerWidth < 768) {
            // Ocultar todos excepto el primero
            testimonials.forEach((item, index) => {
                if (index > 0) {
                    item.style.display = 'none';
                }
            });
            
            // Función para mostrar el siguiente testimonio
            function showNextTestimonial() {
                testimonials[currentIndex].style.display = 'none';
                currentIndex = (currentIndex + 1) % testimonials.length;
                testimonials[currentIndex].style.display = 'block';
            }
            
            // Cambiar cada 5 segundos
            setInterval(showNextTestimonial, 5000);
        }
    }
    
    setupTestimonialSlider();
    window.addEventListener('resize', setupTestimonialSlider);

    // Animación suave al hacer scroll a las secciones
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop - 70,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Añadir CSS para animaciones de scroll
    const style = document.createElement('style');
    style.innerHTML = `
        .services-grid, .about-content, .portfolio-grid, .testimonials-slider, .contact-content {
            opacity: 0;
            transform: translateY(30px);
            transition: all 0.8s ease;
        }
        
        .services-grid.active, .about-content.active, .portfolio-grid.active, 
        .testimonials-slider.active, .contact-content.active {
            opacity: 1;
            transform: translateY(0);
        }
    `;
    document.head.appendChild(style);
>>>>>>> 91f90d7 (No commit)
});