#pragma strict

var myself : NodListener;

function Start () {
	myself = GetComponent(NodListener);
}

function Update () {
	var hit : RaycastHit;
	if (Physics.Raycast(transform.position, transform.forward, hit)){
		if (hit.collider.gameObject.tag == "AI"){
			
			var na : NodActivatee = hit.collider.gameObject.GetComponent(NodActivatee);
			if (na.disabled){
				
				return;
			}
			if(myself.nodding){
				var cc : MyCharacterController = na.myParent;
				cc.Trigger();
			}
		} 
	}
}

