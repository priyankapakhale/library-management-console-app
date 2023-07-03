const data = require("./data.json");

describe("view books in library", () => {
    it("should display list of books in library when there are books present in the library", () => { })

    it("should display an empty library, when there are no books present in the library", () => {})
})

describe("borrow a book from the library", () => {
    it("when user borrows a book from the library, that book is added to the borrowed list", () => { })

    it("when user borrows a book from the library which has more than 1 copies, the book's quantity gets decreased by 1", () => { })

    it("when user borrows a book from the library which has only 1 copy, that book gets removed from the library", () => { })

    it("when user tries to borrow a book which is already present in the borrowed list, the book doesn't get added to the borrowed list", () => { })

    it("when user tries to borrow a book which is already present in the borrowed list, the book's quantity is library doesn't change", () => { })

    it("when user tries to borrow a book from the library when borrowed list already contains 2 books, the books's quantity in library doesn't change ", () => { })

    it("when user tries to borrow a book from the library when borrowed list already contains 2 books, it doesn't get added to the borrowed list", () => { })

    it("when user tries to borrow a book from the library when borrowed list already contains 2 books, user get's a message saying that he has reached borrow limit of 2 books", () => { })

    it("when user tries to borrow a book from the library when borrowed list already contains 2 books, user get's a message saying that he has reached borrow limit of 2 books", () => { })
})

describe("return books to the library", () => {
    it("when user has 2 books in borrowed list and returns 1 book, the book is removed from the borrowed list", () => { })

    it("when user has 2 books in borrowed list and returns 1 book, the book's quantity gets increased by 1 in the library", () => { })

    it("when user has 2 books in borrowed list and returns both books, both books' quantity gets increased by 1 in the library", () => { })

    it("when user has 2 books in borrowed list and returns both books, borrowed list becomes empty", () => { })

    it("when user has 1 book in borrowed list and returns it, borrowed list becomes empty", () => { })

    it("when user has 1 book in borrowed list and returns it, book's quantity gets increased by 1 in the library", () => { })
})