import { useState } from 'react'
import { useUser } from '../contexts/UserContext'
import { supabase } from '../lib/supabase'

interface ReplyFormProps {
  postId: string
}

const ReplyForm = ({ postId }: ReplyFormProps) => {
  const { user } = useUser()
  const [content, setContent] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!content.trim()) {
      alert('Por favor, escreva uma resposta')
      return
    }

    if (!user || user.role !== 'student') {
      alert('Apenas students podem responder')
      return
    }

    setIsSubmitting(true)

    try {
      const { error } = await supabase.from('replies').insert({
        post_id: postId,
        student_name: user.name,
        content: content.trim(),
      })

      if (error) {
        throw error
      }

      // Limpar campo após sucesso
      setContent('')
    } catch (error: any) {
      console.error('Erro ao criar resposta:', error)
      alert(`Erro ao criar resposta: ${error.message}`)
    } finally {
      setIsSubmitting(false)
    }
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
