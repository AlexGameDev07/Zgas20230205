import React from "react";
import ProductosComponent from "./ProductosComponents";
import "./ProductosList.css";

const ProductosList = ({ productos, onEdit, onDelete }) => {
    if (!productos || productos.length === 0) {
        return (
            <div className="productos-list-empty">
                <p>No hay productos registrados.</p>
            </div>
        );
    }

    return (
        <div className="productos-list-container">
            {productos.map((producto) => (
                <ProductosComponent
                    key={producto._id || producto.name}
                    producto={producto}
                    onEdit={onEdit}
                    onDelete={onDelete}
                />
            ))}
        </div>
    );
};

export default ProductosList;