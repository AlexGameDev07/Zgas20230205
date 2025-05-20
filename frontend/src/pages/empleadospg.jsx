import React from "react";
import useEmpleados from "../hooks/useEmpleados";
import EmpleadosList from "../components/Empleados/EmpleadosList";
import "../components/Empleados/empleadospg.css";
import Modal from "react-modal";

Modal.setAppElement("#root");

const EmpleadosPg = () => {
    const {
        empleados,
        showModal,
        form,
        editId,
        setShowModal,
        handleInputChange,
        handleAddEmpleado,
        handleEdit,
        handleDelete,
        handleCloseModal,
        setForm,
        setEditId,
    } = useEmpleados();

    return (
        <>
            <div className="empleados-pg">
                <div className="empleados-header">
                    <h1>Empleados</h1>
                    <button
                        className="add-btn"
                        onClick={() => {
                            setShowModal(true);
                            setEditId(null);
                            setForm({
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
                            });
                        }}
                    >
                        + Agregar Empleado
                    </button>
                </div>
                <EmpleadosList empleados={empleados} onEdit={handleEdit} onDelete={handleDelete} />
            </div>
            <Modal
                isOpen={showModal}
                onRequestClose={handleCloseModal}
                className="modal-content"
                overlayClassName="modal-bg"
                closeTimeoutMS={200}
            >
                <h2>{editId ? "Editar Empleado" : "Agregar Empleado"}</h2>
                <form className="empleado-form" onSubmit={handleAddEmpleado}>
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
                        name="lastName"
                        placeholder="Apellido"
                        value={form.lastName}
                        onChange={handleInputChange}
                        required
                    />
                    <input
                        type="date"
                        name="birthday"
                        placeholder="Fecha de nacimiento"
                        value={form.birthday}
                        onChange={handleInputChange}
                        required
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder="Correo"
                        value={form.email}
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
                        type="date"
                        name="hireDate"
                        placeholder="Fecha de contratación"
                        value={form.hireDate}
                        onChange={handleInputChange}
                        required
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Contraseña"
                        value={form.password}
                        onChange={handleInputChange}
                        required={!editId}
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
                        name="dui"
                        placeholder="DUI"
                        value={form.dui}
                        onChange={handleInputChange}
                        required
                    />
                    <input
                        type="text"
                        name="isssNumber"
                        placeholder="Número ISSS"
                        value={form.isssNumber}
                        onChange={handleInputChange}
                        required
                    />
                    <label className="checkbox-label">
                        <input
                            type="checkbox"
                            name="isVerified"
                            checked={form.isVerified}
                            onChange={handleInputChange}
                        />
                        Verificado
                    </label>
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

export default EmpleadosPg;