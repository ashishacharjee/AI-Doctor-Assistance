#include <stdio.h>
#include <stdlib.h>
#include <math.h>
#include <string.h>
#include <ctype.h>
#include <stdbool.h>

// =================================================================================================
// HOMEWORK SET 1
// =================================================================================================

void homeworkSet1() {
    printf("\n====================================\n");
    printf("    HOMEWORK SET 1 - SOLUTIONS\n");
    printf("====================================\n");

    // 1a. Program to calculate perimeter of rectangle.
    printf("\n--- 1a. Perimeter of Rectangle ---\n");
    float side_a, side_b;
    float perimeter;

    printf("Enter the length of side a: ");
    scanf("%f", &side_a);

    printf("Enter the length of side b: ");
    scanf("%f", &side_b);

    perimeter = 2 * (side_a + side_b);
    printf("The perimeter of the rectangle is: %.2f\n", perimeter);

    // 1b. Program to output cube of a number.
    printf("\n--- 1b. Cube of a Number ---\n");
    int n_cube;
    long long cube_result;

    printf("Enter an integer number: ");
    scanf("%d", &n_cube);

    cube_result = (long long)n_cube * n_cube * n_cube;
    printf("The cube of %d is: %lld\n", n_cube, cube_result);

    // 1c. Comments for programs a & b are included inline above.
    printf("\n--- 1c. Comments ---\n");
    printf("Comments for programs 1a and 1b are included directly in their code blocks.\n");
}

// =================================================================================================
// HOMEWORK SET 2
// =================================================================================================

void homeworkSet2() {
    printf("\n====================================\n");
    printf("    HOMEWORK SET 2 - SOLUTIONS\n");
    printf("====================================\n");

    // 2a. Program to print the average of 3 numbers.
    printf("\n--- 2a. Average of 3 Numbers ---\n");
    float num1_avg, num2_avg, num3_avg;
    float average;

    printf("Enter the first number: ");
    scanf("%f", &num1_avg);
    printf("Enter the second number: ");
    scanf("%f", &num2_avg);
    printf("Enter the third number: ");
    scanf("%f", &num3_avg);

    average = (num1_avg + num2_avg + num3_avg) / 3.0;
    printf("The average of %.2f, %.2f, and %.2f is: %.2f\n", num1_avg, num2_avg, num3_avg, average);

    // 2b. Program to check if given character is digit or not.
    printf("\n--- 2b. Check if Character is Digit ---\n");
    char ch_digit;
    // Clear input buffer before reading a character
    while (getchar() != '\n');
    printf("Enter a character: ");
    scanf(" %c", &ch_digit); // Space before %c to consume any leftover whitespace

    if (isdigit(ch_digit)) {
        printf("'%c' is a digit.\n", ch_digit);
    } else {
        printf("'%c' is not a digit.\n", ch_digit);
    }

    // 2c. Program to print the smallest number of two.
    printf("\n--- 2c. Smallest of Two Numbers ---\n");
    int num1_smallest, num2_smallest;

    printf("Enter the first number: ");
    scanf("%d", &num1_smallest);
    printf("Enter the second number: ");
    scanf("%d", &num2_smallest);

    if (num1_smallest < num2_smallest) {
        printf("The smallest number is: %d\n", num1_smallest);
    } else if (num2_smallest < num1_smallest) {
        printf("The smallest number is: %d\n", num2_smallest);
    } else {
        printf("Both numbers are equal: %d\n", num1_smallest);
    }
}

// =================================================================================================
// HOMEWORK SET 3
// =================================================================================================

void homeworkSet3() {
    printf("\n====================================\n");
    printf("    HOMEWORK SET 3 - SOLUTIONS\n");
    printf("====================================\n");

    // 3a. Program to check for Armstrong number.
    printf("\n--- 3a. Armstrong Number Check ---\n");
    int num_armstrong, originalNum_armstrong, remainder_armstrong, n_digits = 0;
    double result_armstrong = 0.0;

    printf("Enter an integer to check for Armstrong: ");
    scanf("%d", &num_armstrong);

    originalNum_armstrong = num_armstrong;

    // Count the number of digits
    // Handle case for 0 separately as log10(0) is undefined
    if (originalNum_armstrong == 0) {
        n_digits = 1;
    } else {
        while (originalNum_armstrong != 0) {
            originalNum_armstrong /= 10;
            ++n_digits;
        }
    }


    originalNum_armstrong = num_armstrong; // Reset originalNum

    // Calculate the sum of nth power of its digits
    while (originalNum_armstrong != 0) {
        remainder_armstrong = originalNum_armstrong % 10;
        result_armstrong += pow(remainder_armstrong, n_digits);
        originalNum_armstrong /= 10;
    }

    if ((int)result_armstrong == num_armstrong) {
        printf("%d is an Armstrong number.\n", num_armstrong);
    } else {
        printf("%d is not an Armstrong number.\n", num_armstrong);
    }

    // 3b. Program to check if the given number is a natural number.
    printf("\n--- 3b. Natural Number Check ---\n");
    int num_natural;
    printf("Enter a number to check if it's natural: ");
    scanf("%d", &num_natural);

    if (num_natural >= 1) {
        printf("%d is a natural number.\n", num_natural);
    } else {
        printf("%d is not a natural number.\n", num_natural);
    }
}

// =================================================================================================
// HOMEWORK SET 4
// =================================================================================================

// Function to check if a number is prime
bool isPrime(int n) {
    if (n <= 1) {
        return false;
    }
    for (int i = 2; i * i <= n; i++) {
        if (n % i == 0) {
            return false;
        }
    }
    return true;
}

void homeworkSet4() {
    printf("\n====================================\n");
    printf("    HOMEWORK SET 4 - SOLUTIONS\n");
    printf("====================================\n");

    // 4a. Nested loop pattern.
    printf("\n--- 4a. Nested Loop Pattern ---\n");
    int rows = 4;
    int stars_per_row = 5;

    for (int i = 0; i < rows; i++) {
        for (int j = 0; j < stars_per_row; j++) {
            printf("*");
        }
        printf("\n");
    }

    // 4b. Program to check if a number is prime or not.
    printf("\n--- 4b. Prime Number Check ---\n");
    int num_prime;

    printf("Enter a positive integer to check for prime: ");
    scanf("%d", &num_prime);

    if (isPrime(num_prime)) { // Using the isPrime function
        printf("%d is a prime number.\n", num_prime);
    } else {
        printf("%d is not a prime number.\n", num_prime);
    }

    // 4c. Program to print prime numbers in a range.
    printf("\n--- 4c. Prime Numbers in a Range ---\n");
    int start_range, end_range;

    printf("Enter the start of the range: ");
    scanf("%d", &start_range);
    printf("Enter the end of the range: ");
    scanf("%d", &end_range);

    if (start_range > end_range) { // Swap if start is greater than end
        int temp = start_range;
        start_range = end_range;
        end_range = temp;
    }

    printf("Prime numbers between %d and %d are:\n", start_range, end_range);
    for (int i = start_range; i <= end_range; i++) {
        if (isPrime(i)) {
            printf("%d ", i);
        }
    }
    printf("\n");
}

// =================================================================================================
// HOMEWORK SET 5
// =================================================================================================

int sumOfDigits(int num) {
    int sum = 0;
    if (num < 0) {
        num = -num; // Handle negative numbers by taking absolute value
    }
    while (num > 0) {
        sum += num % 10;
        num /= 10;
    }
    // If input was 0, sum remains 0, which is correct
    return sum;
}

double findSquareRoot(double num) {
    if (num < 0) {
        printf("Error: Cannot calculate square root of a negative number.\n");
        return -1.0; // Indicate error
    }
    return sqrt(num);
}

void checkTemperature(float temp) {
    if (temp < 20.0) {
        printf("Cold\n");
    } else {
        printf("Hot\n");
    }
}

double customPow(double base, int exponent) {
    double result = 1.0;
    if (exponent >= 0) {
        for (int i = 0; i < exponent; i++) {
            result *= base;
        }
    } else { // Handle negative exponents
        for (int i = 0; i < -exponent; i++) {
            result *= base;
        }
        result = 1.0 / result;
    }
    return result;
}

void homeworkSet5() {
    printf("\n====================================\n");
    printf("    HOMEWORK SET 5 - SOLUTIONS\n");
    printf("====================================\n");

    // 5a. Sum of digits
    printf("\n--- 5a. Sum of Digits ---\n");
    int num_sod;
    printf("Enter an integer for sum of digits: ");
    scanf("%d", &num_sod);
    printf("Sum of digits of %d is: %d\n", num_sod, sumOfDigits(num_sod));

    // 5b. Square root
    printf("\n--- 5b. Square Root ---\n");
    double num_sqrt;
    printf("Enter a non-negative number for square root: ");
    scanf("%lf", &num_sqrt);
    double sqrt_result = findSquareRoot(num_sqrt);
    if (sqrt_result != -1.0) { // Only print if no error occurred
        printf("Square root of %.2lf is: %.2lf\n", num_sqrt, sqrt_result);
    }

    // 5c. Hot or Cold
    printf("\n--- 5c. Hot or Cold Temperature ---\n");
    float currentTemp;
    printf("Enter the temperature in Celsius: ");
    scanf("%f", &currentTemp);
    checkTemperature(currentTemp);

    // 5d. Custom pow function
    printf("\n--- 5d. Custom Power Function ---\n");
    double base_pow;
    int exponent_pow;
    printf("Enter the base number: ");
    scanf("%lf", &base_pow);
    printf("Enter the integer exponent: ");
    scanf("%d", &exponent_pow);
    printf("%.2lf raised to the power of %d is: %.2lf\n", base_pow, exponent_pow, customPow(base_pow, exponent_pow));
}

// =================================================================================================
// HOMEWORK SET 6
// =================================================================================================

void homeworkSet6() {
    printf("\n====================================\n");
    printf("    HOMEWORK SET 6 - SOLUTIONS\n");
    printf("====================================\n");

    // 6a. Maximum of two numbers using pointers
    printf("\n--- 6a. Max of Two Numbers (Pointers) ---\n");
    int num1_ptr, num2_ptr;
    int *ptr1, *ptr2;

    printf("Enter the first number: ");
    scanf("%d", &num1_ptr);
    printf("Enter the second number: ");
    scanf("%d", &num2_ptr);

    ptr1 = &num1_ptr;
    ptr2 = &num2_ptr;

    if (*ptr1 > *ptr2) {
        printf("The maximum number is: %d\n", *ptr1);
    } else if (*ptr2 > *ptr1) {
        printf("The maximum number is: %d\n", *ptr2);
    } else {
        printf("Both numbers are equal: %d\n", *ptr1);
    }

    // 6b. Print array elements in reverse order
    printf("\n--- 6b. Array in Reverse Order (Pointers) ---\n");
    int arr_rev[] = {10, 20, 30, 40, 50};
    int n_arr_rev = sizeof(arr_rev) / sizeof(arr_rev[0]);
    int *ptr_arr_rev = arr_rev; // Pointer points to the first element of the array

    printf("Original array elements: ");
    for (int i = 0; i < n_arr_rev; i++) {
        printf("%d ", *(ptr_arr_rev + i)); // Accessing elements using pointer arithmetic
    }
    printf("\n");

    printf("Array elements in reverse order: ");
    for (int i = n_arr_rev - 1; i >= 0; i--) {
        printf("%d ", *(ptr_arr_rev + i)); // Accessing elements in reverse using pointer arithmetic
    }
    printf("\n");

    // 6c. Print English alphabet using a pointer
    printf("\n--- 6c. English Alphabet (Pointers) ---\n");
    char alphabet[27]; // 26 letters + 1 for null terminator
    char *ptr_alphabet = alphabet;
    int i_alpha;

    for (i_alpha = 0; i_alpha < 26; i_alpha++) {
        *(ptr_alphabet + i_alpha) = 'A' + i_alpha; // Fill array with uppercase letters
    }
    *(ptr_alphabet + i_alpha) = '\0'; // Null-terminate the string

    printf("English Alphabet (Uppercase): ");
    for (int i = 0; i < 26; i++) { // Changed loop variable to 'i' instead of 'i_alpha' for consistency
        printf("%c ", *(ptr_alphabet + i)); // Print character by character
    }
    printf("\n");
    printf("English Alphabet (as string): %s\n", ptr_alphabet); // Print as a string
}

// =================================================================================================
// HOMEWORK SET 7
// =================================================================================================

void homeworkSet7() {
    printf("\n====================================\n");
    printf("    HOMEWORK SET 7 - SOLUTIONS\n");
    printf("====================================\n");

    // 7a. Find occurrences of a number 'x' in an array
    printf("\n--- 7a. Occurrences of a Number in Array ---\n");
    int arr_occur[] = {1, 5, 2, 8, 5, 3, 5, 9, 0, 5};
    int n_occur = sizeof(arr_occur) / sizeof(arr_occur[0]);
    int x_search;
    int count_occur = 0;

    printf("Enter the number to find its occurrences: ");
    scanf("%d", &x_search);

    for (int i = 0; i < n_occur; i++) {
        if (arr_occur[i] == x_search) {
            count_occur++;
        }
    }
    printf("The number %d occurs %d times in the array.\n", x_search, count_occur);

    // 7b. Print the largest number in an array
    printf("\n--- 7b. Largest Number in Array ---\n");
    int arr_largest[] = {12, 45, 1, 78, 34, 99, 23};
    int n_largest = sizeof(arr_largest) / sizeof(arr_largest[0]);
    int largest_num;

    if (n_largest > 0) {
        largest_num = arr_largest[0]; // Assume first element is largest
        for (int i = 1; i < n_largest; i++) {
            if (arr_largest[i] > largest_num) {
                largest_num = arr_largest[i]; // Update if a larger element is found
            }
        }
        printf("The largest number in the array is: %d\n", largest_num);
    } else {
        printf("The array is empty.\n");
    }

    // 7c. Insert an element at the end of an array
    printf("\n--- 7c. Insert Element at End of Array ---\n");
    // Define a fixed-size array, and track current elements
    int arr_insert[10] = {10, 20, 30, 40, 50};
    int current_size_insert = 5; // Current number of elements
    int element_to_insert = 60;

    printf("Original array elements: ");
    for (int i = 0; i < current_size_insert; i++) {
        printf("%d ", arr_insert[i]);
    }
    printf("\n");

    // Check if there is space in the array
    if (current_size_insert < (sizeof(arr_insert) / sizeof(arr_insert[0]))) {
        arr_insert[current_size_insert] = element_to_insert; // Insert at the next available index
        current_size_insert++; // Increment the current size
        printf("Element %d inserted successfully at the end.\n", element_to_insert);

        printf("Array after insertion: ");
        for (int i = 0; i < current_size_insert; i++) {
            printf("%d ", arr_insert[i]);
        }
        printf("\n");
    } else {
        printf("Array is full, cannot insert element.\n");
    }
}

// =================================================================================================
// HOMEWORK SET 8
// =================================================================================================

void homeworkSet8() {
    printf("\n====================================\n");
    printf("    HOMEWORK SET 8 - SOLUTIONS\n");
    printf("====================================\n");

    // Clear input buffer from previous scanf calls before reading strings with fgets
    while (getchar() != '\n');

    // 8a. Convert lowercase vowels to uppercase
    printf("\n--- 8a. Convert Lowercase Vowels to Uppercase ---\n");
    char str_vowels[100];
    printf("Enter a string: ");
    fgets(str_vowels, sizeof(str_vowels), stdin);
    str_vowels[strcspn(str_vowels, "\n")] = 0; // Remove trailing newline

    printf("Original string: %s\n", str_vowels);
    for (int i = 0; str_vowels[i] != '\0'; i++) {
        if (str_vowels[i] == 'a' || str_vowels[i] == 'e' || str_vowels[i] == 'i' ||
            str_vowels[i] == 'o' || str_vowels[i] == 'u') {
            str_vowels[i] = toupper(str_vowels[i]);
        }
    }
    printf("String after conversion: %s\n", str_vowels);

    // 8b. Highest frequency character in a string
    printf("\n--- 8b. Highest Frequency Character ---\n");
    char str_freq[100];
    int freq[256] = {0}; // Array to store frequency of each character (ASCII values)
    int max_freq = 0;
    char max_char = '\0';

    printf("Enter a string: ");
    fgets(str_freq, sizeof(str_freq), stdin);
    str_freq[strcspn(str_freq, "\n")] = 0; // Remove trailing newline

    // Count frequency of each character
    for (int i = 0; str_freq[i] != '\0'; i++) {
        freq[(unsigned char)str_freq[i]]++;
    }

    // Find character with highest frequency
    for (int i = 0; i < 256; i++) {
        if (freq[i] > max_freq) {
            max_freq = freq[i];
            max_char = (char)i;
        }
    }
    if (max_char != '\0') { // Check if string was not empty
        printf("The highest frequency character is '%c' with frequency %d.\n", max_char, max_freq);
    } else {
        printf("The string is empty.\n");
    }

    // 8c. Remove blank spaces in a string
    printf("\n--- 8c. Remove Blank Spaces ---\n");
    char str_space[100];
    char new_str_space[100]; // To store the string without spaces
    int j_space = 0; // Index for new_str_space

    printf("Enter a string: ");
    fgets(str_space, sizeof(str_space), stdin);
    str_space[strcspn(str_space, "\n")] = 0; // Remove trailing newline

    printf("Original string: \"%s\"\n", str_space);
    for (int i = 0; str_space[i] != '\0'; i++) {
        if (str_space[i] != ' ') { // If character is not a space
            new_str_space[j_space] = str_space[i];
            j_space++;
        }
    }
    new_str_space[j_space] = '\0'; // Null-terminate the new string
    printf("String after removing spaces: \"%s\"\n", new_str_space);

    // 8d. Replace lowercase with uppercase & vice versa
    printf("\n--- 8d. Toggle Case in String ---\n");
    char str_toggle[100];
    printf("Enter a string: ");
    fgets(str_toggle, sizeof(str_toggle), stdin);
    str_toggle[strcspn(str_toggle, "\n")] = 0; // Remove trailing newline

    printf("Original string: %s\n", str_toggle);
    for (int i = 0; str_toggle[i] != '\0'; i++) {
        if (islower(str_toggle[i])) {
            str_toggle[i] = toupper(str_toggle[i]);
        } else if (isupper(str_toggle[i])) {
            str_toggle[i] = tolower(str_toggle[i]);
        }
    }
    printf("String after case toggling: %s\n", str_toggle);
}

// =================================================================================================
// HOMEWORK SET 9
// =================================================================================================

// Structure definition for Student
typedef struct {
    int student_id;
    char name[50];
    char course[30];
    int year;
    int marks; // This field is crucial for Homework Set 10c
    float cgpa;
} Student;

// Structure definition for Teacher
typedef struct {
    int teacher_id;
    char name[50];
    char department[30];
    char subject_taught[50];
    float salary;
} Teacher;

// Structure definition for Staff
typedef struct {
    int staff_id;
    char name[50];
    char role[30];
    char department[30];
    float salary;
} Staff;

// Function to display Student details
void displayStudent(Student s) {
    printf("\n--- Student Details ---\n");
    printf("ID: %d\n", s.student_id);
    printf("Name: %s\n", s.name);
    printf("Course: %s\n", s.course);
    printf("Year: %d\n", s.year);
    printf("Marks: %d\n", s.marks);
    printf("CGPA: %.2f\n", s.cgpa);
}

// Function to display Teacher details
void displayTeacher(Teacher t) {
    printf("\n--- Teacher Details ---\n");
    printf("ID: %d\n", t.teacher_id);
    printf("Name: %s\n", t.name);
    printf("Department: %s\n", t.department);
    printf("Subject Taught: %s\n", t.subject_taught);
    printf("Salary: %.2f\n", t.salary);
}

// Function to display Staff details
void displayStaff(Staff st) {
    printf("\n--- Staff Details ---\n");
    printf("ID: %d\n", st.staff_id);
    printf("Name: %s\n", st.name);
    printf("Role: %s\n", st.role);
    printf("Department: %s\n", st.department);
    printf("Salary: %.2f\n", st.salary);
}

void homeworkSet9() {
    printf("\n====================================\n");
    printf("    HOMEWORK SET 9 - SOLUTIONS\n");
    printf("====================================\n");
    printf("\n--- College Information System (Structures) ---\n");
    printf("This is a basic structure setup for a college information system.\n");
    printf("For a full 'C Project,' you would expand this significantly with functions for\n");
    printf("adding, displaying, searching, updating, and deleting records, saving/loading data\n");
    printf("to/from files, and implementing specific functionalities like CGPA calculation or attendance tracking.\n");

    // Create and initialize a Student structure variable
    Student student1;
    student1.student_id = 1001;
    strcpy(student1.name, "Alice Smith");
    strcpy(student1.course, "Computer Science");
    student1.year = 3;
    student1.marks = 90;
    student1.cgpa = 8.75;

    // Create and initialize a Teacher structure variable
    Teacher teacher1;
    teacher1.teacher_id = 201;
    strcpy(teacher1.name, "Dr. John Doe");
    strcpy(teacher1.department, "Computer Science");
    strcpy(teacher1.subject_taught, "Data Structures");
    teacher1.salary = 75000.00;

    // Create and initialize a Staff structure variable
    Staff staff1;
    staff1.staff_id = 305;
    strcpy(staff1.name, "Ms. Jane Brown");
    strcpy(staff1.role, "Librarian");
    strcpy(staff1.department, "Library");
    staff1.salary = 45000.00;

    // Display details of the created structures
    displayStudent(student1);
    displayTeacher(teacher1);
    displayStaff(staff1);

    printf("\nFurther enhancements for a C Project would include:\n");
    printf("1. Arrays of structures to store multiple records.\n");
    printf("2. Functions for CRUD operations (Create, Read, Update, Delete).\n");
    printf("3. File I/O for persistent data storage.\n");
    printf("4. A menu-driven interface for user interaction.\n");
    printf("5. Search and filter functionalities.\n");
    printf("6. Specific calculations like CGPA, attendance percentage, payroll.\n");
}

// =================================================================================================
// HOMEWORK SET 10
// =================================================================================================

// Function to count vowels in a string
int countVowels(const char *str) {
    int count = 0;
    for (int i = 0; str[i] != '\0'; i++) {
        char ch = tolower(str[i]); // Convert to lowercase for consistent checking
        if (ch == 'a' || ch == 'e' || ch == 'i' || ch == 'o' || ch == 'u') {
            count++;
        }
    }
    return count;
}

void homeworkSet10() {
    printf("\n====================================\n");
    printf("    HOMEWORK SET 10 - SOLUTIONS\n");
    printf("====================================\n");

    // 10a. Read string from file
    printf("\n--- 10a. Read String from File ---\n");
    FILE *file_ptr_10a;
    char buffer_10a[100];
    const char *filename_10a = "my_string_data.txt";

    // Create a dummy file for demonstration
    file_ptr_10a = fopen(filename_10a, "w");
    if (file_ptr_10a == NULL) {
        perror("Error creating file for 10a initial setup");
        return;
    }
    fprintf(file_ptr_10a, "Hello, this is a test string from the file.");
    fclose(file_ptr_10a);
    printf("Dummy file '%s' created for 10a.\n", filename_10a);

    // Open the file for reading
    file_ptr_10a = fopen(filename_10a, "r");
    if (file_ptr_10a == NULL) {
        perror("Error opening file for reading (10a)");
        return;
    }

    printf("\nReading string from file '%s':\n", filename_10a);
    // Read content from the file
    if (fgets(buffer_10a, sizeof(buffer_10a), file_ptr_10a) != NULL) {
        printf("Content from file: %s\n", buffer_10a);
    } else {
        printf("Could not read string from file (file might be empty).\n");
    }
    fclose(file_ptr_10a);

    // 10b. Replace file data with number of vowels
    printf("\n--- 10b. Replace File with Vowel Count ---\n");
    FILE *file_ptr_10b;
    char buffer_10b[100];
    const char *filename_10b = "my_string_data.txt";

    // Re-create the dummy file with new content for 10b
    file_ptr_10b = fopen(filename_10b, "w");
    if (file_ptr_10b == NULL) {
        perror("Error creating/opening file for write (10b initial setup)");
        return;
    }
    fprintf(file_ptr_10b, "This is a sample string for vowel counting.");
    fclose(file_ptr_10b);
    printf("Dummy file '%s' re-created for 10b.\n", filename_10b);

    // Read the content to count vowels
    file_ptr_10b = fopen(filename_10b, "r");
    if (file_ptr_10b == NULL) {
        perror("Error opening file for reading (10b)");
        return;
    }
    if (fgets(buffer_10b, sizeof(buffer_10b), file_ptr_10b) == NULL) {
        printf("Could not read string from file (file might be empty for 10b).\n");
        fclose(file_ptr_10b);
        return;
    }
    fclose(file_ptr_10b);

    buffer_10b[strcspn(buffer_10b, "\n")] = 0; // Remove trailing newline

    printf("\nOriginal content read from '%s': \"%s\"\n", filename_10b, buffer_10b);

    int vowel_count = countVowels(buffer_10b);
    printf("Number of vowels in the string: %d\n", vowel_count);

    // Open the file in write mode to overwrite its content
    file_ptr_10b = fopen(filename_10b, "w");
    if (file_ptr_10b == NULL) {
        perror("Error opening file for writing (10b)");
        return;
    }

    fprintf(file_ptr_10b, "%d", vowel_count); // Write only the vowel count
    printf("File '%s' overwritten with vowel count: %d\n", filename_10b, vowel_count);
    fclose(file_ptr_10b);

    // 10c. Format student information in a file
    printf("\n--- 10c. Format Student Data to File ---\n");
    FILE *file_ptr_10c;
    const char *filename_10c = "student_data.txt";

    // Sample student data
    Student students_10c[5];
    strcpy(students_10c[0].name, "Alice"); students_10c[0].marks = 85; students_10c[0].cgpa = 8.2; strcpy(students_10c[0].course, "CS");
    strcpy(students_10c[1].name, "Bob"); students_10c[1].marks = 78; students_10c[1].cgpa = 7.5; strcpy(students_10c[1].course, "EE");
    strcpy(students_10c[2].name, "Charlie"); students_10c[2].marks = 92; students_10c[2].cgpa = 9.1; strcpy(students_10c[2].course, "ME");
    strcpy(students_10c[3].name, "Diana"); students_10c[3].marks = 70; students_10c[3].cgpa = 6.9; strcpy(students_10c[3].course, "CE");
    strcpy(students_10c[4].name, "Eve"); students_10c[4].marks = 95; students_10c[4].cgpa = 9.5; strcpy(students_10c[4].course, "CS");

    // Open file for writing student data
    file_ptr_10c = fopen(filename_10c, "w");
    if (file_ptr_10c == NULL) {
        perror("Error opening file for writing (10c)");
        return;
    }

    // Write header
    fprintf(file_ptr_10c, "%-15s %-10s %-10s %-15s\n", "Name", "Marks", "CGPA", "Course");
    fprintf(file_ptr_10c, "---------------------------------------------------\n");

    // Write student records
    for (int i = 0; i < 5; i++) {
        fprintf(file_ptr_10c, "%-15s %-10d %-10.2f %-15s\n",
                students_10c[i].name, students_10c[i].marks, students_10c[i].cgpa, students_10c[i].course);
    }
    fclose(file_ptr_10c);
    printf("Student data has been written to '%s' in a table-like format.\n", filename_10c);

    printf("\n--- Content of '%s' ---\n", filename_10c);
    // Open file for reading to display its content
    file_ptr_10c = fopen(filename_10c, "r");
    if (file_ptr_10c == NULL) {
        perror("Error opening file for reading verification (10c)");
        return;
    }
    char ch;
    while ((ch = fgetc(file_ptr_10c)) != EOF) {
        putchar(ch);
    }
    fclose(file_ptr_10c);
    printf("-------------------------\n");
}

// =================================================================================================
// HOMEWORK SET 11
// =================================================================================================

void homeworkSet11() {
    printf("\n====================================\n");
    printf("    HOMEWORK SET 11 - SOLUTIONS\n");
    printf("====================================\n");

    // 11a. What is a 'dangling pointer' in C.
    printf("\n--- 11a. What is a Dangling Pointer? ---\n");
    printf("A **dangling pointer** is a pointer that points to a memory location that has been\n");
    printf("deallocated (freed) or no longer exists. When the memory pointed to by a pointer\n");
    printf("is freed, the pointer still holds the address of that deallocated memory. If this\n");
    printf("dangling pointer is then dereferenced (used to access the memory it points to), it\n");
    printf("can lead to undefined behavior, including crashing the program, corrupting data, or\n");
    printf("security vulnerabilities.\n\n");
    printf("Common scenarios:\n");
    printf("1. Deallocating Memory: `free(ptr);` but `ptr` is not set to `NULL`.\n");
    printf("2. Returning Address of Local Variable: Local variables on stack are deallocated on function exit.\n");
    printf("3. Variable Going Out of Scope: Pointer points to memory of a variable that exited its scope.\n\n");
    printf("Prevention: Always set pointers to `NULL` after `free()`, avoid returning addresses\n");
    printf("of local variables, and be mindful of variable scope.\n");

    // 11b. Allocate memory for 500 integers using calloc & store natural numbers.
    printf("\n--- 11b. Calloc for 500 Integers ---\n");
    int *ptr_calloc;
    int num_elements_calloc = 500;

    // Allocate memory and initialize to zero
    ptr_calloc = (int *)calloc(num_elements_calloc, sizeof(int));

    if (ptr_calloc == NULL) {
        printf("Memory allocation failed for 11b!\n");
        return; // Exit if allocation fails
    }

    printf("Memory allocated successfully for %d integers using calloc.\n", num_elements_calloc);

    // Store natural numbers (1 to 500)
    for (int i = 0; i < num_elements_calloc; i++) {
        ptr_calloc[i] = i + 1;
    }

    // Print first 10 elements
    printf("First 10 natural numbers stored: ");
    for (int i = 0; i < 10; i++) {
        printf("%d ", ptr_calloc[i]);
    }
    printf("\n");

    // Print last 10 elements
    printf("Last 10 natural numbers stored: ");
    for (int i = num_elements_calloc - 10; i < num_elements_calloc; i++) {
        printf("%d ", ptr_calloc[i]);
    }
    printf("\n");

    free(ptr_calloc); // Free the allocated memory
    ptr_calloc = NULL; // Set pointer to NULL to avoid dangling pointer
    printf("Allocated memory freed successfully.\n");

    // 11c. What is 'memory leak' in C.
    printf("\n--- 11c. What is a Memory Leak? ---\n");
    printf("A **memory leak** occurs in C when a program allocates memory dynamically\n");
    printf("(using functions like `malloc()`, `calloc()`, `realloc()`) but fails to\n");
    printf("deallocate that memory when it is no longer needed (using `free()`).\n\n");
    printf("This 'leaked' memory remains reserved by the program, even though it's\n");
    printf("inaccessible and unusable. Over time, this can lead to reduced system\n");
    printf("performance, program crashes, and system instability.\n\n");
    printf("Common causes: Forgetting to call `free()`, losing the pointer to allocated\n");
    printf("memory, or improper handling of multiple exit points in functions.\n");
    printf("Prevention: Always pair `malloc`/`calloc` with `free()`, and use memory\n");
    printf("leak detection tools like Valgrind.\n");

    // 11d. Which is better malloc() or calloc().
    printf("\n--- 11d. malloc() vs. calloc() ---\n");
    printf("Neither `malloc()` nor `calloc()` is inherently 'better'; their suitability\n");
    printf("depends on the specific requirements of your program.\n\n");
    printf("`malloc()`:\n");
    printf("- **Syntax:** `void* malloc(size_t size);`\n");
    printf("- **Purpose:** Allocates a block of memory of `size` bytes.\n");
    printf("- **Initialization:** Does **not initialize** (contains garbage values).\n");
    printf("- **Speed:** Generally **faster** as it skips initialization.\n");
    printf("- **Use Case:** When you need raw memory and don't care about initial values,\n");
    printf("  or will initialize it yourself immediately.\n\n");
    printf("`calloc()`:\n");
    printf("- **Syntax:** `void* calloc(size_t num, size_t size);`\n");
    printf("- **Purpose:** Allocates memory for `num` elements, each of `size` bytes,\n");
    printf("  and **initializes all bytes to zero**.\n");
    printf("- **Initialization:** **Initializes all bytes to zero**.\n");
    printf("- **Speed:** Generally **slower** due to initialization overhead.\n");
    printf("- **Use Case:** When you need an array of elements and want them all initialized\n");
    printf("  to zero (e.g., counters, flags, string buffers). It also handles potential\n");
    printf("  integer overflow in size calculation.\n\n");
    printf("In summary:\n");
    printf("- Use `malloc()` for raw, uninitialized memory where performance is critical or\n");
    printf("  you'll handle initialization.\n");
    printf("- Use `calloc()` for zero-initialized memory, especially for arrays, where safety\n");
    printf("  and clear defaults are important.\n");
}

// =================================================================================================
// MAIN FUNCTION TO RUN ALL HOMEWORK SETS
// =================================================================================================

int main() {
    homeworkSet1();
    homeworkSet2();
    homeworkSet3();
    homeworkSet4();
    homeworkSet5();
    homeworkSet6();
    homeworkSet7();
    homeworkSet8();
    homeworkSet9();
    homeworkSet10();
    homeworkSet11();

    printf("\n\nAll homework sets executed. Press Enter to exit...\n");
    // Clear any leftover characters in the input buffer, then wait for a single Enter key press.
    int c;
    while ((c = getchar()) != '\n' && c != EOF); // Clear buffer
    getchar(); // Wait for user to press Enter

    return 0;
}
