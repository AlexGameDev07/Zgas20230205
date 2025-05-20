import { useState, useEffect } from "react";

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
        fetch("http://localhost:4000/api/employees")
            .then(res => res.json())
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
            fetch(`http://localhost:4000/api/employees/${editId}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            })
                .then(res => res.json())
                .then(() => {
                    fetchEmpleados();
                    setForm(initialForm);
                    setShowModal(false);
                    setEditId(null);
                });
        } else {
            fetch("http://localhost:4000/api/employees", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            })
                .then(res => res.json())
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
        fetch(`http://localhost:4000/api/employees/${empleado._id}`, {
            method: "DELETE",
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