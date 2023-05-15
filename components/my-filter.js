import config from "../config/config.js";
import { POST_TEAM_USUARIO } from "../constants/requestTypes.js";

export default class myfilterTeam extends HTMLElement {
    static url = import.meta.url;
    
    static async components() {
        return await (await fetch(config.uri(myfilterTeam.url))).text();
    }

    constructor(){
        super();
        this.attachShadow({ mode: "open" });
    }

      handleEvent(e){
        this.myWorker(e);
        // e.type === "submit" ? this.myWorker(e) : undefined;
      }
      myWorker(e){
        let ws = new Worker("../config/wsFilterT.js", { type: "module" });
        let data = Object.fromEntries(new FormData(e.target));
        ws.postMessage({ type: POST_TEAM_USUARIO, arg:data });
        ws.addEventListener("message", (e)=> {
            this.fun(e.data)
            ws.terminate();
        })
    }
    
    async fun(data){ 
        try{
            let thead = this.shadowRoot.querySelector("#thead");
            let tbody = this.shadowRoot.querySelector("#myData");
            let botones = document.querySelector("my-team");
            let botonesShadow = botones.shadowRoot;

            botonesShadow.addEventListener("click", (e)=>{
                let plantilla = "";
                let plantillabody = "";
                data.map(val => {
                    if(e.target.classList.contains(`especiales${val.team.id}`)){
                        plantilla = `
                        
                        <tr>
                        <th>TeamId: ${val.team.id}</th>
                        <th>TEAM: ${val.team.nombre}</th>
                        <th>Trainer: ${val.team.Trainer_Asociado}</th>
                        
                        </tr>
                        
                        `;
                        plantillabody += `
                            <tr>
                                <td>id: ${val.id}</td>
                                <td>${val.nombre}</td>
                                <td>edad: ${val.edad}</td>
                            </tr>
                        
                        `
                    } 
                })
                
                thead.innerHTML = plantilla;
                tbody.innerHTML = plantillabody
                })
            

        } catch (error) {
            console.log(error);
        }
    }

    static get observedAttributes() {
        return ["data-accion"];
    }

   connectedCallback(){
    Promise.resolve(myfilterTeam.components()).then((html)=> {
        this.shadowRoot.innerHTML = html;
        this.handleEvent(this);
    })
   }
}
customElements.define(config.name(myfilterTeam.url), myfilterTeam)