class AbstractLoan {
    /**
     * @constructor
     * @param {number} principal 
     * @param {number} rate 
     * @param {number} interest 
     * @param {number} minPayment 
     */
    constructor(principal, rate, interest = 0, minPayment = 0) {
        if (new.target === AbstractLoan) {
            throw new TypeError("Can't instantiate an abstract class!");
        }
        this.principal = principal;
        this.interest = interest;
        this.rate = rate / 100;
        this.minPayment = minPayment;
    }

    /**
     * @returns {AbstractLoan}
     */
    clone() {
        throw new Error("Method must be extended by a child class.");
    }

    /**
     * 
     * @returns {number}
     */
    getPrincipal() {
        return this.principal;
    }

    /**
     * 
     * @returns {number}
     */
    getInterest() {
        return this.interest;
    }

    /**
     * 
     * @returns {number}
     */
    getRate() {
        return this.rate;
    }

    /**
     * 
     * @returns {number}
     */
    getMinPayment() {
        return this.minPayment;
    }

    calculateDailyInterest() {
        throw new Error("Method must be extended by a child class.");
    }

    /**
     * 
     * @param {number} amount 
     * @returns {number} remaining money after payment applied
     */
    payment(amount) {
        let remaining_interest = this.interest - amount;
        if (remaining_interest < 0) {
            this.interest = 0;
            let remaining_principal = this.principal - Math.abs(remaining_interest);
            if (remaining_principal < 0) {
                this.principal = 0;
                return Math.abs(remaining_principal);
            } else {
                this.principal = remaining_principal;
            }
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

    /**
     * 
     * @returns {SimpleLoan}
     */
    clone() {
        return new SimpleLoan(this.principal, this.rate, this.interest, this.minPayment);
    }
}

class CompoundLoan extends AbstractLoan {
    constructor(principal, rate, interest = 0, minPayment = 0) {
        super(principal, rate, interest, minPayment);
    }

    calculateDailyInterest() {
        this.interest += (this.principal + this.interest) * this.rate / 365.25;
    }

    /**
     * 
     * @returns {SimpleLoan}
     */
    clone() {
        return new CompoundLoan(this.principal, this.rate, this.interest, this.minPayment);
    }
}

export { AbstractLoan, SimpleLoan, CompoundLoan }