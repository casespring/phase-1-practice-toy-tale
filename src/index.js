let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });

  fetch("http://localhost:3000/toys")
        .then(res => res.json())
        .then(data => {
          console.log(data)
          data.forEach(renderToys);

        let newToyform = document.querySelector(".add-toy-form")
        newToyform.addEventListener("submit", e => {
          e.preventDefault();
          
          let newToynow = {
            name: e.target.name.value,
            image: e.target.image.value,
            likes: 0,
          };
          (fetch("http://localhost:3000/toys", {
            method: "POST",
            headers: {
              "content-Type": "application/json",
              Accept: "application/json"
            },
            body: JSON.stringify({
              name: e.target.name.value,
              image: e.target.image.value,
              likes: 0,
            })
          }))
          .then(res => res.json())
          .then(data => { 
            console.log(data)
          })
          renderToys(newToynow);
        });
      });
  
        
});


function renderToys(toys) {
  let divCollection = document.querySelector("#toy-collection");
  let divCard = document.createElement("div")
  divCard.className = "card";
  let toyName = document.createElement('h2');
  toyName.textContent = toys.name;
  let toyImg = document.createElement('img');
  toyImg.className = "toy-avatar"
  toyImg.src = toys.image;
  let  toyLikes = document.createElement('p');
  toyLikes.textContent = `${toys.likes} Likes`;
  let toyBtn = document.createElement('button');
  toyBtn.textContent = "Like";
  toyBtn.className = "like-btn";
  divCard.append(toyName, toyImg, toyLikes, toyBtn);
  divCollection.appendChild(divCard);
  let counter = toys.likes;

  toyBtn.addEventListener("click", e => {
    counter++ 
    toyLikes.textContent = `${counter} Likes`
    fetch("http://localhost:3000/toys/" + toys.id, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        likes: counter
      })
    })
  })
}

