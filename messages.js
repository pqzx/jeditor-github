// set source file here
// TODO: hardcode url here and remove ability to enter/use entered url
var githubFile = '';

// Initialize the editor
var editor = new JSONEditor(document.getElementById('editor_holder'), {

    // The schema for the editor
    schema: {
        type: "array",
        title: "Messages",
        items: {
            type: "object",
            title: "Message",
            headerTemplate: "{{i1}}",
            options: {
                disable_edit_json: true,
                disable_properties: true,
            },
            properties:
            {
                "content": {
                    "type": "string",
                    "format": "textarea",
                    options: {
                        input_height: "100px",
                        //input_width: "450px",
                        //expand_height: true,
                    }
                },
                "uuid": {
                    "type": "string",
                    options: {
                        hidden: true,
                    }
                }
            }
        }
    },

    // Disable additional properties
    no_additional_properties: true,
    disable_collapse: true,
    disable_array_delete_last_row: true,

    // Require all properties by default
    required_by_default: true
});

function generateUUID() { // Public Domain/MIT
    // Adapted from https://stackoverflow.com/a/8809472/
    var d = Date.now();
    if (typeof performance !== 'undefined' && typeof performance.now === 'function') {
        d += performance.now(); //use high-precision timer if available
    }
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
}

function parseGitHubURL(url) {
    // creates url for accessing github content api from url for github file
    var parts = url.split('/');
    // This relies on the github url structure to not change
    var gh = {
        owner: parts[3],
        repo: parts[4],
        //branch: parts[6],
        path_to_file: parts.splice(7).join('/')
    }
    var api = "https://api.github.com/repos/" + gh.owner + '/' + gh.repo + '/contents/' + gh.path_to_file;
    return api;
}

function getGitHubBranch(url) {
    return url.split('/')[6];
}

function createAuthHeader(username, password) {
    // creates token for HTTP Basic Authentication
    var fullstring = username + ':' + password;
    var encoded = btoa(fullstring);
    return 'Basic ' + encoded;
}

function loadFile() {
    var request = new XMLHttpRequest();
    request.open('GET', api, true);
    // Auth token only needed for private repos
    request.setRequestHeader('Authorization', createAuthHeader(uname.value, pword.value));
    request.onload = function () {

        var data = JSON.parse(this.response);
        var content = atob(data.content);
        var startingValue = JSON.parse(content);

        // update globals
        sha = data.sha;
        editor.setValue(startingValue);
        eDiv.style.display = 'block';
    }

    // set branch
    var params = {
        ref: branch
    }
    request.send(JSON.stringify(params));
}

function pushFile(content) {
    var request = new XMLHttpRequest();
    request.open('PUT', api, true);
    request.setRequestHeader('Authorization', createAuthHeader(uname.value, pword.value));
    var requestContent = btoa(JSON.stringify(content));
    var update = {
        "message": document.getElementById('commitmsg').value,
        "content": requestContent,
        "sha": sha,
        "branch": branch // push onto same branch
    }
    var params = JSON.stringify(update);
    request.onload = function () {
        var data = JSON.parse(this.response);
        if (data.hasOwnProperty('commit')) {
            confirm('Commit succeeded.');
            // update sha
            sha = data.content.sha;
        } else {
            confirm('Commit failed. Check login details correct.');
        }
    }
    request.send(params)
}

function makeJSON(messages) {
    // create the json we are interested in
    var msgjson = []
    for (var i = 0; i < messages.length; i++) {
        if (messages[i]["uuid"] == "") {
            messages[i]["uuid"] = generateUUID();
        }
        var msg = {
            uuid: messages[i]["uuid"],
            sequence: i,
            content: messages[i]["content"]
        }
        msgjson.push(msg);
    }
    return msgjson;
}

// collect global variables
var source = document.getElementById("source");
var api = "" //parseGitHubURL(githubFile);
var branch = "" //getGitHubBranch(githubFile);
var sha = "";
var uname = document.getElementById('username');
var pword = document.getElementById('pass');
var eDiv = document.getElementById('editor_holder');

// retrieve json file
document.getElementById("get_source").addEventListener("click", function () {
    if (editor.getValue().length > 0) {
        if (confirm('Are you sure you wish to retrieve this file? Doing so will overwrite unsaved changes on this page.') === false) {
            return;
        }
    }
    api = parseGitHubURL(source.value);
    branch = getGitHubBranch(source.value);
    loadFile();
})

// Hook up the submit button to create json and send to github
document.getElementById('submit').addEventListener('click', function () {
    var messages = editor.getValue();
    msgjson = makeJSON(messages);
    pushFile(msgjson);
});
