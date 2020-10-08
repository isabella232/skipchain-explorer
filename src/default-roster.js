export default `
[[servers]]
  Address = "tls://localhost:7778"
  Suite = "Ed25519"
  Public = "65d59bf63f6d5510b383776cb4fe72061b81751febfce1984a412a9941249c42"
  URL = "https://conode-cfch.twins-project.org/"
  Description = "CFCH (Schweizerische Gesellschaft für Cystische Fibrose)"
  [servers.Services]
    [servers.Services.ByzCoin]
      Public = "7506ae944b4e79386751fbbee83aee27f90c3583d7eece7fb49ac10e320b00bd57e766dc22f583b45886c99180cdc3c4db7dd7a87be028e8516c9aa686c13a241f93eae4eca176f4a06cdfbd0eb4463e78595a9c3249d4160ff2f0d9078450063ebea1352ce4cb6911cbefc6ffe6cd1b5014aa70daf98bce949340953e8fa8b5"
      Suite = "bn256.adapter"
    [servers.Services.Skipchain]
      Public = "38d15c6f4e95d81ed87c9c5460ae0dbb2e0464d042e63c45246844594d8a8e773f984ca935614e584a3a26cc9616e07955528649551bc3b9dba68197c3c2004212e65214bab75e98c7f251ccc8485855f8a25c79d62e5e13f0b0f76fd4ed7e6f826d184aa11191c12ac4c7c26e0b5fb6b0f31da05bd0bee5cad0c1ff63d95c88"
      Suite = "bn256.adapter"
`
