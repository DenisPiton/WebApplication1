document.querySelectorAll('.accordion-toggle').forEach(button => {
    button.addEventListener('click', () => {
        const isOpen = button.classList.contains('active');
        const content = document.getElementById("cord");
        console.log("asd")

        document.querySelectorAll('.accordion-toggle').forEach(otherButton => {
            if (otherButton !== button) {
                otherButton.classList.remove('active');
                otherButton.querySelector('svg').classList.remove('rotate-180');
                otherButton.nextElementSibling.style.maxHeight = '0';
            }
        });


        if (!isOpen) {
            button.classList.add('active');
            button.querySelector('svg').classList.add('rotate-90');
            content.style.maxHeight = content.scrollHeight + 'px';

        } else {
            button.classList.remove('active');
            button.querySelector('svg').classList.remove('rotate-90');
            content.style.maxHeight = '0';
        }
    });
});