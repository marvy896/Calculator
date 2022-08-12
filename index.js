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
        this.currentOperand = computation
        this.displayResult.push(`${prev} ${this.operation} ${current} = ${computation}`) 
            if(this.displayResult.length > 10) this.displayResult.shift();
        this.operation = undefined
        this.previousOperand = ''   
    }
    getDisplayNumber(number) {
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
})

allClearButton.addEventListener('click', button => {
    calculator.clear()
    calculator.UpdateDisplay()
})

deleteButton.addEventListener('click', button => {
    calculator.delete()
    calculator.UpdateDisplay()
})
