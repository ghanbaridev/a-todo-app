// انیمیشن هنگام اضافه کردن وظیفه جدید
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

// انیمیشن هنگام حذف
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

// انیمیشن هنگام تکمیل/بازگشت
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

// انیمیشن‌های hover
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