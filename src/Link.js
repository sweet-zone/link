
import { parseQueryParams, processSlash } from './util.js'

export default class Link {

  constructor(routes) {
    if(!Array.isArray(routes)) {
      throw new Error('routes must be an array.')
    }

    this.routes = []
    this._config(routes)
    this._init()
  }

  _config (routes) {
    this._processRoutes(routes)
  }

  _processRoutes (routes, up = '') {

    routes.forEach((route) => {

      let compositeUrl = processSlash(up + route.url)

      this.routes.push({
        url: compositeUrl,
        matcher: new RegExp(compositeUrl.replace(/:[^\s/]+/g, '([\\w-]+)')),
        view: route.view
      })

      if(route.sub && Array.isArray(route.sub)) {
        this._processRoutes(route.sub, compositeUrl)
      }
    })
  }

  _init () {
    window.addEventListener('hashchange', () => {
      this.linkhash(window.location.hash)
    })
    this.linkhash(window.location.hash)
  }

  linkhash (hash) {
    if(!hash || hash === '#' || hash === '#/' || hash === '/') {
      hash = ''
    }
    if(hash.charAt(0) === '#') hash = hash.slice(1)

    this.matchRoute(hash)
  }

  matchRoute (hash) {
    let arr = hash.split('?')
    let path = arr[0]
    let query
    if(arr[1]) query = arr[1]

    for(let i = 0; i < this.routes.length; i++) {
      let route = this.routes[i]
      let matcher = route.matcher
      let match = path.match(matcher)

      if(match && match[0] === path ) {
        let args = []

        Object.keys(match).forEach((key) => {
          if(key+'' !== '0' && key !== 'index' && key !== 'input') {
            args.push(match[key])
          }
        })

        if(query) {
          args.push(parseQueryParams(query))
        }

        if(route.view) {
          route.view.apply(this, args)
        }

        return
      }

    }

  }

}









