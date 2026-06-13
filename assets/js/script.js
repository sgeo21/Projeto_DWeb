// --- Contador de animais disponíveis ---
var totalAnimais = document.querySelectorAll('.card').length;
document.getElementById('contador-animais').textContent = '(' + totalAnimais + ' disponíveis)';

// --- Botões "Quero Adotar" nos cards ---
document.querySelectorAll('.btn-adotar').forEach(function(btn) {
    btn.addEventListener('click', function() {
        var animal = this.getAttribute('data-animal');
        var select = document.getElementById('animal');
        select.value = animal;
        document.querySelector('.form-container').scrollIntoView({ behavior: 'smooth' });
        select.style.borderColor = '#ff6fae';
        setTimeout(function() { select.style.borderColor = ''; }, 1500);
    });
});

// --- Máscara de telefone ---
document.getElementById('telefone').addEventListener('input', function() {
    var v = this.value.replace(/\D/g, '');
    if (v.length <= 10) {
        v = v.replace(/^(\d{2})(\d{4})(\d{0,4})/, '($1) $2-$3');
    } else {
        v = v.replace(/^(\d{2})(\d{5})(\d{0,4})/, '($1) $2-$3');
    }
    this.value = v.trim().replace(/-$/, '');
});

// --- Validação e envio do formulário ---
document.getElementById('form-adocao').addEventListener('submit', function(e) {
    e.preventDefault();
    var valido = true;

    // Nome
    var nome = document.getElementById('nome').value.trim();
    var erroNome = document.getElementById('erro-nome');
    if (nome.length < 3) {
        erroNome.textContent = 'Por favor, informe seu nome completo.';
        valido = false;
    } else {
        erroNome.textContent = '';
    }

    // E-mail
    var email = document.getElementById('email').value.trim();
    var erroEmail = document.getElementById('erro-email');
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        erroEmail.textContent = 'Informe um e-mail válido.';
        valido = false;
    } else {
        erroEmail.textContent = '';
    }

    // Telefone
    var tel = document.getElementById('telefone').value.replace(/\D/g, '');
    var erroTel = document.getElementById('erro-telefone');
    if (tel.length < 10) {
        erroTel.textContent = 'Informe um telefone válido com DDD.';
        valido = false;
    } else {
        erroTel.textContent = '';
    }

    // Animal
    var animal = document.getElementById('animal').value;
    var erroAnimal = document.getElementById('erro-animal');
    if (!animal) {
        erroAnimal.textContent = 'Selecione o animal de interesse.';
        valido = false;
    } else {
        erroAnimal.textContent = '';
    }

    if (!valido) return;

    // Exibir modal de sucesso
    var primeiroNome = nome.split(' ')[0];
    document.getElementById('modal-titulo').textContent = 'Solicitação enviada, ' + primeiroNome + '!';
    document.getElementById('modal-texto').textContent =
        'Recebemos seu interesse em adotar ' + animal + '. Em breve entraremos em contato pelo e-mail ' + email + '. Obrigado por dar uma chance ao amor! 💛';

    document.getElementById('modal').classList.add('ativo');
    document.getElementById('form-adocao').reset();
});

// Fechar modal pelo botão
document.getElementById('modal-fechar').addEventListener('click', function() {
    document.getElementById('modal').classList.remove('ativo');
});

// Fechar modal clicando fora
document.getElementById('modal').addEventListener('click', function(e) {
    if (e.target === this) this.classList.remove('ativo');
});
