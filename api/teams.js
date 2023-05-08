let headers = new Headers({
    "Content-Type": "application/json"
});
let puerto = 4009;

const postTeam = async (arg) => {
    arg.id = (arg.id) ? arg.id : "sin ID";
    let config = {
        method: "POST",
        headers: headers,
        body: JSON.stringify(arg)
    };
    return await (await fetch(`http://localhost:${puerto}/Teams`, config)).json();
}

const postTeamUsuario = async (arg) => {
    let config = {
        method: "POST",
        headers: headers,
        body: JSON.stringify(arg)
    }
    return await (await fetch(`http://localhost:${puerto}/usuarios/${arg.id}?_expand=Teams`, config))
}



const getTeamAll = async () => {
    let config = {
        method: "GET",
        headers: headers
    };
    return await (await fetch(`http://localhost:${puerto}/Teams`, config)).json();
}
const delteTeam = async (arg) => {
    let config = {
        method: "DELETE",
        headers: headers,
    };
    return await (await fetch(`http://localhost:${puerto}/Teams/${arg.id}`, config)).json();
}
const putTeam = async (arg) => {
    let config = {
        method: "PUT",
        headers: headers,
        body: JSON.stringify(arg)
    };
    return await (await fetch(`http://localhost:${puerto}/Teams/${arg.id}`, config)).json();
}
const searchTeam = async (arg) => {
    const response = await fetch(`http://localhost:${puerto}/Teams`);
    const data = await response.json();

    if (response.ok) {
        const filteredData = data.filter(Team => Team.nombre === arg || Team.id === arg);
        return filteredData;
    } else {
        console.error("Error al obtener los Teams del servidor.");
        return [];
    }
};
export default {
    postTeam,
    getTeamAll,
    delteTeam,
    putTeam,
    searchTeam
}