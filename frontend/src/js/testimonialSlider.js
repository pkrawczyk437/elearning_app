document.addEventListener('DOMContentLoaded', function () {
	const testimonials = [
		{
			text: 'The health and safety course platform was incredibly informative and easy to navigate. It provided essential knowledge for ensuring workplace safety.',
			imagePath: './images/testimonial-avatar1.jpg',
			name: 'Annie Janitz',
		},
		{
			text: "I found the workplace health and safety course platform to be comprehensive and engaging. It's a valuable resource for both employers and employees.",
			imagePath: './images/testimonial-avatar2.jpg',
			name: 'John Doe',
		},
		{
			text: 'Thanks to the health and safety course platform, I feel more confident in identifying potential hazards in my workplace and taking appropriate precautions.',
			imagePath: './images/testimonial-avatar3.jpg',
			name: 'Eric Van Tag',
		},
		{
			text: 'The course platform on workplace health and safety exceeded my expectations. It effectively highlighted the importance of prioritizing employee well-being.',
			imagePath: './images/testimonial-avatar2.jpg',
			name: 'Benjamin Foster',
		},
		{
			text: 'I highly recommend the health and safety course platform to anyone looking to create a safer work environment. The content is practical and applicable to various industries.',
			imagePath: './images/testimonial-avatar3.jpg',
			name: 'Xavier Rodriguez',
		},
		{
			text: "The workplace health and safety course platform was user-friendly and packed with useful information. It's an invaluable tool for promoting a culture of safety.",
			imagePath: './images/testimonial-avatar1.jpg',
			name: 'Samantha Rivers',
		},
	];

	const testimonialWrapper = document.getElementById('testimonialWrapper');
	const sliderDots = document.getElementById('sliderDots');
	const cardsPerPage = 3; // Defined number of cards per page

	function createTestimonialCard(testimonial, index) {
		const card = document.createElement('div');
		card.className = 'testimonial-card';
		card.innerHTML = `
            <div class="quote-icon">“</div>
            <p class="testimonial-text">${testimonial.text}</p>
            <div class="client-image"><img src="${testimonial.imagePath}" alt="${testimonial.name}"/></div>
            <span class="client-name">${testimonial.name}</span> <!-- Client's name added here -->
        `;
		return card;
	}

	function createSlides() {
		testimonialWrapper.innerHTML = ''; // Clear existing testimonials if any
		let slide = null;
		testimonials.forEach((testimonial, index) => {
			if (index % cardsPerPage === 0) {
				// Create a new slide
				slide = document.createElement('div');
				slide.className = 'testimonial-slide';
				testimonialWrapper.appendChild(slide);
			}
			slide.appendChild(createTestimonialCard(testimonial, index));
		});
	}

	function createDots() {
		const slideCount = Math.ceil(testimonials.length / cardsPerPage);
		sliderDots.innerHTML = ''; // Clear existing dots if any
		for (let i = 0; i < slideCount; i++) {
			const dot = document.createElement('span');
			dot.className = 'dot';
			dot.setAttribute('data-index', i);
			dot.addEventListener('click', () => {
				updateSliderPosition(i);
				setCurrentDot(i);
			});
			sliderDots.appendChild(dot);
		}
		setCurrentDot(0); // Set the first dot as active
	}

	function updateSliderPosition(index) {
		const slideWidth = testimonialWrapper.clientWidth;
		testimonialWrapper.scrollLeft = slideWidth * index; // Scroll to the slide
	}

	function setCurrentDot(index) {
		const dots = sliderDots.querySelectorAll('.dot');
		dots.forEach((dot) => dot.classList.remove('active'));
		dots[index].classList.add('active');
	}

	// Call our functions to setup the testimonials and navigation dots
	createSlides();
	createDots();
});
