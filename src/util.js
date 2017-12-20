
export function parseQueryParams(search) {
  let ret = {}
  let seg = search.replace(/^\?/, '').split('&').filter((v,i) => {
    if (v!=='' && v.indexOf('=')) {
      return true
    }
  })
  seg.forEach( function(element, index) {
    var idx = element.indexOf('=')
    var key = element.substring(0, idx)
    var val = element.substring(idx+1)
    ret[key] = val
  })
  return ret
}

// //user//profile/ => /user/profile/
export function processSlash(str) {
  return str.replace(/\/+/g, '/')
}
