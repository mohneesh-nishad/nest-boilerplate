export function resToJson(rows: any[]) {
  return rows = rows.map(r => r.toJSON())
}