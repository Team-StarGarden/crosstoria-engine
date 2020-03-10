import { app } from "../../index";
import request from "supertest";
import * as DBConnection from "./user.func";
import { InsertResult } from "typeorm";

describe("POST /register는", () => {
  describe("성공 시", () => {
    const spy = jest.spyOn(DBConnection, "insertUser");

    beforeAll(() => {
      spy.mockImplementation(data => {
        return Promise.resolve(new InsertResult());
      });
    });

    it("200을 반환한다", done => {
      request(app)
        .post("/api/users/register")
        .send({
          email: "sample@googoo.com",
          age: 17,
          userName: "Googoo"
        })
        .expect(200)
        .end(done);
    });
    afterAll(() => {
      spy.mockRestore();
    });
  });
});
