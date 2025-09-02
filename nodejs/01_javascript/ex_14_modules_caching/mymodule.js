class Language{
    name;
    constructor(name){
        this.name = name;
    }
    // get and set fora variable name
    getName(){
        return this.name;
    }
    setName(name){
        this.name = name;
    }
}
// auto intialization -> 
module.exports = new Language("JavaScript");