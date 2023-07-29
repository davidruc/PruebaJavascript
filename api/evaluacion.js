let headers = new Headers({
    "Content-Type": "application/json"
});
let puerto = 3000;

const postevaluacion = async (arg) => {
    
    let config = {
        method: "POST",
        headers: headers,
        body: JSON.stringify(arg)
    };
    return await (await fetch(`http://localhost:${puerto}/evaluaciones`, config)).json();
}
const getevaluacionAll = async () => {
    let config = {
        method: "GET",
        headers: headers
    };
    return await (await fetch(`http://localhost:${puerto}/evaluaciones`, config)).json();
}
const delteevaluacion = async (arg) => {
    let config = {
        method: "DELETE",
        headers: headers,
    };
    return await (await fetch(`http://localhost:${puerto}/evaluaciones/${arg.id}`, config)).json();
}
const putevaluacion = async (arg) => {
    let config = {
        method: "PUT",
        headers: headers,
        body: JSON.stringify(arg)
    };
    return await (await fetch(`http://localhost:${puerto}/evaluaciones/${arg.id}`, config)).json();
}
const searchevaluacion = async (arg) => {
    const response = await fetch(`http://localhost:${puerto}/evaluaciones`);
    const data = await response.json();

    if (response.ok) {
        const filteredData = data.filter(evaluacion => evaluacion.nombre === arg || evaluacion.id === arg);
        return filteredData;
    } else {
        console.error("Error al obtener los usuarios del servidor.");
        return [];
    }
};


export default {
    postevaluacion,
    getevaluacionAll,
    delteevaluacion,
    putevaluacion,
    searchevaluacion,
    
}