/*
#include <stdio.h> 
int main() {
    printf("Enter number you want multiplication table of: ");
    int n;
    scanf("%d", &n);

    for (int i = 1; i <= 10; i++) {// here i++ means i= i + 1
        printf("%d x %d = %d\n", n, i, n * i);
    }

    return 0; 
} 
*/
//code to check if a person is a minor, adult, or senior citizen based on their age
#include <stdio.h>
int main() {
    int age;
    printf("Enter your age: ");
    scanf("%d", &age);
    if (age < 18) {
        printf("You are a minor.\n");
    } else if (age >= 18 && age < 65) {
        printf("You are an adult.\n");
    }
}