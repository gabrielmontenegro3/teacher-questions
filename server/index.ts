import express from 'express'
import { createServer } from 'http'
import { Server } from 'socket.io'
import cors from 'cors'
import { v4 as uuidv4 } from 'uuid'

const app = express()
const httpServer = createServer(app)
const io = new Server(httpServer, {
  cors: {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST'],
  },
})

app.use(cors())
app.use(express.json())

// Tipos
interface User {
  id: string
  name: string
  role: 'teacher' | 'student'
  socketId: string
}

interface Post {
  id: string
  teacherName: string
  content: string
  timestamp: number
}

interface Reply {
  id: string
  postId: string
  studentName: string
  content: string
  timestamp: number
}

// Armazenamento em memória
const users = new Map<string, User>()
const posts = new Map<string, Post>()
const replies = new Map<string, Reply>()

// Funções auxiliares
const getRepliesForPost = (postId: string): Reply[] => {
  return Array.from(replies.values()).filter((reply) => reply.postId === postId)
}

const getAllPostsWithReplies = () => {
  return Array.from(posts.values()).map((post) => ({
    ...post,
    replies: getRepliesForPost(post.id),
  }))
}

// Socket.IO
io.on('connection', (socket) => {
  console.log('Cliente conectado:', socket.id)

  // Login do usuário
  socket.on('login', (data: { name: string; role: 'teacher' | 'student' }) => {
    const user: User = {
      id: uuidv4(),
      name: data.name,
      role: data.role,
      socketId: socket.id,
    }

    users.set(socket.id, user)
    socket.emit('login-success', { userId: user.id, user })

    // Enviar todos os posts existentes para o novo usuário
    socket.emit('posts-updated', getAllPostsWithReplies())

    // Notificar outros usuários sobre novo usuário conectado
    socket.broadcast.emit('user-connected', {
      name: user.name,
      role: user.role,
    })

    console.log(`Usuário conectado: ${user.name} (${user.role})`)
  })

  // Criar post (apenas teachers)
  socket.on('create-post', (data: { content: string }) => {
    const user = users.get(socket.id)

    if (!user) {
      socket.emit('error', { message: 'Usuário não autenticado' })
      return
    }

    if (user.role !== 'teacher') {
      socket.emit('error', { message: 'Apenas teachers podem criar posts' })
      return
    }

    const post: Post = {
      id: uuidv4(),
      teacherName: user.name,
      content: data.content,
      timestamp: Date.now(),
    }

    posts.set(post.id, post)

    // Broadcast para todos os clientes
    io.emit('post-created', {
      ...post,
      replies: [],
    })

    console.log(`Post criado por ${user.name}: ${post.id}`)
  })

  // Criar resposta (apenas students)
  socket.on('create-reply', (data: { postId: string; content: string }) => {
    const user = users.get(socket.id)

    if (!user) {
      socket.emit('error', { message: 'Usuário não autenticado' })
      return
    }

    if (user.role !== 'student') {
      socket.emit('error', { message: 'Apenas students podem responder' })
      return
    }

    if (!posts.has(data.postId)) {
      socket.emit('error', { message: 'Post não encontrado' })
      return
    }

    const reply: Reply = {
      id: uuidv4(),
      postId: data.postId,
      studentName: user.name,
      content: data.content,
      timestamp: Date.now(),
    }

    replies.set(reply.id, reply)

    // Broadcast para todos os clientes
    io.emit('reply-created', reply)

    console.log(`Resposta criada por ${user.name} no post ${data.postId}`)
  })

  // Desconexão
  socket.on('disconnect', () => {
    const user = users.get(socket.id)
    if (user) {
      users.delete(socket.id)
      socket.broadcast.emit('user-disconnected', {
        name: user.name,
        role: user.role,
      })
      console.log(`Usuário desconectado: ${user.name}`)
    }
  })
})

const PORT = process.env.PORT || 3001

httpServer.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`)
  console.log(`Socket.IO pronto para conexões`)
})
