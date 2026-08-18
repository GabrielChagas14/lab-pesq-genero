/**
 * publicacoes.js
 * Mock de publicações compartilhado entre a listagem e a página de detalhe.
 * Em produção, substituir pelas chamadas de API.
 */
export const publicacoesMock = [
    {
        id: 1,
        pesquisador: 'Dra. Ana Luísa Ferreira',
        titulo: 'Gênero e poder nas narrativas jornalísticas brasileiras',
        tipo: 'texto',
        resumo: 'Uma análise crítica sobre como as vozes femininas são silenciadas na cobertura política dos principais veículos de comunicação do país.',
        conteudo: `A sub-representação feminina no jornalismo político brasileiro não é um fenômeno novo. Pesquisas realizadas ao longo da última década apontam consistentemente que mulheres figuram como fontes em menos de 25% das matérias sobre política publicadas nos maiores jornais do país.

Este artigo examina, por meio de análise de conteúdo qualitativa, 1.200 matérias publicadas entre 2020 e 2024 em quatro veículos de grande circulação. Os resultados revelam padrões sistemáticos de silenciamento: quando mulheres são citadas, predominam temas de saúde, educação e assistência social, raramente figurando como especialistas em economia ou segurança.

A pesquisa também identificou que a linguagem utilizada para descrever lideranças femininas difere significativamente da usada para homens em posições equivalentes — com ênfase em características físicas, emocionais e familiares —, perpetuando estereótipos que diminuem a autoridade percebida das fontes femininas.

Conclui-se que as redações brasileiras precisam adotar protocolos deliberados de inclusão de vozes femininas como especialistas em todas as áreas do jornalismo político, rompendo com a reprodução inconsciente de estruturas patriarcais que moldam o espaço público informativo.`,
        data_publicacao: '2025-03-15',
        categoria: 'Violência de Gênero',
    },
    {
        id: 2,
        pesquisador: 'Prof. Carlos Mendes',
        titulo: 'Violência de gênero: mapeamento regional 2024',
        tipo: 'pdf',
        resumo: 'Relatório com dados regionais sobre violência doméstica e de gênero, cruzando indicadores socioeconômicos e acesso à justiça.',
        conteudo: `Este relatório apresenta os dados consolidados do mapeamento regional de violência de gênero realizado em 2024, abrangendo todas as cinco regiões do Brasil. A pesquisa integra registros de boletins de ocorrência, dados de atendimentos em serviços de saúde e informações de abrigos e centros de referência.

Os dados apontam crescimento de 18% nos registros de violência doméstica nas regiões Norte e Nordeste em comparação com 2022, enquanto as regiões Sul e Sudeste apresentaram redução de 7%, possivelmente associada à expansão da rede de apoio nesses territórios.

O cruzamento com indicadores de IDH municipal revelou correlação negativa significativa entre acesso à educação e taxas de violência. Municípios com maior cobertura de CREAS apresentaram, em média, 23% menos feminicídios consumados, sugerindo o papel crucial da rede de proteção.

As recomendações incluem expansão emergencial de delegacias especializadas nas regiões de maior vulnerabilidade, criação de plantões noturnos nos centros de referência e implementação de protocolos de avaliação de risco padronizados.`,
        data_publicacao: '2025-06-01',
        categoria: 'Violência de Gênero',
    },
    {
        id: 3,
        pesquisador: 'Ma. Beatriz Oliveira',
        titulo: 'Feminismo interseccional: conceitos e práticas',
        tipo: 'video',
        resumo: 'Palestra gravada no Simpósio Ibero-Americano de Estudos de Gênero, abordando as interseções entre raça, classe e gênero.',
        conteudo: `Esta palestra, proferida no IV Simpósio Ibero-Americano de Estudos de Gênero (São Paulo, 2025), apresenta os fundamentos teóricos do feminismo interseccional e suas aplicações práticas no contexto brasileiro.

A palestrante parte do conceito seminal de Kimberlé Crenshaw para demonstrar como raça, classe, gênero, sexualidade e deficiência se entrelaçam na produção de desigualdades específicas que não podem ser compreendidas por categorias isoladas. Utilizando casos concretos da realidade brasileira — como o mercado de trabalho doméstico, a hiper-encarceração de mulheres negras e as lacunas na cobertura de saúde —, a palestra torna tangível uma teoria muitas vezes percebida como abstrata.

A segunda parte da apresentação discute metodologias interseccionais de pesquisa e ativismo, com ênfase em abordagens participativas que incluem as próprias comunidades afetadas como produtoras de conhecimento. A palestrante apresenta experiências de pesquisa-ação desenvolvidas em parceria com coletivos periféricos de Salvador e Belém.`,
        data_publicacao: '2025-04-20',
        categoria: 'Violência de Gênero',
    },
    {
        id: 4,
        pesquisador: 'Dra. Renata Souza',
        titulo: 'Podcast: Mulheres na Ciência',
        tipo: 'podcast',
        resumo: 'Série de episódios com pesquisadoras que narram suas trajetórias no ambiente acadêmico e os desafios enfrentados.',
        conteudo: `A série "Mulheres na Ciência" reúne, ao longo de doze episódios, pesquisadoras de diferentes áreas do conhecimento que compartilham suas trajetórias na academia brasileira. O projeto nasceu da constatação de que, apesar de mulheres representarem mais de 50% dos mestres e doutores formados no país, ainda ocupam menos de 25% das posições de chefia em institutos de pesquisa.

Cada episódio segue um formato de entrevista aprofundada, com duração média de 45 minutos, abordando a trajetória da pesquisadora, os obstáculos específicos enfrentados (assédio, invisibilização, dupla jornada), as estratégias de superação e as redes de apoio que se mostraram fundamentais.

Destaques da temporada incluem as histórias de uma astrofísica da UFRJ que foi a primeira mulher negra a defender doutorado em seu departamento, de uma engenheira química que criou um grupo de mentoria para alunas de graduação, e de uma bióloga marinha que conciliou gravidez e pós-doutorado em condições adversas.`,
        data_publicacao: '2025-07-10',
        categoria: 'Violência de Gênero',
    },
    {
        id: 5,
        pesquisador: 'Prof. João Araujo',
        titulo: 'Base de dados: ocorrências por bairro – SP',
        tipo: 'link',
        resumo: 'Link para o repositório público com dados georreferenciados de ocorrências de violência de gênero na cidade de São Paulo.',
        conteudo: `Este repositório disponibiliza em formato aberto os dados georreferenciados de ocorrências de violência de gênero registradas na cidade de São Paulo entre 2018 e 2024. Os dados foram obtidos por meio de pedidos de acesso à informação à Secretaria de Segurança Pública do Estado de São Paulo e estão organizados por bairro, tipo de ocorrência e ano.

A base inclui variáveis como tipo de violência (física, psicológica, sexual, patrimonial), vínculo entre vítima e agressor, turno da ocorrência e informações demográficas anonimizadas das vítimas. Os arquivos estão disponíveis nos formatos CSV, GeoJSON e Shapefile para uso em softwares de SIG.

A documentação completa do processo de obtenção e tratamento dos dados está disponível no arquivo README do repositório. Contribuições da comunidade para correção e enriquecimento da base são bem-vindas por meio de pull requests.`,
        data_publicacao: '2025-05-05',
        categoria: 'Feminicídio',
    },
    {
        id: 6,
        pesquisador: 'Ma. Fernanda Lima',
        titulo: 'Representatividade LGBTQIA+ nas universidades federais',
        tipo: 'texto',
        resumo: 'Estudo quantiqualitativo sobre as políticas de inclusão e os desafios enfrentados por estudantes LGBTQIA+ nas IFEs.',
        conteudo: `Este estudo investiga as condições de permanência e os desafios enfrentados por estudantes LGBTQIA+ nas Instituições Federais de Ensino Superior (IFES) brasileiras. A pesquisa combinou questionário online respondido por 3.412 estudantes de 47 universidades com entrevistas aprofundadas realizadas com 86 participantes em seis estados.

Os resultados revelam que 68% dos respondentes já vivenciaram alguma forma de discriminação no ambiente universitário — incluindo aulas, laboratórios, repúblicas estudantis e espaços de convivência. Entre estudantes trans e não-binários, esse percentual sobe para 89%.

Apesar da existência de Núcleos de Diversidade em 71% das instituições pesquisadas, apenas 23% dos estudantes LGBTQIA+ que sofreram discriminação recorreram a esses espaços, citando desconfiança na efetividade, medo de represálias e falta de divulgação como principais barreiras.

As recomendações incluem o uso do nome social em todos os registros acadêmicos, treinamento obrigatório de docentes e técnicos em diversidade, criação de banheiros neutros e programas de bolsas específicos para estudantes LGBTQIA+ em situação de vulnerabilidade.`,
        data_publicacao: '2025-02-28',
        categoria: 'Violência de Gênero',
    },
    {
        id: 7,
        pesquisador: 'Dra. Camila Pereira',
        titulo: 'O mercado de trabalho e as desigualdades de gênero',
        tipo: 'pdf',
        resumo: 'Análise dos dados do IBGE sobre disparidades salariais e segregação ocupacional por gênero no Brasil de 2010 a 2024.',
        conteudo: `Esta análise longitudinal examina as transformações e persistências nas desigualdades de gênero no mercado de trabalho brasileiro entre 2010 e 2024, utilizando microdados da PNAD Contínua e da Relação Anual de Informações Sociais (RAIS).

Os dados confirmam a persistência do hiato salarial de gênero: em 2024, mulheres recebem em média 77,8 centavos para cada real ganho por homens em ocupações equivalentes, uma melhora tímida em relação aos 74,2 centavos registrados em 2010. Quando se controla por raça, mulheres negras recebem apenas 53 centavos por real ganho por homens brancos.

A segregação ocupacional horizontal — concentração de mulheres em determinados setores — manteve-se estável no período, com mulheres representando mais de 80% dos trabalhadores em educação infantil, serviço doméstico e enfermagem, e menos de 15% em engenharia, tecnologia da informação e construção civil.

A pandemia de COVID-19 aprofundou temporariamente as desigualdades, com taxas de desemprego feminino chegando a 20% em 2021, contra 14% masculino — efeito relacionado à concentração de mulheres em setores de serviços mais impactados e ao aumento desproporcionado das responsabilidades de cuidado.`,
        data_publicacao: '2025-01-18',
        categoria: 'Crimes do Patriarcado',
    },
    {
        id: 8,
        pesquisador: 'Prof. Marcos Ribeiro',
        titulo: 'Documentário: Vozes do Sertão',
        tipo: 'video',
        resumo: 'Curta-metragem que documenta a resistência de mulheres agricultoras no semiárido nordestino diante das mudanças climáticas.',
        conteudo: `"Vozes do Sertão" é um documentário de curta-metragem (28 minutos) que acompanha por seis meses a vida de cinco mulheres agricultoras do semiárido nordestino e suas estratégias de resistência frente às mudanças climáticas e à seca.

O filme retrata as práticas agroecológicas desenvolvidas pelas protagonistas — entre elas cisternas de captação de água da chuva, hortas em mandala e manejo de sementes crioulas —, demonstrando como o conhecimento tradicional feminino é central para a segurança alimentar das comunidades rurais.

A narrativa também evidencia as estruturas de poder que dificultam o acesso das mulheres à terra, ao crédito rural e à assistência técnica, contrastando com a centralidade que ocupam nas práticas cotidianas de produção e cuidado.

O documentário foi exibido em doze festivais de cinema ambiental e direitos humanos e recebeu o prêmio de Melhor Documentário Curto no Festival Mulheres em Foco 2025. Está disponível gratuitamente na plataforma do laboratório.`,
        data_publicacao: '2025-08-01',
        categoria: 'Crimes do Patriarcado',
    },
    {
        id: 9,
        pesquisador: 'Ma. Juliana Costa',
        titulo: 'Episódio 12 – Saúde mental e gênero',
        tipo: 'podcast',
        resumo: 'Debate com psicólogas e ativistas sobre os impactos da cultura do patriarcado na saúde mental de mulheres e pessoas não-binárias.',
        conteudo: `Neste episódio, a pesquisadora Juliana Costa recebe três convidadas — uma psicóloga clínica especialista em trauma de gênero, uma ativista do movimento de saúde mental comunitária e uma pesquisadora do campo da psicologia social — para uma conversa aprofundada sobre os entrelaçamentos entre cultura patriarcal e saúde mental.

A conversa aborda como estruturas sociais de dominação se inscrevem no psiquismo individual, manifestando-se em quadros de ansiedade, depressão, transtornos alimentares e síndrome de impostura — patologias com prevalência significativamente maior entre mulheres e pessoas LGBTQIA+. As convidadas discutem criticamente a tendência de "patologizar" respostas adaptativas a ambientes opressores sem questionar as causas estruturais.

O episódio também trata da escassez de profissionais de saúde mental com formação em gênero e sexualidade, das barreiras de acesso ao tratamento e das potencialidades das redes de cuidado mútuo como estratégia de resistência e promoção de saúde.`,
        data_publicacao: '2025-07-25',
        categoria: 'Violência de Gênero',
    },
    {
        id: 10,
        pesquisador: 'Dra. Patrícia Alves',
        titulo: 'Direitos reprodutivos na América Latina',
        tipo: 'texto',
        resumo: 'Revisão bibliográfica comparativa sobre as legislações e disputas em torno dos direitos reprodutivos nos países latino-americanos.',
        conteudo: `Esta revisão bibliográfica sistemática examina a situação dos direitos reprodutivos em dezoito países da América Latina e Caribe, mapeando o estado atual das legislações, os avanços recentes e os retrocessos impostos por ondas conservadoras nos últimos cinco anos.

O panorama revela profunda heterogeneidade regional: enquanto Argentina, Colômbia e México avançaram significativamente na descriminalização do aborto, países como El Salvador, Honduras e República Dominicana mantêm proibições absolutas que resultam em mortes evitáveis de mulheres em situação de vulnerabilidade.

A análise identifica padrões nos processos de avanço e retrocesso: a mobilização de movimentos feministas organizados e a presença de mulheres em posições de poder no sistema de justiça surgem como fatores protetores, enquanto alianças entre lideranças religiosas conservadoras e partidos políticos de direita mostram correlação com restrições legislativas.

A pesquisa também discute os efeitos da pandemia sobre os serviços de saúde sexual e reprodutiva, documentando o agravamento das barreiras de acesso e o aumento de gestações não planejadas em contextos de lockdown sem garantia de serviços essenciais.`,
        data_publicacao: '2025-06-30',
        categoria: 'Crimes do Patriarcado',
    },
    {
        id: 11,
        pesquisador: 'Ma. Larissa Nunes',
        titulo: 'Cartografia da violência obstétrica no Brasil',
        tipo: 'link',
        resumo: 'Portal interativo que agrega relatos, estudos e legislação sobre violência obstétrica, com filtros por estado e ano.',
        conteudo: `Este portal foi desenvolvido como resultado de três anos de pesquisa colaborativa sobre violência obstétrica no Brasil, reunindo em uma plataforma de acesso aberto: banco de dados de estudos acadêmicos publicados entre 2010 e 2024, mapa interativo de denúncias organizadas por estado, compilação da legislação vigente em cada unidade federativa e repositório de relatos de mulheres coletados com consentimento.

O portal permite filtrar as informações por região, tipo de violência (física, psicológica, negligência), tipo de parto (normal, cesárea) e características sociodemográficas das vítimas, evidenciando como a violência obstétrica afeta de forma desproporcionalmente grave mulheres negras, indígenas, adolescentes e em situação de vulnerabilidade socioeconômica.

A plataforma integra também um guia de direitos para gestantes e parturientes, com linguagem acessível, e uma seção dedicada a profissionais de saúde com materiais formativos sobre parto humanizado e consentimento informado.`,
        data_publicacao: '2025-03-03',
        categoria: 'Violência de Gênero',
    },
    {
        id: 12,
        pesquisador: 'Prof. Rodrigo Matos',
        titulo: 'Masculinidades e crise do patriarcado',
        tipo: 'texto',
        resumo: 'Ensaio teórico que examina como as transformações sociais contemporâneas afetam as construções identitárias masculinas.',
        conteudo: `Este ensaio propõe uma leitura das masculinidades contemporâneas a partir da tese de que o patriarcado, enquanto sistema de dominação, encontra-se em um momento de crise — não de dissolução, mas de reconfiguração que ao mesmo tempo gera resistências violentas e abre brechas para transformações.

A primeira parte do ensaio revisita as contribuições teóricas de R.W. Connell sobre masculinidades hegemônicas e subordinadas, atualizando-as à luz das transformações do mercado de trabalho pós-industrial, do impacto dos movimentos feministas e LGBTQIA+ na redefinição dos papéis de gênero e do surgimento de novas formas de sociabilidade digital.

A segunda parte analisa fenômenos aparentemente contraditórios: de um lado, o crescimento de comunidades online misóginas (incels, manosphere) como reação à perda de privilégios masculinos; de outro, a expansão de movimentos de masculinidade positiva e grupos de homens comprometidos com o feminismo.

O ensaio conclui que a transformação das masculinidades é um campo de disputa central para o enfrentamento da violência de gênero, e que políticas públicas voltadas aos homens — como programas de prevenção e grupos reflexivos — são componentes necessários de uma estratégia abrangente.`,
        data_publicacao: '2025-04-11',
        categoria: 'Masculinidade',
    },
];
