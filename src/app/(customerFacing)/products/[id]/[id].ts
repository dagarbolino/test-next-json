"use server"

import { NextApiRequest, NextApiResponse } from 'next';
import db from '@/db/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  const product = await db.product.findUnique({ where: { id: id as string } });
  res.status(200).json(product);
}
