const redis = require('redis');
const mysql = require('mysql2/promise');

const redisConfig = {
    password: 'Tf10Rqw3WWhHxPKdBJSzJVaoBna5Hw4M',
    socket: {
        host: 'comparison-pies-plastic-22009.db.redis.io',
        port: 10451
    }
};

const mysqlConfig = {
    host: 'localhost',
    user: 'root',
    password: 'kevin',
    database: 'taller_redis'
}

async function obtenerProductos() {
    //CONEXIONES A CLIENTES
    const redisClient = redis.createClient(redisConfig);
    let mysqlConnection;

    try {
        //CONECTAR A REDIS
        await redisClient.connect();
        console.log('Conectado a Redis');

        //CONECTAR A MYSQL
        mysqlConnection = await mysql.createConnection(mysqlConfig);
        console.log('Conectado a MySQL');
    } catch (error) {
        console.error('Error al conectar a las bases de datos:', error);
    }

    //CONSULTA REDIS
    const cacheKey = 'productos:todos';
    console.time('Tiempo de ejecución');

    const cacheData = await redisClient.get(cacheKey);

    if (cacheData) {
        console.log('Datos obtenidos de Cache: ', cacheData);
        console.timeEnd('Tiempo de ejecución');
        await redisClient.disconnect();
        await mysqlConnection.end();
        return;
    }

    //CONSULTA MYSQL
    console.log('Sin datos en cache, consultando MySQL...');
    const [productos] = await mysqlConnection.execute('SELECT * FROM productos');
    console.log('Datos obtenidos de MySQL: ', productos);
    console.timeEnd('Tiempo de ejecución');

    //ENVIO DE DATOS A REDIS
    await redisClient.set(cacheKey, JSON.stringify(productos), { 
        EX: 15 
    });

    await redisClient.disconnect();
    await mysqlConnection.end();
    return;
}

obtenerProductos();