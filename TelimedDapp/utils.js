function EncodeBytes(utf8String) {
  let enc = new TextEncoder()
  return enc.encode(utf8String)
}

module.exports = EncodeBytes