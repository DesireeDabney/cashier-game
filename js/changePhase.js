//scan, count change and receipt or no
//item ideas: apple, vitamins/pills, etc (array with set prices and function that gets random amount of items and adds their price together, dialogue box will have the total amount charging the customer. Then the customer will round up the amount and the user will have to tell them their change. )




const shoppingCart = [
  {
    product: "Apple",
    price: 1.56,
    imageUrl: "images/apple.png",
  },
  {
    product: "Gum",
    price: 0.99,
    imageUrl: "images/gum.png",
  },
  {
    product: "Water Bottle",
    price: 1.89,
    imageUrl: "images/waterBottle.png",
  },
  {
    product: "Bananas",
    price: 5.99,
    imageUrl: "images/bananas.png",
  },
  {
    product: "Chips",
    price: 6.82,
    imageUrl: "images/chips.png",
  },
  {
    product: "Tissue Box",
    price: 3.34,
    imageUrl: "images/tissueBox.png",
  },
  {
    product: "Monster Energy Drink",
    price: 2.25,
    imageUrl: "images/monsterEnergyDrink.png",
  },
  {
    product: "Candy", //here
    price: 1.99,
    imageUrl: "images/candy.png",
  },
  {
    product: "Vitamins",
    price: 24.99,
    imageUrl: "images/vitamins.png",
  },
  {
    product: "Lotion",
    price: 14.99,
    imageUrl: "images/lotion.png",
  },
]; //array of available items that can be picked from




function itemAmount() { //item amount that is randomly generated can only be from 0 to 5
    return Math.floor(Math.random() * 6); //gets random number 0-5
}


function generateCustomerCart(cart) { //Assign random amount to items and remove 0 item amounts
    return cart
        .map(item => ({
            ...item, //spread operator to copy the array values of each item on the list
            amount: itemAmount() //run itemAmount function to add an amount to each item in the array
        }))
        .filter(item => item.amount > 0); //if the item is below 0 don't include it in the cart and filter it out
}


const customerCart = generateCustomerCart(shoppingCart); //result
console.log(customerCart); //shows all items in the cart in the console


//counts total price
function countTotal(cart) {
    return cart.reduce((total, item) => {
        return total + item.price * item.amount;
    }, 0);
}




const total = countTotal(customerCart);
console.log(`Total: $${total.toFixed(2)}`);


//Customer rounds up & user gives change
function roundUpTotal(total) {
    return Math.ceil(total);
}


function calculateChange(roundedTotal, actualTotal) {
    return (roundedTotal - actualTotal).toFixed(2);
}


const roundedTotal = roundUpTotal(total);
const change = calculateChange(roundedTotal, total);


console.log(`Customer pays: $${roundedTotal}`);
console.log(`Change due: $${change}`);


// render the receipt in the notifyBox
const notifyBox = document.getElementById('notifyBox');


function setNotifyBox(html) {
    notifyBox.innerHTML = `
        <div class="notification" style="opacity:1">
            ${html}
        </div>
    `;
}


//show items & payment info
function showChangePrompt(cart, total) {
    const roundedTotal = Math.ceil(total);
    const changeDue = +(roundedTotal - total).toFixed(2);


    let itemListHTML = cart.map(item => `
        <li>
            ${item.product} × ${item.amount}
            <span>$${(item.price * item.amount).toFixed(2)}</span>
        </li>
    `).join('');


    setNotifyBox(`
        <h3>Customer Items</h3>
        <hr class="thick-line">
        <ul class="receipt-list">
            ${itemListHTML}
        </ul>

        <hr class="thick-line">

        <p><strong>Total:</strong> $${total.toFixed(2)}</p>
        <p><strong>Customer pays:</strong> $${roundedTotal}</p>


        <label>
            Enter change:
            <input id="changeInput" type="number" step="0.01">
        </label>


        <button id="submitChange">Submit</button>

        <p id="changeFeedback"></p>

        <button id="nextCustomer">Next Customer</button>
    `);


    document.getElementById('submitChange').addEventListener('click', () => {
            checkChange(changeDue);
        });

        document.getElementById('nextCustomer').addEventListener("click", () => {
            generateCustomerCart();
          }); //doesnt work, have the button
}


//check if the inputted change amount is right
function checkChange(correctChange) {
    const input = document.getElementById('changeInput');
    const feedback = document.getElementById('changeFeedback');


    const userValue = parseFloat(input.value);


    if (isNaN(userValue)) {
        feedback.textContent = 'Enter a valid number.';
        feedback.style.color = 'orange';
        return;
    }


    if (Math.abs(userValue - correctChange) < 0.01) {
        feedback.textContent = 'Good Job!';
        feedback.style.color = 'green';

    } else {
        feedback.textContent = `Try again!`;
        feedback.style.color = 'red';
    }
}


// // Switch phase text
document.getElementById('phase').textContent = 'Count Change';


// Show prompt
showChangePrompt(customerCart, total);


// function startChangePhase(cart) {
//     const total = countTotal(cart);
//     showChangePrompt(cart, total);
// }
//ignore this, im not doing 2 phases


//Need: add replay