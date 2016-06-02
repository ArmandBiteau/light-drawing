import io from 'socket.io-client';

import {
  URL, PORT
} from '../config/server';

class Socket extends io.connect {

    constructor() {

        super(URL+':'+PORT);

    }

}

export default (new Socket());
