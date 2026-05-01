-- タスクテーブル
CREATE TABLE tasks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  status TEXT NOT NULL DEFAULT 'todo'
    CHECK (status IN ('todo', 'in_progress', 'done')),
  priority TEXT NOT NULL DEFAULT 'medium'
    CHECK (priority IN ('low', 'medium', 'high')),
  labels TEXT[] NOT NULL DEFAULT '{}',
  due_date DATE,
  is_recurring BOOLEAN NOT NULL DEFAULT FALSE,
  recurrence_type TEXT CHECK (recurrence_type IN ('daily')),
  position FLOAT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_tasks_status ON tasks(status);
CREATE INDEX idx_tasks_due_date ON tasks(due_date);
CREATE INDEX idx_tasks_position ON tasks(position);

-- updated_at 自動更新
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER tasks_updated_at
  BEFORE UPDATE ON tasks
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- RLS (Row Level Security) を有効化
ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;

-- 全ユーザーが全タスクを読み書きできるポリシー(個人用)
CREATE POLICY "allow_all" ON tasks FOR ALL USING (true) WITH CHECK (true);
