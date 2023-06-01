function printNumberDivisibility(n) {
    if (n % 5 === 0 && n % 7 === 0) {
        console.log("Hello World");
    } else if (n % 5 === 0) {
        console.log("Hello");
    } else if (n % 7 === 0) {
        console.log("World");
    } else {
        console.log(n);
    }
}
printNumberDivisibility(35);