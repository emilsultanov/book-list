// Book Class::
class Book {
	constructor(title, author, isbn) {
		this.title = title;
		this.author = author;
		this.isbn = isbn;
	}
}

// Validator Class::
class Validator {
	static REQUIRED = "REQUIRED";
	static validate(value, flag, validatorValue) {
		if (flag === this.REQUIRED) {
			return value.trim().length > 0;
		}
	}
}

// UI Class::
class UI {
	static displayBooks() {
		const stored_books = [
			{
				title: "Book one",
				author: "John Doe",
				isbn: "341250",
			},
			{
				title: "Book two",
				author: "John Doe",
				isbn: "123456",
			},
		];

		const books = stored_books;
		books.forEach((book) => UI.addBookToList(book));
	}

	static addBookToList(book) {
		const book_list = document.querySelector("#book-list");
		const row = document.createElement("tr");

		row.innerHTML = `
         <td>${book.title}</td>
         <td>${book.author}</td>
         <td>${book.isbn}</td>
         <td> <a href='#' class='btn btn-danger btn-sm delete' >Delete</a> </td>
      `;

		row.querySelector(".delete").addEventListener("click", (e) => {
			UI.deleteBookFromList(e.target);
		});

		book_list.appendChild(row);
	}

	static clearInputFields() {
		document.querySelector("#title").value = "";
		document.querySelector("#author").value = "";
		document.querySelector("#isbn").value = "";
	}

	static deleteBookFromList(element) {
		element.closest("tr").remove();
	}
}

// Displaying Books::
document.addEventListener("DOMContentLoaded", UI.displayBooks);

// Add Book::
document.querySelector("#book-form").addEventListener("submit", (e) => {
	// Avoid page refresh::
	e.preventDefault();

	// Get form values::
	const title = document.querySelector("#title").value;
	const author = document.querySelector("#author").value;
	const isbn = document.querySelector("#isbn").value;

	// Validate input fields::
	if (
		!Validator.validate(title, Validator.REQUIRED) ||
		!Validator.validate(author, Validator.REQUIRED) ||
		!Validator.validate(isbn, Validator.REQUIRED)
	) {
		console.log("invalid input field");
		return false;
	}

	// Initiate book::
	const book = new Book(title, author, isbn);

	// Add book to list::
	UI.addBookToList(book);

	// Clear input fiels::
	UI.clearInputFields();
});
