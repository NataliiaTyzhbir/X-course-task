document.addEventListener('DOMContentLoaded', function () {
  const quantityInput = document.getElementById('quantity');
  const priceInput = document.getElementById('price');
  const totalInput = document.getElementById('total');
  const orderButton = document.getElementById('orderButton');

  // Початкові значення
  let quantity = 1;
  let price = 10;

  // Оновлення поля для загальної вартості
  const updateTotal = () => {
    const total = quantity * price;
    totalInput.value = total.toFixed(2);
  };

  // Зміна кількості книг
  quantityInput.addEventListener('change', () => {
    let newQuantity = parseInt(quantityInput.value);

    // Перевірка, щоб користувач не міг ввести 0 чи від'ємне значення
    if (newQuantity <= 0 || isNaN(newQuantity)) {
      newQuantity = 1;
    } else if (newQuantity > 42) { // Перевірка, щоб користувач не міг ввести більше 42
      newQuantity = 42;
    }

    quantity = newQuantity;
    quantityInput.value = quantity;
    updateTotal();
  });

  // Зміна ціни книги (у прикладі статична ціна)
  priceInput.value = price.toFixed(2);

  // Оновлення загальної вартості при кліку на кнопку "Замовити"
  orderButton.addEventListener('click', () => {
    updateTotal();
  });

  // Оновлення загальної вартості при зміні кількості книг за допомогою кнопок "+" та "-"
  document.querySelectorAll('.quantity-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      if (btn.classList.contains('increase-btn')) {
        quantity += 1;
      } else if (btn.classList.contains('decrease-btn')) {
        quantity -= 1;
      }

      // Перевірка, щоб користувач не міг ввести більше 42 або менше 1
      if (quantity > 42) {
        quantity = 42;
      } else if (quantity < 1) {
        quantity = 1;
      }

      quantityInput.value = quantity;
      updateTotal();
    });
  });
});
