let headers = new Headers({
    "Content-Type": "application/json"
});
let puerto = 4009;

const postmodulo = async (arg) => {
    arg.id = (arg.id) ? arg.id : Date.now();
    let config = {
        method: "POST",
        headers: headers,
        body: JSON.stringify(arg)
    };
    return await (await fetch(`http://localhost:${puerto}/modulo`, config)).json();
}
const getmoduloAll = async () => {
    let config = {
        method: "GET",
        headers: headers
    };
    return await (await fetch(`http://localhost:${puerto}/modulo`, config)).json();
}
const deltemodulo = async (arg) => {
    let config = {
        method: "DELETE",
        headers: headers,
    };
    return await (await fetch(`http://localhost:${puerto}/modulo/${arg.id}`, config)).json();
}
const putmodulo = async (arg) => {
    let config = {
        method: "PUT",
        headers: headers,
        body: JSON.stringify(arg)
    };
    return await (await fetch(`http://localhost:${puerto}/modulo/${arg.id}`, config)).json();
}
const searchmodulo = async (arg) => {
    const response = await fetch(`http://localhost:${puerto}/modulo`);
    const data = await response.json();

    if (response.ok) {
        const filteredData = data.filter(modulo => modulo.nombre === arg || modulo.id === arg);
        return filteredData;
    } else {
        console.error("Error al obtener los usuarios del servidor.");
        return [];
    }
};
export default {
    postmodulo,
    getmoduloAll,
    deltemodulo,
    putmodulo,
    searchmodulo
}