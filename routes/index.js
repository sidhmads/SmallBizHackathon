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
  token: "eyJlbmMiOiJBMTI4Q0JDLUhTMjU2IiwiYWxnIjoiZGlyIn0..G5VQta660Zo1Vf8rZM6dqQ.xX4nxIe9JrgmFLotdXXQ6EyzDzP0yJRQlT0iKbxSJNH-3mB1w9LJ4rfgHbRqss5jUArPG3Ob5mO1pcmuclVqVmeY6jRWblL2eo4ApFs7LYYwilbQ2JvbgkguJNCN8W-ohSD38rh_gtG4XM9UluNEDlKDRCL9hjW_KBWKyd7MHB1mCZ5x2zejbSx2DUqw7_qF8EU7ZxIQMuYDZgwDRRiZVjvYJ7ZYT5J7NmUI5Ag-50Qw-L3ySRU1j3S2xKloqNCKP_S9sZsdI6g5qBPqNKijWk3UzU4SOwsrjxFNF3OV9ulywhXJ7cjprXAZ4L7YpkASDuuvSnTMXWhuZ_aeb2sh0XEItmQySK3_72yfQDTbY6YXID0cif62uTbd59MVJxPNSnlmlsRPi5qX3HoKNFlpks-xo2qfSJrTuUxP1JYXR-pbuDElul5_dw3XB12kxWMXcNw9_FgP0-sgoQmryVXSuAtkTyHi4c399MlZovFXYC3phervwT1SdvLbLD92S3P83-YQQcHeYBVbXplvysg1_vTIj-4RT2jee13omnXLhVi-qKa6JuYg_BX0JebYg7oalRAaJbTQ9uU9kB1CpJdx6a54rE2m_IEaNuPQ3R4Sv0dvmub9qPUIPEYuwxVrHC39uwwj6umrlQ3a1Swfx1PTOSpJBtLM8FiPnLilKCRj5XBHWNlugf9wSBUEV1eU1C8H.u32CTVK9gbOS2gJSv6caYg"
}
var publisher_two = {
  realmId: "123146197851304",
  token: "eyJlbmMiOiJBMTI4Q0JDLUhTMjU2IiwiYWxnIjoiZGlyIn0..YP3VRxv8YKrqrSc_gjkXSQ.EoHIDI78aMjRKzlVFJZjClrVwqux1rfQ-O5MJ6JWV683mXIBpDWRAZY6EoXyog66HDVbD6DXAgWqbBg0_nW9DTpZjPtzWLmOp8i_REgf2R35cQ_CwAZq-IZg99jB2Fn5TCohZe1029h87cCgm68IYFxdd-lRBF_flVeFT3HAN1gWIqr1mfJfnA6puaOvuciEYqlGsMwoUcxJCu4hS7x0zdx0WC8apkD49R8PVCUT4G0OF5vx8WAXx7i-OrZ2dBm2LnIw2CkAMevhtg7_-nkKau9NA9yCMpXtnFIrdWvvie1pHhml-MXTk9ZfXL2_bGClfrIjeroA3al5oF8DYeILLWaZlrChI8AGrsnaS4V0GHXlT4YJGJ6DuXpG0DOlPg0ZAj9QjJFW8BIumHSfaUoKV1ucM4QBb5KQEUX1PA7onZwQeN2EaST6Dhs0I4bR6IJQQNOS-wcCVgqLMNSUGIeDkO1w6JwapTB1F68_PlLy9rfcwZkSij5qDfQmdOx-PTU6wQvdMcT9-BxDFpPOKwo1mqWSGL-ja2lC-Gatf_4709Yd_hATJ80FNTGFCGfqHjDB_3MqQRloOWGJzEEtYChWQzgufl7SgsPWrqhI3Fk5EKcJQAfK9bTrm5mTzzsBrytRPdKqy8E5ijngJpU92ByGlKci-uaNGG_QF8yz_LRa1vDznzXd1iQFWk4EhPqyrXdE.LsbvmqjtJMB0ezt6XUSVSQ"
}
var demand_one = {
  realmId: "123146197847929",
  token: "eyJlbmMiOiJBMTI4Q0JDLUhTMjU2IiwiYWxnIjoiZGlyIn0..1vtnNOB70BSIBszoezGrLw.wE-nj6KiBTTQJkwMtb8Tx-MnwQqABu03y4mmDT0uUfB84PlnujwQXcBTz66ja_5rAst2my9lFY5tHW8neMu3alEhI85C_hPprornd-JggD_hBRygPSgTpKwUC5BbHO5wXnsRIjIk0vo9sYLkKBYSy3fZgpKnUdDIPlXJo3znNiLTJm_7PdefZBH_CIiTuN-XQSMAVZqwLYHepOFeFzdcMCZIw-xEn_guI_co9XdbG-X4J-J52l9ggUBlxudQExIaCX8CQDlt3enQKYsPpq0dCBdlAcaCpTAEL-N4yXBYAOwXgHbOWS-FTfjxqZmtjIGc2MJBDGVDSyNGvRRZY0lANaqcayn0HBfIZi4XQNPOTLb7AcDSKWRUW-MN3VHxmp4qvfFnIfYCbRl0uqscNV0LLcBXocbXLBGH5os9-mX4GeNGXry3MtYwKHsikjlinpkn0IudtYD4-2xCrKoPg6gkvQD77EzZMD6ZzL0sKZXh69WSw1TU9x9-1BI5NCjZ2Yjpj2z7DGhNQ36j8XSN4-cYK6yt4LdlxayTXjnOkQ4RgwzSAUrnuCrdMk-IqE8lLCBB5ecWNVo6cQYTky45zw1VjSBOlSCVCtZ0pSomuMOEhTVvgZlElaBXJ8U588brLwgcvS4K3vrJwU8pE_bZglIR5o22kSLIhAVaHlObxpH3rSQoKm9T1xYsFFaAyrR4-zev.C6malQCNdscZZ4cmQmLU9w"
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
  "Publisher_1":[{"item":"Carrot","quantity":8,"price":2},{"item":"Name Badges","quantity":3150,"price":3},{"item":"Name Badges - old","quantity":0,"price":3},{"item":"Guest Book","quantity":20,"price":25},{"item":"Water Bottles - Generic","quantity":550,"price":10},{"item":"Lemon","quantity":100,"price":0}],
  "Publisher_2":[{"item":"Pump","quantity":25,"price":15},{"item":"Rock Fountain","quantity":2,"price":275},{"item":"Sprinkler Heads","quantity":25,"price":2},{"item":"Sprinkler Pipes","quantity":31,"price":4}]
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
  var body = demand_one_post_request;
  var postPromises = [];
  var inBooks = [];
  var items_from_one = [];
  var items_from_two = [];

  for(var item of body['Publisher_1']) {
    demand_one_item_template['QtyOnHand'] = item['quantity'];
    demand_one_item_template['PurchaseCost'] = item['price'];
    demand_one_item_template['Name'] = item['item'];
    items_from_one.push(item['item']);
    postPromises.push(postQuery(demand_one, demand_one_item_template, 'item'));
  }
  for(var item of body['Publisher_2']) {
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
      temp['ItemBasedExpenseLineDetail']['UnitPrice'] = purchasedItem.UnitPrice;
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
      res.json(demandOne);
    });
  });
});

module.exports = router;
