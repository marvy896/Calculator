class Calculator {
    constructor(previousOperandTextElement, currentOperandTextElement, displayResultElement) {
        this.previousOperandTextElement = previousOperandTextElement
        this.currentOperandTextElement = currentOperandTextElement
        //new
        this.displayResultElement= displayResultElement;
        this.displayResult = [] 
        this.clear()
    }
    clear() {
        this.currentOperand = ' '
        this.previousOperand = ' '
        this.operation = undefined
    }
    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1)
    }
    appendNumber(number) {
        if (number === '.' && this.currentOperand.includes('.')) return
        this.currentOperand = this.currentOperand.toString() + number.toString()
    }
    chooseOperation(operation) {
        if (this.currentOperand === '') return
        if (this.previousOperand !== '') {
            this.compute()
        }
        this.operation = operation
        this.previousOperand = this.currentOperand
        this.currentOperand = ''
    }
    compute() {
        let computation
        const prev = parseFloat(this.previousOperand)
        const current = parseFloat(this.currentOperand)
        if (isNaN(prev) || isNaN(current)) return
        switch (this.operation) {
            case '+':
                computation = prev + current
                break
            case '-':
                computation = prev - current
                break
            case '*':
                computation = prev * current
                break
            case '/':
                computation = prev / current
                break
            default:
                return
        }
        computation = + computation.toLocaleString('en',
            { maximumFractionDigits: 3,useGrouping:false})
        this.currentOperand = computation
        this.displayResult.push(`${prev.toLocaleString('en')} ${this.operation} 
        ${current.toLocaleString('en')} = ${computation.toLocaleString('en')}`) 
            if(this.displayResult.length > 10) this.displayResult.shift();
        this.operation = undefined
        this.previousOperand = ''   
    }
    getDisplayNumber(number) { console.log(number)
        const stringNumber = number.toString()
        const integerDigits = parseFloat (stringNumber.split(".")[0])
        const decimalDigits = stringNumber.split(".")[1]
        let integerDisplay
        if (isNaN(integerDigits)) {
            integerDisplay = ''
        } else {
            integerDisplay = integerDigits.toLocaleString('en', {
                maximumFractionDigits: 0})
        }
    if (decimalDigits != null) {
        return `${integerDisplay}.${decimalDigits}`
    } else {
        return integerDisplay
    }
    }
    UpdateDisplay() {
        this.currentOperandTextElement.innerText =
            this.getDisplayNumber(this.currentOperand)
        if (this.operation != null) {
            this.previousOperandTextElement.innerText =
                `${this.getDisplayNumber(this.previousOperand)}  ${this.operation}`
        } else {
            this.previousOperandTextElement.innerText =""
        }
       this.displayResultElement.innerHTML = this.displayResult.join('<br>')
    }
    
}
const numberButtons = document.querySelectorAll("[data-number]")
const operationButtons = document.querySelectorAll("[data-operation]")
const deleteButton = document.querySelector("[data-delete]")
const equalsButton = document.querySelector("[data-equals]")
const allClearButton = document.querySelector("[data-all-clear]")
const previousOperandTextElement = document.querySelector("[data-previous-operand]")
const currentOperandTextElement = document.querySelector("[data-current-operand]")
//new change
const dataDisplay = document.querySelector(".display-Result")

const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement, dataDisplay)

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText)
        calculator.UpdateDisplay()
    })
})

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText)
        calculator.UpdateDisplay()
    })
})

   
equalsButton.addEventListener('click', button => {
    calculator.compute()
    calculator.UpdateDisplay()
    calculator.clear()
})

allClearButton.addEventListener('click', button => {
    calculator.clear()
    calculator.UpdateDisplay()
})

deleteButton.addEventListener('click', button => {
    calculator.delete()
    calculator.UpdateDisplay()
})

document.addEventListener('keydown', event => {
    if (event.key == '1' || event.key ==  '2' ||event.key ==  '3' ||event.key == '4'
    || event.key == '5' || event.key == '6' || event.key == '7' || event.key == '8' ||
     event.key == '9' || event.key == '0' || event.key == '.' 
    ){
        calculator.appendNumber(event.key) 
        calculator.UpdateDisplay()
    } else if (event.key == '+' || event.key == '-' || event.key == '/' ||event.key == '*' ) { 
        calculator.chooseOperation(event.key)
        calculator.UpdateDisplay()
    }
    else if (event.key =='Enter'){ 
        calculator.compute()
        calculator.UpdateDisplay()
        setTimeout(() => {
            calculator.clear()
        }, 5);
    }
    else if  (event.key =='Backspace'){
        calculator.delete()
        calculator.UpdateDisplay()
    }
    else if  (event.key =='Escape'){
        calculator.clear()
        calculator.UpdateDisplay()
    }
})
