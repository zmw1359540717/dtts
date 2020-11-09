import md5 from 'md5';

export const sign = (params) => {
    params.app_id = 0
    let str = '';

    const newkey = Object.keys(params).sort();
    const data = {};

    for (let i = 0; i < newkey.length; i++) {
        data[newkey[i]] = params[newkey[i]]
    }

    for (const k in data) {
        if (Object.prototype.hasOwnProperty.call(data, k)) {
        str += `${k}=${data[k]}&`
        }
    }

    str += `key=${0}`
    data['sign'] = md5(str)

    return data
}