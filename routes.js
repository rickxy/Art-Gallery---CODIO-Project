
/* routes.js */

import { Router } from 'oak'
import { Handlebars } from 'handlebars'

import { login, register } from 'accounts'

import { saveDocument, getDocuments , getDocumentsByUser,
getDocument, getCommentsByDocumentId,
saveComment , updateDocument
 } from './modules/art.js';

const handle = new Handlebars({ defaultLayout: '' })

const router = new Router()


// the routes defined here
router.get('/', async context => {
	const authorised = await context.cookies.get('authorised')
	const data = { authorised }
	const body = await handle.renderView('index', data)
	context.response.body = body
})

router.get('/login', async context => {
	const body = await handle.renderView('login')
	context.response.body = body
})

router.get('/register', async context => {
	const body = await handle.renderView('register')
	context.response.body = body
})

router.post('/register', async context => {
	console.log('POST /register')
	const body = context.request.body({ type: 'form' })
	const value = await body.value
	const obj = Object.fromEntries(value)
	console.log(obj)
	await register(obj)
	context.response.redirect('/login')
})

router.get('/logout', async context => {
  // context.cookies.set('authorised', null) // this does the same
  await context.cookies.delete('authorised')
  context.response.redirect('/')
})


router.get('/home', async context => {
	const authorised = context.cookies.get('authorised')
    if(authorised === undefined) context.response.redirect('/login')
	const data = { authorised }
	const body = await handle.renderView('home', data)
	context.response.body = body
	
})


router.get('/home', async context => {
	const authorised = context.cookies.get('authorised')
	if(authorised === undefined) context.response.redirect('/')
	const data = { authorised }
	const body = await handle.renderView('home', data)
	context.response.body = body
})

router.get('/newart', async context => {
	const authorised = context.cookies.get('authorised')
    if(authorised === undefined) context.response.redirect('/login')
   const body = await handle.renderView('newart');
	context.response.body = body
})
router.get('/success', async context => {
	const authorised = context.cookies.get('authorised')
    if(authorised === undefined) context.response.redirect('/login')
   const body = await handle.renderView('success');
	context.response.body = body
})

router.post('/login', async context => {
	console.log('POST /login')
	const body = context.request.body({ type: 'form' })
	const value = await body.value
	const obj = Object.fromEntries(value)
	console.log(obj)
	try {
		const username = await login(obj)
		await context.cookies.set('authorised', username)
		context.response.redirect('/home')
	} catch(err) {
		console.log(err)
		context.response.redirect('/login')
	}
})

router.get('/artView/:id', async context => {
	
	const authorised = context.cookies.get('authorised')
    if(authorised === undefined) context.response.redirect('/login')
	const data = await getDocument(context.params.id);
	 data.UploadedByUser == authorised ? data.isMyDocument = true: data.isMyDocument = false;
	 if(data.isMyDocument == false && data.status == "uploaded"){
		 data.allowComment = true
	 }
	 data.isMyDocument == true && data.status == "amendments" ? data.ammendmentRequested = true : data.ammendmentRequested = false 
	const comments = await getCommentsByDocumentId(data.id);
	data.comments = comments;
	const body = await handle.renderView('viewdocument', data)
	context.response.body = body
})

router.post('/updateart', async context => {
	const body = context.request.body({ type: 'form-data' })
	const value = await body.value.read()
	value.addedBy = context.cookies.get('authorised');
	console.log(value)
	await updateDocument(value)
	context.response.redirect('/')
})

router.post('/addart', async context => {
	const body = context.request.body({ type: 'form-data' })
	const value = await body.value.read()
	value.addedBy = context.cookies.get('authorised');
	
	await saveDocument(value)
	context.response.redirect('/')
})

export default router
