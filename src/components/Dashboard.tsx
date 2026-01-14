import { useEffect, useState } from 'react'
import { useUser } from '../contexts/UserContext'
import { getSocket } from '../lib/socket'
import { Post, Reply } from '../types'
import PostForm from './PostForm'
import ReplyForm from './ReplyForm'

const Dashboard = () => {
  const { user } = useUser()
  const [posts, setPosts] = useState<Post[]>([])

  useEffect(() => {
    const socket = getSocket()
    if (!socket) return

    // Receber todos os posts iniciais
    socket.on('posts-updated', (data: Post[]) => {
      setPosts(data)
    })

    // Receber novo post criado
    socket.on('post-created', (post: Post) => {
      setPosts((prev) => {
        // Verificar se o post já existe
        if (prev.find((p) => p.id === post.id)) {
          return prev
        }
        return [...prev, { ...post, replies: [] }]
      })
    })

    // Receber nova resposta criada
    socket.on('reply-created', (reply: Reply) => {
      setPosts((prev) =>
        prev.map((post) => {
          if (post.id === reply.postId) {
            // Verificar se a resposta já existe
            if (post.replies?.find((r) => r.id === reply.id)) {
              return post
            }
            return {
              ...post,
              replies: [...(post.replies || []), reply],
            }
          }
          return post
        })
      )
    })

    // Notificações de usuários conectados/desconectados
    socket.on('user-connected', (data: { name: string; role: string }) => {
      console.log(`Usuário conectado: ${data.name} (${data.role})`)
    })

    socket.on('user-disconnected', (data: { name: string; role: string }) => {
      console.log(`Usuário desconectado: ${data.name} (${data.role})`)
    })

    return () => {
      socket.off('posts-updated')
      socket.off('post-created')
      socket.off('reply-created')
      socket.off('user-connected')
      socket.off('user-disconnected')
    }
  }, [])

  const formatTimestamp = (timestamp: number) => {
    const date = new Date(timestamp)
    return date.toLocaleString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
      <div className="container mx-auto px-4">
        <header className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">
                Teacher Gabriel
              </h1>
              <p className="text-gray-600 mt-1">
                Sistema de Comunicação em Tempo Real
              </p>
            </div>
            <div className="text-right">
              <div className="flex items-center space-x-2">
                <div
                  className={`w-3 h-3 rounded-full ${
                    user?.role === 'teacher' ? 'bg-blue-500' : 'bg-green-500'
                  }`}
                ></div>
                <span className="font-semibold text-gray-800">
                  {user?.name}
                </span>
              </div>
              <span className="text-sm text-gray-500 capitalize">
                {user?.role}
              </span>
            </div>
          </div>
        </header>

        {user?.role === 'teacher' && <PostForm />}

        <div className="space-y-6">
          {posts.length === 0 ? (
            <div className="bg-white rounded-lg shadow-md p-8 text-center">
              <p className="text-gray-500 text-lg">
                {user?.role === 'teacher'
                  ? 'Nenhum post criado ainda. Crie o primeiro post!'
                  : 'Nenhum post disponível ainda. Aguarde os teachers criarem posts.'}
              </p>
            </div>
          ) : (
            posts.map((post) => (
              <div
                key={post.id}
                className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
              >
                <div className="flex items-start mb-4">
                  <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-lg mr-4 flex-shrink-0">
                    {post.teacherName.charAt(0).toUpperCase()}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <h3 className="font-bold text-gray-800">
                        {post.teacherName}
                      </h3>
                      <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                        Teacher
                      </span>
                      <span className="text-xs text-gray-500">
                        {formatTimestamp(post.timestamp)}
                      </span>
                    </div>
                    <p className="text-gray-700 whitespace-pre-wrap">
                      {post.content}
                    </p>
                  </div>
                </div>

                {/* Respostas */}
                {post.replies && post.replies.length > 0 && (
                  <div className="ml-16 mt-4 space-y-3 border-l-2 border-gray-200 pl-4">
                    {post.replies.map((reply) => (
                      <div key={reply.id} className="flex items-start">
                        <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white font-bold text-sm mr-3 flex-shrink-0">
                          {reply.studentName.charAt(0).toUpperCase()}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            <span className="font-semibold text-gray-800 text-sm">
                              {reply.studentName}
                            </span>
                            <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                              Student
                            </span>
                            <span className="text-xs text-gray-500">
                              {formatTimestamp(reply.timestamp)}
                            </span>
                          </div>
                          <p className="text-gray-600 text-sm">{reply.content}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Formulário de resposta (apenas para students) */}
                {user?.role === 'student' && <ReplyForm postId={post.id} />}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}

export default Dashboard
