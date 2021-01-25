// document.addEventListener("DOMContentLoaded", function () {
    const URL = "http://localhost:3000/books";
    const bookContainer = document.querySelector("#list-panel");
    const bookDisplay = document.querySelector("#show-panel");

const fetchBooks = () => {
  fetch(URL)
    .then((response) => response.json())
    .then((books) => {
      books.forEach((book) => {
        renderBook(book);
      });
    });
};

const renderBook = (book) => {
  const li = document.createElement("li");
  li.innerText = book.title;
  bookContainer.append(li);
  li.addEventListener("click", () => {
    bookDisplay.innerHTML = "";
    const img = document.createElement("IMG");
    img.setAttribute("src", book.img_url);
    const h2a = document.createElement("h2");
    h2a.innerText = book.title;
    const h2b = document.createElement("h2");
    h2b.innerText = book.subtitle;
    const h2c = document.createElement("h2");
    h2c.innerText = book.author;
    const p = document.createElement("p");
    p.innerText = book.description;
    const ul = document.createElement("ul");
    for (let el of book.users) {
      const li = document.createElement("li");
      li.innerText = el.username;
      ul.appendChild(li);
    }

    const btn = document.createElement("button");
    btn.addEventListener("click", () => {
        let arr = book.users
        arr.push({"id":1, "username":"pouros"})
        // debugger
      const data = { users: arr };

      fetch(URL+"/"+book.id, {
        method: "PATCH", // or 'PUT'
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((response) => response.json())
        .then((data) => {
            let newName = data.users[data.users.length-1].username
            const li = document.createElement("li");
            li.innerText = newName;
            ul.appendChild(li);
            
        })
    });
    btn.innerText = "LIKE";
    bookDisplay.append(img, h2a, h2b, h2c, p, ul, btn);
    // debugger
  });
};

fetchBooks();

// });
