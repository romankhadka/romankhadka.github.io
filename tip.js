function calcTip() {
    let subTotal = document.querySelector('#subtotal').value;
    let tipPercent = document.querySelector('#tip').value;

    let totalTip = subTotal * tipPercent / 100;

    document.querySelector('#total').innerHTML = '$' + totalTip;
}
