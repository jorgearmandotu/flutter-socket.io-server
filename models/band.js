const { v4:uuidv4 } = require('uuid');
//import { v4 as uuidv4 } from 'uuid';


class Band {
    constructor( name = 'no-name') {
        this.id = uuidv4();//identificador único
        this.name = name;
        this.votes = 0;
    }
}

module.exports = Band;