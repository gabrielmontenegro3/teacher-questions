import { useState } from 'react'
import { useUser } from '../contexts/UserContext'

const Login = () => {
  const [name, setName] = useState('')
  const [role, setRole] = useState<'teacher' | 'student'>('student')
  const { setUser } = useUser()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim()) {
      alert('Por favor, informe seu nome')
      return
    }

    // Criar usuário local (sem autenticação real, apenas sessão)
    const user = {
      id: crypto.randomUUID(),
      name: name.trim(),
      role,
    }

    // Armazenar no localStorage para persistir entre recarregamentos
    localStorage.setItem('user', JSON.stringify(user))
    setUser(user)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-2">
          Teacher Gabriel
        </h1>
        <p className="text-center text-gray-600 mb-6">
          Sistema de Comunicação em Tempo Real
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Seu Nome
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Digite seu nome"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Seu Papel
            </label>
            <div className="flex space-x-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  value="student"
                  checked={role === 'student'}
                  onChange={(e) => setRole(e.target.value as 'student')}
                  className="mr-2"
                />
                <span className="text-gray-700">Student</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  value="teacher"
                  checked={role === 'teacher'}
                  onChange={(e) => setRole(e.target.value as 'teacher')}
                  className="mr-2"
                />
                <span className="text-gray-700">Teacher</span>
              </label>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
          >
            Entrar
          </button>
        </form>
      </div>
    </div>
  )
}

export default Login
