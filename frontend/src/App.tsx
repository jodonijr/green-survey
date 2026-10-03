import { useEffect, useState } from "react"

function App() {
  const [message, setMessage] = useState<string>("Conectando ao backend...")

  useEffect(() => {
    fetch("https://cautious-sniffle-ggwrqgqr5973599-8000.app.github.dev/api/status")
      .then((res) => res.json())
      .then((data) => setMessage(data.message))
      .catch(() => {
        setMessage("Erro ao conectar com o backend ❌")
      })
  }, [])

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50">
      <div className="rounded-xl border bg-white p-8 text-center shadow-sm">
        <h1 className="mb-2 text-3xl font-bold text-green-700">Green Survey</h1>
        <p className="font-medium text-zinc-600">{message}</p>
      </div>
    </div>
  )
}

export default App
