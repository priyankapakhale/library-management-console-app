# Library Management Console App

## Overview

Welcome to the Library Management App repository! In this README, I will cover important architectural decisions, thoughts, and assumptions made during the development process.

## Architecture

- **data.json**: This file contains array of books to be present in the library
- **library.js**: This file contains Library class which has following functions:
  1. showBooks() : to view list of books present in the library
  2. borrowBook(bookId, borrowedList) : this functions accepts the book id of the book user wants to borrow and the borrowed list.
     If
       a. book is present in library
       b. User hasn't already borrowed this book
       c. User hasn't reached borrow limit of 2 books
     then it will get added to the borrowed list and quantity of this book will get updated in the library
  3. returnBook(bookId, borrowedList) : this function also accepts the book id of the book user wants to return and the borrowed list.
     If
       a. borrowed list is not empty
       b. book is present in the borrowed list
     then it will be removed from the borrowed list and the quantity of the book will get updated in the library.
  4. addBook(bookId) : This extra helper function is created to add the book in the library. If book is present in the library, it's quantity will get increased by 1 else it will get added to the library and it's quanity will be set to 1.
  5. removeBook(bookId) : This extra helper function is created to remove the book from the library. If book has more than 1 copies, then it's quanity will be decreased by 1, else if book has only 1 copy, then it will be removed from the library.
     
- **library.test.js**: This is a test file created to test library class and it's functions to view, borrow and return books
- **index.js**: This file has the code to show the menu to user and perform actions on library and borrowed list according to user's inputs.

### Technologies Used

- Javascript for coding & Jest for testing

## Assumptions

1. **Only 1 user is present**: I am assuming that only 1 user is present. 

