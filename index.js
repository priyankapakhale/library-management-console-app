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

const showMenu = () => {
    readline.question(menu, choice => {
        choice = choice.trim();
        switch (choice) {
            case 'a':
                const books = library.showBooks();
                if (books.length > 0) {
                    console.log("\nHere's the list of books present in the library: \n");
                    console.log(books);
                }
                else console.log("\nThere are no books present in the library");
                showMenu();
                break;
            case 'b':
                readline.question("\nEnter the book id of the book you wish to borrow : ", id => {
                    const bookId = parseInt(id.trim());
                    library.borrowBook(bookId, borrowedBooks);
                    console.log("\nYour borrowed books list:", borrowedBooks);
                    showMenu();
                })
                break;
            case 'c':
                readline.question("\nEnter the book id of the book you wish to return : ", id => {
                    const bookId = parseInt(id.trim());
                    library.returnBook(bookId, borrowedBooks);
                    console.log("\nYour borrowed books list:", borrowedBooks);
                    showMenu();
                })
                break;

            case 'd':
                if (borrowedBooks.length === 0) {
                    console.log("\nYou do not have any books currently.");
                }
                else {
                    console.log("\nYour borrowed books list:", borrowedBooks);
                }
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