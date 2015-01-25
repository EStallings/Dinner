#pragma strict

var flags = {
	'gunLoaded':true,
	'chandelierLoose':true,
	'wineSpilled':true,
	'colonelDrunk':false,
	'brandyServed':false,
	'gunTaken':false
};
var player = Player;

var screwObj : GameObject;
var chanObj  : GameObject;
var wineObj  : GameObject;

var colonelObj  : GameObject;
var hostObj     : GameObject;
var hostWifeObj : GameObject;
private var colonelCtrlGetGun  : MyCharacterController;
private var colonelCtrlDrink   : MyCharacterController;
private var colonelCtrlFireGun : MyCharacterController;
private var hostCtrl    : MyCharacterController;
private var hostWifeCtrl: MyCharacterController;

var adaObj      : GameObject;
var billObj     : GameObject;
var chuckObj    : GameObject;
var delilahObj  : GameObject;
private var adaCtrl     : MyCharacterController;
private var billCtrl    : MyCharacterController;
private var chuckCtrl   : MyCharacterController;
private var delilahCtrl : MyCharacterController;

private var ctrlQueue = Array();
private var locked : boolean = false;
private var doUnlock : boolean = false;

private var lightningAudioSource : AudioSource;
var lightningAudioClip           : AudioClip;

function Start () {
	var colonelCtrls   = colonelObj.GetComponents(MyCharacterController);
	colonelCtrlGetGun  = colonelCtrls[0];
	colonelCtrlDrink   = colonelCtrls[1];
	colonelCtrlFireGun = colonelCtrls[2];
	hostCtrl 	   = hostObj.GetComponent("MyCharacterController");
	hostWifeCtrl = hostWifeObj.GetComponent("MyCharacterController");
	adaCtrl 	   = adaObj.GetComponent("MyCharacterController");
	billCtrl 	   = billObj.GetComponent("MyCharacterController");
	chuckCtrl 	 = chuckObj.GetComponent("MyCharacterController");
	delilahCtrl  = delilahObj.GetComponent("MyCharacterController");
	lightningAudioSource = gameObject.AddComponent("AudioSource");
	lightningAudioSource.clip = lightningAudioClip;

	 // adaCtrl.Trigger();
	 // billCtrl.Trigger();
	 // chuckCtrl.Trigger();
	 // delilahCtrl.Trigger();
	// colonelCtrlGetGun.Trigger();
	// colonelCtrlFireGun.Trigger();
	// DoTriggerAction("loadGun");
	
}

public function RequestLock(ctrl : MyCharacterController, hp : boolean) {
	if(hp) {
		ctrlQueue.unshift(ctrl);
	}
	else {
		ctrlQueue.push(ctrl);
	}
}

public function Unlock() {
	doUnlock = true;
}

function Update () {

	if (Random.value < 0.0005) {
		lightningAudioSource.Play();
		print("LIGHTNING!");
	}
	if (doUnlock) {
		doUnlock = false;
		locked = false;
		print("Controller UNLOCKED");
	}
	if (!locked && ctrlQueue.length > 0) {
		print("Controller LOCKED");
		var ctrl : MyCharacterController = ctrlQueue.shift() as MyCharacterController;
		ctrl.RealTrigger();
		locked = true;
	}
}

function DoTriggerAction (trigger) {
	print(trigger);
	switch (trigger) {
		case 'loadGun':
			if(!flags['gunTaken']) {
				flags['gunLoaded'] = true;
			}
			break;
		case 'loosenChandelier':
			var screwCtrl : MyCharacterController = screwObj.GetComponent("MyCharacterController");
			screwCtrl.RealTrigger();
			break;
		case 'takeGun':
			flags['gunTaken'] = true;
			colonelCtrlFireGun.Trigger();
			break;
		case 'serveBrandy':
			flags['brandyServed'] = true;
			colonelCtrlDrink.Trigger();
			break;
		case 'spillWine':
			flags['wineSpilled'] = true;
			hostCtrl.RealTrigger();
			break;
		case 'drinkBrandy':
			flags['colonelDrunk'] = true;
			colonelCtrlGetGun.Trigger();
			break;
		case 'loosenChandelier2':
			flags['chandelierLoose'] = true;
			var chanWag : PropWaggler = chanObj.GetComponent("PropWaggler");
			chanWag.WaggleTrigger(true);
			break;
		case 'shootChandelier':
			if (flags['gunLoaded']){
				//Gun is loaded - play gunshot
				var caudiosource : AudioSource = colonelObj.GetComponent(AudioSource);
				print(caudiosource.clip);
				caudiosource.Play();
				if (flags['chandelierLoose']){
					//Chandelier falls and kills whoever is sitting in the host's wife's seat
					if (flags['wineSpilled']){
						//Kill host - Game Won!
						GameWon();
					}
					else {
						//Kill host's wife - Game Lost!
						GameLost();
					}
				}
				else {
					//Nothing happens?
					GameLost();
				}
			}
			else{
				//Nothing happens?
				GameLost();
			}
			break;
		case '':
			break;
		default:
			print("trigger not found");
			break;
	}
}

function GameWon(){
	print("Game Won!");
}

function GameLost(){
	print("Game Lost!");
}