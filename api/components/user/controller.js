const nanoid = require('nanoid/async'); 
const auth  = require('../auth');

module.exports = function(injectedStore, injectedCache){
    let store = injectedStore;
    let cache = injectedCache;
    const TABLE = 'user'

    if(!store){
        store = require('../../../store/dummy');
    }

    if(!cache){
        cache = require('../../../store/dummy');
    }

    async function list() {
        
        let users = await cache.list(TABLE);

        if(!users){
            console.log("no estaba en cache");
            users = await store.list(TABLE);
            cache.upsert(TABLE, users);
        } else {
            console.log("estaba en cache");
        }

        return users;
    }

    function get(id) {
        return store.get(TABLE, id);
    }

    async function upsert(body){
       
        const user = {
            username: body.username,
            name: body.name
        }

        if (body.id){
            user.id = body.id 
        } else {
            user.id = await nanoid();
        }
        
        if (body.password || body.username) {
            await auth.upsert({
                id:        user.id,
                username:  body.username,
                password:  body.password
            });
        }

        return store.upsert(TABLE, user);
    }

    function follow(from, to) {
       return store.upsert(TABLE + '_follow', {
            user_from:from,
            user_to:to
        });
    }

    function following(user) {
        const join = {};
        join[TABLE] = 'user_to'
        const query = {user_from: user};

        return store.query(TABLE + '_follow', query, join);
    }
    
    return {
        list,
        get,
        upsert,
        follow,
        following
    };
}