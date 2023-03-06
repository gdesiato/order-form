const form = document.querySelector('form');
const nameInput = document.querySelector('#name');
const emailInput = document.querySelector('#email');
const phoneInput = document.querySelector('#phone');
const addressInput = document.querySelector('#address');
const zipInput = document.querySelector('#zip');
const quantityInput = document.querySelector('#quantity');
const productSelect = document.querySelector('#product');
const totalPrice = document.querySelector('#total-price');
const submitButton = document.querySelector('input[type="submit"]');

const prices = {
    cpu: 100,
    gpu: 200,
    ram: 50,
    storage: 75
};

function calculateTotalPrice() {
    const product = productSelect.value;
    const quantity = quantityInput.value;
    const price = prices[product];
    const total = price * quantity;
    totalPrice.textContent = '$' + total.toFixed(2);
}

function validateName() {
    const value = nameInput.value.trim();
    const isValid = value !== '';
    return [isValid, 'Name is required'];
}

function validateEmail() {
    const value = emailInput.value.trim();
    const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    return [isValid, 'Email is not valid'];
}

function validatePhone() {
    const value = phoneInput.value.trim();
    const isValid = /^\d{10}$/.test(value);
    return [isValid, 'Phone number must be 10 digits'];
}

function validateAddress() {
    const value = addressInput.value.trim();
    const isValid = value !== '';
    return [isValid, 'Address is required'];
}

function validateZip() {
    const value = zipInput.value.trim();
    const isValid = /^\d{5}$/.test(value);
    return [isValid, 'Zip code must be 5 digits'];
}

function validateQuantity() {
    const value = quantityInput.value.trim();
    const isValid = /^\d+$/.test(value);
    return [isValid, 'Quantity must be a positive integer'];
}

function validateProduct() {
    const value = productSelect.value;
    const isValid = value !== '';
    return [isValid, 'Product is required'];
}

function validateForm() {
    const validators = [validateName, validateEmail, validatePhone, validateAddress, validateZip, validateQuantity, validateProduct];
    let isValid = true;

    for (let validator of validators) {
        const [valid, message] = validator();
        const input = validator.name.replace('validate', '').toLowerCase() + 'Input';
        const error = document.querySelector(`#${input}-error`);

        if (!valid) {
            error.textContent = message;
            isValid = false;
        } else {
            error.textContent = '';
        }
    }

    submitButton.disabled = !isValid;

    if (isValid) {
        calculateTotalPrice();
    }
}

form.addEventListener('submit', function(event) {
    event.preventDefault();
    alert('Order submitted!');
});

nameInput.addEventListener('blur', validateName);
emailInput.addEventListener('blur', validateEmail);
phoneInput.addEventListener('blur', validatePhone);
addressInput.addEventListener('blur', validateAddress);
zipInput.addEventListener('blur', validateZip);
quantityInput.addEventListener('blur', validateQuantity);
productSelect.addEventListener('change', validateProduct);