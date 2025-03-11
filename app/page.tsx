import Link from 'next/link'
import Image from 'next/image'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-black">
      {/* Banner Full Width */}
      <div className="bg-gradient-to-r from-[#9333EA] via-[#EC4899] to-[#F59E0B] text-white py-3 px-4">
        <div className="container mx-auto text-center">
          <p className="text-sm font-medium">
            🚀 Novo: Biblioteca de prompts com IA avançada disponível agora! 
            <Link href="/biblioteca" className="ml-2 underline hover:text-white/90">
              Saiba mais →
            </Link>
          </p>
        </div>
      </div>

      {/* Hero Section */}
      <header className="relative overflow-hidden py-20 sm:py-32 bg-black">
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-[url('/images/pattern.svg')] opacity-5" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#9333EA]/10 via-[#EC4899]/10 to-[#F59E0B]/10" />
        </div>
        
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl sm:text-6xl font-bold gradient-text mb-6 leading-tight">
              PromptVault
            </h1>
            <p className="text-xl sm:text-2xl text-[#E5E5E5] mb-10 leading-relaxed">
              Gerencie seus prompts de IA de forma inteligente e profissional. 
              Organize, otimize e compartilhe seus prompts em um só lugar.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/auth/signup" className="btn-primary">
                Começar Agora
              </Link>
              <Link href="#features" className="btn-secondary">
                Saiba Mais
              </Link>
            </div>
            
            <div className="mt-12 relative">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-[#9333EA] via-[#EC4899] to-[#F59E0B] rounded-lg blur opacity-30"></div>
              <div className="relative bg-[#121212] rounded-lg shadow-xl overflow-hidden border border-[#333333]">
                <Image 
                  src="/images/dashboard-mockup.svg"
                  alt="Dashboard Preview" 
                  width={1200} 
                  height={675}
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Features Section */}
      <section id="features" className="py-20 bg-[#121212]">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl font-bold gradient-text mb-4">
              Recursos Poderosos para Gerenciar seus Prompts
            </h2>
            <p className="text-xl text-[#E5E5E5]">
              Tudo o que você precisa para criar, organizar e otimizar seus prompts de IA
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Chat Prompts */}
            <div className="glass-card p-8 bounce-in">
              <div className="feature-icon">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-white">Chat Prompts</h3>
              <p className="text-[#E5E5E5]">
                Crie e organize prompts para chatbots com contexto, instruções e parâmetros personalizados.
              </p>
            </div>

            {/* Image Prompts */}
            <div className="glass-card p-8 bounce-in" style={{ animationDelay: '0.1s' }}>
              <div className="feature-icon">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-white">Image Prompts</h3>
              <p className="text-[#E5E5E5]">
                Gerencie prompts para geração de imagens com controle de estilo, dimensões e parâmetros avançados.
              </p>
            </div>

            {/* Code Prompts */}
            <div className="glass-card p-8 bounce-in" style={{ animationDelay: '0.2s' }}>
              <div className="feature-icon">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-white">Code Prompts</h3>
              <p className="text-[#E5E5E5]">
                Prompts especializados para geração e revisão de código com suporte a múltiplas linguagens.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-black">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl font-bold gradient-text mb-4">
              Por que escolher o PromptVault?
            </h2>
            <p className="text-xl text-[#E5E5E5]">
              Benefícios que transformam a maneira como você trabalha com IA
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
            <div className="space-y-8">
              <div className="flex gap-5 items-start fade-in">
                <div className="h-10 w-10 bg-[#121212] rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-[#9333EA]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-white">Organização Inteligente</h3>
                  <p className="text-[#E5E5E5]">
                    Categorize e encontre seus prompts facilmente com nossa estrutura intuitiva. Use tags, pastas e filtros avançados.
                  </p>
                </div>
              </div>
              <div className="flex gap-5 items-start fade-in" style={{ animationDelay: '0.1s' }}>
                <div className="h-10 w-10 bg-[#121212] rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-[#9333EA]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-white">Versionamento Seguro</h3>
                  <p className="text-[#E5E5E5]">
                    Mantenha o histórico de alterações e reverta para versões anteriores quando necessário. Nunca perca uma versão importante.
                  </p>
                </div>
              </div>
            </div>
            <div className="space-y-8">
              <div className="flex gap-5 items-start fade-in" style={{ animationDelay: '0.2s' }}>
                <div className="h-10 w-10 bg-[#121212] rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-[#9333EA]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-white">Compartilhamento Facilitado</h3>
                  <p className="text-[#E5E5E5]">
                    Compartilhe prompts com sua equipe e mantenha todos alinhados. Controle de permissões granular para cada prompt.
                  </p>
                </div>
              </div>
              <div className="flex gap-5 items-start fade-in" style={{ animationDelay: '0.3s' }}>
                <div className="h-10 w-10 bg-[#121212] rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-[#9333EA]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-white">Análise de Desempenho</h3>
                  <p className="text-[#E5E5E5]">
                    Acompanhe a efetividade dos seus prompts com métricas detalhadas. Identifique o que funciona melhor para cada caso.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-[#121212]">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl font-bold gradient-text mb-4">
              Planos e Preços
            </h2>
            <p className="text-xl text-[#E5E5E5]">
              Escolha o plano ideal para suas necessidades
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Free Plan */}
            <div className="glass-card p-8 flex flex-col h-full">
              <h3 className="text-2xl font-bold mb-2 text-white">Free</h3>
              <div className="text-4xl font-bold mb-1 text-white">
                R$ 0
              </div>
              <p className="text-gray-500 dark:text-gray-400 mb-6">por mês</p>
              <ul className="space-y-3 mb-8 flex-grow">
                <li className="flex items-center gap-3 text-gray-600 dark:text-gray-300">
                  <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>100 prompts/mês</span>
                </li>
                <li className="flex items-center gap-3 text-gray-600 dark:text-gray-300">
                  <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Chat e Text Prompts</span>
                </li>
                <li className="flex items-center gap-3 text-gray-600 dark:text-gray-300">
                  <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Biblioteca básica</span>
                </li>
              </ul>
              <Link href="/auth/signup?plan=free" className="btn-secondary w-full text-center">
                Começar Grátis
              </Link>
            </div>

            {/* Pro Plan */}
            <div className="glass-card p-8 flex flex-col h-full relative border-2 border-blue-500 dark:border-blue-400 transform scale-105 shadow-xl">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-1 rounded-full text-sm font-medium">
                Mais Popular
              </div>
              <h3 className="text-2xl font-bold mb-2 text-white">Pro</h3>
              <div className="text-4xl font-bold mb-1 text-white">
                R$ 29
              </div>
              <p className="text-gray-500 dark:text-gray-400 mb-6">por mês</p>
              <ul className="space-y-3 mb-8 flex-grow">
                <li className="flex items-center gap-3 text-gray-600 dark:text-gray-300">
                  <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>500 prompts/mês</span>
                </li>
                <li className="flex items-center gap-3 text-gray-600 dark:text-gray-300">
                  <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Todos os tipos de prompts</span>
                </li>
                <li className="flex items-center gap-3 text-gray-600 dark:text-gray-300">
                  <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Biblioteca completa</span>
                </li>
                <li className="flex items-center gap-3 text-gray-600 dark:text-gray-300">
                  <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Análise de prompts</span>
                </li>
                <li className="flex items-center gap-3 text-gray-600 dark:text-gray-300">
                  <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Suporte por email</span>
                </li>
              </ul>
              <Link 
                href="/precos/checkout?plan=pro" 
                className="btn-primary w-full text-center"
              >
                Assinar Pro
              </Link>
            </div>

            {/* Enterprise Plan */}
            <div className="glass-card p-8 flex flex-col h-full">
              <h3 className="text-2xl font-bold mb-2 text-white">Enterprise</h3>
              <div className="text-4xl font-bold mb-1 text-white">
                R$ 99
              </div>
              <p className="text-gray-500 dark:text-gray-400 mb-6">por mês</p>
              <ul className="space-y-3 mb-8 flex-grow">
                <li className="flex items-center gap-3 text-gray-600 dark:text-gray-300">
                  <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Prompts ilimitados</span>
                </li>
                <li className="flex items-center gap-3 text-gray-600 dark:text-gray-300">
                  <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>API dedicada</span>
                </li>
                <li className="flex items-center gap-3 text-gray-600 dark:text-gray-300">
                  <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Suporte prioritário</span>
                </li>
                <li className="flex items-center gap-3 text-gray-600 dark:text-gray-300">
                  <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Gerenciamento de equipe</span>
                </li>
                <li className="flex items-center gap-3 text-gray-600 dark:text-gray-300">
                  <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Customização avançada</span>
                </li>
              </ul>
              <Link 
                href="/precos/checkout?plan=enterprise" 
                className="btn-secondary w-full text-center"
              >
                Fale Conosco
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="relative p-10 rounded-2xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600"></div>
              <div className="relative z-10">
                <h2 className="text-3xl font-bold text-white mb-6">
                  Pronto para transformar sua experiência com IA?
                </h2>
                <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
                  Junte-se a milhares de profissionais que já estão otimizando seus fluxos de trabalho com PromptVault.
                </p>
                <Link href="/auth/signup" className="btn-secondary bg-white hover:bg-gray-100 text-blue-600 text-lg px-8 py-4">
                  Começar Gratuitamente
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-black border-t border-[#333333]">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4 text-white">Produto</h3>
              <ul className="space-y-2">
                <li><Link href="#features" className="text-[#E5E5E5] hover:text-white">Recursos</Link></li>
                <li><Link href="#pricing" className="text-[#E5E5E5] hover:text-white">Preços</Link></li>
                <li><Link href="/galeria" className="text-[#E5E5E5] hover:text-white">Galeria</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4 text-white">Empresa</h3>
              <ul className="space-y-2">
                <li><Link href="/sobre" className="text-[#E5E5E5] hover:text-white">Sobre nós</Link></li>
                <li><Link href="/blog" className="text-[#E5E5E5] hover:text-white">Blog</Link></li>
                <li><Link href="/contato" className="text-[#E5E5E5] hover:text-white">Contato</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4 text-white">Recursos</h3>
              <ul className="space-y-2">
                <li><Link href="/docs" className="text-[#E5E5E5] hover:text-white">Documentação</Link></li>
                <li><Link href="/tutoriais" className="text-[#E5E5E5] hover:text-white">Tutoriais</Link></li>
                <li><Link href="/api" className="text-[#E5E5E5] hover:text-white">API</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4 text-white">Legal</h3>
              <ul className="space-y-2">
                <li><Link href="/termos" className="text-[#E5E5E5] hover:text-white">Termos</Link></li>
                <li><Link href="/privacidade" className="text-[#E5E5E5] hover:text-white">Privacidade</Link></li>
                <li><Link href="/cookies" className="text-[#E5E5E5] hover:text-white">Cookies</Link></li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-[#333333] text-center">
            <p className="text-[#E5E5E5]">
              &copy; {new Date().getFullYear()} PromptVault. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
