let supertest = require("supertest");
// let request = supertest("http://localhost:3030");
let app = require("../src/app");
let request = supertest(app);

test("A aplicação deve responder na porta 3030", async () => {
  return request.get("/").then((res) => {
    expect(res.statusCode).toEqual(200);
  });
});

/* test("A aplicação deve responder na porta 3030", async () => {
  
    try{
    let res = await request.get("/")
  expect(res.statusCode).toEqual(200)
    }catch(err){
        console.log(err)
    }

}); */

test("Deve retornar a cor vermelha", () => {
  return request.get("/cor/vermelho").then((res) => {
    expect(res.statusCode).toEqual(200);
    expect(res.body.cor).toEqual("vermelho");
  });
});
