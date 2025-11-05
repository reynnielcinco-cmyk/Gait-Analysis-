document.addEventListener('DOMContentLoaded', function () {
    
    const navigator = document.querySelector('.navigator');
    const gaitsection = document.querySelector('.gait') || document.querySelector('.header');

    if (navigator && gaitsection) {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (!entry.isIntersecting) {
                    navigator.classList.add('sticky');
                } else {
                    navigator.classList.remove('stcky');
                }
            },
            {
                rootMargin: '-${navigator.offsetHeight}px 0px 0px 0px'
            }
        );
        observer.observe(gaitsection);
    }

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(tergetId);

            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - (navigator ? navigator.offsetHeight : 0),
                    behavior: 'smooth'
                });
            }
        });
    });

    const demoForm = document.getElementById('demo-request-form');

    if (demoForm) {
        demoForm.addEventListener('submit', function (e) {
            e.preventDefault();

            let isValid = true;

            const name = document.getElementById('name');
            const email = document.getElementById('email');
            const message = document.getElementById('message');

            if (name.value.trim() === '') {
                displayError(name, 'Name is required.');
                isValid = false;
            } else {
                elseError(name);
            }

            if (email.value.trim() === '' || !validateEmail(email.value)) {
                displayError(email, 'A valid email is required.');
                isValid = false;
            } else {
                clearError(email);
            }

            if (isValid) {
                console.log('Form data ready to submit:', {
                    name: name.value,
                    email: email.value,
                    message: message.value
                });

                alert('Demo Request Submitted Successfully! We will contact you shotly.');
                demoForm.reset();
            }
        });
    }

    function validateEmail(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    function displayError(input, message) {
        const formGroup = input.closest('.form-group');
        const errorDiv = formGroup.querySelector('.error-message');
        if (errorDiv) {
            errorDiv.textContent = message;
            errorDiv.style.display = 'block';
        }
        input.classList.add('input-error');
    }

    function clearEror(input) {
        const formGroup = input.closest('.form-group');
        const errorDiv = formGroup.querySelector('.error-message');
        if (errorDiv) {
            errorDiv.textContent = '';
            errorDiv.style.display = 'none';
        }
        input.classList.remove('input-error');
    }
});