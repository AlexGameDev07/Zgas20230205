import React from "react";
import "./ProductosComponents.css";

const ProductosComponent = ({ producto, onEdit, onDelete }) => {
    return (
        <div className="producto-card">
            <h2>{producto.name}</h2>
            <p>{producto.description}</p>
            <p><span className="label">Precio:</span> ${producto.price}</p>
            <p><span className="label">Stock:</span> {producto.stock}</p>
            <div className="actions">
                <button className="btn btn-primary" onClick={() => onEdit(producto)}>Editar</button>
                <button className="btn btn-danger" onClick={() => onDelete(producto)}>Eliminar</button>
            </div>
        </div>
    );
};

export default ProductosComponent;