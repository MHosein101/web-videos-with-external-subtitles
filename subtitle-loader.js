class SubtitleLoader
{
	static init (videoElement, subtitleContainer, jsonData)
	{
		new SubtitleLoader(videoElement, subtitleContainer, jsonData)
	}

	constructor (videoElement, subtitleContainer, jsonData)
	{
		this.video = document.querySelector(videoElement)
		this.subtitle = document.querySelector(subtitleContainer)
		this.data = jsonData

		this.current = null
		this.time = 0

		this.interval = 900
		
		this.video.onseeked = () => 
		{
			this.subtitle.innerHTML = ""
			this.current = null
		}

		this.startInterval()
	}

	startInterval ()
	{
		setInterval(() =>
		{
			let playing = this.video.currentTime > 0 && ! this.video.paused && ! this.video.ended

			if(playing)
			{
				this.time = this._parseTime(Math.floor(this.video.currentTime))
				
				if(this.data[this.time])
				{
					this.current = this.data[this.time]
					this.subtitle.innerHTML = this.current.text
				}
		
				if(this.current && this.time == this.current.end)
				{
					this.subtitle.innerHTML = ""
					this.current = null
				}
			}
		} , this.interval )
	}

	_parseTime (rawseconds)
	{
		let t = Math.floor(rawseconds / 60)
		let h = Math.floor(t / 60)
		let m = Math.round(t % 60)
		let s = Math.floor(rawseconds % 60)
	
		m = m < 10 ? `0${m}` : m
		s = s < 10 ? `0${s}` : s
		
		return `0${h}:${m}:${s}`
	}

}