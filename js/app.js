document.addEventListener("DOMContentLoaded", function () {
    const openBtns = document.querySelectorAll(".registerBtn");
    const modal = document.getElementById("registrationModal");
    const closeBtn = document.getElementById("closeModalBtn");
    const overlay = document.querySelector(".homeModalOverlay");
    const form = document.getElementById("registrationForm");

    const phoneInput = document.getElementById("phone");
    const phoneError = document.getElementById("phoneError");
    const submitBtn = document.getElementById("submitBtn");

    const selectedCountry = document.getElementById("selectedCountry");
    const selectedCountryCode = document.getElementById("selectedCountryCode");
    const countryDropdown = document.getElementById("countryDropdown");
    const dropdownIcon = document.getElementById("dropdownIcon");

    const PF = setupPhoneFormatter({
        inputEl: phoneInput,
        codeLabelEl: selectedCountryCode,
        dropdownEl: countryDropdown,
        triggerEl: selectedCountry,
        iconEl: dropdownIcon,
        errorEl: phoneError,
        defaultCode: "+998",
    });

    let isOpen = false;
    let scrollY = 0;

    function openModal() {
        if (!modal) return;
        isOpen = true;
        scrollY = window.scrollY;

        modal.style.display = "block";
        document.body.style.overflow = "hidden";

        phoneError.style.display = "none";
    }

    function closeModal() {
        if (!modal || !isOpen) return;
        isOpen = false;

        modal.style.display = "none";
        document.body.style.overflow = "";

        window.scrollTo(0, scrollY);
    }

    openBtns.forEach((b) => b.addEventListener("click", openModal));
    closeBtn && closeBtn.addEventListener("click", closeModal);
    overlay && overlay.addEventListener("click", closeModal);

    form.addEventListener("submit", function (e) {
        e.preventDefault();

        const phoneRaw = phoneInput.value.trim();

        if (!PF.validate(phoneRaw)) {
            phoneError.style.display = "block";
            return;
        }
        phoneError.style.display = "none";

        submitBtn.textContent = "YUBORILMOQDA...";
        submitBtn.disabled = true;

        const now = new Date();
        const sana = now.toLocaleDateString("uz-UZ");
        const vaqt = now.toLocaleTimeString("uz-UZ");

        const payload = {
            TelefonRaqam: PF.getCurrentCode() + " " + phoneRaw,
            SanaSoat: sana + " - " + vaqt,
        };

        localStorage.setItem("formData", JSON.stringify(payload));

        window.location.href = "./thankYou.html";
    });
});
