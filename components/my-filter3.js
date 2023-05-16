import config from "../config/config.js";
import { GET_EVAFILTER_ALL } from "../constants/requestTypes.js";

export default class myfilterEva extends HTMLElement {
    static url = import.meta.url;
    
    static async components() {
        return await (await fetch(config.uri(myfilterEva.url))).text();
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
        let ws = new Worker("../config/wsFilter3.js", { type: "module" });
        let data = Object.fromEntries(new FormData(e.target));
        ws.postMessage({ type: GET_EVAFILTER_ALL, arg:data });
        ws.addEventListener("message", (e)=> {
            
            this.fun(e.data)
            ws.terminate();
        })
    }
    
    async fun(data){ 
        try{
            let thead = this.shadowRoot.querySelector("#thead");
            let tbody = this.shadowRoot.querySelector("#myDoc");
            let botones = document.querySelector("my-modulo");
            let botonesShadow = botones.shadowRoot;

            botonesShadow.addEventListener("click", (e)=>{
                console.log(data);
                let plantilla = "";
                let plantillabody = "";
                
                data.map(val => {
                    console.log(val);
                    if(e.target.classList.contains(`especiales${val.modulo.id}`)){
                        plantilla = `
                        
                        <tr>
                        <th>Skill id: ${val.modulo.skillId}</th>
                        <th>Módulo: ${val.modulo.nombre}</th>
                        
                        
                        </tr>
                        
                        `;
                        if (val.nota <= 70){
                            plantillabody += `
                                <tr>
                                    <td>Estudiante id: ${val.usuarioId}</td>
                                    <td>Nota: ${val.nota}</td>
                                    
                                </tr>
                            
                        
                        `
                        }
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
    Promise.resolve(myfilterEva.components()).then((html)=> {
        this.shadowRoot.innerHTML = html;
        this.handleEvent(this);
    })
   }
}
customElements.define(config.name(myfilterEva.url), myfilterEva)