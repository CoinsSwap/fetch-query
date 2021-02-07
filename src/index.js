export default async (url, options) => {
  let query = `{${options.entity}(`
  if (options.selection) {
    const keys = Object.keys(options.selection)
    let where;

    for (const key of keys) {
      if (key === 'where') where = options.selection['where']
      else query += keys.indexOf(key) === 0 ? `${key}: ${options.selection[key]}` : `,${key}: ${options.selection[key]}`
    }
    if (where) {
      query += keys.length > 1 ? ',where: {' : 'where: {'

      const whereKeys = Object.keys(where)
      for (const key of whereKeys) {
        if (whereKeys.indexOf(key) === 0) query += `${key}: "${where[key]}"`
        else {
          query += `,${key}: ${where[key]}`
        }
      }
      query += '}'
    }
  }
  query += ') {'
  query += options.query
  query += '}}'

  let response = await fetch(url, {
    method: 'post',
    body: JSON.stringify({
      query: `${query}`
     })
  })
  return response.json()
}
