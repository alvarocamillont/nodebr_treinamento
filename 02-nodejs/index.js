/*
 0 Obter um usuário
 1 Obter o numero de telefone a partir do seu ID
 2 Obter o endereço do usuario pelo id
*/
function obterUsuario(callback) {
  setTimeout(() => {
    return callback(null, {
      id: 1,
      nome: 'Aladin',
      dataNascimento: new Date()
    });
  }, 1000);
}

function obterTelefone(idUsuario, callback) {
  setTimeout(() => {
    return callback(null, {
      telefone: '1154545',
      ddd: 11
    });
  }, 2000);
}

function obterEndereco(idUsuario, callback) {
  setTimeout(() => {
    return callback(null, {
      rua: 'av boschetti',
      numero: 1110
    });
  }, 2000);
}

function resolverUsuario(erro, usuario) {
  console.log(usuario);
}

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
//const telefone = obterTelefone(usuario.id);
