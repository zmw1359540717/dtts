import axios from 'axios';
import requset from './req';
// const loginUrl = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx2b5d345cbc7a426b&redirect_uri=http%3A%2F%2Flumen.hupo-games.com%2Fwechat%2Fgetuserinfo&response_type=code&scope=snsapi_userinfo&state=1#wechat_redirect'

let isloding = false;

async function myLogin() {
    if (isloding) {
        return;
    }
    isloding = true;
    let loginUrl = ''
    const res = await axios.get('http://lumen.hupo-games.com/wechat');
    if (res.status === 200) {
        console.log(res.data.wechat_authurl);
        loginUrl = res.data.wechat_authurl;
        window.location.href = loginUrl;
        isloding = false;
    }
    // window.location.href = loginUrl;
}

async function getToken() {
    if (isloding) {
        return;
    }
    if (localStorage.getItem('token')) {
        return { token: localStorage.getItem('token'), uid: localStorage.getItem('uid') }
    } else {
        isloding = true;
        requset('Login', { openid: localStorage.getItem('openid') }, (res) => {
            if (res.code === 1000) {
                isloding = false;
                localStorage.setItem('token', res.data.token);
                localStorage.setItem('uid', res.data.uid);
                return { token: res.data.token, uid: res.data.uid }
            }
        });
    }

}

function setLoding(boold) {
    isloding = boold;
}

export default {
    myLogin,
    setLoding,
    getToken
};
