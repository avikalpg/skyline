import Razorpay from 'razorpay';

const keyId = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;
const keySecret = process.env.RAZORPAY_KEY_SECRET;

if (!keyId || !keySecret) {
	throw new Error('Razorpay key ID and secret must be provided');
}

const razorpayInstance = new Razorpay({
	key_id: keyId,
	key_secret: keySecret,
});

export default razorpayInstance;