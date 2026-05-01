# タスク管理ツール

カンバンボード形式のタスク管理Webアプリだっけ。

## 機能

- **カンバンボード** — 未着手 / 進行中 / 完了 の3カラム、ドラッグ&ドロップで移動
- **期日管理** — 遅延・今日・明日など色分けで表示
- **優先度・ラベル** — 高/中/低の優先度とカスタムラベル
- **繰り返しタスク** — 毎日自動生成
- **ダークモード対応** — システム設定に連動

## セットアップ

### 1. Node.js のインストール

[Node.js公式サイト](https://nodejs.org/ja/) から LTS版をインストールしてくれっちゃ。

### 2. Supabase プロジェクトの作成

1. [supabase.com](https://supabase.com) でアカウント作成・プロジェクト作成
2. SQL Editor で `supabase/migrations/001_initial.sql` の内容を実行
3. Project Settings → API から URL と anon key をコピー

### 3. 環境変数の設定

```bash
cp .env.local.example .env.local
```

`.env.local` を編集して Supabase の URL と anon key を設定してくれっちゃ。

### 4. 依存関係インストール & 起動

```bash
npm install
npm run dev
```

ブラウザで [http://localhost:3000](http://localhost:3000) を開けばOKだて！

## 技術スタック

| 役割 | 技術 |
|------|------|
| フレームワーク | Next.js 15 + TypeScript |
| スタイリング | Tailwind CSS |
| UI コンポーネント | Radix UI |
| データベース | Supabase (PostgreSQL) |
| 状態管理 | TanStack Query |
| ドラッグ&ドロップ | @hello-pangea/dnd |
| テーマ | next-themes |
