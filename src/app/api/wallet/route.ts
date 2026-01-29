/**
 * Wallet API Route
 * GET /api/wallet - Fetch user's wallet and transactions
 */

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { getFullCurrentUser } from '@/lib/auth';

export async function GET(req: NextRequest) {
  try {
    const user = await getFullCurrentUser();

    if (!user) {
      return NextResponse.json(
        { success: false, error: 'غير مصرح' },
        { status: 401 }
      );
    }

    const wallet = await prisma.wallet.findUnique({
      where: { userId: user.id },
      include: {
        Transaction: {
          orderBy: { createdAt: 'desc' },
          take: 50,
        },
      },
    });

    if (!wallet) {
      return NextResponse.json(
        { success: false, error: 'المحفظة غير موجودة' },
        { status: 404 }
      );
    }

    // Calculate summary
    const walletSummary = {
      balance: wallet.balance,
      totalDeposits: wallet.Transaction
        .filter((t: any) => t.type === 'DEPOSIT' && t.status === 'COMPLETED')
        .reduce((sum: number, t: any) => sum + t.amount, 0),
      totalWithdrawals: wallet.Transaction
        .filter((t: any) => t.type === 'WITHDRAW' && t.status === 'COMPLETED')
        .reduce((sum: number, t: any) => sum + t.amount, 0),
      totalInvested: wallet.Transaction
        .filter((t: any) => t.type === 'INVEST' && t.status === 'COMPLETED')
        .reduce((sum: number, t: any) => sum + t.amount, 0),
    };

    const formattedTransactions = wallet.Transaction.map((t: any) => ({
      id: t.id,
      type: t.type,
      amount: t.amount,
      status: t.status,
      description: t.description || '',
      date: t.createdAt.toLocaleDateString('ar-SA'),
      reference: t.reference,
    }));

    return NextResponse.json({
      success: true,
      wallet: walletSummary,
      Transaction: formattedTransactions,
    });
  } catch (error) {
    console.error('Error fetching wallet:', error);
    return NextResponse.json(
      { success: false, error: 'حدث خطأ في جلب المحفظة' },
      { status: 500 }
    );
  }
}
