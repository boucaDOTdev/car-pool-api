import { Database } from 'bun:sqlite';
const db = new Database('mydb.sqlite', { create: true });
/*const query = db.query(
  'CREATE TABLE CARS (carId INTEGER PRIMARY KEY,brand TEXT NOT NULL,model TEXT NOT NULL,steats NUMBER NOT NULL,licencePlate TEXT NOT NULL,engineType TEXT NOT NULL,currentAutonomy NUMBER NOT NULL,image TEXT NOT NULL);'
);
console.log(query.all());

const query2 = db.query(
  'CREATE TABLE DRIVER (driverId INTEGER PRIMARY KEY,name TEXT NOT NULL,contact TEXT NOT NULL,licenceNumber TEXT NOT NULL);'
);
console.log(query2.all());

const query3 = db.query(
  'CREATE TABLE RESERVATION (reservationId INTEGER PRIMARY KEY,pickipDate timestamp NOT NULL,dropOffDate timestamp NOT NULL,driverId INTEGER NOT NULL,carId INTEGER NOT NULL,FOREIGN KEY (driverId) REFERENCES DRIVER (driverId),FOREIGN KEY (carId) REFERENCES CARS (carId));'
);
console.log(query3.all());
*/
// => { message: "Hello world" }

import { Elysia, t } from 'elysia';
import { cors } from '@elysiajs/cors';

new Elysia()
  .use(cors())
  .get('/api/cars', () => db.query('SELECT * FROM CARS').all())
  .post('/api/upload', ({ body }) => {
    //console.log(JSON.parse(body as string));
    const req = JSON.parse(body as string);
    console.log(req);
    const marca = req.marca;
    const modelo = req.modelo;
    const seats = req.seats;
    const matricula = req.matricula;
    const engine = req.engine;
    const currentAutonomy = req.currentAutonomy;
    const image = req.image;

    db.run(
      'INSERT INTO CARS (carId, brand,model,steats,licencePlate,engineType,currentAutonomy,image) VALUES (?,?,?,?,?,?,?,?)',
      [
        db.query('SELECT * FROM CARS').all().length + 1,
        marca,
        modelo,
        seats,
        matricula,
        engine,
        currentAutonomy,
        image,
      ]
    );
  })
  .get('/api/driver', () => db.query('SELECT * FROM DRIVER').all())
  .post('/api/setdriver', ({ body }) => {
    //console.log(JSON.parse(body as string));
    const req = JSON.parse(JSON.stringify(body));
    console.log(req);
    const name = req.name;
    const contact = req.contact;
    const licenceNumber = req.licenceNumber;

    db.run(
      'INSERT INTO DRIVER (driverId,name,contact,licenceNumber) VALUES (?,?,?,?)',
      [
        db.query('SELECT * FROM DRIVER').all().length + 1,
        name,
        contact,
        licenceNumber,
      ]
    );
  })
  .get('/api/reservation', () => db.query('SELECT * FROM RESERVATION').all())
  .post('/api/setreservation', ({ body }) => {
    //console.log(JSON.parse(body as string));
    const req = JSON.parse(JSON.stringify(body));
    console.log(req);
    const pickipDate = req.pickipDate;
    const dropOffDate = req.dropOffDate;
    const driverId = req.driverId;
    const carId = req.carId;

    db.run(
      'INSERT INTO RESERVATION (reservationId,pickipDate,dropOffDate,driverId,carId) VALUES (?,?,?,?,?)',
      [
        db.query('SELECT * FROM RESERVATION').all().length + 1,
        pickipDate,
        dropOffDate,
        driverId,
        carId,
      ]
    );
  })
  .listen(5000);
