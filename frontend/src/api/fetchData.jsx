import {config} from "../config.jsx";

export async function fetchData({ 
    resource, // ejemplo: 'branches', 'products', etc.
    method = "GET",
    id = null,
    body = null,
    params = ""
}) {
    let url = config.api.API_BASE + resource;
    if (id) url += `/${id}`;
    if (params) url += `?${params}`;

    const options = {
        method, 
        headers: { "Content-Type": "application/json" },
    };

    if (body) options.body = JSON.stringify(body);

    const response = await fetch(url, options);
    if (!response.ok) throw new Error("Error en la petición");
    return await response.json();
}

