$('.testimonial-slider').slick({

    slidesToShow: 4,
    slidesToScroll: 1,
    infinite: true,
    arrows: true,
    prevArrow: $('.testimonial-prev'),
    nextArrow: $('.testimonial-next'),
    dots: false,
    responsive: [
        {
            breakpoint: 992,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 1
            }
        },
        {
            breakpoint: 576,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1
            }
        }
    ]
});


// How it works section ---- slider 
const howWorksImages = [
    "https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=700&q=80",
    "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=700&q=80",
    "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=700&q=80",
    "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=700&q=80",
    "https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=700&q=80",
    "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=700&q=80"
];

const howWorksSlider = document.getElementById("howWorksSlider");
const previousButton = document.getElementById("howWorksPrev");
const nextButton = document.getElementById("howWorksNext");
const currentStep = document.getElementById("currentStep");
const totalSteps = document.getElementById("totalSteps");

let currentIndex = 0;
let isAnimating = false;

totalSteps.textContent = String(howWorksImages.length).padStart(2, "0");

    // Create image cards

function createSlider() {
    howWorksSlider.innerHTML = "";
    howWorksImages.forEach((image, index) => {
        const img = document.createElement("img");
        img.src = image;
        img.alt = `How it works step ${index + 1}`;
        img.className = "slider-card";
        howWorksSlider.appendChild(img);
    });
    updateSlider(false);
}

    // Get image indexes with infinite looping

function getIndex(index) {
    return (index + howWorksImages.length) % howWorksImages.length;
}

    // Update the three visible cards

function updateSlider(animate = true) {

    const cards = [...howWorksSlider.children];
    cards.forEach(card => {
        card.className = "slider-card";
    });

    const frontIndex = getIndex(currentIndex);
    const middleIndex = getIndex(currentIndex + 1);
    const backIndex = getIndex(currentIndex + 2);

    cards[frontIndex].classList.add("is-front");
    cards[middleIndex].classList.add("is-middle");
    cards[backIndex].classList.add("is-back");
    currentStep.textContent = String(frontIndex + 1).padStart(2, "0");
}

    // NEXT

function nextSlide() {
    if (isAnimating) return;
    isAnimating = true;
    const cards = [...howWorksSlider.children];
    const frontIndex = getIndex(currentIndex);
        // Current front image leaves the screen
    cards[frontIndex].classList.remove("is-front");
    cards[frontIndex].classList.add("is-exiting");

        // Move to next image.
    currentIndex = getIndex(currentIndex + 1);
        // Give the browser a tiny moment to register the exit animation.
    requestAnimationFrame(() => {
        updateSlider(true);
    });

    setTimeout(() => {
        cards[frontIndex].className = "slider-card";
        isAnimating = false;
    }, 650);
}

    // PREVIOUS

function previousSlide() {
    if (isAnimating) return;
    isAnimating = true;
    currentIndex = getIndex(currentIndex - 1);
    updateSlider(true);
    setTimeout(() => {
        isAnimating = false;
    }, 650);
}

    // Button events
nextButton.addEventListener("click", nextSlide);
previousButton.addEventListener("click", previousSlide);

// Start slider

createSlider();