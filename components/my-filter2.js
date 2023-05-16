import config from "../config/config.js";
import { GET_MODULOFILTER_ALL } from "../constants/requestTypes.js";

export default class myfilterModule extends HTMLElement {
    static url = import.meta.url;
    
    static async components() {
        return await (await fetch(config.uri(myfilterModule.url))).text();
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
        let ws = new Worker("../config/wsFilter2.js", { type: "module" });
        let data = Object.fromEntries(new FormData(e.target));
        ws.postMessage({ type: GET_MODULOFILTER_ALL, arg:data });
        ws.addEventListener("message", (e)=> {
            
            this.fun(e.data)
            ws.terminate();
        })
    }
    
    async fun(data){ 
        try{
            let thead = this.shadowRoot.querySelector("#thead");
            let tbody = this.shadowRoot.querySelector("#myDoc");
            let botones = document.querySelector("my-skill");
            let botonesShadow = botones.shadowRoot;

            botonesShadow.addEventListener("click", (e)=>{
                console.log(data);
                let plantilla = "";
                let plantillabody = "";
                data.map(val => {
                    if(e.target.classList.contains(`especiales${val.skill.id}`)){
                        plantilla = `
                        
                        <tr>
                        <th>Skill id: ${val.skill.id}</th>
                        <th>Módulo: ${val.skill.nombre}</th>
                        
                        
                        </tr>
                        
                        `;
                        plantillabody += `
                            <tr>
                                <td>Módulo id: ${val.id}</td>
                                <td>Tema: ${val.nombre}</td>
                                
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
    Promise.resolve(myfilterModule.components()).then((html)=> {
        this.shadowRoot.innerHTML = html;
        this.handleEvent(this);
    })
   }
}
customElements.define(config.name(myfilterModule.url), myfilterModule)