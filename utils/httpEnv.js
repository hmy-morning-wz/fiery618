var env = undefined;
const prdDomain = {
    "default": "",
    "push": "https://operation.allcitygo.com",
    "activity": "",
    "operation": 'https://operation.allcitygo.com',
    "preview": "https://operation.allcitygo.com"
};
const sitDomain = {
    "default": "",
    "activity": '',
    "push": 'https://sit-operation.allcitygo.com',
    "operation": 'https://sit-operation.allcitygo.com',
    "preview": "https://sit-operation.allcitygo.com"
};
const prdPrefix = {
    "default": "",
    "activity": "/operation-activity",
    "preview": "/operation-activity",
    "push": "/operation-push"
};
const sitPrefix = {
    "default": "",
    "activity": "/operation-activity",
    "preview": "/operation-activity",
    "push": "/operation-push"
};
export function setEnv(newEnv) {
    newEnv && (env = newEnv);
}
export default function getDomain(urlType) {
    if (env == 'sit') {
        return (sitDomain[urlType || 'default'] || '') + (sitPrefix[urlType || 'default'] || "");
    }
    else {
        return (prdDomain[urlType || 'default'] || '') + (prdPrefix[urlType || 'default'] || "");
    }
}
