"use server"

import { NextResponse } from 'next/server'
import db from '@/db/db'

export async function GET(request: Request) {
  const [activeCount, inactiveCount] = await Promise.all([
    db.product.count({ where: { isAvailableForPurchase: true } }),
    db.product.count({ where: { isAvailableForPurchase: false } }),
  ])

  return NextResponse.json({ activeCount, inactiveCount })
}
