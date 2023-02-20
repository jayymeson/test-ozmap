const assert = require("assert");
const request = require("supertest");
const app = require("../src/index");

describe("Testes da API de usuários", () => {
  let id;

  it("Deve criar um novo usuário", (done) => {
    const user = {
      name: "Teste",
      email: "teste@teste.com",
      password: "123456",
      img: "https://example.com/image.jpg",
    };
    request(app)
      .post("/users")
      .send(user)
      .expect(201)
      .end((err, res) => {
        assert.ifError(err);
        id = res.body.id;
        done();
      });
  });

  it("Deve retornar uma lista de usuários", (done) => {
    request(app)
      .get("/api/users")
      .expect(200)
      .expect((res) => {
        expect(res.body.length).toBeGreaterThan(0);
      })
      .end(done);
  });

  it("Deve retornar um usuário pelo ID", (done) => {
    const userId = 1; 

    request(app)
      .get(`/api/users/${userId}`)
      .expect(200)
      .expect((res) => {
        const user = res.body;

        // verifique se o usuário foi encontrado
        expect(user).toBeDefined();
        expect(user.id).toBe(userId);
      })
      .end(done);
  });

  it("Deve atualizar um usuário existente", (done) => {
    const user = {
      name: "Teste atualizado",
      email: "teste@teste.com",
      password: "123456",
      img: "https://example.com/image.jpg",
    };
    request(app)
      .put(`/users/${id}`)
      .send(user)
      .expect(200)
      .end((err, res) => {
        assert.ifError(err);
        assert.strictEqual(
          res.body.message,
          `Usuário com id ${id} atualizado com sucesso.`
        );
        done();
      });
  });

  it("Deve excluir um usuário existente", (done) => {
    request(app)
      .delete(`/users/${id}`)
      .expect(200)
      .end((err, res) => {
        assert.ifError(err);
        assert.strictEqual(res.body.message, `Usuário com id ${id} excluído.`);
        done();
      });
  });
});
