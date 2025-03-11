interface TranslateResponse {
  data: {
    translations: Array<{
      translatedText: string
    }>
  }
}

export async function translateText(text: string, targetLang: 'en' | 'pt') {
  try {
    const response = await fetch(
      `https://translation.googleapis.com/language/translate/v2?key=${process.env.NEXT_PUBLIC_GOOGLE_TRANSLATE_API_KEY}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          q: text,
          target: targetLang,
          source: targetLang === 'en' ? 'pt' : 'en',
        }),
      }
    )

    if (!response.ok) {
      throw new Error('Erro na tradução')
    }

    const data: TranslateResponse = await response.json()
    return data.data.translations[0].translatedText
  } catch (error) {
    console.error('Erro ao traduzir:', error)
    throw error
  }
}
