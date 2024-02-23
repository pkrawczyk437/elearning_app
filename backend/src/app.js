require('dotenv').config();
const storeItems = require('./store/storeItems');
const express = require('express');
const app = express();
const cors = require('cors');
app.use(express.json());
app.use(
	cors({
		origin: 'http://localhost:5500',
	})
);
const stripe = require('stripe')(process.env.STRIPE_KEY);

app.post('/create-checkout-session', async (req, res) => {
	try {
		const session = await stripe.checkout.sessions.create({
			payment_method_types: ['card'],
			mode: 'payment',
			line_items: req.body.items.map((item) => {
				const storeItem = storeItems.get(item.id);
				return {
					price_data: {
						currency: 'usd',
						product_data: {
							name: storeItem.courseName,
							author: storeItem.author,
						},
						unit_amount: storeItem.priceInCents,
					},
					quantity: item.quantity,
				};
			}),
			success_url: `${process.env.CLIENT_URL}/checkoutSuccess.html`,
			cancel_url: `${process.env.CLIENT_URL}/cancelCheckout.html`,
		});
		res.json({ url: session.url });
	} catch (e) {
		res.status(500).json({ error: e.message });
	}
});
app.listen(3000);
