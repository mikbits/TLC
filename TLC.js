	/* Traffic Light Control  at intersection 
	   Assumptions: 
	   1. There is a junction with 4 Traffic signals ( EW NS )
	   2. EW & NS signals will work alike
	*/
	var TLC = {
		/* This function add the event listener to DOM element */
		init: function() {
			var _this = this;
			if(document.getElementById("trafficLight"))
				document.getElementById("trafficLight").addEventListener("click", _this.bindEvent, false);
		},
		/* This function initiate the control system */
		bindEvent: function(){
			TLC.changeStateEW();
			TLC.changeStateNS();
			//TLC.fun();
		},
		/*
		temp:0,
		fun:function(){
			setTimeout(function(){TLC.fun();document.getElementById("funTime").innerHTML= Math.floor(TLC.temp/60)+":"+TLC.temp%60;},1000);
			TLC.temp+=1;
		},
		*/
		stateEW :0,
		lampTime : 4.5*60*1000,
		yellowLampTime : 30*1000,
		totalTiime:30*60*1000,
		sIdEW:null,
		/* This function has the logic to change the color/state of the each set of traffic controls */
		changeLampColor	: function(direction){
			var dir1,dir2,state,order;
			if(direction ==="EW"){
				dir1="East";
				dir2="West";
				state = TLC.stateEW;
				order = TLC.orderEW;
			}else if(direction ==="NS"){
				dir1="North";
				dir2="South";
				state = TLC.stateNS;
				order = TLC.orderNS;
			}
			var lamp,
			lampDOM;
			for (var lampIndex = 0; lampIndex < TLC.lamps.length; lampIndex += 1) {
				lamp = TLC.lamps[lampIndex];
				lampDOM1 = document.getElementById(lamp+dir1);
				lampDOM2 = document.getElementById(lamp+dir2);
				if (order[state].indexOf(lamp) !== -1) {
					lampDOM1.classList.add("lamp" + lamp);
					lampDOM2.classList.add("lamp" + lamp);
				} else {
					lampDOM1.classList.remove("lamp" + lamp);
					lampDOM2.classList.remove("lamp" + lamp);
				}
			}
		},
		/* This function controls East West Siganals */		
		changeStateEW : function(){				
			setTimeout(function(){clearTimeout(TLC.sIdEW);return;},TLC.totalTiime);
			TLC.changeLampColor("EW");
			TLC.sIdEW = setTimeout(TLC.changeStateEW, TLC.orderEW[TLC.stateEW][0]);
			TLC.stateEW += 1;
			if (TLC.stateEW >= TLC.lamps.length) {
				TLC.stateEW = 0;
			}
		},
		stateNS : 0,
		sIdNS : null,
		/* This function controls North South Siganals */
		changeStateNS : function () {
				setTimeout(function(){clearTimeout(TLC.sIdNS);return;},TLC.totalTiime);
				TLC.changeLampColor("NS");
				TLC.sIdNS = setTimeout(TLC.changeStateNS, TLC.orderNS[TLC.stateNS][0]);
				TLC.stateNS += 1;
				if (TLC.stateNS >= TLC.lamps.length) {
					TLC.stateNS = 0;
				}

		}
	};
	/* Some common variables used */
	TLC.lamps = ["Red", "Yellow", "Green"];
	TLC.orderEW = [
					[TLC.lampTime, "Green"],
					[TLC.yellowLampTime, "Yellow"],
					[TLC.lampTime+TLC.yellowLampTime, "Red"]
				];
	TLC.orderNS = [
					[TLC.lampTime+TLC.yellowLampTime, "Red"],
					[TLC.lampTime, "Green"],
					[TLC.yellowLampTime, "Yellow"]
				];
				
	/* This function initialize the TLC */			
	TLC.init();
