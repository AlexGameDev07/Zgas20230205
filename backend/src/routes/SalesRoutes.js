import express from 'express';
import salesCtrl from '../controllers/SalesCtrl.js';

const SalesRouter = express.Router();

SalesRouter.route('/')
    .get(salesCtrl.getSales) // Get all sales
    .post(salesCtrl.createSales); // Create a new sale

SalesRouter.route('/category')
    .get(salesCtrl.getSalesByCategory); // Get sales by category

SalesRouter.route('/topProducts')
    .get(salesCtrl.getTopProducts); // Get top products sold

SalesRouter.route('/totalSales')
    .get(salesCtrl.getTotalSales); // Get total sales

SalesRouter.route('/TopCustomers')
    .get(salesCtrl.getTopCustomers); // Get top customers
export default SalesRouter;