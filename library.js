class Library {
    constructor(books = []) {
        this.books = books;
        this.database = books; // this is just for storing books' info
    }

    showBooks() {
        return this.books;
    }

    findBook(bookId) {
        const book = this.books.find(book => book.id === bookId);
        return book;
    }

    removeBook(bookId) {
        const book = this.findBook(bookId);
        let updatedBooks;
        if (book.quantity === 1) {
            updatedBooks = this.books.filter(book => book.id !== bookId)
        }
        else {
            updatedBooks = this.books.map(book => {
                if (book.id === bookId) {
                    return {
                        ...book,
                        quantity: book.quantity - 1
                    }
                } else return book;
            })
        }
        this.books = updatedBooks;
    }

    addBook(bookId) {
        const book = this.findBook(bookId);
        let updatedBooks;
        if (book) {
            updatedBooks = this.books.map(book => {
                if (book.id === bookId) {
                    return {
                        ...book,
                        quantity: book.quantity + 1
                    }
                } else return book;
            })
        } else {
            const bookInfo = this.database.find(book => book.id === bookId);
            const newBook = {
                ...bookInfo,
                quantity: 1
            }
            updatedBooks = [...this.books, newBook];
        }
        this.books = updatedBooks;
    }

    borrowBook(bookId, borrowedList) {
        const book = this.findBook(bookId);
        if(!book) {
            console.log("\nThis book is not present in the library, please select a book which is present in the library");
        }
        else if (borrowedList.length === 2) {
            console.log("\nYou have reached the borrow limit of 2 books. Please return a book first, if you wish to borrow a different book.")
        }
        else if (borrowedList.includes(bookId)) {
            console.log("\nYou have already borrowed this book. Please select a different book to borrow");
        }
        else if (book && book.quantity > 0) {
            borrowedList.push(bookId);
            this.removeBook(bookId);
        }
    }

    returnBook(bookId, borrowedList) {
        if (borrowedList.length === 0) {
            console.log("\nYou do not have any books to return");
        } else if(!borrowedList.includes(bookId)) {
            console.log("\nYou have not borrowed this book, please select a different book to return");
        }
        else {
            const index = borrowedList.findIndex(id => id === bookId);
            borrowedList.splice(index, 1);
            this.addBook(bookId);
        }
    }
}

module.exports = Library