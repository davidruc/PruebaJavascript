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

    _shadowRoot = () => {
        let asyncContent = null;
        let content = null;
        return async (html) => {
          if (content) return content;
          if (!asyncContent) {
            asyncContent = html;
            return null;
          }
          content = await asyncContent;
          return content;
        };
      };

      content = this._shadowRoot();

      handleEvent(e){
0.
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
            console.log(data);
            let delDiv = this.shadowRoot.querySelector("#consultas");
            let botones = document.querySelector("my-team");
            let botonesShadow = botones.shadowRoot;
            botonesShadow.addEventListener("click", (e)=>{

                let plantilla = "";
                data.map(val => {
                    if(e.target.classList.contains(`especiales${val.team.id}`)){
                        console.log(e.target.classList.contains(`especiales${val.id}`));
                        plantilla += `
                        <table id="myTable">
                        <thead>
                            <tr>
                                <th>${val.team.id}</th>
                                <th>${val.team.nombre}</th>
                                <th>${val.team.Trainer_Asociado}</th>
                            
                            </tr>
                        </thead>

                        <tbody id="myData">
                            <tr>
                                <td>${val.id}</td>
                                <td>${val.nombre}</td>
                                
                            </tr>
                        </tbody>
                        </table>
                        `;
                    } 
                })
                
                delDiv.innerHTML = plantilla;
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