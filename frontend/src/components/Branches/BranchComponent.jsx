import React from "react";

const BranchComponent = ({ branch, onEdit, onDelete }) => (
    <div className="branch-card">
        <h2>{branch.name}</h2>
        <p><span className="label">Dirección:</span> {branch.address}</p>
        <p><span className="label">Teléfono:</span> {branch.telephone}</p>
        <p><span className="label">Horario:</span> {branch.schedule}</p>
        <div className="actions">
            <button className="btn btn-primary" onClick={() => onEdit(branch)}>Editar</button>
            <button className="btn btn-danger" onClick={() => onDelete(branch)}>Eliminar</button>
        </div>
    </div>
);

export default BranchComponent;