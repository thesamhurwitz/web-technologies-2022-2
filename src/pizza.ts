export class PizzaType {
  public readonly name: string
  public readonly price: number
  public readonly calories: number

  constructor(name: string, price: number, calories: number) {
    this.name = name
    this.price = price
    this.calories = calories
  }
}

export class PizzaSize {
  public readonly name: string
  public readonly price: number
  public readonly calories: number

  constructor(name: string, price: number, calories: number) {
    this.name = name
    this.price = price
    this.calories = calories
  }
}

interface PriceCalories {
  readonly price: number
  readonly calories: number
}

export class PizzaTopping {
  public readonly name: string
  public readonly sizesPrices: Record<string, PriceCalories>

  constructor(name: string, sizesPrices: Record<string, PriceCalories>) {
    this.name = name
    this.sizesPrices = sizesPrices
  }
}

export class Pizza {
  private type: PizzaType
  private size: PizzaSize
  private toppings: PizzaTopping[]

  constructor(type: PizzaType, size: PizzaSize, toppings: PizzaTopping[] = []) {
    this.type = type
    this.size = size

    this.toppings = toppings
  }

  setSize(size: PizzaSize) {
    this.size = size
  }

  setType(type: PizzaType) {
    this.type = type
  }

  getSize() {
    return this.size
  }

  getType() {
    return this.type
  }

  addTopping(topping: PizzaTopping) {
    this.toppings.push(topping)
  }

  removeTopping(topping: PizzaTopping) {
    this.toppings = this.toppings.filter((t) => t.name !== topping.name)
  }

  getToppings() {
    return this.toppings
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

export const TYPES = [MARGARITA_TYPE, PEPPERONI_TYPE, BAVARIAN_TYPE]

const SMALL_SIZE = new PizzaSize('small', 100, 100)
const LARGE_SIZE = new PizzaSize('large', 200, 200)

export const SIZES = [SMALL_SIZE, LARGE_SIZE]

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

export const TOPPINGS = [
  MOZZARELLA_TOPPING,
  CHEESE_CRUST_TOPPING,
  CHEDDARS_AND_PARMESAN_TOPPING,
]
