const URL = "https://striveschool-api.herokuapp.com/api/product/";
const token =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTczM2YxMGZlMDMxZTAwMTliYTE4NWIiLCJpYXQiOjE3MDIwNTE2MDgsImV4cCI6MTcwMzI2MTIwOH0.vyHk-Oc30EfeJ75c_A4mxJh_cSG9sQpiEuNx58nhfF0";

const fetchData = () => {
  fetch(URL, {
    headers: {
      Authorization: token,
    },
  })
    .then((resp) => {
      if (resp.ok) {
        document.querySelector(".spinner-border").classList.add("d-none");
        return resp.json();
      }
    })
    .then((arrayResponseObj) => {
      arrayResponseObj.forEach((product) => {
        const onlineShop = document.getElementById("shop");
        const cardHtml = `
        <div class="col-12 col-md-6 col-lg-4">
         <div class="card mb-5 shadow";">
         <img src="${product.imageUrl}" class="card-img-top img-fluid rounded" id="imgCard" alt="card_img"/>
         <div class="card-body ">
          <h5 class="card-title">${product.name}</h5>
          <p class="card-text">Prezzo: ${product.price} €</p>
          <p class="card-text">Descrizione: ${product.description}</p>
          <div class="mx-auto">
          <a href="./backoffice.html?id=${product._id}"><button type="button" class="btn btn-success me-2">Modifica</button></a>
          <a class="text-decoration-none text-white" href="./product.html?id=${product._id}"><button type="button" class="btn btn-info">Info</button></a>
         </div>
  </div>
    </div>
  </div>
    `;
        onlineShop.innerHTML += cardHtml;
      });
    })
    .catch((error) => {
      console.log(error);
      document.querySelector(".spinner-border").classList.add("d-none");
    });
};

window.addEventListener("DOMContentLoaded", () => {
  fetchData();
});
// .finally(() => document.querySelector(".spinner-border").classList.add("d-none");)
// posso usare finally invece di ripeterlo 2 volte
