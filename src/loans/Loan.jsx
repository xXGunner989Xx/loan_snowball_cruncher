class AbstractLoan {
    constructor(principal, rate, interest = 0, minPayment = 0) {
        if (new.target === AbstractLoan) {
            throw new TypeError("Can't instantiate an abstract class!");
        }
        this.principal = principal;
        this.interest = interest;
        this.rate = rate / 100;
        this.minPayment = minPayment;
    }

    calculateDailyInterest() {
        throw new Error("Method must be extended by a child class.");
    }

    payment(amount) {
        let remaining_interest = this.interest - amount;
        if (remaining_interest < 0) {
            let remaining_principal = Math.abs(this.principal - remaining_interest);
            if (remaining_principal < 0) {
                this.principal = 0;
                return Math.abs(remaining_principal);
            }
            this.interest = 0;
        } else {
            this.interest = remaining_interest;
        }
        return 0;
    }
}

class SimpleLoan extends AbstractLoan {
    constructor(principal, rate, interest = 0, minPayment = 0) {
        super(principal, rate, interest, minPayment);
    }

    calculateDailyInterest() {
        this.interest += this.principal * this.rate / 365.25;
    }
}

class CompoundLoan extends AbstractLoan {
    constructor(principal, rate, interest = 0, minPayment = 0) {
        super(principal, rate, interest, minPayment);
    }

    calculateDailyInterest() {
        this.interest += (this.principal + this.interest) * this.rate / 365.25;
    }
}

export { SimpleLoan, CompoundLoan }