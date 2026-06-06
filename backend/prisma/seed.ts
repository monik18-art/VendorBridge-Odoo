import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  // Clear existing data
  await prisma.invoices.deleteMany({});
  await prisma.purchase_orders.deleteMany({});
  await prisma.quotations.deleteMany({});
  await prisma.rfqs.deleteMany({});
  await prisma.vendors.deleteMany({});

  // Seed Vendors
  const infra = await prisma.vendors.create({
    data: { name: 'Infra', email: 'contact@infra.com', phone: '123-456-7890' }
  });
  const techCore = await prisma.vendors.create({
    data: { name: 'Tech core', email: 'sales@techcore.io', phone: '987-654-3210' }
  });
  const officeNeed = await prisma.vendors.create({
    data: { name: 'OfficeNeed Co', email: 'support@officeneed.com', phone: '555-0199' }
  });

  // Seed RFQs (12 Active as per mockup)
  for (let i = 1; i <= 12; i++) {
    await prisma.rfqs.create({
      data: {
        title: `RFQ for Material ${i}`,
        status: 'sent',
        vendor_id: (i % 3 === 0) ? officeNeed.id : (i % 2 === 0 ? techCore.id : infra.id)
      }
    });
  }

  // Seed Purchase Orders (as per mockup table)
  await prisma.purchase_orders.createMany({
    data: [
      { po_number: 'Po1', vendor_id: infra.id, amount: 87000, status: 'approved' },
      { po_number: 'Po2', vendor_id: techCore.id, amount: 140000, status: 'pending' },
      { po_number: 'Po3', vendor_id: officeNeed.id, amount: 34900, status: 'draft' },
    ]
  });

  // Seed Overdue Invoices (3 Overdue as per mockup)
  const po1 = await prisma.purchase_orders.findUnique({ where: { po_number: 'Po1' } });
  if (po1) {
    for (let i = 1; i <= 3; i++) {
        await prisma.invoices.create({
          data: {
            invoice_no: `INV-00${i}`,
            po_id: po1.id,
            amount: 15000,
            status: 'overdue',
            due_date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5) // 5 days ago
          }
        });
    }
  }

  console.log('Seed data created successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
