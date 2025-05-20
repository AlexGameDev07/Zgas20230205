import React from "react";

const EmpleadosComponent = ({ empleado, onEdit, onDelete }) => (
    <div className="empleado-card">
        <h2>{empleado.name} {empleado.lastName}</h2>
        <p><span className="label">Correo:</span> {empleado.email}</p>
        <p><span className="label">DUI:</span> {empleado.dui}</p>
        <p><span className="label">Teléfono:</span> {empleado.telephone}</p>
        <p><span className="label">Dirección:</span> {empleado.address}</p>
        <p><span className="label">Fecha de nacimiento:</span> {empleado.birthday}</p>
        <p><span className="label">Fecha de contratación:</span> {empleado.hireDate}</p>
        <p><span className="label">ISSS:</span> {empleado.isssNumber}</p>
        <p><span className="label">Verificado:</span> {empleado.isVerified ? "Sí" : "No"}</p>
        <div className="actions">
            <button className="btn btn-primary" onClick={() => onEdit(empleado)}>Editar</button>
            <button className="btn btn-danger" onClick={() => onDelete(empleado)}>Eliminar</button>
        </div>
    </div>
);

export default EmpleadosComponent;