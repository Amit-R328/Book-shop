'use strict'

const gTrans = {
    title: {
        en: 'Welcome to my bookshop',
        he: 'ברוכים הבאים לחנות הספרים שלי',
    },
    read: {
        en: 'read',
        he: 'קרא'
    },
    update: {
        en: 'update',
        he: 'עדכן'
    },
    delete: {
        en: 'delete',
        he: 'מחק'
    },
    id: {
        en: 'id',
        he: 'מספר זיהוי'
    },
    bookTitle: {
        en: 'title',
        he: 'כותרת'
    },
    rate: {
        en: 'rate',
        he: 'דירוג'
    },
    image: {
        en: 'image',
        he: 'תמונה'
    },
    price: {
        en: 'price',
        he: 'מחיר'
    },
    actions:{
        en: 'actions',
        he: 'פעולות'
    }
}

var gCurrLang = 'en'

function setLang(lang){
    gCurrLang = lang
}

function getTrans(transKey){
    var key = gTrans[transKey]
    if (!key) return 'UNKNOWN'
    const translate = key[gCurrLang]
    if(!translate) return key['en']
    return translate
}

function doTrans(){
    const els = document.querySelectorAll('[data-trans]')
    els.forEach(el => {
        const transKey = el.dataset.trans
        const txt = getTrans(transKey)
        el.innerText = txt
    })
}