import { prisma } from '../lib/prisma.js';

import crypto from 'crypto';

const getAllUsers = async (req, res) => {
    try {
        const users = await prisma.user.findMany({
            select: {
                id: true,
                firstName: true,
                lastName: true,
                email: true,
                role: true,
                mobileNumber: true,
                address: true,
                city: true,
                zipCode: true,
                postalCode: true,
                countryCode: true,
                country: true,
                category: true,
                paymentStatus: true,
                transactionId: true,
                token: true,
                createdAt: true,
                updatedAt: true,
            },
        });
        res.json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

const verifyPayment = async (req, res) => {
    try {
        const { userId } = req.body;

        const existingUser = await prisma.user.findUnique({
            where: { id: userId },
            select: { paymentStatus: true }
        });

        if (!existingUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        let newStatus;
        let token = null;

        if (existingUser.paymentStatus === 'VERIFIED') {
            newStatus = 'PENDING';
            // Do NOT clear the token; keep the existing one
            // We do not define 'token' variable here, so it won't be in the update data unless we want to
        } else {
            newStatus = 'VERIFIED';
            // Generate a unique token only if one doesn't exist? Or always regenerate?
            // Assuming we regenerate for a fresh verification
            token = crypto.randomBytes(4).toString('hex').toUpperCase();
        }

        const updateData = { paymentStatus: newStatus };
        if (token) {
            updateData.token = token;
        }

        const user = await prisma.user.update({
            where: { id: userId },
            data: updateData,
        });

        res.json({ message: `Payment status updated to ${newStatus}`, user });


    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

export { getAllUsers, verifyPayment };
