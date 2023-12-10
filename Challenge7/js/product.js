const params = new URLSearchParams(window.location.search);
const id = params.get("id");

window.onload = () => {
  fetch("https://striveschool-api.herokuapp.com/api/product/" + id, {
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTczNTg2YWZlMDMxZTAwMTliYTE5ZTYiLCJpYXQiOjE3MDIwNTgwOTAsImV4cCI6MTcwMzI2NzY5MH0.-2B7sQ972_Ib9wTIAWFneXFbFANdhQ_NRqvF4uJhqdE",
    },
  })
    .then((resp) => resp.json())
    .then((arrayResponseObj) => {
      const { name, imageUrl, brand, description, price, createdAt, updatedAt, _id } = arrayResponseObj;

      const container = document.getElementById("main_container");
      container.innerHTML = `
      <h1 class="display-3 mb-4">${name}</h1>
              <img src="${imageUrl}" alt="cellulare" class="img-fluid mb-5 rounded" id="productImg">
              <p class="mb-4"><strong>Descrizione: </strong>${description}</p>
              <p><strong>Brand: </strong>${brand}</p>
              <h3 class="display-5 text-info mb-4">${price}€</h3>
              <h6 class="bg-light p-3">Server Details</h6>
              <ul class="list-group list-group-flush">
                <li class="list-group-item"><strong>id: </strong>${_id}</li>
                <li class="list-group-item"><strong>createdAt: </strong>${createdAt}</li>
                <li class="list-group-item"><strong>updatedAt: </strong>${updatedAt}</li>
              </ul>
              <button type="button" class="btn btn-success my-5" onclick="modProd()">Modifica prodotto</button>
      `;
    })
    .catch((err) => console.log(err));
};

const modProd = () => {
  window.location.assign("./backoffice.html?id=" + id);
};
