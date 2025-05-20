import { useState, useEffect } from "react";

const initialForm = {
    name: "",
    description: "",
    price: "",
    stock: "",
};

export default function useProductos() {
    const [productos, setProductos] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [form, setForm] = useState(initialForm);
    const [editId, setEditId] = useState(null);

    const fetchProductos = () => {
        fetch("http://localhost:4000/api/products")
            .then(res => res.json())
            .then(data => setProductos(data))
            .catch(() => setProductos([]));
    };

    useEffect(() => {
        fetchProductos();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const handleAddProduct = (e) => {
        e.preventDefault();
        if (editId) {
            fetch(`http://localhost:4000/api/products/${editId}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            })
                .then(res => res.json())
                .then(() => {
                    fetchProductos();
                    setForm(initialForm);
                    setShowModal(false);
                    setEditId(null);
                });
        } else {
            fetch("http://localhost:4000/api/products", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            })
                .then(res => res.json())
                .then(() => {
                    fetchProductos();
                    setForm(initialForm);
                    setShowModal(false);
                });
        }
    };

    const handleEdit = (producto) => {
        setForm({
            name: producto.name,
            description: producto.description,
            price: producto.price,
            stock: producto.stock,
        });
        setEditId(producto._id);
        setShowModal(true);
    };

    const handleDelete = (producto) => {
        fetch(`http://localhost:4000/api/products/${producto._id}`, {
            method: "DELETE",
        })
            .then(() => {
                fetchProductos();
            });
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setForm(initialForm);
        setEditId(null);
    };

    return {
        productos,
        showModal,
        form,
        editId,
        setShowModal,
        setEditId,
        setForm,
        handleInputChange,
        handleAddProduct,
        handleEdit,
        handleDelete,
        handleCloseModal,
    };
}