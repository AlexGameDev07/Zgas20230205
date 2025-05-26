import { useState, useEffect } from "react";
import { fetchData } from "../api/fetchData";

const initialForm = {
    name: "",
    lastName: "",
    birthday: "",
    email: "",
    address: "",
    hireDate: "",
    password: "",
    telephone: "",
    dui: "",
    isssNumber: "",
    isVerified: false,
};

export default function useEmpleados() {
    const [empleados, setEmpleados] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [form, setForm] = useState(initialForm);
    const [editId, setEditId] = useState(null);

    const fetchEmpleados = () => {
        fetchData({ resource: "employees" })
            .then(data => setEmpleados(data))
            .catch(() => setEmpleados([]));
    };

    
    useEffect(() => {
        fetchEmpleados();
    }, []);

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setForm({ ...form, [name]: type === "checkbox" ? checked : value });
    };

    const handleAddEmpleado = (e) => {
        e.preventDefault();
        if (editId) {
            fetchData({
                resource: "employees",
                method: "PUT",
                id: editId,
                body: form,
            })
                .then(() => {
                    fetchEmpleados();
                    setForm(initialForm);
                    setShowModal(false);
                    setEditId(null);
                });
        } else {
            fetchData({
                resource: "employees",
                method: "POST",
                body: form,
            })
                .then(() => {
                    fetchEmpleados();
                    setForm(initialForm);
                    setShowModal(false);
                });
        }
    };

    const handleEdit = (empleado) => {
        setForm({
            name: empleado.name || "",
            lastName: empleado.lastName || "",
            birthday: empleado.birthday || "",
            email: empleado.email || "",
            address: empleado.address || "",
            hireDate: empleado.hireDate || "",
            password: "", // Por seguridad, no mostrar el password
            telephone: empleado.telephone || "",
            dui: empleado.dui || "",
            isssNumber: empleado.isssNumber || "",
            isVerified: empleado.isVerified || false,
        });
        setEditId(empleado._id);
        setShowModal(true);
    };

    const handleDelete = (empleado) => {
        fetchData({
            resource: "employees",
            method: "DELETE",
            id: empleado._id,
        })
            .then(() => {
                fetchEmpleados();
            });
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setForm(initialForm);
        setEditId(null);
    };

    return {
        empleados,
        showModal,
        form,
        editId,
        setShowModal,
        setEditId,
        setForm,
        handleInputChange,
        handleAddEmpleado,
        handleEdit,
        handleDelete,
        handleCloseModal,
    };
}