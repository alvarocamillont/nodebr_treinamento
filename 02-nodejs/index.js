/*
 0 Obter um usuário
 1 Obter o numero de telefone a partir do seu ID
 2 Obter o endereço do usuario pelo id
*/
function obterUsuario() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      return resolve({
        id: 1,
        nome: 'Aladin',
        dataNascimento: new Date()
      });
    }, 1000);
  });
}

function obterTelefone(idUsuario) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      return resolve({
        telefone: '1154545',
        ddd: 11
      });
    }, 2000);
  });
}

function obterEndereco(idUsuario) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      return resolve({
        rua: 'av boschetti',
        numero: 1110
      });
    }, 2000);
  });
}

const usuarioPromise = obterUsuario();
usuarioPromise
  .then((usuario) => {
    return obterTelefone(usuario.id).then((telefone) => {
      return {
        usuario: {
          nome: usuario.nome,
          id: usuario.id
        },
        telefone: telefone
      };
    });
  })
  .then((resultado) => {
    console.log(resultado);
  })
  .catch((error) => {
    console.error('Deu ruim', error);
  });

/*
obterUsuario((erro, usuario) => {
  if (erro) {
    console.error('Deu erro em USUARIO', erro);
    return;
  }
  obterTelefone(usuario.id, (error1, telefone) => {
    if (error1) {
      console.error('Deu erro em TELEFONE', erro);
      return;
    }
    console.log(telefone);

    obterEndereco(usuario.id, (error3, endereco) => {
      if (error3) {
        console.error('Deu erro em ENDEREÇO', erro);
        return;
      }
      console.log(
        `Nome:${usuario.nome},
          Endereço:${endereco.rua},
          Telefone:${telefone.telefone}`
      );
      return endereco;
    });
    return telefone;
  });
});
*/
//const telefone = obterTelefone(usuario.id);
