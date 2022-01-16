class FizzBuzz{
    constructor(name) {
        this.name = name;
    }

    fizzBuzz(data) {
        for(let i = 1; i <= data; i++) {
            const data1 = i % 3 === 0 && i % 5 === 0;
            const data2 = i % 3 === 0;
            const data3 = i % 5 === 0;
            if(data1) {
                console.log(`FizzBuzz ${i}`);
            }else if(data2) {
                console.log(`Fizz ${i}`);
            }else if(data3) {
                console.log(`Buzz ${i}`);
            }else {
                console.log(i);
            }
        }
    }

    sayHello(name) {
        return `Hello ${name}, My Name is ${this.name} `;
    }

    factorial(value) {
        if(value <= 0) {
            return 1;
        }

        let result = 1;
        for(let i = 1; i <= value; i++) {
            result *= 1;
        }
        return result
    }

    factorialRecursive(value) {
        if(value <= 0) {
            return 1;
        }else {
            return value * this.factorialRecursive(value - 1);
        }
    }

    factorialTailRecursive(total, value) {
        if(value <= 0) {
            return total;
        }else {
            return this.factorialTailRecursive(total * value, value - 1);
        }
    }
}

const fizzBuzz = new FizzBuzz("Iko Afianando");
console.log(fizzBuzz.factorialTailRecursive(1, 5));
console.log(fizzBuzz.factorialRecursive(5));
console.log(fizzBuzz.factorial(5));
console.log(fizzBuzz.sayHello("Joko"));
fizzBuzz.fizzBuzz(100);