
function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
    results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}
let searchID = getParameterByName("id");
console.log(searchID);


const getTask = (searchID) => db.collection("cooking-recipe").doc(searchID).get();

window.addEventListener("DOMContentLoaded", async (e) =>{

    let doc= await getTask(searchID);
    recipe=doc.data();
    console.log(recipe.name);

    document.getElementById("container-recipe").innerHTML=`
    <div id="title">
        <h1>${recipe.name}</h1>
    </div>
    <div class="container col-12" id="container-info">
        <div class="container-1 p-2">
            <div>
                <h3>Ingredientes</h3>
                <p>${recipe.ingredients}</p>
            </div>
        </div>
        <div class="container-2 p-2">
            <div>
                <img src="${recipe.imageURL}" class="card-img-top" alt="...">
            </div>
            <h3>Modo de preparación</h3>
            <p>${recipe.instructions}</p>
        </div>
    </div>`;
    
});






