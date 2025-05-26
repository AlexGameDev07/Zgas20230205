import { useState, useEffect } from "react";
import { fetchData } from "../api/fetchData";

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
        fetchData({ resource: "branches" })
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
            fetchData({
                resource: "branches",
                method: "PUT",
                id: editId,
                body: form,
            })
                .then(() => {
                    fetchBranches();
                    setForm(initialForm);
                    setShowModal(false);
                    setEditId(null);
                });
        } else {
            fetchData({
                resource: "branches",
                method: "POST",
                body: form,
            })
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
        fetchData({
            resource: "branches",
            method: "DELETE",
            id: branch._id,
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