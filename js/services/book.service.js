'use strict'

const STORAGE_KEY = 'bookDB'
var gBooks;
const gNames = ['Harry Potter', 'Lord Of The Rings', 'Ulysses', 'Don Quixote']

_createBooks();

function getBooks(){
    var books = gBooks
    return books
}

function getBookById(bookId){
    const book = gBooks.find(book => bookId === book.id)
    return book
}

function updateBook(bookId, newPrice){
    const book = gBooks.find(book => bookId === book.id)
    book.price = newPrice
    _saveBooksToStorage
    return book
}

function addBook(name, price){
    const book=_createBook(name,price)
    gBooks.unshift(book)
    _saveBooksToStorage
    return book
}

function deleteBook(BookId){
    const bookIdx = gBooks.findIndex(book => BookId === book.id)
    gBooks.splice(bookIdx,1)
    _saveBooksToStorage()
}

function incrementValue(bookId){
    var book = getBookById(bookId)
    var rating = parseInt(document.querySelector('.number').value,10)
    rating = isNaN(rating) ? 0 : rating
    rating++
    document.querySelector('.number').value = rating;
    book.rate = rating
    _saveBooksToStorage()
}

function decreaseValue(bookId){
    var book = getBookById(bookId)
    var rating = parseInt(document.querySelector('.number').value,10)
    rating = isNaN(rating) ? 0 : rating
    rating--
    document.querySelector('.number').value = rating;
    book.rate = rating
    _saveBooksToStorage()
}

function _createBooks(){
    var books = loadFromStorage(STORAGE_KEY)
    if(!books || !books.length){
        books =[]

        for(let i = 0; i < 10; i++){
            var name = gNames[getRandomIntInclusive(0,gNames.length -1)]
            books.push(_createBook(name))
        }
    }
    gBooks = books;
    _saveBooksToStorage()
}

function _createBook(name){
    return {
        id: makeId(),
        name,
        price: getRandomIntInclusive(50,150),
        rate: 0,
        desc: makeLorem(),
    }
}

function _saveBooksToStorage(){
    saveToStorage(STORAGE_KEY, gBooks)
}