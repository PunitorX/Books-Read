function Book(title, author, genre, pages, release, enjoy) {
    this.title = title;
    this.author = author;
    this.genre = genre;
    this.pages = pages;
    this.release = release;
    this.enjoy = enjoy;   
}

// UI Constructor
function UI(){}

// Add book to the list
UI.prototype.addBook = function(book){
    const list = document.getElementById('book-list');
    // Create element
    const row = document.createElement('tr');
    // Insert columns
    row.innerHTML = `<td>${book.title}</td>
                     <td>${book.author}</td> 
                     <td>${book.genre}</td>
                     <td>${book.pages}</td>
                     <td>${book.release}</td>
                     <td>${book.enjoy}</td>
                     <td><a href="#" class="delete">X<a></td>`
                     ;

    list.appendChild(row);
}

// Alert
UI.prototype.showAlert = function(message, className){
    // Create element
    const div = document.createElement('div');
    // Add class
    div.className = `alert ${className}`
    // Add Text
    div.appendChild(document.createTextNode(message));
    // get parent
    const container = document.querySelector('.container');
    // get form
    const form = document.getElementById('book-form');
    // insert alert
    container.insertBefore(div, form) // Inserted INSIDE of the container, but before the div AND form

    // Sets a timeout
    setTimeout(function(){
        document.querySelector('.alert').remove();
    }, 3000);
}

// Delete
UI.prototype.deleteBook = function(target){
    if(target.className === 'delete'){
        target.parentElement.parentElement.remove();
    }
}

// Clear all fields
UI.prototype.clearFields = function(){
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('genre').value = '';
    document.getElementById('pages').value = '';
    document.getElementById('release').value = '';
    document.getElementById('enjoy').value = '';
}

// Event listener for adding a book
document.getElementById('book-form').addEventListener('submit', function(e) {
    // Get form values
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const genre = document.getElementById('genre').value;
    const pages = document.getElementById('pages').value;
    const release = document.getElementById('release').value;
    const enjoy = document.getElementById('enjoy').value;

    // Instantiate book
    const book = new Book(title, author, genre, pages, release, enjoy);

    // Instantiate UI
    const ui = new UI();

    // Validate
    if(title === '' || author === '' || genre === '' || pages === '' || release === '' || enjoy === '' ) {
        // Error
        ui.showAlert('Please fill in all the fields', 'error');
    } else {
        // Add book
        ui.addBook(book);

        // Success!
        ui.showAlert('Book added successfully', 'success');

        // Clear all fields
        ui.clearFields();
    }

    e.preventDefault();
});

// Event listener for delete
document.getElementById('book-list').addEventListener('click', function(e){
    // Instantiate UI
    const ui = new UI();

    // Delete book
    ui.deleteBook(e.target);

    // alert
    ui.showAlert('Book Successfully deleted', 'success');

    e.preventDefault();
});