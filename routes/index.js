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
  realmId: "123146178900094",
  token: "eyJlbmMiOiJBMTI4Q0JDLUhTMjU2IiwiYWxnIjoiZGlyIn0..B7Sfz6jXcRZZdW67F-V7gQ.mbPCrErYm9rmrqski1wJv0kevYvDYOE0KIGPFJGo63KQR2lbIKoPYA3iSCD0odsWRMRWkOS0N07tyX4_S9R9qXyA4_7MHOAGCoIDJBgmjdW1so8QUf4l3TBfITwaEvkFInLA4M-KCv5uYQ5Aqid6zgMgTwOtEFvx90lf7Kc49VwjTMTHdsEJWsMvWr5b9kw8vdFIuAcMYDRbxopL4a-Pz6rNV4V2Km3-eMQrrY4q7KxeEYyeuX30Sy6jUEE_H_OKf-KDILni0Sc2n-9mvlTTtQRu3LurZRA2UbP68npQGh1uefINmIuyGjU0sd0Ud5ucLjX3YL3pXXu9S5SQ4Y0n0gzyjDcSQZPYXIo_HdTV9YGxAFADG-iwXOXKvdC7w2L0qfZ7LJ1QSWYHAFnWJVsVIlDAgaXmYbIN8ErhmJj6WTUF4o_ybXmT5yqTOHtxHn9mMlbe29jASTgKqjAzxx6F7o3i8u3nDnmDP3Sshkj-Ae6zyDXTd8iYiofUujk9gjbXXfd384stCaGu6MTjTsaqQ_k-lpX-CwXs0ftzhVkngcNyr1ABySmHMpDHxTgumv07qjoWdWKJOyaQc0Hg_E7wY2m9zZrNZaT8PnwjGOnL4sp05pPOKOK0ueAVl01XBAS-3e6diiYXT6AHlr9iYudVF7dNVINJA12XpXe4N6UvDK0wP3bYpDapm3SP9bf608Cn._AJjbAaQq5KtmZoxoRm4Iw"
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
    "value": "70",
    "name": "QuickMarket"
  },
  "GlobalTaxCalculation": "NotApplicable"
}
var publisher_two = {
  realmId: "123146197851304",
  token: "eyJlbmMiOiJBMTI4Q0JDLUhTMjU2IiwiYWxnIjoiZGlyIn0..BVr7hmrb7j7D-WsM9O-DDQ.kp6nXkf8vmrWy5Yn4DaJolHMfHWMl4SBFFDw2QIOBVmyeWe-IGyJT4ubpf6ARZ-re8TY7HyVg2nbIMLdh7v4ehZo6fSVV4EBAATl5GbLeouNPBLu8oMGJEzpizXgssct2iAExnpTta9HUYDH_zZmP8UIXB2pJVDsFmfVp0zS5NmYXYxVL9BZtUp6RTx8wVGPktYByE7_MOtNHsHQRicgE2vNtNKSYXiUGzE9VaCD1hmZyV6ElYqmnjid21booCJhhCEWc2t6gzyuy0kMI8erjTCwi0huG_IeIFoKszWfxJMZDGtmAtVgyDxMJmbYwaCys3B0SkA_Ffb0efqElmYxsCJdTG4LnYAIFc2SrRi96zJdOakArLXMxBrkUQNFO6fCE3BNDs1WoWcyAD1r1oxy5bQL92z2cMstYAN6MUWT0hZy2YE4r7bf_M-gR5e2vg6Jhc_2o9frZzWFk2uBlOshe_6IV9qmyDxOcTp9jSCJOg9Cq63q46GEplBgSqE0CJ_i4ZLcdp9QU0J2nYk18Ge25ng-yOBgCc4u-DQaGl3YrhDZOoAQRqeoOD-zy-npYmSthqTrwNEsbrGj-5yv7lL6LHvzA6Ah_NOQ70FsWCdGMPSxpNNZTDj9mmSShzFRem2vlhTzEoLeb-xH9g4O-W3RhbLuB_sC9jwQvLkpV9D73vTTsHw9P5UKB5am_8Mncd6G.hH_L9FzpLP-u3N4TdNrb1Q"
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
  realmId: "123146197847929",
  token: "eyJlbmMiOiJBMTI4Q0JDLUhTMjU2IiwiYWxnIjoiZGlyIn0..b6GmAJ_JlSGDbQby70cW2A.Q6fps-P1uIORLd08huLbaVoekf4tfl7xFhxbZAxLaNty5dKsy-DstmAAx9xm59vaQxA61nTzkSB9aVPwxuETnl1sT2lt26Xt4qm4d5nrhj8CD4_dRXA-2mC18ziOEmyDc_IpObJlCHM_DsjtGblwaOdnnpoFvcR7MwkAHcOIQclFn2ZRNR7IzABrVZQPw9eNLaTRSy7sHHI6cJC8S7KLjwwl-a4MpFUZD30GOjDeDrIef2BGTu9wwPeuUxFMabEmCMOi1FmUjMUAtUA-1fy62QYwbJdRdcC7uGPpriyfH-bGxdWb_RkppoB5RBG6mN5HBFF3_FQXKj2h-xl_4qJ4fckTutua2JkskLP2NXG8A-jxxtWb_9OJ72Z2Un7AwG-iHUtcq5cxczXHLJvlJ7zzt9yvrbZgLCdw2K2GsWiN780dPTI-QtMIRQINOl3jcMI1B6suGZTyLZVu2v3HK0NxrpZi8fzDwMUdXTIxphKz_l_MqiR-jcYiyRJsXUts-5stZTUkSUzemvlKn4ghBJhrTji-zilKF_0F1iVNGRC9cbjV6OmPcx70W1vO9IbAeXXtQIsXQUYJL8ZBqu-Apv8nLLRY0Hh4dZ64G3-3DDmihlydxL4na9UyCNHoPHrOAfK0hZ0mSZsSp3z4pS550ELP7WIKf5fEf7u4utj7d2NdL11RfQDIeAmODcO2pH_sEBPH._ptmAo_rDFiyNNZjqc7CQw"
}
var demand_one_item_template = {
  "TrackQtyOnHand": true, 
  "Name": "", 
  "QtyOnHand": NaN, 
  "Taxable": true,
  "PurchaseCost": NaN,
	"IncomeAccountRef": {
	    "value": "140",
	    "name": "Sales of Product Income"
	},
  "AssetAccountRef": {
    "name": "Inventory Asset", 
    "value": "142"
  }, 
  "InvStartDate": "2018-12-01", 
  "Type": "Inventory", 
  "ExpenseAccountRef": {
    "name": "Cost of Goods Sold", 
    "value": "141"
  }
}
var demand_one_expense_one = {
  "PaymentType": "Check", 
  "EntityRef": {
	    "value": "",
	},
  "AccountRef": {
    "value": "145"
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
            "item": "Carrot",
            "quantity": 24,
            "price": 2
        },
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
    var quantity = item['QtyOnHand'];
    var price = item['UnitPrice'];
    result['Publisher_1'].push({item: name, quantity: quantity, price: price});
  }
  var pubTwo = await getQuery(publisher_two, "Item where type='Inventory'");
  for (var item of pubTwo['Item']) {
    var name = item['Name'];
    var quantity = item['QtyOnHand'];
    var price = item['UnitPrice'];
    result['Publisher_2'].push({item: name, quantity: quantity, price: price});
  }
  res.json(result);
});

router.get('/items', async function(req,res) {
  var body = req.body;
  var postPromises = [];
  var items_from_one = [];
  var items_from_two = [];
  var allDemand = {
    'Publisher_1': {},
    'Publisher_2': {}
  };

  for(var item of body['Publisher_1']) {
    allDemand['Publisher_1'][item['item'].toString()] = item['quantity']
    demand_one_item_template['QtyOnHand'] = item['quantity'];
    demand_one_item_template['PurchaseCost'] = item['price'];
    demand_one_item_template['Name'] = item['item'];
    items_from_one.push(item['item']);
    postPromises.push(postQuery(demand_one, demand_one_item_template, 'item'));
  }
  for(var item of body['Publisher_2']) {
    allDemand['Publisher_2'][item['item'].toString()] = item['quantity']
    demand_one_item_template['QtyOnHand'] = item['quantity'];
    demand_one_item_template['PurchaseCost'] = item['price'];
    demand_one_item_template['Name'] = item['item'];
    items_from_two.push(item['item']);
    postPromises.push(postQuery(demand_one, demand_one_item_template, 'item'));
  }
  Promise.all(postPromises).then(async function () {
    var result = [];
    var expensePromises = [];
    var demandOne = await getQuery(demand_one, "Item where type='Inventory'")
    for (var newItem of demandOne['Item']) {
      result.push({value: newItem['Id'], name: newItem['Name'], UnitPrice: newItem['PurchaseCost'], quantity: newItem['QtyOnHand']})
    }
    var pub_one = JSON.parse(JSON.stringify(demand_one_expense_one));
    pub_one['EntityRef']['value'] = '58';
    var pub_two = JSON.parse(JSON.stringify(demand_one_expense_one));
    pub_two['EntityRef']['value'] = '59';
    for (var purchasedItem of result) {
      var temp = JSON.parse(JSON.stringify(demand_one_line))
      temp['ItemBasedExpenseLineDetail']['Qty'] = purchasedItem.quantity;
      temp['ItemBasedExpenseLineDetail']['PurchaseCost'] = purchasedItem.UnitPrice;
      temp['ItemBasedExpenseLineDetail']['ItemRef']['value'] = purchasedItem.value.toString();
      temp['ItemBasedExpenseLineDetail']['ItemRef']['name'] = purchasedItem.name;
      temp['Amount'] = purchasedItem.UnitPrice * purchasedItem.quantity;
      if (items_from_one.includes(purchasedItem.name)) {
        pub_one['Line'].push(temp);
      } else if (items_from_two.includes(purchasedItem.name)) {
        pub_two['Line'].push(temp);
      }
    }
    expensePromises.push(postQuery(demand_one, pub_one, 'purchase'));
    expensePromises.push(postQuery(demand_one, pub_two, 'purchase'));
    Promise.all(expensePromises).then(async function () {
      var salesPromises = [];
      var pubOne = await getQuery(publisher_one, "Item where type='Inventory'");
      var pubTwo = await getQuery(publisher_two, "Item where type='Inventory'");
      
      var one = JSON.parse(JSON.stringify(publisher_one_salesReceipt))
      var two = JSON.parse(JSON.stringify(publisher_two_salesReceipt))
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
      salesPromises.push(postQuery(publisher_one, one, 'salesreceipt'));
      salesPromises.push(postQuery(publisher_two, two, 'salesreceipt'));
      Promise.all(salesPromises).then(async function () {
        res.json(pubOne);
      });
    });
  });
});

module.exports = router;