const paramsId = new URLSearchParams(window.location.search).get("id");

const URL = paramsId
  ? "https://striveschool-api.herokuapp.com/api/product/" + paramsId
  : "https://striveschool-api.herokuapp.com/api/product/";
const method = paramsId ? "PUT" : "POST";
const token =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTczM2YxMGZlMDMxZTAwMTliYTE4NWIiLCJpYXQiOjE3MDIwNTE2MDgsImV4cCI6MTcwMzI2MTIwOH0.vyHk-Oc30EfeJ75c_A4mxJh_cSG9sQpiEuNx58nhfF0";

window.addEventListener("DOMContentLoaded", () => {
  const submitBtn = document.querySelector("button[type='submit']");
  const deleteBtn = document.querySelector("button[type='button'].btn-danger");
  const sottotitolo = document.getElementById("sottotitolo");

  if (paramsId) {
    submitBtn.classList.remove("btn-primary");
    submitBtn.classList.add("btn-success");
    submitBtn.innerText = "Modifica Prodotto";
    deleteBtn.classList.remove("d-none");
    sottotitolo.innerText = "Modifica Prodotto";

    caricamento(true);
    fetch(URL, {
      headers: {
        Authorization: token,
      },
    })
      .then((resp) => resp.json())
      .then((arrayResponseObj) => {
        const { name, imageUrl, brand, description, price } = arrayResponseObj;
        document.getElementById("name").value = name;
        document.getElementById("imageUrl").value = imageUrl;
        document.getElementById("description").value = description;
        document.getElementById("brand").value = brand;
        document.getElementById("price").value = price;
      })
      .finally(() => caricamento(false));
  } else {
    sottotitolo.innerText = "Crea Nuovo Prodotto";
  }
});

const handleSubmit = (event) => {
  event.preventDefault();

  const form = event.target;
  const newProduct = {
    name: document.getElementById("name").value,
    imageUrl: document.getElementById("imageUrl").value,
    description: document.getElementById("description").value,
    brand: document.getElementById("brand").value,
    price: document.getElementById("price").value,
  };

  caricamento(true);
  fetch(URL, {
    headers: {
      Authorization: token,
      "Content-type": "Application/json",
    },
    method: method,
    body: JSON.stringify(newProduct),
  })
    .then((resp) => resp.json())
    .then((createdProd) => {
      if (paramsId) {
        notifica("Prodotto con id: " + createdProd._id + " modificata correttamente!", "success");
      } else {
        notifica("Prodotto con id: " + createdProd._id + " creato correttamente!", "primary");
        form.reset();
      }
    })
    .finally(() => caricamento(false));

  console.log(newProduct);
};

const caricamento = (boolean) => {
  if (boolean) {
    document.querySelector(".spinner-border").classList.remove("d-none");
  } else {
    document.querySelector(".spinner-border").classList.add("d-none");
  }
};

const notifica = (message, colorAlert) => {
  const alertContainer = document.getElementById("alert-container");
  alertContainer.innerHTML = `<div class="alert alert-${colorAlert}" role="alert">
  ${message}
</div>`;
  setTimeout(() => {
    alertContainer.innerHTML = "";
  }, 3000);
};

const eliminaProd = () => {
  const confermaCanc = confirm("Confermi l'eliminazione?");

  if (confermaCanc) {
    caricamento(true);
    fetch(URL, {
      headers: {
        Authorization: token,
        "Content-type": "Application/json",
      },
      method: "DELETE",
    })
      .then((resp) => {
        if (resp.ok) {
          return resp.json();
        }
      })
      .then((cancellaProd) => {
        notifica("Eliminazione del prodotto: " + cancellaProd._id + "avvenuta con successo!", "danger");
        setTimeout(() => {
          window.location.assign("./home.html");
        }, 3000);
      })
      .finally(() => {
        caricamento(false);
      });
  }
};
