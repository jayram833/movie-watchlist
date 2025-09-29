module.exports = {
    theme: {
        extend: {
            animation: {
                'slide-in': 'slideIn 0.4s ease-out',
            },
            keyframes: {
                slideIn: {
                    '0%': { opacity: 0, transform: 'translateY(20px)' },
                    '100%': { opacity: 1, transform: 'translateY(0)' },
                },
            },
        },
    },
};
