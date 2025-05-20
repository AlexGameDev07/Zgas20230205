import React from "react";
import BranchComponent from "./BranchComponent";
import "./branchespg.css";

const BranchesList = ({ branches, onEdit, onDelete }) => {
    if (!branches || branches.length === 0) {
        return (
            <div className="branches-list-empty">
                <p>No hay sucursales registradas.</p>
            </div>
        );
    }

    return (
        <div className="branches-list-container">
            {branches.map((branch) => (
                <BranchComponent
                    key={branch._id || branch.name}
                    branch={branch}
                    onEdit={onEdit}
                    onDelete={onDelete}
                />
            ))}
        </div>
    );
};

export default BranchesList;