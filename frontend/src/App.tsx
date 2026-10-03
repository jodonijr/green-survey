import { BrowserRouter, Routes, Route, Link } from "react-router-dom"
import { Dashboard } from "./pages/admin/Dashboard"
import { Analytics } from "./pages/admin/Analytics"
import { SurveyForm } from "./pages/public/SurveyForm"

function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-zinc-50">
      <aside className="flex w-64 flex-col bg-green-800 text-white">
        <div className="border-b border-green-700 p-6 text-2xl font-bold">
          Green Survey
        </div>
        <nav className="flex flex-1 flex-col gap-2 p-4">
          <Link
            to="/"
            className="rounded p-2 transition-colors hover:bg-green-700"
          >
            Dashboard
          </Link>
          <Link
            to="/analytics"
            className="rounded p-2 transition-colors hover:bg-green-700"
          >
            Análises
          </Link>
        </nav>
      </aside>
      <main className="flex-1">{children}</main>
    </div>
  )
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/survey/:id" element={<SurveyForm />} />

        <Route
          path="/"
          element={
            <AdminLayout>
              <Dashboard />
            </AdminLayout>
          }
        />
        <Route
          path="/analytics"
          element={
            <AdminLayout>
              <Analytics />
            </AdminLayout>
          }
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App
