Library Management System
This is a simple command-line application built in Python for managing a small library. It uses a MySQL database to store information about books, members, and borrowing records.

Features
Book Management: Add, remove, update, search, and view all books in the library.

Member Management: Add and search for library members.

Borrowing System: Record book borrowings and returns.

Overdue Alerts: The system will notify you if a book is returned past its due date.

Prerequisites
To run this application, you need to have the following installed on your system:

Python 3.6 or higher

MySQL Server

A MySQL client (e.g., MySQL Workbench, the mysql command-line client, or another tool)

Getting Started
Follow these steps to set up and run the application.

1. Project Setup
Create a project folder.

Create the following files inside the folder: library_management_system.py, schema.sql, and requirements.txt.

Copy and paste the code from the respective documents into these files.

2. Install Dependencies
The project uses the mysql-connector-python library. You can install it using pip.

Open a terminal or command prompt in your project directory and run:

pip install -r requirements.txt

3. Database Configuration
Before running the application, you need to configure your MySQL connection details and set up the database schema.

Open the library_management_system.py file.

Locate the DB_CONFIG dictionary at the top of the file and update the user and password with your MySQL credentials.

DB_CONFIG = {
    "host": "localhost",
    "user": "root",
    "password": "your_mysql_password_here",
    "database": "library_management"
}

Open your MySQL client and execute the SQL commands from the schema.sql file. This will create a database named library_management and the necessary tables.

4. Run the Application
Once the dependencies are installed and the database is set up, you can run the application from the command line.

Open a terminal in your project directory and run:

python library_management_system.py

The application's main menu will appear, and you can interact with it by entering your choices.

File Structure
library_management_system.py: The main application code containing all the business logic, database interaction, and the command-line interface.

schema.sql: The SQL script used to create the database and tables. You only need to run this once.

requirements.txt: A list of all Python libraries required to run the project.