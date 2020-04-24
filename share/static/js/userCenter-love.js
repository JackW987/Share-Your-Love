// $(function(){
//     // 雷达图
//     var myChart = echarts.init(document.getElementById('list-chart'));
// 	  	option = {
// 	    title: {
// 	        text: ''
// 	    },
// 	    tooltip: {},
// 	    radar: {
// 	        // shape: 'circle',
// 	        name: {
// 	        	textStyle:{
// 	        		color:'black'
// 	        	}
// 	        },
// 	        indicator: [
// 	           { name: '科比', max: 100},
// 	           { name: 'C罗', max: 100},
// 	           { name: 'RNG', max: 100},
// 	           { name: '亚运会', max: 100},
// 	           { name: '火箭少女', max: 100},
// 	           { name: '英雄联盟', max: 100}
// 	        ]
//         },
// 	    series: [{
// 	        name: '预算 vs 开销',
// 	        type: 'radar',
// 	        // areaStyle: {normal: {}},
// 	        itemStyle: {normal: {
// 	        	color:'#ffafc9',
// 	        	areaStyle: {
// 	        		type: 'normal',
// 	        		color:'#ffafc9'
// 	        	},
// 	        	lineStyle:{
// 	        		color:'#fb7299'
// 	        	}
// 	        }},
// 	        data : [
// 	            {
// 	                value : [60, 80, 30, 30, 60, 90],
// 	                name : '近期热门标签',
// 	            },
// 	        ]
// 	    }]
// 	};
// 	myChart.setOption(option);
// })
function loveProportion(userId) {
    // 雷达图
    var myChart = echarts.init(document.getElementById('list-chart'));
    axios({
		'url':'/api/user/likeWorksProportion/'+userId,
		'method':'get'
	}).then(function (res) {
		let indicator,value;
		if (res.data.indicator.length>0){
            indicator = res.data.indicator;
            value = res.data.value;
		}else {
            indicator = [
                { name: '科比', max: 100},
                { name: 'C罗', max: 100},
                { name: 'RNG', max: 100},
                { name: '亚运会', max: 100},
                { name: '火箭少女', max: 100},
                { name: '英雄联盟', max: 100}
            ];
            value = [0, 0, 0, 0, 0, 0]
		}
        option = {
            title: {
                text: ''
            },
            tooltip: {},
            radar: {
                // shape: 'circle',
                name: {
                    textStyle:{
                        color:'black'
                    }
                },
                indicator: indicator
            },
            series: [{
                name: '预算 vs 开销',
                type: 'radar',
                // areaStyle: {normal: {}},
                itemStyle: {normal: {
                        color:'#ffafc9',
                        areaStyle: {
                            type: 'normal',
                            color:'#ffafc9'
                        },
                        lineStyle:{
                            color:'#fb7299'
                        }
                    }},
                data : [
                    {
                        value : value,
                        name : '近期热门标签',
                    },
                ]
            }]
        };
        myChart.setOption(option);
    })
}