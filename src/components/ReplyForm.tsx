import { useState } from 'react'
import { getSocket } from '../lib/socket'

interface ReplyFormProps {
  postId: string
}

const ReplyForm = ({ postId }: ReplyFormProps) => {
  const [content, setContent] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!content.trim()) {
      alert('Por favor, escreva uma resposta')
      return
    }

    const socket = getSocket()
    if (!socket) {
      alert('Não conectado ao servidor')
      return
    }

    setIsSubmitting(true)

    socket.emit('create-reply', { postId, content: content.trim() })

    socket.once('error', (data: { message: string }) => {
      alert(`Erro: ${data.message}`)
      setIsSubmitting(false)
    })

    // Limpar campo após envio
    setTimeout(() => {
      setContent('')
      setIsSubmitting(false)
    }, 100)
  }

  return (
    <form onSubmit={handleSubmit} className="mt-4">
      <div className="flex space-x-2">
        <input
          type="text"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Escreva sua resposta..."
          required
        />
        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? '...' : 'Responder'}
        </button>
      </div>
    </form>
  )
}

export default ReplyForm
