let headers = new Headers({
    "Content-Type": "application/json"
});
let puerto = 3000;

const getModulofilterAll = async () => {
    let config = {
        method: "GET",
        headers: headers,
    }
    return await (await fetch(`http://localhost:${puerto}/modulos?_expand=skill`, config)).json()
}
export default{
    getModulofilterAll
}