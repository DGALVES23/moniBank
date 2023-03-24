import ehUmCPF from "./validaCPF.js";
import ehMaiorDeIdade from "./validaIdade.js";
const camposDoFurmulario = document.querySelectorAll("[required]")
//buscando no DOM utilizando o data-atributes
const formulario = document.querySelector("[data-formulario]")

//ouvir quando o formulario for enviado (submit)
formulario.addEventListener("submit", (e) => {
      e.preventDefault();
      
      const listaRespostas = {
            "nome": e.target.elements["nome"].value, 
            "email": e.target.elements["email"].value, 
            "rg": e.target.elements["rg"].value, 
            "cpf": e.target.elements["cpf"].value, 
            "aniversario": e.target.elements["aniversario"].value
      }
      //definindo o localStorage(objeto que permite o salvamento de pares de valores no navegador)
      localStorage.setItem("cadastro", JSON.stringify(listaRespostas));
      //redirecionamento para a proxima pagina
      window.location.href = './abrir-conta-form-2.html'
})

//funcao para chamar verificacao do campo qunado clicarmos fora
camposDoFurmulario.forEach((campo) => {
      campo.addEventListener("blur", () => verificaCampo(campo));
      //Prevent Default
      campo.addEventListener("invalid", evento => evento.preventDefault());    
})

const tiposDeErros = [
      'valueMissing',
      'typeMismatch',
      'patternMismatch',
      'tooShort',
      'customError'
]
const mensagens = {
      nome: {
            valueMissing: "O campo de nome não pode estar vazio.",
            patternMismatch: "Por favor, preencha um nome válido.",
            tooShort: "Por favor, preencha um nome válido."
      },
      email: {
            valueMissing: "O campo de e-mail não pode estar vazio.",
            typeMismatch: "Por favor, preencha um email válido.",
            tooShort: "Por favor, preencha um e-mail válido."
      },
      rg: {
            valueMissing: "O campo de RG não pode estar vazio.",
            patternMismatch: "Por favor, preencha um RG válido.",
            tooShort: "O campo de RG não tem caractéres suficientes."
      },
      cpf: {
            valueMissing: 'O campo de CPF não pode estar vazio.',
            patternMismatch: "Por favor, preencha um CPF válido.",
            customError: "O CPF digitado não existe.",
            tooShort: "O campo de CPF não tem caractéres suficientes."
      },
      aniversario: {
            valueMissing: 'O campo de data de nascimento não pode estar vazio.',
            customError: 'Você deve ser maior que 18 anos para se cadastrar.'
      },
      termos: {
            valueMissing: 'Você deve aceitar nossos termos antes de continuar.',
      }
}

//funcao que verifica os dados do cpf
function verificaCampo(campo) {
      let mensagem = "";
      //Reiniciar a mensagem de erro do cpf invávildo
      campo.setCustomValidity('');
      if (campo.name == "cpf" && campo.value.length >= 11) {
            ehUmCPF(campo);
      }
      if (campo.name == "aniversario" && campo.value != ""){
            ehMaiorDeIdade(campo);
      }
      tiposDeErros.forEach(erro => {
            if(campo.validity[erro]){
                  mensagem = mensagens[campo.name][erro]
                  console.log(mensagem);
            }
      })
      const mensagemErro = campo.parentNode.querySelector('.mensagem-erro');
      const validadorDeInput = campo.checkValidity();

      if (!validadorDeInput){
            mensagemErro.textContent = mensagem;
      } else {
            mensagemErro.textContent = "";
      }
}