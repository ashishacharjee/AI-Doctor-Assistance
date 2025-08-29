# library_management_system.py

import mysql.connector
from datetime import date, timedelta
from typing import List, Tuple, Optional

# --- Database configuration ---
DB_CONFIG = {
    "host": "localhost",
    "user": "root",
    "password": "password", # Make sure this is your correct password
    "database": "library_management"
}

# --- A constant for the borrowing period in days ---
BORROWING_PERIOD_DAYS = 14

class LibraryManager:
    """
    Manages all database interactions for the library system.
    This class encapsulates the database connection and all core functionalities.
    """
    def __init__(self):
        """Initializes the database connection."""
        self.conn = None
        self.cursor = None
        self._connect()

    def _connect(self) -> None:
        """Establishes a connection to the MySQL database."""
        try:
            self.conn = mysql.connector.connect(**DB_CONFIG)
            self.cursor = self.conn.cursor(buffered=True)
            print("Connected to the database successfully!")
        except mysql.connector.Error as err:
            print(f"Error connecting to database: {err}")
            self.conn = None
            self.cursor = None

    def _close(self) -> None:
        """Closes the database connection."""
        if self.cursor:
            self.cursor.close()
        if self.conn:
            self.conn.close()
        print("Database connection closed.")

    def _execute_query(self, query: str, params: Optional[Tuple] = None) -> bool:
        """
        Helper function to execute a query and handle exceptions.
        Returns True on success, False on failure.
        """
        if not self.conn or not self.cursor:
            print("Database connection is not active.")
            return False
        try:
            self.cursor.execute(query, params)
            self.conn.commit()
            return True
        except mysql.connector.Error as err:
            print(f"Database error: {err}")
            self.conn.rollback()
            return False

    # --- Book Management Functions ---
    def add_book(self) -> None:
        """Adds a new book to the database."""
        title = input("Enter book title: ")
        author = input("Enter book author: ")
        isbn = input("Enter book ISBN: ")
        publication_year_str = input("Enter publication year (optional, press Enter to skip): ")
        
        # Check for unique ISBN
        self.cursor.execute("SELECT BookID FROM Books WHERE ISBN = %s", (isbn,))
        if self.cursor.fetchone():
            print("Error: A book with this ISBN already exists.")
            return

        publication_year = None
        if publication_year_str:
            try:
                publication_year = int(publication_year_str)
            except ValueError:
                print("Invalid year. Please enter a number. Book not added.")
                return

        query = "INSERT INTO Books (Title, Author, ISBN, PublicationYear) VALUES (%s,%s,%s,%s)"
        params = (title, author, isbn, publication_year)
        
        if self._execute_query(query, params):
            print(f"Book '{title}' added successfully!")

    def remove_book(self) -> None:
        """Removes a book from the database by BookID or ISBN."""
        identifier = input("Enter Book ID or ISBN to remove: ")
        
        query = "SELECT BookID, Title, Status FROM Books WHERE BookID = %s OR ISBN = %s"
        self.cursor.execute(query, (identifier, identifier))
        book = self.cursor.fetchone()

        if book:
            book_id, title, status = book
            if status == 'Borrowed':
                print(f"Cannot remove '{title}'. It is currently borrowed.")
                return
            
            confirm = input(f"Are you sure you want to remove '{title}' (Book ID: {book_id})? (yes/no): ").lower()
            if confirm == 'yes':
                query = "DELETE FROM Books WHERE BookID = %s"
                if self._execute_query(query, (book_id,)):
                    print(f"Book '{title}' removed successfully!")
            else:
                print("Book removal cancelled.")
        else:
            print("Book not found.")

    def update_book_info(self) -> None:
        """Updates information for an existing book."""
        book_id_str = input("Enter the Book ID to update: ")
        
        try:
            book_id = int(book_id_str)
        except ValueError:
            print("Invalid Book ID. Please enter a number.")
            return

        self.cursor.execute("SELECT * FROM Books WHERE BookID = %s", (book_id,))
        book = self.cursor.fetchone()

        if book:
            print("\n--- Current Book Info ---")
            print(f"ID: {book[0]}, Title: {book[1]}, Author: {book[2]}, ISBN: {book[3]}, Year: {book[4] if book[4] else 'N/A'}, Status: {book[5]}")
            
            new_title = input("Enter new title (leave blank to keep current): ")
            new_author = input("Enter new author (leave blank to keep current): ")
            new_isbn = input("Enter new ISBN (leave blank to keep current): ")
            new_publication_year_str = input("Enter new publication year (leave blank to keep current): ")
            
            updates: List[str] = []
            params: List[any] = []

            if new_title:
                updates.append("Title=%s")
                params.append(new_title)
            if new_author:
                updates.append("Author=%s")
                params.append(new_author)
            if new_isbn:
                # Validate new ISBN uniqueness if provided
                self.cursor.execute("SELECT BookID FROM Books WHERE ISBN = %s AND BookID != %s", (new_isbn, book_id))
                if self.cursor.fetchone():
                    print("Error: A book with this new ISBN already exists. Update cancelled.")
                    return
                updates.append("ISBN=%s")
                params.append(new_isbn)
            if new_publication_year_str:
                try:
                    new_publication_year = int(new_publication_year_str)
                    updates.append("PublicationYear=%s")
                    params.append(new_publication_year)
                except ValueError:
                    print("Invalid publication year. Update cancelled.")
                    return
            
            if updates:
                query = f"UPDATE Books SET {', '.join(updates)} WHERE BookID=%s"
                params.append(book_id)
                if self._execute_query(query, tuple(params)):
                    print("Book updated successfully!")
            else:
                print("No changes made to the book.")
        else:
            print("Book not found.")

    def search_books(self) -> None:
        """Searches for books by title, author, or ISBN."""
        keyword = input("Enter title, author, or ISBN to search: ")
        query = "SELECT * FROM Books WHERE Title LIKE %s OR Author LIKE %s OR ISBN LIKE %s"
        search_term = f"%{keyword}%"
        self.cursor.execute(query, (search_term, search_term, search_term))
        results = self.cursor.fetchall()

        if results:
            print("\n--- Search Results ---")
            for row in results:
                print(f"ID: {row[0]}, Title: {row[1]}, Author: {row[2]}, ISBN: {row[3]}, Year: {row[4] if row[4] else 'N/A'}, Status: {row[5]}")
        else:
            print("No books found matching your search.")

    def view_all_books(self) -> None:
        """Displays all books in the database."""
        self.cursor.execute("SELECT * FROM Books")
        results = self.cursor.fetchall()
        if results:
            print("\n--- All Books ---")
            for row in results:
                print(f"ID: {row[0]}, Title: {row[1]}, Author: {row[2]}, ISBN: {row[3]}, Year: {row[4] if row[4] else 'N/A'}, Status: {row[5]}")
        else:
            print("No books in the library.")

    # --- Member Management Functions ---
    def add_member(self) -> None:
        """Adds a new member to the database."""
        name = input("Enter member name: ")
        contact_info = input("Enter member contact information (e.g., email or phone): ")

        query = "INSERT INTO Members (Name, ContactInfo) VALUES (%s,%s)"
        params = (name, contact_info)
        
        if self._execute_query(query, params):
            print(f"Member '{name}' added successfully with ID: {self.cursor.lastrowid}!")

    def search_members(self) -> None:
        """Searches for members by name or contact information."""
        keyword = input("Enter member name or contact info to search: ")
        query = "SELECT * FROM Members WHERE Name LIKE %s OR ContactInfo LIKE %s"
        search_term = f"%{keyword}%"
        self.cursor.execute(query, (search_term, search_term))
        results = self.cursor.fetchall()

        if results:
            print("\n--- Member Search Results ---")
            for row in results:
                print(f"ID: {row[0]}, Name: {row[1]}, Contact: {row[2]}")
        else:
            print("No members found matching your search.")

    # --- Borrowing/Returning Functions ---
    def borrow_book(self) -> None:
        """Records a book borrowing."""
        member_id_str = input("Enter Member ID: ")
        book_id_str = input("Enter Book ID: ")
        
        try:
            member_id = int(member_id_str)
            book_id = int(book_id_str)
        except ValueError:
            print("Invalid ID. Please enter a number.")
            return

        self.cursor.execute("SELECT MemberID FROM Members WHERE MemberID = %s", (member_id,))
        member = self.cursor.fetchone()
        if not member:
            print("Member not found.")
            return

        self.cursor.execute("SELECT Title, Status FROM Books WHERE BookID = %s", (book_id,))
        book = self.cursor.fetchone()
        if not book:
            print("Book not found.")
            return
        
        book_title, book_status = book
        if book_status == 'Borrowed':
            print(f"'{book_title}' is already borrowed.")
            return

        borrow_date = date.today()
        # Add a due date, which is today + borrowing period
        due_date = borrow_date + timedelta(days=BORROWING_PERIOD_DAYS)

        query = "INSERT INTO Borrowings (BookID, MemberID, BorrowDate, DueDate) VALUES (%s,%s,%s,%s)"
        params = (book_id, member_id, borrow_date, due_date)
        if self._execute_query(query, params):
            update_status_query = "UPDATE Books SET Status = 'Borrowed' WHERE BookID = %s"
            self._execute_query(update_status_query, (book_id,))
            print(f"Book '{book_title}' (ID: {book_id}) successfully borrowed by Member (ID: {member_id}).")
            print(f"Due date: {due_date}")

    def return_book(self) -> None:
        """Records a book return."""
        book_id_str = input("Enter Book ID of the book to return: ")
        
        try:
            book_id = int(book_id_str)
        except ValueError:
            print("Invalid Book ID. Please enter a number.")
            return

        query = """
        SELECT BR.BorrowingID, K.Title, M.Name, BR.BorrowDate, BR.DueDate
        FROM Borrowings BR
        JOIN Books K ON BR.BookID = K.BookID
        JOIN Members M ON BR.MemberID = M.MemberID
        WHERE BR.BookID = %s AND BR.ReturnDate IS NULL
        """
        self.cursor.execute(query, (book_id,))
        borrowing = self.cursor.fetchone()

        if not borrowing:
            print("Book is not currently borrowed or Book ID is incorrect.")
            return
        
        borrowing_id, book_title, member_name, borrow_date, due_date = borrowing
        return_date = date.today()

        if return_date > due_date:
            days_late = (return_date - due_date).days
            print(f"\nALERT: This book is {days_late} day(s) late!")

        update_borrowing_query = "UPDATE Borrowings SET ReturnDate = %s WHERE BorrowingID = %s"
        update_book_status_query = "UPDATE Books SET Status = 'Available' WHERE BookID = %s"

        if self._execute_query(update_borrowing_query, (return_date, borrowing_id)) and \
           self._execute_query(update_book_status_query, (book_id,)):
            print(f"Book '{book_title}' (ID: {book_id}) returned successfully by {member_name}.")

    def view_borrowed_books(self) -> None:
        """Displays books currently borrowed by a specific member."""
        member_id_str = input("Enter Member ID to view borrowed books: ")

        try:
            member_id = int(member_id_str)
        except ValueError:
            print("Invalid Member ID. Please enter a number.")
            return

        self.cursor.execute("SELECT Name FROM Members WHERE MemberID = %s", (member_id,))
        member = self.cursor.fetchone()
        if not member:
            print("Member not found.")
            return
        
        member_name = member[0]

        query = """
        SELECT B.BookID, B.Title, B.Author, BR.BorrowDate, BR.DueDate
        FROM Borrowings BR
        JOIN Books B ON BR.BookID = B.BookID
        WHERE BR.MemberID = %s AND BR.ReturnDate IS NULL
        """
        self.cursor.execute(query, (member_id,))
        results = self.cursor.fetchall()

        if results:
            print(f"\n--- Books borrowed by {member_name} (ID: {member_id}) ---")
            for row in results:
                print(f"Book ID: {row[0]}, Title: {row[1]}, Author: {row[2]}, Borrow Date: {row[3]}, Due Date: {row[4]}")
        else:
            print(f"No books currently borrowed by {member_name}.")

def main_menu():
    """Displays the main menu and handles user input."""
    manager = LibraryManager()
    if not manager.conn:
        print("Exiting due to database connection error.")
        return

    while True:
        print("\n" + "-"*35)
        print("         Library Management System")
        print("-"*35)
        print("1. Add Book")
        print("2. Remove Book")
        print("3. Update Book Info")
        print("4. Search Books")
        print("5. View All Books")
        print("-" * 35)
        print("6. Add Member")
        print("7. Search Members")
        print("-" * 35)
        print("8. Borrow Book")
        print("9. Return Book")
        print("10. View Borrowed Books by Member")
        print("-" * 35)
        print("11. Exit")
        print("-" * 35)

        choice = input("Enter your choice (1-11): ")

        if choice == "1":
            manager.add_book()
        elif choice == "2":
            manager.remove_book()
        elif choice == "3":
            manager.update_book_info()
        elif choice == "4":
            manager.search_books()
        elif choice == "5":
            manager.view_all_books()
        elif choice == "6":
            manager.add_member()
        elif choice == "7":
            manager.search_members()
        elif choice == "8":
            manager.borrow_book()
        elif choice == "9":
            manager.return_book()
        elif choice == "10":
            manager.view_borrowed_books()
        elif choice == "11":
            print("Thank you for using the Library Management System!")
            break
        else:
            print("Invalid choice. Please try again.")
    
    manager._close()

# Run the main application
if __name__ == "__main__":
    main_menu()
