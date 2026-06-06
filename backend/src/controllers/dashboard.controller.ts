import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getDashboardSummary = async (req: Request, res: Response) => {
  try {
    const activeRfqsCount = await prisma.rfqs.count({
      where: { status: 'sent' }
    });

    const pendingApprovalsCount = await prisma.purchase_orders.count({
      where: { status: 'pending' }
    });

    const overdueInvoicesCount = await prisma.invoices.count({
      where: { status: 'overdue' }
    });

    // POs this month
    const startOfMonth = new Date();
    startOfMonth.setDate(1);
    startOfMonth.setHours(0, 0, 0, 0);

    const posThisMonth = await prisma.purchase_orders.aggregate({
      where: {
        created_at: { gte: startOfMonth }
      },
      _sum: { amount: true }
    });

    const recentPOs = await prisma.purchase_orders.findMany({
      take: 5,
      orderBy: { created_at: 'desc' },
      include: { vendor: true }
    });

    res.json({
      summary: {
        activeRfqs: activeRfqsCount,
        pendingApprovals: pendingApprovalsCount,
        overdueInvoices: overdueInvoicesCount,
        posTotalAmount: posThisMonth._sum.amount || 0
      },
      recentPOs: recentPOs.map(po => ({
        id: po.po_number,
        vendor: po.vendor.name,
        amount: po.amount,
        status: po.status
      }))
    });
  } catch (error) {
    console.error('Dashboard Error:', error);
    res.status(500).json({ error: 'Failed to fetch dashboard summary' });
  }
};
