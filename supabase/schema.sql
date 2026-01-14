-- Criar tabela de posts
CREATE TABLE IF NOT EXISTS posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  teacher_name TEXT NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Criar tabela de replies
CREATE TABLE IF NOT EXISTS replies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id UUID NOT NULL REFERENCES posts(id) ON DELETE CASCADE,
  student_name TEXT NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Habilitar Realtime para as tabelas
ALTER PUBLICATION supabase_realtime ADD TABLE posts;
ALTER PUBLICATION supabase_realtime ADD TABLE replies;

-- Criar índices para melhor performance
CREATE INDEX IF NOT EXISTS idx_replies_post_id ON replies(post_id);
CREATE INDEX IF NOT EXISTS idx_posts_created_at ON posts(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_replies_created_at ON replies(created_at DESC);

-- Política RLS (Row Level Security) - permitir leitura e escrita para todos
-- Em produção, você pode querer adicionar autenticação mais robusta
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE replies ENABLE ROW LEVEL SECURITY;

-- Política para posts: todos podem ler e escrever
CREATE POLICY "Posts são públicos para leitura" ON posts
  FOR SELECT USING (true);

CREATE POLICY "Teachers podem criar posts" ON posts
  FOR INSERT WITH CHECK (true);

-- Política para replies: todos podem ler e escrever
CREATE POLICY "Replies são públicos para leitura" ON replies
  FOR SELECT USING (true);

CREATE POLICY "Students podem criar replies" ON replies
  FOR INSERT WITH CHECK (true);
