import React from "react";
import useBranches from "../hooks/useBranches";
import BranchesList from "../components/Branches/BranchesList";
import "../components/Branches/branchespg.css";
import Modal from "react-modal";

Modal.setAppElement("#root");

const BranchesPg = () => {
    const {
        branches,
        showModal,
        form,
        editId,
        setShowModal,
        handleInputChange,
        handleAddBranch,
        handleEdit,
        handleDelete,
        handleCloseModal,
        setForm,
        setEditId,
    } = useBranches();

    return (
        <>
            <div className="branches-pg">
                <div className="branches-header">
                    <h1>Sucursales</h1>
                    <button
                        className="add-btn"
                        onClick={() => {
                            setShowModal(true);
                            setEditId(null);
                            setForm({
                                name: "",
                                address: "",
                                telephone: "",
                                schedule: "",
                            });
                        }}
                    >
                        + Agregar Sucursal
                    </button>
                </div>
                <BranchesList branches={branches} onEdit={handleEdit} onDelete={handleDelete} />
            </div>
            <Modal
                isOpen={showModal}
                onRequestClose={handleCloseModal}
                className="modal-content"
                overlayClassName="modal-bg"
                closeTimeoutMS={200}
            >
                <h2>{editId ? "Editar Sucursal" : "Agregar Sucursal"}</h2>
                <form className="branch-form" onSubmit={handleAddBranch}>
                    <input
                        type="text"
                        name="name"
                        placeholder="Nombre"
                        value={form.name}
                        onChange={handleInputChange}
                        required
                    />
                    <input
                        type="text"
                        name="address"
                        placeholder="Dirección"
                        value={form.address}
                        onChange={handleInputChange}
                        required
                    />
                    <input
                        type="text"
                        name="telephone"
                        placeholder="Teléfono"
                        value={form.telephone}
                        onChange={handleInputChange}
                        required
                    />
                    <input
                        type="text"
                        name="schedule"
                        placeholder="Horario"
                        value={form.schedule}
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
            </Modal>
        </>
    );
};

export default BranchesPg;