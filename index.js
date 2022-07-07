
/* index.js */

import { Application } from 'oak'
import { Handlebars } from 'handlebars'
import { parse } from 'flags'

import router from 'routes'

Deno.env.delete('MODE') // clear the test mode if set

const defaultPort = 8080
const { args } = Deno
const argPort = parse(args).port
const port = argPort ? Number(argPort) : defaultPort

const app = new Application()
const handle = new Handlebars({ defaultLayout: '' })

// error handler
app.use(async (context, next) => {
  try {
	console.log(context.request.url.href)
	const auth = await context.cookies.get('authorised')
	console.log(`authorised cookie: ${auth}`)
    await next()
  } catch (err) {
		console.log(err)
  }
})

app.use(router.routes())
app.use(router.allowedMethods())

// static content
app.use(async (context, next) => {
	const root = `${Deno.cwd()}/public`
	try {
		await context.send({ root })
	} catch {
		next()
	}
})

// page not found
app.use( async context => {
	try {
		console.log('404 PAGE NOT FOUND')
		const body = await handle.renderView('404')
		context.response.body = body
// 		context.response.body = '404 PAGE NOT FOUND'
	} catch(err) {
		console.error(err)
	}
})

app.addEventListener('listen', ({ port }) => {
	console.log(`listening on port: ${port}`)
})

await app.listen({ port })
