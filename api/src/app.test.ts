import { getApp } from "./app";
import request from "supertest";
import low from "lowdb";
import dbData from "./fixtures/db.json";
import FileSync from "lowdb/adapters/FileSync";
import Memory from "lowdb/adapters/Memory";
import { DatabaseSchema } from "./DatabaseSchema";

const adapter = new Memory<DatabaseSchema>("");
const db = low(adapter);

db.defaults(dbData).write();

const app = getApp(db);

describe("/api/memes", () => {
  it("Existe el endpoint", (done) => {
    request(app).get("/api/memes").expect(200, done);
  });

  it("Error de conexion", (done) => {
    request(app).get("/api/memes/error").expect(400, done);
  });

  it("El endpoint devuelve una lista de 50 memes", (done) => {
    request(app)
      .get("/api/memes")
      .expect(200)
      .then((response) => {
        expect(response.body).toBeInstanceOf(Array);
        expect(response.body).toHaveLength(50);
        done();
      });
  });
});
