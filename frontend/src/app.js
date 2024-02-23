const faqList = document.querySelector('.faq-list');

const toggleFaqItem = (faqItem, questionButton, answerContainer) => {
	const isActive = faqItem.classList.contains('active');
	faqItem.classList.toggle('active', !isActive);
	questionButton.setAttribute('aria-expanded', !isActive);
	answerContainer.setAttribute('aria-hidden', isActive);
};

faqList.addEventListener('click', (event) => {
	const questionButton = event.target.closest('.faq-question');
	if (questionButton) {
		const faqItem = questionButton.closest('.faq-item');
		const answerContainer = questionButton.nextElementSibling;
		toggleFaqItem(faqItem, questionButton, answerContainer);
	}
});


