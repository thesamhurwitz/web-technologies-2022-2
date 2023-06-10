import {
  Pizza,
  PizzaSize,
  PizzaTopping,
  PizzaType,
  SIZES,
  TOPPINGS,
  TYPES,
} from './pizza'
import './style.css'

function renderTypes(element: HTMLDivElement, types: PizzaType[]) {
  element.innerHTML = ''
  types.forEach((type) => {
    const typeElement = document.createElement('div')
    typeElement.setAttribute(
      'class',
      'p-2 text-md rounded border border-gray-200 w-32 h-32 hover:shadow'
    )
    typeElement.innerHTML = `
          ${type.name}
      `
    typeElement.onclick = () => changeType(typeElement, type)

    element.appendChild(typeElement)
  })
}

function renderToppings(element: HTMLDivElement, toppings: PizzaTopping[]) {
  element.innerHTML = ''
  toppings.forEach((topping) => {
    const toppingElement = document.createElement('div')
    toppingElement.setAttribute('class', 'p-2 rounded-lg hover:bg-gray-100')
    toppingElement.innerHTML = `
        ${topping.name}
      `
    toppingElement.onclick = () => toggleTopping(toppingElement, topping)

    element.appendChild(toppingElement)
  })
}

function renderSizes(element: HTMLDivElement, sizes: PizzaSize[]) {
  element.innerHTML = ''
  sizes.forEach((size) => {
    const sizeElement = document.createElement('div')
    sizeElement.setAttribute(
      'class',
      'p-1 w-1/2 hover:bg-gray-100 rounded-full'
    )
    sizeElement.innerHTML = `
        ${size.name.toUpperCase()}
      `
    sizeElement.onclick = () => changeSize(sizeElement, size)

    element.appendChild(sizeElement)
  })
}

function selectType(container: HTMLDivElement, element: HTMLElement) {
  container.querySelectorAll('div').forEach((e) => {
    e.classList.remove('border-orange-400')
    e.classList.add('border-gray-200')
  })

  element.classList.remove('border-gray-200')
  element.classList.add('border-orange-400')
}

function selectSize(container: HTMLDivElement, element: HTMLElement) {
  container.querySelectorAll('div').forEach((e) => {
    e.classList.remove('bg-orange-300')
    e.classList.remove('hover:bg-orange-400')
    e.classList.add('hover:bg-gray-100')
  })

  element.classList.remove('hover:bg-gray-100')
  element.classList.add('bg-orange-300')
  element.classList.add('hover:bg-orange-400')
}

function selectTopping(element: HTMLElement) {
  if (element.classList.contains('bg-orange-300')) {
    element.classList.remove('hover:bg-orange-400')
    element.classList.remove('bg-orange-300')
    element.classList.add('hover:bg-gray-100')
  } else {
    element.classList.remove('hover:bg-gray-100')
    element.classList.add('bg-orange-300')
    element.classList.add('hover:bg-orange-400')
  }
}

function renderPrice(price: number, calories: number) {
  document.querySelector('#price-container')!.innerHTML = price.toFixed(2)
  document.querySelector('#calories-container')!.innerHTML = calories.toFixed(0)
}

renderTypes(
  document.querySelector<HTMLDivElement>('#pizza-types-container')!,
  TYPES
)
renderToppings(
  document.querySelector<HTMLDivElement>('#pizza-toppings-container')!,
  TOPPINGS
)
renderSizes(
  document.querySelector<HTMLDivElement>('#pizza-sizes-container')!,
  SIZES
)
selectType(
  document.querySelector<HTMLDivElement>('#pizza-types-container')!,
  document
    .querySelector<HTMLDivElement>('#pizza-types-container')!
    .querySelector('div')!
)
selectSize(
  document.querySelector<HTMLDivElement>('#pizza-sizes-container')!,
  document
    .querySelector<HTMLDivElement>('#pizza-sizes-container')!
    .querySelector('div')!
)

const pizza = new Pizza(TYPES[0], SIZES[0])

updatePrice()

function updatePrice() {
  renderPrice(pizza.calculatePrice(), pizza.calculateCalories())
}

function changeType(element: HTMLElement, type: PizzaType) {
  selectType(
    document.querySelector<HTMLDivElement>('#pizza-types-container')!,
    element
  )
  console.log('Change Type', type.name)
  pizza.setType(type)
  updatePrice()
}

function changeSize(element: HTMLElement, size: PizzaSize) {
  selectSize(
    document.querySelector<HTMLDivElement>('#pizza-sizes-container')!,
    element
  )
  console.log('Change Size', size.name)
  pizza.setSize(size)
  updatePrice()
}

function toggleTopping(element: HTMLElement, topping: PizzaTopping) {
  selectTopping(element)
  console.log('Toggle Topping', topping.name)

  if (pizza.getToppings().find((t) => t.name === topping.name)) {
    pizza.removeTopping(topping)
  } else {
    pizza.addTopping(topping)
  }

  updatePrice()
}
