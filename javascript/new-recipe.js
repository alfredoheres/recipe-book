

const saveNewRecipe = (name, ingredients,instructions,imageURL,imageReference) =>
db.collection("cooking-recipe").doc().set({
    name:name,
    ingredients:ingredients,
    instructions:instructions,
    imageURL:imageURL,
    imageReference:imageReference
});
function regresarAHome () {
    window.location.href = "index.html";
}
document.querySelector("#new-recipe-form").addEventListener(`submit`, (e)=>{
    e.preventDefault();
    let name = document.querySelector(".name-form").value;
    name=name.toUpperCase();
    let ingredients = document.querySelector(".ingredients-form").value;
    let instructions = document.querySelector(".instructions-form").value;
    let image = document.querySelector(".image-form").files[0];
    let imageURL;
    let imageReference=`recipe-images/`+name+`/`+ image.name;

    instructions=instructions.replace(/\n/g, "<br><br>");
    ingredients=ingredients.replace(/\n/g, "<br><br>");

    let uploadImage = storageRef.child(imageReference).put(image);
    uploadImage.on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
    function(snapshot) {
           
    }, function(error) {
        alert("Hubo un error al subir la imagen")
    }, function() {
        // alert("imagen subida correctamente")
          storageRef.child(`recipe-images/`+name+`/`+ image.name).getDownloadURL().then(async function(url) {
            // Insert url into an <img> tag to "download"
            imageURL=url;
            let salvardatos= await saveNewRecipe(name,ingredients,instructions,imageURL,imageReference);
            let reset= await document.querySelector("#new-recipe-form").reset;
            let redireccionar = await regresarAHome();
            // window.location.href = "index.html";
          }).catch(function(error) {
          
           
            switch (error.code) {
              case 'storage/object-not-found':
                // File doesn't exist
                break;
              case 'storage/unauthorized':
                // User doesn't have permission to access the object
                break;
          
              case 'storage/canceled':
                // User canceled the upload
                break;      
              case 'storage/unknown':
                // Unknown error occurred, inspect the server response
                break;
            }
          });
          
    });
    
     

});