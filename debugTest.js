class Car {  
  constructor(name) {
    this.name = name; //initialize
  }
  
  printName() {
    console.log("Car name: " + this.name);
  }

  printAssembly() {
    console.log("The Tesla Car finishes assembly every Friday at 5pm.");
  }
}

class TeslaCar extends Car {
  //need to call constructor of parent class
  constructor(name) {
    super(name);
  }

  // Add report format argument for generating reports in different formats
  generateAssemblyReports(reportFormat) { 
    console.log("Generating assembly reports...");
    console.log(`Exporting ${reportFormat} format reports...`); //dynamic formatting
    console.log("Printing reports...");
  }
}

// Driver code 
const myCar = new TeslaCar("Model_3");
myCar.printName(); 
myCar.generateAssemblyReports("CSV"); 