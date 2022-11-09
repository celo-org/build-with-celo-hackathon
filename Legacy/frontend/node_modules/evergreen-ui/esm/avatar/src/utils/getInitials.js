export default function getInitials(name) {
  var fallback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '?';
  if (!name || typeof name !== 'string') return fallback;
  return name.replace(/\s+/, ' ').split(' ') // Repeated spaces results in empty strings
  .slice(0, 2).map(function (v) {
    return v && v[0].toUpperCase();
  }) // Watch out for empty strings
  .join('');
}