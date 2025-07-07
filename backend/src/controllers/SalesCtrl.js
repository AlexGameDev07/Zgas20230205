import SalesMdl from '../models/SalesMdl.js';
const salesCtrl = {};

//Select
salesCtrl.getSales = async (req, res) => {
    try {
        const sales = await SalesMdl.find();
        res.status(200).json(sales);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

//Insert
salesCtrl.createSales = async (req, res) => {
    try {
        const { product, category, customer, total } = req.body;
        if (!product || !category || !customer || !total) {
            return res.status(400).json({ message: 'All fields are required' });
        }
        if (typeof total !== 'number' || total < 0) {
            return res.status(400).json({ message: 'Total must be a positive number' });
        }
        const newSale = new SalesMdl({
            product,
            category,
            customer,
            total
        });
        await newSale.save();
        res.status(201).json(newSale);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

/*  =================================================
    *Ventas de cada categoría*
    =================================================*/

salesCtrl.getSalesByCategory = async (req, res) => {
    try {
        const resultado = await SalesMdl.aggregate([
            {
                $group: {
                    _id: '$category',
                    totalSales: { $sum: '$total' },
                    count: { $sum: 1 }
                }
            }
            //ordenar
            , {
                $sort: { totalSales: -1 }
            }
        ]);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}

//Productos más vendidos
salesCtrl.getTopProducts = async (req, res) => {
    try {
        const resultado = await SalesMdl.aggregate([
            {
                $group: {
                    _id: '$product',
                    totalSales: { $sum: 1 }
                }
            },
            {
                $sort: { totalSales: -1 }
            },
            {
                $limit: 3
            }
        ]);
        res.status(200).json(resultado);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

//Ganancias totales
salesCtrl.getTotalSales = async (req, res) => {
    try {
        const resultado = await SalesMdl.aggregate([
            {
                $group: {
                    _id: null,
                    totalSales: { $sum: '$total' }
                }
            }
        ]);
        res.status(200).json(resultado[0]);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export default salesCtrl;