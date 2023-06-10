'use client'

import Header from "@/components/Header/page";
import Footer from "@/components/Footer/page";

export default function Politica() {
  return (
    <div>
      <div className="min-h-screen select-text">
        <Header />
        <div className="bg-white text-black flex flex-col justify-center leading-relaxed items-center text-center gap-20">
          <p>
            Política de Privacidade do Aplicativo FAUA (Faça Uma Boa Ação)<br/><br/>

            A sua privacidade é importante para nós. Esta Política de Privacidade descreve como coletamos, usamos, armazenamos e protegemos as informações pessoais que você fornece ao utilizar o aplicativo FAUA ("Aplicativo"), desenvolvido pela Faça Uma Boa Ação ("Nós", "Nosso" ou "Empresa"). Ao utilizar o Aplicativo, você concorda com a coleta e o uso de suas informações pessoais de acordo com esta Política de Privacidade.
            <br/><br/>
            Informações Coletadas<br/>
            1.1 Informações Pessoais: Ao utilizar o Aplicativo, podemos coletar as seguintes informações pessoais fornecidas por você:
            <br/><br/>
            Nome<br/>
            Endereço de e-mail<br/>
            Informações de contato<br/>
            Informações demográficas<br/>
            Informações de perfil e preferências<br/>
            Outras informações que você optar por fornecer<br/><br/>
            1.2 Informações de Uso: Também podemos coletar informações sobre o uso do Aplicativo, incluindo, mas não se limitando a:
            <br/><br/>
            Endereço IP<br/>
            Tipo de dispositivo utilizado<br/>
            Sistema operacional<br/>
            Navegador da web<br/>
            Atividades e interações dentro do Aplicativo<br/>
            Dados de localização, quando autorizados por você<br/>
            Uso das Informações<br/><br/>
            2.1 Finalidade do Uso: Utilizamos as informações coletadas para fornecer, operar, melhorar e personalizar o Aplicativo. As informações também podem ser utilizadas para:
            <br/><br/>
            Enviar comunicações relacionadas ao Aplicativo<br/>
            Fornecer suporte ao usuário<br/>
            Personalizar a experiência do usuário<br/>
            Realizar pesquisas e análises de dados<br/>
            Cumprir obrigações legais e regulatórias<br/>
            2.2 Compartilhamento de Informações: Podemos compartilhar suas informações pessoais com terceiros apenas nas seguintes circunstâncias:<br/>
            <br/><br/>
            Com o seu consentimento explícito<br/>
            Para cumprir obrigações legais e regulatórias<br/>
            Com prestadores de serviços terceirizados que nos auxiliam na operação do Aplicativo<br/>
            Em caso de fusão, aquisição ou venda de ativos da Empresa<br/>
            Segurança das Informações<br/>
            Implementamos medidas de segurança adequadas para proteger suas informações pessoais contra acesso não autorizado, alteração, divulgação ou destruição. No entanto, nenhuma transmissão de dados pela internet ou sistema de armazenamento eletrônico é totalmente seguro, portanto, não podemos garantir sua segurança absoluta.<br/>
            <br/><br/>
            Cookies e Tecnologias Semelhantes<br/>
            O Aplicativo pode utilizar cookies e outras tecnologias semelhantes para coletar informações sobre sua interação com o Aplicativo. Essas informações são usadas para melhorar a funcionalidade e a experiência do usuário. Você pode optar por desativar os cookies em seu navegador, mas isso pode afetar o funcionamento adequado do Aplicativo.<br/>
            <br/><br/>
            Links para Sites de Terceiros<br/>
            O Aplicativo pode conter links para sites de terceiros. Esta Política de Privacidade se aplica apenas ao Aplicativo FAUA. Ao clicar em um link para um site de terceiros, recomendamos que você revise a política de privacidade desse site antes de fornecer qualquer informação pessoal.<br/>
            <br/><br/>
            Atualizações da Política de Privacidade<br/>
            Podemos atualizar esta Política de Privacidade periodicamente. Recomendamos que você reveja esta política regularmente para se manter informado sobre nossas práticas de privacidade. A data da última atualização será indicada no final desta Política.<br/>
            <br/><br/>
            Contato<br/>
            Se você tiver dúvidas, preocupações ou solicitações relacionadas a esta Política de Privacidade ou ao uso de suas informações pessoais, entre em contato conosco através dos canais de suporte fornecidos no Aplicativo.
            <br/><br/>
            Última atualização: {new Date().toDateString()}
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
}
