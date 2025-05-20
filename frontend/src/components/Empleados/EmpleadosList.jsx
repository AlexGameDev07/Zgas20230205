import React from "react";
import EmpleadosComponent from "./EmpleadosComponent";
import "./EmpleadosList.css";

const EmpleadosList = ({ empleados, onEdit, onDelete }) => {
    if (!empleados || empleados.length === 0) {
        return (
            <div className="empleados-list-empty">
                <p>No hay empleados registrados.</p>
            </div>
        );
    }

    return (
        <div className="empleados-list-container">
            {empleados.map((empleado) => (
                <EmpleadosComponent
                    key={empleado._id || empleado.email}
                    empleado={empleado}
                    onEdit={onEdit}
                    onDelete={onDelete}
                />
            ))}
        </div>
    );
};

export default EmpleadosList;