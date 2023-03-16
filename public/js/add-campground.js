// Populate with the countries

const countries = ["Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Antigua & Deps", "Argentina", "Armenia", "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bhutan", "Bolivia", "Bosnia Herzegovina", "Botswana", "Brazil", "Brunei", "Bulgaria", "Burkina", "Burundi", "Cambodia", "Cameroon", "Canada", "Cape Verde", "Central African Rep", "Chad", "Chile", "China", "Colombia", "Comoros", "Congo", "Costa Rica", "Croatia", "Cuba", "Cyprus", "Czech Republic", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "East Timor", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Ethiopia", "Fiji", "Finland", "France", "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Greece", "Grenada", "Guatemala", "Guinea", "Guinea-Bissau", "Guyana", "Haiti", "Honduras", "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Israel", "Italy", "Ivory Coast", "Jamaica", "Japan", "Jordan", "Kazakhstan", "Kenya", "Kiribati", "Korea North", "Korea South", "Kosovo", "Kuwait", "Kyrgyzstan", "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg", "Macedonia", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Mauritania", "Mauritius", "Mexico", "Micronesia", "Moldova", "Monaco", "Mongolia", "Montenegro", "Morocco", "Mozambique", "Myanmar", "Namibia", "Nauru", "Nepal", "Netherlands", "New Zealand", "Nicaragua", "Niger", "Nigeria", "Norway", "Oman", "Pakistan", "Palau", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland", "Portugal", "Qatar", "Romania", "Russian Federation", "Rwanda", "St Kitts & Nevis", "St Lucia", "Saint Vincent & the Grenadines", "Samoa", "San Marino", "Sao Tome & Principe", "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Solomon Islands", "Somalia", "South Africa", "South Sudan", "Spain", "Sri Lanka", "Sudan", "Suriname", "Swaziland", "Sweden", "Switzerland", "Syria", "Taiwan", "Tajikistan", "Tanzania", "Thailand", "Togo", "Tonga", "Trinidad & Tobago", "Tunisia", "Turkey", "Turkmenistan", "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States", "Uruguay", "Uzbekistan", "Vanuatu", "Vatican City", "Venezuela", "Vietnam", "Yemen", "Zambia", "Zimbabwe"]
const selectBtn = document.getElementById("button-select-country");
const listCountries = document.getElementById("ul-countries");
listCountries.removeChild(document.getElementById('li-country'))
countries.forEach((country) => {
    const li = document.createElement("li");
    const button = document.createElement("button");
    button.textContent = country;
    button.classList.add(
        "w-full",
        "px-4",
        "py-2",
        "bg-isabeline",
        "text-gray-700",
        "font-bold",
        "outline-none",
        "focus:bg-silver",
        "focus:shadow-outline",
        "focus:outline-none",
        "hover:bg-silver",
        "active:bg-darker-silver"
    );
    button.setAttribute("type", "button");
    li.appendChild(button);
    listCountries.appendChild(li);
});


// Dropdown menu selector for countries

selectBtn.addEventListener("click", () => {
    const divListCountries = document.getElementById("div-list-countries");
    divListCountries.style.display =
        divListCountries.style.display === "none" ? "block" : "none";
});

listCountries.addEventListener("click", (event) => {
    const target = event.target;
    if (target.tagName === "BUTTON") {
        selectBtn.textContent = target.textContent;
        const divListCountries = document.getElementById("div-list-countries");
        divListCountries.style.display = "none";
    }
});


// Shows the location form

var inputs = document.querySelectorAll('input');
document.getElementById('selected-country').value = 'Bolacha';
function isCountrySelected() {
    if (document.getElementById('button-select-country').textContent.trim() === '-- Select the country --') {
        return false;
    }
    return true;
}

function areFilled() {
    if (Array.from(inputs).some(input => input.value === ''))
        return false;
    return true;
}

function readyYet() {
    inputs.forEach(input => input.addEventListener('keyup', () => { if (areFilled()) itsReady() }));
}

function itsReady() {
    const msg = document.getElementById('fill-input-msg');
    if (msg)
        msg.remove();
}

readyYet();
function nextStep() {
    if (!areFilled() || !isCountrySelected()) {
        if (!document.getElementById('fill-input-msg'))
            document.getElementById('button-submit-campground').insertAdjacentHTML("beforebegin", `<p class="visible text-red-700 mt-5 text-center" id="fill-input-msg"><b>Please, fill all the input fields </b></p>`);
            return false;
    }
    else {
            const hiddenCountry = document.getElementById('selected-country')
            hiddenCountry.value = document.getElementById('button-select-country').textContent.trim();
            return true;
    }
}