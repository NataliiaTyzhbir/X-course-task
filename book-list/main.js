document.addEventListener('DOMContentLoaded', function () {
  const bookListContainer = document.getElementById('bookListContainer');

  fetch('books.json')
    .then(response => response.json())
    .then(data => {
      data.forEach(book => {
        const bookCard = createBookCard(book);
        bookListContainer.appendChild(bookCard);
      });
    })
  .catch(error => console.error('Error fetching books:', error));
});

function createBookCard(book) {
  const bookCard = document.createElement('div');
  bookCard.classList.add('book-card');

  const image = document.createElement('img');
  image.src = book.image;
  bookCard.appendChild(image);

  const title = document.createElement('h2');
  title.textContent = book.title;
  bookCard.appendChild(title);

  const author = document.createElement('p');
  author.textContent = 'Author: ' + book.author;
  bookCard.appendChild(author);

  const price = document.createElement('p');
  price.classList.add('price');
  price.textContent = 'Price: $' + book.price.toFixed(2);
  bookCard.appendChild(price);

  const description = document.createElement('p');
  description.classList.add('description');
  description.textContent = book.shortDescription;
  bookCard.appendChild(description);

  return bookCard;
}
