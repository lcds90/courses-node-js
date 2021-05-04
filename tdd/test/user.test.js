let app = require("../src/app");
let supertest = require("supertest");
let request = supertest(app);

let mainUser = {
  name: "Leonardo Santos",
  email: "leonardo@dev.com",
  password: "123",
};

beforeAll(() => {
  // console.log("Antes de tudo!");
  return request
    .post("/user")
    .send(mainUser)
    .then((res) => {})
    .catch((err) => {
      console.log(err);
    });
});

afterAll(() => {
  // console.log("Depois de tudo!");
  return request.delete(`/user/${mainUser.email}`)
  .then(res => {})
  .catch(err => {
    console.log(err)
  })
});

describe("Cadastro de usuário", () => {
  test("Deve cadastrar um usuário com sucesso", () => {
    let time = Date.now();
    let email = `${time}@gmail.com`;
    let user = { name: "Leonardo", email, password: "123456" };

    return request
      .post("/user")
      .send(user)
      .then((res) => {
        expect(res.statusCode).toEqual(200);
        expect(res.body.email).toEqual(email);
      })
      .catch((err) => {
        fail(err);
      });
  });

  test("Deve impedir que usuário seja cadastrado com dados vazios", () => {
    let user = { name: "", email: "", password: "" };

    return request
      .post("/user")
      .send(user)
      .then((res) => {
        expect(res.statusCode).toEqual(400);
        // expect(res.statusCode).not(200)
      })
      .catch((err) => {
        fail(err);
      });
  });

  test("Deve impedir que usuário se cadastre com e-mail repetido", () => {
    let time = Date.now();
    let email = `${time}@gmail.com`;
    let user = { name: "Leonardo", email, password: "123456" };

    return request
      .post("/user")
      .send(user)
      .then((res) => {
        expect(res.statusCode).toEqual(200);
        expect(res.body.email).toEqual(email);
        return request
          .post("/user")
          .send(user)
          .then((res) => {
            expect(res.statusCode).toEqual(400);
            expect(res.body.error).toEqual("E-mail já cadastrado");
          })
          .catch((err) => {
            fail(err);
          });
      })
      .catch((err) => {
        fail(err);
      });
  });
});

describe("Autenticação", () => {
  test("Deve retornar token ao realizar login", () => {
    return request.post("/auth")
    .send({email: mainUser.email, password: mainUser.password})
    .then((res)=> {
      expect(res.statusCode).toEqual(200)
      expect(res.body.token).toBeDefined()
    }).catch(err => {
      fail(err);
    })
  })

  test("Deve impedir usuario não cadastrado de realizar login", () => {
    return request.post("/auth")
    .send({email: "email@fake.com", password: "fake"})
    .then((res)=> {
      expect(res.statusCode).toEqual(403)
      expect(res.body.errors.email).toEqual("E-mail não cadastrado")
    }).catch(err => {
      fail(err);
    })
  })

  test("Deve impedir usuario de realizar login com senha errada", () => {
    return request.post("/auth")
    .send({email: mainUser.email, password: "senha"})
    .then((res)=> {
      expect(res.statusCode).toEqual(403)
      expect(res.body.errors.password).toEqual("Dados incorretos")
    }).catch(err => {
      fail(err);
    })
  })
})
