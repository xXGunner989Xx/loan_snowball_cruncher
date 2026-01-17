import { AbstractLoan } from "./Loan";

// 2d array nxm where n is # loans and m is the number of months to payoff all loans
/**
 * 
 * @param {AbstractLoan[]} loans 
 * @param {number} extraPayment
 * @param {React.Dispatch<React.SetStateAction<any[]>>} setGraphSeries
 */
export function generateSeries(loans, extraPayment, setGraphSeries) {
  // create a copy of the loans to perform payoff
  const copiedLoans = loans.map(loan => loan.clone());
  copiedLoans.sort((a, b) => b.getRate() - a.getRate());
  const ret = [];
  loans.forEach(_ => ret.push([]));
  let currDate = new Date();
  let totalRemaining = copiedLoans
    .map((loan) => loan.getPrincipal() + loan.getInterest())
    .reduce((acc, curr) => acc + curr, 0);
  const initialTotalRemaining = totalRemaining;
  while (totalRemaining > 0) {
    // first calculate daily interest
    copiedLoans.forEach(loan => {
      loan.calculateDailyInterest();
    });
    if (currDate.getDate() === 1) {
      // assuming payments made on the first of the month
      let payment = parseInt(extraPayment);
      for (let i = 0; i < copiedLoans.length; i++) {
          payment += copiedLoans[i].getMinPayment();
          console.log(payment);
          payment = copiedLoans[i].payment(payment);
          ret[i].push(copiedLoans[i].getPrincipal() + copiedLoans[i].getInterest());
      }
      const newTotalRemaining = copiedLoans
        .map((loan) => loan.getPrincipal() + loan.getInterest())
        .reduce((acc, curr) => acc + curr, 0);
      if (newTotalRemaining >= initialTotalRemaining) {
        alert("It is impossible to payoff loans with the current configuration");
        break;
      }
    }
    currDate.setDate(currDate.getDate() + 1);
    totalRemaining = copiedLoans
      .map((loan) => loan.getPrincipal() + loan.getInterest())
      .reduce((acc, curr) => acc + curr, 0);
  }
  setGraphSeries(ret);
}