#include <iostream>
using namespace std;

bool isPrime(int n) {
    if (n <= 1) return false;  // 0 and 1 are not prime numbers
    for (int i = 2; i * i <= n; i++) {
        if (n % i == 0) return false;  // If divisible, not prime
    }
    return true;  // If not divisible by any number, it's prime
}

int main() {
    cout << "Prime numbers up to 100 are: " << endl;
    
    for (int i = 2; i <= 100; i++) {
        if (isPrime(i)) {
            cout << i << " ";
        }
    }
    
    cout << endl;
    return 0;
}
