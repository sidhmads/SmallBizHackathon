var express = require('express');
var router = express.Router();
var request = require('request');
const Nexmo = require('nexmo')

const nexmo = new Nexmo({
  apiKey: '435d1195',
  apiSecret: '8KAJRgvFecqxM4TF'
})
const from = '15067160280';
const to = '16472245144';
const text = 'Hello from Nexmon';

var api_uri = "https://sandbox-quickbooks.api.intuit.com/v3/company/"
var publisher_one = {
  realmId: "123146200069804",
  token: "eyJlbmMiOiJBMTI4Q0JDLUhTMjU2IiwiYWxnIjoiZGlyIn0..sU0_vl_5rygrkp2pymIdCg.Mh3BmiffVJmZyVZBVAbAzsBukTQ7pVyPe32Mqp1BJC02oXNc8K6hNCZiaym0g8XRIKJJm41CTEnHHtZoccYj1ziuwHOgW23lFvNwDxV1XaeZLU4bwzqR8SxQJW20EJ5gU0Ki5hihA0ReDkopZ2wYQRLyaLFu3vTP3dNIfC1K1Vv5F8TR67IlGje_6pKRKigXWIilwhKTqxCsfIT2oidWqVyzRoU-y6gptaWwQm5MczJabaFFK23TPjdbDzKwV-0nXNGv5oq17oN7nP97i9IGSyhdPpj0FByms7hv8VW9Dq3tN8jQ-v-6Psu2rsiDuL5rtm1AS53arkP1_y158YkmQ_y_74FfbYUVWboVSyAjQt5e7ATx8WGcR3v8HNkEPqMs2EZUXT-dmrAmRSO2TH151Z2BZRmEys0G1hddnRQyBi9ar7iru0UlMoVAb7QdAdDheOIagrQrHRYi5rMG0u50lDIFSxbFj0xSARRhQdXw5QphoXUoyQQuENR3DQLAH_7mMyfTi0TRyIc3iBqRl5Nf7uSQQAMEAO2oICern5lMoRCqaTAhosIHhorJH7c-6m6fHkL7x6vSM95ZY2gCDub4YGpY4qbZZ-w1ZPZP4FQ157LAsOBSF4CfzIfpNqhF19QAkG8NRTsFtgWnzoWq6mmw9pwXDJJ0WfteWqqBEfVAPhgjPQsBW_ECVxu5c8O8u8Cp.1d8vLyPhTJTojfKFdUmuBw"
}
var publisher_sales_line = {
  "DetailType": "SalesItemLineDetail", 
  "SalesItemLineDetail": {
    "TaxCodeRef": {
      "value": "NON"
    }, 
    "Qty": NaN, 
    "UnitPrice": NaN, 
    "ItemRef": {
      "name": "", 
      "value": ""
    }
  }, 
  "Amount": NaN
}
var publisher_one_salesReceipt = {
  "Line": [],
  "CustomerRef": {
    "value": "58",
    "name": "QuickMarket"
  },
  "GlobalTaxCalculation": "NotApplicable"
}
var publisher_two = {
  realmId: "123146200068854",
  token: " eyJlbmMiOiJBMTI4Q0JDLUhTMjU2IiwiYWxnIjoiZGlyIn0..XeK0TzLOZ4sZ-JuhqiHx0g.NEVv8kOJjTDZ7VEiUH78e4wms-GBFgAN5LKfdegzgBmZFtHEtINeiHZiwfk3bK2EmiGpGJIy0TePb3Pl5DterC7ke2ogp51mDvL31a5jwtcYuK8Ax8YYLBPP8rrI_ZEAg5_0xuj_q2ZQSP2LcaInCdFnmzE74VcKpUodC4SiA49JuYWYePXCOwyOPmoyqZtJWHBESqS1qyiXzEySw6stRVWUJyZG_Dr0TMjVmHRON8kfGxVBbdGg8qsF2hREkYVh8oC9Li_hSdrmBfm8azKeYjZadGEp-U-hX7k7hyekSld_CN_dqSVRt8Zikmg812X3ycGKniZZIWKokadz0u4d_zoLp5a6A8zUCe-oVMazDZJdqOq_mPUXKYyphVlL0fIyV8inlAIqmoXx4KRrihyaXnD7Hzsw22ZqNo5a9grKcn0YzYXc9um5q_y6oXrXIRv8qlXtmzh69Hz814wx5b9dFptXc7KILv3Y2OC78pKNpKBfGhgmsenp5yb1AEsraSB2DQFwq8T_ytG4AGrvmS7h_pf8EC5xlgu1fwIGq2gsp_lMt_k65bSWrVp5npMnJTB0rkIGb01c_EL4qH5CDBZlo2U3uvCDWH4xxMC6HQs9ztfYB3N03nIq-cUs-PXQi7dwW96SUFBebTHiCHm8USOdXDXOQbtyAC1OX4V3_EbhFay-6tkWXH7YFUEJAxTPP50A.LD59EsIE0S5g5yAi0y38RQ"
}
var publisher_two_salesReceipt = {
  "Line": [],
  "CustomerRef": {
    "value": "58",
    "name": "QuickMarket"
  },
  "GlobalTaxCalculation": "NotApplicable"
}
var demand_one = {
  realmId: "123146200069264",
  token: "eyJlbmMiOiJBMTI4Q0JDLUhTMjU2IiwiYWxnIjoiZGlyIn0..kQXwpSilKZF3817b1kUjzA.KjObR00dZ_F9bEhXX75pQvlYYFrMw2519BXi8GaE2l1JyYmFnoSoJFJMrku9TIdHfk7wk_fnljl0XrL3P6VlNUQ7TXiiHUyytNp55d0niN7TbNLGREHDL7W1tDGPGPgcZslTzh05Y5_DoW_9Z16ZEoHzXMRoDhK1jDqPvUaxRWcTh2L1wJtYIwWh3Hs9UDwcEjrFrS4FqfN-RYyD1TzNg74RlPfuNL_QuH-cA2W62z2ntxYsAVcGtZKMJv-Dg7RTth3BeRJ2dNj6qmmN0M1uo7h-VGstCzcnVMf9i0UnfRLyC2T3UUnl6UCvBBSt3V-ottAmaM3QBtn5f5ssI2M8bNof43UW1Hzoj_E4K1KmgJLJ3udgUzIyfaFX5c7GFNFI01Dcz5T-HJMUIN5Ni9di7rEZ-QEmh5oQqhftqmcQO_U8hXcpXDgUHjv6teN_z6pBS1YH3PgBEsxSFMcqsFVqvzLFSb3Q7zt3h021kj2R7uvHceefy5u3vkWYgsz4oH6w0ZaG1AqNZabZaIQ7-k3LEVGH43fQZLwm3PghrItgtNdTFy7jRW0nizMaE3QRR824XwXhHB7eFwAzbxsznkhu13tcvbXEzeemnkTobcBY0B7SdFYhrOlkrOhsLZMpjCgWYTs4alcQRxQy7ZF7CN9hGuYsty9rf0FsDUhpydDzEnE.268R4nDM6vF3mTKKyGMbkQ"
}
var demand_one_item_template = {
  "TrackQtyOnHand": true, 
  "Name": "", 
  "QtyOnHand": NaN, 
  "Taxable": true,
  "PurchaseCost": NaN,
	"IncomeAccountRef": {
	    "value": "79",
	    "name": "Sales of Product Income"
	},
  "AssetAccountRef": {
    "name": "Inventory Asset", 
    "value": "81"
  }, 
  "InvStartDate": "2018-12-01", 
  "Type": "Inventory", 
  "ExpenseAccountRef": {
    "name": "Cost of Goods Sold", 
    "value": "80"
  }
}
var demand_one_expense_one = {
  "PaymentType": "Check", 
  "EntityRef": {
	    "value": "",
	},
  "AccountRef": {
    "value": "35"
  },
  "Line": []
}
var demand_one_line = {
  "Amount": NaN,
  "DetailType": "ItemBasedExpenseLineDetail",
  "ItemBasedExpenseLineDetail": {
      "ItemRef": {
          "value": "",
          "name": ""
      },
      "UnitPrice": NaN,
      "Qty": NaN
  }
}

var demand_one_post_request = {
    "Publisher_1": [
        {
            "item": "Carrot",
            "quantity": 7,
            "price": 2
        },
        {
            "item": "Name Badges",
            "quantity": 3150,
            "price": 3
        },
        {
            "item": "Name Badges - old",
            "quantity": 0,
            "price": 3
        },
        {
            "item": "Guest Book",
            "quantity": 20,
            "price": 25
        },
        {
            "item": "Water Bottles - Generic",
            "quantity": 550,
            "price": 10
        },
        {
            "item": "Lemon",
            "quantity": 100,
            "price": 0
        }
    ],
    "Publisher_2": [
        {
            "item": "Pump",
            "quantity": 25,
            "price": 15
        },
        {
            "item": "Rock Fountain",
            "quantity": 2,
            "price": 275
        },
        {
            "item": "Sprinkler Heads",
            "quantity": 25,
            "price": 2
        },
        {
            "item": "Sprinkler Pipes",
            "quantity": 31,
            "price": 4
        }
    ]
}


async function getQuery(publisher, table='Item') {
  // Set up API call (with OAuth2 accessToken)
  var url = api_uri + publisher.realmId + '/query?query=select * from ' + table;
  var requestObj = {
    url: url,
    headers: {
      'Authorization': 'Bearer ' + publisher.token,
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  }

  // Make API call
  return new Promise (function(resolve,reject) {
    request(requestObj, function (err, response) {
      resolve(JSON.parse(response.body).QueryResponse);
    })
  })
}

async function postQuery(publisher, body, endpoint) {
  // Set up API call (with OAuth2 accessToken)
  var url = api_uri + publisher.realmId + '/' + endpoint;
  var requestObj = {
    url: url,
    headers: {
      'Authorization': 'Bearer ' + publisher.token,
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: body,
    json: true
  }

  // Make API call
  return new Promise (function(resolve,reject) {
    request.post(requestObj, function (err, response, body) {
      if (err) {
        resolve();
      }
      resolve(body);
    })
  })
}


router.get('/products', async function (req, res) {
  var result = {
    "Publisher_1": [],
    "Publisher_2":[]
  }
  var pubOne = await getQuery(publisher_one, "Item where type='Inventory'");
  for (var item of pubOne['Item']) {
    var name = item['Name'];
    var quantity = parseInt(item['QtyOnHand']);
    var price = parseFloat(item['UnitPrice']);
    result['Publisher_1'].push({item: name, quantity: quantity, price: price});
  }
  var pubTwo = await getQuery(publisher_two, "Item where type='Inventory'");
  for (var item of pubTwo['Item']) {
    var name = item['Name'];
    var quantity = parseInt(item['QtyOnHand']);
    var price = parseFloat(item['UnitPrice']);
    result['Publisher_2'].push({item: name, quantity: quantity, price: price});
  }
  res.json(result);
});

router.post('/items', async function(req,res) {
  var body = req.body;
  var postPromises = [];
  var items_from_one = [];
  var items_from_two = [];
  var allDemand = {
    'Publisher_1': {},
    'Publisher_2': {}
  };

  for(var item of body['Publisher_1']) {
    var temp = JSON.parse(JSON.stringify(demand_one_item_template));
    allDemand['Publisher_1'][item['item'].toString()] = item['quantity']
    temp['QtyOnHand'] = item['quantity'];
    temp['PurchaseCost'] = item['price'];
    temp['Name'] = item['item'];
    items_from_one.push(item['item']);
    postPromises.push(postQuery(demand_one, temp, 'item'));
  }
  for(var item of body['Publisher_2']) {
    var temp = JSON.parse(JSON.stringify(demand_one_item_template));
    allDemand['Publisher_2'][item['item'].toString()] = item['quantity']
    temp['QtyOnHand'] = item['quantity'];
    temp['PurchaseCost'] = item['price'];
    temp['Name'] = item['item'];
    items_from_two.push(item['item']);
    postPromises.push(postQuery(demand_one, temp, 'item'));
  }
  Promise.all(postPromises).then(async function () {
    var result = [];
    var expensePromises = [];
    var demandOne = await getQuery(demand_one, "Item where type='Inventory'")
    if (demandOne) {
      for (var newItem of demandOne['Item']) {
        result.push({value: newItem['Id'], name: newItem['Name'], PurchaseCost: newItem['PurchaseCost'], quantity: newItem['QtyOnHand']})
      }
      var pub_one = JSON.parse(JSON.stringify(demand_one_expense_one));
      pub_one['EntityRef']['value'] = '58';
      var pub_two = JSON.parse(JSON.stringify(demand_one_expense_one));
      pub_two['EntityRef']['value'] = '59';
      for (var purchasedItem of result) {
        var temp = JSON.parse(JSON.stringify(demand_one_line))
        temp['ItemBasedExpenseLineDetail']['Qty'] = purchasedItem.quantity;
        temp['ItemBasedExpenseLineDetail']['UnitPrice'] = purchasedItem.PurchaseCost;
        temp['ItemBasedExpenseLineDetail']['ItemRef']['value'] = purchasedItem.value.toString();
        temp['ItemBasedExpenseLineDetail']['ItemRef']['name'] = purchasedItem.name;
        temp['Amount'] = parseFloat(purchasedItem.PurchaseCost) * parseInt(purchasedItem.quantity);
        if (items_from_one.includes(purchasedItem.name)) {
          pub_one['Line'].push(temp);
        } else if (items_from_two.includes(purchasedItem.name)) {
          pub_two['Line'].push(temp);
        }
      }
      // console.log(JSON.stringify(pub_one));
      expensePromises.push(postQuery(demand_one, pub_one, 'purchase'));
      expensePromises.push(postQuery(demand_one, pub_two, 'purchase'));
    }
    // res.json(pub_one);
    Promise.all(expensePromises).then(async function () {
      var salesPromises = [];
      var pubOne = await getQuery(publisher_one, "Item where type='Inventory'");
      var pubTwo = await getQuery(publisher_two, "Item where type='Inventory'");
      
      var one = JSON.parse(JSON.stringify(publisher_one_salesReceipt))
      var two = JSON.parse(JSON.stringify(publisher_two_salesReceipt))
      if (pubOne) {
        for (var item of pubOne['Item']) {
          var temp = JSON.parse(JSON.stringify(publisher_sales_line))
          temp['SalesItemLineDetail']['UnitPrice'] = item['UnitPrice'];
          temp['SalesItemLineDetail']['ItemRef']['name'] = item['Name'];
          temp['SalesItemLineDetail']['ItemRef']['value'] = item['Id'].toString(); 
          if (items_from_one.includes(item['Name'])) {
            temp['SalesItemLineDetail']['Qty'] = allDemand['Publisher_1'][item['Name']];
            temp['Amount'] = parseInt(allDemand['Publisher_1'][item['Name']]) * parseInt(item['UnitPrice']);
            one['Line'].push(temp);
          }
        }
        salesPromises.push(postQuery(publisher_one, one, 'salesreceipt'));
      }
      if(pubTwo) {
        for (var item of pubTwo['Item']) {
          var temp = JSON.parse(JSON.stringify(publisher_sales_line))
          temp['SalesItemLineDetail']['UnitPrice'] = item['UnitPrice'];
          temp['SalesItemLineDetail']['ItemRef']['name'] = item['Name'];
          temp['SalesItemLineDetail']['ItemRef']['value'] = item['Id'].toString(); 
          if (items_from_two.includes(item['Name'])) {
            temp['SalesItemLineDetail']['Qty'] = allDemand['Publisher_2'][item['Name']];
            temp['Amount'] = parseInt(allDemand['Publisher_2'][item['Name']]) * parseInt(item['UnitPrice']);
            two['Line'].push(temp);
          }
        }
        salesPromises.push(postQuery(publisher_two, two, 'salesreceipt'));
      }
      Promise.all(salesPromises).then(async function () {
        res.send({status: 200});
      });
    });
  });
});

module.exports = router;