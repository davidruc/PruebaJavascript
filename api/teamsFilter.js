let headers = new Headers({
    "Content-Type": "application/json"
});
let puerto = 4009;

const postTeamUsuario = async () => {
    let config = {
        method: "GET",
        headers: headers,
    }
    /* intenté de 10000 formas como enlazar los datos y no pude http://localhost:4009/teams?_ */
    return await (await fetch(`http://localhost:${puerto}/teams?_embed=usuarios`, config)).json()
}
export default{
    postTeamUsuario
}