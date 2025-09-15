class DateCalculator {
  constructor() {
    this.form = document.querySelector(".date-inputs");
    this.day = document.getElementById("day");
    this.month = document.getElementById("month");
    this.year = document.getElementById("year");
    this.yearOutput = document.getElementById("years");
    this.monthOutput = document.getElementById("months");
    this.dayOutput = document.getElementById("days");
  }

  calculateAge() {
    const today = new Date();

    let calcYear = today.getFullYear() - +this.year.value;
    let calcMonth = today.getMonth() + 1 - +this.month.value;
    let calcDay = today.getDate() - +this.day.value;

    // Adjust days if negative

    if (calcDay < 0) {
      calcMonth -= 1;
      // Get days in the previous month
      let prevMonth = new Date(today.getFullYear(), today.getMonth(), 0);
      calcDay += prevMonth.getDate();
    }

    // Adjust months if negative
    if (calcMonth < 0) {
      calcYear -= 1;
      calcMonth += 12;
    }

    this.yearOutput.textContent = calcYear;
    this.monthOutput.textContent = calcMonth;
    this.dayOutput.textContent = calcDay;
  }

  invalidDateAndMonth() {
    const day = +this.day.value;
    const month = +this.month.value;

    // February max 29
    if (month === 2 && day > 29) {
      return false;
    }

    // Months with 30 days: April, June, Sept, Nov
    if ([4, 6, 9, 11].includes(month) && day > 30) {
      return false;
    }

    // Months with 31 days already okay if day <= 31
    if (day < 1 || day > 31 || month < 1 || month > 12) {
      return false;
    }

    return true;
  }

  addEventListeners() {
    this.form.addEventListener("submit", (e) => {
      e.preventDefault();
      this.calculateAge();

      if (!this.invalidDateAndMonth()) {
        alert("Invalid date entered!");
        return;
      }
      this.day.value = "";
      this.month.value = "";
      this.year.value = "";
    });
  }
}

const calculate = new DateCalculator();
calculate.addEventListeners();
