# 備忘録

## 現在の運用

**開発フロー**
1. coder さんが develop ブランチから開発ブランチをチケットIDの名前で作成し開発
2. coder さんが PR をだす
3. TECH が develop へマージ (自動 deploy)
4. staging へ develop をマージ
5. coder さん + 依頼者がレビュー
6. TECH が production へマージ (自動 deploy)


## ホスティング
- リソースは S3 におかれ、そのまま S3 + CloudFront でホスティングされている


## deploy

GitHub アクションで deploy & CloudFront キャッシュクリアできる。

deploy 時にやっていることは以下の通り
1. 当該ブランチの内容をそのまま S3 へ sync（ミラーリング）
2. CloudFront のキャッシュをクリア


手動で行う場合は以下のコマンド（aws cli入れといてください。profileは設定しておきましょう）

**staging**
```
aws s3 sync . "s3://airdesign-website-staging" \
    --delete --acl public-read --exclude "*.git*"
aws cloudfront create-invalidation \
    --distribution-id "E5R3CGQ6JDVRL" --paths "/*"
```

**production**
```
aws s3 sync . "s3://air-design-website-production" \
    --delete --acl public-read --exclude "*.git*"
aws cloudfront create-invalidation \
    --distribution-id "E1NPRRAABLQ3PO" --paths "/*"
```
