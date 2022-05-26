import React, { useState } from 'react';
import axios from 'axios';
import * as S from './styled';
import { useNavigate } from 'react-router-dom';

 export default function App(){
  const navigate = useNavigate();
  const [ usuario, setUsuario] = useState('');
  const [erro, setErro] = useState(false);

  function handlePesquisa(){ 

    axios.get(`https://api.github.com/users/${usuario}/repos`).then(response => {
      const repositories = response.data; //retorna um objeto com a info desejada
      const repositoriesName = []; // uma nova variável para receber este array
      
      repositories.forEach((repository) =>  //leva o nome dos repositórios ao repositoriesName, ao invés de toda a info do usuário
        repositoriesName.push(repository.name));
     
        localStorage.setItem('RepositoriesName', JSON.stringify(repositoriesName)); //armazena o array com o nome dos repositórios. JSON.stringnify() transforma em string
        //para ver isso no console, vamos a plicativos > Amazenamento Local > e nossa url
        
        setErro(false);
        
        navigate('/repositories');
     
      })

    .catch(err =>  //o then é usado quando o valor buleano dá certo e o catch quando dá errado
       setErro(true)
    );
  }
  
  return (
    <S.HomeContainer>
      <S.Content>
        <S.Input className="usuarioInput" placeholder="Usuário" value={usuario} onChange={e => {setUsuario(e.target.value); setErro(false)}} />
        <S.Button type="button" onClick={handlePesquisa}>Pesquisar</S.Button>
        </S.Content>
        
        {erro ? <S.ErrorMsg> Ocorreu um erro. Tente novamente.</S.ErrorMsg> : ''} {/*aqui é se não der erro, então não exibe nada*/}
    </S.HomeContainer>
  );
}

