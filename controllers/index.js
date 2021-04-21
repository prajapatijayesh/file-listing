
const fs = require('fs');
const path = require('path');
const _ = require('lodash');

const fetch = async (req, res, next) => {
    const dirName = req.query.dir_name;
    const obj = [];

    try {
        if (!dirName) {
            return res.status(404).jsonp({
                stats: 'error',
                message: 'dir_name, Missing'
            });
        }
        if (!fs.existsSync(dirName)) {
            return res.status(200).jsonp({
                status: 'success',
                message: 'directory does not exist.'
            })
        }

        // reads the contents of a directory
        // fs.readdir(dirName, (err, files) => {
        //     if (err) {
        //         console.log(error);
        //         return res.status(500).jsonp({
        //             status: 'error',
        //             message: err.message || 'Sorry! Something went wrong.'
        //         });
        //     }
        //     files.forEach(file => {
        //         console.log('file', '=>', file);
        //         var stats = fs.statSync(path.join(dirName, file));
        //         obj.push({
        //             path: path.join(dirName, file),
        //             size: stats.size
        //         })
        //     });
        //     return res.status(200).jsonp({
        //         status: 'success',
        //         data: obj
        //     });
        // });

        // 
        for await (const file of walkSync(dirName)) {
            obj.push({
                path: file.path,
                size: (_.get(file, 'stat.size') + ' bytes'),
                attribute: _.get(file, 'stat')
            })
        }

        return res.status(200).jsonp({
            status: 'success',
            data: obj
        });
    } catch (error) {
        console.log(error);
        return res.status(500).jsonp({
            status: 'error',
            message: 'Sorry! Something went wrong.'
        });
    }
}

/**
 * 
 * @param {*} dir 
 */
async function* walkSync(dir) {
    const entries = fs.readdirSync(dir, { withFileTypes: true })

    for (let file of entries) {
        if (file.isDirectory()) {
            yield* walkSync(path.join(dir, file.name))
        } else {
            const stat = fs.statSync(path.join(dir, file.name));
            yield {
                ...file,
                path: path.join(dir, file.name),
                stat: stat
            }
        }
    }
}

module.exports = {
    fetch
}