import React from 'react'
import { SendCard } from '../../../components/SendCard'
import { OnRampTransactions } from '../../../components/OnRampTransaction'
import prisma from '@repo/db/client'
import { getServerSession } from 'next-auth'
import { authOptions } from '../../lib/auth'
import { P2PTranx } from '../../../components/P2Ptranx'

const getP2PTransfer = async () => {
    const session = await getServerSession(authOptions)
    const tranx = await prisma.p2pTransfer.findMany({
        where: {
            OR: [
                { toUserId: Number(session?.user?.id) },
                { fromUserId: Number(session?.user?.id) }
            ]
        }
    })
    return tranx.map(t => ({
        amount: t.amount,
        to: t.toUserId,
        got: ((Number(session.user.id) == t.toUserId) ? "+" : "-")
    }))
}

const Page = async () => {
    const tranx = await getP2PTransfer()
    return (
        <div className='w-full flex justify-around items-center px-8'>
            <div className='w-6/12'>
                <SendCard />
            </div>
            {/* <OnRampTransactions transactions={tranx}/> */}
            <div className='w-6/12'>
                <P2PTranx transactions={tranx} />
            </div>
        </div>
    )
}

export default Page
