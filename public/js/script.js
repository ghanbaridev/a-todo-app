document.addEventListener('DOMContentLoaded', () => {
    // Dark Mode Toggle
    const darkModeToggle = document.getElementById('darkModeToggle');
    const body = document.body;

    // Check for saved user preference
    const currentMode = localStorage.getItem('darkMode');
    if (currentMode === 'enabled') {
        body.classList.add('dark-mode');
        darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    } else {
        body.classList.remove('dark-mode');
        darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    }

    // Toggle dark mode
    darkModeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-mode');

        if (body.classList.contains('dark-mode')) {
            localStorage.setItem('darkMode', 'enabled');
            darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        } else {
            localStorage.setItem('darkMode', 'disabled');
            darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        }
    });





    // Animation for adding new task
    const addForm = document.querySelector('.add-task');
    if (addForm) {
        addForm.addEventListener('submit', (e) => {
            const input = addForm.querySelector('input');
            input.style.transform = 'scale(0.95)';
            setTimeout(() => {
                input.style.transform = 'scale(1)';
            }, 200);
        });
    }

    // Animation for deleting task
    document.querySelectorAll('.delete-btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const li = this.closest('li');
            li.classList.add('deleting');
            setTimeout(() => {
                this.closest('form').submit();
            }, 300);
        });
    });

    // Animation for completing task
    document.querySelectorAll('.complete-btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const li = this.closest('li');
            li.style.transform = 'scale(0.98)';
            setTimeout(() => {
                this.closest('form').submit();
            }, 300);
        });
    });

    // Hover animations for buttons
    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', () => {
            button.style.transform = 'translateY(-2px)';
            button.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)';
        });

        button.addEventListener('mouseleave', () => {
            button.style.transform = 'translateY(0)';
            button.style.boxShadow = 'none';
        });
    });
});