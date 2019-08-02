import tmrm = require("azure-pipelines-task-lib/mock-run");
import path = require("path");

let taskPath = path.join(__dirname, "..", "mavenauth.js");
let tr: tmrm.TaskMockRunner = new tmrm.TaskMockRunner(taskPath);

const testUserHomeDir = path.join(__dirname, "USER_HOME");
const m2DirName = ".m2"
const m2DirPath = path.join(testUserHomeDir, m2DirName);
const settingsXmlName = "settings.xml";
const settingsXmlPath = path.join(m2DirPath, settingsXmlName);

// Set inputs
tr.setInput("feeds", "feedName1");
tr.setInput("verbosity", "verbose");
tr.setInput("serviceEndpoints", "");
process.env["ENDPOINT_AUTH_SYSTEMVSSCONNECTION"] =
    '{"scheme":"OAuth","parameters":{"AccessToken":"YWFtYWxsYWQ6ZXd0emE1bmN3MzN6c3lyM2NoN2prazUzejczamN6MnluNGtiNzd0ZXc0NnlhZzV2d3ZlcQ=="}}';

// provide answers for task mock
tr.setAnswers({
    osType: {
        "osType": "Windows NT"
    },
    exist: {
        [m2DirPath]: true,
        [settingsXmlPath]: true
    }
});

tr.run();
