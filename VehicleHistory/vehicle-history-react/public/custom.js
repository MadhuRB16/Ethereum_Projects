async function showVehicleHistory(elementid){



const web3 = new Web3(Web3.givenProvider || "http://localhost:8545");
  const accounts = await web3.eth.getAccounts();
  const networkName= await web3.eth.net.getNetworkType();
  const account=accounts[0];
console.log(account+" networkName "+networkName);
  const networkId = await web3.eth.net.getId();
 // const deployedNetwork = VehicleHistory.networks[networkId];
 
  let VehicleHistoryInst;

  const abi= [
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "vehicleaddr",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "string",
          "name": "_vehicleNumber",
          "type": "string"
        }
      ],
      "name": "vehicleReadyForSell",
      "type": "event"
    },
    {
      "constant": true,
      "inputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "name": "manufacturer",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "name": "modelname",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "name": "modelyear",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "readyForSellList",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "name": "upForSell",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "name": "vechicleActivities",
      "outputs": [
        {
          "internalType": "contract Activities",
          "name": "",
          "type": "address"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "name": "vehicleNumber",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "name": "vehicleType",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "vehiclesList",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "internalType": "string",
          "name": "_vehicleNumber",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "_vehicleType",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "_date",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "_price",
          "type": "uint256"
        },
        {
          "internalType": "string",
          "name": "_place",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "_info",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "_manufacturer",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "_modelname",
          "type": "string"
        }
      ],
      "name": "registerVehicle",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "internalType": "string",
          "name": "_vehicleNumber",
          "type": "string"
        }
      ],
      "name": "readyToSellMycar",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "internalType": "string",
          "name": "_vehicleNumber",
          "type": "string"
        }
      ],
      "name": "sold",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "internalType": "string",
          "name": "_vehicleNumber",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "_activityType",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "date",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "price",
          "type": "uint256"
        },
        {
          "internalType": "string",
          "name": "place",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "_additionalNotes",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "_healthRating",
          "type": "uint256"
        }
      ],
      "name": "addVehicleActvity",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "internalType": "string",
          "name": "_vehicleNumber",
          "type": "string"
        }
      ],
      "name": "returnDetail",
      "outputs": [
        {
          "internalType": "string[]",
          "name": "",
          "type": "string[]"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "numberOfRegisteredVehicle",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "numberOfReadyForSellVehicle",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    }
  ]
           
   // try{
    VehicleHistoryInst = new web3.eth.Contract(abi,"0xf713AF0434C07825E2D1ef134c74EdB9f683F2d9");

   

const returnDate= await VehicleHistoryInst.methods.returnDetail(elementid.toString()).call();
fillHtml(returnDate,elementid);
}


function fillHtml(returnDate,elementId){
  const returnDatalength=returnDate.length;
  
  var numberOfactivities=returnDatalength/7;
  
  var vhistory='<div class="contentView">';
 
  const sarray=returnDate.toString().split(',');

var i=1;
  //while(i<=numberOfactivities){
  //  var temp=returnDatalength/i;
  // alert(i+'-'+temp);
   // if(i=1){
    vhistory=vhistory+'<p  >>>  '+sarray[(1)]+' || Date: '+new Date(sarray[2] * 1000)+' || '+sarray[3]+
  ' || Place: '+sarray[4]+' || Rating Given(10 beign best and 1 being bad): '+sarray[6]+' || '+sarray[5]+'</p>';
   // }if(temp!=returnDatalength&&i>1){
     // vhistory=vhistory+'<p>>> Activity: '+sarray[(1*temp)]+' || date: '+new Date(sarray[2*temp] * 1000)+' || Price in Rupees: '+sarray[3*temp]+
    // ' || Place: '+sarray[4*temp]+' || Rating Given(10 beign higher and 1 being lower): '+sarray[6*temp]+' || '+sarray[5*temp]+'</p>';
   // }
  //  i++;
  //}
  if(numberOfactivities>1){
    vhistory=vhistory+'<p  >>>  '+sarray[(8)]+' || Date: '+new Date(sarray[9] * 1000)+' ||  '+sarray[10]+
    ' || Place: '+sarray[11]+' || Rating Given(10 beign best and 1 being bad): '+sarray[13]+' || '+sarray[12]+'</p>';
  }
  if(numberOfactivities>2){
    vhistory=vhistory+'<p>  >>  '+sarray[(15)]+' || Date: '+new Date(sarray[16] * 1000)+' ||  '+sarray[17]+
    ' || Place: '+sarray[18]+' || Rating Given(10 beign best and 1 being bad): '+sarray[20]+' || '+sarray[19]+'</p>';
  }

  if(numberOfactivities>3){
    vhistory=vhistory+'<p  >>>  '+sarray[(22)]+' || Date: '+new Date(sarray[23] * 1000)+' ||  '+sarray[24]+
    ' || Place: '+sarray[25]+' || Rating Given(10 beign best and 1 being bad): '+sarray[27]+' || '+sarray[26]+'</p>';
  }
  vhistory=vhistory+"</div>";
  var elem = document.getElementById(elementId);
  if(typeof elem !== 'undefined' && elem !== null) {
    elem.innerHTML = vhistory;
  }


}

function closeForm() {
    document.getElementById("myForm").style.display = "none";
  }