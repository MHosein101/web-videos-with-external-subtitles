/*
  
  First Import The JS Parsed File From Srt File
  And Import srt-loader.js File Into HTML File
  And Write This Line In <script> Tag
  
  showSubtitles('#video','#subtitle',JsonSrtSubtitle,0)
  
	---------------------
  
  Function Params :
  
	videoElementId       -->  video element selector (better to be id)
	subtitleContainerId  -->  subtitle element selector (better to be id)
	subtitles            -->  variable that contains subtitle objects from parsed file
	offset               -->  number that change subtitle display time to sync subtitle with video

*/

function showSubtitles( videoElementId , subtitleContainerId , subtitles , offset ){
	let video = document.querySelector(videoElementId)
	let end = ""
	setInterval(function(){
		let currentTime = parseSeconds(Math.round(video.currentTime)+offset)
		let currentSub = subtitles[currentTime]
		if( currentSub ){
			end = currentSub.end
			document.querySelector(subtitleContainerId).innerHTML = currentSub.text
		}
		if( end == currentTime ){
			document.querySelector(subtitleContainerId).innerHTML = ""
			end = ""
		}
	} , 1000 )
}

function parseSeconds(n){
	let t = 0 , h = 0 , m = 0 , s = 0
	t = Math.floor(n/60)
	h = Math.floor(t/60)
	m = Math.round(t%60)
	if(m < 10) m = "0" + m
	s = Math.floor(n%60)
	if(s < 10) s = "0" + s
	return "0" + h + ":" + m + ":" + s
}