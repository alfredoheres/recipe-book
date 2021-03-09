
function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
    results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

let key=getParameterByName("id");
let imageReference=getParameterByName("imageReference");

let docRef = db.collection("cooking-recipe").doc(key);

docRef.get().then((doc) => {
    if (doc.exists) {
        actualData=doc.data();
        document.querySelector(".name-recipe").innerHTML=actualData.name;
        let actualIngredients=actualData.ingredients;
        actualIngredients=actualIngredients.replace(/<br><br>/g,"\r");
        document.querySelector(".ingredients-form").value=actualIngredients;
        let actualInstructions=actualData.instructions;
        actualInstructions=actualInstructions.replace(/<br><br>/g,"\r");
        document.querySelector(".instructions-form").value=actualInstructions;
        
    } else {
        console.log("No such document!");
    }
}).catch((error) => {
    console.log("Error getting document:", error);
});

document.querySelector("#update-new-recipe").addEventListener(`click`,(e)=>{
    e.preventDefault();

    updatedIngredients=document.querySelector(".ingredients-form").value;
    updatedIngredients=updatedIngredients.replace(/\n/g, "<br><br>");

    updatedInstructions=document.querySelector(".instructions-form").value;
    updatedInstructions=updatedInstructions.replace(/\n/g, "<br><br>");

    docRef.update({
        ingredients:updatedIngredients,
        instructions:updatedInstructions
    })
    .then(()=>{
        window.location.href = "index.html";
    })
    .catch((error)=>{alert("Ha ocurrido un error, intentelo mas tarde")})
});


