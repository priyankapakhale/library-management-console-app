const data = require("./data.json");

describe("view books in library", () => {
    it("should display list of books in library when there are books present in the library", () => {
        const library = new Library(data);
        expect(library).toHaveLength(8);
    })

    it("should display an empty library, when there are no books present in the library", () => {
        const library = new Library();
        expect(library).toHaveLength(0);
    })
})

describe("borrow a book from the library", () => {
    it("when user borrows a book from the library, that book is added to the borrowed list", () => {
        let borrowedList = [];
        expect(borrowedList).toHaveLength(0);

        const library = new Library(data);
        library.borrowBook(1, borrowedList);
        expect(borrowedList).toHaveLength(1);
        expect(borrowedList).toContain(1);
    })

    it("when user borrows a book from the library which has more than 1 copies, the book's quantity gets decreased by 1", () => {
        let borrowedList = [];

        const library = new Library(data);
        library.borrowBook(1, borrowedList);
        const previousQuantity = library.findbook(1).quantity;

        const newQuantity = library.findBook(1).quantity;
        expect(newQuantity).toBe(previousQuantity - 1);
    })

    it("when user borrows a book from the library which has only 1 copy, that book gets removed from the library", () => { 
        let borrowedList = [];

        const library = new Library(data);
        library.borrowBook(2, borrowedList);

        const book = library.findbook(2);
        expect(book).toBeNull();
        expect(library.showBooks()).toHaveLength(7);
    })

    it("when user tries to borrow a book which is already present in the borrowed list, the book doesn't get added to the borrowed list", () => { 
        let borrowedList = [1]
        const library = new Library(data);
        library.borrowBook(1, borrowedList);
        expect(borrowedList).toHaveLength(1);
    })

    it("when user tries to borrow a book which is already present in the borrowed list, the book's quantity is library doesn't change", () => { 
        let borrowedList = [1]
        const library = new Library(data);
        const previousQuantity = library.findBook(1).quantity;

        library.borrowBook(1, borrowedList);
        const newQuantity = library.findbook(1).quantity;

        expect(previousQuantity).toEqual(newQuantity);
    })

    it("when user tries to borrow a book from the library when borrowed list already contains 2 books, the books's quantity in library doesn't change ", () => { 
        let borrowedList = [1, 2]
        const library = new Library(data);
        const previousQuantity = library.findBook(3).quantity;

        library.borrowBook(3, borrowedList);
        const newQuantity = library.findbook(3).quantity;

        expect(previousQuantity).toBe(newQuantity);
    })

    it("when user tries to borrow a book from the library when borrowed list already contains 2 books, it doesn't get added to the borrowed list", () => { 
        let borrowedList = [1, 2]
        const library = new Library(data);

        library.borrowBook(3, borrowedList);
        
        expect(borrowedList).toEqual([1, 2]);
        expect(borrowedList).toHaveLength(2);
        expect(borrowedList).not.toContain(3);
    })
})

describe("return books to the library", () => {
    it("when user has 2 books in borrowed list and returns 1 book, the book is removed from the borrowed list", () => { 
        let borrowedList = [1, 2]
        const library = new Library(data);

        library.returnBook(1, borrowedList);
        
        expect(borrowedList).not.toContain(1);
        expect(borrowedList).toHaveLength(1);
    })

    it("when user has 2 books in borrowed list and returns 1 book, the book's quantity gets increased by 1 in the library", () => { 
        let borrowedList = [1, 2]
        const library = new Library(data);

        const previousQuantity = library.findBook(1).quantity;
        library.returnBook(1, borrowedList);
        
        const newQuantity = library.findBook(1).quantity;
        expect(newQuantity).toEqual(previousQuantity + 1);
    })

    it("when user has 2 books in borrowed list and returns both books, both books' quantity gets increased by 1 in the library", () => {
        let borrowedList = [1, 2]
        const library = new Library(data);

        const previousQuantity1 = library.findBook(1).quantity;
        const previousQuantity2 = library.findBook(2).quantity;

        library.returnBook(1, borrowedList);
        library.returnBook(2, borrowedList);

        const newQuantity1 = library.findBook(1).quantity;
        const newQuantity2 = library.findBook(2).quantity;

        expect(newQuantity1).toEqual(previousQuantity1 + 1);
        expect(newQuantity2).toEqual(previousQuantity2 + 1);
     })

    it("when user has 2 books in borrowed list and returns both books, borrowed list becomes empty", () => {
        let borrowedList = [1, 2]
        const library = new Library(data);

        library.returnBook(1, borrowedList);
        library.returnBook(2, borrowedList);
        
        expect(borrowedList).toHaveLength(0);
     })

    it("when user has 1 book in borrowed list and returns it, borrowed list becomes empty", () => { 
        let borrowedList = [1]
        const library = new Library(data);

        library.returnBook(1, borrowedList);
        
        expect(borrowedList).toHaveLength(0);
    })

    it("when user has 1 book in borrowed list and returns it, book's quantity gets increased by 1 in the library", () => { 
        let borrowedList = [1]
        const library = new Library(data);

        const previousQuantity = library.findBook(1).quantity;
        library.returnBook(1, borrowedList);
        
        const newQuantity = library.findBook(1).quantity;
        expect(newQuantity).toEqual(previousQuantity + 1);
    })
})