# 備忘録
### 本番反映するとき

1. productionブランチに変更を取り込みましょう
1. `aws s3 sync . s3://air-design-website-production --delete --acl public-read --exclude "*.git*" --profile air-design-lp-production`のコマンドを打ちましょう。（aws cli入れといてください。profileは設定しておきましょう）
1. CloudFrontのキャッシュを消去してください。（この[記事](https://www.notion.so/galapagos/CloudFront-333d54284f1a460ba4b6d02f731f854f)を見てください）