// MENU TRANSIÇÃO
const menu = document.querySelector('.menu');
const NavMenu = document.querySelector('.nav-menu');

menu.addEventListener('click', () => {
    menu.classList.toggle('ativo');
    NavMenu.classList.toggle('ativo');
})

function redirecionar() {
    window.location.href = '#';
}

// BOTÃO AUMENTE OS CLIENTES

document.querySelector('.clientes-btn').addEventListener('click', function() {
    document.getElementById('form-section').scrollIntoView({
        behavior: 'smooth'
    });
});
