// closure
// when an inner function can reference the state
// of an outer function, even after the outer
// function finishes executing

const getIdMaker = (id = 0) => {
  return () => ++id;
}

// const getId = getIdMaker();
// console.log(getId()); // 1
// console.log(getId()); // 2
// console.log(getId()); // 3

// const getId2 = getIdMaker();
// console.log(getId2()); // 1
// console.log(getId()); // 4
// console.log(getId2()); // 2



// Object Oriented Programming encapsulates data with functionality
const friendsManager = {
  friends: [],
  addFriend(newFriend) {
    this.friends.push(newFriend);
    // `this` refers to the "owner" of the method. 
  }
}
friendsManager.addFriend('gonzalo');
friendsManager.friends.push(42); // oops!

// console.log(friendsManager.friends);


const makeVehicle = (name, seats) => {
  const passengers = []; // The methods below form a closure around this variable

  return {
    name: name,
    seats,            // shorthand notation
    sound: 'vroom',   // a property with a default value
    addPassenger(passenger) {
      if (passengers.length >= this.seats) {
        return console.log('not enough room');
      };
      passengers.push(passenger);
    },
    getPassengers() {
      return [...passengers] // return a copy to keep passengers private
    },
    makeSound() {
      console.log(`${this.name} goes ${this.sound}`);
    }
  }
}

const myCar = makeVehicle('benmobile', 5);
// myCar.addPassenger('ben');
// myCar.addPassenger('gonzalo');
// // myCar.passengers.push('carmen'); // error: 
// const myPassengers = myCar.getPassengers(); // ['ben', 'gonzalo']

const batmansCar = makeVehicle('batmobile', 1);
// batmansCar.addPassenger('batman');
// batmansCar.addPassenger('catwoman'); // not enough room
// batmansCar.sound = 'ZOOOM'; // instance properties can be accessed/modified
// batmansCar.makeSound(); // batmobile goes ZOOOM


// Types of properties:
// private instance property
// private class property
// public instance property
// public class property

// Types of methods:
// private instance method
// private class method
// public instance method
// public class method
class User {
  #password;
  static allUsers = []

  constructor(name, email, password) {
    // what is this in a constructor?
    // the object (instance) that is being created
    this.name = name;
    this.email = email;

    this.#password = password;
    User.allUsers.push(this);
  }

  static getAllUsers() {
    return [...User.allUsers]
  }

  validatePassword(passwordToCheck) {
    return passwordToCheck === this.#password;
  }

  setPassword(newPassword) {
    this.#password = newPassword;
  }
}

const ben = new User('ben', 'ben@mail.com', 123);
// console.log(ben); // { name: 'ben', email: 'ben@mail.com' }

const carmen = new User('carmen', 'carmen@mail.com', 456);
const zo = new User('zo', 'zo@mail.com', 789);

// console.log(User.getAllUsers()); // [ User { }, User {}, User {} ]

// ben.password = 'blah';    // this won't affect the private #password property
// console.log(ben.validatePassword('blah')); // false
// ben.setPassword = 'blah'; // this will
// console.log(ben.validatePassword('blah')); // true



const getId = getIdMaker();

class Book {
  #id = getId();

  constructor(title, author, genre) {
    this.title = title;
    this.author = author;
    this.genre = genre;
  }

  getId() {
    return this.#id;
  }
}

class Library {
  #books = [];

  static #allLibraries = []
  constructor(name, address) {
    this.name = name;
    this.address = address;

    Library.#allLibraries.push(this);
  }
  addBook(title, author, genre) {
    const addedBook = new Book(title, author, genre);
    this.#books.push(addedBook);
    return addedBook;
  }
  listBooks() {
    return [...this.#books];
  }
  removeBook(id) {
    this.#books.splice(this.#books.findIndex((book) => book.getId() === id), 1);
  }

  static list() {
    return [...Library.#allLibraries];
  }
}

const cityLibrary = new Library('City Library', '123 Main St');

// Adding books to the library
cityLibrary.addBook('The Great Gatsby', 'F. Scott Fitzgerald', 'Classic');
cityLibrary.addBook('To Kill a Mockingbird', 'Harper Lee', 'Fiction');
cityLibrary.addBook('1984', 'George Orwell', 'Dystopian');

// Listing all books
console.log(cityLibrary.listBooks());

// Removing a book by ID
cityLibrary.removeBook(2);

// Listing books after removal
console.log(cityLibrary.listBooks())

const privateLibrary = new Library('My Library', 'My home');
console.log(Library.list());
// [
//   Library { name: 'City Library', address: '123 Main St' },
//   Library { name: 'My Library', address: 'My home' }
// ]