// Loads the YouTube IFrame API once and creates a hidden player.
let apiPromise = null

export function loadYouTubeApi() {
  if (typeof window === 'undefined') return Promise.reject(new Error('no window'))
  if (window.YT && window.YT.Player) return Promise.resolve(window.YT)
  if (apiPromise) return apiPromise

  apiPromise = new Promise((resolve, reject) => {
    let settled = false
    const finish = () => {
      if (settled) return
      settled = true
      if (window.YT && window.YT.Player) resolve(window.YT)
      else reject(new Error('YouTube API unavailable'))
    }

    const previous = window.onYouTubeIframeAPIReady
    window.onYouTubeIframeAPIReady = () => {
      if (typeof previous === 'function') previous()
      finish()
    }

    const tag = document.createElement('script')
    tag.src = 'https://www.youtube.com/iframe_api'
    tag.async = true
    tag.onerror = () => reject(new Error('YouTube API failed to load'))
    document.head.appendChild(tag)

    // Safety net in case the callback never fires (blocked network, blockers).
    window.setTimeout(() => {
      if (window.YT && window.YT.Player) finish()
    }, 9000)
  })

  return apiPromise
}
