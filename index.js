const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout,
});
const Library = require("./library");
const books = require('./data.json');

const menu = `
=======================================================
You can perform following actions in the library.

    a. View the list of books present in the library
    b. Borrow a book
    c. Return a book
    d. View your books
    e. Exit

Please enter your choice : `;

console.log(`Welcome to the library. \n`);

const borrowedBooks = [];
const library = new Library(books);

const displayBorrowedBooks = () => {
    if (borrowedBooks.length > 0) {
        console.log("\nHere's the list of books your borrowed: \n");
        borrowedBooks.forEach((book, index) => {
            console.log(`${index + 1}. ${book.title} - by ${book.author} (${book.genre})`);
        })
    } else {
        console.log("\nYou haven't borrowed any books.")
    }
}

const showMenu = () => {
    readline.question(menu, choice => {
        choice = choice.trim();
        switch (choice) {
            case 'a':
                library.showBooks();
                showMenu();
                break;
            case 'b':
                library.showBooks();
                readline.question("\nEnter the book id of the book you wish to borrow : ", id => {
                    const bookIndex = parseInt(id.trim());
                    library.borrowBook(bookIndex, borrowedBooks);
                    displayBorrowedBooks();
                    showMenu();
                })
                break;
            case 'c':
                displayBorrowedBooks();
                readline.question("\nEnter the book id of the book you wish to return : ", id => {
                    const bookIndex = parseInt(id.trim());
                    library.returnBook(bookIndex, borrowedBooks);
                    displayBorrowedBooks();
                    showMenu();
                })
                break;

            case 'd':
                displayBorrowedBooks();
                showMenu();
                break;
            case 'e':
                console.log("\nThank you for visiting the library.");
                readline.close();
                break;
            default:
                console.log("\nPlease choose an option from the menu.");
                showMenu();
        }
    });
}

showMenu()