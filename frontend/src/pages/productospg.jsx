import React from "react";
import ProductosList from "../components/Productos/ProductosList";
import useProductos from "../hooks/useProductos";
import "../components/Productos/productospg.css";

const ProductosPg = () => {
    const {
        productos,
        showModal,
        form,
        editId,
        setShowModal,
        handleInputChange,
        handleAddProduct,
        handleEdit,
        handleDelete,
        handleCloseModal,
        setForm,
        setEditId,
    } = useProductos();

    return (
        <div className="productos-pg">
            <div className="productos-header">
                <h1>Productos</h1>
                <button
                    className="add-btn"
                    onClick={() => {
                        setShowModal(true);
                        setEditId(null);
                        setForm({
                            name: "",
                            description: "",
                            price: "",
                            stock: "",
                        });
                    }}
                >
                    + Agregar Producto
                </button>
            </div>
            <ProductosList productos={productos} onEdit={handleEdit} onDelete={handleDelete} />

            {showModal && (
                <div className="modal-bg">
                    <div className="modal-content">
                        <h2>{editId ? "Editar Producto" : "Agregar Producto"}</h2>
                        <form className="product-form" onSubmit={handleAddProduct}>
                            <input
                                type="text"
                                name="name"
                                placeholder="Nombre del producto"
                                value={form.name}
                                onChange={handleInputChange}
                                required
                            />
                            <textarea
                                name="description"
                                placeholder="Descripción"
                                value={form.description}
                                onChange={handleInputChange}
                                required
                            ></textarea>
                            <input
                                type="number"
                                name="price"
                                placeholder="Precio"
                                value={form.price}
                                onChange={handleInputChange}
                                required
                            />
                            <input
                                type="number"
                                name="stock"
                                placeholder="Stock"
                                value={form.stock}
                                onChange={handleInputChange}
                                required
                            />
                            <div className="modal-actions">
                                <button type="submit" className="submit-btn">
                                    {editId ? "Actualizar" : "Guardar"}
                                </button>
                                <button type="button" className="cancel-btn" onClick={handleCloseModal}>
                                    Cancelar
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProductosPg;