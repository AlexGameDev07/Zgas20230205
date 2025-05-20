import { useState, useEffect } from "react";

const initialForm = {
    name: "",
    address: "",
    telephone: "",
    schedule: "",
};

export default function useBranches() {
    const [branches, setBranches] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [form, setForm] = useState(initialForm);
    const [editId, setEditId] = useState(null);

    const fetchBranches = () => {
        fetch("http://localhost:4000/api/branches")
            .then(res => res.json())
            .then(data => setBranches(data))
            .catch(() => setBranches([]));
    };

    useEffect(() => {
        fetchBranches();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const handleAddBranch = (e) => {
        e.preventDefault();
        if (editId) {
            fetch(`http://localhost:4000/api/branches/${editId}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            })
                .then(res => res.json())
                .then(() => {
                    fetchBranches();
                    setForm(initialForm);
                    setShowModal(false);
                    setEditId(null);
                });
        } else {
            fetch("http://localhost:4000/api/branches", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            })
                .then(res => res.json())
                .then(() => {
                    fetchBranches();
                    setForm(initialForm);
                    setShowModal(false);
                });
        }
    };

    const handleEdit = (branch) => {
        setForm({
            name: branch.name || "",
            address: branch.address || "",
            telephone: branch.telephone || "",
            schedule: branch.schedule || "",
        });
        setEditId(branch._id);
        setShowModal(true);
    };

    const handleDelete = (branch) => {
        fetch(`http://localhost:4000/api/branches/${branch._id}`, {
            method: "DELETE",
        })
            .then(() => {
                fetchBranches();
            });
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setForm(initialForm);
        setEditId(null);
    };

    return {
        branches,
        showModal,
        form,
        editId,
        setShowModal,
        setEditId,
        setForm,
        handleInputChange,
        handleAddBranch,
        handleEdit,
        handleDelete,
        handleCloseModal,
    };
}