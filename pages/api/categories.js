import { mongooseConnect } from '@/lib/mongoose';
import { Category } from '@/models/Category';

export default async function handle(req, res) {
  const { method } = req;
  await mongooseConnect();

  if (method === 'POST') {
    const { category } = req.body;
    const { category: name, parentCategory } = category;
    const categoryDoc = await Category.create({ name, parent: parentCategory || undefined });
    res.json(categoryDoc);
  }

  if (method === 'GET') {
    res.json(await Category.find().populate('parent'));
  }

  if (method === 'PUT') {
    const { _id, category } = req.body;
    const { category: name, parentCategory } = category;
    const categoryDoc = await Category.updateOne({ _id }, { name, parent: parentCategory || undefined });
    res.json(categoryDoc);
  }
}
