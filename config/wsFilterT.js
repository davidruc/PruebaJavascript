import teamsFilter from "../api/teamsFilter.js";

self.addEventListener("message", (e)=>{
    let res = teamsFilter[`${e.data.type}`]((e.data.arg) ? e.data.arg : undefined);
    Promise.resolve(res).then(res=>postMessage(res));
})