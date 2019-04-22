var logout = function() {
  console.log("USER CLICKED LOGOUT")
  const Http = new XMLHttpRequest()
  const url = "http://localhost:3000/logout"
  Http.open("GET", url)
  Http.send()
  Http.onreadystatechange = e => {
    window.location.href = "http://localhost:3000"
  }
}
