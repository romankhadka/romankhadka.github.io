
class BankAccount {
    static accountInfoList = [];
    #accountname;
    #deposit;

    constructor(accountname, deposit) {
        this.#accountname = accountname;
        this.#deposit = deposit;
    }

    get accountname() {
        return this.#accountname;
    }

    get deposit() {
        return this.#deposit;
    }

    static getAccountInfoList() {
        return this.accountInfoList;
    }

    static addAccountToList(accountObj) {
        this.accountInfoList.push(accountObj);
    }

    static displayAccountInfoList() {
        let accountInfoListDiv = document.getElementById('accountInfoList');
        let listStr = '<ul>';
        this.accountInfoList.forEach(account => {
            listStr += `<li>Account Name: ${account.accountname}, Balance: ${account.deposit}</li>`;
        });
        listStr += '</ul>';
        accountInfoListDiv.innerHTML = listStr;
    }

    static populateAccountDropdown() {
        let accountInfoListDiv = document.getElementsByClassName('accountList')[0];
        let listStr = '';
        this.accountInfoList.forEach(account => {
            listStr += `<option>${account.accountname}</option>`;
        });
        accountInfoListDiv.innerHTML = listStr;
        accountInfoListDiv = document.getElementsByClassName('accountList')[1];
        listStr = '';
        this.accountInfoList.forEach(account => {
            listStr += `<option>${account.accountname}</option>`;
        });
        accountInfoListDiv.innerHTML = listStr;
    }

    static deposit(accountname, deposit) {
        this.accountInfoList.forEach(account => {
            if (account.accountname == accountname) {
                let newDepositAmount = parseInt(account.#deposit) + parseInt(deposit);
                account.#deposit = newDepositAmount;
            }
        });
    }

    static withdraw(accountname, withdraw) {
        this.accountInfoList.forEach(account => {
            if (account.accountname == accountname) {
                let newDepositAmount = parseInt(account.#deposit) -  parseInt(withdraw);
                account.#deposit = newDepositAmount;
            }
        });
    }
}

function clearFields() {
    document.querySelectorAll('.input-field').forEach(function (ele) {
        ele.value = '';
    })
}

function showDepositPage() {
    document.querySelector('#mainPage').classList.add('hidden');
    document.querySelector('#withdrawPage').classList.add('hidden');
    document.querySelector('#depositPage').classList.remove('hidden');
}

function showWithdrawPage() {
    document.querySelector('#mainPage').classList.add('hidden');
    document.querySelector('#depositPage').classList.add('hidden');
    document.querySelector('#withdrawPage').classList.remove('hidden');
}

function showMainPage() {
    document.querySelector('#mainPage').classList.remove('hidden');
    document.querySelector('#depositPage').classList.add('hidden');
    document.querySelector('#withdrawPage').classList.add('hidden');
}

document.querySelector('.closeForm').addEventListener('click', function(e) {
    showMainPage();

});

document.getElementById('btn-create').addEventListener('click', e => {
    e.preventDefault();
    let accountname = document.querySelector('input[name="accountname"]').value;
    let deposit = document.querySelector('input[name="deposit"]').value;
    let bankAccount = new BankAccount(accountname, deposit);
    BankAccount.addAccountToList(bankAccount);
    BankAccount.displayAccountInfoList();
    BankAccount.populateAccountDropdown();
    clearFields();
});

document.getElementById('btn-deposit').addEventListener('click', e => {
    showDepositPage();
    e.preventDefault();
});

document.getElementById('newDeposit').addEventListener('click', e => {
    let accountname = document.querySelector('#depositAccount').value;
    let deposit = document.querySelector('#newDepositField').value;
    BankAccount.deposit(accountname, deposit);
    BankAccount.displayAccountInfoList();
    alert('Deposit successful');
    showMainPage();
})
document.getElementById('newWithdraw').addEventListener('click', e => {
    let accountname = document.querySelector('#withdrawAccount').value;
    let withdraw = document.querySelector('#newWithdrawField').value;
    BankAccount.withdraw(accountname, withdraw);
    BankAccount.displayAccountInfoList();
    alert('Withdraw successful');
    showMainPage();
})

document.getElementById('btn-withdraw').addEventListener('click', e => {
    showWithdrawPage();
    e.preventDefault();
});