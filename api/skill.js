let headers = new Headers({
    "Content-Type": "application/json"
});
let puerto = 4009;

const postskill = async (arg) => {

    let config = {
        method: "POST",
        headers: headers,
        body: JSON.stringify(arg)
    };
    return await (await fetch(`http://localhost:${puerto}/skill`, config)).json();
}
const getskillAll = async () => {
    let config = {
        method: "GET",
        headers: headers
    };
    return await (await fetch(`http://localhost:${puerto}/skill`, config)).json();
}
const delteskill = async (arg) => {
    let config = {
        method: "DELETE",
        headers: headers,
    };
    return await (await fetch(`http://localhost:${puerto}/skill/${arg.id_skill}`, config)).json();
}
const putskill = async (arg) => {
    let config = {
        method: "PUT",
        headers: headers,
        body: JSON.stringify(arg)
    };
    return await (await fetch(`http://localhost:${puerto}/skill/${arg.id_skill}`, config)).json();
}
const searchskill = async (arg) => {
    const response = await fetch(`http://localhost:${puerto}/skill`);
    const data = await response.json();

    if (response.ok) {
        const filteredData = data.filter(skill => skill.nombre === arg || skill.id === arg);
        return filteredData;
    } else {
        console.error("Error al obtener los usuarios del servidor.");
        return [];
    }
};
export default {
    postskill,
    getskillAll,
    delteskill,
    putskill,
    searchskill
}