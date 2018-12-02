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
  token: "eyJlbmMiOiJBMTI4Q0JDLUhTMjU2IiwiYWxnIjoiZGlyIn0..XE24TO8U5RvOVGDQvmoO-Q.ZFPQnjuhnZmng2DXr61WIOQs2UozedgQd4yvv00ss-OOymOVc_EUAs0w9fXM2LewoTWYE5SFlZeKjWJOOcYoB4xFw3or3KMajOKSgc0CXAcdEeFhxkwEUjX_NsisxTP4JSPIU5kjVIpJnItMkscRMXTHWS5sQgNup4--vryNmqudtSjindFzS1JJC1x4SBCN_1xFcW6NGSvJRSK8HWpHjzpjggOg61wjwcdzgoMrhj_Pz8e04nyewIjSWTToMgrWicS6zz6QmiPKkEGjDlZDYfSW0xW6fWYdTqepC8fL2ey0W8R7OUwnfXks7O1Cj-jtENUCbpZPj4EJIRk6eVmvNGxKIXjke4FgardsBLRKQZv5wSs7f8dgKSS7E_CHFw8q_Xkaj7BUEhREZGiUeIbsvRgbvUbnDeDsdZTj6CI5cSNNJOSdsJnRsV1Avf1esQfu_Ghte4Lt4YYoXtF8cS5whwQk8LHFpS9q2GQw_IvLn21rPKE8vBrULqOIUegUN9UICzw4WVEEG6sZmremPmdKvY9f5YZyT32clVe-BK6URvknAz8WDiHDeubnLQ9SsV1xv86aHanBlgn3HmLiKquIOia9605U6nX-aWA7V33e3esjbnZuFAiXX-IUUMCStPUIlvSK-m23C3j0Abva15JIumhx0lWZOKeMlWcz_bl6aIU.oBxgJZFh6KPTyhYSsRgT-Q"
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
  token: "eyJlbmMiOiJBMTI4Q0JDLUhTMjU2IiwiYWxnIjoiZGlyIn0..hK0_8G-ZECqQDECTUA6TOA.OSX3GPF9a5aGKIEmZ3OC80VNPfUs22lI5lFMsHHWmeuriig536fVqICKpVUw2qvWI9tD9b6Hkfi3yGE_4MDQS2Oupw3VqWYZIHu-DMYGRzu29j6iYY-zJ-_m9ON79MvQPVHHWL83HKLDG7ZzvnX-6z0lb0AEFJkmwfIdvcIUfgKpufjEMI_-4d-ZD8alvwF9-DcJAt_yOYav06_o-hL6-TL5_yMqj_QNDbZny6DKHh84lOPywBlZ1FoeRjDtMmhdBtwuvaHau2ux2nfgLpa1TmLUPGJobW0iAcXb47RT6TFiiP0dZR9VW0rpO9H4URK-UT4CwX0diFbb-UosIbJe5AvM_a73U4oVvbe3nMoeXB5F-5k7MNjAJgZzN9JIwfh1lenx3Ss55UG9sZIvZwD_Sz2CROX8lc9U8OKZ3ttJMlTglZbCPPZMGjt9ZFO-d9uSC3BkRANJXEmP-FtPzBynpK6pqq6EuiZhKdNmJw4vcRPgfO7I5gif2X69lxwfWCKz7349mmY1UfCs6x4XU3Vb8L0PdzdCkOH7g4EzxfedQe9DTLLAIENU__pil_CEH_UVRnUMFlR2H8uXtoZwrXT3rF13WQX-UBsUqTvlOvzitLhJF4PO0QSpfXXdM1raPCy1jCVuhvVHkJ3agvZmxKuGbIsHRWY7--aj6ezwQ9ZNw2BCe88cSTxJjR5xG7rjNseT.J9Kq6ERU8cDMNI-pGEZufA"
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
  token: "eyJlbmMiOiJBMTI4Q0JDLUhTMjU2IiwiYWxnIjoiZGlyIn0..xWczpEur8FcxwpwGEzrjmg.KY_BcRWqoOojMUfI4GW0WyomW5axi0dX4ZaOyn-i7LRKYNC87zUMdUFVD5MLucNCxzMUlF2f4lkqhrTcY0To80nMdNFjYgZgY6xH1c5H5-quDvROo23qdM53IR7i3lWTQbHEsMXKB4DTOWj7vrQfSiyikB7oEVp4YI1sKpULowed-sX6Ngg41JVQ6mcg_siqtOmYhNUNO2Iyw3bksQDzCEYuZS7v0i3VQ1tq-lU92bwMfcmqHfMhNKAmPGHXcEJP6_usrY7zCwW-8oNvJCtBYlwRbi6n8WRmc2PX1IdZa5ftUB6l-Ds5LIKb-eABggZn5h9LZYeqI4tLytoLOcb5h0P5WbKErEv5aPs50B4ELwL2hoyCfqJGHqx2hIB-l3DNOY8IKbZ2OyaL-wLDmCcYjkCxWrNm6MJVDCXasaSC0iibc5D8YWIfYp2GaBi1ZFuAVoyzmvbpl2PDW50QFjM_-W8T85yicutXQ_hlVPagrpMVCp4FF_aiNe1ShIpVAumS2qHuqZlJVTnCeFSz77vqLo9634pgUcjB_EP2ojkWYHwA8vK-13HiYS_vdcK9ZfytiaTLDe2WPOv0swscY4Yz1WKLN33BqTUdpcbUabkKyuu8BKCBExGPiK1HnVPl1D5Ya3hRmfQTvF6utmPg9e6ha2EhlGOu0n0Kt8p2I4SEAJE.v7waCTNmdZb9gknKtYY4aw"
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
    // res.json(pub_one);
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
        res.send({status: 200});
      });
    });
  });
});

module.exports = router;