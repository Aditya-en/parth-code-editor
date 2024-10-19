package main

import "fmt"

func isPrime(n int) bool {
    if n <= 1 {
        return false
    }
    for i := 2; i < n; i++ {
        if n%i == 0 {
            return false
        }
    }
    return true
}

func main() {
    fmt.Println("Prime numbers up to 100:")
    for n := 1; n <= 100; n++ {
        if isPrime(n) {
            fmt.Print(n, " ")
        }
    }
    fmt.Println()
}
