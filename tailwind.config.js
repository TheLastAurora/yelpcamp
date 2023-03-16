/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./public/**/*.{html, css, js}", "./views/**/*.ejs"],
    theme: {
        extend: {
            inset: {
                '13': '3.33rem',
            },
            display: ['group-hover'],
            screens: {
                'xs': '0px',
                'bp': '500px'
            },
            fontSize: {
                'xxs': '0.5rem',
            },
            fontFamily: {
                'sans': ['Raleway', 'sans-serif'],
            },
            colors: {
                'ivory': '#FFFCE8',
                'isabeline': '#f4f3ee',
                'silver': '#BCB8B1',
                'darker-silver': '#9D9690',
                "evergreen": "#152711",
                "deep-forest-green": "#1E2E16",
                "burgundy": "#644536",
                "dark-brown": "#3B1F0D",
                "burnt-siena": "#E9724C",
                "terracota": "#B8543E"
            },
            backgroundImage: {
                'sign': "url('/imgs/login-register.jpg')",
                'home': "url('/imgs/camping.jpg')",
            },
            backdropBlur: {
                xs: '2px'
            }
        },
    },
    plugins: [],
}
