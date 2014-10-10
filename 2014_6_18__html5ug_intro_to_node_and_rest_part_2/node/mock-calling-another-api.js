





var externalAPI = {
    get: function() {
        //real code runs on another server somewhere...
        return { statusCode: 200, data: JSON.stringify({ data: 'stuff' }) }
    }
}




var mockAPI = {
    get: function() {
        return { statusCode: 500 };
    }
}

var yourApp = {
    api : externalAPI,

    run: function() {
        var result = this.api.get();
        return result;
    }
}

yourApp.api = mockAPI;




console.log('result', yourApp.run());









