'use client'

import Header from "@/components/Header/page";
import Footer from "@/components/Footer/page";

export default function Termos() {
  return (
    <div>
      <div className="min-h-screen select-text">
        <Header />
        <div className="bg-white text-black flex flex-col justify-center leading-relaxed items-center text-center gap-20">
          <p>
            Termos de Uso do Aplicativo FAUA (Faça Uma Boa Ação)<br/><br/>

            Estes Termos de Uso ("Termos") regem o uso do aplicativo FAUA ("Aplicativo"), fornecido pela Faça Uma Boa Ação ("Nós", "Nosso" ou "Empresa"). Ao utilizar o Aplicativo, você ("Usuário" ou "Você") concorda com estes Termos. Caso não concorde com eles, solicitamos que pare de utilizar o Aplicativo imediatamente.
            <br/><br/>
            Uso do Aplicativo<br/><br/>
            1.1 Licença Limitada: Concedemos a você uma licença limitada, não exclusiva e intransferível para utilizar o Aplicativo de acordo com estes Termos. Essa licença não permite que você copie, modifique, distribua, venda, alugue ou explore comercialmente o Aplicativo sem a nossa autorização prévia por escrito.
            <br/><br/>
            1.2 Restrições: Ao utilizar o Aplicativo, você concorda em não:
            <br/><br/>
            a) Violar qualquer lei, regulamento ou direito de terceiros;<br/>
            b) Interferir no funcionamento adequado do Aplicativo;<br/>
            c) Acessar áreas não autorizadas do Aplicativo;<br/>
            d) Utilizar o Aplicativo para fins ilegais, fraudulentos ou prejudiciais;<br/>
            e) Enviar ou transmitir qualquer conteúdo que seja ilegal, ofensivo, difamatório, obsceno ou de natureza prejudicial;<br/>
            f) Tentar contornar as medidas de segurança do Aplicativo;<br/>
            g) Usar o Aplicativo para coletar informações pessoais de outros usuários sem o consentimento adequado.<br/>
            <br/><br/>
            1.3 Responsabilidade do Usuário: Ao utilizar o Aplicativo, você é responsável por suas ações e pelo cumprimento destes Termos. Você concorda em indenizar a Empresa por qualquer violação destes Termos ou por qualquer atividade ilegal ou prejudicial relacionada ao uso do Aplicativo.
            <br/><br/>
            Privacidade e Proteção de Dados<br/><br/>
            2.1 Coleta de Dados: Ao utilizar o Aplicativo, podemos coletar certas informações pessoais conforme descrito em nossa Política de Privacidade. Ao concordar com estes Termos, você também concorda com a coleta, uso e armazenamento de suas informações pessoais de acordo com nossa Política de Privacidade.
            <br/><br/>
            2.2 Cookies e Tecnologias Semelhantes: Podemos utilizar cookies e outras tecnologias semelhantes para melhorar a sua experiência no Aplicativo. Ao utilizar o Aplicativo, você concorda com o uso de cookies e tecnologias semelhantes de acordo com nossa Política de Cookies.
            <br/><br/>
            Propriedade Intelectual<br/><br/>
            3.1 Direitos Autorais: O Aplicativo, incluindo todo o seu conteúdo, como textos, gráficos, logotipos, imagens, vídeos, áudios e software, é protegido por direitos autorais e outras leis de propriedade intelectual. Todos os direitos sobre o Aplicativo são reservados.
            <br/><br/>
            3.2 Marcas Registradas: Todas as marcas registradas, marcas de serviço, logotipos e nomes comerciais exibidos no Aplicativo são propriedade da Empresa ou de terceiros.
            <br/><br/>
            Limitação de Responsabilidade<br/><br/>
            4.1 Isenção de Garantias: O Aplicativo é fornecido "no estado em que se encontra", sem garantias de qualquer tipo, expressas ou implícitas. A Empresa não garante que o Aplicativo seja livre de erros, vírus, interrupções, omissões ou outras falhas.
            <br/><br/>
            4.2 Limitação de Responsabilidade: Em nenhuma circunstância a Empresa será responsável por quaisquer danos diretos, indiretos, incidentais, consequenciais, especiais ou punitivos decorrentes do uso ou da incapacidade de uso do Aplicativo.
            <br/><br/>
            Alterações nos Termos de Uso<br/><br/>
            Reservamo-nos o direito de modificar estes Termos a qualquer momento, mediante aviso prévio por meio do Aplicativo ou por outros meios razoáveis. Recomendamos que você revise periodicamente estes Termos para se manter atualizado sobre quaisquer alterações. O uso contínuo do Aplicativo após as alterações constituirá sua aceitação dos novos Termos.
            <br/><br/>
            Disposições Gerais<br/><br/>
            Estes Termos representam o acordo completo entre você e a Empresa em relação ao uso do Aplicativo e substituem todos os acordos anteriores. Caso qualquer disposição destes Termos seja considerada inválida ou inexequível, as demais disposições permanecerão em pleno vigor e efeito.
            <br/><br/>
            Contato<br/><br/>
            Se você tiver alguma dúvida, sugestão ou reclamação em relação a estes Termos ou ao Aplicativo, entre em contato conosco através dos canais de suporte fornecidos no Aplicativo.
            <br/><br/>
            Última atualização: {new Date().toDateString()}
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
}
