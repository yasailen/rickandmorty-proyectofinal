//obtencion de los documentos a utilizar
const padre = document.getElementById('padre') 
console.log(padre);   
const btnPrev = document.getElementById("btnPrev");
const btnNext = document.getElementById("btnNext");                           
const pagInicial = document.getElementById("inicio");
const pagFinal = document.getElementById("final");
const todos = document.getElementById ("todos")
const hombres = document.getElementById ("hombres")
const mujeres = document.getElementById ("mujeres")
const singenero = document.getElementById("singenero")
const cantPersonajes = document.getElementById("cantPersonajes");
const containerCards = document.getElementById("container-cards");
const cantPaginas = document.getElementById("cantPaginas");
//variables utilizadas

let url = "https://rickandmortyapi.com/api/character";
let datos;
let cards;
let cant;
let filtros = "todos";
const getData = async () => {
    try {
        await fetch(url)
            .then((response) => response.json())
            .then((data) => {
                datos = data.results;
                cantPaginas.innerHTML = `Cantidad de paginas: ${data.info.pages}`;
                mostrarData(datos);
                btnNext.setAttribute("nextPage", data.info.next);
        btnPrev.setAttribute("prevPage", data.info.prev);
            })
            .catch((error) => console.log(error));
   
} catch (error) {
        console.log("Error=> ", error);
    }
};

    getData();
    const mostrarData = (results, filtro) => {
      padre.innerHTML = "";
      let newData;
      if (filtro === "Female") {
        newData = results.filter((pj) => pj.gender === "Female");
      } else if (filtro === "Male") {
        newData = results.filter((pj) => pj.gender === "Male");
      } else if (filtro === "unknown"){
        newData = results.filter((pj) => pj.gender === "unknown");
      }
      else {
        newData = results;
      }
      cant = newData.length;
      cantPersonajes.innerHTML = `Total de Personajes: ${cant}`;
      newData.forEach((element) => {
        cards = `
                <div class="cuadrados"> 
                <img src="${element.image}" />
                <p>Nombre:${element.name}</p>
                <p>Genero: ${element.gender}</p>
                <p>Species: ${element.species}</p>
                <p>Status: ${element.status}</p>
                <p>Origin: ${element.origin.name}</p>
                <p> Location: ${element.location.name}</p>
                <a href"">Ver Mas...</a>
                </div>`;
        padre.innerHTML += cards;
      });
    };
    //BOTONES DE PAGINA
btnNext.addEventListener("click", () => {
    if (btnNext.getAttribute("nextPage") != "null") {
        url = btnNext.getAttribute("nextPage");
        getData();
    }
});
btnPrev.addEventListener("click", () => {
    if (btnPrev.getAttribute("prevPage") !== "null") {
        url = btnPrev.getAttribute("prevPage");
        getData();
    }
});
pagInicial.addEventListener("click", () => {
    url = "https://rickandmortyapi.com/api/character";
    getData();
});
pagFinal.addEventListener("click", () => {
    url = "https://rickandmortyapi.com/api/character?page=42";
    getData();
});
//Fitrado
mujeres.addEventListener("click", () => {
    filtro = "Female";
    mostrarData(datos, filtro);
  });
  hombres.addEventListener("click", () => {
    filtro = "Male";
    mostrarData(datos, filtro);
  });
  todos.addEventListener("click", () => {
    filtro = "Todos";
    mostrarData(datos, filtro);
  });
  singenero.addEventListener("click", () => {
    filtro = "unknown";
    mostrarData(datos, filtro);
  });