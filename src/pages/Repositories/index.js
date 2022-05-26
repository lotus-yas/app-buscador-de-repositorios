import React, {useEffect, useState} from 'react'; 
import { useNavigate } from 'react-router-dom';
import * as S from './styled';

export default function Repositories(){
   const navigate = useNavigate(); // o professor usou history no lugar do navigate
   const [repositories, setRepositories] = useState ([]);
   
    useEffect(() => { //hook para capturar o ciclo de vida de variáveis alteradas

        let repositoriesName = localStorage.getItem('repositoriesName');

        console.log(repositoriesName);

        //aqui um tratamento de erro para melhorar a experiência do usuário:

         if (repositoriesName !== null){
            repositoriesName = JSON.parse(repositoriesName);
            setRepositories(repositoriesName);
            localStorage.clear();

        }else{
            navigate ('/')
     }
    }, [navigate]);
        
    return(
        <S.Container> {/*o s é de style*/}
            <S.Title> Repositórios </S.Title>
            <S.List>
                { repositories.map((repository , index) => <S.ListItem key = {index}> Repositórios { repository } </S.ListItem>)}
            </S.List>

            <S.LinkHome to="/"> Voltar </S.LinkHome>
        </S.Container>
    )
}