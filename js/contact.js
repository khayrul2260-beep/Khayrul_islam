document.addEventListener("DOMContentLoaded", function () {

    const contactForm = document.getElementById("contactForm");

    if (!contactForm) {
        return;
    }

    // Initialize EmailJS
    emailjs.init({
        publicKey: "1T_OZsKxd4tEgDPR8"
    });


    contactForm.addEventListener("submit", function (event) {

        event.preventDefault();


        const submitButton =
            contactForm.querySelector('button[type="submit"]');


        // Save original button text
        const originalButtonText = submitButton.innerHTML;


        // Loading state
        submitButton.disabled = true;

        submitButton.innerHTML = `
            Sending...
            <i class="ri-loader-4-line"></i>
        `;


        // Send email
        emailjs.sendForm(
            "service_ftababa",
            "template_byru12c",
            contactForm
        )

        .then(function (response) {

            console.log(
                "SUCCESS!",
                response.status,
                response.text
            );


            alert(
                "Your message has been sent successfully!"
            );


            // Clear form
            contactForm.reset();

        })

        .catch(function (error) {

            console.error(
                "EmailJS Error:",
                error
            );


            alert(
                "Sorry! Your message could not be sent. Please try again."
            );

        })

        .finally(function () {

            // Restore button
            submitButton.disabled = false;

            submitButton.innerHTML =
                originalButtonText;

        });

    });

});