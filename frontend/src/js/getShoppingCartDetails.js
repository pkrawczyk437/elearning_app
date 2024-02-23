const checkoutButton = document.querySelector('.shopping-cart .button');

const getShoppingCartDetails = () => {
	const itemElements = [
		...document.querySelectorAll('.shopping-cart .items .item'),
	];

	// Use map to transform array of item elements into an array of details objects
	const cartItemsDetails = itemElements.map((itemElement) => {
		const courseName = itemElement.querySelector('.course-name').textContent;
		const author = itemElement.querySelector('.author').textContent;
		const priceText = itemElement.querySelector('.price').textContent;
		const priceInCents = parseFloat(priceText.replace('$', '')) * 100;
		return { id: 1, priceInCents, courseName, author, quantity: 1 };
	});

	return cartItemsDetails;
};

// Function to handle the checkout process
const handleCheckout = () => {
	// const cartItems = getShoppingCartDetails();
	fetch('http://localhost:3000/create-checkout-sessionr', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			items: [
				{ id: 1, quantity: 1 },
				{ id: 2, quantity: 1 },
			],
		}),
	})
		.then((res) => {
			if (res.ok) return res.json();
			return res.json().then((json) => Promise.reject(json));
		})
		.then(({ url }) => {
			window.location = url;
		})
		.catch((e) => {
			console.error(e.error);
		});
};

checkoutButton.addEventListener('click', handleCheckout);
