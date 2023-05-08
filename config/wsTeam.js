import teams from "../api/teams.js";

self.addEventListener("message", (e)=>{
    let res = teams[`${e.data.type}`]((e.data.arg) ? e.data.arg : undefined);
    Promise.resolve(res).then(res=>postMessage(res));
})