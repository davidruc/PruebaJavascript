let headers = new Headers({
    "Content-Type": "application/json"
});
let puerto = 4009;

const getEvafilterAll = async () => {
    let config = {
        method: "GET",
        headers: headers,
    }
    return await (await fetch(`http://localhost:${puerto}/evaluaciones?_expand=modulo`, config)).json()
}
export default{
    getEvafilterAll
}