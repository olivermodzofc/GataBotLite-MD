//Código creado por https://github.com/GataNina-Li || @gata_dios

import fs from 'fs'
import axios from 'axios'
import fetch from "node-fetch"
import uploadFile from '../lib/uploadFile.js'
import uploadImage from '../lib/uploadImage.js'
import { webp2png } from '../lib/webp2mp4.js'
import formData from 'form-data'


let handler = async (m, { conn, args, usedPrefix, command, text }) => {
const api_key = '45e67c4cbc3d784261ffc83806b5a1d7e3bd09ae'

const pURL = (text) => {
return text.match(new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)(jpe?g|png)/, 'gi'))
}

try {
let url
let q = m.quoted ? m.quoted : m
let mime = (q.msg || q).mimetype || q.mediaType || ''

if (pURL) {
url = pURL
    
} else if (m.quoted && /image\/(png|jpe?g)/.test(mime)) {
let media = await q.download()
url = await uploadImage(media)
    
} else if (m.quoted && /image\/webp/.test(mime)) {
let media = await q.download()
url = await webp2png(media)
    
} else {
return m.reply('Ingrese un enlace o responda al mensaje con una imagen en formato PNG o JPG o JPEG.')
}*/

const response = await axios.get(`https://saucenao.com/search.php?db=999&output_type=2&testmode=1&numres=6&api_key=${api_key}&url=${encodeURIComponent(url)}`)
const results = response.data.results;
const primerResultado = results[0]
    
let resultadoEnBruto = ''
for (let prop in primerResultado.header) {
let propName = '';
switch (prop) {
case 'similarity': propName = 'Puntuación de similitud' 
break        
case 'thumbnail': propName = 'URL de la miniatura' 
break        
case 'index_id': propName = 'ID del índice' 
break        
case 'index_name': propName = 'Nombre del índice' 
break        
case 'dupes': propName = 'Imágenes duplicadas' 
break        
case 'hidden': propName = 'Imágenes ocultas o bloqueadas' 
break        
case 'author_name': propName = 'Nombre del autor' 
break         
case 'source': propName = 'Fuente' 
break        
case 'material': propName = 'Material' 
break

default:
propName = prop;
}
resultadoEnBruto += `*${propName}*\n${primerResultado.header[prop]}\n\n`}
//resultadoEnBruto += ''
    
for (let prop in primerResultado.data) {
let propName = ''

switch (prop) {
case 'title': propName = 'Título' 
break        
case 'ext_urls': propName = 'URLs' 
break        
case 'member_name': propName = 'Nombre del autor' 
break        
case 'pixiv_id': propName = 'ID de Pixiv' 
break        
case 'danbooru_id': propName = 'ID de Danbooru' 
break        
case 'gelbooru_id': propName = 'ID de Gelbooru' 
break        
case 'source': propName = 'Fuente' 
break        
case 'material': propName = 'Material' 
break        
case 'da_id': propName = 'ID de la imagen' 
break        
case 'author_name': propName = 'Nombre del Autor' 
break        
case 'author_url': propName = 'URL del Autor' 
break        
case 'member_id': propName = 'ID del Autor' 
break        
case 'fa_id': propName = 'ID del Autor en FurAffinity' 
break        
case 'as_project': propName = 'Proyecto en Anime-Source' 
break

default:
propName = prop
}
resultadoEnBruto += `*${propName}*\n${primerResultado.data[prop]}\n\n`}
    
let frep = { contextInfo: { externalAdReply: {title: wm, body: author, sourceUrl: md, thumbnail: await(await fetch(primerResultado.header.thumbnail)).buffer() }}}
await conn.reply(m.chat, '*ESPERE UN MOMENTO...*', m)
    
await conn.sendButton(m.chat, `*Número de resultados:* ${results.length}
*Resultados encontrados:* ${Boolean(results) === true ? 'Si' : 'No'}

*◎ L Í M I T E S*

*Solicitudes restantes (corto plazo*
• ${results.short_remaining === undefined ? 'No especificado' : results.short_remaining} 

*Solicitudes restantes (largo plazo)*
• ${results.long_remaining === undefined ? 'No especificado' : results.long_remaining} 


*◎ R E S U L T A D O*

*URL de la miniatura*
• ${primerResultado.header.thumbnail}

*Puntuación de similitud*
• ${primerResultado.header.similarity}%

*Título*
• ${primerResultado.data.title}

*URLs*
• ${primerResultado.data.ext_urls}

*Autor*
• ${primerResultado.data.member_name === undefined ? 'No encontrado' : primerResultado.data.member_name}\n`,  `*◎ R E S U L T A D O  E N  B R U T O*

${resultadoEnBruto}`.trim(), null, [['𝗠 𝗘 𝗡 𝗨 ☘️', '/menu']], m, frep)
} catch (e) {
await m.reply(lenguajeGB['smsMalError3']() + '\n*' + lenguajeGB.smsMensError1() + '*\n*' + usedPrefix + `${lenguajeGB.lenguaje() == 'es' ? 'reporte' : 'report'}` + '* ' + `${lenguajeGB.smsMensError2()} ` + usedPrefix + command)
console.log(`❗❗ ${lenguajeGB['smsMensError2']()} ${usedPrefix + command} ❗❗`)
console.log(e)}
}

handler.command = /^sauce$/i
export default handler