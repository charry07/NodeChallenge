import { getInStockProducts , getSpecialPrice , listCollections , getUsers } from '../controllers';

export const getControllersRoutes = [
  {
    url: '/api/products',
    method: 'GET',
    handler: getInStockProducts,
  },
  {
    url: '/api/price/:user_id/:nombre_producto',
    method: 'GET',
    handler: getSpecialPrice,
  },
  {
    url: '/api/collections',
    method: 'GET',
    handler: listCollections,
  },
  {
    url:'/api/users',
    method:'GET',
    handler: getUsers,
  }
];
