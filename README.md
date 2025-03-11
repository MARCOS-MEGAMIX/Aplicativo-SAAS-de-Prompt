# promptvault-app

Projeto Next.js com Prisma para gerenciamento de prompts.

## Estrutura do Banco de Dados
A estrutura das tabelas está definida em:
- **database/schema.sql** — comandos SQL para criação e manutenção das tabelas.
- **prisma/schema.prisma** — definição do Prisma Client e mapeamento das entidades.

## Gerar Prisma Client
Em ambientes que suportam binários nativos, utilize:
  
  npx prisma generate

### Problema: Erro "socket hang up" e aviso sobre OpenSSL

Este erro ocorre porque o Prisma não conseguiu detectar corretamente a versão do libssl/openssl, o que pode acontecer em ambientes que não suportam execução de binários nativos (como o WebContainer). A mensagem indica que o download dos binários falhou.

#### Possíveis Soluções:
- **Utilize um ambiente local ou com suporte a binários nativos:** Execute o comando em uma máquina que possua o OpenSSL instalado.
- **Instale manualmente o OpenSSL:** Siga as [instruções oficiais](https://www.openssl.org/) para instalar o OpenSSL e garanta que ele esteja acessível no PATH.
- **Defina a variável de ambiente PRISMA_SKIP_DOWNLOAD:** Caso você não precise do download dos binários (ou esteja utilizando outras alternativas), essa flag pode ser útil. No entanto, essa configuração já está definida no arquivo `.env` do projeto:
  
  DATABASE_URL="postgresql://user:password@localhost:5432/yourdbname"  
  PRISMA_SKIP_DOWNLOAD=1

*Atenção:* O ambiente WebContainer, utilizado no navegador, não suporta binários nativos. Dessa forma, para executar o comando "npx prisma generate" sem erros, é necessário utilizar um ambiente que cumpra os requisitos nativos, ou preparar uma solução alternativa para desenvolvimento local.

Consulte a [documentação do Prisma](https://www.prisma.io/docs/) para mais informações sobre requisitos e configurações.

Happy coding!
