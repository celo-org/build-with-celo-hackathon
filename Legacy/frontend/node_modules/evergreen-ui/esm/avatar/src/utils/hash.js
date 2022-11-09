// http://erlycoder.com/49/javascript-hash-functions-to-convert-string-into-integer-hash-
export default function hashCode(s) {
  var str = String(s);
  var hash = 0;

  var _char;

  if (str.trim().length === 0) return hash;

  for (var i = 0; i < str.length; i++) {
    _char = str.charCodeAt(i);
    hash = (hash << 5) - hash + _char; // Convert to 32bit integer

    hash &= hash;
  }

  return Math.abs(hash);
}