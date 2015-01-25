using UnityEngine;
using System.Collections;

public class AnimController : MonoBehaviour {
	public GameObject[] targets;
	public int[] type;
	public Vector3[] noffset;
	public float[] nspeed;
	public bool active;
	private int counter;

	//Callback party has "AnimCallback()" called when we do first update after triggering
	private CharacterAnimScheduler callbackParty = null;

	// Use this for initialization
	void Start () {

	}

	public void Trigger(CharacterAnimScheduler cbp){
		callbackParty = cbp;
		active = true;
	}

	public void Trigger(){
		callbackParty = null;
		active = true;

	}

	public void End(){
		active = false;
		callbackParty = null;
		PropWaggler tempwaggle = null;
		PropPointer temppointer = null;
		PropRotateLock templock = null;
		foreach (GameObject target in targets){
			tempwaggle = target.GetComponent<PropWaggler>();
			temppointer = target.GetComponent<PropPointer>();
			templock = target.GetComponent<PropRotateLock>();

			if (tempwaggle != null){
				tempwaggle.WaggleTrigger(false); 
			}
			if (temppointer != null){
				temppointer.active = false; 
			}
			if (templock != null){
				templock.LockTrigger(false); 
			}
		}
	}

	// Update is called once per frame
	void Update () {
		PropWaggler tempwaggle = null;
		PropPointer temppointer = null;
		PropRotateLock templock = null;
		LimbResetter tempreset = null;
		counter = 0;
		if(active){
			foreach (GameObject target in targets){
				if(type[counter] == -1){
					tempreset = target.GetComponent<LimbResetter>();
					if (tempreset != null){
						// print("Resetting " + (transform.parent.gameObject.transform.parent.gameObject.transform.parent.gameObject.name));
						
						tempreset.ResetTrigger();
					}
				}
				if(type[counter] == 0){
					tempwaggle = target.GetComponent<PropWaggler>();
					if (tempwaggle != null){
						tempwaggle.offset = noffset[counter];
						tempwaggle.speed = nspeed[counter];
						tempwaggle.WaggleTrigger(true);
					}
				}
				if(type[counter] == 1){
					temppointer = target.GetComponent<PropPointer>();
					if (temppointer != null){
						temppointer.target = noffset[counter];
						temppointer.speed = nspeed[counter];
						temppointer.PointerTrigger();
					}
				}
				if(type[counter] == 2){
					templock = target.GetComponent<PropRotateLock>();
					if (templock != null){
						templock.offset = noffset[counter];
						templock.speed = nspeed[counter];
						templock.init();
						templock.LockTrigger(true);
					}
				}
				counter++;
			}
		}
		if(callbackParty != null){
			callbackParty.AnimCallback();
			callbackParty = null;
		}
	}
}
