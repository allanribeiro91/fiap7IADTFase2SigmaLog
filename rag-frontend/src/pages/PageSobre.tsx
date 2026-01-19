import styled from "styled-components";
import { BoxGeneric } from "../components/BoxGeneric";
import { SobreProjetoContent } from "../components/SobreProjetoContent";
import allanImg from "../assets/allanribeiro.png";
import andersonImg from "../assets/andersoncosta.png";
import diegoImg from "../assets/diegocordeiro.png";
import gustavoImg from "../assets/gustavopaulino.png";
import githubImg from "../assets/github.png";

import { Avatar } from "../components/Avatar";
import { ExplicacaoProjetoContent } from "../components/ExplicacaoProjetoContent";

const Page = styled.div`
  display: flex;
  flex-direction: column;

  gap: ${({ theme }) => theme.spacing.lg};
  padding: ${({ theme }) => theme.spacing.lg};
  height: 100%;
  width: 100%;
  overflow-y: auto;

   /* Firefox */
  scrollbar-width: none;

  /* Internet Explorer / Edge antigo */
  -ms-overflow-style: none;

  /* Chrome, Edge, Safari */
  &::-webkit-scrollbar {
    display: none;
  }

`;



const TeamGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: ${({ theme }) => theme.spacing.sm};
  text-align: center;
`;



const Name = styled.div`
  font-size: 0.8rem;
`;

const Rm = styled.div`
  font-size: 0.7rem;
  color: ${({ theme }) => theme.colors.muted};
`;

const VideoCard = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.radius.md};
  overflow: hidden;
  flex: 1;
  min-height: 0;

  display: flex;
  justify-content: center;
  align-items: center;
`;


const VideoWrapper = styled.div`
  width: 70%;
  max-width: 960px;        /* evita exagero em telas grandes */
  aspect-ratio: 16 / 9;   /* preserva proporção */
`;

const Iframe = styled.iframe`
  width: 100%;
  height: 100%;
  border: none;
`;


const RepoCard = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.radius.md};
  padding: ${({ theme }) => theme.spacing.md};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  cursor: pointer;

  &:hover {
    background: ${({ theme }) => theme.colors.surfaceLight};
  }
`;

const RepoImage = styled.img`
  width: 48px;
  height: 48px;
  object-fit: contain;
`;

const TEAM = {
  members: [
    { name: "Allan Ribeiro", rm: "RM367988", image: allanImg },
    { name: "Anderson Costa", rm: "RM368340", image: andersonImg },
    { name: "Diego Cordeiro", rm: "RM369026", image: diegoImg },
    { name: "Gustavo Paulino", rm: "RM369057", image: gustavoImg },
  ],
}

export function PageSobre() {
  return (
    <Page>

        <BoxGeneric title="Sobre o projeto" eventKey="sobre" defaultOpen>
          <SobreProjetoContent />
        </BoxGeneric>

        <BoxGeneric title="Equipe" eventKey="equipe" defaultOpen>
          <TeamGrid>
            {TEAM.members.map((member, i) => (
              <div key={i}>
                <Avatar src={member.image} alt={member.name} />
                <Name>{member.name}</Name>
                <Rm>{member.rm}</Rm>
              </div>
            ))}
          </TeamGrid>
        </BoxGeneric>

        <BoxGeneric title="Explicação do projeto" eventKey="explicacao" defaultOpen>
          <ExplicacaoProjetoContent />
        </BoxGeneric>  

        <BoxGeneric title="Apresentação do Projeto" eventKey="video" defaultOpen>
              <VideoCard>
                <VideoWrapper>
                  <Iframe
                    src="https://www.youtube.com/embed/kRytmf1wVjE"
                    title="Apresentação do Projeto Logística Segura"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </VideoWrapper>
              </VideoCard>
        </BoxGeneric>


        <BoxGeneric title="Repositório do Projeto" eventKey="repositorio" defaultOpen>
          <RepoCard
            onClick={() =>
              window.open(
                "https://github.com/allanribeiro91/fiap7IADTFase2SigmaLog",
                "_blank"
              )
            }
            title="Abrir repositório no GitHub"
          >
            <RepoImage src={githubImg} alt="Repositório no GitHub" />
          </RepoCard>
        </BoxGeneric>
    </Page>
  );
}

