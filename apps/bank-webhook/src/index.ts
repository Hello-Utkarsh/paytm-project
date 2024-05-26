import express from "express";
import db from '@repo/db/index'

const app = express()

app.get('/hdfcwebhook', async (req,res) => {
    const paymentInformation = {
        token: req.body.token,
        userId: req.body.user_identifier,
        amount: req.body.amount
    };
    try {
        await db.$transaction([
            db.balance.updateMany({
                where: {
                    userId: paymentInformation.userId
                },
                data: {
                    amount: {
                        increment: Number(paymentInformation.amount)
                    }
                }
            }),
    
            db.onRampTransaction.updateMany({
                where: {
                    token: paymentInformation.token
                },
                data: {
                  status: "Success"  
                }
            })
        ])
    } catch (error) {
        console.error(error);
        res.status(411).json({
            message: "Error while processing webhook"
        })
    }
})