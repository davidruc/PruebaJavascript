# Prueba CampusLands Javascript con JSON SERVER

Este proyecto es el frontend de una prueba que contiene unos formularios y que envía la data a un Json SERVER simulando una API.

## Uso:

Para poder utilizar este proyecto hay que iniciarlizar el json server. Para esto abra una terminal y escriba el siguiente comando: 
```bash 
json-server --watch db.json
```

De este modo aparecerá el mensaje de esta librería y el proyecto ya estará disponible para ser utilizado de manera local.

## Se implementó:

Para este proyecto se implementaron diversas cosas: 

* Se implementaron web components para renderizar todo.
* Se utilizaron workers para mejorar el rendimiento del consumo de la api.
* Se utilizó un fetch para consumir la api creada localmente.
* Se creó un archivo de constantes para manejar unos nombres de las funciones exportadas más legibles.

Todos los datos ingresados en el proyecto se van guardando en el json server.


## Despliegue

El front del proyecto se encuentra desplegado en el siguiente link: http://davidruc.github.io/PruebaJavascript/

Sin embargo el json server no funcionará en dicho link, únicamente de forma local, por lo que se recomienda usar el proyecto localmente siempre.

#### Autor: David Rueda. (Davidruc)