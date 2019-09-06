var express = require('express');
var socket = require('socket.io');
var request = require('request');

var app = express();
app.use(express.static("public"));

var server = app.listen(8080, function () {
    console.log('Listening 8080...');
});

var io = socket(server);
var Action_ID = "", veloxCampaignID = 0;

io.on("connect", function (socket) {

    socket.on("roomMove", function (data) {

        socket.room = data.screen;
        socket.join(data.screen);

        var getUserAgent = socket.request.headers['user-agent'];
        var isMobile = /iPhone|iPad|iPod|Android/i.test(getUserAgent);


        if (isMobile) {
            console.log("---------------------------------------------------------------");
            console.log("Date: " + Date());


            console.log("Phone Connected: " + isMobile);

            if (data.screen == 2) {
                Action_ID = "f4fe9809a1e84910a006efe7cc1544dc";
                console.log("Screen: Akmerkez");
                activeScreen(Action_ID, data.screen);
                veloxCampaignID = 2073;
                campaignStatus("deactivate", veloxCampaignID);
            }
            else if (data.screen == 188) {
                Action_ID = "426f695891214591b9fdfe6c4d5d09c3";
                console.log("Screen: Nişantaşı");
                activeScreen(Action_ID, data.screen);
                veloxCampaignID = 2094;
                campaignStatus('deactivate', veloxCampaignID);
            }
            else if (data.screen == 231) {
                Action_ID = "ca66ff9ab6f8481981e2f94652b89395";
                console.log("Screen: Bodrum Palmire");
                activeScreen(Action_ID, data.screen);
                veloxCampaignID = 2095;
                campaignStatus('deactivate', veloxCampaignID)
            }
            else if (data.screen == 253) {
                Action_ID = "2e1b7b52ffcd463d907e6548f7abcc3a";
                console.log("Screen: Bodrum Turgut Reis");
                activeScreen(Action_ID, data.screen);
                veloxCampaignID = 2096;
                campaignStatus('deactivate', veloxCampaignID);
            }

        }
        else {
            console.log("Screen Connected");
        }

    });

    socket.on("sarkSaat", function (data) {
        io.to(socket.room).emit("sarkSaat", data);
    });

    socket.on("disconnect", function () {
        if (veloxCampaignID > 0)
            campaignStatus("activate", veloxCampaignID);

    });

});



/** SISTEM9 OUTDOOR SCREEN CALL **/
function activeScreen(screenKey, screenID) {

    request({
        url: "http://s9v.lookscreens.com:78/s9_wexsrvc.asmx/Win_Action_Template",
        method: "post",
        headers: { "content-type": "application/json" },
        json: true,
        body: {
            "UserName_": "RtM_Action",
            "Password": "c874hU*6",
            "Action_ID": screenKey,
            "Device_ID": screenID
        }
    }, function (err, res, body) {
        if (err) {
            console.log("sistem9 connection error:");
            console.log(err);
        }
        else {
            console.log("sistem9 connection:");
            console.log(body);
        }

    });
}



/** SET VELOXITY PUSH NOTIFICATION CAMPAIGN STATUS **/
function campaignStatus(status, campaignID) {
    var url = "";
    var id = campaignID;

    console.log("Kampanya ID: " + campaignID);

    if (status == "activate")
        url = "https://dvgw.blinnk.com/vlx-dp/cnc/rtco/engage/campaign-activate";

    else if (status == "deactivate")
        url = "https://dvgw.blinnk.com/vlx-dp/cnc/rtco/engage/campaign-deactivate";

    //GET AUTH KEY
    request({
        method: "post",
        url: "https://dvgw.blinnk.com/vlx-dp/cnc/general/session/login",
        body: {
            "email": "bahar@themediamove.com",
            "password": "bahar3005"
        },
        headers: { "content-type": "application/json" },
        json: true
    }, function (err, res, body) {

        //CHANGE CAMPAIGN STATUS
        var key = body.session.authenticationKey;
        request({
            method: "post",
            url: url,
            body: {
                "authenticationKey": key,
                "ids": [id]
            },
            headers: { "content-type": "application/json" },
            json: true
        }, function (err, res, body) {
            if (err)
                console.log("Veloxity Error: " + err);
            else
                console.log("Veloxity Kampanya Status: " + body.data[0].status);
        });
    });

}

