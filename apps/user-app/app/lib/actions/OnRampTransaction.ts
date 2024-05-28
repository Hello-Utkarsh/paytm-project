"use server"

import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import prisma from "@repo/db/client";

export default async function (amount: string, bank: string) {
  const session = await getServerSession(authOptions);
  const token = (Math.random() * 1000).toString();
  const tran = await prisma.onRampTransaction.create({
    data: {
      userId: Number(session?.user?.id),
      status: "Processing",
      amount: Number(amount) * 100,
      provider: bank,
      startTime: new Date(),
      token: token,
    },
  });
}
