class PizzaType {
  constructor(name, price, calories) {
    this.name = name
    this.price = price
    this.calories = calories
  }
}

class PizzaSize {
  constructor(name, price, calories) {
    this.name = name
    this.price = price
    this.calories = calories
  }
}

class PizzaTopping {
  constructor(name, sizesPrices) {
    this.name = name
    this.sizesPrices = sizesPrices
  }
}

class Pizza {
  type = null
  size = null
  toppings = []

  constructor(type, size, toppings = []) {
    this.type = type
    this.size = size

    this.toppings = toppings
  }

  addTopping(topping) {
    this.toppings.push(topping)
  }

  removeTopping(topping) {
    this.toppings = this.toppings.filter((t) => t.name !== topping.name)
  }

  getToppings() {
    return this.toppings
  }

  getSize() {
    return this.size
  }

  getType() {
    return this.type
  }

  calculateCalories() {
    const toppingsCalories = this.toppings.reduce((sum, topping) => {
      return sum + topping.sizesPrices[this.size.name].calories
    }, 0)

    return this.size.calories + this.type.calories + toppingsCalories
  }

  calculatePrice() {
    const toppingsPrice = this.toppings.reduce((sum, topping) => {
      return sum + topping.sizesPrices[this.size.name].price
    }, 0)

    return this.size.price + this.type.price + toppingsPrice
  }
}

const MARGARITA_TYPE = new PizzaType('margarita', 500, 300)
const PEPPERONI_TYPE = new PizzaType('pepperoni ', 800, 400)
const BAVARIAN_TYPE = new PizzaType('bavarian', 700, 450)

const SMALL_SIZE = new PizzaSize('small', 100, 100)
const LARGE_SIZE = new PizzaSize('large', 200, 200)

const MOZZARELLA_TOPPING = new PizzaTopping('mozzarella', {
  small: {
    price: 20,
    calories: 50,
  },
  large: {
    price: 50,
    calories: 100,
  },
})
const CHEESE_CRUST_TOPPING = new PizzaTopping('cheeseCrust', {
  small: {
    price: 150,
    calories: 50,
  },
  large: {
    price: 300,
    calories: 150,
  },
})
const CHEDDARS_AND_PARMESAN_TOPPING = new PizzaTopping('cheddarsAndParmesan', {
  small: {
    price: 150,
    calories: 50,
  },
  large: {
    price: 300,
    calories: 150,
  },
})

const pizzaMargarita = new Pizza(MARGARITA_TYPE, SMALL_SIZE)
pizzaMargarita.addTopping(CHEESE_CRUST_TOPPING)
pizzaMargarita.addTopping(CHEDDARS_AND_PARMESAN_TOPPING)

console.log(`Type: ${pizzaMargarita.getType().name}`)
console.log(`Size: ${pizzaMargarita.getSize().name}`)
console.log(
  `Toppings: ${pizzaMargarita
    .getToppings()
    .map((t) => t.name)
    .join(', ')}`
)
console.log(`Price: ${pizzaMargarita.calculatePrice()}`)
console.log(`Calories: ${pizzaMargarita.calculateCalories()}`)
