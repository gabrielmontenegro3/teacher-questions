import { useState } from 'react'
import { useUser } from '../contexts/UserContext'
import { supabase } from '../lib/supabase'

const PostForm = () => {
  const { user } = useUser()
  const [content, setContent] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!content.trim()) {
      alert('Por favor, escreva algo no post')
      return
    }

    if (!user || user.role !== 'teacher') {
      alert('Apenas teachers podem criar posts')
      return
    }

    setIsSubmitting(true)

    try {
      const { error } = await supabase.from('posts').insert({
        teacher_name: user.name,
        content: content.trim(),
      })

      if (error) {
        throw error
      }

      // Limpar campo após sucesso
      setContent('')
    } catch (error: any) {
      console.error('Erro ao criar post:', error)
      alert(`Erro ao criar post: ${error.message}`)
    } finally {
      setIsSubmitting(false)
    }
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
