// JavaScript code for testimonials carousel, FAQ, and fun facts counters

let currentIndex = 0;
const testimonials = document.querySelectorAll('.testimonial');
setInterval(() => {
    testimonials.forEach((t, i) => t.style.display = (i === currentIndex) ? 'block' : 'none');
    currentIndex = (currentIndex + 1) % testimonials.length;
}, 3000);

const accordionButtons = document.querySelectorAll('.accordion-button');
accordionButtons.forEach(button => {
    button.addEventListener('click', function() {
        const content = this.nextElementSibling;
        content.style.display = content.style.display === 'block' ? 'none' : 'block';
    });
});

const counters = document.querySelectorAll('.counter');
counters.forEach(counter => {
    const updateCount = () => {
        const target = +counter.getAttribute('data-target');
        const count = +counter.innerText;
        const increment = target / 100;

        if (count < target) {
            counter.innerText = Math.ceil(count + increment);
            setTimeout(updateCount, 20);
        } else {
            counter.innerText = target;
        }
    };
    updateCount();
});
