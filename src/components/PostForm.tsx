import { useState } from 'react'
import { getSocket } from '../lib/socket'

const PostForm = () => {
  const [content, setContent] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!content.trim()) {
      alert('Por favor, escreva algo no post')
      return
    }

    const socket = getSocket()
    if (!socket) {
      alert('Não conectado ao servidor')
      return
    }

    setIsSubmitting(true)

    socket.emit('create-post', { content: content.trim() })

    socket.once('error', (data: { message: string }) => {
      alert(`Erro: ${data.message}`)
      setIsSubmitting(false)
    })

    // Limpar campo após envio (assumindo sucesso)
    setTimeout(() => {
      setContent('')
      setIsSubmitting(false)
    }, 100)
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <h2 className="text-xl font-bold text-gray-800 mb-4">
        Criar Novo Post
      </h2>
      <form onSubmit={handleSubmit}>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
          rows={4}
          placeholder="Escreva seu post aqui..."
          required
        />
        <button
          type="submit"
          disabled={isSubmitting}
          className="mt-4 bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition-colors font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Publicando...' : 'Publicar Post'}
        </button>
      </form>
    </div>
  )
}

export default PostForm
