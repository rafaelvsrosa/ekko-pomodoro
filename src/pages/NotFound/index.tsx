import { useEffect } from "react";
import { Container } from "../../components/Container";
import { GenericHtml } from "../../components/GenericHtml";
import { Heading } from "../../components/Heading";
import { RouterLink } from "../../components/RouterLink";
import { MainTemplate } from "../../templates/MainTemplate";

export function NotFound() {
  useEffect(() => {
    document.title = "Página não encontrada - Ekko Pomodoro";
  }, []);

  return (
    <MainTemplate>
      <Container>
        <GenericHtml>
          <Heading>404 - Página não encontrada 🚀</Heading>
          <p>
            Opa! Parece que a página que você está tentando acessar não
            existe...
          </p>
          <p>
            Tente voltar para a{" "}
            <RouterLink href="/">página principal</RouterLink> ou{" "}
            <RouterLink href="/history/">para o histórico</RouterLink>!
          </p>
          <br />
        </GenericHtml>
      </Container>
    </MainTemplate>
  );
}
