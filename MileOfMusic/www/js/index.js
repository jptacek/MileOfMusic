/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // Jennifer Wagman Hagerfunction, we must explicity call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        var conn = checkConnection();

        app.receivedEvent('deviceready');
        document.addEventListener('online', this.onOnline, false);
        document.addEventListener('offline', this.onOffline, false);
        if((navigator.network.connection.type).toUpperCase() == "NONE" &&
            (navigator.network.connection.type).toUpperCase() == "UNKNOWN") {
            this.onOffline();
        }
        else {
            this.onOnline();
        }
    },
    onOnline: function() {
        alert('online: ' + navigator.network.connection.type);
        app.receivedEvent('online');
    },
    onOffline: function() {
        alert('offline: ' + navigator.network.connection.type);
        app.receivedEvent('offline');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

    }
};
function checkConnection(){
    var networkState;
    var test = cordova.exec(
        function(winParam) {networkState = winParam;},
        function(error) {

        },
        "NetworkStatus",
        "getConnectionInfo",
        []
    );
    var states = {};
    states[navigator.connection.UNKNOWN]  = 'Unknown connection';
    states[navigator.connection.ETHERNET] = 'Ethernet connection';
    states[navigator.connection.WIFI]     = 'WiFi connection';
    states[navigator.connection.CELL_2G]  = 'Cell 2G connection';
    states[navigator.connection.CELL_3G]  = 'Cell 3G connection';
    states[navigator.connection.CELL_4G]  = 'Cell 4G connection';
    states[navigator.connection.CELL]     = 'Cell generic connection';
    states[navigator.connection.NONE]     = 'No network connection';
    return networkState;
}