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
        })
});


function renderToys(toys) {
  let divCollection = document.querySelector("#toy-collection");
  let toyName = document.createElement('h2');
  toyName.textContent = toys.name;
  let toyImg = document.createElement('img');
  toyImg.src = toys.image;
  let  toyLikes = document.createElement('p');
  toyLikes.textContent = `${toys.likes} Likes`;
  let toyBtn = document.createElement('button');
  toyBtn.className

}