import axios from 'axios'

// var postUrl = 'http://10.10.0.124:80/v1/'; // 本地
var postUrl = 'http://ware.manhaoshenghuo.cn/v1/'; // 测试

// 图片上传地址
// export const sendurl = 'http://10.10.0.124:80/v1/common/upload';// 本地
export const sendurl = 'http://ware.manhaoshenghuo.cn/v1/common/upload';// 测试
// 下载文件地址
// export const fileurl = 'http://10.10.0.124:80/v1/';// 本地
export const fileurl = 'http://ware.manhaoshenghuo.cn/v1/';// 测试

export function post_(url,data,callback){

    data.auth_key = localStorage.getItem('key')?localStorage.getItem('key'):''
    var qs = require("querystring")
    data = qs.stringify(data);
    // console.log(data);
	axios.post(postUrl+url,data)
        .then((response)=>{
            if(response.data.code == 404){
                localStorage.clear();
                location.replace("#/Login")
                return
            }
    		callback(response.data)
	    })
        .catch(function (error) {
            console.log(error);
        });
}

export function ajax_upload(url,params,act)
{
    $.ajax({
        url:postUrl+url,
        data:params,
        type:'POST',
        dataType:'json',
        processData:false,
        contentType : false,
        // async:false,
        success:function(data){
            //$("#alert-bg").fadeOut(2000);
            act(data);
        },
        error:function(e){
            console.log('ajax error:',e);
            act(e.responseText);
        }
    });
}
