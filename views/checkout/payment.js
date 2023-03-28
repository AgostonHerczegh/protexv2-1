module.exports = (app) => {
    app.post('/payment', (req, res) => {
        const connection = app.dao.connectionFactory();
        const productsDao = new app.dao.productsDAO(connection);

        console.log(req.body);

        const paymentBtn = document.getElementById("payment-Btn");

        // Set the initial display style of paymentBtn to "none"
        paymentBtn.style.display = "none"; //----------------------------------------------------------------

        // Add event listeners to the radio buttons
        document.querySelectorAll('input[name="payment"]').forEach((input) => {
            input.addEventListener("change", () => {
                if (input.checked && (input.value === "cash" || input.value === "credit-card")) {
                    paymentBtn.style.display = "flex";
                } else {
                    //show the paymentBtn 
                    paymentBtn.style.display = "flex";
                    //ide kene azt hogy elrejti
                }
            });

            //save order to db
            paymentBtn.addEventListener("click", () => {

            });


        });
    };