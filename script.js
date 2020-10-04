// constructor book
function Book(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn
}

// ui constructor
function UI() { }

UI.prototype.addBookToList = function (book) {
    const list = document.getElementById('book-list');
    const row = document.createElement('tr');
    row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a href='#' class='delete'>X</a></td>
    `;
    list.appendChild(row);
}
UI.prototype.clearFields = function () {
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('isbn').value = '';
}
UI.prototype.showAlert = function(message,clasName){
    const div = document.createElement('div');
    div.className = `alert ${clasName}`
    div.appendChild(document.createTextNode(message));
    const container = document.querySelector('.container');
    const form = document.querySelector('#book-form');
    container.insertBefore(div , form);
    setTimeout(function(){
        document.querySelector(".alert").remove();
    }, 3000);
}
UI.prototype.deleteBook = function(target){
    if(target.className === 'delete'){
        target.parentElement.parentElement.remove();
        new UI().showAlert('Berhasil dihapus', 'success');
    }
}

// event listener add
document.getElementById('book-form').addEventListener('submit', function (e) {
    // ngambil value input
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const isbn = document.getElementById('isbn').value;

    // buat object book
    const newBook = new Book(title, author, isbn)
    const ui = new UI();
    if (title !== '' && author !== '' && isbn !== '') {
        // tambahkan book ke list
        ui.addBookToList(newBook);
        ui.clearFields();
        ui.showAlert('Berhasil ditambahkan','success')
    }
    else {
        ui.showAlert('masukkan inputan dahulu','error');
    }


    e.preventDefault();
})

// event listener remove

document.getElementById('book-list').addEventListener('click',function(e){
    const ui = new UI();
    ui.deleteBook(e.target);
    e.preventDefault();
})