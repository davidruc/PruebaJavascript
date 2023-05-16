import modFilter from "../api/modFilter.js";

self.addEventListener("message", (e)=>{
    let res = modFilter[`${e.data.type}`]((e.data.arg) ? e.data.arg : undefined);
    Promise.resolve(res).then(res=>postMessage(res));
})