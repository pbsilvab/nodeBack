const nanoid = require('nanoid/async'); 
const auth  = require('../../../api/components/auth');
module.exports = function(injectedStore){
    let store = injectedStore;
    const TABLE = 'posts'

    if(!store){
        store = require('../../../store/dummy');
    }

    function list() {
        return store.list(TABLE);
    }

    return {
        list
    }
}