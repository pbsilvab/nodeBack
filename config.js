module.exports = {
    remoteDB: process.env.REMOTE_DB || false,
    api: {
        port: process.env.API_PORT || 3000
    },
    post: {
        port: process.env.POST_PORT || 3002
    },
    jwt: {
        secret: process.env.JWT_SECRET || 'secret!'
    },
    mysql: {
        host: process.env.MYSQL_HOST || 'remotemysql.com',
        user: process.env.MYSQL_USER || 'TCcsgOEMOv',
        password: process.env.MYSQL_PASS || 'q3Nj2r7TAr',
        database: process.env.MYSQL_DB || 'TCcsgOEMOv',
    },
    mysql_service: {
        port: process.env.MYSQL_SVR_PORT  || 3001,
        host: process.env.MYSQL_SVR_HOST  || 'localhost'
    },
    cache_service : {
        port: process.env.CacheSVR_PORT  || 3003,
        host: process.env.CacheSVR_HOST  || 'localhost'
    },
    redis: {
        host:  process.env.redis_HOST || 'redis-15786.c52.us-east-1-4.ec2.cloud.redislabs.com',
        port:  process.env.redis_PORT || 15786,
        pass:  process.env.redis_PASS || 'vz1iuCOumsdJdtJsFg3vbGxjGsupAFk4'
    }
}