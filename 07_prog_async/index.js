function enviarEmail(corpo, para, callback){
    setTimeout(() => {
        console.log(`
        Para: ${para}
        -----------------------------
        ${corpo}
        ______________________
        Leonardo Santos
        `)
        callback()
    }, 8000);
}
console.log("Inicio de envio de e-mail")
enviarEmail('teste', 'lcds90@gmail.com', () => {
    console.log("Email enviado, chegará em alguns segundos")
})
