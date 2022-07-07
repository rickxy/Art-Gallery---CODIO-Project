
/* util.js */

export function file2DataURI(file) {
  return new Promise((resolve, reject) => {
		try {
			const reader = new FileReader()
			reader.onload = () => {
				resolve(reader.result)
			}
			reader.readAsDataURL(file)
		} catch(err) {
			reject(err)
		}
  })
}
