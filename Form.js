document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('registrationForm');
    const fields = form.querySelectorAll('[required]');
    const maxFileSize = 2 * 1024 * 1024; 

    
    function validateField(field) {
        if (field.value.trim() === '') {
            return `${field.name} is required.`;
        }
        if (field.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(field.value)) {
            return 'Please enter a valid email address.';
        }
        if (field.type === 'number' && isNaN(field.value)) {
            return `${field.name} must be a number.`;
        }
        if (field.type === 'file' && field.files.length > 0 && field.files[0].size > maxFileSize) {
            return `${field.name} must be less than 2MB.`;
        }
        return '';
    }

    if (form) {
        form.addEventListener('submit', function (event) {
            let isValid = true;

            fields.forEach(field => {
                const errorMessage = validateField(field);
                const errorElement = field.nextElementSibling;

                if (errorMessage) {
                    errorElement.textContent = errorMessage;
                    errorElement.classList.add('text-danger');
                    isValid = false;
                } else {
                    errorElement.textContent = '';
                    errorElement.classList.remove('text-danger');
                }
            });

            if (!isValid) {
                event.preventDefault(); 
            } else {
                event.preventDefault(); 
                alert('Form has been successfully submitted!');
                form.reset(); 
            }
        });
    } else {
        console.error('Form with ID "registrationForm" not found.');
    }

    
    const communicationAddress = document.getElementById('communicationAddress');
    const permanentAddress = document.getElementById('permanentAddress');
    const copyAddressCheckbox = document.getElementById('copyAddress');

    if (communicationAddress && permanentAddress && copyAddressCheckbox) {
        copyAddressCheckbox.addEventListener('change', function () {
            if (copyAddressCheckbox.checked) {
                permanentAddress.value = communicationAddress.value;
            } else {
                permanentAddress.value = '';
            }
        });
    }
});
