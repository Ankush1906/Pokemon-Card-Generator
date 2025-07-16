
const typeColor = {
  bug: "#26de81",
  dragon: "#ffeaa7",
  electric: "#fed330",
  fairy: "#FF0069",
  fighting: "#30336b",
  fire: "#f0932b",
  flying: "#81ecec",
  grass: "#00b894",
  ground: "#EFB549",
  ghost: "#a55eea",
  ice: "#74b9ff",
  normal: "#95afc0",
  poison: "#6c5ce7",
  psychic: "#a29bfe",
  rock: "#2d3436",
  water: "#0190FF",
};

const url = "https://pokeapi.co/api/v2/pokemon/" ;
const card = document.getElementById("card");
const btn = document.querySelector("#btn");


btn.addEventListener("click",getPokeData);
window.addEventListener("load",getPokeData);
async function getPokeData(){
  
   let id = Math.floor(Math.random()*150) +1 ;
    finalUrl = url + id;
    let res = await fetch(finalUrl);
    let data = await res.json();
    await generateCard(data);
}

function generateCard(data){
      
  console.log(data);
   const hp = data.stats[0].base_stat ;
   const imgSrc = data.sprites.other.dream_world.front_default;
   const pokeName = data.name[0].toUpperCase() +data.name.slice(1);
   const attack = data.stats[1].base_stat ;
   const defense = data.stats[2].base_stat ;
   const speed = data.stats[5].base_stat ;

   const themeColor =typeColor[data.types[0].type.name];
   


   card.innerHTML =`
     <p class="hp">
                <span>HP</span>
                ${hp}
            </p>
            <img src=${imgSrc} alt=S>
            <h2 class="poke-name">${pokeName}</h2>
            <div class="types">
            </div>
            <div class="stats">
          <div class>
            <h3>${attack}</h3>
            <p>Attack</p>
          </div>

          <div class>
            <h3>60</h3>
            <p>${defense}</p>
          </div>


          <div class>
            <h3>60</h3>
            <p>${speed}</p>
          </div>
          </div>

   `;
   appendTypes(data.types);
   styleCard(themeColor);
   
}

function appendTypes(types){
  
    console.log(types);
    types.forEach(item => {
        
        let span = document.createElement("SPAN");
        span.textContent = item.type.name ;
        document.querySelector(".types").appendChild(span);
    });

}

function styleCard(color){

    card.style.background = `radial-gradient(circle at 50% 0% , ${color} 36% ,#ffffff 36% )`;
    card.querySelectorAll(".types span").forEach((typeColor) => {
    typeColor.style.backgroundColor = color;
  });
}