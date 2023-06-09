import config from "../config/config.js";
import {
    GET_EVALUACION_ALL,
    POST_EVALUACION,
    DELETE_EVALUACION,
    PUT_EVALUACION,
    SEARCH_EVALUACION,
   

  } from "../constants/requestTypes.js";
  

  export default class myevaluacionTable extends HTMLElement {
    static url = import.meta.url;
  
  
    static async components() {
      return await (await fetch(config.uri(myevaluacionTable.url))).text();
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
      let ws = new Worker("../config/wsevaluacion.js", {
        type: "module",
      });
      let data = Object.fromEntries(new FormData(e.target));
      const { valor } = e.submitter.dataset;
  
      if (valor === "get") {
        ws.postMessage({
          type: GET_EVALUACION_ALL,
        });
      }
      else if (valor === "post") {
        ws.postMessage({
          type: POST_EVALUACION,
          arg: data,
        
        });
      } else if (valor === "delete") {
        ws.postMessage({
          type: DELETE_EVALUACION,
          arg: data,
        });
      } else if (valor === "put") {
        ws.postMessage({
          type: PUT_EVALUACION,
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
        if (!Array.isArray(data)) {
          throw new Error(
            "Datos inválidos proporcionados. Se esperaba un array."
          );
        }
        const sortedData = data.sort((a, b) => a.id - b.id);
        let plantilla = "";
        
        sortedData.forEach((val) => {

          plantilla += `
          <tr>
          <th>${val.usuarioId}</th>
          <th>${val.moduloId}</th>
          <th>${val.nota}</th>
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
      Promise.resolve(myevaluacionTable.components()).then((html) => {
        this.shadowRoot.innerHTML = html;
        this.form = this.shadowRoot.querySelector("#myFormData");
        this.form.addEventListener("submit", this.handleEvent.bind(this));
      });
    }
   
  }
  customElements.define(config.name(myevaluacionTable.url), myevaluacionTable);