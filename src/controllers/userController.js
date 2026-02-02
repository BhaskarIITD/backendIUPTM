import { prisma } from '../lib/prisma.js';

const updatePayment = async (req, res) => {
    try {
        const { transactionId } = req.body;
        const userId = req.user.id;

        if (!transactionId) {
            return res.status(400).json({ message: 'Transaction ID is required' });
        }

        const user = await prisma.user.update({
            where: { id: userId },
            data: {
                transactionId,
                paymentStatus: 'UPLOADED',
            },
        });

        res.json({ message: 'Payment details uploaded', user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

const getStatus = async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await prisma.user.findUnique({
            where: { id: userId },
            select: {
                paymentStatus: true,
                transactionId: true,
                token: true,
                firstName: true,
                lastName: true,
            },
        });

        res.json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

export { updatePayment, getStatus };
