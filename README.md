# Web Videos With External Subtitles
A way to show the external subtitles with videos in web pages

## Step 1 : Parsing

You need to have nodejs installed. <br/>
the `.srt` file that you are using should have `UTF-8` encoding. <br/>
Use this command to parse the `.srt` file. <br/>

`node subtitle-parser.js path/to/srt/file`

## Step 2 : Loading in webpages

You will get a new `.js` file with same name as your `.srt` file. <br/>

Then include subtitle `.js` file and `subtitle-loader.js` into your web page and use code below to load it with your video. <br/>

`<script> SubtitleLoader.init(videoElement, subtitleContainer, jsonData) </script>`

parameters description :
* `videoElement` {`string`} video element selector
* `subtitleContainer` {`string`} selector of an element to display subtitle inside it
* `jsonData` {`json`} parsed subtitle object variable name