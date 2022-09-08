const {spawn} = require('child_process');

function match(hostname, ip, port, https = false) {
    return new Promise((resolve, reject) => {
        const url = `${https ? 'https' : 'http'}://${hostname}:${port}`;
        let child = spawn('curl', [
            url,
            '--resolve',
            `${hostname}:${port}:${ip}`,
        ]);
        let data = Buffer.from('');
        child.stdout.on('data', (chunk) => {
            data = Buffer.concat([data, chunk]);
        });
        child.once('exit', (code) => {
            process.nextTick(() => {
                child.stdout.removeAllListeners();
                child.kill(9);
            });
            if (code === 0) {
                resolve(data);
                return;
            }
            reject(code);
        });
        // child.once('error', (err) => {
        //     reject(err);
        // });
    });
}

match('one.one.one.one', '1.1.1.1', 443, true)
    .then(console.log)
    .catch(console.error);

module.exports = match;
