import { mongooseConnect } from '@/lib/mongoose';
import { Category } from '@/models/Category';
import { authOptions, isAdminRequest } from './auth/[...nextauth]';

export default async function handle(req, res) {
  const { method } = req;
  await mongooseConnect();
  await isAdminRequest(req, res);

  if (method === 'POST') {
    const { category, properties } = req.body;
    const { category: name, parentCategory } = category;
    const categoryDoc = await Category.create({ name, properties, parent: parentCategory || undefined });
    res.json(categoryDoc);
  }

  if (method === 'GET') {
    res.json(await Category.find().populate('parent'));
  }

  if (method === 'PUT') {
    const { _id, category, properties } = req.body;
    const { category: name, parentCategory } = category;
    const categoryDoc = await Category.updateOne({ _id }, { name, properties, parent: parentCategory || undefined });
    res.json(categoryDoc);
  }

  if (method === 'DELETE') {
    const { _id } = req.query;
    await Category.deleteOne({ _id });
    res.json(true);
  }
}
