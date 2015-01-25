#pragma strict

var myself : NodListener;
var coolDown : int = 100;
var onCoolDown : boolean = false;
var charCon : MyCharacterController = null;

function Start () {
	myself = GetComponent(NodListener);
}

function Update () {
	if(onCoolDown){
		coolDown --;
		if(coolDown < 0 && charCon != null){
			charCon.Trigger();
			coolDown = 100;
			charCon = null;
			onCoolDown = false;
		}
	}
	var hit : RaycastHit;
	if (Physics.Raycast(transform.position, transform.forward, hit)){
		if (hit.collider.gameObject.tag == "AI"){
			
			var na : NodActivatee = hit.collider.gameObject.GetComponent(NodActivatee);
			if (na.disabled){
				return;
			}
			if(myself.nodding){
				charCon = na.myParent;
				onCoolDown = true;
			}
		} 
	}
}

