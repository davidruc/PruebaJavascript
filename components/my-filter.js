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
            let botones = document.querySelector("my-team");
            let botonesShadow = botones.shadowRoot;
            botonesShadow.addEventListener("click", (e)=>{
                if(e.target.classList.contains("especiales1")){
                    
                }
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