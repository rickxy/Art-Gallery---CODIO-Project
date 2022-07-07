import { db } from './db.js'

export async function getDocuments(user) {
	let sql = `Select d.id , d.title, d.description, d.document, d.Category, DATE_FORMAT(d.UploadedAt,'%d/%m/%Y') as UploadedAt,
	d.Status,
	 d.UploadedByUser,  d.Status as status from documents as d  
	 where d.UploadedByUser != "${user}"  ORDER BY d.UploadedByUser DESC;`
	let records = await db.query(sql)
	return records;
}

export async function getDocumentsByUser(user) {
	let sql = `Select d.id , d.title, d.description, d.Category, DATE_FORMAT(d.UploadedAt,'%d/%m/%Y') as UploadedAt,
	 d.UploadedByUser,  d.document, d.Status as status from documents as d 
	  WHERE d.UploadedByUser= "${user}"  ORDER BY d.UploadedAt DESC;`;
	let records = await db.query(sql)
	return records;
}
export async function getDocument(id) {
	let sql = `Select d.id , d.title, d.description, d.Category, DATE_FORMAT(d.UploadedAt,'%d/%m/%Y') as UploadedAt,
	d.UploadedByUser, d.document, d.Status as status from documents as d 
	WHERE d.id= ${id};`
	let records = await db.query(sql)
	return records[0];
}

export async function saveDocument(data) {
	data.files[0].username = data.addedBy;
	data.fields.file = await saveFile(data.files[0]);
	const sql = `INSERT INTO documents(title, description, Category, document,  UploadedByUser) VALUES("${data.fields.title}",
     "${data.fields.description}","${data.fields.category}" , "${data.fields.file}" , "${data.addedBy}" )`
	 let result = db.query(sql).then(async (result) => {
	 const sql1 = `INSERT INTO DocumentFile(File, documenId) VALUES("${data.fields.file}" , ${result.lastInsertId} )`
	await db.query(sql1);
	 });
	return true;	
}

export async function getCommentsByDocumentId(id) {
	let sql = `SELECT id, Comment, rating, CommentedBy, date_format(CommentedAt, '%m-%d-%Y') as Date , date_format(CommentedAt, '%h:%m') as Time FROM DocumentReview WHERE documenId = ${id};`
	let records = await db.query(sql)
	return records;
}

export async function saveComment(data) {
	const sql = `INSERT INTO DocumentReview (Comment, rating, CommentedBy , documenId) 
	VALUES("${data.review}",
     ${data.rating},"${data.addedBy}" , ${+data.documentId})`
	await db.query(sql);
	let sql1 = ""
	if(data.status == 'on') {
		sql1 = `UPDATE documents SET status = 'amendments'
        WHERE id = ${+data.documentId};`
	}
	else {
		
	 sql1 = `UPDATE documents SET status = 'passed'
        WHERE id = ${+data.documentId};`
	}
	await db.query(sql1);
	return true
}



export async function updateDocument(data) {
	data.files[0].username = data.addedBy;
	data.fields.file = await saveFile(data.files[0]);	
	 const sql1 = `INSERT INTO DocumentFile(File, documenId) VALUES("${data.fields.file}" , ${+data.fields.id} )`
	await db.query(sql1);
	const sql = `UPDATE documents SET status = 'revised',
		document = "${data.fields.file}"
        WHERE id = ${+data.fields.id}`
	await db.query(sql);
	return true;	
}
async function saveFile(file) {
	let filename = "";
	if(file.contentType !== 'application/octet-stream') {
		const ext = file.filename.split(".").pop();
		filename = `${file.username}-${Date.now()}.${ext}`;
		await Deno.rename(file.filename, `${Deno.cwd()}/public/uploads/${filename}`)
	}
	return filename;
}