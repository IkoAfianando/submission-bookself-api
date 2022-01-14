class FizBuzz {
    constructor(name) {
        this.name = name;
    }

    sayHello(name) {
        return `Hello ${name}, My Name is ${this.name}`;
    }
}

const fizzBuzz = new FizBuzz("Iko Afianando");
console.log(fizzBuzz.sayHello("Iko"));