# config.py

# A constant for the borrowing period in days
BORROWING_PERIOD_DAYS = 14

# --- Database configuration ---
# IMPORTANT: Never commit this file to a public repository with your password.
# The .gitignore file will ensure this.
DB_CONFIG = {
    "host": "localhost",
    "user": "root",
    "password": "password", # Make sure this is your correct password
    "database": "library_management"
}
