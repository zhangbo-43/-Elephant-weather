// 渲染页面左侧的 当日天气信息
function rendToday(wt){
    let today = wt.today;
    $('.temp').text(today.temperature);
    $('.w_logo img').attr('src', today.img_url);
    var d = getDate() + ' ' + GetCNDate();
    $('.w_date').text(d);
    $('.w_week').text(getWeek(getDate()));
    $('.w_direct').text(today.wind);
    $('.w_power').text(today.power);
    $('.humidity').text(today.humidity);
    $('.aqi_num').text(today.aqi);
    $('.aqi_des').text(today.aqi_des);
    $('.pm25').text(today.pm25);
}
// 渲染 未来5天的天气信息
function rendFuture(wt){    
    var ul = template('wtTemplate', wt);
    $('.w_list').html('').append(ul);
}
// 渲染 气温折线图
function rendLineChart(wt){
    var el = $('.line_chart').get(0);
    var chart = echarts.init(el);
    option = {
        color: ['#ff98ac','#293c55'],
        xAxis: {
            type: 'category',
            show: false
        },
        yAxis: {
            type: 'value',
            show: false
        },
        grid: {
            left: 0,
            right: 0,
            bottom: 0
        },
        series: [{
            data: wt.dayTemps,
            type: 'line',
            symbolSize:8,//拐点大小
            label: { //拐点文字
                normal: {
                    show: true,
                    position: 'top',
                    textStyle:{//拐点上标字体大小颜色
                        fontSize:'16',
                    }
                }
            },
            
        },{
            data: wt.nightTemps,
            type: 'line',
            symbolSize:8, //拐点大小
            label: { //拐点文字
                normal: {
                    show: true,
                    position: 'top',
                    textStyle:{//拐点上标字体大小颜色
                        fontSize:'16',
                    }
                }
            },
        }]
    };    
    chart.setOption(option);
}
$(function(){
    // 点击 城市 “切换”
    $('.city_change').on('click', function () {
        $('.city_list').show();
    }); 
    // 切换城市
    $('.city_list').on('change', function (){
        var city = $(this).find('option:selected').text();
        var cNo = $(this).find('option:selected').val();
        $('.city_name').text(city).attr('cNo', cNo);
        $(this).hide();
        $('.temp').text(28);
    })
})