import evaFilter from "../api/evaFilter.js";

self.addEventListener("message", (e)=>{
    let res = evaFilter[`${e.data.type}`]((e.data.arg) ? e.data.arg : undefined);
    Promise.resolve(res).then(res=>postMessage(res));
})