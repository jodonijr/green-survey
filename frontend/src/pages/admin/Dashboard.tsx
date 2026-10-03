export function Dashboard() {
  return (
    <div className="p-8">
      <h1 className="mb-6 text-3xl font-bold text-green-700">Visão Geral</h1>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <div className="rounded-xl border bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-zinc-700">
            Pesquisas Ativas
          </h2>
          <p className="mt-2 text-4xl font-bold text-green-600">3</p>
        </div>
        <div className="rounded-xl border bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-zinc-700">
            Respostas Recebidas
          </h2>
          <p className="mt-2 text-4xl font-bold text-green-600">128</p>
        </div>
      </div>
    </div>
  )
}
