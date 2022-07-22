export function resToJson(rows) {
  return rows = rows.map(r => r.toJSON())
}