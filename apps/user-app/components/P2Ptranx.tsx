import prisma from "@repo/db/client"
import { Card } from "@repo/ui/card"

export const P2PTranx = ({
    transactions
}: {
    transactions: {
        amount: number,
        to: number,
        got: string
        // TODO: Can the type of `status` be more specific?
    }[]
}) => {
    console.log(transactions)
    if (!transactions.length) {
        return <Card title="Recent Transactions">
            <div className="text-center pb-8 pt-8">
                No Recent transactions
            </div>
        </Card>
    }
    return <Card title="Recent Transactions">
        <div className="pt-2">
            {transactions.map(t => <div className="flex justify-between">
                <div>
                    <div className="text-sm flex w-48 justify-between">
                        <p>
                            Received INR
                        </p>
                    </div>
                    <div className="text-slate-600 text-xs">
                        {prisma.user.findFirst({where: {id: t.to}}).then(t => {return t?.name})}
                    </div>
                </div>
                <div className="flex flex-col justify-center">
                    {t.got} Rs {t.amount / 100}
                </div>

            </div>)}
        </div>
    </Card>
}