// Mock payment service
const processPayment = async (order) => {
    // Simulate a payment gateway interaction
    const isSuccess = Math.random() > 0.2; // 80% chance of success
    if (isSuccess) {
        return {
            status: 'success',
            transactionId: `tx_${Math.floor(Math.random() * 1000000)}`,
        };
    } else {
        return {
            status: 'failure',
            error: 'Payment failed due to insufficient funds',
        };
    }
};

module.exports = { processPayment };
