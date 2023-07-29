let headers = new Headers({
    "Content-Type": "application/json"
});
let puerto = 3000;

const postTeamUsuario = async () => {
    let config = {
        method: "GET",
        headers: headers,
    }
    return await (await fetch(`http://localhost:${puerto}/usuarios?_expand=team`, config)).json()
}
export default{
    postTeamUsuario
}