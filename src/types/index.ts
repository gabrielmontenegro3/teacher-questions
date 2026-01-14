export interface User {
  id: string
  name: string
  role: 'teacher' | 'student'
}

export interface Post {
  id: string
  teacherName: string
  content: string
  timestamp: number
  replies?: Reply[]
}

export interface Reply {
  id: string
  postId: string
  studentName: string
  content: string
  timestamp: number
}
