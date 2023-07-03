const data = require("./data.json");
const Library = require('./library');

describe("view books in library", () => {
    it("should display list of books in library when there are books present in the library", () => {
        const library = new Library(data);
        expect(library.getBooks()).toHaveLength(8);
    })

    it("should display an empty library, when there are no books present in the library", () => {
        const library = new Library();
        expect(library.getBooks()).toHaveLength(0);
    })
})

describe("borrow a book from the library", () => {
    it("when user borrows a book from the library, that book is added to the borrowed list", () => {
        let borrowedList = [];
        expect(borrowedList).toHaveLength(0);

        const library = new Library(data);
        const books = library.getBooks();
        const bookIndex = 1;
        const currentBook = books[bookIndex - 1];

        library.borrowBook(bookIndex, borrowedList);
        expect(borrowedList).toHaveLength(1);

        const borrowedBook = { ...currentBook };
        delete borrowedBook.quantity;

        expect(borrowedList).toContainEqual(borrowedBook);
    })

    it("when user borrows a book from the library which has more than 1 copies, the book's quantity gets decreased by 1", () => {
        let borrowedList = [];

        const library = new Library(data);
        const bookIndex = 1;
        const currentBook = library.getBooks()[bookIndex - 1];

        const previousQuantity = currentBook.quantity;
        library.borrowBook(bookIndex, borrowedList);

        const newQuantity = library.findBook(currentBook.id).quantity;
        expect(newQuantity).toEqual(previousQuantity - 1);
    })

    it("when user borrows a book from the library which has only 1 copy, that book gets removed from the library", () => {
        let borrowedList = [];

        const library = new Library(data);
        const bookIndex = 2;
        const currentBook = library.getBooks()[bookIndex - 1];

        library.borrowBook(bookIndex, borrowedList);

        const book = library.findBook(currentBook.id);
        expect(book).toBe(undefined);
        expect(library.getBooks()).toHaveLength(7);
    })

    it("when user tries to borrow a book which is already present in the borrowed list, the book doesn't get added to the borrowed list", () => {
        let borrowedList = [{
            "id": 1,
            "title": "Hitchhiker's guide to the galaxy",
            "author": "Douglas Adams",
            "genre": "Science fiction"
        }]
        const library = new Library(data);
        const bookIndex = 1;
        library.borrowBook(bookIndex, borrowedList);

        expect(borrowedList).toHaveLength(1);
    })

    it("when user tries to borrow a book which is already present in the borrowed list, the book's quantity is library doesn't change", () => {
        let borrowedList = [{
            "id": 1,
            "title": "Hitchhiker's guide to the galaxy",
            "author": "Douglas Adams",
            "genre": "Science fiction"
        }]
        const library = new Library(data);
        const previousQuantity = library.findBook(1).quantity;

        const bookIndex = 1;
        library.borrowBook(bookIndex, borrowedList);
        const newQuantity = library.findBook(1).quantity;

        expect(previousQuantity).toEqual(newQuantity);
    })

    it("when user tries to borrow a book from the library when borrowed list already contains 2 books, the books's quantity in library doesn't change ", () => {
        let borrowedList = [{
            "id": 1,
            "title": "Hitchhiker's guide to the galaxy",
            "author": "Douglas Adams",
            "genre": "Science fiction"
        }, {
            "id": 2,
            "title": "Death on the nile",
            "author": "Agatha Cristie",
            "genre": "Mystery"
        }]
        const library = new Library(data);
        const books = library.getBooks();
        const bookIndex = 3;
        const currentBook = books[bookIndex - 1];

        const previousQuantity = library.findBook(currentBook.id).quantity;

        library.borrowBook(bookIndex, borrowedList);
        const newQuantity = library.findBook(currentBook.id).quantity;

        expect(previousQuantity).toBe(newQuantity);
    })

    it("when user tries to borrow a book from the library when borrowed list already contains 2 books, it doesn't get added to the borrowed list", () => {
        const dummyData = [{
            "id": 1,
            "title": "Hitchhiker's guide to the galaxy",
            "author": "Douglas Adams",
            "genre": "Science fiction"
        }, {
            "id": 2,
            "title": "Death on the nile",
            "author": "Agatha Cristie",
            "genre": "Mystery"
        }]
        let borrowedList = [...dummyData];

        const library = new Library(data);
        const books = library.getBooks();
        const bookIndex = 3;
        const currentBook = books[bookIndex - 1];

        library.borrowBook(currentBook.id, borrowedList);

        expect(borrowedList).toEqual(dummyData);
        expect(borrowedList).toHaveLength(2);

        delete currentBook.quantity
        expect(borrowedList).not.toContainEqual(currentBook);
    })

    it("when user tries to borrow a book from the library which is not present in the library, the borrowed list remains same", () => {
        const dummyData = [{
            "id": 1,
            "title": "Hitchhiker's guide to the galaxy",
            "author": "Douglas Adams",
            "genre": "Science fiction"
        }, {
            "id": 2,
            "title": "Death on the nile",
            "author": "Agatha Cristie",
            "genre": "Mystery"
        }]
        let borrowedList = [...dummyData];
        const library = new Library(data);

        const bookIndex = 42;
        library.borrowBook(bookIndex, borrowedList);

        expect(borrowedList).toEqual(dummyData);
        expect(borrowedList).toHaveLength(2);
    })
})

describe("return books to the library", () => {
    it("when user has 2 books in borrowed list and returns 1 book, the book is removed from the borrowed list", () => {
        const dummyData = [{
            "id": 1,
            "title": "Hitchhiker's guide to the galaxy",
            "author": "Douglas Adams",
            "genre": "Science fiction"
        }, {
            "id": 2,
            "title": "Death on the nile",
            "author": "Agatha Cristie",
            "genre": "Mystery"
        }]
        let borrowedList = [...dummyData];
        const library = new Library(data);

        const bookIndex = 1;
        const returnedBook = borrowedList[bookIndex - 1];
        library.returnBook(bookIndex, borrowedList);

        expect(borrowedList).not.toContainEqual(returnedBook);
        expect(borrowedList).toHaveLength(1);
    })

    it("when user has 2 books in borrowed list and returns 1 book, the book's quantity gets increased by 1 in the library", () => {
        const dummyData = [{
            "id": 1,
            "title": "Hitchhiker's guide to the galaxy",
            "author": "Douglas Adams",
            "genre": "Science fiction"
        }, {
            "id": 2,
            "title": "Death on the nile",
            "author": "Agatha Cristie",
            "genre": "Mystery"
        }]
        let borrowedList = [...dummyData]
        const library = new Library(data);

        const bookIndex = 1;
        const currentBook = borrowedList[bookIndex - 1];
        const previousQuantity = library.findBook(currentBook.id).quantity;
        library.returnBook(bookIndex, borrowedList);

        const newQuantity = library.findBook(currentBook.id).quantity;
        expect(newQuantity).toEqual(previousQuantity + 1);
    })

    it("when user has 2 books in borrowed list and returns both books, both books' quantity gets increased by 1 in the library", () => {
        const dummyData = [{
            "id": 1,
            "title": "Hitchhiker's guide to the galaxy",
            "author": "Douglas Adams",
            "genre": "Science fiction"
        }, {
            "id": 2,
            "title": "Death on the nile",
            "author": "Agatha Cristie",
            "genre": "Mystery"
        }]
        let borrowedList = [...dummyData];
        const library = new Library(data);

        const bookIndex = 1;

        //returning first book
        const currentBook1 = borrowedList[bookIndex - 1];
        const previousQuantity1 = library.findBook(currentBook1.id).quantity;
        library.returnBook(bookIndex, borrowedList);

        //returning second book - book index remains same as there is only 1 book left now
        const currentBook2 = borrowedList[bookIndex - 1];
        const previousQuantity2 = library.findBook(currentBook2.id).quantity;
        library.returnBook(bookIndex, borrowedList);

        const newQuantity1 = library.findBook(currentBook1.id).quantity;
        const newQuantity2 = library.findBook(currentBook2.id).quantity;

        expect(newQuantity1).toEqual(previousQuantity1 + 1);
        expect(newQuantity2).toEqual(previousQuantity2 + 1);
    })

    it("when user has 2 books in borrowed list and returns both books, borrowed list becomes empty", () => {
        const dummyData = [{
            "id": 1,
            "title": "Hitchhiker's guide to the galaxy",
            "author": "Douglas Adams",
            "genre": "Science fiction"
        }, {
            "id": 2,
            "title": "Death on the nile",
            "author": "Agatha Cristie",
            "genre": "Mystery"
        }]
        let borrowedList = [...dummyData];
        const library = new Library(data);

        library.returnBook(1, borrowedList);
        library.returnBook(1, borrowedList);

        expect(borrowedList).toHaveLength(0);
    })

    it("when user has 1 book in borrowed list and returns it, borrowed list becomes empty", () => {
        const borrowedList = [{
            "id": 1,
            "title": "Hitchhiker's guide to the galaxy",
            "author": "Douglas Adams",
            "genre": "Science fiction"
        }]
        const library = new Library(data);

        library.returnBook(1, borrowedList);

        expect(borrowedList).toHaveLength(0);
    })

    it("when user has 1 book in borrowed list and returns it, book's quantity gets increased by 1 in the library", () => {
        const borrowedList = [{
            "id": 1,
            "title": "Hitchhiker's guide to the galaxy",
            "author": "Douglas Adams",
            "genre": "Science fiction"
        }]
        const library = new Library(data);

        const bookIndex = 1;
        const currentBook = borrowedList[bookIndex - 1];

        const previousQuantity = library.findBook(currentBook.id).quantity;
        library.returnBook(bookIndex, borrowedList);

        const newQuantity = library.findBook(currentBook.id).quantity;
        expect(newQuantity).toEqual(previousQuantity + 1);
    })

    it("when user tries to return a book which is not present in the borrowed list, the book doesn't get removed from borrowed list", () => {
        const dummyData = [{
            "id": 1,
            "title": "Hitchhiker's guide to the galaxy",
            "author": "Douglas Adams",
            "genre": "Science fiction"
        }]
        const borrowedList = [...dummyData];
        const library = new Library(data);

        const bookIndex = 2;
        library.returnBook(bookIndex, borrowedList);

        expect(borrowedList).toHaveLength(1);
        expect(borrowedList).toEqual(dummyData);
    })
})