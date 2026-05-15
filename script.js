const CinemaX =
{
    // Global state
    state:
    {
        currentPage: 'home',
        darkMode: true,
        bookingData:
        {
            selectedMovie: null,
            selectedDate: null,
            selectedTime: null,
            selectedSeats: []
        },
        movies: [
            {
                id: 1,
                title: 'Dune: Part Three',
                rating: 8.7,
                genre: 'Sci-Fi',
                duration: '2h 46m',
                price: 90,
                image: 'https://image.tmdb.org/t/p/w500/d5NXSklXo0qyIYkgV94XAgMIckC.jpg'
            },
            {
                id: 2,
                title: 'Interstellar Echoes',
                rating: 9.0,
                genre: 'Drama',
                duration: '2h 30m',
                price: 90,
                image: 'https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg'
            },
            {
                id: 3,
                title: 'Shadow Hunter',
                rating: 7.9,
                genre: 'Action',
                duration: '1h 58m',
                price: 90,
                image: 'https://image.tmdb.org/t/p/w500/8Vt6mWEReuy4Of61Lnj5Xj704m8.jpg'
            },
            {
                id: 4,
                title: 'The Last Frontier',
                rating: 8.2,
                genre: 'Adventure',
                duration: '2h 12m',
                price: 90,
                image: 'https://image.tmdb.org/t/p/w500/qNBAXBIQlnOThrVvA6mA2B5ggV6.jpg'
            }
        ],
        showtimes: ['10:00 AM', '1:30 PM', '4:00 PM', '7:30 PM', '10:00 PM']
    },

    // ==================== UTILITY FUNCTIONS ====================
    utils:
    {
        debounce(func, wait)
        {
            let timeout;
            return function executedFunction(...args)
            {
                const later = () =>
                {
                    clearTimeout(timeout);
                    func(...args);
                };
                clearTimeout(timeout);
                timeout = setTimeout(later, wait);
            };
        },

        throttle(func, limit)
        {
            let inThrottle;
            return function (...args)
            {
                if (!inThrottle)
                {
                    func.apply(this, args);
                    inThrottle = true;
                    setTimeout(() => inThrottle = false, limit);
                }
            };
        },

        log(message, type = 'info')
        {
            console.log(`[CinemaX ${type.toUpperCase()}]: ${message}`);
        },

        formatDate(date) {
            if (typeof date === 'string') {
                const dateObj = new Date(date);
                return dateObj.toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric'
                });
            }
            return date;
        },

        getMovieById(id) {
            return this.CinemaX?.state.movies.find(m => m.id === id) || null;
        }
    },

    // ==================== PAGE LOADER ====================
    pageLoader: {
        init() {
            const loader = document.querySelector('.page-loader');
            if (loader) {
                setTimeout(() => {
                    loader.classList.add('hidden');
                }, 1500);
            }
        }
    },

    // ==================== NAVIGATION ====================
    navigation: {
        init() {
            this.setupNavbarScroll();
            this.setupMobileMenu();
            this.setActiveLink();
            this.setupSocialLinks();
        },

        setupNavbarScroll() {
            const navbar = document.querySelector('.navbar');
            if (!navbar) return;

            window.addEventListener('scroll', () => {
                if (window.scrollY > 100) {
                    navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.3)';
                } else {
                    navbar.style.boxShadow = 'none';
                }
            });
        },

        setupMobileMenu() {
            const navbarToggler = document.querySelector('.navbar-toggler');
            const navMenu = document.querySelector('#navMenu');

            if (!navMenu) return;

            document.querySelectorAll('.nav-link').forEach((link) => {
                link.addEventListener('click', () => {
                    if (navMenu.classList.contains('show') && navbarToggler) {
                        navbarToggler.click();
                    }
                });
            });
        },

        setActiveLink() {
            const currentLocation = location.pathname;
            const menuItems = document.querySelectorAll('.navbar-nav .nav-link');

            menuItems.forEach(link => {
                if (link.getAttribute('href') === currentLocation) {
                    link.classList.add('active');
                }
            });
        },

        setupSocialLinks() {
            const socialLinks = document.querySelectorAll('.social-link');
            socialLinks.forEach(link => {
                link.addEventListener('mouseenter', function () {
                    this.style.transform = 'scale(1.2)';
                });
                link.addEventListener('mouseleave', function () {
                    this.style.transform = 'scale(1)';
                });
            });
        }
    },

    // ==================== SCROLL ANIMATIONS ====================
    animations: {
        init() {
            this.setupScrollObserver();
            this.setupSkillBars();
        },

        setupScrollObserver() {
            const observerOptions = {
                threshold: 0.1,
                rootMargin: '0px 0px -100px 0px'
            };

            const observer = new IntersectionObserver((entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.style.animationDelay = '0s';
                    }
                });
            }, observerOptions);

            document.querySelectorAll('.animate-on-scroll').forEach((el) => {
                observer.observe(el);
            });
        },

        setupSkillBars() {
            const skillBars = document.querySelectorAll('.skill-bar-fill');
            if (skillBars.length === 0) return;

            const skillObserver = new IntersectionObserver((entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const skillLabel = entry.target.parentElement.previousElementSibling;
                        if (skillLabel) {
                            const value = skillLabel.querySelector('span:last-child')?.textContent;
                            const percentage = parseInt(value) || 0;
                            entry.target.style.width = percentage + '%';
                        }
                    }
                });
            }, { threshold: 0.5 });

            skillBars.forEach((bar) => skillObserver.observe(bar));
        }
    },

    // ==================== BACK TO TOP ====================
    backToTop: {
        init() {
            const btn = document.querySelector('.back-to-top');
            if (!btn) return;

            window.addEventListener('scroll', () => {
                if (window.scrollY > 300) {
                    btn.classList.add('show');
                } else {
                    btn.classList.remove('show');
                }
            });

            btn.addEventListener('click', () => {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            });
        }
    },

    // ==================== HERO SECTION ====================
    hero: {
        init() {
            const playBtn = document.querySelector('.btn-outline-custom');
            if (playBtn && playBtn.href === '#now-showing') {
                playBtn.addEventListener('click', (e) => {
                    e.preventDefault();
                    const target = document.querySelector('#now-showing');
                    if (target) {
                        target.scrollIntoView({ behavior: 'smooth' });
                    }
                });
            }
        }
    },

    // ==================== BOOKING SYSTEM ====================
    booking: {
        init() {
            if (!document.getElementById('movieList')) return;

            this.renderMovieList();
            this.setupDateInput();
            this.generateSeatMap();
            this.setupConfirmation();
            CinemaX.utils.log('Booking system initialized');
        },

        renderMovieList() {
            const movieList = document.getElementById('movieList');
            if (!movieList) return;

            movieList.innerHTML = CinemaX.state.movies.map(movie => `
        <div class="col-md-6 col-lg-3 mb-3">
          <button class="movie-selection-btn w-100" data-id="${movie.id}" style="
            background: var(--card-bg);
            border: 2px solid var(--border);
            padding: 1rem;
            border-radius: 8px;
            cursor: pointer;
            transition: all 0.3s;
            text-align: left;
            color: white;
          ">
            <div style="font-weight: 700; margin-bottom: 0.5rem;">${movie.title}</div>
            <div style="font-size: 0.85rem; color: var(--text-muted);">${movie.genre} · ${movie.duration}</div>
          </button>
        </div>
      `).join('');

            document.querySelectorAll('.movie-selection-btn').forEach(btn => {
                btn.addEventListener('click', () => this.selectMovie(parseInt(btn.dataset.id), btn));
            });
        },

        selectMovie(movieId, btnElement) {
            CinemaX.state.bookingData.selectedMovie = movieId;
            const movie = CinemaX.state.movies.find(m => m.id === movieId);

            if (movie) {
                const sumMovie = document.getElementById('sumMovie');
                if (sumMovie) sumMovie.textContent = movie.title;

                // Update button styles
                `

