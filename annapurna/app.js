
    'use strict';


// ========== GLOBAL ERROR HANDLERS ==========
window.addEventListener('error', (e) => {
    console.error('Global error:', e.error);
});

window.addEventListener('unhandledrejection', (e) => {
    console.error('Unhandled promise rejection:', e.reason);
});

// ========== INITIALIZATION ==========
document.addEventListener('DOMContentLoaded', () => {
    try {
        // Initialize all systems in order
        NotificationSystem.init();
        ScrollAnimations.init();
        ScrollProgress.init();
        ModalSystem.init();
        AirportSearch.init();
        FlightForm.init();
        FAQSystem.init();
        ButtonHandlers.init();
        NoticeBar.init();
        FlyingPlanes.init();
        WelcomeAnimation.init();
        SmallFaq.init();
        
        console.log('Annapurna Sewa initialized successfully');
    } catch (error) {
        console.error('Initialization error:', error);
    }
});

// ========== CONFIGURATION ==========
const CONFIG = {
    whatsappNumber: "9779802398981",
    notificationDuration: 4000,
    welcomeAnimationCleanup: 8000,
    planeCreationInterval: 60000,
    searchDebounceDelay: 300,
    scrollThrottleDelay: 100
};

// ========== AIRPORT DATA ==========
const AIRPORTS = [
    // Nepal airports
    { name: "Tribhuvan International Airport", city: "Kathmandu", country: "Nepal", code: "KTM" },
    { name: "Pokhara International Airport", city: "Pokhara", country: "Nepal", code: "PKR" },
    { name: "Gautam Buddha International Airport", city: "Bhairahawa", country: "Nepal", code: "BWA" },
    
    // Middle East (Common for Nepali employment)
    { name: "Hamad International Airport", city: "Doha", country: "Qatar", code: "DOH" },
    { name: "Dubai International Airport", city: "Dubai", country: "UAE", code: "DXB" },
    { name: "Abu Dhabi International Airport", city: "Abu Dhabi", country: "UAE", code: "AUH" },
    { name: "King Fahd International Airport", city: "Dammam", country: "Saudi Arabia", code: "DMM" },
    { name: "King Abdulaziz International Airport", city: "Jeddah", country: "Saudi Arabia", code: "JED" },
    { name: "King Khalid International Airport", city: "Riyadh", country: "Saudi Arabia", code: "RUH" },
    { name: "Kuwait International Airport", city: "Kuwait City", country: "Kuwait", code: "KWI" },
    { name: "Bahrain International Airport", city: "Manama", country: "Bahrain", code: "BAH" },
    { name: "Muscat International Airport", city: "Muscat", country: "Oman", code: "MCT" },
    
    // Asia
    { name: "Indira Gandhi International Airport", city: "Delhi", country: "India", code: "DEL" },
    { name: "Chhatrapati Shivaji Maharaj International Airport", city: "Mumbai", country: "India", code: "BOM" },
    { name: "Kuala Lumpur International Airport", city: "Kuala Lumpur", country: "Malaysia", code: "KUL" },
    { name: "Singapore Changi Airport", city: "Singapore", country: "Singapore", code: "SIN" },
    { name: "Suvarnabhumi Airport", city: "Bangkok", country: "Thailand", code: "BKK" },
    { name: "Hong Kong International Airport", city: "Hong Kong", country: "China", code: "HKG" },
    { name: "Incheon International Airport", city: "Seoul", country: "South Korea", code: "ICN" },
    { name: "Tokyo Narita International Airport", city: "Tokyo", country: "Japan", code: "NRT" },
    { name: "Beijing Capital International Airport", city: "Beijing", country: "China", code: "PEK" },
    { name: "Shanghai Pudong International Airport", city: "Shanghai", country: "China", code: "PVG" },
    
    // Europe
    { name: "Heathrow Airport", city: "London", country: "UK", code: "LHR" },
    { name: "Charles de Gaulle Airport", city: "Paris", country: "France", code: "CDG" },
    { name: "Frankfurt Airport", city: "Frankfurt", country: "Germany", code: "FRA" },
    { name: "Amsterdam Airport Schiphol", city: "Amsterdam", country: "Netherlands", code: "AMS" },
    { name: "Istanbul Airport", city: "Istanbul", country: "Turkey", code: "IST" },
    
    // North America
    { name: "John F. Kennedy International Airport", city: "New York", country: "USA", code: "JFK" },
    { name: "Los Angeles International Airport", city: "Los Angeles", country: "USA", code: "LAX" },
    { name: "Toronto Pearson International Airport", city: "Toronto", country: "Canada", code: "YYZ" },
    { name: "Vancouver International Airport", city: "Vancouver", country: "Canada", code: "YVR" },
    
    // Australia
    { name: "Sydney Kingsford Smith Airport", city: "Sydney", country: "Australia", code: "SYD" },
    { name: "Melbourne Airport", city: "Melbourne", country: "Australia", code: "MEL" },
    
    // Other popular destinations
    { name: "Soekarno-Hatta International Airport", city: "Jakarta", country: "Indonesia", code: "CGK" },
    { name: "Ninoy Aquino International Airport", city: "Manila", country: "Philippines", code: "MNL" },
    { name: "Colombo Bandaranaike International Airport", city: "Colombo", country: "Sri Lanka", code: "CMB" },
    { name: "Dhaka Hazrat Shahjalal International Airport", city: "Dhaka", country: "Bangladesh", code: "DAC" }
];

// ========== GLOBAL ERROR HANDLERS (Enhanced) ==========
window.addEventListener('error', (e) => {
    console.error('Global error:', e.error);
    NotificationSystem.show('An unexpected error occurred. Please refresh the page.');
});

window.addEventListener('unhandledrejection', (e) => {
    console.error('Unhandled promise rejection:', e.reason);
    NotificationSystem.show('An unexpected error occurred. Please refresh the page.');
});

// ========== UTILITY FUNCTIONS ==========
const Utils = {
    // Safe element selector with error handling
    getElement: (selector) => {
        try {
            const element = document.getElementById(selector) || document.querySelector(selector);
            if (!element) {
                console.warn(`Element not found: ${selector}`);
            }
            return element;
        } catch (error) {
            console.error(`Error getting element ${selector}:`, error);
            return null;
        }
    },
    
    // Debounce function for performance optimization
    debounce: (func, wait) => {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },
    
    // Throttle function for scroll performance
    throttle: (func, limit) => {
        let inThrottle;
        return function(...args) {
            if (!inThrottle) {
                func.apply(this, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    },
    
    // Safe WhatsApp opener with error handling
    openWhatsApp: (message) => {
        try {
            const encodedMessage = encodeURIComponent(message);
            const url = `https://wa.me/${CONFIG.whatsappNumber}?text=${encodedMessage}`;
            window.open(url, '_blank', 'noopener,noreferrer');
            return true;
        } catch (error) {
            console.error('Error opening WhatsApp:', error);
            return false;
        }
    }
};

// ========== NOTIFICATION SYSTEM ==========
const NotificationSystem = {
    element: null,
    textElement: null,
    timeoutId: null,
    
    init: function() {
        this.element = Utils.getElement('notification');
        this.textElement = Utils.getElement('notificationText');
    },
    
    show: function(text) {
        if (!this.element || !this.textElement) {
            console.warn('Notification elements not found');
            return;
        }
        
        // Clear existing timeout
        if (this.timeoutId) {
            clearTimeout(this.timeoutId);
        }
        
        // Update text safely using textContent (XSS prevention)
        this.textElement.textContent = text;
        this.element.style.display = 'flex';
        
        // Auto-hide after configured duration
        this.timeoutId = setTimeout(() => {
            this.hide();
        }, CONFIG.notificationDuration);
    },
    
    hide: function() {
        if (this.element) {
            this.element.style.display = 'none';
        }
    }
};

// ========== SCROLL ANIMATIONS ==========
const ScrollAnimations = {
    observer: null,
    visibleElements: new Set(),
    
    init: function() {
        try {
            const options = {
                threshold: 0.15,
                rootMargin: '0px 0px -30px 0px'
            };
            
            this.observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        if (!this.visibleElements.has(entry.target)) {
                            entry.target.classList.add('animated');
                            this.visibleElements.add(entry.target);
                        }
                    } else {
                        if (this.visibleElements.has(entry.target)) {
                            entry.target.classList.remove('animated');
                            this.visibleElements.delete(entry.target);
                        }
                    }
                });
            }, options);
            
            // Observe all animated elements
            const elements = document.querySelectorAll('.animate-on-scroll, .slide-in-left, .slide-in-right, .faq-item');
            elements.forEach(el => this.observer.observe(el));
        } catch (error) {
            console.error('Error initializing scroll animations:', error);
        }
    },
    
    // Cleanup method to prevent memory leaks
    destroy: function() {
        if (this.observer) {
            this.observer.disconnect();
            this.observer = null;
        }
        this.visibleElements.clear();
    }
};

// ========== SCROLL PROGRESS ==========
const ScrollProgress = {
    element: null,
    header: null,
    
    init: function() {
        this.element = Utils.getElement('scrollProgress');
        this.header = Utils.getElement('mainHeader');
        
        if (!this.element) return;
        
        // Use throttled scroll handler for performance
        window.addEventListener('scroll', Utils.throttle(() => {
            this.update();
        }, CONFIG.scrollThrottleDelay), { passive: true });
    },
    
    update: function() {
        try {
            if (!this.element) return;
            
            const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrolled = (window.scrollY / windowHeight) * 100;
            this.element.style.width = Math.min(Math.max(scrolled, 0), 100) + '%';
            
            // Update header styling
            if (this.header) {
                if (window.scrollY > 50) {
                    this.header.classList.add('scrolled');
                } else {
                    this.header.classList.remove('scrolled');
                }
            }
        } catch (error) {
            console.error('Error updating scroll progress:', error);
        }
    }
};

// ========== MODAL SYSTEM ==========
const ModalSystem = {
    modal: null,
    content: null,
    closeBtn: null,
    isOpen: false,
    
    init: function() {
        this.modal = Utils.getElement('flightModal');
        this.content = document.querySelector('.modal-content');
        this.closeBtn = Utils.getElement('closeModal');
        
        if (!this.modal || !this.closeBtn) return;
        
        // Close button handler
        this.closeBtn.addEventListener('click', () => this.close());
        
        // Click outside to close
        this.modal.addEventListener('click', (e) => {
            if (e.target === this.modal) {
                this.close();
            }
        });
        
        // Escape key to close
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isOpen) {
                this.close();
            }
        });
    },
    
    open: function() {
        if (!this.modal) return;
        
        try {
            this.modal.style.display = 'block';
            document.body.style.overflow = 'hidden';
            this.isOpen = true;
            
            // Reset scroll position
            this.modal.scrollTop = 0;
            window.scrollTo(0, 0);
            
            // Adjust positioning after DOM update
            setTimeout(() => {
                if (!this.content) return;
                
                const viewportHeight = window.innerHeight;
                const modalHeight = this.content.offsetHeight;
                
                if (modalHeight > viewportHeight * 0.8) {
                    this.content.style.position = 'absolute';
                    this.content.style.top = '20px';
                    this.content.style.transform = 'translate(-50%, 0)';
                } else {
                    this.content.style.position = 'absolute';
                    this.content.style.top = '50%';
                    this.content.style.transform = 'translate(-50%, -50%)';
                }
            }, 50);
        } catch (error) {
            console.error('Error opening modal:', error);
        }
    },
    
    close: function() {
        if (!this.modal) return;
        
        try {
            this.modal.style.display = 'none';
            document.body.style.overflow = 'auto';
            this.isOpen = false;
            
            // Reset modal positioning
            if (this.content) {
                this.content.style.position = '';
                this.content.style.top = '';
                this.content.style.transform = '';
            }
        } catch (error) {
            console.error('Error closing modal:', error);
        }
    }
};

// ========== AIRPORT SEARCH ==========
const AirportSearch = {
    fromInput: null,
    toInput: null,
    fromDropdown: null,
    toDropdown: null,
    
    init: function() {
        this.fromInput = Utils.getElement('fromLocation');
        this.toInput = Utils.getElement('toLocation');
        this.fromDropdown = Utils.getElement('fromDropdown');
        this.toDropdown = Utils.getElement('toDropdown');
        
        if (!this.fromInput || !this.toInput) return;
        
        // Setup debounced input handlers
        this.fromInput.addEventListener('input', Utils.debounce(() => {
            this.search(this.fromInput, this.fromDropdown);
        }, CONFIG.searchDebounceDelay));
        
        this.toInput.addEventListener('input', Utils.debounce(() => {
            this.search(this.toInput, this.toDropdown);
        }, CONFIG.searchDebounceDelay));
        
        // Focus handlers
        this.fromInput.addEventListener('focus', () => {
            if (this.fromInput.value.length >= 2) {
                this.search(this.fromInput, this.fromDropdown);
            }
        });
        
        this.toInput.addEventListener('focus', () => {
            if (this.toInput.value.length >= 2) {
                this.search(this.toInput, this.toDropdown);
            }
        });
        
        // Click outside to close
        document.addEventListener('click', (e) => {
            if (this.fromInput && this.fromDropdown && 
                !this.fromInput.contains(e.target) && 
                !this.fromDropdown.contains(e.target)) {
                this.fromDropdown.style.display = 'none';
            }
            if (this.toInput && this.toDropdown && 
                !this.toInput.contains(e.target) && 
                !this.toDropdown.contains(e.target)) {
                this.toDropdown.style.display = 'none';
            }
        });
    },
    
    search: function(input, dropdown) {
        try {
            const query = input.value.trim();
            
            if (query.length < 2) {
                dropdown.style.display = 'none';
                return;
            }
            
            const results = this.searchAirports(query);
            this.renderResults(results, dropdown, input);
        } catch (error) {
            console.error('Error in airport search:', error);
        }
    },
    
    searchAirports: function(query) {
        if (!query || query.trim().length < 2) return [];
        
        const searchTerm = query.toLowerCase().trim();
        return AIRPORTS.filter(airport => {
            const searchString = `${airport.city.toLowerCase()} ${airport.country.toLowerCase()} ${airport.name.toLowerCase()} ${airport.code.toLowerCase()}`;
            return searchString.includes(searchTerm);
        }).sort((a, b) => {
            // Prioritize exact city matches
            const aCityMatch = a.city.toLowerCase().startsWith(searchTerm);
            const bCityMatch = b.city.toLowerCase().startsWith(searchTerm);
            if (aCityMatch && !bCityMatch) return -1;
            if (!aCityMatch && bCityMatch) return 1;
            return 0;
        }).slice(0, 10); // Limit results for performance
    },
    
    renderResults: function(results, dropdown, input) {
    try {
        dropdown.replaceChildren();
        
        if (results.length === 0) {
            const noResults = document.createElement('div');
            noResults.className = 'no-results';
            noResults.textContent = 'No airports found';
            dropdown.appendChild(noResults);
        } else {
            results.forEach(airport => {
                const item = document.createElement('div');
                item.className = 'autocomplete-item';
                
                const nameDiv = document.createElement('div');
                nameDiv.className = 'airport-name';
                
                const cityCountryText = document.createTextNode(`${airport.city}, ${airport.country}`);
                nameDiv.appendChild(cityCountryText);
                
                const codeSpan = document.createElement('span');
                codeSpan.style.cssText = 'color: var(--primary); font-size: 0.85rem; margin-left: 5px;';
                codeSpan.textContent = `(${airport.code})`;
                nameDiv.appendChild(codeSpan);
                
                const locationDiv = document.createElement('div');
                locationDiv.className = 'airport-location';
                
                const planeIcon = document.createElement('i');
                planeIcon.className = 'fas fa-plane';
                planeIcon.setAttribute('aria-hidden', 'true');
                
                const airportNameText = document.createTextNode(` ${airport.name}`);
                
                locationDiv.appendChild(planeIcon);
                locationDiv.appendChild(airportNameText);
                
                item.appendChild(nameDiv);
                item.appendChild(locationDiv);
                
                // Click handler
                item.addEventListener('click', () => {
                    input.value = `${airport.city}, ${airport.country}`;
                    dropdown.style.display = 'none';
                });
                
                dropdown.appendChild(item);
            });
        }
        
        dropdown.style.display = results.length > 0 ? 'block' : 'none';
    } catch (error) {
        console.error('Error rendering search results:', error);
    }
},
};

// ========== FLIGHT FORM ==========
const FlightForm = {
    form: null,
    dateInput: null,
    
    init: function() {
        this.form = Utils.getElement('flightForm');
        this.dateInput = Utils.getElement('travelDate');
        
        if (!this.form || !this.dateInput) return;
        
        const today = new Date();
        this.dateInput.min = today.toISOString().split('T')[0];
        
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);
        this.dateInput.value = tomorrow.toISOString().split('T')[0];
        
        // ADD DATE VALIDATION ON BLUR
        this.dateInput.addEventListener('blur', () => {
            const value = this.dateInput.value;
            if (!value || !/^\d{4}-\d{2}-\d{2}$/.test(value)) {
                this.dateInput.value = tomorrow.toISOString().split('T')[0];
                NotificationSystem.show('Invalid date. Please select from calendar.');
            }
        });
        
        this.dateInput.addEventListener('change', () => {
            const selectedDate = new Date(this.dateInput.value);
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            selectedDate.setHours(0, 0, 0, 0);
            
            if (selectedDate < today) {
                this.dateInput.style.borderColor = '#dc2626';
                this.dateInput.style.boxShadow = '0 0 0 2px rgba(220, 38, 38, 0.2)';
                NotificationSystem.show('⚠️ Selected date is in the past. Please choose a future date.');
            } else {
                this.dateInput.style.borderColor = '';
                this.dateInput.style.boxShadow = '';
            }
        });
        
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
    },

    validateAirport: function(inputValue, fieldName) {
        if (!inputValue || inputValue.trim() === '') {
            NotificationSystem.show(`❌ Please select a ${fieldName} airport`);
            return false;
        }
        
        const normalizedInput = inputValue.toLowerCase().trim();
        
        if (!normalizedInput.includes(',')) {
            NotificationSystem.show(`❌ Please select ${fieldName} airport from the dropdown (format: City, Country)`);
            return false;
        }
        
        const isValid = AIRPORTS.some(airport => {
            const cityCountry = `${airport.city}, ${airport.country}`.toLowerCase();
            return cityCountry === normalizedInput;
        });
        
        if (!isValid) {
            NotificationSystem.show(`❌ Invalid ${fieldName} airport. Please select from the dropdown.`);
            return false;
        }
        
        return true;
    },
    
    sanitizeInput: function(input, maxLength = 100) {
        if (!input) return '';
        
        // Remove special characters but keep basic punctuation
        return input
            .trim()
            .replace(/[<>\"\'`]/g, '') // Remove potential XSS chars
            .replace(/[^\w\s,.-]/g, '') // Keep only alphanumeric, spaces, commas, dots, hyphens
            .substring(0, maxLength);
    },
    
    handleSubmit: function(e) {
        e.preventDefault();
        
        try {
            const fromInput = Utils.getElement('fromLocation');
            const toInput = Utils.getElement('toLocation');
            const passengersSelect = Utils.getElement('passengers');
            
            if (!fromInput || !toInput || !passengersSelect) {
                console.error('Form elements not found');
                NotificationSystem.show('An error occurred. Please try again.');
                return;
            }
            
            const fromLocation = fromInput.value.trim();
            const toLocation = toInput.value.trim();
            const travelDate = this.dateInput.value;
            const passengers = passengersSelect.value;
            
            // Basic validation
            if (!fromLocation || !toLocation || !travelDate || !passengers) {
                NotificationSystem.show('Please fill in all fields');
                return;
            }
            
            // Airport validation
            if (!this.validateAirport(fromLocation, "departure")) return;
            if (!this.validateAirport(toLocation, "arrival")) return;
            
            // Date validation
            const today = new Date();
            const selectedDate = new Date(travelDate);
            today.setHours(0, 0, 0, 0);
            selectedDate.setHours(0, 0, 0, 0);
            
            if (selectedDate < today) {
                NotificationSystem.show('❌ Cannot book flights in the past. Please select a future date.');
                this.dateInput.focus();
                return;
            }
            
            // Same airport check
            if (fromLocation.toLowerCase() === toLocation.toLowerCase()) {
                NotificationSystem.show('❌ Departure and arrival airports cannot be the same!');
                return;
            }
            
            // ✅ NEW: Sanitize inputs before sending
            const safeFrom = this.sanitizeInput(fromLocation);
            const safeTo = this.sanitizeInput(toLocation);
            const safePassengers = this.sanitizeInput(passengers, 20);
            
            // Format date safely
            const formattedDate = new Date(travelDate).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });
            
            // Create sanitized message
            const message = `FLIGHT BOOKING REQUEST:\n\n• From: ${safeFrom}\n• To: ${safeTo}\n• Travel Date: ${formattedDate}\n• Passengers: ${safePassengers}\n\nPlease book the flight for me and provide the details.`;
            
            // Send to WhatsApp
            const success = Utils.openWhatsApp(message);
            
            if (success) {
                ModalSystem.close();
                this.form.reset();
                
                const tomorrow = new Date();
                tomorrow.setDate(tomorrow.getDate() + 1);
                this.dateInput.value = tomorrow.toISOString().split('T')[0];
                
                NotificationSystem.show(`Flight booking request sent for ${safeFrom} to ${safeTo}`);
            } else {
                NotificationSystem.show('Unable to open WhatsApp. Please try again.');
            }
        } catch (error) {
            console.error('Form submission error:', error);
            NotificationSystem.show('An error occurred. Please try again.');
        }
    }
};
          
//====== Small FAQ ======

const SmallFaq = {
    init: function() {
        const faqItems = document.querySelectorAll('.service-card .faq-item');
        if (!faqItems.length) return;

        const closeAll = () => {
            faqItems.forEach((item) => item.classList.remove('active'));
        };

        faqItems.forEach((faqItem) => {
            const question = faqItem.querySelector('.faq-question');
            if (!question) return;

            question.addEventListener('click', function(e) {
                e.stopPropagation();
                const shouldOpen = !faqItem.classList.contains('active');
                closeAll();
                faqItem.classList.toggle('active', shouldOpen);
            });
        });

        document.addEventListener('click', closeAll);
        window.addEventListener('scroll', closeAll, { passive: true });
    }
};

// ========== SUCHANA CARD COMPACT MODE ==========
const NoticeBar = {
    mainCard: null,
    toggleBtn: null,
    placeholder: null,
    compactHeight: 0,
    userCollapsed: false,
    isCompact: false,
    header: null,

    init: function() {
        this.mainCard = Utils.getElement('mainSuchanaCard');
        this.toggleBtn = Utils.getElement('suchanaToggle');
        this.header = Utils.getElement('mainHeader');
        const details = Utils.getElement('suchanaDetails');

        if (!this.mainCard || !this.toggleBtn || !details) return;

        this.placeholder = document.createElement('div');
        this.placeholder.style.display = 'none';
        this.placeholder.style.transition = 'height 0.28s cubic-bezier(0.4, 0, 0.2, 1)';
        this.mainCard.parentNode.insertBefore(this.placeholder, this.mainCard);

        this.measureCompactHeight();

        this.toggleBtn.addEventListener('click', (event) => {
            event.stopPropagation();
            if (this.isCompact) {
                this.scrollToOriginal();
            } else {
                this.userCollapsed = !this.userCollapsed;
                this.renderState();
                this.measureCompactHeight();
            }
        });

        this.mainCard.addEventListener('click', (event) => {
            if (!this.isCompact || event.target.closest('.notice-toggle')) {
                return;
            }

            this.scrollToOriginal();
        });

        window.addEventListener('scroll', Utils.throttle(() => {
            this.updateVisibility();
        }, 80), { passive: true });

        window.addEventListener('resize', Utils.throttle(() => {
            this.measureCompactHeight();
            this.updateVisibility();
        }, 120));

        this.renderState();
        this.updateVisibility();
    },

    measureCompactHeight: function() {
        const previousCompact = this.isCompact;

        this.isCompact = false;
        this.mainCard.classList.remove('is-compact');
        this.mainCard.classList.toggle('is-collapsed', true);
        this.mainCard.classList.add('is-compact');
        this.mainCard.classList.add('is-collapsed');
        this.compactHeight = this.mainCard.offsetHeight;

        this.isCompact = previousCompact;
        this.renderState();
    },

    scrollToOriginal: function() {
        const targetTop = Math.max(this.placeholder.getBoundingClientRect().top + window.scrollY - this.getCompactTopOffset() - 12, 0);
        this.userCollapsed = false;
        window.scrollTo({ top: targetTop, behavior: 'smooth' });
    },

    getCompactTopOffset: function() {
        if (!this.header) {
            return 14;
        }

        const headerRect = this.header.getBoundingClientRect();
        if (headerRect.bottom > 0) {
            return Math.max(14, Math.round(headerRect.bottom + 10));
        }

        return 14;
    },

    renderState: function() {
        this.mainCard.classList.toggle('is-compact', this.isCompact);
        this.mainCard.classList.toggle('is-collapsed', this.isCompact || this.userCollapsed);

        if (this.isCompact) {
            this.placeholder.style.display = 'block';
            this.placeholder.style.height = `${this.compactHeight}px`;
            this.toggleBtn.textContent = 'Open';
            this.toggleBtn.setAttribute('aria-expanded', 'false');
        } else {
            this.placeholder.style.height = '0px';
            this.placeholder.style.display = 'none';
            this.toggleBtn.textContent = this.userCollapsed ? 'Show' : 'Hide';
            this.toggleBtn.setAttribute('aria-expanded', String(!this.userCollapsed));
        }
    },

    updateVisibility: function() {
        const anchor = this.placeholder.style.display === 'block' ? this.placeholder : this.mainCard;
        const anchorRect = anchor.getBoundingClientRect();
        const compactTopOffset = this.getCompactTopOffset();
        document.documentElement.style.setProperty('--notice-compact-top', `${compactTopOffset}px`);

        const shouldCompact = window.scrollY > 80 && anchorRect.bottom <= compactTopOffset;
        if (shouldCompact !== this.isCompact) {
            this.isCompact = shouldCompact;
            this.renderState();
        } else if (this.isCompact) {
            this.placeholder.style.height = `${this.compactHeight}px`;
        }
    }
};


// ========== FAQ SYSTEM ==========
const FAQSystem = {
    init: function() {
        const categoryBtns = document.querySelectorAll('.faq-category-btn');
        const faqItems = document.querySelectorAll('.faq-section .faq-item');
        
        // Category switching
        categoryBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                try {
                    const category = this.getAttribute('data-category');
                    
                    // Update buttons
                    categoryBtns.forEach(b => b.classList.remove('active'));
                    this.classList.add('active');
                    
                    // Update content
                    document.querySelectorAll('.faq-content').forEach(content => {
                        content.classList.remove('active');
                    });
                    
                    const targetContent = document.getElementById(`${category}-faq`);
                    if (targetContent) {
                        targetContent.classList.add('active');
                        
                        // Animate items
                        const newFaqItems = targetContent.querySelectorAll('.faq-item');
                        newFaqItems.forEach((item, index) => {
                            item.classList.remove('animated');
                            ScrollAnimations.visibleElements.delete(item);
                            
                            setTimeout(() => {
                                item.classList.add('animated');
                                ScrollAnimations.visibleElements.add(item);
                            }, index * 100);
                        });
                    }
                } catch (error) {
                    console.error('Error switching FAQ category:', error);
                }
            });
        });
        
        // FAQ item toggling
        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            if (question) {
                question.addEventListener('click', function() {
                    try {
                        const isActive = item.classList.contains('active');
                        const category = item.closest('.faq-content').id;
                        const allItemsInCategory = document.querySelectorAll(`#${category} .faq-item`);
                        
                        // Close all items in category
                        allItemsInCategory.forEach(faqItem => {
                            faqItem.classList.remove('active');
                        });
                        
                        // Open clicked item if it wasn't active
                        if (!isActive) {
                            item.classList.add('active');
                        }
                    } catch (error) {
                        console.error('Error toggling FAQ item:', error);
                    }
                });
            }
        });
    }
};

// ========== FLYING PLANES ANIMATION ==========
const FlyingPlanes = {
    intervalId: null,
    
    init: function() {
        if (window.innerWidth < 768) {
        return;
    }
        this.createPlanes();
        
        // Recreate periodically
        this.intervalId = setInterval(() => {
            this.createPlanes();
        }, CONFIG.planeCreationInterval);
        
        // Recreate on resize (debounced)
        window.addEventListener('resize', Utils.debounce(() => {
            this.createPlanes();
        }, 500));
    },
    
    createPlanes: function() {
        try {
            // Clear existing planes
            document.querySelectorAll('.flying-plane').forEach(p => {
                if (p.parentNode) {
                    p.remove();
                }
            });
            
            const planeCount = 8;
            
            for (let i = 0; i < planeCount; i++) {
                const plane = document.createElement('div');
                plane.className = 'flying-plane';
                plane.setAttribute('aria-hidden', 'true');
                
                // Create icon safely
                const icon = document.createElement('i');
                icon.className = 'fas fa-plane';
                plane.appendChild(icon);
                
                // Random values
                const top = Math.random() * 80 + 10;
                const duration = 40 + Math.random() * 60;
                const startDelay = Math.random() * 35;
                const yMovement = (Math.random() - 0.5) * 0.25;
                const size = 1.2 + Math.random() * 1;
                
                plane.style.cssText = `
                    top: ${top}%;
                    --y-movement: ${yMovement};
                    animation: fly ${duration}s linear ${startDelay}s forwards;
                    font-size: ${size}rem;
                    opacity: ${0.06 + Math.random() * 0.12};                `;
                
                // Auto-remove after animation completes (prevent memory leaks)
                setTimeout(() => {
                    if (plane.parentNode) {
                        plane.remove();
                    }
                }, (duration + startDelay) * 1000 + 2000);
                
                document.body.appendChild(plane);
            }
        } catch (error) {
            console.error('Error creating flying planes:', error);
        }
    },
    
    // Cleanup method to prevent memory leaks
    destroy: function() {
        if (this.intervalId) {
            clearInterval(this.intervalId);
            this.intervalId = null;
        }
        document.querySelectorAll('.flying-plane').forEach(p => {
            if (p.parentNode) {
                p.remove();
            }
        });
    }
};

// ========== BUTTON HANDLERS ==========
const ButtonHandlers = {
    lastClickTime: {},
    cooldownPeriod: 2000, // 2 seconds
    
    canClick: function(buttonId) {
        const now = Date.now();
        const lastClick = this.lastClickTime[buttonId] || 0;
        
        if (now - lastClick < this.cooldownPeriod) {
            const remainingTime = Math.ceil((this.cooldownPeriod - (now - lastClick)) / 1000);
            NotificationSystem.show(`Please wait ${remainingTime} second(s) before sending another request`);
            return false;
        }
        
        this.lastClickTime[buttonId] = now;
        return true;
    },
    
    init: function() {
        // Work Permit Button
        const workPermitBtn = Utils.getElement('workPermitBtn');
        if (workPermitBtn) {
            workPermitBtn.addEventListener('click', () => {
                if (!this.canClick('workPermit')) return;
                
                const message = "नमस्कार सर, म श्रम स्वीकृति नवीकरण सम्बन्धमा सम्पर्क गरेको हुँ।";
                const success = Utils.openWhatsApp(message);
                if (success) {
                    NotificationSystem.show("Work permit renewal request sent via WhatsApp");
                }
            });
        }
        
        // Flight Ticket Button (no rate limit needed - just opens modal)
        const flightTicketBtn = Utils.getElement('flightTicketBtn');
        if (flightTicketBtn) {
            flightTicketBtn.addEventListener('click', () => {
                ModalSystem.open();
            });
        }
        
        // Floating WhatsApp Button
        const floatingWhatsApp = Utils.getElement('floatingWhatsApp');
        if (floatingWhatsApp) {
            floatingWhatsApp.addEventListener('click', () => {
                if (!this.canClick('floating')) return;
                
                const message = "नमस्कार सर, म फ्लाइट र श्रम स्वीकृति नवीकरण सम्बन्धमा सम्पर्क गरेको हुँ।";
                const success = Utils.openWhatsApp(message);
                if (success) {
                    NotificationSystem.show("Opening WhatsApp chat");
                }
            });
        }
    }
};

// ========== Stats initialization ==========
document.addEventListener('DOMContentLoaded', function() {
            const statItems = document.querySelectorAll('.stat-item');
            
            // Function to check if element is in viewport
            function isInViewport(element) {
                const rect = element.getBoundingClientRect();
                return (
                    rect.top <= (window.innerHeight * 0.85) &&
                    rect.bottom >= (window.innerHeight * 0.15)
                );
            }
            
            // Function to handle scroll events
            function handleScroll() {
                statItems.forEach((item, index) => {
                    if (isInViewport(item)) {
                        if (!item.classList.contains('visible')) {
                            item.classList.add('visible');
                            
                            // Trigger number counting for this specific stat
                            const statNumber = item.querySelector('.stat-number');
                            if (statNumber && !statNumber.classList.contains('counted')) {
                                countUp(statNumber);
                                statNumber.classList.add('counted');
                            }
                        }
                    }
                });
            }
            
            // Number counting animation
            function countUp(element) {
                const originalText = element.textContent;
                const hasPlus = originalText.includes('+');
                const hasPercent = originalText.includes('%');
                const pureNumber = parseInt(originalText);
                
                let current = 0;
                const increment = pureNumber / 50;
                const duration = 1500;
                const interval = duration / 50;
                
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= pureNumber) {
                        current = pureNumber;
                        clearInterval(timer);
                    }
                    
                    let displayValue = Math.floor(current);
                    if (hasPlus) displayValue += '+';
                    if (hasPercent) displayValue += '%';
                    
                    element.textContent = displayValue;
                }, interval);
            }
            
            handleScroll();
            
            let isScrolling = false;
            window.addEventListener('scroll', () => {
                if (!isScrolling) {
                    window.requestAnimationFrame(() => {
                        handleScroll();
                        isScrolling = false;
                    });
                    isScrolling = true;
                }
            });
            
            window.addEventListener('resize', handleScroll);
        });

const countries = [
            "Qatar", "Saudi Arabia", "United Arab Emirates (UAE)", 
            "Kuwait", "Bahrain", "Oman", "Malaysia", "Japan", 
            "South Korea", "Israel", "Maldives", "Romania", 
            "Cyprus", "Poland", "Portugal", "Mauritius", "Seychelles"
        ];
        
        const flagEmojis = {
            "Qatar": "🇶🇦", "Saudi Arabia": "🇸🇦", "United Arab Emirates (UAE)": "🇦🇪",
            "Kuwait": "🇰🇼", "Bahrain": "🇧🇭", "Oman": "🇴🇲", "Malaysia": "🇲🇾",
            "Japan": "🇯🇵", "South Korea": "🇰🇷", "Israel": "🇮🇱", "Maldives": "🇲🇻",
            "Romania": "🇷🇴", "Cyprus": "🇨🇾", "Poland": "🇵🇱", "Portugal": "🇵🇹",
            "Mauritius": "🇲🇺", "Seychelles": "🇸🇨"
        };
        
        const marqueeTrack = document.getElementById('marqueeTrack');
        
        // Create two sets for seamless looping
        for (let i = 0; i < 2; i++) {
            countries.forEach(country => {
                const countryItem = document.createElement('div');
                countryItem.className = 'country-item';
                
                const flagSpan = document.createElement('span');
                flagSpan.className = 'country-flag';
                flagSpan.textContent = flagEmojis[country] || "🌍";
                
                const nameSpan = document.createElement('span');
                nameSpan.className = 'country-name';
                nameSpan.textContent = country;
                
                countryItem.appendChild(flagSpan);
                countryItem.appendChild(nameSpan);
                marqueeTrack.appendChild(countryItem);
            });
        }
        
        // Hover control
        document.querySelector('.marquee-container').addEventListener('mouseenter', () => {
            marqueeTrack.style.animationPlayState = 'paused';
        });
        
        document.querySelector('.marquee-container').addEventListener('mouseleave', () => {
            marqueeTrack.style.animationPlayState = 'running';
        });

// Flags movement
 document.addEventListener('DOMContentLoaded', function() {
            // Flags movement
            const countries = [
                "Qatar", "Saudi Arabia", "United Arab Emirates (UAE)", 
                "Kuwait", "Bahrain", "Oman", "Malaysia", "Japan", 
                "South Korea", "Israel", "Maldives", "Romania", 
                "Cyprus", "Poland", "Portugal", "Mauritius", "Seychelles"
            ];
            
            const flagEmojis = {
                "Qatar": "🇶🇦", "Saudi Arabia": "🇸🇦", "United Arab Emirates (UAE)": "🇦🇪",
                "Kuwait": "🇰🇼", "Bahrain": "🇧🇭", "Oman": "🇴🇲", "Malaysia": "🇲🇾",
                "Japan": "🇯🇵", "South Korea": "🇰🇷", "Israel": "🇮🇱", "Maldives": "🇲🇻",
                "Romania": "🇷🇴", "Cyprus": "🇨🇾", "Poland": "🇵🇱", "Portugal": "🇵🇹",
                "Mauritius": "🇲🇺", "Seychelles": "🇸🇨"
            };
            
            const marqueeTrack = document.getElementById('marqueeTrack');
            
            // Check if element exists
            if (!marqueeTrack) {
                console.error('Element with id "marqueeTrack" not found!');
                return;
            }
            
            // Create two sets for seamless looping
            for (let i = 0; i < 2; i++) {
                countries.forEach(country => {
                    const countryItem = document.createElement('div');
                    countryItem.className = 'country-item';
                    
                    const flagSpan = document.createElement('span');
                    flagSpan.className = 'country-flag';
                    flagSpan.textContent = flagEmojis[country] || "🌍";
                    
                    const nameSpan = document.createElement('span');
                    nameSpan.className = 'country-name';
                    nameSpan.textContent = country;
                    
                    countryItem.appendChild(flagSpan);
                    countryItem.appendChild(nameSpan);
                    marqueeTrack.appendChild(countryItem);
                });
            }
            
            // Hover control
            const container = document.querySelector('.marquee-container');
            if (container) {
                container.addEventListener('mouseenter', () => {
                    marqueeTrack.style.animationPlayState = 'paused';
                });
                
                container.addEventListener('mouseleave', () => {
                    marqueeTrack.style.animationPlayState = 'running';
                });
            }
            
            console.log('Marquee initialized successfully!');
        });

// ========== Calculator ==========
        const today = new Date();
        const defaultDate = new Date(today.getFullYear() - 35, today.getMonth(), today.getDate());
        const formattedDate = defaultDate.toISOString().split('T')[0];
        document.getElementById('dateInput').value = formattedDate;
        document.getElementById('dateInput').max = today.toISOString().split('T')[0];

        // Fee structure
        const fees = {
            upTo35: 8284,
            above35: 9507
        };

        const feesChange = {
            upTo35: 8434,
            above35: 9657
        };

        // Toggle calculator popup
        function toggleCalculator() {
            const popup = document.getElementById('calculatorPopup');
            popup.classList.toggle('show');
        }

        // Close calculator
        function closeCalculator() {
            document.getElementById('calculatorPopup').classList.remove('show');
        }

        // Switch between tabs
        function switchTab(tabName) {
            // Hide all tab contents
            document.querySelectorAll('.tab-content').forEach(tab => {
                tab.classList.remove('active');
            });
            
            // Remove active class from all tabs
            document.querySelectorAll('.tab').forEach(tab => {
                tab.classList.remove('active');
            });
            
            // Show selected tab
            document.getElementById(tabName).classList.add('active');
            
            // Activate clicked tab button
            event.target.classList.add('active');
            
            // Show results if already calculated
            const results = document.getElementById('results');
            if (results.classList.contains('show')) {
                results.classList.remove('show');
            }
        }

        // Calculate from age input
        function calculateFromAge() {
            const ageInput = document.getElementById('ageInput');
            const age = parseInt(ageInput.value);
            
            if (!age || age < 16 || age > 70) {
                alert('कृपया १६ देखि ७० वर्षको बीचमा उमेर प्रविष्ट गर्नुहोस्।');
                ageInput.focus();
                return;
            }
            
            calculateFee(age);
        }

        // Calculate from birth date
        function calculateFromDate() {
            const dateInput = document.getElementById('dateInput').value;
            if (!dateInput) {
                alert('कृपया जन्म मिति चयन गर्नुहोस्।');
                return;
            }
            
            const birthDate = new Date(dateInput);
            const today = new Date();
            
            let age = today.getFullYear() - birthDate.getFullYear();
            const monthDiff = today.getMonth() - birthDate.getMonth();
            
            if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
                age--;
            }
            
            // Update age input for consistency
            document.getElementById('ageInput').value = age;
            
            calculateFee(age);
        }

        // Calculate fee based on age
        function calculateFee(age) {
            let fee, group, groupNepali, feeChange;
            
            if (age <= 35) {
                fee = fees.upTo35;
                feeChange = feesChange.upTo35;
                
            }  else {
                fee = fees.above35;
                feeChange = feesChange.above35;
            }
            
            // Update results
            document.getElementById('feeAmount').textContent = `रु ${fee.toLocaleString('en-IN')}`;
            document.getElementById('feeAmountChange').textContent = `रु ${feeChange.toLocaleString('en-IN')}`;
            
            // Show results
            document.getElementById('results').classList.add('show');
            
            // Scroll results into view
            document.getElementById('results').scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }

        document.addEventListener('click', function(event) {
            const popup = document.getElementById('calculatorPopup');
            const button = document.querySelector('.floating-btn');
            if (popup.classList.contains('show') && 
                !popup.contains(event.target) && 
                !button.contains(event.target)) {
                popup.classList.remove('show');
            }
        });

// ========== WELCOME ANIMATION CLEANUP ==========
const WelcomeAnimation = {
    init: function() {
        if (window.innerWidth < 768) {
        const welcomeAnim = document.getElementById('welcomeAnimation');
        const websiteContent = document.querySelector('.website-content');
        
        if (welcomeAnim) {
            welcomeAnim.style.display = 'none';
            welcomeAnim.remove();
        }
        
        if (websiteContent) {
            websiteContent.style.opacity = '1';
        }
        
        return;
    }
        setTimeout(() => {
            const welcomeAnimation = Utils.getElement('welcomeAnimation');
            if (welcomeAnimation && welcomeAnimation.parentNode) {
                welcomeAnimation.style.display = 'none';
                
                // Remove from DOM after fade out
                setTimeout(() => {
                    if (welcomeAnimation.parentNode) {
                        welcomeAnimation.remove();
                    }
                }, 1000);
            }
        }, CONFIG.welcomeAnimationCleanup);
    }
};

// ========== CLEANUP ON PAGE UNLOAD ==========
window.addEventListener('beforeunload', () => {
    try {
        ScrollAnimations.destroy();
        FlyingPlanes.destroy();
    } catch (error) {
        console.error('Cleanup error:', error);
    }
});
    