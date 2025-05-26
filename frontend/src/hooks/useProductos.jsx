import { useState, useEffect } from "react";
import { fetchData } from "../api/fetchData";

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
        fetchData({ resource: "products" })
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
            fetchData({
                resource: "products",
                method: "PUT",
                id: editId,
                body: form,
            })
                .then(() => {
                    fetchProductos();
                    setForm(initialForm);
                    setShowModal(false);
                    setEditId(null);
                });
        } else {
            fetchData({
                resource: "products",
                method: "POST",
                body: form,
            })
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
        fetchData({
            resource: "products",
            method: "DELETE",
            id: producto._id,
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