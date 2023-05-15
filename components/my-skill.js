import config from "../config/config.js";
import {
    GET_SKILL_ALL,
    POST_SKILL,
    DELETE_SKILL,
    PUT_SKILL,
    SEARCH_SKILL,
  } from "../constants/requestTypes.js";
  

  export default class myskillTable extends HTMLElement {
    static url = import.meta.url;
  
  
    static async components() {
      return await (await fetch(config.uri(myskillTable.url))).text();
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
      let ws = new Worker("../config/wsSkill.js", {
        type: "module",
      });
      let data = Object.fromEntries(new FormData(e.target));
      const { valor } = e.submitter.dataset;
  
      if (valor === "get") {
        ws.postMessage({
          type: GET_SKILL_ALL,
        });
      } else if (valor === "post") {
        
  
        ws.postMessage({
          type: POST_SKILL,
          arg: data,
        
        });
      } else if (valor === "delete") {
        ws.postMessage({
          type: DELETE_SKILL,
          arg: data,
        });
      } else if (valor === "put") {
        ws.postMessage({
          type: PUT_SKILL,
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
        console.log("display: ", this.shadowRoot);
        if (!Array.isArray(data)) {
          throw new Error(
            "Datos inválidos proporcionados. Se esperaba un array."
          );
        }
        const sortedData = data.sort((a, b) => a.id - b.id);
        console.log(data);
        let plantilla = "";
        sortedData.forEach((val) => {
          plantilla += `
              <tr>
                  <th>${val.id}</th>
                  <th>${val.nombre}</th>
                 
              </tr> 
                  
          `;
        }) 
        tableBody.innerHTML = plantilla;
      } catch (error) {
        console.log(error);
      }
    }
  
    static get observedAttributes() {
      return ["data-accion"];
    }
    attributeChangedCallback(name, old, now) {
      console.log(name, old, now);
      console.log(this.dataset.accion);
    }
    connectedCallback() {
      Promise.resolve(myskillTable.components()).then((html) => {
        this.shadowRoot.innerHTML = html;
        this.form = this.shadowRoot.querySelector("#myFormData");
        this.form.addEventListener("submit", this.handleEvent.bind(this));
      });
    }
   
  }
  customElements.define(config.name(myskillTable.url), myskillTable);