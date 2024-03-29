const NodeCache = require('node-cache');
import { getDb } from '../DB/DBConnection';
//stdTTL: 600s=5min (tiempo de vida del cache), checkperiod: 120s=2min (tiempo de chequeo de expiración de cache)
const cache = new NodeCache({ stdTTL: 600, checkperiod: 120 });

export const getInStockProducts = async (req: any, res: any) => {
  const db = getDb();
  let products = cache.get('inStockProducts');
  if (!products) {
    products = await db.collection('products').find({ inStock: true }).toArray();
    cache.set('inStockProducts', products);
  }
  res.send(products);
};

export const getSpecialPrice = async (req: any, res: any) => {
  const db = getDb();
  const { user_id, nombre_producto } = req.params;
  let specialPrice = cache.get(`specialPrice-${user_id}-${nombre_producto}`);
  if (!specialPrice) {
    const user = await db.collection('users').findOne({ id: Number(user_id) });
    if (user && user.metadata && user.metadata.precios_especiales) {
      specialPrice = user.metadata.precios_especiales.find((precio: any) => precio.nombre_producto === nombre_producto);
      if (specialPrice) {
        cache.set(`specialPrice-${user_id}-${nombre_producto}`, specialPrice);
      } else {
        const product = await db.collection('products').findOne({ name: nombre_producto });
        specialPrice = { price: product.basePrice };
        cache.set(`specialPrice-${user_id}-${nombre_producto}`, specialPrice);
      }
    }
  }
  res.send(specialPrice);
};

export const listCollections = async (req: any, res: any) => {
  const db = getDb();
  const collections = await db.listCollections().toArray();
  res.send(collections.map((collection) => collection.name));
};

export const getUsers = async (req: any, res: any) => {
  const db = getDb();
  const users = await db.collection('users').find().toArray();
  res.send(users);
}
