# オセロゲーム

React + TypeScript + Tailwind CSSで作られた、二人で対戦できるオセロゲームです。

## 特徴

- 🎮 二人対戦のオセロゲーム
- 📱 スマートフォン・PC対応のレスポンシブデザイン
- ✨ ゲーム開始・終了のアニメーション演出
- 🎯 有効な手の位置をグラフィカルに表示
- 📊 リアルタイムスコア表示
- 🎨 洗練されたモダンデザイン

## 技術スタック

- **フロントエンド**: React.js 18
- **言語**: TypeScript 5.8
- **スタイリング**: Tailwind CSS 3.4
- **ビルドツール**: Vite 5.2
- **ランタイム**: Node.js v22.14.0

## 開発環境での実行

### 前提条件

- Node.js v22.14.0 以上
- npm または yarn

### セットアップ

1. 依存関係をインストール:
```bash
npm install
```

2. 開発サーバーを起動:
```bash
npm run dev
```

3. ブラウザで `http://localhost:5173` を開く

### ビルド

```bash
npm run build
```

## Cloudflare Workersへのデプロイ

### 前提条件

- Cloudflareアカウント
- Wrangler CLI

### Wrangler CLIのインストール

```bash
npm install -g wrangler
```

### Cloudflareにログイン

```bash
wrangler login
```

### デプロイ手順

1. プロジェクトをビルド:
```bash
npm run build
```

2. Cloudflare Workersにデプロイ:
```bash
wrangler pages deploy dist
```

3. カスタムドメインを設定する場合（オプション）:
```bash
wrangler pages project create othello-game
```

### 設定ファイル

`wrangler.toml` ファイルでプロジェクト設定を管理しています:

```toml
name = "othello-game"
main = "dist/index.js"
compatibility_date = "2024-01-01"

[site]
bucket = "./dist"
```

### トラブルシューティング

- **ビルドエラーが発生する場合**: `node_modules`を削除して再インストール
  ```bash
  rm -rf node_modules
  npm install
  ```

- **デプロイに失敗する場合**: Wrangler CLIが最新版か確認
  ```bash
  wrangler --version
  npm update -g wrangler
  ```

## ゲームルール

1. 8×8のボード上で黒と白の駒を使って対戦
2. 黒が先手でゲーム開始
3. 相手の駒を挟むように置くことで、挟まれた駒を自分の色に変える
4. 置ける場所がない場合は相手の手番に移る
5. 両プレイヤーが置けなくなったらゲーム終了
6. より多くの駒を持っているプレイヤーの勝利

## ライセンス

MIT License