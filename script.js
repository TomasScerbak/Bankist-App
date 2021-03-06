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

  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
    '2020-05-27T17:01:17.194Z',
    '2020-07-11T23:36:17.929Z',
    '2020-07-12T10:51:36.790Z',
  ],

  currency: 'EUR',
  locale: 'pt-PT', // de-DE
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2020-07-26T12:01:20.894Z',
  ],

  currency: 'USD',
  locale: 'en-US',
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
const  inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');


const displayMovements = (acc, sort = false) => {

  containerMovements.innerHTML = '';

  const movs = sort ? acc.movements.slice().sort((a, b) => a - b) : acc.movements;

  movs.forEach( (movement, index) => {

    const type = movement > 0 ? 'deposit' : 'withdrawal';

    const date = new Date(acc.movementsDates[index]);
    const day = `${date.getDate()}`.padStart(2, '0');
    const month = `${date.getMonth() + 1}`.padStart(2, '0');
    const year = date.getFullYear();

    const displayDate = `${day}/${month}/${year}`;

    const html = `
  <div class="movements__row">
    <div class="movements__type movements__type--${type}">${index + 1} ${type}</div>
    <div class="movements__date">${displayDate}</div>
    <div class="movements__value">${movement.toFixed(2)} EUR</div>
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
  labelBalance.textContent = `${balance.toFixed(2)} EUR`;

  acc.balance = balance;
}

const calcDisplaySummary = (acc) => {
  const incomes = acc.movements.filter(move => move > 0).reduce((accu, curVal) => accu + curVal);
  labelSumIn.textContent = `${incomes.toFixed(2)} EUR`;

  const outcomes = acc.movements.filter(move => move < 0).reduce((accu, currVal) => accu + currVal);
  labelSumOut.textContent = `${outcomes.toFixed(2)} EUR`;

  const interest = acc.movements
  .filter(move => move > 0)
  .map(deposit => deposit * acc.interestRate / 100)
  .filter(int => {
    return int >= 1;
  })
  .reduce((accu, currVal) => accu + currVal);

  labelSumInterest.textContent = `${interest.toFixed(2)} EUR`;
}

const updateUI = acc => {
  displayMovements(acc);
  calcPrintBalance(acc);
  calcDisplaySummary(acc);
}

const startLogOutTimer = () => {
// Set time to 5 min
  let time = 30;
// Call the timer every second
  const timer = setInterval(() => {

  let min = String(Math.trunc(time / 60)).padStart(2, '0');
  let seconds = String(time % 60).padStart(2, '0');

  //When time at 0 stop timer and logout USER
  if (time === 0) {
    clearInterval(timer);
    labelWelcome.textContent = 'Login to get started';
    containerApp.style.opacity = 0;
  }

//In each call, print the remaining time to UI
  labelTimer.textContent = `${min}:${seconds}`;
  time--

}, 1000);
return timer;
}


// Checking UserName and PIN and displaying UI
let currentAccount, timer;

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

  // Implementing current time when user LOG IN
  const now = new Date();
  const date = `${now.getDate()}`.padStart(2, '0');
  const month = `${now.getMonth() + 1}`.padStart(2, '0');
  const year = now.getFullYear();
  const hour = `${now.getHours()}`.padStart(2, '0');
  const minutes = `${now.getMinutes()}`.padStart(2, '0');

  labelDate.textContent = `${date}/${month}/${year} ${hour}:${minutes}`;

  //Starting timer until logout
  if (timer) clearInterval(timer);
  timer = startLogOutTimer();

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

    //Add transfer date
    currentAccount.movementsDates.push(new Date());
    transferTo.movementsDates.push(new Date());

    //Updating Movements Balance and Summary of current account
    updateUI(currentAccount);

    //Reseting timer for logout
    clearInterval(timer);
    timer = startLogOutTimer();

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

// Implementing Loan functionality
btnLoan.addEventListener('click', event => {
  event.preventDefault();

  const amount = Math.floor(inputLoanAmount.value);

// Loan is granted if there's at least one deposit which is 10% from the requested amount
  if (amount > 0 && currentAccount.movements.some(move => move >= amount / 10)) {
    currentAccount.movements.push(amount);

  //Add loan date
  currentAccount.movementsDates.push(new Date());

    updateUI(currentAccount);
  }

  // Clearing input field
  inputLoanAmount.value = '';

      //Reseting timer for logout
      clearInterval(timer);
      timer = startLogOutTimer();
})


//Implementing sorting button
let sorted = false;

btnSort.addEventListener('click', event => {
  event.preventDefault();

  displayMovements(currentAccount.movements, !sorted);
  sorted = !sorted;
})
