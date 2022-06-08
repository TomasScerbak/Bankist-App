'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');


const displayMovements = movements => {

  containerMovements.innerHTML = '';

  movements.forEach( (movement, index) => {

    const type = movement > 0 ? 'deposit' : 'withdrawal';

    const html = `
  <div class="movements__row">
    <div class="movements__type movements__type--${type}">${index + 1} ${type}</div>
    <div class="movements__value">${movement} EUR</div>
  </div>
    `;

    containerMovements.insertAdjacentHTML("afterbegin", html);
  })
}


const createUserNames = function(accs) {
  accs.forEach(function(acc) {
    acc.username = acc.owner.toLowerCase().split(' ').map(name => name[0]).join('');
  });
}

createUserNames(accounts);


const calcPrintBalance = acc => {
  const balance = acc.movements.reduce((accu, currVal) => accu + currVal);
  labelBalance.textContent = `${balance} EUR`;

  acc.balance = balance;
}

const calcDisplaySummary = (acc) => {
  const incomes = acc.movements.filter(move => move > 0).reduce((accu, curVal) => accu + curVal);
  labelSumIn.textContent = `${incomes} EUR`;

  const outcomes = acc.movements.filter(move => move < 0).reduce((accu, currVal) => accu + currVal);
  labelSumOut.textContent = `${outcomes} EUR`;

  const interest = acc.movements
  .filter(move => move > 0)
  .map(deposit => deposit * acc.interestRate / 100)
  .filter(int => {
    return int >= 1;
  })
  .reduce((accu, currVal) => accu + currVal);

  labelSumInterest.textContent = interest;
}

const updateUI = acc => {
  displayMovements(acc.movements);
  calcPrintBalance(acc);
  calcDisplaySummary(acc);
}

// Checking UserName and PIN and displaying UI
let currentAccount;

btnLogin.addEventListener('click', event => {
  event.preventDefault();

  currentAccount = accounts.find(acc => acc.username === inputLoginUsername.value);

  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    labelWelcome.textContent = `Welcome back ${currentAccount.owner.split(' ')[0]}`;
    containerApp.style.opacity = '100';
    inputLoginUsername.value = '';
    inputLoginPin.value = '';
    inputLoginUsername.blur();
    inputLoginPin.blur();
  }

  //Updating Movements Balance and Summary of current account
  updateUI(currentAccount);
})

// Implementing transfer function
btnTransfer.addEventListener('click', event => {
  event.preventDefault();

  const amount = Number(inputTransferAmount.value);
  const transferTo = accounts.find(acc => acc.username === inputTransferTo.value);

  inputTransferAmount.value = '';
  inputTransferTo.value = '';

  if (amount > 0 && transferTo && currentAccount.balance >= amount && transferTo?.username !== currentAccount.username) {
    currentAccount.movements.push(-amount);
    transferTo.movements.push(amount);

    //Updating Movements Balance and Summary of current account
    updateUI(currentAccount);
  }
})

// Implementing account closure function
btnClose.addEventListener('click', event => {
  event.preventDefault();

  if (inputCloseUsername.value === currentAccount.username && Number(inputClosePin.value) === currentAccount.pin) {
    const index = accounts.findIndex(acc => acc.username === currentAccount.username);
    
    //Delete Account
    accounts.splice(index, 1);

    //Hide UI
    containerApp.style.opacity = '0';
  }

    // Clearing Inputs
    inputCloseUsername.value = '';
    inputClosePin.value = '';

    labelWelcome.textContent = 'Log in to get started';

})


/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

const deposits = movements.filter( element => element > 0);
const withdrawals = movements.filter( element => element < 0);
const balance = movements.reduce((accu, currval) => accu + currval);

/////////////////////////////////////////////////

// const calcDogAgeinHumanYears = function(ages) {

//   const humanAges = ages.map(age => (age <= 2 ? 2 * age : 16 + age * 4));
//   const adults = humanAges.filter(age => age <= 18);
//   const average = humanAges.reduce((accu, currVal) => (accu + currVal) / humanAges.length);

//   console.log(adults);
//   console.log(humanAges);
//   console.log(average);
// }

// calcDogAgeinHumanYears([5,2,4,1,15,8,3]);

