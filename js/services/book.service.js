'use strict'

const STORAGE_KEY = 'bookDB'
const PAGE_SIZE = 4;
var gPageIdx = 0;
var gBooks;
const gNames = ['Harry Potter', 'Lord Of The Rings', 'Ulysses', 'Don Quixote']
var gSortBy = {
    name: {type: 'text', asc: -1},
    price: {type: 'number', asc:-1}
}

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

function getMaxNumOfPages(){
    return Math.ceil(gBooks.length / PAGE_SIZE)
}

function setPage(pageIdx, step){
    if(pageIdx !== null){
        gPageIdx = pageIdx
    }else if(
        gPageIdx + step >= 0 &&
        (gPageIdx + step) * PAGE_SIZE < gBooks.length
    ){
        gPageIdx += step
    }
}

function sortBooks(sortBy){
    const sort = gSortBy[sortBy]
    sort.asc = sort.asc * -1
    if(sort.type === 'text'){
        gBooks.sort((a,b)=> 
            a[sortBy].toLowerCase().localeCompare(b[sortBy].toLowerCase()) *
            sort.asc
        )
    }else if(sort.type === 'number'){
        gBooks.sort((a,b) => ((+a[sortBy]) - (+b[sortBy])) * sort.asc)
    }
    return sort.asc
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