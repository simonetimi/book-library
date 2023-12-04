let myLibrary = [
  {
    title: 'The Cloven Viscount',
    author: 'Italo Calvino',
    releaseYear: '1951',
    genre: 'Fantasy',
    read: 'Unread'
  },
];

function Book(title, author, releaseYear, genre, read) {
  this.title = title;
  this.author = author;
  this.releaseYear = releaseYear;
  this.genre = genre;
  this.read = read;
};

// Hide/show form
const showFormButton = document.getElementById('add-book');
showFormButton.addEventListener('click', () => {
  const hiddenForm = document.getElementById('hidden-form');
  hiddenForm.classList.toggle('hide')
});

const container = document.getElementById('books-container');

function renderCards(book, idx) {
 // Construct card content
 const content = `
 <div class="card-container-${idx}">
   <div class="card">
    <div class="content">
      <h4 id="card-book-title">${book.title}</h4>
         <ul id="gen-card">
          <li>Author: ${book.author}</li>
          <li>First publication: ${book.releaseYear}</li>
          <li>Genre: ${book.genre}</li>
          <li id="read-status-${idx}">Status: ${book.read}</li>
        </ul>
      <div class="controls">
        <a id="read-${idx}" href="#"><img id="read-icon" src="images/read.svg"></a>
        <a id="delete-${idx}" href="#"><img src="images/delete.svg"></a>
       </div>
     </div>
 </div>`;
 // Create a new element and set its innerHTML
 const newElement = document.createElement('div');
 newElement.innerHTML = content;
 // Get the delete button and add the event listener
 const deleteButton = newElement.querySelector(`#delete-${idx}`);
 deleteButton.addEventListener('click', () => {
   myLibrary.splice(idx, 1);
   newElement.remove();
 });
 // Get the read button and add the event listener
 const readButton = newElement.querySelector(`#read-${idx}`);
 readButton.addEventListener('click', () => {
   myLibrary[idx].read = myLibrary[idx].read === "Read" ? "Unread" : "Read";
   newElement.querySelector(`#read-status-${idx}`).innerHTML = `Status: ${myLibrary[idx].read}`;
    if (myLibrary[idx].read === 'Read') {
      newElement.querySelector('#read-icon').src='images/unread.svg';
    } else if (myLibrary[idx].read === 'Unread') {
      newElement.querySelector('#read-icon').src='images/read.svg';
    }
 });
 // Append the new element to the container
 container.appendChild(newElement);
};

myLibrary.forEach(renderCards);

const titleForm = document.getElementById('title');
const authorForm = document.getElementById('author');
const releaseForm = document.getElementById('release');
const genreForm = document.getElementById('genre');


const saveButton = document.getElementById('save');
saveButton.addEventListener('click', (event) => {
 const readForm = document.getElementById('read').checked ? 'Read' : 'Unread';
 if (titleForm.value !== '' && authorForm.value !== '' && releaseForm.value !== '' && genreForm.value !== '') {
   myLibrary.push(new Book (titleForm.value, authorForm.value, releaseForm.value, genreForm.value, readForm));
   renderCards(myLibrary[myLibrary.length - 1], myLibrary.length - 1);
 }
});
