# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 言語設定 (Language Configuration)

このプロジェクトは日本語環境での動作を前提としています。

- **コミュニケーション**: 日本語で対応してください
- **コメント**: コードコメントは日本語で記述
- **ドキュメント**: 技術文書は日本語で作成
- **エラーメッセージ**: 可能な限り日本語で表示
- **変数名・関数名**: 英語を使用（国際的な慣例に従う）

## プロジェクト状況
サイトを開いて、二人で対戦できるオセロゲーム。

### 技術構成

- Node.js v22.14.0
- TypeScript v5.8
- Vite
- React.js
- Tailwind CSS

## 非機能要件

- Cloudflare Workersへのデプロイに対応
- スマートフォンでもプレイしやすいタッチ操作対応
- PCとスマホのレスポンシブ対応
- デザイナーが作ったような洗練されたデザイン
- Cloudflare Worker へのデプロイ方法が記載されたREADME.md
- GitHubで管理するための.gitignore

## 機能要件
- オセロ版が表示されている
- それぞれの手番が表示されている
- 白黒の取得数が表示されている
- ゲーム開始、ゲーム終了の演出
- 白黒の駒が置ける場所のグラフィカルな表示
