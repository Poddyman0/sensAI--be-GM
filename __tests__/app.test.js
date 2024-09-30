const { app } = require("../app");
const request = require("supertest");
const db = require("../db/connection");
const seed = require("../db/seeds/seed");
const data = require("../db/data/test-data/index.js");

beforeEach(() => seed(data));
afterAll(() => db.end());

describe("/api/users", () => {
  test("get 200: when passed an array of user objects returns an array of objects which arent mutated and have same properties", () => {
    return request(app)
      .get("/api/users")
      .expect(200)
      .then((res) => {
        const { users } = res.body;
        expect(Array.isArray(users)).toEqual(true);
        expect(users.length).toEqual(102);
        expect(users).toEqual(users);
        users.forEach((user) => {
          expect(user).toEqual(
            expect.objectContaining({
              id: expect.any(Number),
              name: expect.any(String),
              surname: expect.any(String),
              email: expect.any(String),
              role: expect.any(String),
              created_at: expect.any(String),
              role: expect.any(String || null),
            })
          );
        });
      });
  });

  test("get 200: when given an array of objects, returns the same values", () => {
    return request(app)
      .get("/api/users")
      .expect(200)
      .then((res) => {
        const { users } = res.body;
        expect(users[0].id).toEqual(1);
        expect(users[0].name).toEqual("User1");
        expect(users[0].surname).toEqual("Surname1");
        expect(users[0].email).toEqual("user1.surname1@example.com");
        expect(users[0].role).toEqual("student");
        expect(users[0].created_at).toEqual("2018-12-19T00:00:00.000Z");
        expect(users[0].disability).toEqual("ADHD");
        expect(users[101].id).toEqual(102);
        expect(users[101].name).toEqual("User102");
        expect(users[101].surname).toEqual("Surname102");
        expect(users[101].email).toEqual("user102.surname102@yahoo.com");
        expect(users[101].role).toEqual("teacher");
        expect(users[101].created_at).toEqual("2018-12-19T00:00:00.000Z");
        expect(users[101].disability).toEqual(null);
      });
  });
  test("status:404, responds with an error message when passed a invalid users path", () => {
    return request(app)
      .get("/api/banana")
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("Not found");
      });
  });
});
describe("GET /api/users/email/:email", () => {
  test("should return 200", () => {
    return request(app)
      .get("/api/users/email/user1.surname1@example.com")
      .expect(200)
      .then((res) => {
        const { user } = res.body;
        expect(user).toEqual(
          expect.objectContaining({
            id: expect.any(Number),
            name: expect.any(String),
            surname: expect.any(String),
            email: expect.any(String),
            role: expect.any(String),
            created_at: expect.any(String),
            disability: expect.any(String),
          })
        );
      });
  });
  test("should return 404 error if no record found", () => {
    return request(app)
      .get("/api/users/banana")
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("Not found");
      });
  });
});

describe("POST /api/users/email", () => {
  test("should return 201 and the inserted user", () => {
    return request(app)
      .post("/api/users/email")
      .send({ email: "new.user@example.com" })
      .expect(201)
      .then((res) => {
        const { user } = res.body;
        expect(user).toEqual(
          expect.objectContaining({
            id: expect.any(Number),
            email: "new.user@example.com",
          })
        );
      });
  });

  test("should return 400 for invalid request", () => {
    return request(app)
      .post("/api/users/email")
      .send({})
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("Bad Request");
      });
  });
});

describe("/api/users", () => {
  test("get 200: when passed an array of user objects returns an array of objects which arent mutated and have same properties", () => {
    return request(app)
      .get("/api/users")
      .expect(200)
      .then((res) => {
        const { users } = res.body;
        expect(Array.isArray(users)).toEqual(true);
        expect(users.length).toEqual(102);
        expect(users).toEqual(users);
        users.forEach((user) => {
          expect(user).toEqual(
            expect.objectContaining({
              id: expect.any(Number),
              name: expect.any(String),
              surname: expect.any(String),
              email: expect.any(String),
              role: expect.any(String),
              created_at: expect.any(String),
              role: expect.any(String || null),
            })
          );
        });
      });
  });

  test("get 200: when given an array of objects, returns the same values", () => {
    return request(app)
      .get("/api/users")
      .expect(200)
      .then((res) => {
        const { users } = res.body;
        expect(users[0].id).toEqual(1);
        expect(users[0].name).toEqual("User1");
        expect(users[0].surname).toEqual("Surname1");
        expect(users[0].email).toEqual("user1.surname1@example.com");
        expect(users[0].role).toEqual("student");
        expect(users[0].created_at).toEqual("2018-12-19T00:00:00.000Z");
        expect(users[0].disability).toEqual("ADHD");
        expect(users[101].id).toEqual(102);
        expect(users[101].name).toEqual("User102");
        expect(users[101].surname).toEqual("Surname102");
        expect(users[101].email).toEqual("user102.surname102@yahoo.com");
        expect(users[101].role).toEqual("teacher");
        expect(users[101].created_at).toEqual("2018-12-19T00:00:00.000Z");
        expect(users[101].disability).toEqual(null);
      });
  });
  test("status:404, responds with an error message when passed a invalid users path", () => {
    return request(app)
      .get("/api/1000000")
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("Not found");
      });
  });
});
describe("GET /api/lessons/:lesson_id", () => {
  test("200 GET: when passed an object returns an object", () => {
    return request(app)
      .get("/api/lessons/1")
      .expect(200)
      .then((res) => {
        let { lessons } = res.body;
        expect(typeof lessons).toEqual("object");
      });
  });
  test("200 GET: responds with an lesson object by lesson ID", () => {
    const result = {
      id: 1,
      title: "English: Essay structure",
      body: "well-structured formal expository and narrative essays",    
      teacher_id: 101,
      created_at: "2021-01-01T00:00:00.000Z",
    };
    return request(app)
      .get("/api/lessons/1")
      .expect(200)
      .then((res) => {
        const { lessons } = res.body;
        expect(lessons).toMatchObject(result);
      });
  });
  test("200 GET: responds with an lesson object by lesson_ID with properties id, title, body, teacher_id, created_at", () => {
    return request(app)
      .get("/api/lessons/1")
      .expect(200)
      .then((res) => {
        const { lessons } = res.body;
        const expected = {
          id: expect.any(Number),
          title: expect.any(String),
          body: expect.any(String),
          teacher_id: expect.any(Number),
          created_at: expect.any(String),
        };
        expect(typeof lessons).toBe("object");
        expect(lessons).toMatchObject(expected);
      });
  });

  test("status:400, responds with an error message when passed a invalid input_id input", () => {
    return request(app)
      .get("/api/lessons/banana")
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("Bad request");
      });
  });
  test("status:404, responds with an error message when a valid input_ID which does not exist on the database", () => {
    return request(app)
      .get("/api/lessons/900")
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("Not found");
      });
  });
});
describe("GET /api/classes/:teacher_id", () => {
  test("200 GET: when passed an teacher_id returns an array", () => {
    return request(app)
      .get("/api/classes/101")
      .expect(200)
      .then((res) => {
        let { classes } = res.body;

        expect(Array.isArray(classes)).toEqual(true);
        expect(classes.length).toBe(2);
      });
  });
  test("200 GET: when passed a teacher ID, returns objects with unmutated values", () => {
    const result = {
      id: 1,
      name: "green",
      age_group: "KS3",
      subject: "english",
      created_at: "2005-01-22T00:00:00.000Z",
      exam_board: "SATS",
    };
    return request(app)
      .get("/api/classes/101")
      .expect(200)
      .then((res) => {
        const { classes } = res.body;
        expect(classes[0]).toMatchObject(result);
      });
  });
  test("200 GET: when passed a teacher_id, responds with a classes array with objects with properties id, name, age_group, subject, created_at, exam_board", () => {
    return request(app)
      .get("/api/classes/101")
      .expect(200)
      .then((res) => {
        const { classes } = res.body;
        classes.forEach((individualClass) => {
          expect(individualClass).toMatchObject({
            id: expect.any(Number),
            name: expect.any(String),
            age_group: expect.any(String),
            subject: expect.any(String),
            created_at: expect.any(String),
            exam_board: expect.any(String),
          });
        });
      });
  });

  test("status:400, responds with an error message when passed a invalid input_id input", () => {
    return request(app)
      .get("/api/classes/banana")
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("Bad request");
      });
  });
  test("status:404, responds with an error message when a valid input_ID which does not exist on the database", () => {
    return request(app)
      .get("/api/classes/900")
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("Not found");
      });
  });
});
describe("post /api/assignments/:teacher_id/:class_id", () => {
  test("200 post: when sent teacher_id and class_id params as well as sent title, body and due_date updates assignment database with new assignment with ID, title, body, teacher_id, created_at and due_date", () => {
    return request(app)
      .post("/api/assignments/101/1")
      .send({ title: "test title", body: "test body", due_date: "2023-09-19" })
      .expect(200)
      .then(() => {
        return db
          .query(`SELECT * FROM assignments WHERE id = 9`)
          .then(({ rows }) => {
            expect(typeof rows[0]).toBe("object");
            expect(rows[0]).toEqual(
              expect.objectContaining({
                id: 9,
                title: "test title",
                body: "test body",
                teacher_id: 101,
                created_at: expect.any(Object),
                due_date: expect.any(Object),
              })
            );
          });
      });
  });
  test("200 post: when sent teacher_id and class_id params as well as sent title, body and due_date updates users_assignments database with new user assignment with id, assignment_id, user_id, work, submit_date, feedback and mark.", () => {
    return request(app)
      .post("/api/assignments/101/1")
      .send({ title: "test title", body: "test body", due_date: "2023-09-19" })
      .expect(200)
      .then(() => {
        return db
          .query(`SELECT * FROM users_assignments WHERE assignment_id = 9`)
          .then(({ rows }) => {
            expect(Array.isArray(rows)).toBe(true);
            expect(typeof rows[0]).toBe("object");
            expect(rows.length).toBe(25);
            rows.forEach((userAssignment) => {
              expect(userAssignment).toEqual(
                expect.objectContaining({
                  id: expect.any(Number),
                  assignment_id: 9,
                  user_id: expect.any(Number),
                  work: null,
                  submit_date: null,
                  feedback: null,
                  mark: null,
                })
              );
            });
          });
      });
  });
  test("200 post: when sent teacher_id and class_id params as well as sent title, body and due_date updates users_assignments database with correct values for keys", () => {
    return request(app)
      .post("/api/assignments/101/1")
      .send({ title: "test title", body: "test body", due_date: "2023-09-19" })
      .expect(200)
      .then(() => {
        return db
          .query(`SELECT * FROM users_assignments WHERE assignment_id = 9`)
          .then(({ rows }) => {
            const result1 = {
              id: 201,
              assignment_id: 9,
              user_id: 1,
              work: null,
              submit_date: null,
              feedback: null,
              mark: null,
            };
            const result2 = {
              id: 225,
              assignment_id: 9,
              user_id: 25,
              work: null,
              submit_date: null,
              feedback: null,
              mark: null,
            };
            expect(typeof rows[0]).toBe("object");
            expect(typeof rows[24]).toBe("object");
            expect(rows[0]).toMatchObject(result1);
            expect(rows[24]).toMatchObject(result2);
          });
      });
  });
  test("status:404 post, responds with an error message when passed a invalid teacher_id input", () => {
    return request(app)
      .post("/api/assignments//1")
      .send({ title: "test title", body: "test body", due_date: "2023-09-19" })
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("Not found");
      });
  });
  test("status:404 post, responds with an error message when a invalid class_id", () => {
    return request(app)
      .post("/api/assignments/101/")
      .send({ title: "test title", body: "test body", due_date: "2023-09-19" })
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("Not found");
      });
  });
  test("status:400 post, responds with an error message when given invalid body request", () => {
    return request(app)
      .post("/api/assignments/101/1")
      .send({})
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("Bad request");
      });
  });
});

describe("post /api/lessons/:teacher_id/:class_id", () => {
  test("200 post: when sent teacher_id and class_id params as well as sent title and body updates lesson database with new lesson with ID, title, body, teacher_id and created_at", () => {
    return request(app)
      .post("/api/lessons/101/1")
      .send({ title: "test title", body: "test body" })
      .expect(200)
      .then(() => {
        return db
          .query(`SELECT * FROM lessons WHERE id = 9`)
          .then(({ rows }) => {
            expect(typeof rows[0]).toBe("object");
            expect(rows[0]).toEqual(
              expect.objectContaining({
                id: 9,
                title: "test title",
                body: "test body",
                teacher_id: 101,
                created_at: expect.any(Object),
              })
            );
          });
      });
  });
  test("200 post: when sent teacher_id and class_id params as well as sent title and body updates users_lessons database with new user lesson with id, lesson_id and user_id.", () => {
    return request(app)
      .post("/api/lessons/101/1")
      .send({ title: "test title", body: "test body" })
      .expect(200)
      .then(() => {
        return db
          .query(`SELECT * FROM users_lessons WHERE lesson_id = 9`)
          .then(({ rows }) => {
            expect(Array.isArray(rows)).toBe(true);
            expect(typeof rows[0]).toBe("object");
            expect(rows.length).toBe(25);
            rows.forEach((userLesson) => {
              expect(userLesson).toEqual(
                expect.objectContaining({
                  id: expect.any(Number),
                  lesson_id: 9,
                  user_id: expect.any(Number),
                })
              );
            });
          });
      });
  });
  test("200 post: when sent teacher_id and class_id params as well as sent title and body updates users_lessons database with correct values for keys", () => {
    return request(app)
      .post("/api/lessons/101/1")
      .send({ title: "test title", body: "test body" })
      .expect(200)
      .then(() => {
        return db
          .query(`SELECT * FROM users_lessons WHERE lesson_id = 9`)
          .then(({ rows }) => {
            const result1 = { id: 201, lesson_id: 9, user_id: 1 };
            const result2 = { id: 225, lesson_id: 9, user_id: 25 };
            expect(typeof rows[0]).toBe("object");
            expect(typeof rows[24]).toBe("object");
            expect(rows[0]).toMatchObject(result1);
            expect(rows[24]).toMatchObject(result2);
          });
      });
  });
  test("status:404 post, responds with an error message when passed a invalid teacher_id input", () => {
    return request(app)
      .post("/api/lessons//1")
      .send({ title: "test title", body: "test body" })
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("Not found");
      });
  });
  test("status:404 post, responds with an error message when a invalid class_id", () => {
    return request(app)
      .post("/api/lessons/101/")
      .send({ title: "test title", body: "test body" })
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("Not found");
      });
  });
  test("status:400 post, responds with an error message when given invalid body request", () => {
    return request(app)
      .post("/api/lessons/101/1")
      .send({})
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("Bad request");
      });
  });
});

describe("Delete /api/lessons/:lesson_id/:user_id", () => {
  test("204 Delete lesson by assignment_id and user_id", () => {
    return request(app).delete("/api/lessons/1/1").expect(204);
  });

  test("204 Delete lesson by lesson_id and user_id and check user_lessons", () => {
    return request(app)
      .delete("/api/lessons/1/1")
      .expect(204)
      .then(() => {
        return db.query(`SELECT * FROM users_lessons;`).then(({ rows }) => {
          let isDeleted = true;
          rows.forEach((row) => {
            if (row.lesson_id === 1 && row.user_id === 1) {
              isDeleted = false;
            }
          });
          expect(isDeleted).toBe(true);
        });
      });
  });

  test("404 Delete when given lesson does not exist", () => {
    return request(app)
      .delete("/api/lessons/10000/1")
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("Not found");
      });
  });

  test("404 Delete when given user_id does not exist", () => {
    return request(app)
      .delete("/api/lessons/1/10000")
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("Not found");
      });
  });

  test("400 Delete when given invalid lesson_id", () => {
    return request(app)
      .delete("/api/lessons/invalid/1")
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("Bad request");
      });
  });

  test("400 Delete when given invalid user_id", () => {
    return request(app)
      .delete("/api/lessons/1/invalid")
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("Bad request");
      });
  });
});

describe("Delete /api/lessons/:lesson_id", () => {
  test("204 Delete lesson by lesson_id", () => {
    return request(app).delete("/api/lessons/1").expect(204);
  });

  test("204 Delete lesson by lesson_id and check lessons after", () => {
    return request(app)
      .delete("/api/lessons/1")
      .expect(204)
      .then(() => {
        return db.query(`SELECT * FROM lessons;`).then(({ rows }) => {
          let isDeleted = true;
          rows.forEach((row) => {
            if (row.id === 1) {
              isDeleted = false;
            }
          });
          expect(isDeleted).toBe(true);
        });
      });
  });

  test("404 Delete when given lesson does not exist", () => {
    return request(app)
      .delete("/api/lessons/10000")
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("Not found");
      });
  });

  test("400 Delete when given invalid lesson_id", () => {
    return request(app)
      .delete("/api/lessons/invalid")
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("Bad request");
      });
  });
});
