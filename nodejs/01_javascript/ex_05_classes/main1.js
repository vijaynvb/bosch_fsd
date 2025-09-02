// inheritance 

/* class animal{
    speak()
}
class dog extends animal{
    speak() barking 
}
*/

// class Object{
//     toString(){

//     }
//     Prototype(){

//     }
//     bind(){

//     }
//     call(){

//     }
//     apply(){

//     }
// }

class Animal {
    constructor(name){
        this.name = name;
    }
    speak(){
        console.log(`${this.name} makes a noise`);
    }
    printName(){
        console.log(`${this.name}`);
    }
}

class Dog extends Animal{
    constructor(name){
        super(name); // varialb eis in animal class
    }
    speak(){ // overridden 
        console.log(`${this.name} barking`);
    }
}

const d = new Dog('sonie');
d.speak();
d.printName();

const a = new Animal();
console.log( a.toString());