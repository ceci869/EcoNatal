class FormSubmit {
    constructor(settings) {
        this.settings = settings;
        this.form = document.querySelector(settings.form);
        this.formButton = document.querySelector(settings.button);
        this.sendForm = this.sendForm.bind(this);
    }

    displaySuccess() {
        this.form.innerHTML = this.settings.success;
    }

    displayError() {
        this.form.innerHTML = this.settings.error;
    }

    getFormObject() {
        const formObject = {};
        const fields = this.form.querySelectorAll("[name]");
        fields.forEach((field) => {
            formObject[field.getAttribute("name")] = field.value;
        });
        return formObject;
    }

    onSubmission(event) {
        event.preventDefault();
        event.target.disabled = true;
        event.target.innerText = "Enviando..."
    }

    async sendForm(event) {
        try {
            this.onSubmission(event);
            await fetch('https://formsubmit.co/ajax/econatal.meg@gmail.com', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
                body: JSON.stringify(this.getFormObject()),
            });
            this.displaySuccess();
        } catch (error) {
            this.displayError();
            throw new Error(error);
        }
    }

    init() {
        if (this.form) {
            this.formButton.addEventListener("click", this.sendForm);

            const fields = this.form.querySelectorAll("[name]");
            fields.forEach((field) => {
                field.addEventListener("input", () => this.validateForm());
            });

            this.form.addEventListener("reset", () => {
                setTimeout(() => this.validateForm(), 0);
            });

            this.validateForm();
        }
        return this;
    }

    validateForm() {
        const fields = this.form.querySelectorAll("[name]");
        let allFilled = true;
        fields.forEach((field) => {
            if (!field.value.trim()) {
                allFilled = false;
            }
        });

        if (allFilled) {
            this.formButton.removeAttribute("disabled");
        } else {
            this.formButton.setAttribute("disabled", "true");
        }
    }
}

const formSubmit = new FormSubmit({
    form: "[data-form]",
    button: "[data-button]",
    success: "<p class='text-[24px] font-normal text-center mt-[35px] w-[50vw] mx-auto'>Responderemos o mais breve possível. Sua opinião é importante para melhorar nossas ações em prol do meio ambiente.</p>",
    error: "<p class='text-[24px] font-normal text-center text-red-500 mt-[35px] w-[50vw] mx-auto'>Não foi possível enviar sua mensagem. Por favor, tente novamente.</p>",
});

formSubmit.init();