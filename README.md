# Srt Files In Web Pages
Simply make json object from .srt files and use it with web pages videos

## Step 1 : Parsing
You have to have nodejs installed<br>
put srt file in same directory of srt-parser.js file<br>
**.srt file should have `UTF-8` encoding**<br>
open terminal and type<br>
`node srt-parser.js file_name.srt`<br>
and you will get `file_name.js` output<br>

## Step 2 : Initializing
Add parsed `file_name.js` to web page<br>
`<script src="file_name.js"></script>`<br>
Add `srt-loader.js` to web page<br>
`<script src="srt-loader.js"></script>`<br>
and then use `showSubtitles` function<br>
`showSubtitles(videoElementId, subtitleContainerId, JsonSrtSubtitle, offset)`<br>
<br>
`showSubtitles` params :
1. `videoElementId` video element selector
2. `subtitleContainerId` selector of element that going to show subtitles
3. `subtitles` variable that contains subtitle objects from parsed file (default name is `JsonSrtSubtitle`)
4. `offset` number that change subtitle display time to sync subtitle with video

Hope it be useful for you
