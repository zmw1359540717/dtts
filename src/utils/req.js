import axios from 'axios';
import qs from 'qs';
import user from './user';

const request = (url, params, successFun) => {
  return new Promise((resolve) => {
    url = 'http://lumen.hupo-games.com/' + url;
    // url = ' http://192.168.99.67/' + url;

    if (params === undefined) {
      params = {};
    }
    // params = { ...params, ...user.getToken() }?
    params.token = localStorage.getItem('token');
    params.uid = localStorage.getItem('uid');
    if (!localStorage.getItem('token') && localStorage.getItem('openid')) {
      axios.post('http://lumen.hupo-games.com/wechat/Login', qs.stringify({ openid: localStorage.getItem('openid') })).then((res) => {
        if (res.status == 200) {
          localStorage.setItem('token', res.data.data.token);
          localStorage.setItem('uid', res.data.data.uid);
        }
      });

    }
    axios
      .post(url, qs.stringify(params), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      })
      .then(response => {
        if (response.data.status === 201) {
          localStorage.removeItem("token");
          localStorage.removeItem("uid");
          localStorage.removeItem("islogin");
          user.myLogin();
          return;
        }
        successFun(response.data);
        resolve(response.data);
      })
  });

};

export default request;
