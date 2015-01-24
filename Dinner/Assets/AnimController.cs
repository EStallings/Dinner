using UnityEngine;
using System.Collections;

public class AnimController : MonoBehaviour {
	public GameObject[] targets;
	public int[] type;
	public Vector3[] noffset;
	public float[] speed;
	public bool active;
	private int counter;

	// Use this for initialization
	void Start () {
	
	}

	void Trigger(){
		active = !active;
	}

	// Update is called once per frame
	void Update () {
		PropWaggler tempwaggle = null;
		PropPointer temppointer = null;
		PropRotateLock templock = null;  
		counter = 0;
		if(active){
			foreach (GameObject target in targets){
				if(type[counter] == 0){
					tempwaggle = target.GetComponent<PropWaggler>();
					if (tempwaggle != null){
						tempwaggle.offset = noffset[counter];
						tempwaggle.WaggleTrigger();
					}
				}
				if(type[counter] == 1){
					temppointer = target.GetComponent<PropPointer>();
					if (temppointer != null){
						temppointer.target = noffset[counter];
						temppointer.PointerTrigger();
					}
				}
				if(type[counter] == 2){
					templock = target.GetComponent<PropRotateLock>();
					if (templock != null){
						templock.offset = noffset[counter];
						templock.LockTrigger();
					}
				}
				counter++;
			}
		}
	}
}
