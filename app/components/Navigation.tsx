'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { signOut, useSession } from 'next-auth/react'
import { useState } from 'react'

const navigation = [
  { name: 'Dashboard', href: '/dashboard' },
  { name: 'Biblioteca', href: '/biblioteca' },
  { name: 'Configurações', href: '/settings' },
]

export default function Navigation() {
  const pathname = usePathname()
  const { data: session } = useSession()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  if (!session) return null

  return (
    <>
      {/* Navegação para desktop */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-64 lg:flex-col">
        <div className="flex grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 bg-white px-6 pb-4 dark:border-gray-800 dark:bg-gray-900">
          <div className="flex h-16 shrink-0 items-center">
            <Link href="/" className="text-xl font-bold text-purple-600">
              PromptVault
            </Link>
          </div>
          <nav className="flex flex-1 flex-col">
            <ul role="list" className="flex flex-1 flex-col gap-y-7">
              <li>
                <ul role="list" className="-mx-2 space-y-1">
                  {navigation.map((item) => (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className={`
                          group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6
                          ${
                            pathname === item.href
                              ? 'bg-gray-50 text-purple-600 dark:bg-gray-800'
                              : 'text-gray-700 hover:bg-gray-50 hover:text-purple-600 dark:text-gray-300 dark:hover:bg-gray-800'
                          }
                        `}
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
              <li className="mt-auto">
                <button
                  onClick={() => signOut()}
                  className="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-gray-700 hover:bg-gray-50 hover:text-purple-600 dark:text-gray-300 dark:hover:bg-gray-800"
                >
                  Sair
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </div>

      {/* Navegação para mobile */}
      <div className="lg:hidden">
        <div className="flex items-center justify-between border-b border-gray-200 bg-white px-4 py-4 dark:border-gray-800 dark:bg-gray-900">
          <Link href="/" className="text-xl font-bold text-purple-600">
            PromptVault
          </Link>
          <button
            type="button"
            className="-m-2.5 p-2.5 text-gray-700 dark:text-gray-300"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <span className="sr-only">Abrir menu</span>
            {isMobileMenuOpen ? (
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
            )}
          </button>
        </div>

        {isMobileMenuOpen && (
          <div className="border-b border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900">
            <nav className="flex flex-col p-4">
              <ul role="list" className="space-y-1">
                {navigation.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className={`
                        block rounded-md px-3 py-2 text-base font-semibold leading-7
                        ${
                          pathname === item.href
                            ? 'bg-gray-50 text-purple-600 dark:bg-gray-800'
                            : 'text-gray-700 hover:bg-gray-50 hover:text-purple-600 dark:text-gray-300 dark:hover:bg-gray-800'
                        }
                      `}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
                <li>
                  <button
                    onClick={() => signOut()}
                    className="block w-full rounded-md px-3 py-2 text-left text-base font-semibold leading-7 text-gray-700 hover:bg-gray-50 hover:text-purple-600 dark:text-gray-300 dark:hover:bg-gray-800"
                  >
                    Sair
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        )}
      </div>
    </>
  )
}
