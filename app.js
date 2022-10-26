const operationBtns = document.querySelectorAll('[data-operation]');
const numBtns = document.querySelectorAll('[data-num]');
const equalBtn = document.querySelector('[data-equal]');
const clearBtn = document.querySelector('[data-clear]');
const deleteBtn = document.querySelector('[data-delete]');
const initialTxt = document.querySelector('[data-initial]');
const currrentTxt = document.querySelector('[data-current]');
//calculator class, containg useful functions as properties
class Calculator {
    constructor(initialTxt, currrentTxt) {
        this.initialTxt = initialTxt;
        this.currrentTxt = currrentTxt;
        this.clear();
    }
    clear() {
        this.currentOperand = '0';
        this.previousOperand = '0';
        this.operation = undefined;
    }

    delete() {
        this.currentOperand = this.currentOperand.toString('0').slice('', -1)
        this.previousOperand = '0';
        this.operation = undefined;
    }
    appendNum(num) {
        //to make sure that user enters '.' only once
        if (num === '.' && this.currentOperand.includes('.')) return
        //this tells js not to sum the values but just append it
        this.currentOperand = this.currentOperand.toString() + num.toString()

    }
    //to avoid performing cumputaion when user selected nothing
    selectOperation(operation) {
        if (this.currentOperand === '0') return
        if (this.previousOperand !== '0') {
            this.compute()
        }
        this.operation = operation
        this.previousOperand = this.currentOperand
        this.currentOperand = ''

    }
    //main computation
    compute() {
        let result
        const initial = parseFloat(this.previousOperand)
        const current = parseFloat(this.currentOperand)
        if (isNaN(initial) || isNaN(current)) return
        switch (this.operation) {
            case '+':
                result = initial + current
                break
            case '-':
                result = initial - current
                break
            case '*':
                result = initial * current
                break
            case '÷':
                result = initial / current
                break
            default:
                return

        }
        this.currentOperand = result
        this.operation = undefined
        this.previousOperand = ''


    }
    getDisplayNum(num) {
        const strigNum = num.toString()
        const intDigits = parseFloat(strigNum.split('.')[0])
        const decimalDigits = strigNum.split('.')[1]
        let intDisplay
        if (isNaN(intDigits)) {
            intDisplay = ''
        } else {
            intDisplay = intDigits.toLocaleString('en', { maximumFractionDigits: 0 })
        }
        if (decimalDigits != null) {
            return `${intDisplay}.${decimalDigits}`
        } else {
            return intDisplay
        }
    }
    updateDisplay() {
        this.currrentTxt.innerText = this.getDisplayNum(this.currentOperand)
        if (this.operation != null) {
            this.initialTxt.innerText = `${this.previousOperand} ${this.operation}`
        } else {
            this.initialTxt.innerText = ''
        }

    }

}

const calculator = new Calculator(initialTxt, currrentTxt)

numBtns.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNum(button.innerText)
        calculator.updateDisplay()
    })
})

operationBtns.forEach(button => {
    button.addEventListener('click', () => {
        calculator.selectOperation(button.innerText)
        calculator.updateDisplay()
    })
})
equalBtn.addEventListener('click', (button) => {
    calculator.compute()
    calculator.updateDisplay()
})
clearBtn.addEventListener('click', (button) => {
    calculator.clear()
    calculator.updateDisplay()
})
deleteBtn.addEventListener('click', (button) => {
    calculator.delete()
    calculator.updateDisplay()
})
