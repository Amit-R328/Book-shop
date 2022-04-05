function onInit() {
    renderBooks()
    renderPages()
}

function renderBooks() {
    var books = getBooks()
    var strHTML = books.map(book =>
        `<tr><td>${book.id}</td>
        <td>${book.name}</td>
        <td>${book.rate}</td>
        <td><img src="img/${book.name}.jpg" alt="the book ${book.name}"></td>
        <td>${book.price}</td>
        <td><button onclick="onReadBook('${book.id}')" class="read" data-trans="read">Read</button></td>
        <td><button onclick="onUpdateBook('${book.id}')" class="update" data-trans="update">Update</button></td>
        <td><button onclick="onDeleteBook('${book.id}')" class="delete" data-trans="delete">Delete</button></td>
    </tr>`)
    document.querySelector('tbody').innerHTML = strHTML.join('')
}

function onReadBook(bookId) {
    var book = getBookById(bookId)
    var elModal = document.querySelector('.my-modal')
    elModal.querySelector('h3').innerText = book.name
    elModal.querySelector('h4 span').innerText = book.price
    elModal.querySelector('p').innerText = book.desc
    elModal.querySelector('.rating').innerHTML = `<form>
        <input type="button" onclick="decreaseValue('${bookId}')" value="Decrease Value"/>
        <input type="text" class="number" value="${book.rate}"/>
        <input type="button" onclick="incrementValue('${bookId}')" value="Increment Value"/>
    </form`
    elModal.classList.add('open')
}


function onCloseModal() {
    document.querySelector('.my-modal').classList.remove('open')
    renderBooks()
}


function onUpdateBook(bookId) {
    const book = getBookById(bookId)
    var newPrice = +prompt('Price?')
    if (newPrice) {
        const book = updateBook(bookId, newPrice)
        renderBooks()
        flashMsg(`Price updated to: ${book.price}`)
    }
}

function onSort(el, sortby){
    const sortOrder = sortBooks(sortby) === 1
    el.querySelector('span').innerText = sortOrder ? '⬇' : '⬆'
    renderBooks()
}

function renderPages(){
    const maxPages = getMaxNumOfPages()
    var strHTML = `<li onclick="onNextPage(-1)">&lt;&lt;</li>`
    for(var i = 0; i < maxPages; i++){
        strHTML += `<li onclick="onSelectPage(${i+1})">${i+1}</li>`
    }
    strHTML += `<li onclick="onNextPage(1)">&gt;&gt;</li>`
    document.querySelector('.pages').innerHTML = strHTML
}

function onSelectPage(idx){
    setPage(+idx -1)
    renderBooks()
}

function onNextPage(step){
    setPage(null, +step)
    renderBooks()
}

function onDeleteBook(BookId) {
    deleteBook(BookId)
    renderBooks()
    flashMsg('Book Deleted')
}

function onAddBook(ev) {
    let name = document.querySelector('.name');
    let price = parseFloat(document.querySelector('.price').value);
    
    const book = addBook(name.value, price)
    renderBooks()
    flashMsg(`Book Added (id: ${book.id})`)
    
}

function flashMsg(msg) {
    const el = document.querySelector('.user-msg')
    el.innerText = msg
    el.classList.add('open')
    setTimeout(() => {
        el.classList.remove('open')
    }, 3000)
}

function onSetLang(lang){
    setLang(lang)

    if (lang==='he') document.body.classList.add('rtl')
    else document.body.classList.remove('rtl')

    doTrans()
    renderBooks()
}