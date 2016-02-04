function truncate(body) {
  if (body.length < 100){
    return body
  }
  else {
    var truncatedBody = body.substring(0, 100)
    truncatedBody = truncatedBody.substr(0, Math.min(truncatedBody.length, truncatedBody.lastIndexOf(" ")))
    return truncatedBody + "..."
  }
}
