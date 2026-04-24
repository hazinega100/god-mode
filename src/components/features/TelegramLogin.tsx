import { signIn } from "next-auth/react"

export function TelegramLogin() {
  const handleTelegramLogin = () => {
    // В реальном проекте здесь должен быть виджет Telegram
    // который возвращает данные пользователя
    // Для примера эмулируем данные
    const mockData = {
      id: "123456789",
      username: "godmode_user",
      firstName: "User",
      lastName: "Test",
      photoUrl: "https://t.me/i/userpic/320/...",
      authDate: Math.floor(Date.now() / 1000).toString(),
      hash: "mock_hash_for_demo"
    }

    signIn("telegram", { ...mockData, callbackUrl: "/dashboard" })
  }

  return (
    <button 
      onClick={handleTelegramLogin}
    >
      <svg fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.16.16-.295.295-.605.295l.213-3.054 5.56-5.022c.242-.213-.054-.334-.373-.121l-6.869 4.326-2.96-.924c-.64-.203-.658-.64.135-.954l11.566-4.458c.538-.196 1.006.128.832.941z"/>
      </svg>
      Войти через Telegram
    </button>
  )
}