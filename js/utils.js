function getDate(){
    var date = new Date();
    var y = date.getFullYear();
    var m = date.getMonth() + 1;
    var d = date.getDate();
    var w = date.getDay();
    // switch(w){
    //     case 1:
    //         w = '一';
    //         break;
    //     case 2:
    //         w = '二';
    //         break;
    //     case 3:
    //         w = '三';
    //         break;
    //     case 4:
    //         w = '四';
    //         break;
    //     case 5:
    //         w = '五';
    //         break;
    //     case 6:
    //         w = '六';
    //         break;
    //     case 0:
    //         w = '七';
    //         break;
    // }
    // return y + '-' + m + '-' + d + ' 星期' + w;
    return y + '-' + m + '-' + d;
}
function getWeek(date){
    var w = new Date(date).getDay();
    switch(w){
        case 1:
            w = '一';
            break;
        case 2:
            w = '二';
            break;
        case 3:
            w = '三';
            break;
        case 4:
            w = '四';
            break;
        case 5:
            w = '五';
            break;
        case 6:
            w = '六';
            break;
        case 0:
            w = '七';
            break;
    }
    return '星期' + w;
}
function getImgUrl(des){
    var img_url = '';
    if(des.includes('晴')){
        img_url = './images/qing.png';
    }
    if(des.includes('多云')){
        img_url = './images/duoyun.png';
    }
    if(des.includes('阴')){
        img_url = './images/yin.png';
    }
    if(des.includes('雨')){
        img_url = './images/dayu.png';
    }
    if(des.includes('雪')){
        img_url = './images/daxue.png';
    }else{
        img_url = './images/duoyun.png';
    }
    return img_url;
}

function getAqiDes(aqi){
    if(aqi >= 0 && aqi <=50){
        $('.aqi_des').css({'background-color': '#1fd71c'});
        return '优';
    }
    if(aqi > 50 && aqi <= 100){
        $('.aqi_des').css({'background-color': '#f2c300'});
        return '良';
    }
    if(aqi > 100 && aqi <= 150){
        $('.aqi_des').css({'background-color': '#ffb973'});
        return '轻度污染';
    }
    if(aqi > 150 && aqi <= 200){
        $('.aqi_des').css({'background-color': '#ff7373'});
        return '中度污染';
    }else{
        $('.aqi_des').css({'background-color': '#af7373'});
        return '重度污染';
    }
}
function wtFormat(data){    
    var obj = {};
    obj.weather = [];
    obj.dayTemps = [];
    obj.nightTemps = [];
    data.weather.forEach(function(v, i){
        obj.weather[i] = {};
        obj.weather[i].date = v.date;
        obj.weather[i].week = getWeek(v.date);        
        obj.weather[i].des = v.info.day[1];
        obj.weather[i].img_url = getImgUrl(v.info.day[1]);
        obj.weather[i].wind = v.info.day[3] + ' ' + v.info.day[4];   
        obj.weather[i].dayTemp = v.info.day[2];
        obj.weather[i].nightTemp = v.info.night[2];
        obj.dayTemps[i] = v.info.day[2];
        obj.nightTemps[i] = v.info.night[2];
    });
    obj.today = {}; // 当日天气
    obj.today.temperature = data.realtime.weather.temperature; // 温度
    obj.today.wind = data.realtime.wind.direct; //风向
    obj.today.power = data.realtime.wind.power; // 风力
    obj.today.humidity = data.realtime.weather.humidity; //湿度
    obj.today.des = data.realtime.weather.info; // 阴晴
    obj.today.img_url = getImgUrl(data.realtime.weather.info); // 天气图标
    obj.today.aqi = data.pm25.aqi[0]; // 空气质量指数
    obj.today.aqi_des = getAqiDes(data.pm25.aqi[0]); // 空气质量 文字描述
    obj.today.pm25 = data.pm25.pm25[0]; //pm25指数
    return obj;
}