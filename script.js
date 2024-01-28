// NavBar

// change nav style when scrolling
const navBar = document.querySelector('.nav')
const scrollWatcher = document.createElement('div')

scrollWatcher.setAttribute('data-scroll-watcher', '');
navBar.before(scrollWatcher);

const navObserver = new IntersectionObserver((entires) => {
    navBar.classList.toggle('sticking', !entires[0].isIntersecting);
});

navObserver.observe(scrollWatcher);

// hide nav on scroll up and show on scrolling down
let lastScroll = window.scrollY;

window.addEventListener("scroll", () => {
    if (lastScroll <= window.scrollY) {
        navBar.classList.add("nav-hidden");
    } else {
        navBar.classList.remove("nav-hidden");
    }

    lastScroll = window.scrollY;
});


// hamburger menu
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navOverlay = document.querySelector('.nav-overlay');

hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("isActive");
    navMenu.classList.toggle("isActive");
    navOverlay.classList.toggle("isActive")
})

document.querySelectorAll(".nav-link").forEach(
    n => n.addEventListener("click", () => {
        hamburger.classList.remove("isActive");
        navMenu.classList.remove("isActive");
        navOverlay.classList.remove("isActive")
    })
)

// Courses
const cardData =  [
    {
        image: 'sources/card1.webp',
        title: 'iOS Development',
        info: 'რეგისტრაცია დასრულებულია'
    },
    {
        image: 'sources/card2.webp',
        title: 'React',
        info: 'რეგისტრაცია დასრულებულია'
    },
    {
        image: 'sources/card3.webp',
        title: 'Intro to Python',
        info: 'რეგისტრაცია დასრულებულია'
    },
    {
        image: 'sources/card4.webp',
        title: 'Advanced Python',
        info: 'რეგისტრაცია დასრულებულია'
    },
    {
        image: 'sources/card5.webp',
        title: 'Advanced Cybersecurity Course',
        info: 'რეგისტრაცია დასრულებულია'
    },
    {
        image: 'sources/card6.webp',
        title: 'ToT - Training of Trainers',
        info: 'რეგისტრაცია დასრულებულია'
    },
    {
        image: 'sources/card7.webp',
        title: 'Blockchain',
        info: 'რეგისტრაცია დასრულებულია'
    },
    {
        image: 'sources/card8.webp',
        title: 'DevOps',
        info: 'რეგისტრაცია დასრულებულია'
    },
    {
        image: 'sources/card9.webp',
        title: 'Information Security Governance',
        info: 'რეგისტრაცია დასრულებულია'
    }
]

const coursesContainer = document.querySelector('.courses-wrapper');

const card = () => {
    cardData.map((data) => {
        cardElement = document.createElement('div');
        cardElement.classList.add('courses-card');
        cardElement.innerHTML = `
            <img src="${data.image}" alt="" class="card-img">
            <h2 class="card-title">${data.title}</h2>
            <p class="card-info">${data.info}</p>
            <i class="fa fa-arrow-right" aria-hidden="true"></i>
            <a href="#" class="course-details-btn">კურსის დეტალები</a>
        `
        coursesContainer.appendChild(cardElement);
    })
}
card();

// Partners 

const buttons = document.querySelectorAll("[data-carousel-button]");
const controls = document.querySelectorAll('.carousel .slider-controls .control');
let autoplay;
let touchStartX;
let isTransitioning = false;

buttons.forEach(button => {
    button.addEventListener("click", () => {
        const offset = button.dataset.carouselButton === "next" ? 1 : -1;
        const slides = button
            .closest("[data-carousel]")
            .querySelector("[data-slides]");

        const activeSlide = slides.querySelector("[data-active]");
        let newIndex = [...slides.children].indexOf(activeSlide) + offset;
        if (newIndex < 0) newIndex = slides.children.length - 1;
        if (newIndex >= slides.children.length) newIndex = 0;

        activeSlide.classList.add(offset === 1 ? 'slide-out-left' : 'slide-out-right');
        slides.children[newIndex].classList.add(offset === 1 ? 'slide-in-right' : 'slide-in-left');
        slides.children[newIndex].dataset.active = true;
        setTimeout(() => {
            delete activeSlide.dataset.active;
            activeSlide.className = 'slide';
            slides.children[newIndex].className = 'slide';
            restartAutoplay(); // restart autoplay
        }, 1000);
    });
});

controls.forEach((control, index) => {
    control.addEventListener('click', () => {
        if (isTransitioning) return;
        const slides = document.querySelectorAll('.carousel [data-slides] .slide');
        const activeIndex = [...slides].findIndex(slide => slide.dataset.active === 'true');
        const offset = index - activeIndex;

        if (offset === 0) return; // clicked on the  active slide

        const activeSlide = slides[activeIndex];
        let newIndex = activeIndex + offset;

        if (newIndex < 0) newIndex = slides.length - 1;
        if (newIndex >= slides.length) newIndex = 0;

        const nextSlide = slides[newIndex];

        if (offset > 0) {
            activeSlide.classList.add('slide-out-left');
            nextSlide.classList.add('slide-in-right');
        } else {
            activeSlide.classList.add('slide-out-right');
            nextSlide.classList.add('slide-in-left');
        }

        nextSlide.dataset.active = true;

        controls.forEach((c, i) => {
            if (i === newIndex) {
                c.classList.add('selected');
            } else {
                c.classList.remove('selected');
            }
        });

        setTimeout(() => {
            delete activeSlide.dataset.active;
            activeSlide.className = 'slide';
            nextSlide.className = 'slide';
            restartAutoplay();
        }, 1000);
    });
});

controls[0].classList.add('selected');


autoplay = setInterval(() => {
    const nextButton = document.querySelector('.carousel [data-carousel-button="next"]');
    nextButton.click();
}, 6000);

// restart autoplay fu
function restartAutoplay() {
    clearInterval(autoplay);
    autoplay = setInterval(() => {
        const nextButton = document.querySelector('.carousel [data-carousel-button="next"]');
        nextButton.click();
    }, 6000);
}

// Stop autoplay when user clicks button
buttons.forEach(button => {
    button.addEventListener("click", () => {
        clearInterval(autoplay);
    });
});


const slider = document.querySelector('.carousel [data-slides]');
slider.addEventListener('touchstart', e => {
    touchStartX = e.touches[0].clientX;
});

slider.addEventListener('touchend', e => {
    if (isTransitioning) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diffX = touchStartX - touchEndX;

    // swipe right
    if (diffX > 0) {
        const nextButton = document.querySelector('.carousel [data-carousel-button="next"]');
        isTransitioning = true; 
        nextButton.click();
    }
    // swipe left
    else if (diffX < 0) {
        const prevButton = document.querySelector('.carousel [data-carousel-button="prev"]');
        isTransitioning = true; 
        prevButton.click();
    }
});

buttons.forEach(button => {
    button.addEventListener("click", () => {
        setTimeout(() => {
            isTransitioning = false; 
        }, 1000);
    });
});


// FAQ
const accordionItemHeaders = document.querySelectorAll(".accordion-item-header");

accordionItemHeaders.forEach(accordionItemHeader => {
    accordionItemHeader.addEventListener("click", () => {
        const currentActive = document.querySelector(".accordion-item-header.isActive")
        if(currentActive && currentActive !== accordionItemHeader) {
            currentActive.classList.remove("isActive")
            currentActive.nextElementSibling.style.maxHeight = 0;
        }

        accordionItemHeader.classList.toggle("isActive");
        const accordionItemBody = accordionItemHeader.nextElementSibling;
        if (accordionItemHeader.classList.contains("isActive")) {
            accordionItemBody.style.maxHeight = accordionItemBody.scrollHeight + "px";
        } else {
            accordionItemBody.style.maxHeight = 0;
        }
    })
})


// Footer

const termsLink = document.querySelector('.terms-and-conditions-link');
const termsDiv = document.querySelector('#terms-and-conditions');
const termsOverlay = document.querySelector('#slide-in-div-overlay');

termsLink.addEventListener("click", (e) => {
    e.preventDefault();
    termsLink.classList.toggle("isActive");
    termsDiv.classList.toggle("isActive");
    termsOverlay.style.display = 'block';
});

document.querySelector('#close-button').addEventListener("click", () => {
    termsLink.classList.remove("isActive");
    termsDiv.classList.remove("isActive");
    termsOverlay.style.display = 'none';
    setTimeout(() => {
        termsDiv.style.transition = ''; // re enable slide transition 
    }, 0);
});

termsOverlay.addEventListener('click', () => {
    termsLink.classList.remove("isActive");
    termsDiv.classList.remove("isActive");
    termsOverlay.style.display = 'none';
    setTimeout(() => {
        termsDiv.style.transition = ''; // re enable slide transition 
    }, 0);
});
