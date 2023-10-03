import { Database } from 'bun:sqlite';
const db = new Database('mydb.sqlite', { create: true });

/*const query = db.query(
  'CREATE TABLE CARS (carId INTEGER PRIMARY KEY,brand TEXT NOT NULL,steats NUMBER NOT NULL,licencePlate TEXT NOT NULL,engineType TEXT NOT NULL,currentAutonomy NUMBER NOT NULL);'
);
console.log(query.get());*/

/*const query2 = db.query(
  'CREATE TABLE DRIVER (driverId INTEGER PRIMARY KEY,name TEXT NOT NULL,contact TEXT NOT NULL,licenceNumber TEXT NOT NULL);'
);
console.log(query2.get());*/

/*const query3 = db.query(
  'CREATE TABLE RESERVATION (reservationId INTEGER PRIMARY KEY,pickipDate timestamp NOT NULL,dropOffDate timestamp NOT NULL,driverId INTEGER NOT NULL,carId INTEGER NOT NULL,FOREIGN KEY (driverId) REFERENCES DRIVER (driverId),FOREIGN KEY (carId) REFERENCES CARS (carId));'
);
console.log(query3.get());*/

const query4 = db.query('SELECT * FROM sqlite_schema');
// => { message: "Hello world" }
console.log(query4.all());

import { Elysia, t } from 'elysia';
import { cors } from '@elysiajs/cors';

new Elysia()
  .use(cors())
  .post(
    '/api/upload',
    ({ body }) => {
      console.log(body);
    },
    {
      body: t.Object({
        marca: t.String(),
        modelo: t.String(),
        seats: t.Number(),
        engine: t.String(),
        file: t.String(),
      }),
    }
  )
  .listen(5000);
