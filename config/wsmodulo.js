import modulo from "../api/modulo.js";

self.addEventListener("message", (e)=>{
    let res = modulo[`${e.data.type}`]((e.data.arg) ? e.data.arg : undefined);
    Promise.resolve(res).then(res=>postMessage(res));
})