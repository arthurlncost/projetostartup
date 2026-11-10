
    export async function buscarCep(cep) { //Crie uma função chamada buscarCep, que recebe um CEP, pode esperar respostas da internet e pode ser utilizada em outros arquivos.”

        const cepLimpo = cep.replace(/\D/g, '');//remove tudo que não for numero 

        if (cepLimpo.length !== 8) { // pega a quantidade de caracteres, se for diferente de 8 informa que o cep esta invalido
            throw new Error("CEP inválido. Digite 8 números.");
        }

         try {// tenta fazer esse comando primeiro 
            const resposta = await fetch(`https://viacep.com.br/ws/${cepLimpo}/json/`);//“Vai nesse endereço e me traz uma resposta.”

            const dados = await resposta.json();// pega o conteudo da resposta e interpreta como jonson pra trabalhar com esses dados no js

            if (dados.erro) {//Jonson, veio uma propriedade erro indicando que esse CEP não foi encontrado? se não segue em frentre 
                 throw new Error("CEP não encontrado.");
            }   

            return dados;

         } catch (erro) { // se der erro, retorna isso pro jsx
            console.error("Erro ao buscar CEP:", erro);
            throw erro;
        }

    }