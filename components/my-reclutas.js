import config from "../config/config.js";
/* import usuarios from "../api/usuarios.js"; */
import {
  GET_USER_ALL,
  POST_USER,
  DELETE_USER,
  PUT_USER,
  SEARCH_USER,
} from "../constants/requestTypes.js";



export default class myTabla extends HTMLElement {
  static url = import.meta.url;


  static async components() {
    return await (await fetch(config.uri(myTabla.url))).text();
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
    let ws = new Worker("../config/ws.js", {
      type: "module",
    });
    let ws2 = new Worker("../config/ws.js", {
      type: "module",
    });
    let ws3 = new Worker("../config/ws.js", {
      type: "module",
    });
    let data = Object.fromEntries(new FormData(e.target));
    const { valor } = e.submitter.dataset;

    if (valor === "get") {
      ws.postMessage({
        type: GET_USER_ALL,
      });
    } else if (valor === "get2"){
      ws2.postMessage({
        type: GET_USER_ALL,
      });
    }
    else if (valor === "get3"){
      ws3.postMessage({
        type: GET_USER_ALL,
      })
    }
    else if (valor === "post") {
      ws.postMessage({
        type: POST_USER,
        arg: data,
     
      });
    } else if (valor === "delete") {
      ws.postMessage({
        type: DELETE_USER,
        arg: data,
      });
    } else if (valor === "put") {
      ws.postMessage({
        type: PUT_USER,
        arg: data,
      });
    }

    ws.addEventListener("message", (e) => {
      this.displayDataInTable(e.data);
      ws.terminate();
    });
    ws2.addEventListener("message", (e) => {
      this.displayDataInTable2(e.data);
      ws2.terminate();
    });
    ws3.addEventListener("message", (e) => {
      this.displayDataInTable3(e.data);
      ws3.terminate();
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
      
      sortedData.forEach((user) => {
        
        const fecha = new Date('2023/03/8');
        const comprobante = fecha.toLocaleDateString();

        const fechaIngreso = new Date(user.fechaIngreso)
        
        const comp = fechaIngreso.toLocaleDateString();
        console.log(comprobante);
        if ((comp <= comprobante && user.fechaIngreso)){

          plantilla += `
              <tr>
                  <th>${user.id}</th>
                  <th>${user.nombre}</th>
                  <th>${user.edad}</th>
                  <th>${user.teléfono}</th>
                  <th>${user.email}</th>
                  <th>${user.dirección}</th>
                  <th>${user.fechaDeNacimiento}</th>
                  <th>${user.documento}</th>
                  <th>${user.fechaIngreso}</th>
                  <th>${user.id_team}</th>
              </tr>  
          `;
        }
      }) 
      tableBody.innerHTML = plantilla;
    } catch (error) {
      console.log(error);
    }
  }

  async displayDataInTable2(data) {
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
      
      sortedData.forEach((user) => { 
         if (user.edad <= 17){
          plantilla += `
              <tr>
                  <th>${user.id}</th>
                  <th>${user.nombre}</th>
                  <th>${user.edad}</th>
                  <th>${user.teléfono}</th>
                  <th>${user.email}</th>
                  <th>${user.dirección}</th>
                  <th>${user.fechaDeNacimiento}</th>
                  <th>${user.documento}</th>
                  <th>${user.fechaIngreso}</th>
                  <th>${user.id_team}</th>
              </tr> 
                  
          `;
         }
      }) 
      tableBody.innerHTML = plantilla;
    } catch (error) {
      console.log(error);
    }
  }

  async displayDataInTable3(data) {
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
      
      sortedData.forEach((user) => {
        
        const fecha = new Date('2023/3/8');
        const comprobante = fecha.toLocaleDateString();

          plantilla += `
              <tr>
                  <th>${user.id}</th>
                  <th>${user.nombre}</th>
                  <th>${user.edad}</th>
                  <th>${user.teléfono}</th>
                  <th>${user.email}</th>
                  <th>${user.dirección}</th>
                  <th>${user.fechaDeNacimiento}</th>
                  <th>${user.documento}</th>
                  <th>${user.fechaIngreso}</th>
                  <th>${user.id_team}</th>
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
    Promise.resolve(myTabla.components()).then((html) => {
      this.shadowRoot.innerHTML = html;
      this.form = this.shadowRoot.querySelector("#myForm");
      this.form.addEventListener("submit", this.handleEvent.bind(this));
    });
  }
 
}
customElements.define(config.name(myTabla.url), myTabla);
