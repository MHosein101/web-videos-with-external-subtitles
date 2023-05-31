const fs = require('fs')
const separator = require('path').sep

class SubtitleParser
{
	static parse (path)
	{
		if (fs.existsSync(path))
		{
			new SubtitleParser(path)
		}
		else
		{
			console.log(`Path "${path}" not exists or invalid.`)
		}
	}

	constructor (path)
	{
		this.targetPath = path
		this.outputFile = this.targetPath.replace('.srt','').split(separator).pop()
		this.dataName = this.outputFile.replace(/[^\w]+/gi, '_')
		
		this.jsonData = []
		this.jsonString = ''

		this.parseContent()
		this.writeStringData()
	}

	parseContent ()
	{
		let content = fs.readFileSync(this.targetPath, { encoding : 'utf8' })

		content = content.toString().split('\n\r\n')
		content.pop()
	
		content.forEach(item => 
		{
			// let id = item.split('\r\n')[0]
			let time = item.split('\r\n')[1].split(' --> ')
			
			let text = item.split('\r\n')
			text.shift()
			text.shift()
			text = text.join(' ').replace( /[\s]/igm ,' ').replace( /"/igm ,' ').replace( /(<\/?(i)?(font)?>)/igm ,' ')
	
			this.jsonData.push(
			{
				"start" : time[0].split(',')[0] ,
				"end" : time[1].split(',')[0] ,
				"text" : text
			})
		})
	}

	writeStringData ()
	{
		this.jsonString = `const Subtitle_${this.dataName} = { `

		this.jsonData.forEach( item =>
		{
			this.jsonString += `\n	"${item.start}" : {
		"end" : "${item.end}" ,
		"text" : "${item.text}"
	} ,`
		})

		this.jsonString += `\n}`

		fs.writeFileSync(`${this.outputFile}.js`, this.jsonString)
	}

}

if(process.argv.length == 2)
{
	console.log("Add the path to .srt file in command argument")
}
else
{
	SubtitleParser.parse(process.argv[2])
}
