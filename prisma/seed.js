import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
import { hashPassword } from '../src/modules/auth.js'

async function main() {
  const role1 = await prisma.roles.upsert({
    where: { id: 1 },
    update: { role: 'Admin' },
    create: {
      role: 'Admin'
    }
  })

  const role2 = await prisma.roles.upsert({
    where: { id: 2 },
    update: { role: 'Attendant' },
    create: {
      role: 'Attendant'
    }
  })

  await prisma.roles.upsert({
    where: { id: 3 },
    update: { role: 'Customer' },
    create: {
      role: 'Customer'
    }
  })

  const passwordHash = await hashPassword('admin123');
  const users = await prisma.users.upsert({
    where: {
      email: 'admin@sweetinspiration.com'
    },
    update: {},
    create: {
      email: 'admin@sweetinspiration.com',
      name: 'Admin',
      password: passwordHash,
      username: 'adm001',
      role_id: 1
    }
  })

  const discountTypes = await prisma.discount_types.upsert({
    where: { id: 1 },
    update: {},
    create: {
      type: 'Generic'
    }
  })

  await prisma.discount_types.upsert({
    where: { id: 2 },
    update: {},
    create: {
      type: 'Percentage'
    }
  })

  const orderType1 = await prisma.order_types.upsert({
    where: { id: 1 },
    update: { type: 'Dine In' },
    create: {
      type: 'Dine In'
    }
  })

  const orderType2 = await prisma.order_types.upsert({
    where: { id: 2 },
    update: { type: 'Takeaway' },
    create: {
      type: 'Takeaway'
    }
  })

  const orderType3 = await prisma.order_types.upsert({
    where: { id: 3 },
    update: { type: 'Dine In and Takeaway' },
    create: {
      type: 'Dine In and Takeaway'
    }
  })

  const paymentGateway1 = await prisma.payment_gateways.upsert({
    where: { id: 1 },
    update: {},
    create: {
      gateway: 'Tyro'
    }
  })

  const paymentGateway2 = await prisma.payment_gateways.upsert({
    where: { id: 2 },
    update: {},
    create: {
      gateway: 'SmartPay'
    }
  })

  const paymentMethod1 = await prisma.payment_methods.upsert({
    where: { id: 1 },
    update: { method: 'Cash', created_by: users.id },
    create: { method: 'Cash', created_by: users.id }
  })

  const paymentMethod2 = await prisma.payment_methods.upsert({
    where: { id: 2 },
    update: { method: 'Card', created_by: users.id },
    create: { method: 'Card', created_by: users.id }
  })

  const quantityUnits = await prisma.quantity_units.upsert({
    where: { id: 1 },
    update: {},
    create: {
      unit: 'Unit'
    }
  })

  const refundType1 = await prisma.refund_types.upsert({
    where: { id: 1 },
    update: { type: 'Cash' },
    create: { type: 'Cash' }
  })

  const refundType2 = await prisma.refund_types.upsert({
    where: { id: 2 },
    update: { type: 'Card' },
    create: { type: 'Card' }
  })

  const restaurant = await prisma.restaurants.upsert({
    where: { id: 1 },
    update: {
      name: 'SweetInspirtion',
      order_types: { connect: { id: orderType3.id } },
      users_restaurants_owner_idTousers: { connect: { id: users.id } },
      users_restaurants_created_byTousers: { connect: { id: users.id } }
    },
    create: {
      name: 'Green Oak Burger',
      restaurant_unique_id: '4f2812da-208b-48ef-8ca4-759e6e228262',
      order_types: { connect: { id: orderType3.id } },
      users_restaurants_owner_idTousers: { connect: { id: users.id } },
      users_restaurants_created_byTousers: { connect: { id: users.id } }
    }
  })

}
main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })