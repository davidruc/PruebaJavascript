import config from "../config/config.js";
import {
    GET_TEAM_ALL,
    POST_TEAM,
    DELETE_TEAM,
    PUT_TEAM,
    SEARCH_TEAM,
    POST_TEAM_USUARIO
  } from "../constants/requestTypes.js";
  
  const botonesLocos = [];
  export default class myTeamTable extends HTMLElement {
    static url = import.meta.url;
  
  
    static async components() {
      return await (await fetch(config.uri(myTeamTable.url))).text();
    }
    constructor() {
      super();
      this.attachShadow({
        mode: "open",
      });
      
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
  
    handleEvent(e) {
      e.preventDefault();
      e.type === "submit" ? this.myworker(e) : undefined;
    }

    

    myworker(e) {
      let ws = new Worker("../config/wsTeam.js", {
        type: "module",
      });
      let data = Object.fromEntries(new FormData(e.target));
      const { valor } = e.submitter.dataset;
  
      if (valor === "get") {
        ws.postMessage({
          type: GET_TEAM_ALL,
        });
      } else if (valor === "post") {
        ws.postMessage({
          type: POST_TEAM,
          arg: data,
        });
        
      } else if (valor === "get2"){
        console.log(POST_TEAM_USUARIO);
        ws.postMessage({
          type: POST_TEAM_USUARIO,
        });
      }
      else if (valor === "delete") {
        ws.postMessage({
          type: DELETE_TEAM,
          arg: data,
        });
      } else if (valor === "put") {
        ws.postMessage({
          type: PUT_TEAM,
          arg: data,
        });
      }
  
      ws.addEventListener("message", (e) => {
        this.displayDataInTable(e.data);
        ws.terminate();
      });
  
    }
  
    
    async displayDataInTable(data) {
      try {
        
        await this.content();
        const tableBody = this.shadowRoot.querySelector("#myData");
        const newBtn = this.shadowRoot.querySelector(".otherbtns")
        const sortedData = data.sort((a, b) => a.id - b.id);
        let plantilla = "";
        
        sortedData.map((team) => {
          
          plantilla +=`
              <tr>
                  <th>${team.id}</th>
                  <th>${team.nombre}</th>
                  <th>${team.Trainer_Asociado}</th>
              </tr> 
          `;
          let plantilla2 = new DOMParser().parseFromString( `<input id="especiales${team.id}" type="submit" class="especiales${team.id}" data-valor="get2" value="${team.nombre}">`, "text/html");
          newBtn.append(...plantilla2.body.children); 
        });   
        
        tableBody.innerHTML = plantilla;
      } catch (error) {
        console.log(error);
      }
    }
    
  
    static get observedAttributes() {
      return ["data-accion"];
    }
/*     attributeChangedCallback(name, old, now) {
      console.log(name, old, now);
      console.log(this.dataset.accion);
    } */
    connectedCallback() {
      Promise.resolve(myTeamTable.components()).then((html) => {
        this.shadowRoot.innerHTML = html;
        this.form = this.shadowRoot.querySelector("#myFormData");
        this.form.addEventListener("submit", this.handleEvent.bind(this));
      });
    }
  }
  customElements.define(config.name(myTeamTable.url), myTeamTable);