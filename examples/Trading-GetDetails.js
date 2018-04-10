/**
 * example ebay API request to Shopping:GetSingleItem
 */

var ebay = require('../index.js');
var ebayItemIDS = [];
var ebayData = [];
const fs = require('fs');
const _ = require('lodash');
var pageNum = 1;
var js2xmlparser = require("js2xmlparser");

ebay.xmlRequest({
  'serviceName': 'Trading',
  'opType': 'GetMyeBaySelling',
  devId: '30f0908c-bff7-4552-a8c8-7859faf5311b',
  certId: 'PRD-5d80d3bd03ff-2b6f-480e-a38b-af61',
  appId: 'StephenC-tradingp-PRD-75d80d3bd-a10f3a1f',
  authToken: 'AgAAAA**AQAAAA**aAAAAA**ZK/LWg**nY+sHZ2PrBmdj6wVnY+sEZ2PrA2dj6wDloSjCJCAowmdj6x9nY+seQ**uwgEAA**AAMAAA**NsvBPVppx1gGps58ePTli2jguc2an5eYH9fkcdclJqcZeC++NuW8VI4g0vsAs6CzAGq/fa5NUkO9PrNWb+/rCI1QeLcvKjybw4D6rV8zjE+Njf5OQP8Tx60cX5flhdCVrLcHLRw+kyGMZfsX++/ko+7gF4clGGUUqUJTo8AOXdDmqq7SmZmTtg8tso1Po8YfNxPD4vL8FpylcjHRirgBoFfvatqXwpBt/Zhd2CY49xMguiKIBnxhfaz/hgWnjCEpJFDBwEf78wLeH0OiXiDFGj3lOSXDFG8k+0CSoWJyIUABVjQ9mK4gSN/wOR0Te8uIQJCUJmHN11h5GR18k6IBUfcSVNuczYmDEts6W6NejowJ9LBTNJioVNI5DeU3m+F0CD+oBk868zbYq61zE4k+NlMSzW9KuMJWr8sAlPg/4PYaf8eu11fhYCn/bcY9H4Fzkp/HGaxnBewjBB029BEprorOmRRMZ8v3mdNRJyjj3iPA5VjH8ecK+JfnW/Ms1jwAQuWOO0K5K74IywKRATpL53Akvysbd7cvqQ7j/lohOWljFx4oCspzS9md0+ZPnEW1rKlV1l7a4JMzZTbdlmfwJ3/udwXzxbfpolm0gAEpX2X1d0V/NKUxf1syqFS0VEsiVAqdpaehV9LNP3iQPlPa9HO9tM9TS49XQbIwlMmoUGOCM3yaLCVyHIy4iy7JfVqtV9woiLzVlYVzN4+VFO3EyNfAWUO6SSTf16bGMUKDnb8YyzJ6YZSqY83AbotHERwa',

  
  params: {
  	'ActiveList': {
  		'Include': true,
  	},
  	PageNumber: pageNum,
  }
},
function(error, data) {
	console.log(data);
	var dataActive = data.ActiveList[0];
	for (let i = 0; i < 200; i++) {
		ebayItemIDS[i] = dataActive.Items[i]['ItemID'];
	}
	for (let j = 0; j < ebayItemIDS.length; j++) {
		ebay.xmlRequest({
		  'serviceName': 'Trading',
		  'opType': 'GetItem',
		  devId: '30f0908c-bff7-4552-a8c8-7859faf5311b',
		  certId: 'PRD-5d80d3bd03ff-2b6f-480e-a38b-af61',
		  appId: 'StephenC-tradingp-PRD-75d80d3bd-a10f3a1f',
		  authToken: 'AgAAAA**AQAAAA**aAAAAA**ZK/LWg**nY+sHZ2PrBmdj6wVnY+sEZ2PrA2dj6wDloSjCJCAowmdj6x9nY+seQ**uwgEAA**AAMAAA**NsvBPVppx1gGps58ePTli2jguc2an5eYH9fkcdclJqcZeC++NuW8VI4g0vsAs6CzAGq/fa5NUkO9PrNWb+/rCI1QeLcvKjybw4D6rV8zjE+Njf5OQP8Tx60cX5flhdCVrLcHLRw+kyGMZfsX++/ko+7gF4clGGUUqUJTo8AOXdDmqq7SmZmTtg8tso1Po8YfNxPD4vL8FpylcjHRirgBoFfvatqXwpBt/Zhd2CY49xMguiKIBnxhfaz/hgWnjCEpJFDBwEf78wLeH0OiXiDFGj3lOSXDFG8k+0CSoWJyIUABVjQ9mK4gSN/wOR0Te8uIQJCUJmHN11h5GR18k6IBUfcSVNuczYmDEts6W6NejowJ9LBTNJioVNI5DeU3m+F0CD+oBk868zbYq61zE4k+NlMSzW9KuMJWr8sAlPg/4PYaf8eu11fhYCn/bcY9H4Fzkp/HGaxnBewjBB029BEprorOmRRMZ8v3mdNRJyjj3iPA5VjH8ecK+JfnW/Ms1jwAQuWOO0K5K74IywKRATpL53Akvysbd7cvqQ7j/lohOWljFx4oCspzS9md0+ZPnEW1rKlV1l7a4JMzZTbdlmfwJ3/udwXzxbfpolm0gAEpX2X1d0V/NKUxf1syqFS0VEsiVAqdpaehV9LNP3iQPlPa9HO9tM9TS49XQbIwlMmoUGOCM3yaLCVyHIy4iy7JfVqtV9woiLzVlYVzN4+VFO3EyNfAWUO6SSTf16bGMUKDnb8YyzJ6YZSqY83AbotHERwa',

		  params: {
		    'ItemID': ebayItemIDS[j],
		    'DetailLevel': 'ReturnAll',
		  }
		},
		function(error, data) {
			if (_.isNil(data)) {
				j--;
			} else {
				ebayData[j] += js2xmlparser.parse("Item",data);
			if (j == 199) {
				fs.writeFile('iphone1604-' + pageNum + '.json', ebayData.join('\n'), 'utf-8'); 
			};
			}
		});
		}
});