export interface User {
  id: string
  name: string
  role: 'teacher' | 'student'
}

export interface Post {
  id: string
  teacher_name: string
  content: string
  created_at: string
  replies?: Reply[]
}

export interface Reply {
  id: string
  post_id: string
  student_name: string
  content: string
  created_at: string
}
