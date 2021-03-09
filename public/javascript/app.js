
const loggedOutLinks = document.querySelectorAll(".logged-out");
const loggedInLinks = document.querySelectorAll(".logged-in");
let admin=document.querySelectorAll(".admin");
const loginCheck = user => {
    if (user){
        loggedInLinks.forEach(link=>link.style.display="block");
        loggedOutLinks.forEach(link=>link.style.display="none");
        admin.forEach(element=>element.style.display="block");
    }
    else{
        loggedInLinks.forEach(link=>link.style.display="none");
        loggedOutLinks.forEach(link=>link.style.display="block");
        admin.forEach(element=>element.style.display="none");
    }
}



// ------------------------------ REGISTER A USER------------------------------------
document.querySelector("#signup-form").addEventListener(`submit`, (e)=>{
    e.preventDefault();

    let email=document.querySelector("#signup-email").value;
    let password=document.querySelector("#signup-password").value;

    auth
        .createUserWithEmailAndPassword(email,password)
        .then(userCredential=>{
            document.querySelector("#signup-form").reset;

            $(`#signupModal`).modal(`hide`);
            
        })
        .catch(error=>{
            alert(error.message);
            
        })

});

//------------------------------- AUTH USER------------------------------------------
document.querySelector("#login-form").addEventListener(`submit`, (e)=>{
    e.preventDefault();

    let email=document.querySelector("#login-email").value;
    let password=document.querySelector("#login-password").value;
    
    auth
        .signInWithEmailAndPassword(email,password)
        .then(userCredential=>{
            document.querySelector("#login-form").reset;
            
        })
        .catch(error=>{
            alert(error);
            
        })
});

document.querySelector("#logout").addEventListener(`click`, (e)=> {
    e.preventDefault();
    auth.signOut().then(()=>{
        
    })
});
//------------------------------- GOOGLE AUTH USER------------------------------------------
document.querySelector("#googleLogin").addEventListener(`click`,(e)=>{
     e.preventDefault();

    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider)
    .then(result => {
        
    })
    .catch(err => {
        console.log(err);
    })
});



auth.onAuthStateChanged(user =>{
    if (user) {
        
        loginCheck(user);
        $(`#signinModal`).modal(`hide`);
      }
    else{
       
        loginCheck(user);
    }
});


const recipesContainer = document.getElementById("recipes-container");


const onGetRecipe = (callback) => db.collection("cooking-recipe").onSnapshot(callback);


window.addEventListener("DOMContentLoaded", async (e) => {

    await onGetRecipe((querySnapshot) => {
        recipesContainer.innerHTML = "";
        let datosLength=querySnapshot.docs.length;
        
        let textHTML=[""];
        let counter=1;
        let counter2=0;
        let counter3=1;
        querySnapshot.forEach((doc) => {
            const recipe = doc.data();
            
            textHTML[counter2]+=`<div class="col-sm container-card p-0 m-2"><a href="recipe.html?id=${doc.id}">
                <img src="${recipe.imageURL}" class="card-img-top" alt="..."></a>
                <button type="button" class="btn btn-danger admin delete" imagereference="${recipe.imageReference}" docid="${doc.id}" style="display:none;">Borrar</button>
                <a href="update-recipe.html?id=${doc.id}&imageReference=${recipe.imageReference}"><button type="button" class="btn btn-primary admin edit" style="display:none;">Editar</button></a>
                <div class="card-body"><a href="recipe.html?id=${doc.id}" id="card-text">${recipe.name}</a></div>
                </div>`;

            if(counter===3){
                
                textHTML[counter2]=`<div class="row">${textHTML[counter2]}</div>`;
                textHTML[counter2+1]="";
                counter2=counter2+1;
                counter=0;
            }
            else{
                if(counter3===datosLength){
                    textHTML[counter2]=`<div class="row">${textHTML[counter2]}</div>`;
                }            
            }
            counter=counter+1;
            counter3=counter3+1;
        });
        for(let i=0;i<textHTML.length;i++){
            
            recipesContainer.innerHTML +=textHTML[i];
        }
        admin=document.querySelectorAll(".admin");
        
        if(document.querySelector(".new-recipe").getAttribute("style")==="display: none;"){
            admin.forEach(element=>element.style.display="none");
           
        }
        else if(document.querySelector(".new-recipe").getAttribute("style")==="display: block;"){
            admin.forEach(element=>element.style.display="block");
           
        }

        document.querySelectorAll(".delete").forEach(element=>{
            element.addEventListener(`click`,()=>{
                
                borrar(element.getAttribute("docid"),element.getAttribute("imagereference"))
                
        
            });
        });
    });
    
});


function borrar(docid,imagereference){
    
    //Borrar imagen
    let imgReference = storageRef.child(imagereference);
    imgReference.delete().then(function() {
    }).catch(function(error) {
        console.log(error);
    });

    //Borrar datos
    db.collection("cooking-recipe").doc(docid).delete().then(() => {
        
    }).catch((error) => {
        console.error("Error removing document: ", error);
    });


} 

const deleteTask = (id) => db.collection("tasks").doc(id).delete();







