/*
	First Install NodeJs
	Put Target Srt File In Same Path Of This File
	*Srt File Should Have UTF-8 Encoding*
	Then Open Terminal Here And Type
	> node srt-parser.js [Name_Of_Srt_File].srt
  And You Will Get Output File [Name_Of_Srt_File].js
*/

const fs = require('fs')

const srtFileName = process.argv[2]
const OutputJsonFileName = srtFileName.replace('.srt','')

fs.readFile( process.cwd() + "//" + srtFileName , ( err , data ) => {
	if(err) console.log(err)
	console.log(`Start Parsing The ${srtFileName}`)
	console.log(`----------------------`)
	let subtitles = []
	let content = data.toString().split('\n\r\n')
	content.pop()
	content.forEach( item => {
		let text = item.split('\r\n')
		text.shift()
		text.shift()
		text = text.join(' ').replace( /[\s]/igm ,' ').replace( /"/igm ,' ').replace( /(<\/?(i)?(font)?>)/igm ,' ')
		subtitles.push({
			"id" : item.split('\r\n')[0] ,
			"start" : item.split('\r\n')[1].split(' --> ')[0].split(',')[0] ,
			"end" : item.split('\r\n')[1].split(' --> ')[1].split(',')[0] ,
			"text" : text
		})
	})
	startWritingToFile(subtitles)
})

const startWritingToFile = (subtitles) => {
	fs.writeFile(`${OutputJsonFileName}.js` , `var JsonSrtSubtitle = { ` , function(err){
		if(err) throw err
		let i , j , t , ch = 500
		for(i = 0 , j = subtitles.length ; i < j ; i+=ch ){
			t = subtitles.slice(i , i+ch)
			console.log( "Writing Chunk To File From " + i + " Until " + (i+ch) )
			appendFileContent(t)
		}
		appendEndOfFile()
	})
}

const appendFileContent = (subtitles) => {
	subtitles.forEach( item => {
		fs.appendFile(`${OutputJsonFileName}.js` ,
	`\n	"${ item.start }" : {
		"end" : "${ item.end }" ,
		"text" : "${ item.text }"
	} ,` ,  
		function(err){
			if (err) throw err;
		})
	})
}

const appendEndOfFile = () => {
	fs.appendFile(`${OutputJsonFileName}.js` , `\n}` , function(err){
		if (err) throw err;
		console.log("----------------------")
		console.log("JSON Subtitle created")
	})
}