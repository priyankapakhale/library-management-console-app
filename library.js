class Library {
    constructor(books = []) {
        this.books = books;
    }

    getBooks() {
        return this.books;
    }

    showBooks() {
        if (this.books.length > 0) {
            console.log("\n*** Here's the list of books present in the library: *** \n");
            this.books.forEach((book, index) => {
                console.log(`${index + 1}. ${book.title} - by ${book.author} (${book.genre})`);
            })
        } else {
            console.log("\n*** There are no books present in the library. ***")
        }
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

    addBook(returnedBook) {
        const book = this.findBook(returnedBook.id);
        let updatedBooks;
        if (book) {
            updatedBooks = this.books.map(book => {
                if (book.id === returnedBook.id) {
                    return {
                        ...book,
                        quantity: book.quantity + 1
                    }
                } else return book;
            })
        } else {
            const newBook = {
                ...returnedBook,
                quantity: 1
            }
            updatedBooks = [...this.books, newBook];
        }
        this.books = updatedBooks;
    }

    borrowBook(bookIndex, borrowedList) {
        const isBookAvailable = bookIndex <= this.books.length;
        if (!isBookAvailable) {
            console.log("\n****This book is not present in the library, please select a book which is present in the library");
            return;
        }
        const book = this.books[bookIndex - 1];
        const isAlreadyBorrowed = borrowedList.find(borrowedBook => book.id === borrowedBook.id);
        if (borrowedList.length === 2) {
            console.log("\n*** You have reached the borrow limit of 2 books. Please return a book first, if you wish to borrow a different book. ***")
        }
        else if (isAlreadyBorrowed) {
            console.log("\n*** You have already borrowed this book. Please select a different book to borrow ***");
        }
        else if (book && book.quantity > 0) {
            const borrowedBook = { ...book };
            delete borrowedBook.quantity;
            borrowedList.push(borrowedBook);
            this.removeBook(book.id);
        }
    }

    returnBook(bookIndex, borrowedList) {
        const isBorrowed = bookIndex <= borrowedList.length;
        if (borrowedList.length === 0) {
            console.log("\n*** You do not have any books to return ***");
        } else if (!isBorrowed) {
            console.log("\n*** You have not borrowed this book, please select a different book to return ***");
        }
        else {
            const book = borrowedList[bookIndex - 1];
            borrowedList.splice(bookIndex - 1, 1);
            this.addBook(book);
        }
    }
}

module.exports = Library