class Book {
    constructor(title, author, isbn) {
        this.title = title;
        this.author = author;
        this.isbn = isbn
    }
}

class UI {
    addBookToList(book) {
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

    clearFields() {
        document.getElementById('title').value = '';
        document.getElementById('author').value = '';
        document.getElementById('isbn').value = '';
    }

    showAlert(message,clasName){
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

    deleteBook(target){
        if(target.className === 'delete'){
            Store.removeBook(target.parentElement.previousElementSibling.textContent);
            target.parentElement.parentElement.remove();
            new UI().showAlert('Berhasil dihapus', 'success');
        }
    }
}

class Store {
    static getBooks(){
        let books;
        if (localStorage.getItem('books') === null) {
            books = [];
        }
        else {
            books = JSON.parse(localStorage.getItem('books'))
        }
        return books;
    }
    static displayBooks(){
        const books = Store.getBooks();
        books.forEach(function(data){
            new UI().addBookToList(data);
        })
    }
    static addBook(book){
        const books = Store.getBooks();
        books.push(book);
        localStorage.setItem('books',JSON.stringify(books));
    }
    static removeBook(target){
        const books = Store.getBooks();
        books.forEach(function(data,index){
            if (data.isbn.toString() === target.toString()){
                books.splice(index,1);
            }
        })
        localStorage.setItem('books',JSON.stringify(books));
    }
}


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
        Store.addBook(newBook);
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

document.addEventListener('DOMContentLoaded', Store.displayBooks())